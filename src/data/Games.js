import React from "react";
import gamesData from "./games.json";
import "../Games.css";

const allGames = gamesData.results;

function Games() {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const handleChange = event => {
       setSearchTerm(event.target.value);
     };
     React.useEffect(() => {
        const results = allGames.filter(game =>
          game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          game.platforms[0].platform.name.toLowerCase().includes(searchTerm.toLowerCase()) 
        );
        setSearchResults(results);
      }, [searchTerm]);

  return (
    <div>
      <h2>Very good games list ({allGames.length}): </h2>
      <input
        type="search"
        placeholder="Search games..."
        value={searchTerm}
        className="sbx-custom__input"
        onChange={handleChange}
      ></input>
      <div className="theGames">
        {searchResults.map((result) => {
          return (
            <div key={result.id}>
              <h3>{result.name}</h3>
              <p>Rating: {result.rating}</p>
              <p>Number of ratings: {result.ratings_count}</p>
              <p>Platform: {result.platforms[0].platform.name}</p>
              <p>Release date: {result.released}</p>
              <img src={result.background_image} alt={result.name}></img>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Games;
