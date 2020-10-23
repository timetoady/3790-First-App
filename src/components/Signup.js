import React, { useState } from "react";
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

//Need to do third field, show which are required.
//Need to be able to validate login (probably with useContext, but maybe localStorage).
//Need to use useContext to pass info to Avatar which displays user name and image.
//Need to use useEffect for color changes instead of useState.

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
}));

export default function FormDialog() {
  const classes = useStyles();
  //Open of signup dialog setting
  const [open, setOpen] = useState(false);
  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");
  //if password and username check out, enables confirm button. True is disabled.
  //const [confirmState, setConfirmState] = useState(true);
  //Username duplicate state. True is there is a duplicate.
  // const [isDuplicate, setIsDuplicate] = useState(true);
  //Instruction or error message
  //const [stateMessage, setStateMessage] = useState(
  //   "Please provide an username and password. (Password must be at least 8 characters.)"
  // );
  //style for instruction message
  // const [messageClass, setMessageClass] = useState("");
  //style for Confirm button, depending on if it's disabled
  //const [disableCheck, setDisabledStyle] = useState("");

  const handleOpenState = () => {
    setOpen(!open);
  };

  // const handleUserName = (event) => {
  //   setUserName(event.target.value);
  // };

  // const handelConfirmState = (state) => {
  //   setConfirmState(state);
  // };

  // const handleDuplicateState = (state) => {
  //   console.log(`handleDuplicateState says state is ${state}`);
  //   state === false ? setIsDuplicate(false) : setIsDuplicate(true);
  // };

  // const handlePassword = (event) => {
  //   setPassword(event.target.value);
  // };

  // const handleMessageClass = (className) => {
  //   console.log(`handleMessageClass says className is ${className}`);
  //   setMessageClass(className);
  // };

  // const handleDisabledConfirm = (state) => {
  //   console.log(`Disabled state is set to ${state}`);
  //   state === true
  //     ? setDisabledStyle("classes.enabled")
  //     : setDisabledStyle("classes.disabled");
  // };

  //confirms password is same in both fields, and other checks
  // const confirmPassword = (event) => {
  //   console.log("Confirm password fired");
  //   let confirmation = event.target.value;
  //   console.log(`Checking if ${confirmation} is = ${password}...`);
  //   if (confirmation === password && password.length >= 8) {
  //     if (isDuplicate === false) {
  //       handelConfirmState(false);
  //       resetStateMessage();
  //       handleDisabledConfirm(true);
  //       handleMessageClass("classes.root");
  //     } else {
  //       handelConfirmState(true);
  //       setStateMessage(
  //         "Username not validated. Please put in a valid username."
  //       );
  //       handleMessageClass("classes.error");
  //     }
  //   } else {
  //     setConfirmState(true);
  //     setStateMessage("Invalid password provided. Please try again.");
  //     handleMessageClass("classes.error");
  //   }
  // };

  //gets info by username from localStorage
  // let getInfoByUser = (username) => {
  //   let theItem = JSON.parse(localStorage.getItem(username));
  //   return theItem;
  // };

  // //Returns all key value info in storage in an array, minus nulls
  // let getAllStorageInfo = () => {
  //   let infoArray = [];
  //   for (let key in localStorage) {
  //     infoArray.push(getInfoByUser(key));
  //   }
  //   let noNulls = infoArray.filter((object) => object !== null);
  //   return noNulls;
  // };

  //checks if username is already added to local, and prevents null and empty usernames by allowing the confirm
  //button to work
  // const checkDuplicates = (event) => {
  //   let newUser = event.target.value;
  //   console.log(`Checking if ${newUser} is valid...`);
  //   let local = getAllStorageInfo();
  //   let check = true;
  //   if (userName !== null && userName !== "" && userName !== " ") {
  //     console.log(`Check duplicates says username is ${userName}`);
  //     console.log(`Checking if ${newUser} is in Storage...`);
  //     local.forEach((user) => {
  //       if (user.username === newUser) check = false;
  //     });
  //     if (check === false) {
  //       setIsDuplicate(true);
  //       setStateMessage(
  //         `Duplicate username detected. User ${newUser} already exists.`
  //       );
  //       handleMessageClass("classes.error");
  //       console.log(
  //         `Duplicate username detected. User ${newUser} already exists.`
  //       );
  //     } else {
  //       setIsDuplicate(false);
  //       handleMessageClass("classes.root");
  //       console.log(`${newUser} not found in localStorage. Good to go!`);
  //       handleDuplicateState(false);
  //       handleDisabledConfirm(true);
  //     }
  //   } else {
  //     console.log(`Detected as null, empty, or one space.`);
  //     setStateMessage(
  //       "Null or empty username provided. Please provide a username."
  //     );
  //     handleMessageClass("classes.error");
  //   }
  // };

  //When Confirm button is pressed, commits username, password, and empty array to storage.
  // let setToStorage = () => {
  //   let newUserObj = {};
  //   newUserObj["username"] = userName;
  //   newUserObj["password"] = password;
  //   newUserObj["games"] = [];
  //   localStorage.setItem(newUserObj.username, JSON.stringify(newUserObj));
  //   handleOpenState();
  //   return newUserObj.username;
  // };

  // const resetStateMessage = () => {
  //   setStateMessage(
  //     "Please provide an username and password. (Password must be at least 8 characters.)"
  //   );
  //   handleMessageClass("classes.root");
  // };

  return (
    <div>
      <Typography
        className={classes.button}
        color="primary"
        onClick={handleOpenState}
      >
        Sign Up
      </Typography>
      <Dialog
        className={classes.root}
        open={open}
        onClose={handleOpenState}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Sign up</DialogTitle>
        <Formik
          initialValues={{ email: "", password: "" }}
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
              // .test('passwords-match', 'Passwords must match ya fool', function(value) {
              //   return this.parent.password === value;
              // }),
              .oneOf([Yup.ref("password")], "Does not match password. Try again."),
            URL: Yup.string()
              .url("Must be a valid URL."),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              console.log(values.email, values.password);
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
                <DialogContentText >
                  Please confirm your username and password. You can also add an image URL if you like.
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
                  error={Boolean(touched.passwordConfirm && errors.passwordConfirm)}
                  helperText={touched.passwordConfirm && errors.passwordConfirm}
                  
                />
                <TextField
                  margin="dense"
                  id="picURL"
                  name="picURL"
                  label="Avatar Photo URL"
                  type="url"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleOpenState} color="primary">
                  Cancel
                </Button>
                {/* Here is where we make function to confirm password */}
                <Button
                  //disabled={confirmState}
                  //onClick={setToStorage}
                  color="primary"
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
