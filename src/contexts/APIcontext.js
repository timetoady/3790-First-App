import React, { useContext, createContext, useState, useEffect } from 'react'
import axios from 'axios'

const GameContext = createContext({
    gameData: {},
})

export const GameContextProvider = (props) =>{
const [gameData, setGameData] = useState([])


useEffect(()=> {
    const getGames = (searchTerm) => {
        axios({
          method: "get",
          url: `https://rawg-video-games-database.p.rapidapi.com/games?search=${searchTerm}`,
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
})

return (
    <APIcontext.Provider value= {
        {gameData}
    }
)


}


export const useGameContext = () => useContext(GameContext)