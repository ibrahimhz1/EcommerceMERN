import React, { useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts Components Imports
import Header from "./components/layouts/Header/Header";
import Footer from "./components/layouts/Footer/Footer";

// components
import Search from "./components/search/Search";
import UserOptions from "./components/layouts/Header/userOptions/UserOptions";
import Cart from "./components/cart/Cart";

// Pages
import Home from "./components/pages/Home/Home";
import ProductDetails from "./components/pages/ProductPage/ProductDetails"
import ProductsPage from "./components/pages/ProductPage/ProductsPage";
import ProfilePage from "./components/pages/Profile/ProfilePage";
import UpdateProfilePage from "./components/pages/Profile/updateProfilePage/UpdateProfilePage";
import UpdatePasswordPage from "./components/pages/Profile/updatePasswordPage/UpdatePasswordPage";
import ForgotPasswordPage from "./components/pages/Profile/forgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./components/pages/Profile/resetPasswordPage/ResetPasswordPage";
import ShippingPage from "./components/pages/shippingPage/ShippingPage"

// import web font loader
import WebFont from "webfontloader";
import LoginSignUp from "./components/user/loginSignup/LoginSignUp";

import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";

// Protected Routes
// import ProtectedRoute from "./components/Route/ProtectedRoute";
import Protected from "./components/Route/Protected";


const App = () => {

  const { isAuthenticated, user } = useSelector(state => state.user);

  // UseEffect for Fonts
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })

    store.dispatch(loadUser());

  }, []);

  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}
      <Routes>

        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<ProductsPage />} />
        <Route path="/products/:keyword" element={<ProductsPage />} />

        <Route exact path="/search" element={<Search />} />


        {/* Lochaa method to handle Protected-Routes */}
        {/* <Route element={<ProtectedRoute />}>
          <Route exact path="/account" element={<ProfilePage />} />
        </Route> */}

        {/* <ProtectedRoute exact path="/account" component={ProfilePage} /> */}

        {/* Saras Method to handle Protected-Routes */}
        <Route
          path="/account"
          element={
            <Protected isSignedIn={isAuthenticated}>
              <ProfilePage />
            </Protected>
          }
        />

        <Route
          exact
          path="/me/update"
          element={
            <Protected isSignedIn={isAuthenticated}>
              <UpdateProfilePage />
            </Protected>
          }
        />

        <Route
          exact
          path="/password/update"
          element={
            <Protected isSignedIn={isAuthenticated}>
              <UpdatePasswordPage />
            </Protected>
          }
        />

        <Route exact path="/password/forgot" element={<ForgotPasswordPage />} />

        <Route exact path="/password/reset/:token" element={<ResetPasswordPage />} />

        <Route exact path="/login" element={<LoginSignUp />} />

        <Route exact path="/cart" element={<Cart />} />

        <Route
          exact
          path="/shipping"
          element={
            <Protected isSignedIn={isAuthenticated}>
              <ShippingPage />
            </Protected>
          }
        />

      </Routes>
      <Footer />
    </Router>
  )
}

export default App;