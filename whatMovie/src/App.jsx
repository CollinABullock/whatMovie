import { netflixArray } from './components/movieArray';
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
    <div style={{marginTop: "20px"}}>
    {randomMovie ? (
   <Card style={{ width: "40%", marginTop: "20px", margin: "0 auto"}}>
   <Card.Body>
   <Card.Img src={randomMovie.poster} style={{width: "100%", height: "100%", objectFit: "cover"}} />
     <Card.Title>{randomMovie.title}</Card.Title>
     <Card.Text style={{textAlign: "start"}}>
       {randomMovie.description}
     </Card.Text>
     <Card.Link href="#">More Details</Card.Link>
     <Card.Link onClick={handleRandomMovie}>I'm not feeling it, give me another</Card.Link>
   </Card.Body>
 </Card>
      

    ) : (  
    <>
      <h1>What movie should you watch tonight?</h1>
    <button onClick={handleRandomMovie}>Pick a random movie</button>
    </>
    )}
    </div>
    </>
  )
}

export default App
