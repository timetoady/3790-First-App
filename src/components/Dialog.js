import React, { useContext, useState, createContext } from "react";
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
import { Redirect } from 'react-router-dom'

// stuff;
// const theme = createMuiTheme({
//   palette: {
//     overrides: {
//       container: {
//         backgroundColor: "#000",
//       },
//     },
//   },
// });

export let LoginContext = createContext({
  email: "",
  
})

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#f2f2f2",
  },
  button: {
    border: "none",
    padding: "0 4rem 0 0",
    color: "#f2f2f2",
    width: "100%",
  },
}));

export default function FormDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  //const [loggedEmail, setLoggedEmail] = useState("")
  //const { open, onClose } = props
  const authContext = useContext(AuthContext);

  

  const handleLoginState = () => {
    console.log(`Auth state is ${authContext.isAuth}`)
    if (authContext.isAuth) {
      authContext.logout();
      handleClose();
      
      return;
    }
    if (!authContext.isAuth) {
      handleClickOpen();
      if (open) {
        authContext.login();
      }
    }
  };

  // const handleLoginInfo = (email) => {
  //   setLoggedEmail(email)
  //   return email
  // }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
    let redirect = null
    authContext.isAuth ? redirect = <Redirect to="/user"/> : redirect = <Redirect to="/"/>
  
  return (
    <div>
      {redirect}
      {authContext.isAuth ? 
        <Typography
          className={classes.button}
          color="primary"
          onClick={handleLoginState}
        >
          Logout
        </Typography>
       : 
        <Typography
          className={classes.button}
          color="primary"
          onClick={handleLoginState}
        >
          Login
        </Typography>
      }
      <Dialog
        className={classes.root}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
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
          onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
            try {
              console.log(values.email, values.password);
              //handleLoginInfo(values.email)
              authContext.login();
              handleClose();
            } catch (error) {
              console.error(error);
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
                  Please enter your login information below.
                </DialogContentText>
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
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={Boolean(errors.email || errors.password)}
                  color="primary"
                  //onClick={}
                >
                  Confirm
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}
