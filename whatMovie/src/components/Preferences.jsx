// MoviePreferenceComponent.js
import React, { useState } from 'react';

export default function MoviePreferenceComponent({ onPreferenceChange }) {
  const [runtime, setRuntime] = useState(120); // default runtime

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
