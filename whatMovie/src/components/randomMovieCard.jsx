import { netflixArray } from './movieArray'; 
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

export default function RandomMovie({selectedRuntime}) {
  const [randomMovie, setRandomMovie] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    // Filter movies based on selected runtime
    const filtered = netflixArray.filter(movie => movie.runtime <= selectedRuntime);
    setFilteredMovies(filtered);
  }, [selectedRuntime]);

  const handleRandomMovie = () => {
    const randomIndex = Math.floor(Math.random() * filteredMovies.length);
    setRandomMovie(filteredMovies[randomIndex]);
  };

  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      {randomMovie ? (
        <Card style={{ width: "100%", maxWidth: "600px", margin: "0 auto", marginTop: "200px", maxHeight: "1000px", backgroundColor: "#2d210d", color: "whitesmoke", borderRadius: "30px" }}>
          <Card.Body>
            <Card.Img src={randomMovie.poster} style={{ width: "100%", height: "auto", objectFit: "cover", marginBottom: "20px" }} />
            
            <Card.Text style={{ textAlign: "start", fontFamily: "Helvetica"}}>
              <h3>{randomMovie.description}<br />
              <div style={{ width: "100%", margin: "0 auto", padding: "10px", textAlign: "center" }}>
                <a href={randomMovie.link}>Watch Now</a> // <a href="">More Details</a>
              </div>
              </h3>
            </Card.Text>
            <button onClick={handleRandomMovie} style={{ backgroundColor: "red", color: "white", textShadow: "2px 2px 2px black", fontSize: "1.25em" }}>I'm not feeling it, give me another</button>
          </Card.Body>
        </Card>
      ) : (
        <>
          <Card style={{backgroundColor: "#0D1F2D", alignItems: "center", marginTop: "200px"}}>
          <h1 style={{color: "white", textShadow: "2px 2px 2px black"}}>What movie should you watch tonight?</h1>
          <button className="randomMovie" onClick={handleRandomMovie}>Pick a random movie</button>
          </Card>
        </>
      )}
    </div>
  );
}
