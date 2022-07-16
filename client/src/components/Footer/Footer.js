import React from "react";
import { Link } from "react-router-dom";
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

import "./Footer.css";

const Footer = () => {
  return (
    <footer>
        <div className="footer-container">
            <div className="footer-box">
                <div className="footer-navigation">
                    <Link to="/" alt="" className="footer-link">Trips</Link>
                    <Link to="/" alt="" className="footer-link">Splitwise</Link>
                    <Link to="/" alt="" className="footer-link">Carbon</Link>
                    <Link to="/" alt="" className="footer-link">Login</Link>
                </div>
            </div>
            <div className="footer-icon__container">
                <Link to="https://twitter.com/?lang=en" alt="" className="footer-icon">{TwitterIcon}</Link>
                <Link to="https://www.facebook.com/" alt="" className="footer-icon">{FacebookIcon}</Link>
                <Link to="https://www.instagram.com/" alt="" className="footer-icon">{InstagramIcon}</Link>
                <Link to="https://github.com/beatricekallen/project-three" alt="" className="footer-icon">{GitHubIcon}</Link>
            </div>
            <div className="copyright">
                <p className="copy">© 2022 Roam. All rights reserved.</p>
            </div>
        </div>
    </footer>
  )
};

export default Footer;
