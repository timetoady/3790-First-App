import React, { createContext, useState } from 'react'
import axios from 'axios'

export const GameContext = createContext({
    gameData: {},
    //getGameDetails: () => Promise.resolve()
    
})

const GameContextProvider = ({children}) =>{
const [gameData, setGameData] = useState({})


const getGameDetails = (searchTerm) => {
  axios({
    method: "GET",
    url: `https://rawg-video-games-database.p.rapidapi.com/games/${searchTerm}`,
    headers: {
      "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
      "x-rapidapi-key": process.env.REACT_APP_RAWG_GAMING_API_KEY,
    },
  }).then(function (response) {
    setGameData({
      gameData: response.data.results,
    });
  });
};

return (
  <GameContext.Provider
    value={{
      gameData,
      getGameDetails

    }}
  >
    {children}
  </GameContext.Provider>
);

}


export default GameContextProvider