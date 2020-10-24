import React from "react";
import "../App.css";


//Here, we'll render a UserGames component, where they can search for an add 
//games to their list. Ideally, it will query rapidapi, allow them to select a game,
//and import it by scooping up the JSON data to store locally/on a database,
//so it doesnt' have to call the API for individual games 30 times.

function User() {
  return (
    <div className="App">
      
{/* here, just have welcome, search bar, and then grid element below for games to appear in once they've clicked it */}
    </div>
  );
}

export default User;