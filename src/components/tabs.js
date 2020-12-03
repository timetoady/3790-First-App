import React, { useContext, useState, useEffect } from "react";
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
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
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={userInfo.avatar}
                title={`${userInfo.userName}'s Account`}
              />
              <CardContent>
                <Typography gutterBottom  component="h6">
                  {userInfo.userName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
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

              <Button size="small" color="primary">
                SEND PASSWORD RESET EMAIL
              </Button>
            </CardActions>
          </Card>
        </div>
      </TabPanel>
    </div>
  );
}
