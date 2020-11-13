import React from "react";
import "./App.css";
import Games2 from "./components/Games2"
import SimpleMenu from "./components/ui"
import { Route, Switch } from 'react-router-dom'
import User from "./routes/user";


function App() {
  return (
    <div className="App">
      {/* here add context based on login info, turn user path to user email */}
      <SimpleMenu></SimpleMenu>
      <Switch>
    <Route path='/user' component={User}/>
    <Route path='/' component={Games2}/>
      </Switch>
      <section className="DefaultHome">

      <div className="itemDisp">
        <div>
          {/* <Platforms /> */}
        </div>

        <div>
          {/* <Games /> */}
        </div>
        
      </div>
      </section>
      {/* here we would put the route to user */}
      
    </div>
  );
}

export default App;