import { netflixArray } from './components/movieArray'
import './App.css'
import { useState } from 'react'
import NavBar from './components/navbar';
import Card from 'react-bootstrap/Card';

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
   <Card style={{ width: '18rem' }}>
   <Card.Body>
     <Card.Title>{randomMovie.title}</Card.Title>
     <Card.Subtitle className="mb-2 text-muted">Directed by {randomMovie.director[0].name}</Card.Subtitle>
     <Card.Text>
       {randomMovie.description}
     </Card.Text>
     <Card.Link href="#">More Details</Card.Link>
     <Card.Link onClick={handleRandomMovie}>I'm not feeling it, give me another</Card.Link>
   </Card.Body>
 </Card>
      
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

    ) : (  <button onClick={handleRandomMovie}>Pick a random movie</button>)}
    </>
  )
}

export default App
