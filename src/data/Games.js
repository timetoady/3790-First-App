import React from 'react';
import gamesData from './games.json'
import '../Games.css'
//Here, we're just going to so some simple function at the 
//top to use a functional component

const allGames = gamesData.results


function Games(){
    
    return (
<div>
<h2>Very good games list ({allGames.length}): </h2>
<div className="theGames">
  {
      allGames.map(result =>{
          return (
            <div key={result.id}>
              <h3>
                  {result.name}
              </h3>
              <p>Rating: {result.rating}</p>
              <p>Number of ratings: {result.ratings_count}</p>
          <p>Platform: {result.platforms[0].platform.name}</p>
          <p>Release date: {result.released}</p>
              <img src={result.background_image} alt={result.name}></img>
    
              </div>
          )
      })
  }
  </div>
</div>



    )
    
}


export default Games