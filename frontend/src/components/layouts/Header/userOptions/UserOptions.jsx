import React, { Fragment, useState } from 'react'
import "./userOptions.css";
import { Navigate, useNavigate } from 'react-router-dom';
import { useAlert } from "react-alert";

// mui component
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Backdrop from '@mui/material/Backdrop';

// mui icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { logout } from '../../../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';

const UserOptions = ({ user }) => {
    
    const {cartItems} = useSelector((state) => state.cart)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const alert = useAlert();

    const options = [
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
        {icon: <ShoppingCartIcon style={{color: cartItems.length > 0 ? "tomato" : "unset" }} />, name: `Cart(${cartItems.length})`, func: cart},
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
    ];
    

    if (user.role === "admin") {
        options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: dashboard });
    }

    function dashboard() {
        navigate('/dashboard');
    }
    function orders() {
        navigate('/orders');
    }
    function account() {
        navigate('/account');
    }
    function cart() {
        navigate('/cart');
    }
    function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully");
        navigate('/login');
    }

    return (
        <Fragment>
            <Backdrop open={open} style={{zIndex: "10"}} />
            <SpeedDial
                direction='down'
                ariaLabel="User Actions"
                className="speedDial"
                style={{zIndex: "11"}}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                icon={
                    <img
                        className="speedDialIcon"
                        src={user.avatar.url !== "" ? user.avatar.url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAQh_cZaLUJBopQdTDhb1F9fy-IcFb8meJuw&usqp=CAU"}
                        alt="profile"
                    />}
            >
                {options.map((item) => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                        tooltipOpen={window.innerWidth <= 600 ? true : false}
                    />
                ))}

            </SpeedDial>
        </Fragment>
    )
}

export default UserOptions;