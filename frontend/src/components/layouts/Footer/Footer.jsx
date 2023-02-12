import React from 'react'

// CSS Imports
import "./footer.css";

// images imports
import playstore from "../../../images/playstoreImage.png";
import appstore from "../../../images/appstoreImage.png";

const Footer = () => {
    return (
        <footer id='footer'>
            <div className="leftFooter">
                <h4>Download Our App</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playstore} alt="playstore" />
                <img src={appstore} alt="appstore" />
            </div>
            <div className="midFooter">
                <h1>HZ Ecommerce</h1>
                <p>High Quality is our first Priority</p>
                <p>Copyright 2023 &copy; IbrahimHz</p>
            </div>
            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="https://ibrahimhz.com">Instagram</a>
                <a href="https://ibrahimhz.com">Youtube</a>
                <a href="https://ibrahimhz.com">LinkedIn</a>
            </div>
        </footer>
    )
}

export default Footer;
