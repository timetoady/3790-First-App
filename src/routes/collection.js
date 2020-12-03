import React, { useRef, useState, useEffect, useContext } from "react";
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
import axios from "axios";
import firebase from "../lib/firebase";

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
  description: {
    "& p": {
      color: "black !important",
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
    margin: "0 auto",
  },
  confirmImage: {
    maxWidth: "100%",
  },
  loader1: {
    margin: ".5rem 0 .5rem 2rem",
  },
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
  const [open2, setOpen2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gameData, setGameData] = useState({});
  const [collection, setCollection] = useState([]);
  const [collectedGameObject, setCollectedGameObject] = useState({});
  const [collectionGameId, setCollectionGameID] = useState("");
  const [collectionGameName, setCollectionGameName] = useState("");
  const [collectionGameDescription, setCollectionGameDescription] = useState(
    ""
  );
  const [collectionGameNameImg, setCollectionGameNameImg] = useState("");
  const focusSearch = useRef(null);
  const authContext = useContext(AuthContext);
  const userEmail = authContext.user.email;

  useEffect(() => {
    let dbUser = firebase.firestore().collection("users").doc(userEmail);

    const getCollection = () => {
      showLoading();
      dbUser
        .get()
        .then(function (doc) {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            setCollection(doc.data().collection);
            hideLoading();
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            hideLoading();
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    };
    getCollection();
  }, [userEmail, collectedGameObject]);

  useEffect(() => {
    focusSearch.current.focus();
  }, []);

  useEffect(() => {
    const getGameDetails = (searchTerm) => {
      setLoading(true);
      axios({
        method: "GET",
        url: `https://rawg-video-games-database.p.rapidapi.com/games/${searchTerm}`,
        headers: {
          "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_RAWG_GAMING_API_KEY,
        },
      }).then(function (response) {
        console.log(response.data);
        setGameData({
          game: response.data,
        });
        setLoading(false);
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
  }, [selectedGame]);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen2 = (name, id, description, background_image, object) => {
    selectedGameHandler(
      collectionGameId,
      collectionGameName,
      collectionGameNameImg
    );

    gameInfoModalHandler(
      name,
      id,
      description,
      background_image,
      object
    );
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
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

  const gameInfoModalHandler = (
    gameName,
    gameID,
    gameDescription,
    gameImg,
    object
  ) => {
    setCollectionGameName(gameName);
    setCollectionGameID(gameID);
    setCollectionGameDescription(gameDescription);
    setCollectionGameNameImg(gameImg);
    setCollectedGameObject(object);
    console.log(object)
  };

  const handleGameDetails = async () => {
    const dbUser = firebase.firestore().collection("users").doc(userEmail);
    dbUser
      .update({
        collection: firebase.firestore.FieldValue.arrayUnion(gameData.game),
      })
      .then(() => {
        setTimeout(function() {
          // setSelectedGame("");
          setSearchTerm("");
          setCollectedGameObject({})
        }, 100)

      });
    console.log("Added new game to collection!");
    handleClose();
  };

  const handleRemoveFromCollection = async () => {
    console.log(collectedGameObject);
    console.log(userEmail);

    const dbUser = firebase.firestore().collection("users").doc(userEmail);
    dbUser
      .update({
        collection: firebase.firestore.FieldValue.arrayRemove(
          collectedGameObject
        ),
      })
      .then(() => {
        

        setSelectedGame("");
        setSearchTerm("");
        setCollectedGameObject({});
      }).catch((error) =>{
        console.error(error)
      })

    console.log(`Removed ${collectionGameName} from collection.`);
    handleClose2();
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
            autoFocus
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
          {loading ? (
            <CircularIndeterminate></CircularIndeterminate>
          ) : (
            <h2>Results:</h2>
          )}
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
              {loading ? (
                <CircularIndeterminate></CircularIndeterminate>
              ) : (
                <img
                  className={classes.confirmImage}
                  src={selectedGameImg}
                  alt={selectedGameName}
                ></img>
              )}
            </div>
            <DialogContent>
              <DialogContentText id="alert-dialog-description"></DialogContentText>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose} color="primary">
                CANCEL
              </Button>
              <Button onClick={handleGameDetails} color="primary" autoFocus>
                CONFIRM
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div className={classes.loader1}>
          {loading ? (
            <CircularIndeterminate></CircularIndeterminate>
          ) : (
            <h2>{userEmail}'s Collection</h2>
          )}
        </div>
        <div>
          <Dialog
            open={open2}
            onClose={handleClose2}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <h2>{collectionGameName}</h2>
            </DialogTitle>
            <div className={classes.confirmImageBox}>
              {loading ? (
                <CircularIndeterminate></CircularIndeterminate>
              ) : (
                <img
                  className={classes.confirmImage}
                  src={collectionGameNameImg}
                  alt={collectionGameName}
                ></img>
              )}
            </div>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <h2>Description</h2>
                <div
                  className={classes.description}
                  dangerouslySetInnerHTML={{
                    __html: `${collectionGameDescription}`,
                  }}
                ></div>
              </DialogContentText>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose2} autoFocus color="primary">
                CLOSE
              </Button>
              <Button
                onClick={() => handleRemoveFromCollection()}
                color="primary"
              >
                REMOVE FROM COLLECTION?
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
          

          {loading ? (
            <CircularIndeterminate></CircularIndeterminate>
          ) : (
            collection.map((reply) => {
              return (
                <div
                  className="searchResults"
                  key={reply.id}
                  value={reply.id}
                  
                >
                  <div
                    variant="outlined"
                    color="primary"
                    onClick={() => handleClickOpen2(reply.name, reply.id, reply.description, reply.background_image, reply)}
                  >
                    <h3>{reply.name}</h3>

                    <img src={reply.background_image} alt={reply.slug}></img>
                    <p>Released: {reply.released}</p>
                    <p>ID: {reply.id}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
