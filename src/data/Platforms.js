import React, { useState, useEffect } from "react";
import platformData from "./platforms.json";
import LazyLoad from "react-lazy-load";

//Style for platform div
const platStyle = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "1rem",
  gridTemplateRows: "repeat(3, minmax(0, auto))",
};

//Style for each platform div
const boxStyle = {
  border: "4px groove #AAA",
  boxShadow: "2px 3px 2px #DDD",
  padding: ".3rem",
};

const allPlatforms = platformData.results;
//let theButton = document.querySelector(".theButton");

//Platforms proper
const Platforms = () => {
  

  const [platforms, setPlatforms] = useState([]);

  const handleChange = () => {
    setPlatforms(gameNumSortHandler(allPlatforms));
  };

  useEffect(() => {
    const results = gameNumSortHandler(allPlatforms)
    
    setPlatforms(results)
  }, []);

  const gameNumSortHandler = (platform) => {
    const mostPlatforms = [...platform];
    const sortedPlats = mostPlatforms.sort(
      (a, b) => b.games_count - a.games_count
    );
    const reSortedPlats = mostPlatforms.sort(
      (b, a) => b.games_count - a.games_count
    );
    if (platform.name !== "iOS") {
      
      //theButton.textContent = "Sort by lowest number of games:";
      return sortedPlats
    } else {
      //theButton.textContent = "Sort by highest number of games:";
      return reSortedPlats;
      
    }
  };

  return (
    <LazyLoad placeholderSrc="Tile Incoming">
      <div>
        <h2>All currently listed platforms ({platformData.count}): </h2>
        {/* <button className="theButton" onClick={handleChange}>
          Sort by highest number of games:
        </button> */}
        {platforms.map((result) => {
          return (
            <div style={platStyle} key={result.id}>
              <div style={boxStyle}>
                <h3>{result.name}</h3>
                <p>Number of games: {result.games_count}</p>
                <img src={result.image_background} alt={result.slug}></img>
              </div>
            </div>
          );
        })}
      </div>
    </LazyLoad>
  );
};

export default Platforms;
