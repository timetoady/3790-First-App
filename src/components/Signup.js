import React, { useState, useContext } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../contexts/AuthContext";
import { Redirect, Link } from "react-router-dom";
import firebase from "../lib/firebase";



//Need to do third field, show which are required.
//Need to be able to validate login (probably with useContext, but maybe localStorage).
//Need to use useContext to pass info to Avatar which displays user name and image.

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#f2f2f2",
    "&::placeholder": {
      textOverflow: "ellipsis !important",
    },
  },
  button: {
    border: "none",
    padding: "0 4rem 0 0",
    width: "100%",
    textDecoration: "none",
    color: "#f2f2f2",
  },
  error: {
    fontWeight: 500,
    color: "red !important",
  },
  disabled: {
    color: "#eee !important",
  },
  enabled: {
    color: "#f2f2f2",
  },
  formLable: {
    color: "rgba(205, 205, 205, 0.54)",
  },
  a: {
    
  }
}));

export default function FormDialog() {
  const classes = useStyles();
  //Open of signup dialog setting
  const [open, setOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const { createUserWithEmailAndPassword } = authContext

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleSignup = async (email, password) => {
  //   try {
  //     await createUserWithEmailAndPassword(email, password)
  //     handleClose()
  //   } catch(error){
  //     console.error(error)
  //   }
  // }


  const handleLoginState = () => {
    console.log(`Signup says auth state is ${authContext.isAuthenticated}`);
    if (authContext.isAuthenticated) {
      authContext.logout();
      handleClose();
      return;
    }
    if (!authContext.isAuthenticated) {
      handleClickOpen();
      if (open) {
        authContext.login();
      }
    }
  };

  let redirect = null;
  authContext.isAuthenticated
    ? (redirect = <Redirect to="/user" />)
    : (redirect = <Redirect to="/" />);

  return (
    <div>
      {redirect}
      {authContext.isAuthenticated ? (
        <Typography
          className={classes.button}
          color="primary"
        >
         <Link to="/">Home</Link> 
        </Typography>
      ) : (
        <Typography
          className={classes.button}
          color="primary"
          onClick={handleLoginState}
        >
          Sign Up
        </Typography>
      )}

      <Dialog
        className={classes.root}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Sign up</DialogTitle>
        <Formik
          initialValues={{ email: "", password: "",  }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Invalid email provided.")
              .max(30)
              .required("Must have an email sign up."),
            password: Yup.string()
              .min(8)
              .max(30)
              .required("Please add a password."),
            passwordConfirm: Yup.string()
              .min(8)
              .max(30)
              .required("Please confirm your password.")
              .oneOf(
                [Yup.ref("password")],
                "Does not match password. Try again."
              ),
            picURL: Yup.string().url("Must be a valid URL."),
          })}
          onSubmit={ async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              console.log(values.email, values.password, values.picURL);
              await createUserWithEmailAndPassword(values.email, values.password)
              .then(function(user) {
                // get user data from the auth trigger
                const userUid = values.email; // The UID of the user.
                const email = values.email; // The email of the user.
                const displayName = values.email; // The display name of the user.
                const userImg = values.picURL
                console.log(`User email from create: ${user.email}`)
                // set account  doc  
                const account = {
                  useruid: userUid,
                  email,
                  userName: displayName,
                  collection: [],
                  wishlist: [],
                  avatar: userImg 

                }
                firebase.firestore().collection("users").doc(userUid).set(account); 
              }).then(() => console.log("Successfully added user info to database."))
              .catch(function(error) {
                // Handle Errors here.
                console.log("There was an error.")
                console.error(error)
              });
              handleClose();
            } catch (error) {
              console.error(error);
              setStatus({ success: false})
              setErrors({submit: error.message})
              setSubmitting(false)
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form noValidate onSubmit={handleSubmit} autoComplete="off">
              <DialogContent>
                <DialogContentText>
                  Please confirm your username and password. You can also add an
                  image URL if you like.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth
                  value={values.email}
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  margin="dense"
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  required
                />
                <TextField
                  margin="dense"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  label="Confirm Password"
                  type="password"
                  required
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.passwordConfirm}
                  error={Boolean(
                    touched.passwordConfirm && errors.passwordConfirm
                  )}
                  helperText={touched.passwordConfirm && errors.passwordConfirm}
                />
                <TextField
                  margin="dense"
                  id="picURL"
                  name="picURL"
                  label="Avatar Photo URL"
                  value={values.picURL}
                  type="url"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.picURL && errors.picURL)}
                  helperText={touched.picURL && errors.picURL}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  disabled={
                    Boolean(errors.passwordConfirm || errors.password || errors.email)
                  }
                >
                  Signup
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}
