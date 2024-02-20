// MoviePreferenceComponent.js
import React, { useState, useEffect } from 'react';

export default function MoviePreferenceComponent({ onPreferenceChange, data }) {
  const [runtime, setRuntime] = useState(240); // start with a default of the maximum so it doesn't filter anything out automatically
  const [selectedGenre, setSelectedGenre] = useState('')
  const [uniqueGenres, setUniqueGenres] = useState([])

  useEffect(() => {
    onPreferenceChange(runtime);
    const genresSet = new Set();
    data.forEach(movie => {
      if (movie.genre) {
        movie.genre.forEach(genre => {
          genresSet.add(genre);
        });
      }
    });
    setUniqueGenres(Array.from(genresSet));
  }, [data, onPreferenceChange, runtime]);
  
  const handleSliderChange = (event) => {
    const value = event.target.value;
    setRuntime(value);
    localStorage.setItem('selectedRuntime', value);
  };

  const handlePreferenceChange = () => {
    localStorage.setItem('selectedGenre', selectedGenre);
    const filteredData = data.filter(movie => {
      return !movie.genre.some(genre => genre === selectedGenre) && movie.runtime <= runtime;
    });
    onPreferenceChange(filteredData);
  };

  return (
    <div>
      <h2>Movie Preferences</h2>
      <label htmlFor="genreSelect">Select Genre to Exclude:</label>
      <select id="genreSelect" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
        <option value="">-- Select a Genre --</option>
        {uniqueGenres.map(genre => (
          <option key={genre} value={genre}>{genre}</option>
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
    </div>
  );
}
