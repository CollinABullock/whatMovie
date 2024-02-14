import { netflixArray } from './components/movieArray'
import './App.css'
import { useState } from 'react'

function App() {
  const [randomMovie, setRandomMovie] = useState(null);

const handleRandomMovie = () => {
  const randomIndex = Math.floor(Math.random() * netflixArray.length);
  setRandomMovie(netflixArray[randomIndex]);
}

  return (
    <>
    <h1>What movie should you watch tonight?</h1>
    {randomMovie ? (
  <div>
  <h1>{randomMovie.title}</h1>
  <img src={randomMovie.poster} alt="This Film's Poster" />
  {randomMovie.actors.map((actor, actorIndex) => (
    <>
    <img src={actor.image} alt="This is an actor!"/>
    <p key={actorIndex}><a href={actor.imdb}>{actor.name}</a></p>
    </>
  ))}
</div>
    ) : (  <button onClick={handleRandomMovie}>Pick a random movie</button>)}
    </>
  )
}

export default App
