import React from 'react'

// React Overlay
import { ReactNavbar } from "overlay-navbar";

// React Icons
import { MdAccountCircle } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";

// Logo
import Logo from "../../../images/nerdcentralogo.png";


const Header = () => {
    const options = {
        burgerColorHover: "#eb4034",
        logo: Logo,
        logoWidth: "20vmax",
        navColor1: "#edededf7",
        logoHoverSize: "10px",
        logoHoverColor: "#eb4034",
        link1Text: "Home",
        link2Text: "Products",
        link3Text: "Contact",
        link4Text: "About",
        link1Url: "/",
        link2Url: "/products",
        link3Url: "/contact",
        link4Url: "/about",
        link1Size: "1.3vmax",
        link1Color: "rgba(35, 35, 35,0.8)",
        nav1justifyContent: "flex-end",
        nav2justifyContent: "flex-end",
        nav3justifyContent: "flex-start",
        nav4justifyContent: "flex-start",
        link1ColorHover: "#eb4034",
        link1Margin: "1vmax",
        profileIconUrl: "/login",
        profileIcon: true,
        profileIconColor: "rgba(35, 35, 35,0.8)",
        ProfileIconElement: MdAccountCircle,
        searchIcon: true,
        searchIconColor: "rgba(35, 35, 35,0.8)",
        SearchIconElement: MdSearch,
        searchIconUrl: "/search",
        cartIcon: true,
        cartIconColor: "rgba(35, 35, 35,0.8)",
        CartIconElement: MdAddShoppingCart,
        cartIconUrl: "/cart",
        profileIconColorHover: "#eb4034",
        searchIconColorHover: "#eb4034",
        cartIconColorHover: "#eb4034",
        cartIconMargin: "1vmax",
        logoAnimationTime: "0.5",
        searchIconAnimationTime: "0",
        link1AnimationTime: "0.1"
    };
    return (
        <ReactNavbar {...options} />
    )
}

export default Header;
