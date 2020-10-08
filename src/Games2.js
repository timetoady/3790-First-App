import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Games.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core/";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


//Styles for this module
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: "#f2f2f2",
    paddingTop: '.5rem',
    
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    minHeight: '100%',
    flexDirection: 'column',
    
  },
  heading: {
    fontSize: '1rem',
    fontWeight: theme.typography.fontWeightRegular,
     width: "100%",
  },

}));

//Main export functions
function Games() {
  const classes = useStyles();
  const [gameData, setGameData] = useState({
    games: [],
  });

  const getGames = () => {
    axios({
      method: "get",
      url: 'https://rawg-video-games-database.p.rapidapi.com/games',
      headers: {
        "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAWG_GAMING_API_KEY,
      },
    }).then(function (response) {
      setGameData({
        games: response.data.results,
      });
    });
  };

  useEffect(() => {
    getGames();
  });

  //Do function that will change grid column number depeneding on screen width
  const columnAdjust = () => {
    if (window.innerWidth <= 500) {
      return 1;
    } else if (window.innerWidth > 500 && window.innerWidth <= 770) {
      return 2;
    } else if (window.innerWidth > 770 && window.innerWidth <= 900) {
      return 3;
    } else if (window.innerWidth > 900 && window.innerWidth <= 1200) {
      return 4;
    } else return 5;
  };

  return (
    <div>
      <h2>Top Games</h2>
    <div className={classes.root}>
      
      <GridList className={classes.gridList} cols={columnAdjust()}>
        {gameData.games.map((tile) => (
          <GridListTile key={tile.id}>
            <img src={tile.background_image} alt={tile.name} />
            <GridListTileBar
              title={tile.name}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={

                <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >Tags</AccordionSummary>
                <AccordionDetails>
                  <Typography className = "brightText" >
                   {/* <p>
                   Description: {tile.description}
                     </p>  */}
                     
                     {tile.tags.map(tag => {
                       return (
                         `${tag.name}; `
                       )
                     }
                      
                      )}
                   
                    
                  </Typography>
                </AccordionDetails>
              </Accordion>  
              }
              
            />

          </GridListTile>
          
        ))}
      </GridList>
    </div>
    </div>
  );
}

export default Games;
