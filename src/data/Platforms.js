import React, { Component } from "react";
import platformData from "./platforms.json";
import LazyLoad from 'react-lazy-load';

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

//Platforms proper
class Platforms extends Component {
  state = {
    allPlatforms: platformData.results,
  };

  gameNumSortHandler = () => {
    const mostPlatforms = [...this.state.allPlatforms];
    const sortedPlats = mostPlatforms.sort(
      (a, b) => b.games_count - a.games_count
    );
    let theButton = document.querySelector(".theButton");
    if (this.state.allPlatforms[1].name !== "iOS") {
      this.setState({
        allPlatforms: sortedPlats,
      });
      theButton.textContent = "Sort by lowest number of games:";
    } else {
      const reSortedPlats = mostPlatforms.sort(
        (b, a) => b.games_count - a.games_count
      );
      this.setState({
        allPlatforms: reSortedPlats,
      });
      theButton.textContent = "Sort by highest number of games:";
    }
  };

  render() {
    return (
      <LazyLoad placeholderSrc="Tile Incoming">
      <div>
        <h2>All currently listed platforms ({platformData.count}): </h2>
        <button className="theButton" onClick={this.gameNumSortHandler}>
          Sort by highest number of games:
        </button>
        {this.state.allPlatforms.map((result) => {
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
  }
}

export default Platforms;
