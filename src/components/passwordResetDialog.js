import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import firebase from "../lib/firebase";
import { AuthContext } from "../contexts/AuthContext";
import { openState } from "./tabs";


export default function AlertDialog() {
  //const [open, setOpen] = useState(false);
  console.log(`Open state shows as ${openState}`)
  const [loginText, setLoginText] = useState(
    "Do you want to sent a password reset email?"
  );
  const [hideState, setHideState] = useState(false);
  const authContext = useContext(AuthContext);

  const handleHideState = (theState) => {
    setHideState(theState);
  };

  const handlePasswordReset = (email) => {
    const auth = firebase.auth();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setLoginText(
          `Email sent to ${email}. Please check your inbox in the next few minutes to reset your password.`
        );

        handleHideState(true);
      })
      .catch((error) => {
        setLoginText(`${error} Please confirm email ${email} and try again.`);
        console.error(error);
        handleHideState(true);
      });
  };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

  const handleClose = () => {
    
    setHideState(false);
  };

  return (
    <div>
      {openState && authContext.isAuthenticated ? (
        <>
          {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            SEND PASSWORD RESET
          </Button> */}
          <Dialog
            open={openState}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {loginText}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" autoFocus>
                CANCEL
              </Button>
              <Button onClick={() => {handlePasswordReset(authContext.user.email)}} color="primary">
                CONFIRM
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <DialogContentText id="alert-dialog-description">
          {loginText}
        </DialogContentText>
      )}
    </div>
  );
}
