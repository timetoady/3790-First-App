import React from "react";
import "./App.css";
import Platforms from "./data/Platforms";
import Games from "./data/Games";
import Games2 from "./components/Games2"
import SimpleMenu from "./components/ui"



function App() {
  return (
    <div className="App">
      <SimpleMenu></SimpleMenu>
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