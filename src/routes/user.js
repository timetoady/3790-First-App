import React, { useContext } from "react";
import "../App.css";
import { fade, makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../contexts/AuthContext";
import { Route, Switch, Redirect } from "react-router-dom";
import Games2 from "../components/Games2"
import { Collection } from "../routes/collection";
import { Wishlist } from "../routes/wishlist";

//Here, we'll render a UserGames component, where they can search for an add
//games to their list. Ideally, it will query rapidapi, allow them to select a game,
//and import it by scooping up the JSON data to store locally/on a database,
//so it doesnt' have to call the API for individual games 30 times.

//Two routes: collection and wish list that they can add things to.
console.log(`user says auth state is ${AuthContext.isAuth}`);
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    maxWidth: "30%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  inputRoot: {
    color: "white",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function User() {
  //const classes = useStyles();
  const authContext = useContext(AuthContext);

  return authContext.isAuth ? (
    <div>
      <Switch>
        <Route path="/" component={Collection} />
        <Route path="/wishlist" component={Wishlist} />
      </Switch>
    </div>
  ) : (
    <Redirect to="/">
      {console.log(`User says auth state is ${AuthContext.isAuth}`)}
    </Redirect>
  );
}
