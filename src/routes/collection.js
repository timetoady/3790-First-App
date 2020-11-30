import React, { useRef, useState, useEffect } from "react"; //useContext
import "../App.css";
import { InputBase } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { AuthContext } from "../contexts/AuthContext";
// import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
//import { GameContext } from "../contexts/APIcontext";
//import axios from 'axios'


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
}));

// const iWasClicked = (gameID) => {
//   console.log(`Game ${gameID} was clicked!`)
// }

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
  console.log(gamesData);
  return gamesData.results;
};

export default function Collection() {
  const classes = useStyles();
  //const gameContext = useContext(GameContext);
  //const { getGameDetails } = gameContext;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  //const [selectedGame, setSelectedGame] = useState("")
  const [open, setOpen] = useState(false);
  const focusSearch = useRef(null);
  // const [gameData, setGameData] = useState({
  //   game: {},
  // });


  
  useEffect(() => {
    focusSearch.current.focus();
  }, []);

  const handleClickOpen = (gameID) => {
  //setSelectedGame(gameID)
  setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Important section for setting the game to get once I figure out the re-rendering problem

// const selectedGameHandler = (gameID) =>{
//   console.log(gameID)
//   setSelectedGame(gameID)
// }

//   const handleGameDetails = (gameID) => {
//     const game = getGameDetails(gameID);
//     console.log(game);
//     handleClose()
//   };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // const handleSearchResults = (results) => {
  //   setSearchResults(results);
  // };



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

  // const getGameDetails = (searchTerm) => {
  //   axios({
  //     method: "GET",
  //     url: `https://rawg-video-games-database.p.rapidapi.com/games/${searchTerm}`,
  //     headers: {
  //       "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
  //       "x-rapidapi-key": process.env.REACT_APP_RAWG_GAMING_API_KEY,
  //     },
  //   }).then(function (response) {
  //     setGameData({
  //       game: response.results
  //     });
  //   });
  // };


// const showGameInfo = (number) => {
//   getGameDetails(number)
//   console.log(gameData)
// }

  // let renderGames = searchResults.map((reply) => {
  //   return (
  //     <div className="searchResults" key={reply.id} >
  //         <h3>{reply.name}</h3>
  //         <img src={reply.background_image} alt={reply.slug} ></img>
  //         <p>Released: {reply.released}</p>
  //         <p>ID: {reply.id}</p>
  //     </div>
  //   );
  // });

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

        <div>
 
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Do you want to add this game to your collection?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
        Confirm to add to your collection.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
      <div className="searchResultsView">

          {searchResults.map((reply) => {
    return (
      <div className="searchResults" key={reply.id} >
         <div variant="outlined" color="primary" onClick={handleClickOpen}>
          <h3>{reply.name}</h3>
         
        
      
          <img src={reply.background_image} alt={reply.slug}></img>
          <p>Released: {reply.released}</p>
          <p>ID: {reply.id}</p>
          </div>

      </div>
    )})}

        {/* {renderGames} */}
        </div>

     
        </div>
    </div>
  );
}
