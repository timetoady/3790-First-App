import React, { useState, useContext, useEffect } from "react";
import { Avatar, Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "./Dialog";
import Signup from "./Signup";
import ResponsiveDialog from "./about"
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import firebase from "../lib/firebase";
//import { FullscreenExit } from "@material-ui/icons";
//import useMediaQuery from '@material-ui/core/useMediaQuery';


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
    border: "none",
    padding: ".75rem .2rem .75rem .75rem",
    width: "100%",
    textDecoration: "none",
    color: "#f2f2f2",
    fontSize: '1rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0.00938em'
  },
  menu: {
    display: "flex",
    justifyContent: "",
    textAlign: "left",
    margin: "auto 0",

  },
  menuItem: {
    "&:hover": {
      background: "#000077",
    },
    color: "#f2f2f2",
  },
  userInfo: {
    display: "flex",

  },
  loginDiv: {
    display: "flex",
  },
  avatar:{
    margin: "auto",
  }
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


  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDialogToggle = () => {
    setDialogOpen(!dialogOpen);
    handleMenuClose();
  };
  
  return (
    <div className={classes.root} id="menuRoot">
      <div
        className={classes.menu}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
   
        <Link
          tabIndex={0}
          className={classes.menuItem}
          onClick={handleMenuClose}
        >
          <ResponsiveDialog></ResponsiveDialog>
        </Link>
        <div
          tabIndex={0}
          className={classes.menuItem}
          onClick={handleMenuClose}
        >
          <Signup></Signup>
        </div>
      </div>
      
      <div className={classes.menu} id="simple-menu2">
      <div
          tabIndex={-1}
          
          className={classes.menuItem}
          onClick={handleDialogToggle}
        >
          <Dialog open={dialogOpen} onClose={handleDialogToggle}></Dialog>
        </div>

        <div className={classes.loginDiv}>
        {authContext.isAuthenticated ? (
          <Typography className={classes.button}>
            <Link to="/user">{authContext.user.name}</Link>
          </Typography>
        ) : (
          <Typography className={classes.button}>Welcome, visitor!</Typography>
        )}

        {authContext.isAuthenticated ? (
         <Link to="/user" className={classes.avatar} id="avatarCircle"> <Avatar
            src={userInfo.avatar}
            alt={authContext.user.name}
          ></Avatar></Link>
        ) : (
          //this is where I'll hook up the avatar photo when I get it from the database context
          <Avatar id="avatarCircle"></Avatar>
        )}

        </div>

      </div>
    </div>
  );
}
