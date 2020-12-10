import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import {DialogContent} from '@material-ui/core/';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from "@material-ui/core/styles";

export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

    userInfo: {
      display: "flex",
  
    },
    aboutText: {
        color: "black",
    }
  }));
  const classes = useStyles();

  return (
    <div>
      <div className={classes.button} variant="outlined" color="primary" onClick={handleClickOpen}>
        ABOUT
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"About GamesApp"}</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.aboutText}>
            This games app is a sample showcase of some React elements working together. Using it, you can login, either by signing up with your email, password, and URL for an avatar image, or via Facebook or Google. 
        </DialogContentText>
        <DialogContentText className={classes.aboutText}>
            Once logged in, you can search for your favorite games, and select from the results to add them to your collection or wishlist. You can also go to My Account and view some basic information, send a password reset email, or change your avatar by clicking on your image.
        </DialogContentText>
        <DialogContentText className={classes.aboutText}>
            Clicking on any game in your Collection or Wishlist will provide a game description, and allow you remove the game from that list. 
        </DialogContentText>
        <DialogContentText className={classes.aboutText}>
            Please enjoy GamesApp!
        </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            CLOSE
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}
