// MoviePreferenceComponent.js
import React, { useState, useEffect } from 'react';

export default function MoviePreferenceComponent({ onPreferenceChange }) {
  const [runtime, setRuntime] = useState(240); // start with a default of the maximum so it doesn't filter anything out automatically

  useEffect(() => {
    // Call onPreferenceChange with the maximum runtime when the component mounts so people can click right away
    onPreferenceChange(240);
  }, [onPreferenceChange]);
  
  const handleSliderChange = (event) => {
    setRuntime(event.target.value);
  };

  const handlePreferenceChange = () => {
    onPreferenceChange(runtime);
  };

  return (
    <div>
      <h2>Movie Preferences</h2>
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
