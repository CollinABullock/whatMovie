import React, { useState } from 'react';

export default function Preferences({ onRuntimeChange }) {
  const [runtime, setRuntime] = useState(120); // default runtime

  const handleSliderChange = (event) => {
    setRuntime(event.target.value);
  };

  const handleApplyPreferences = () => {
    onRuntimeChange(runtime);
  };

  return (
    <div>
      <h2>Movie Preferences</h2>
      <label htmlFor="runtimeSlider">Select maximum runtime:</label>
      <input
        type="range"
        id="runtimeSlider"
        name="runtime"
        min="60"
        max="240"
        step="15"
        value={runtime}
        onChange={handleSliderChange}
      />
      <p>Max Runtime: {runtime} minutes</p>
      <button onClick={handleApplyPreferences}>Apply Preferences</button>
    </div>
  );
}
