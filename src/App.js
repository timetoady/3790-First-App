import React from "react";
import "./App.css";
import Platforms from "./data/Platforms";
import Games from "./data/Games";
import Games2 from "./components/Games2"
import SimpleMenu from "./components/ui"
import AuthContextProvider from './contexts/AuthContext'


//need to add routes to this as the basic layout, and then a user layout

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
      <SimpleMenu></SimpleMenu>
      <section className="DefaultHome">
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
      </section>
      {/* here we would put he route to user */}
      </AuthContextProvider>
    </div>
  );
}

export default App;