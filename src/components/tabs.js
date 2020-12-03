import React, { useContext, useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from "@material-ui/core";
import Wishlist from "../routes/wishlist";
import MyCollection from "../routes/collection";
import { AuthContext } from "../contexts/AuthContext";
import firebase from "../lib/firebase";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export let openState = createContext({ open: false });

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  // const gameContext = useContext(GameContext);
  // const { getGameDetails } = gameContext

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "none",
  },
  media: {
    height: 340,
  },
  secondRoot: {
    maxWidth: 345,
  },
  tab3: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [open, setOpen] = useState(false);
  const [loginText, setLoginText] = useState("");
  const [hideState, setHideState] = useState(false);
  const [openAvatar, setOpenAvatar] = useState(false);
  const [avatarValue, setAvatarValue] = useState("");
  const [changeAvatarText, setChangeAvatarText] = useState(
    "Add new avatar photo URL below."
  );
  const [avatarDialogState, setAvatarDialogState] = useState(false);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext.isAuthenticated) {
      const getUserInfo = () => {
        let userEmail = authContext.user.email;
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
      getUserInfo();
    }
  }, [authContext]);

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

  const handleAvatarOpen = () => {
    setOpenAvatar(!openAvatar);
    setAvatarDialogState(true);
  };

  const handleNewAvatarImgURL = async (newPhotoURL) => {
    let userEmail = authContext.user.email;
    const dbUser = firebase.firestore().collection("users").doc(userEmail);
    dbUser
      .update({
        avatar: newPhotoURL,
      })
      .then(() => {
        setTimeout(function () {
          setChangeAvatarText(
            "Update complete. It may take a few minutes and you may have to refersh your browser to complete."
          );
          setAvatarDialogState(false);
        }, 100);
      })
      .catch((error) => {
        setChangeAvatarText(`${error}`);
      });
  };

  const handleOpenState = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
    setHideState(false);
  };

  useEffect(() => {
    open ? (openState = true) : (openState = false);
  }, [open]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeAvatarValue = (event) => {
    setAvatarValue(event.target.value);
  };

  return (
    <div>
      {avatarDialogState ? (
        <>
          <Dialog
            open={openAvatar}
            onClose={handleAvatarOpen}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Change Avatar</DialogTitle>
            <DialogContent>
              <DialogContentText>{changeAvatarText}</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="avatarPhotoURL"
                label="Email Address"
                type="email"
                fullWidth
                onChange={handleChangeAvatarValue}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAvatarOpen} color="primary">
                CANCEL
              </Button>
              <Button
                onClick={() => handleNewAvatarImgURL(avatarValue)}
                color="primary"
              >
                CONFIRM
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <>
          <Dialog
            open={openAvatar}
            onClose={handleAvatarOpen}
            aria-labelledby="form-dialog-title"
          >
            <DialogContentText>{changeAvatarText}</DialogContentText>
            <DialogActions>
              <Button onClick={handleAvatarOpen} color="primary">
                CLOSE
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {hideState ? (
            <>
              {loginText}
              <Button onClick={handleClose} color="primary">
                CLOSE
              </Button>
            </>
          ) : (
            <>
              <DialogTitle id="alert-dialog-title">
                {"Send a password reset email?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {loginText}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  CANCEL
                </Button>
                <Button
                  onClick={() => handlePasswordReset(authContext.user.email)}
                  color="primary"
                  autoFocus
                >
                  CONFIRM
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </div>

      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Collection" {...a11yProps(0)} />
            <Tab label="Wishlist" {...a11yProps(1)} />
            <Tab label="Your Account" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <MyCollection></MyCollection>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Wishlist></Wishlist>
        </TabPanel>
        <TabPanel className={classes.tab3} value={value} index={2}>
          <div>
            <h2>Your Account</h2>

            <Card className={classes.secondRoot}>
              <CardActionArea onClick={handleAvatarOpen}>
                <CardMedia
                  className={classes.media}
                  image={userInfo.avatar}
                  title={`${userInfo.userName}'s Account`}
                />
                <CardContent>
                  <Typography gutterBottom component="h6">
                    {userInfo.userName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Your current game list:
                    {authContext.isAuthenticated && userInfo.collection ? (
                      userInfo.collection.map((game) => {
                        return ` ${game.name}, `;
                      })
                    ) : (
                      <p>Loading...</p>
                    )}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button onClick={handleOpenState} size="small" color="primary">
                  SEND PASSWORD RESET EMAIL
                </Button>
              </CardActions>
            </Card>
          </div>
        </TabPanel>
      </div>
    </div>
  );
}
