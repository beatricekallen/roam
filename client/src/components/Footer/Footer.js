import React from "react";
import { Link } from "react-router-dom";
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import PropTypes from 'prop-types';
import Slide from '@mui/material/Slide';

import "./Footer.css";

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="up" in={trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
const Footer = (props) => {
  return (
    <HideOnScroll {...props}>
    <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, bgColor: '#1b4d89', mt: 50}}>
    <div className="footer-container">
      <div className="footer-box">
        <div className="footer-navigation">
          <Link to="/" className="footer-link">
            Trips
          </Link>
          <Link to="/" className="footer-link">
            Splitwise
          </Link>
          <Link to="/" className="footer-link">
            Carbon
          </Link>
          <Link to="/login" className="footer-link">
            Login
          </Link>
        </div>
      </div>
      <div className="footer-icon__container">
        <Link to={"https://twitter.com/?lang=en"} target="_blank" rel="noopener" className="footer-icon">
          <TwitterIcon />
        </Link>
        <Link to={"https://www.facebook.com/"} target="_blank" rel="noopener" className="footer-icon">
          <FacebookIcon />
        </Link>
        <Link to={"https://www.instagram.com/"} target="_blank" rel="noopener" className="footer-icon">
          <InstagramIcon />
        </Link>
        <Link to={"https://github.com/beatricekallen/project-three"}
          target="_blank" rel="noopener" className="footer-icon"
        >
          <GitHubIcon />
        </Link>
      </div>
      <div className="copyright">
        <p className="copy">© 2022 Roam. All rights reserved.</p>
      </div>
    </div>
  </AppBar>
  </HideOnScroll>
  )
};

export default Footer;