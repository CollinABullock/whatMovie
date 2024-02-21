import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { netflixArray } from './movieArray';

export default function RandomMovie({ selectedRuntime, selectedGenres }) {
  const [randomMovie, setRandomMovie] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Filter movies based on selected runtime
    const filtered = netflixArray.filter(movie => movie.runtime <= selectedRuntime);
    setFilteredMovies(filtered);
  }, [selectedRuntime]);

  const handleRandomMovie = () => {
    // Filter movies based on selected runtime and genres
    let filtered = filteredMovies.filter(movie => movie.runtime <= selectedRuntime);
    if (selectedGenres && selectedGenres.length > 0) {
      // Filter out movies with any genre included in selected genres
      filtered = filtered.filter(movie => !selectedGenres.some(genre => movie.genre.includes(genre)));
    }
  
    // Ensure there are filtered movies to select from
    if (filtered.length > 0) {
      // Select a random movie index
      const randomIndex = Math.floor(Math.random() * filtered.length);
      const selectedMovie = filtered[randomIndex];
  
      // Set the randomly selected movie
      setRandomMovie(selectedMovie);
    } else {
      // Handle case when there are no filtered movies
      setRandomMovie(null);
    }
  };

  const handleDetails = () => {
setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const renderWatchOnLink = () => {
    if (!randomMovie) return null;

    const { link } = randomMovie;
    const url = new URL(link);
    const { hostname } = url;

    if (hostname === 'www.netflix.com') {
      return (
        <>
        <a href={link} target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn.vox-cdn.com/thumbor/pNxD2NFOCjbljnMPUSGdkFWeDjI=/0x0:3151x2048/1400x788/filters:focal(1575x1024:1576x1025)/cdn.vox-cdn.com/uploads/chorus_asset/file/15844974/netflixlogo.0.0.1466448626.png"
              alt="Netflix Logo"
              style={{ width: '75px', height: 'auto' }}
            />
          </a>
        </>
      );
    }
    return (
      <>
        <a href={link} style={{ color: 'blue', textDecoration: 'none', cursor: 'pointer' }}>Watch Now</a>
      </>
    );
  };

  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      {randomMovie ? (
        <Card className="randomCard" style={{ width: "100%", maxWidth: "600px", maxHeight: "1000px", backgroundColor: "#2d210d", color: "whitesmoke", borderRadius: "30px" }}>
          <Card.Body>
            <Card.Img src={randomMovie.poster} style={{ width: "100%", height: "auto", objectFit: "cover", marginBottom: "20px" }} />
            
            <Card.Text style={{ textAlign: "start", fontFamily: "Helvetica"}}>
              <h3>{randomMovie.description}<br />
              <div style={{ width: "100%", margin: "0 auto", padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {renderWatchOnLink()}    
              <a onClick={handleDetails} style={{ color: 'blue', cursor: 'pointer' }}>More Details</a>
            </div>
              </h3>
            </Card.Text>
            <button onClick={handleRandomMovie} style={{ backgroundColor: "red", color: "white", textShadow: "2px 2px 2px black", fontSize: "1.25em" }}>I'm not feeling it, give me another</button>
          </Card.Body>
        </Card>
      ) : (
        <Card className='randomCard' style={{backgroundColor: "#0D1F2D", alignItems: "center"}}>
          <h1 style={{color: "white", textShadow: "2px 2px 2px black"}}>What movie should you watch tonight?</h1>
          <button className="randomMovie" onClick={handleRandomMovie}>Pick a random movie</button>
        </Card>
      )}
     <Modal show={showModal} onHide={handleModalClose} style={{fontFamily: "Signwood"}}>
  <Modal.Header>
    <Modal.Title>{randomMovie ? randomMovie.title : 'Movie Title'}</Modal.Title>
    <div className='modal-details'>
       {randomMovie && randomMovie.runtime && (<p>{randomMovie.runtime} minutes</p>)}
       {randomMovie && randomMovie.mpaa && (<p>{randomMovie.mpaa}</p>)}
       {randomMovie.genre && randomMovie.genre.map((genre, index) => (
  <span key={index}>
    {genre}
    {index !== randomMovie.genre.length - 1 && ', '}
  </span>
))}

    </div>
  </Modal.Header>
  <Modal.Body>
    {randomMovie && randomMovie.poster && (
      <img src={randomMovie.poster} alt="Movie Poster" style={{ width: '100%', height: 'auto' }} />
    )}
    <p>{randomMovie ? randomMovie.description : 'No description available'}</p>
    {/* Add more details as needed */}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleModalClose}>
      Close
    </Button>
  </Modal.Footer>
</Modal>

    </div>
  );
}
