import React, { useState, useContext } from "react";
import { Button, Menu, MenuItem, Avatar, Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "./Dialog";
import Signup from "./Signup";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

//Here, import LoginContext

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    backgroundColor: "#000077e8",
    "&:hover": {
      background: "#f00",
    },
    color: "#f2f2f2",
  },
  menu: {},
  menuItem: {
    "&:hover": {
      background: "#000077",
    },
    color: "#f2f2f2",
  },
}));

export default function SimpleMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  //const [loginGreeting, setLoginGreeting] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDialogToggle = () => {
    setDialogOpen(!dialogOpen);
    handleMenuClose();
  };
const authContext = useContext(AuthContext)
  return (
        <div className={classes.root}>
          <Button
            className={classes.button}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            Menu
          </Button>

          <Menu
            className={classes.menu}
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {/* Here, have to have menu item handle open of modal */}
            <MenuItem className={classes.menuItem} onClick={handleDialogToggle}>
              <Dialog open={dialogOpen} onClose={handleDialogToggle}></Dialog>
            </MenuItem>
            <MenuItem className={classes.menuItem} onClick={handleMenuClose}>
              <Signup></Signup>
            </MenuItem>
            <MenuItem className={classes.menuItem} onClick={handleMenuClose}>
              About
            </MenuItem>
          </Menu>
          {console.log(`Auth state: ${authContext.isAuthenticated}`)},
          <div className={classes.root}>
            {authContext.isAuthenticated ? (
            <Typography><Link to="/user">{authContext.user.name}</Link></Typography>
            ) : (
             
              <Typography>Welcome, visitor!</Typography>
            )}

            {authContext.isAuthenticated ? (
            <Avatar 
            src={authContext.user.avatar} alt={authContext.user.name}
            ></Avatar>
            ) : (
            <Avatar></Avatar> 
            )
            }
            
          </div>
        </div>
    
  );
}
