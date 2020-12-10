import React, { useContext, useState } from "react";
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
import { Redirect } from "react-router-dom";
import firebase from "../lib/firebase";
import CircularIndeterminate from "../components/loadingCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#f2f2f2",
  },
  button: {
    border: "none",
    padding: ".75rem",
    cursor: "pointer",
    width: "100%",
    textDecoration: "none",
    color: "#f2f2f2",
    fontSize: '1rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: `0.00938em`
  },
  providerIcon: {
    width: "50px",
    marginRight: ".4rem",
  },
  hideThis: {
    display: "none !important",
  },
  loader: {
    margin: ".5rem 0 .5rem 0rem",
    padding: "1rem",
    display: "flex",
    justifyContent: "center",
  },
}));

export default function FormDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [loginText, setLoginText] = useState(
    "Please enter your login information below. You can also use the email field to reset your password."
  );
  const [hideState, setHideState] = useState(false);
  const authContext = useContext(AuthContext);
  const {
    signInWithGoogle,
    signInWithEmailAndPassword,
    signInWithFacebook,
  } = authContext;
  const [loading, setLoading] = useState(false);

  const handleLoading = (loadingState) => {
    setLoading(loadingState);
  };

  const handleHideState = (theState) => {
    setHideState(theState);
  };

  const handleGoogleClick = async () => {
    try {
      handleLoading(true);
      await signInWithGoogle()
        .then(function (user) {
          // get user data from the auth trigger
          const theUser = user.additionalUserInfo.profile;
          console.log("Here's the user:", user);
          if (user.additionalUserInfo.isNewUser === true) {
            console.log("New user detected!");
            const userUid = theUser.id; // The UID of the user.
            const email = theUser.email; // The email of the user.
            const displayName = theUser.name; // The display name of the user.
            const userImg = theUser.picture;
            console.log(`User email from Google Login: ${email}`);
            // set account  doc

            const account = {
              useruid: userUid,
              email,
              userName: displayName,
              collection: [],
              wishlist: [],
              avatar: userImg,
            };

            firebase
              .firestore()
              .collection("users")
              .doc(email)
              .set(account)
              .then(() => {
                console.log("Successfully added user info to database.");
                handleLoading(false);
              });
          } else {
            console.log(`Account ${user.additionalUserInfo.name}`);
            handleLoading(false);
          }
        })
        .catch(function (error) {
          // Handle Errors here.
          console.log("There was an error.");
          console.error(error);
          alert(`${error}. Please confirm and try again.`);
          handleLoading(false);
        });

      handleClose();
    } catch (error) {
      console.error(error);
      alert(`${error}. Please confirm and try again.`);
      handleLoading(false);
    }
  };

  const handleFacebookClick = async () => {
    handleLoading(true);
    try {
      await signInWithFacebook()
        .then(function (result) {
          console.log("Here's the facebook result:", result);
          if (result.additionalUserInfo.isNewUser) {
            //const token = result.credential.accessToken;
            const userId = result.additionalUserInfo.profile.id;
            const userName = result.additionalUserInfo.profile.name;
            const email = result.additionalUserInfo.profile.email;
            const imgURL = result.additionalUserInfo.profile.picture.data.url;
            //const imgURL =`https://graph.facebook.com/me/picture?access_token=${token}`
            const account = {
              useruid: userId,
              email,
              userName: userName,
              collection: [],
              wishlist: [],
              avatar: imgURL,
            };
            firebase
              .firestore()
              .collection("users")
              .doc(email)
              .set(account)
              .then(() => {
                console.log("Successfully added user info to database.");
                handleLoading(false);
              });
          } else {
            console.log(`Account ${result.additionalUserInfo.profile.email}`);
          }
        })

        .catch(function (error) {
          // Handle Errors here.
          console.log("There was an error.");
          console.error(error);
          handleLoading(false);
          alert(`${error}. Please confirm and try again.`);
        });
      handleClose();
    } catch (error) {
      console.log(`${error} -- came from Dialog`);
      console.error(error);
      handleLoading(false);
      alert(`${error}. Please confirm and try again.`);
    }
  };

  const handlePasswordReset = (email) => {
    handleLoading(true);
    const auth = firebase.auth();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setLoginText(
          `Email sent to ${email}. Please check your inbox in the next few minutes to reset your password.`
        );
        handleLoading(false);
        handleHideState(true);
      })
      .catch((error) => {
        setLoginText(`${error} Please confirm email ${email} and try again.`);
        console.error(error);
        handleHideState(true);
        handleLoading(false);
      });
  };

  const handleLoginState = () => {
    console.log(`Auth state is ${authContext.isAuthenticated}`);
    if (authContext.isAuthenticated === true) {
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLoginText(
      "Please enter your login information below. You can also use the email field to send a password reset email."
    );
    handleHideState(false);
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
          onClick={handleLoginState}
        >
          LOGOUT
        </Typography>
      ) : (
        <Typography
          className={classes.button}
          color="primary"
          onClick={handleLoginState}
        >
          LOGIN
        </Typography>
      )}
      <div>
        <Dialog
          className={classes.root}
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          {hideState ? (
            <>
              {loginText}
              {loading ? (
                <div className={classes.loader}>
                  <CircularIndeterminate></CircularIndeterminate>
                </div>
              ) : null}
              <Button onClick={handleClose} color="primary">
                CLOSE
              </Button>
            </>
          ) : (
            <>
              <DialogTitle id="form-dialog-title">Login</DialogTitle>
              <Button
                className={classes.googleButton}
                fullWidth
                onClick={handleGoogleClick}
                size="large"
              >
                <img
                  alt="Google"
                  className={classes.providerIcon}
                  src="/static/images/google-icon.svg"
                />
                Login with Google
              </Button>
              <Button
                className={classes.googleButton}
                fullWidth
                onClick={handleFacebookClick}
                size="large"
              >
                <img
                  alt="Facebook"
                  className={classes.providerIcon}
                  src="/static/images/facebook-icon.svg"
                />
                Login with Facebook
              </Button>
              {loading ? (
                <div className={classes.loader}>
                  <CircularIndeterminate></CircularIndeterminate>
                </div>
              ) : null}
              <Formik
                initialValues={{ email: "you@email.com", password: "" }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email("Invalid email provided.")
                    .max(30)
                    .required("Must have email to login."),
                  password: Yup.string()
                    .min(8)
                    .max(30)
                    .required("Please add your password to login."),
                })}
                onSubmit={async (
                  values,
                  { setErrors, setStatus, setSubmitting }
                ) => {
                  try {
                    console.log(values.email, values.password);
                    await signInWithEmailAndPassword(
                      values.email,
                      values.password
                    );
                    handleClose();
                  } catch (error) {
                    console.error(error);
                    setStatus({ success: false });
                    setErrors({ submit: error.message });
                    setSubmitting(false);
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
                      <DialogContentText>{loginText}</DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                        required
                        tabIndex={0}
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
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={() => handlePasswordReset(values.email)}
                        color="primary"
                      >
                        SEND PASSWORD RESET EMAIL
                      </Button>
                      <Button onClick={handleClose} color="primary">
                        CANCEL
                      </Button>
                      <Button
                        type="submit"
                        disabled={Boolean(errors.email || errors.password)}
                        color="primary"
                      >
                        CONFIRM
                      </Button>
                    </DialogActions>
                  </form>
                )}
              </Formik>
            </>
          )}
        </Dialog>
      </div>
    </div>
  );
}
