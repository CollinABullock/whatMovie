import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { motion } from "framer-motion";
import { moviesArray, netflixArray, maxArray, primeArray } from './movieArray';

export default function RandomMovie({ selectedRuntime  }) {
  const [randomMovie, setRandomMovie] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false); // State to track if images are loaded



  useEffect(() => {
    // Merge all movie arrays into one
    const allMovies = [].concat(...moviesArray);

    // Filter movies based on selected runtime
    const filtered = allMovies.filter(movie => movie.runtime <= selectedRuntime);
    setFilteredMovies(filtered);
  }, [selectedRuntime]);

   // Get selectedGenres from sessionStorage
   const selectedGenres = JSON.parse(sessionStorage.getItem('selectedGenres'));

   // Get preferredGenres from sessionStorage
   const preferredGenres = JSON.parse(sessionStorage.getItem('preferredGenres'));

   // Get the streaming services from session storage.
   const selectedServices = JSON.parse(sessionStorage.getItem('selectedServices'));

     // Function to handle image load
  const handleImageLoad = () => {
    setImagesLoaded(true);
  };

   console.log("selectedGenres:", selectedGenres);
   console.log("preferredGenres:", preferredGenres);
   console.log("selectedServices:", selectedServices);

   const handleRandomMovie = () => {
    // Filter based on selected services
    window.scroll(0, 0);
    const selectedServices = JSON.parse(sessionStorage.getItem('selectedServices'));
    let filtered = [];
    if (selectedServices && selectedServices.length > 0) {
      let serviceMovies = [];
      selectedServices.forEach(service => {
        if (service === 'Netflix') {
          serviceMovies = serviceMovies.concat(netflixArray);
        } else if (service === 'Max') {
          serviceMovies = serviceMovies.concat(maxArray);
        } else if (service === "Prime") {
          serviceMovies = serviceMovies.concat(primeArray);
        }
        // Add more conditions for other services if needed
      });
      filtered = serviceMovies.filter(movie => movie.runtime <= selectedRuntime);
    } else {
      // If no services are selected, use all movies
      filtered = [...filteredMovies];
    }
  
    // Filter based on selected genres to avoid
    const selectedGenres = JSON.parse(sessionStorage.getItem('selectedGenres'));
    if (selectedGenres && selectedGenres.length > 0) {
      filtered = filtered.filter(movie =>
        movie.genre && !selectedGenres.some(genre => movie.genre.includes(genre))
      );
    }
  
    // Filter based on preferred genres
    const preferredGenres = JSON.parse(sessionStorage.getItem('preferredGenres'));
    if (preferredGenres && preferredGenres.length > 0) {
      filtered = filtered.filter(movie =>
        movie.genre && preferredGenres.every(genre => movie.genre.includes(genre))
      );
    }
  
    if (filtered.length > 0) {
      const randomIndex = Math.floor(Math.random() * filtered.length);
      const selectedMovie = filtered[randomIndex];
      setRandomMovie(selectedMovie);
      setAnimationKey(prevKey => prevKey + 1);
    } else {
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
        <a href={link} target="_blank" rel="noopener noreferrer">
          <img
            src="https://cdn.vox-cdn.com/thumbor/pNxD2NFOCjbljnMPUSGdkFWeDjI=/0x0:3151x2048/1400x788/filters:focal(1575x1024:1576x1025)/cdn.vox-cdn.com/uploads/chorus_asset/file/15844974/netflixlogo.0.0.1466448626.png"
            alt="Netflix Logo"
            style={{ width: '100px', height: 'auto' }}
          />
        </a>
      );
    } else if (hostname === 'play.max.com') {
      return (
        <a href={link} target="_blank" rel="noopener noreferrer">
        <img
          src="https://pbs.twimg.com/media/Fth6aQMXwQEb4NU.jpg"
          alt="Max Logo"
          style={{ width: '100px', height: 'auto' }}
        />
        </a>
      );
    } else if (hostname === 'www.amazon.com') {
      return (
        <a href={link} target="_blank" rel="noopener noreferrer">
        <img
          src="https://www.shutterstock.com/image-vector/chattogram-bangladesh-may-18-2023-600nw-2304763275.jpg"
          alt="Prime Logo"
          style={{ width: '100px', height: 'auto' }}
        />
        </a>
      );
    } else {
      return (
        <a href={link} target="_blank" style={{ color: 'blue', textDecoration: 'none', cursor: 'pointer' }}>Watch Now</a>
      );
    }
  };





  console.log("random movie set:", randomMovie);


  return (
    <div className='randomCard' style={{ textAlign: "center", width: "100%" }}>
      {randomMovie ? (
        <motion.div
          key={animationKey}
          initial={{ x: -1000, opacity: 0 }} // initial position off-screen to the left
          animate={{ x: 0, opacity: 1 }} // animate to the center of the screen
          transition={{ duration: 0.3, type: "tween" }} // adjust duration as needed
        >
          <Card className="randomCard" style={{ width: "100%", maxWidth: "700px", maxHeight: "100%", backgroundColor: "#EC0B43", color: "whitesmoke", borderRadius: "30px"}}>
            <Card.Body>
            <Card.Img 
  src={randomMovie.poster} 
  onLoad={handleImageLoad} // Call handleImageLoad when the image is loaded

  style={{ width: '100%', height: '50%', objectFit: 'cover', margin: '0', padding: '0', marginBottom: "20px" }} 
/>
<button onClick={handleRandomMovie} style={{ backgroundColor: "red", color: "white", textShadow: "2px 2px 2px black", fontSize: "1.25em", marginBottom: "10px" }}>I'm not feeling it, give me another</button>
              <Card.Text style={{ textAlign: "start", fontFamily: "Verdana"}}>
                <h4 style={{marginBottom: "10px"}}>{randomMovie.description}<br />
                <div style={{ width: "100%", margin: "0 auto", padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", }}>
                    {renderWatchOnLink()}
                    <button onClick={handleDetails} style={{ backgroundColor: "black", color: 'white', cursor: 'pointer', fontFamily: "Signwood", border: "2px solid black", textShadow: "2px 2px 2px black" }}>More Details</button>
                  </div>
                </h4>
              </Card.Text>
            </Card.Body>
          </Card>
        </motion.div>
      ) : (
        <Card style={{backgroundColor: "#58355E", alignItems: "center", marginTop: "425px"}}>
          <h1 style={{color: "white", textShadow: "2px 2px 2px black"}}>What movie should you watch tonight?</h1>
          <button className="randomMovie" onClick={handleRandomMovie}>Pick a random movie</button>
        </Card>
      )}
      <Modal show={showModal} onHide={handleModalClose} style={{fontFamily: "Signwood"}}>
        <Modal.Header style={{backgroundColor: "#58355E", color: "#E4C3AD", textShadow: "text-shadow: 2px 2px 2px black;"}}>
          <Modal.Title>{randomMovie ? randomMovie.title : 'Movie Title'}</Modal.Title>
          <div className='modal-details'>
            {randomMovie && randomMovie.runtime && (<p>{randomMovie.runtime} minutes</p>)}
            {randomMovie && randomMovie.mpaa && (<p>{randomMovie.mpaa}</p>)}
            {randomMovie && randomMovie.genre && randomMovie.genre.map((genre, index) => (
              <span key={index}>
                {genre}
                {index !== randomMovie.genre.length - 1 && ', '}
              </span>
            ))}
          </div>
        </Modal.Header>
        <Modal.Body style={{backgroundColor: "#58355E", color: "#E4C3AD", textShadow: "text-shadow: 2px 2px 2px black;"}}>
          <p>{randomMovie ? randomMovie.description : 'No description available'}</p>
          {/* Directors Section */}
          {randomMovie && randomMovie.director && (
            <div>
              <h5>Director:</h5>
              <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                {randomMovie.director.map((director, index) => (
                  <div key={index} style={{ textAlign: 'center' }}>
                    <a target="_blank" href={director.imdb}>
                      <img 
                        src={director.image} 
                        alt={director.name} 
                        style={{ width: '120px', height: '100px', objectFit: 'cover' }} 
                      />
                      <p style={{ marginTop: '5px', fontSize: '14px' }}>{director.name}</p>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Actors Section */}
          {randomMovie && randomMovie.actors && (
            <div>
              <h5>Actors:</h5>
              <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                {randomMovie.actors.map((actor, index) => (
                  <div key={index} style={{ textAlign: 'center' }}>
                    <a target="_blank" href={actor.imdb}>
                      <img 
                        src={actor.image} 
                        alt={actor.name} 
                        style={{ width: '100px', height: '80px', objectFit: 'cover' }} 
                      />
                      <p style={{ marginTop: '5px', fontSize: '14px' }}>{actor.name}</p>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer style={{backgroundColor: "#58355E", color: "#E4C3AD", textShadow: "text-shadow: 2px 2px 2px black;"}}>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
