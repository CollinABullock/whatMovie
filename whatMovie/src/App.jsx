import { netflixArray } from './components/netflix'
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
    <p key={actorIndex}>{actor.name}</p>
  ))}
</div>
    ) : (  <button onClick={handleRandomMovie}>Pick a random movie</button>)}
    </>
  )
}

export default App
