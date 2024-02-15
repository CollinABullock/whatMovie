import { netflixArray } from './components/movieArray'
import './App.css'
import { useState } from 'react'
import NavBar from './components/navbar';

function App() {
  const [randomMovie, setRandomMovie] = useState(null);

const handleRandomMovie = () => {
  const randomIndex = Math.floor(Math.random() * netflixArray.length);
  setRandomMovie(netflixArray[randomIndex]);
}

  return (
    <>
    <NavBar />
    <h1>What movie should you watch tonight?</h1>
    {randomMovie ? (
  <div>
  <h1>{randomMovie.title}</h1>
  <a href={randomMovie.link}>
  <img src={randomMovie.poster} alt="This Film's Poster" /></a><br />
  <h2>The Cast:</h2>
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
