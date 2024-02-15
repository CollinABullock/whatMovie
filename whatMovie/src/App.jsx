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
    <button onClick={handleRandomMovie}>I'm not feeling it, give me another</button>
  <h1>{randomMovie.title}</h1>
  <a href={randomMovie.link}>
  <img src={randomMovie.poster} alt="This Film's Poster" /></a><br />

  <h2>The Director: </h2><br />
  {Array.isArray(randomMovie.director) ? ( // Check if director is an array
      randomMovie.director.map((director, index) => (
        <div key={index}>
          <img src={director.image} alt="This person directed the movie" />
          <p><a href={director.imdb}>{director.name}</a></p>
        </div>
      ))
    ) : (
      <div>
        <img src={randomMovie.director.image} alt="This person directed the movie" />
        <p><a href={randomMovie.director.imdb}>{randomMovie.director.name}</a></p>
      </div>
    )}

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
