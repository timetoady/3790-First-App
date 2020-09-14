import React from 'react';
import './App.css';
import Platforms from './data/Platforms'
import Games from './data/Games'

function App() {
  return (
    <div className="App">
    
    <h1>Platforms and Games</h1>
    
  <div  className="itemDisp"> 
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

//what the JSX (that looks like HTML) when it gets compiled
//return React.createElement('div', {className: App}, React.createElement('h1', null, "This is the h1 rendered."))