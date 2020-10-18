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

//Need to do third field, show which are required.
//Need to be able to validate login (probably with useContext, but maybe localStorage).  
//Need to use useContext to pass info to Avatar which displays user name and image. 
//Need to use useEffect for color changes instead of useState.

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#f2f2f2",
  },
  button: {
    border: "none",
    padding: "0 4rem 0 0",
    width: "100%",
  },
  error: {
    fontWeight: 500,
    color: "red !important",
  },
  disabled: {
    color: "gray !important",
  },
  enabled: {
    color: "#f2f2f2",
  },
}));

export default function FormDialog() {
  const classes = useStyles();
  //Open of signup dialog setting
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  //if password and username check out, enables confirm button. True is disabled.
  const [confirmState, setConfirmState] = useState(true);
  //Username duplicate state. True is there is a duplicate.
  const [isDuplicate, setIsDuplicate] = useState(true);
  //Instruction or error message
  const [stateMessage, setStateMessage] = useState(
    "Please provide an username and password. (Password must be at least 8 characters.)"
  );
  //style for instruction message
  const [messageClass, setMessageClass] = useState("classes.root");
  //style for Confirm button, depending on if it's disabled
  const [disableCheck, setDisabledStyle] = useState("classes.disabled");

  const handleOpenState = () => {
    setOpen(!open);
  };

  const handleUserName = (event) => {
    setUserName(event.target.value);
  };

  const handelConfirmState = (state) => {
      setConfirmState(state)
  }

  const handleDuplicateState = (state) => {
      console.log(`handleDuplicateState says state is ${state}`)
      state === false ? setIsDuplicate(false) : setIsDuplicate(true)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleMessageClass = (className) => {
    setMessageClass(className);
  };

  const handleDisabledConfirm = (state) =>{
      state === true ? setDisabledStyle('classes.enabled') : setDisabledStyle('classes.disabled')

  }

  //confirms password is same in both fields, and other checks
  const confirmPassword = (event) => {
    console.log("Confirm password fired");
    let confirmation = event.target.value;
    console.log(`Checking if ${confirmation} is = ${password}...`);
    if (
      confirmation === password &&
      password.length >= 8
    ) {if (isDuplicate === false) {
        handelConfirmState(false);
        handleMessageClass("classes.root");
        resetStateMessage()
        handleDisabledConfirm(true)
    } else {
        handelConfirmState(true);
        setStateMessage("Username not validated. Please put in a valid username.")
        handleMessageClass("classes.error");
    }

    } else {
      setConfirmState(true);
      setStateMessage("Invalid password provided. Please try again.")
      handleMessageClass("classes.error");
    }
  };

  //gets info by username from localStorage
  let getInfoByUser = (username) => {
    let theItem = JSON.parse(localStorage.getItem(username));
    return theItem;
  };

  //Returns all key value info in storage in an array, minus nulls
  let getAllStorageInfo = () => {
    let infoArray = [];
    for (let key in localStorage) {
      infoArray.push(getInfoByUser(key));
    }
    let noNulls = infoArray.filter((object) => object !== null);
    return noNulls;
  };

  //checks if username is already added to local, and prevents null and empty usernames by allowing the confirm
  //button to work
  const checkDuplicates = (event) => {
    let newUser = event.target.value;
    console.log(`Checking if ${newUser} is in Storage...`);
    let local = getAllStorageInfo();
    let check = true;
    if (userName !== null && userName !== "" && userName !== " ") {
        local.forEach((user) => {
            if (user.username === newUser) check = false
        })
        if (check === false) {
            setIsDuplicate(true);
            setStateMessage(`Duplicate username detected. User ${newUser} already exists.`);
            console.log(`Duplicate username detected. User ${newUser} already exists.`)
            setMessageClass('classes.error')
        } else {
            setIsDuplicate(false);
            setMessageClass('classes.root')
            console.log(`${newUser} not found in localStorage. Good to go!`);
            handleDuplicateState(false)
            handleDisabledConfirm(true)
        }
    } else {
        setStateMessage("Null or empty username provided. Please provide a username.");
        setMessageClass('classes.error')
    }
  };

  //When Confirm button is pressed, commits username, password, and empty array to storage.
  let setToStorage = () => {
    let newUserObj = {};
    newUserObj["username"] = userName;
    newUserObj["password"] = password;
    newUserObj["games"] = [];
    localStorage.setItem(newUserObj.username, JSON.stringify(newUserObj));
    handleOpenState();
    return newUserObj.username;
  };

  const resetStateMessage = () => {
    setStateMessage(
      "Please provide an username and password. (Password must be at least 8 characters.)"
    );
  };

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
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText className={messageClass}>{stateMessage}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="User Name"
            type="text"
            fullWidth
            value={userName}
            onChange={handleUserName}
            onFocus={resetStateMessage}
            onBlur={checkDuplicates}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={handlePassword}
          />
          <TextField
            margin="dense"
            id="confirmPass"
            label="Confirm Password"
            type="password"
            fullWidth
            onFocus={resetStateMessage}
            onBlur={confirmPassword}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenState} color="primary">
            Cancel
          </Button>
          {/* Here is where we make function to confirm password */}
          <Button
            disabled={confirmState}
            className={disableCheck}
            onClick={setToStorage}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
