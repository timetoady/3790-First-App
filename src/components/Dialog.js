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
  //const { open, onClose } = props

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Typography
        className={classes.button}
        color="primary"
        onClick={handleClickOpen}
      >
        Login
      </Typography>
      <Dialog
        className={classes.root}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your login information below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
