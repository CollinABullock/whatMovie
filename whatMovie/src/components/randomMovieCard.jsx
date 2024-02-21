import { netflixArray } from './movieArray'; 
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

export default function RandomMovie() {
  const [randomMovie, setRandomMovie] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedRuntime, setSelectedRuntime] = useState(240);

  useEffect(() => {
    // Retrieve selected runtime from local storage
    const storedRuntime = sessionStorage.getItem('selectedRuntime');
    if (storedRuntime) {
      setSelectedRuntime(parseInt(storedRuntime));
    }
  }, []);

  useEffect(() => {
    // Retrieve selected genre from local storage
    const storedGenre = sessionStorage.getItem('selectedGenre');
    if (storedGenre) {
      setSelectedGenre(storedGenre);
    }
  }, []);

  useEffect(() => {
    // Ensure randomMovie is reset when filteredMovies change
    setRandomMovie(null);
  }, [filteredMovies]);

  useEffect(() => {
    // Filter movies based on selected runtime
    const filtered = netflixArray.filter(movie => movie.runtime <= selectedRuntime);
    setFilteredMovies(filtered);
  }, [selectedRuntime]);

  const handleRandomMovie = () => {
    // Filter movies based on selected runtime and genre
    let filtered = filteredMovies.filter(movie => movie.runtime <= selectedRuntime);
    if (selectedGenre) {
      filtered = filtered.filter(movie => !movie.genre.includes(selectedGenre));
    }
  
    // Ensure there are filtered movies to select from
    if (filtered.length > 0) {
      // Select a random movie index
      const randomIndex = Math.floor(Math.random() * filtered.length);
      const selectedMovie = filtered[randomIndex];
  
      // Check if the selected movie meets the criteria
      if (!selectedMovie.genre.includes(selectedGenre) && selectedMovie.runtime <= selectedRuntime) {
        setRandomMovie(selectedMovie);
      } else {
        // If the selected movie does not meet the criteria, try again
        handleRandomMovie();
      }
    } else {
      // Handle case when there are no filtered movies
      setRandomMovie(null);
    }
  };
  
  

  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      {randomMovie ? (
        <Card className="randomCard" style={{ width: "100%", maxWidth: "600px", maxHeight: "1000px", backgroundColor: "#2d210d", color: "whitesmoke", borderRadius: "30px" }}>
          <Card.Body>
            <Card.Img src={randomMovie.poster} style={{ width: "100%", height: "auto", objectFit: "cover", marginBottom: "20px" }} />
               {/* Mapping through genres and rendering each genre */}
               <div style={{ display: "flex", flexWrap: "wrap" }}>
              {randomMovie.genre && randomMovie.genre.map((genre, index) => (
                <span key={index} style={{ marginRight: "5px" }}>{genre}</span>
              ))}

      </div>
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
          <Card className='randomCard' style={{backgroundColor: "#0D1F2D", alignItems: "center"}}>
          <h1 style={{color: "white", textShadow: "2px 2px 2px black"}}>What movie should you watch tonight?</h1>
          <button className="randomMovie" onClick={handleRandomMovie}>Pick a random movie</button>
          </Card>
        </>
      )}
    </div>
  );
}
