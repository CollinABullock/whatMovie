// MoviePreferenceComponent.js
import React, { useState, useEffect } from 'react';

export default function MoviePreferenceComponent({ onPreferenceChange, data }) {
  const [runtime, setRuntime] = useState(240); // start with a default of the maximum so it doesn't filter anything out automatically
  const [selectedGenre, setSelectedGenre] = useState('')

  useEffect(() => {
    // Call onPreferenceChange with the maximum runtime when the component mounts so people can click right away
    onPreferenceChange(240);
  }, [onPreferenceChange]);
  
  const handleSliderChange = (event) => {
    setRuntime(event.target.value);
  };

 const handlePreferenceChange = () => {
    // Filter movies based on runtime and exclude the selected genre
    const filteredData = data.filter(movie => {
      return !movie.genre.includes(selectedGenre) && movie.runtime <= runtime;
    });
    onPreferenceChange(filteredData);
  };

  return (
    <div>
      <h2>Movie Preferences</h2>
      <label htmlFor="genreSelect">Select Genre to Exclude:</label>
      <select id="genreSelect" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
  <option value="">-- Select a Genre --</option>
  {data.map(movie => (
    movie.genre?.map(genre => (  // Use optional chaining operator here
      <option key={genre} value={genre}>{genre}</option>
    ))
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
