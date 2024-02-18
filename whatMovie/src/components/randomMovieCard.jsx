import { netflixArray } from './movieArray'; 
import { useState } from 'react';
import Card from 'react-bootstrap/Card';

export default function RandomMovie() {
  const [randomMovie, setRandomMovie] = useState(null);

  const handleRandomMovie = () => {
    const randomIndex = Math.floor(Math.random() * netflixArray.length);
    setRandomMovie(netflixArray[randomIndex]);
  };

  return (
    <div style={{ marginTop: "40px", textAlign: "center" }}>
      {randomMovie ? (
        <Card style={{ width: "80%", maxWidth: "600px", margin: "0 auto", marginTop: "20px" }}>
          <Card.Body>
            <Card.Img src={randomMovie.poster} style={{ width: "100%", height: "auto", objectFit: "cover" }} />
            <Card.Title><h1>{randomMovie.title}</h1></Card.Title>
            <Card.Text style={{ textAlign: "start", fontFamily: "Helvetica" }}>
              <h3>{randomMovie.description}<br />
              <div style={{ width: "100%", margin: "0 auto", padding: "10px", textAlign: "center" }}>
                <a href={randomMovie.link}>Watch Now</a> // <a href="">More Details</a>
              </div>
              </h3>
            </Card.Text>
            <button onClick={handleRandomMovie} style={{ backgroundColor: "red", fontSize: "1.5em" }}>I'm not feeling it, give me another</button>
          </Card.Body>
        </Card>
      ) : (
        <>
          <h1>What movie should you watch tonight?</h1>
          <button onClick={handleRandomMovie}>Pick a random movie</button>
        </>
      )}
    </div>
  );
}
