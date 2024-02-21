import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function MoviePreferenceComponent({ onPreferenceChange, data }) {
  const [runtime, setRuntime] = useState(localStorage.getItem('selectedRuntime') || 240);
  const [selectedGenres, setSelectedGenres] = useState(JSON.parse(localStorage.getItem('selectedGenres')) || []);
  const [uniqueGenres, setUniqueGenres] = useState([]);
  const [showModal, setShowModal] = useState(false);

  console.log("unique genres", uniqueGenres);
  console.log("selected genres", selectedGenres);

  useEffect(() => {
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
  }, [data, onPreferenceChange, runtime, selectedGenres]);
  
  
  const handleSliderChange = (event) => {
    const value = event.target.value;
    setRuntime(value);
    localStorage.setItem('selectedRuntime', value);
  };

  const handlePreferenceChange = () => {
    localStorage.setItem('selectedGenres', JSON.stringify(selectedGenres));
    const filteredData = data.filter(movie => {
      // Check if movie.genre is defined before using some method
      const shouldBeFiltered = (!movie.genre || !movie.genre.some(genre => selectedGenres.includes(genre))) && movie.runtime <= runtime;
      return shouldBeFiltered;
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
      <h2>Movie Preferences</h2>
      <label htmlFor="genreSelect">What do you NOT want to see:  {selectedGenres.join(', ')}</label><br />
      <select
  id="genreSelect"
  multiple
  value={selectedGenres}
  onChange={(e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedGenres(selectedOptions);
  }}
  onMouseDown={(e) => {
    const selectedOption = e.target.value;
    const selectedIndex = selectedGenres.indexOf(selectedOption);
    let newSelectedGenres = [...selectedGenres];

    if (selectedIndex === -1) {
      // Genre not found, add it to the list
      newSelectedGenres.push(selectedOption);
    } else {
      // Genre found, remove it from the list
      newSelectedGenres.splice(selectedIndex, 1);
    }

    setSelectedGenres(newSelectedGenres);
  }}
>
  {uniqueGenres.map((genre) => (
    <option key={genre} value={genre}>
      {genre}
    </option>
  ))}
</select>


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
      <Modal style={{fontFamily: "Signwood", textShadow: "2px 2px 2px black", color: "white"}} show={showModal} onHide={handleCloseModal}>
        <Modal.Header style={{backgroundColor: "red"}}>
          <Modal.Title>Preferences Applied</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor: "red"}}>You don't wanna see a {selectedGenres}, and you don't wanna watch a movie longer than {runtime} minutes.</Modal.Body>
        <Modal.Footer style={{backgroundColor: "red"}}>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
