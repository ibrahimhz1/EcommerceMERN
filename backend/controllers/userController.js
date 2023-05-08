// ErrorHandler Utility Import
const ErrorHandler = require('../utils/errorHandler');
// CatchAsyncErrors Middleware Import
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
// User Model Import
const User = require('../models/userModel');

// Its a seperate module which creates jwtToken and stores in a cookie
const sendToken = require('../utils/jwtToken');

// Send Email function import 
const sendEmail = require('../utils/sendEmail');

// Crypto Import
const crypto = require('crypto');

// Cloudinary Import
const cloudinary = require('cloudinary');

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    });

    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    });

    // const token = user.getJWTToken();

    // res.status(201).json({
    //     success: true,
    //     token
    // });

    // Creating jwttoken and saving in cookie: which is created as seperate function in utils and imported
    sendToken(user, 201, res);

});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    // checking the email & password is given or not
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email and Password", 400));
    }

    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401))
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401))
    }

    // const token = user.getJWTToken();

    // res.status(200).json({
    //     success: true,
    //     token,
    // });

    // Creating jwttoken and saving in cookie: which is created as seperate function in utils and imported
    sendToken(user, 200, res);

});

// Logout User
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
});

// Forgot Password 
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Get Reset Password Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/password/reset/${resetToken}`;

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Your Password Reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not  requested this email then please simply ignore this`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'HZ-Ecommerce Password Recovery',
            message: message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully !`,
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // Creating Token Hash
    const resetPasswordToken = crypto.createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorHandler("Reset Password Token is Invalid or has beene Expired", 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res);
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    })
});


// Update / Change User Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Old Password", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
});

// Update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    // we will add cloudinary later
    if(req.body.avatar !== ""){
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        })

        newUserData.avatar= {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    }


    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        message: "Updated User Data Successfully"
    })
});

// Get All Users   --> Admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users,
    });
});

// Get Single Users   --> Admin
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`));
    }

    res.status(200).json({
        success: true,
        user,
    });
});

// Update User Role -->Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    // We will add cloudinary later
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    if(!user){
        return next(new ErrorHandler(`user does not exist with id: ${req.params.id}`, 400));
    }

    res.status(200).json({
        success: true,
        message: "User Role Updated Successfully"
    });

});

// Delete User --> Admin
exports.deleteUser = catchAsyncErrors(async(req, res, next)=> {
    const user = await User.findById(req.params.id);
    // We will remove cloudinary

    if(!user){
        return next(new ErrorHandler(`user does not exist with id: ${req.params.id}`, 400))
    }

    // we will delete from cloudinary later
    await user.remove();

    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    });

});

exports.putdetail = catchAsyncErrors(async(req, res, next) => {
    res.status(200).json({
        success: true,
        message: "WELCOME"
    })
})