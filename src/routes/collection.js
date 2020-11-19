import React, { useRef, useState, useEffect } from "react";
import "../App.css";
import { InputBase } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

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

export default function Collection() {
  const classes = useStyles();
  //const authContext = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const focusSearch = useRef(null)

  useEffect(() => {focusSearch.current.focus()}, [])

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  // const getGames = async (query) => {
  //   axios({
  //     method: "get",
  //     url: `https://rawg-video-games-database.p.rapidapi.com/games?search=${query}`,
  //     headers: {
  //       "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
  //       "x-rapidapi-key": process.env.REACT_APP_RAWG_GAMING_API_KEY,
  //     },
  //   }).then((response) => {
  //     let gameData = response.data.results;
  //     console.log(gameData);
  //     return gameData;
  //   });
  // };

  const getGames = async(query) => {
    const results = await fetch(`https://rawg-video-games-database.p.rapidapi.com/games?search=${query}`, {
      headers: {
        "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAWG_GAMING_API_KEY,
        "accept": 'application/json'
      }
    })
    const gamesData = await results.json()
    console.log(gamesData)
    return gamesData.results
  }

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  useEffect(() => {
    let currentQuery = true;
    const controller = new AbortController();
    const loadGames = async () => {
      if (!searchTerm) return setSearchResults([]);
      await sleep(350);
      if (currentQuery) {
        const games = await getGames(searchTerm, controller);
        setSearchResults(games);
      }
    };
    loadGames();
    return () => {
      currentQuery = false;
      controller.abort();
    };
  }, [searchTerm]);

  let renderGames = searchResults.map((reply) => {
    console.log(reply);
    return (
      <div className="searchResults" key={reply.id}>
        <h3>{reply.name}</h3>
        <img src={reply.background_image}></img>
        <p>Released: {reply.released}</p>
        <p>ID: {reply.id}</p>
      </div>
    );
  });

  return (
    <div className="collectionAnimation">
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          value={searchTerm}
          type="text"
          ref={focusSearch}
          onChange={handleChange}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
      <h2>Collection!</h2>
      <div className="searchResultsView">
      
        {renderGames}
      
      </div>
      
    </div>
  );
}
