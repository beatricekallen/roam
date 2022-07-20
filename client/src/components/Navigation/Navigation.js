import * as React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import SearchBar from "../SearchBar";
import Badge from "@mui/material/Badge";

import "./Navigation.css";

const pages = ["Profile", "Create a Trip", "Logout"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navigation = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  let username;
  if (Auth.loggedIn()) username = Auth.getProfile().data.username;

  const badgeStyle = {
    "& .MuiBadge-badge": {
      top: "30px",
      right: `28px`,
      color: "#1b4d89",
      backgroundColor: "#fff",
      fontSize: "16px",
      fontFamily: "Lobster, cursive",
      height: "22px",
    },
  };

  return (
    <AppBar position="sticky" className="app-bar">
      <Container maxWidth="xl" className="justify-content-between">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <a className="nav__home" href="/">
            <Typography className="nav__title">Roam</Typography>
          </a>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            className="nav-links"
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            {Auth.loggedIn() ? (
              <>
                <SearchBar />
                <Link to="/">
                  <Button
                    className="logout"
                    key="logout"
                    onClick={logout}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Logout
                  </Button>
                </Link>
                <Link to="/profile">
                  <IconButton sx={{ p: 2 }}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      badgeContent={username}
                      sx={badgeStyle}
                    >
                      <Avatar
                        alt="Sea Turtle Avatar"
                        src="/images/seaturtle.jpg"
                        sx={{
                          width: 56,
                          height: 56,
                          border: `2px solid white`,
                        }}
                      />
                    </Badge>
                  </IconButton>
                </Link>
              </>
            ) : (
              <>
                <Link to={`/login`}>
                  <Button
                    className="login"
                    key="login"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Log In
                  </Button>
                </Link>
                <Link to={`/signup`}>
                  <Button
                    className="signup"
                    key="signup"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navigation;
