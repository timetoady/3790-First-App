import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useRef,
} from "react";
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });
  
export default function Search() {
// const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const focusSearch = useRef(null);

  useEffect(() => {focusSearch.current.focus()}, []);

  const getGames =  (searchTerm) => {
    axios({
      method: "get",
      url: `https://rawg-video-games-database.p.rapidapi.com/games?search=${searchTerm}`,
      headers: {
        "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAWG_GAMING_API_KEY,
      },
    }).then(function (response) {
      setSearchResults({
        gameData: response.data.results,
      });
    });
  };

  const sleep = (ms) =>{
    return new Promise(resolve => setTimeout(resolve, ms))
}

useEffect(() =>{
    let currentQuery = true
    const controller = new AbortController()

    const loadGames = async () =>{
        if (!searchTerm) return setSearchTerm([])
        await sleep(350)
        if (currentQuery) {
            const games = await getGames(searchTerm, controller)
        }
    }
    loadGames()
    return () => {
        currentQuery = false
        controller.abort()
    }
}, [searchTerm])
}



//Render games

// let gameComponents = searchResults.map((game, index) =>{
//     return (
//         <Card className={classes.root}>
//         <CardActionArea>
//           <CardMedia
//             className={classes.media}
//             image="/static/images/cards/contemplative-reptile.jpg"
//             title="Contemplative Reptile"
//           />
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="h2">
//               Lizard
//             </Typography>
//             <Typography variant="body2" color="textSecondary" component="p">
//               Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
//               across all continents except Antarctica
//             </Typography>
//           </CardContent>
//         </CardActionArea>
//         <CardActions>
//           <Button size="small" color="primary">
//             Share
//           </Button>
//           <Button size="small" color="primary">
//             Learn More
//           </Button>
//         </CardActions>
//       </Card>
//     )
// })

export const getGames =  (searchTerm) => {
    axios({
      method: "get",
      url: `https://rawg-video-games-database.p.rapidapi.com/games?search=${searchTerm}`,
      headers: {
        "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAWG_GAMING_API_KEY,
      },
    });
  };