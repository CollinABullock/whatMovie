// Import React, useState, and useEffect
import React, { useState, useEffect } from 'react';
// Import Modal and Button from react-bootstrap
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function MoviePreferenceComponent({ onPreferenceChange, data }) {
  // State for selected runtime, selected genres they don't want to see, and preferred genres they want to see
  const [runtime, setRuntime] = useState(sessionStorage.getItem('selectedRuntime') || 240);
  const [selectedGenres, setSelectedGenres] = useState(JSON.parse(sessionStorage.getItem('selectedGenres')) || []);
  const [preferredGenres, setPreferredGenres] = useState(JSON.parse(sessionStorage.getItem('preferredGenres')) || []);
  const [uniqueGenres, setUniqueGenres] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // useEffect to update unique genres based on data changes
  useEffect(() => {
    if (data && data.length > 0) {
      // Call onPreferenceChange with runtime and selected genres
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

  // Function to handle checkbox change for selecting genres they don't want to see
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedGenres(prevSelectedGenres => [...prevSelectedGenres, value]);
    } else {
      setSelectedGenres(prevSelectedGenres => prevSelectedGenres.filter(genre => genre !== value));
    }
  };

  // Function to handle checkbox change for selecting preferred genres they want to see
  const handlePreferredCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setPreferredGenres(prevPreferredGenres => [...prevPreferredGenres, value]);
      // Remove the preferred genre from selected genres
      setSelectedGenres(prevSelectedGenres => prevSelectedGenres.filter(genre => genre !== value));
    } else {
      setPreferredGenres(prevPreferredGenres => prevPreferredGenres.filter(genre => genre !== value));
    }
  };
  
  // Function to handle slider change for selecting maximum runtime
  const handleSliderChange = (event) => {
    const value = event.target.value;
    setRuntime(value);
    sessionStorage.setItem('selectedRuntime', value);
  };

  // Function to handle applying preferences
  const handlePreferenceChange = () => {
    sessionStorage.setItem('selectedGenres', JSON.stringify(selectedGenres));
    sessionStorage.setItem('preferredGenres', JSON.stringify(preferredGenres));
    const filteredData = data.filter(movie => {
      // Check if movie.genre is defined before using some method
      const shouldBeFiltered = (!movie.genre || !selectedGenres.some(genre => movie.genre.includes(genre))) && movie.runtime <= runtime;
      return !shouldBeFiltered;
    });
    onPreferenceChange(filteredData);
    // Show modal when preferences are applied
    setShowModal(true);
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    window.location.reload();
  };

  return (
    <div>
      {/* Section for selecting preferred genres they want to see */}
      <h2 style={{ width: "100%", margin: "0 auto", textAlign: "center", marginBottom: "5px" }}>Movie Preferences</h2>
      <div style={{ marginBottom: '10px' }}>
      <h4>What kind of movie <span style={{ color: 'red', fontSize: '1.2em', textDecoration: 'underline' }}>DO</span> you want to see?</h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          {uniqueGenres.map(genre => (
            <label key={genre} style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                value={genre}
                checked={preferredGenres.includes(genre)}
                onChange={handlePreferredCheckboxChange}
              />
              {genre}
            </label>
          ))}
        </div>
      </div>

      {/* Section for selecting genres they don't want to see */}
      <div style={{ marginTop: '20px' }}>
      <h4>What kind of movie <span style={{ color: 'red', fontSize: '1.2em', textDecoration: 'underline' }}>DON'T</span> you want to see?</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          {uniqueGenres.filter(genre => !preferredGenres.includes(genre)).map(genre => (
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
      </div>

      <br />
      <br />
      {/* Slider for selecting maximum runtime */}
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
      {/* Button to apply preferences */}
      <button onClick={handlePreferenceChange}>Apply Preferences</button>
      {/* Button to reset preferences */}
      <button onClick={() => {
        sessionStorage.removeItem('selectedGenres');
        sessionStorage.removeItem('selectedRuntime');
        sessionStorage.removeItem('preferredGenres');
        setSelectedGenres([]);
        setPreferredGenres([]);
        setRuntime(240); // Assuming default runtime is 240 minutes
      }} style={{ marginLeft: '10px' }}>
        Reset Preferences
      </button>
      {/* Modal to show preferences applied */}
      <Modal style={{ fontFamily: "Signwood", textShadow: "2px 2px 2px black", color: "white" }} show={showModal} onHide={handleCloseModal}>
        <Modal.Header style={{ backgroundColor: "red" }}>
          <Modal.Title>Preferences Applied</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "red" }}>
          You don't wanna see a {selectedGenres.map((genre, index) => (
            index === selectedGenres.length - 1 ?
              <span key={genre}>
                or {genre}
              </span> :
              <span key={genre}>
                {genre},{' '}
              </span>
          ))} movie and you don't want to watch a movie longer than {runtime} minutes.
          <br />
          You want to see a {preferredGenres.map((genre, index) => (
            index === preferredGenres.length - 1 ?
              <span key={genre}>
                or {genre}
              </span> :
              <span key={genre}>
                {genre},{' '}
              </span>
          ))} movie.
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "red" }}>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
