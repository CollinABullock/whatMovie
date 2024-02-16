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
   <Card.Img variant="top" src={randomMovie.poster} style={{width: "100%"}} />
     <Card.Title>{randomMovie.title}</Card.Title>
     {randomMovie.director && randomMovie.director.length > 0 ? (
      <Card.Subtitle className="mb-2 text-muted">
        Directed by {randomMovie.director[0].name}
      </Card.Subtitle>
    ) : (
      <Card.Subtitle className="mb-2 text-muted">
        Director information not available
      </Card.Subtitle>
    )}
     <Card.Text>
       {randomMovie.description}
     </Card.Text>
     <Card.Link href="#">More Details</Card.Link>
     <Card.Link onClick={handleRandomMovie}>I'm not feeling it, give me another</Card.Link>
   </Card.Body>
 </Card>
      

    ) : (  <button onClick={handleRandomMovie}>Pick a random movie</button>)}
    </>
  )
}

export default App
