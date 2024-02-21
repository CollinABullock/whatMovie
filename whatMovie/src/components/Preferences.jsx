import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function MoviePreferenceComponent({ onPreferenceChange, data }) {
  const [runtime, setRuntime] = useState(sessionStorage.getItem('selectedRuntime') || 240);
  const [selectedGenres, setSelectedGenres] = useState(JSON.parse(sessionStorage.getItem('selectedGenres')) || []);
  const [uniqueGenres, setUniqueGenres] = useState([]);
  const [showModal, setShowModal] = useState(false);

  console.log("unique genres", uniqueGenres);
  console.log("selected genres", selectedGenres);

  useEffect(() => {
    if (data && data.length > 0) {
      onPreferenceChange(runtime, selectedGenres);
      const genresSet = new Set();
      data.forEach(movie => {
        if (movie.genre) {
          movie.genre.forEach(genre => {
            genresSet.add(genre);
          });
        }
      });
      // Convert set to array and sort alphabetically
      const sortedGenres = Array.from(genresSet).sort();
      setUniqueGenres(sortedGenres);
    }
  }, [data, onPreferenceChange, runtime, selectedGenres]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedGenres(prevSelectedGenres => [...prevSelectedGenres, value]);
    } else {
      setSelectedGenres(prevSelectedGenres => prevSelectedGenres.filter(genre => genre !== value));
    }
  };
  
  
  const handleSliderChange = (event) => {
    const value = event.target.value;
    setRuntime(value);
    sessionStorage.setItem('selectedRuntime', value);
  };

  const handlePreferenceChange = () => {
    sessionStorage.setItem('selectedGenres', JSON.stringify(selectedGenres));
    const filteredData = data.filter(movie => {
      // Check if movie.genre is defined before using some method
      const shouldBeFiltered = (!movie.genre || !selectedGenres.some(genre => movie.genre.includes(genre))) && movie.runtime <= runtime;
      return !shouldBeFiltered;
    });
    onPreferenceChange(filteredData);
    // when preferences are applied, people are shown a (hopefully) aesthetically pleasing modal
    setShowModal(true);
  };
  

  // moving the window reload to the close modal, which does make more sense.
  const handleCloseModal = () => {
    setShowModal(false);
    window.location.reload();
  };
  

  return (
    <div>
      <h2 style={{width: "100%", margin: "0 auto", textAlign: "center", marginBottom: "5px"}}>Movie Preferences</h2>
      <label htmlFor="genreSelect" style={{fontStyle: "italic"}}>What do you NOT want to see:  {selectedGenres.join(', ')}</label><br />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {uniqueGenres.map(genre => (
          <label key={genre} style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              value={genre}
              checked={selectedGenres.includes(genre)}
              onChange={handleCheckboxChange}
            />
            {genre}
          </label>
        ))}
      </div>


      <br />
      <br />
      <input
        type="range"
        id="runtimeSlider"
        name="runtime"
        min="90"
        max="240"
        step="15"
        value={runtime}
        onChange={handleSliderChange}
      />
      <p>Max Runtime: {runtime} minutes</p>
      <button onClick={handlePreferenceChange}>Apply Preferences</button>
      {/* reset preferences button removes everything from session storage and resets selected genre to an empty array and runtime to the max */}
      <button onClick={() => {
      sessionStorage.removeItem('selectedGenres');
      sessionStorage.removeItem('selectedRuntime');
      setSelectedGenres([]);
      setRuntime(240); // Assuming default runtime is 240 minutes
    }} style={{ marginLeft: '10px' }}>
      Reset Preferences
    </button>
      <Modal style={{fontFamily: "Signwood", textShadow: "2px 2px 2px black", color: "white"}} show={showModal} onHide={handleCloseModal}>
        <Modal.Header style={{backgroundColor: "red"}}>
          <Modal.Title>Preferences Applied</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor: "red"}}>
  You don't wanna see a {selectedGenres.map((genre, index) => (
    index === selectedGenres.length - 1 ? 
    <span key={genre}>
      or {genre}
    </span> :
    <span key={genre}>
      {genre},{' '}
    </span>
  ))} movie and you don't want to watch a movie longer than {runtime} minutes.
</Modal.Body>
        <Modal.Footer style={{backgroundColor: "red"}}>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
