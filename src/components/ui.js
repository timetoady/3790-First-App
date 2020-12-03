import React, { useState, useContext, useEffect } from "react";
import { Button, Menu, MenuItem, Avatar, Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "./Dialog";
import Signup from "./Signup";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import firebase from "../lib/firebase";


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
  const [userInfo, setUserInfo] = useState({});
  const authContext = useContext(AuthContext);
  
  useEffect(() => {
    if (authContext.isAuthenticated) {
      const getUserInfo = () => {
        let userEmail = authContext.user.email
        let dbUser = firebase.firestore().collection("users").doc(userEmail);
        dbUser
          .get()
          .then(function (doc) {
            if (doc.exists) {
              console.log("Document data:", doc.data());
              setUserInfo(doc.data());
              
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
              
            }
          })
          .catch(function (error) {
            console.log("Error getting document:", error);
          });
      };
      setTimeout(function() {
        getUserInfo()
      }, 400)
    }
  }, [authContext]);


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
        <MenuItem
          tabIndex={-1}
          className={classes.menuItem}
          onClick={handleDialogToggle}
        >
          <Dialog open={dialogOpen} onClose={handleDialogToggle}></Dialog>
        </MenuItem>
        <MenuItem
          tabIndex={0}
          className={classes.menuItem}
          onClick={handleMenuClose}
        >
          <Signup></Signup>
        </MenuItem>
        <MenuItem
          tabIndex={0}
          className={classes.menuItem}
          onClick={handleMenuClose}
        >
          About
        </MenuItem>
      </Menu>
      {console.log(`Auth state: ${authContext.isAuthenticated}`)},
      <div className={classes.root}>
        {authContext.isAuthenticated ? (
          <Typography>
            <Link to="/user">{authContext.user.name}</Link>
          </Typography>
        ) : (
          <Typography>Welcome, visitor!</Typography>
        )}

        {authContext.isAuthenticated ? (
          <Avatar
            src={userInfo.avatar}
            alt={authContext.user.name}
          ></Avatar>
        ) : (
          //this is where I'll hook up the avatar photo when I get it from the database context
          <Avatar></Avatar>
        )}
      </div>
    </div>
  );
}
