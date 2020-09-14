import React, { Component } from 'react';
import platformData from './platforms.json'

const allPlatforms = platformData.results
const platStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1rem',
    gridTemplateRows:  'repeat(3, minmax(0, auto))'
} 


class Platforms extends Component {

    state = {
    platforms: platformData.results[1].name

    }

    // gameNumHandler = () => {
    // const mostPlatforms = [...platformData.results[0].games_count]
    // const sortedPlats = mostPlatforms.sort((a, b) => {
    // return a.games_count - b.games_count
    // })
    // this.setState({
    //   platforms: sortedPlats
    // })
    // }

    render() {
        return (

        <div>
        <h2>All listed platforms ({platformData.count}): </h2>
        {
      allPlatforms.map(result =>{
          return (
             <div style={platStyle}> 
            <div key={result.id}>
              <h3>
                  {result.name}
              </h3>
              <p>Number of games: {result.games_count}</p>
              <img src={result.image_background} alt={result.slug}></img>
              </div>
              </div> 
          )
      })
  }

        <p></p>

        <div> 
{/* Here, we'll do the list of platforms with a map that gets the data points we want. */}

        </div>


        </div>


)}
}

export default Platforms