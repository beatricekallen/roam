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
                    <Link to="/" className="footer-link">Trips</Link>
                    <Link to="/" className="footer-link">Splitwise</Link>
                    <Link to="/" className="footer-link">Carbon</Link>
                    <Link to="/" className="footer-link">Login</Link>
                </div>
            </div>
            <div className="footer-icon__container">
                <Link to={{ pathname: "https://twitter.com/?lang=en"}} target="_blank" rel="noopener noreferrer" className="footer-icon">{TwitterIcon}</Link>
                <Link to={{ pathname: "https://www.facebook.com/"}} target="_blank" rel="noopener noreferrer" className="footer-icon">{FacebookIcon}</Link>
                <Link to={{ pathname: "https://www.instagram.com/"}} target="_blank" rel="noopener noreferrer" className="footer-icon">{InstagramIcon}</Link>
                <Link to={{ pathname: "https://github.com/beatricekallen/project-three"}} target="_blank" rel="noopener noreferrer" className="footer-icon">{GitHubIcon}</Link>
            </div>
            <div className="copyright">
                <p className="copy">© 2022 Roam. All rights reserved.</p>
            </div>
        </div>
    </footer>
  )
};

export default Footer;