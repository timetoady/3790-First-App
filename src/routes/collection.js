import React, { useRef, useState, useEffect } from "react";
import "../App.css";
import { InputBase } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { AuthContext } from "../contexts/AuthContext";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
//import { GameContext } from "../contexts/APIcontext";
import CircularIndeterminate from "../components/loadingCircle";
import axios from 'axios'

console.log(`Collection says auth state is ${AuthContext.isAuthenticated}`);
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
    maxWidth: "40rem",
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
    width: "90vw",
    [theme.breakpoints.up("sm")]: {
      width: "60vw",
      "&:focus": {
        width: "100%",
      },
    },
  },
  confirmImageBox: {
    alignItems: "center",
    margin: "0 auto"
  },
  confirmImage: {
    maxWidth: "100%",

  },
  loader1:{
    margin: ".5rem 0 .5rem 2rem"
  }
}));

const getGames = async (query) => {
  const results = await fetch(
    `https://rawg-video-games-database.p.rapidapi.com/games?search=${query}`,
    {
      headers: {
        "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAWG_GAMING_API_KEY,
        accept: "application/json",
      },
    }
  );
  const gamesData = await results.json();
  return gamesData.results;
};

export default function Collection() {
  const classes = useStyles();
  //const gameContext = useContext(GameContext);
  //const { getGameDetails, gameData } = gameContext;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedGameName, setSelectedGameName] = useState("");
  const [selectedGameImg, setSelectedGameImg] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gameData, setGameData] = useState({})
  const focusSearch = useRef(null);

  useEffect(() => {
    focusSearch.current.focus();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const showLoading = () => {
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
  };

  const selectedGameHandler = (gameID, gameName, gameImg) => {
    setSelectedGame(gameID);
    setSelectedGameName(gameName);
    setSelectedGameImg(gameImg);
  };

  useEffect(() => {
    const getGameDetails = (searchTerm) => {
      setLoading(true)
      axios({
        method: "GET",
        url: `https://rawg-video-games-database.p.rapidapi.com/games/${searchTerm}`,
        headers: {
          "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_RAWG_GAMING_API_KEY,
        },
      }).then(function (response) {
        console.log(response.data)
        setGameData({
          game: response.data
        });
        setLoading(false)
      });
    };
    const loadSelectedGame = async () => {
      if (selectedGame) {
        showLoading();
        await getGameDetails(selectedGame);
        hideLoading();
      }
    };
    loadSelectedGame();
    return () => {
      getGameDetails();
    };
  }, [selectedGame]);

  const handleGameDetails = async () => {
    console.log(gameData.game);
    // this is where we'll send to the db, get reply

    handleClose();
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const logGameData = () => {
    console.log(`Selected game ID: ${selectedGame}`);
    console.log(`Selected game name: ${selectedGameName}`);
    console.log(`Selected game IMG URL: ${selectedGameImg}`);
    console.log("Game file in gameData:");
    console.log(gameData.game);
  };

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
        showLoading();
        const games = await getGames(searchTerm, controller);
        setSearchResults(games);
        hideLoading();
      }
    };
    loadGames();
    return () => {
      currentQuery = false;
      controller.abort();
    };
  }, [searchTerm]);

  return (
    <div>
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
        <h2>Collection</h2>
        <Button color="primary" variant="outlined" onClick={logGameData}>
          Check
        </Button>
        <div className={classes.loader1}>
          {loading ? <CircularIndeterminate ></CircularIndeterminate> : <h2>Results:</h2>}
        </div>
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {`Do you want to add ${selectedGameName} to your collection?`}
            </DialogTitle>
            <div className={classes.confirmImageBox}>
              {loading ? <CircularIndeterminate></CircularIndeterminate> : <img className={classes.confirmImage} src={selectedGameImg} alt={selectedGameName}></img>}
            </div>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                
              </DialogContentText>
            </DialogContent>


            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleGameDetails} color="primary" autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className="searchResultsView">
          {searchResults.map((reply) => {
            return (
              <div
                className="searchResults"
                key={reply.id}
                value={reply.id}
                onClick={() =>
                  selectedGameHandler(
                    reply.id,
                    reply.name,
                    reply.background_image
                  )
                }
              >
                <div
                  variant="outlined"
                  color="primary"
                  onClick={handleClickOpen}
                >
                  <h3>{reply.name}</h3>

                  <img src={reply.background_image} alt={reply.slug}></img>
                  <p>Released: {reply.released}</p>
                  <p>ID: {reply.id}</p>
                </div>
              </div>
            );
          })}

          {/* {renderGames} */}
        </div>
      </div>
    </div>
  );
}
