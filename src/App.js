import React from "react";
import "./App.css";
import Platforms from "./data/Platforms";
import Games from "./data/Games";
import Games2 from "./Games2"

console.log(process.env.REACT_APP_RAWG_GAMING_API_KEY)

function App() {
  return (
    <div className="App">
      <h1>Platforms and Games</h1>
      <div>
      <Games2/>
    </div>
      <div className="itemDisp">


        <div>
          <Platforms />
        </div>

        <div>
          <Games />
        </div>
      </div>
    </div>
  );
}

export default App;