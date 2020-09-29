import React from "react";
import gamesData from "./games.json";
import "../Games.css";
import LazyLoad from 'react-lazy-load';

const allGames = gamesData.results;

function Games() {
  //Search bar state and handler
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  React.useEffect(() => {
    const results = allGames.filter(
      (game) =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.platforms[0].platform.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <div>
      <h2>My personal favorite games list ({allGames.length}): </h2>
      <input
        type="search"
        placeholder="Search games..."
        value={searchTerm}
        className="sbx-custom__input"
        onChange={handleChange}
      ></input>
      <div className="theGames">
        {/* Main data mapping to apply to DOM */}
        {searchResults.map((result) => {
          {
            /* Class-based assignment of div background based on company of platform */
          }
          const classes = [];
          let thePlatform = result.platforms[0].platform.name;
          if (thePlatform.includes("Nintendo")) {
            classes.push("nintendo");
          } else if (thePlatform.includes("Sony")) {
            classes.push("sony");
          } else if (thePlatform.includes("Xbox")) classes.push("microsoft");
          return (
            <LazyLoad>
            <div className={classes} key={result.id}>
              <h3>{result.name}</h3>
              <p>Rating: {result.rating}</p>
              <p>Number of ratings: {result.ratings_count}</p>
              <p>Platform: {result.platforms[0].platform.name}</p>
              <p>Release date: {result.released}</p>
              <img src={result.background_image} alt={result.name}></img>
            </div>
            </LazyLoad>
          );
        })}
      </div>
    </div>
  );
}

export default Games;
