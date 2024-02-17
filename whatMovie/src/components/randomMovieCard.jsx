import { netflixArray } from './movieArray'; 
import { useState } from 'react'
import Card from 'react-bootstrap/Card';

export default function RandomMovie() {
  const [randomMovie, setRandomMovie] = useState(null);

const handleRandomMovie = () => {
  const randomIndex = Math.floor(Math.random() * netflixArray.length);
  setRandomMovie(netflixArray[randomIndex]);}

  return (
    <>
      <div style={{marginTop: "20px"}}>
    {randomMovie ? (
   <Card style={{ width: "40%", marginTop: "20px", margin: "0 auto"}}>
   <Card.Body>
   <Card.Img src={randomMovie.poster} style={{width: "100%", height: "100%", objectFit: "cover"}} />
     <Card.Title><h1>{randomMovie.title}</h1></Card.Title>
     <Card.Text style={{textAlign: "start", fontFamily: "Helvetica"}}>
       <h3>{randomMovie.description}<br />
       <div style={{width: "100%", margin: "0 auto", padding: "10px", textAlign: "center"}}>
       <a href={randomMovie.link}>Watch Now</a> // <a href="">More Details</a>
       </div>
       </h3>
       
     </Card.Text>
     <button onClick={handleRandomMovie} style={{backgroundColor: "red", fontSize: "2em"}}>I'm not feeling it, give me another</button>
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