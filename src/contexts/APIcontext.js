import React, { createContext, useState } from 'react'
import axios from 'axios'

export const GameContext = createContext({
    gameData: {},
    getGameDetails: () => Promise.resolve(),

})

const GameContextProvider = ({children}) =>{
const [gameData, setGameData] = useState({})
const [loading, setLoading] = useState(false)


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

return (
  <GameContext.Provider
    value={{
      gameData,
      getGameDetails,
      loading

    }}
  >
    {children}
  </GameContext.Provider>
);

}


export default GameContextProvider