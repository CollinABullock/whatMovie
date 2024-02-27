import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import MoviePreferenceComponent from "./Preferences";
import { moviesArray, netflixArray } from './movieArray';

export default function NavBar({ onPreferenceChange, uniqueGenres }) {
  const [showPreferences, setShowPreferences] = useState(false);

  const handlePreferencesClick = (event) => {
    event.preventDefault(); // Prevent the default anchor behavior
    setShowPreferences(!showPreferences);
  };

  const isMobile = window.innerWidth <= 768; // Assuming mobile breakpoint is 768px width

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ padding: "10px", marginBottom: "20px", background: "transparent" }}>
      <a className="navbar-brand" style={{ color: "whitesmoke", fontSize: "1.25em", textShadow: "2px 2px 2px red"}}>Let's Choose a Damn Movie Already!</a>
      <button className="navbar-toggler" type="button" aria-controls="preferencesDropdown" aria-expanded="false" onClick={handlePreferencesClick} aria-label="Toggle navigation" style={{backgroundColor: "white"}}>
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse ${showPreferences ? 'show' : ''}`} id="preferencesDropdown">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" onClick={handlePreferencesClick} aria-haspopup="true" aria-expanded="false" style={{ color: "whitesmoke" }}>
              Preferences
            </a>
            <div className={`dropdown-menu ${showPreferences ? 'show' : ''}`} aria-labelledby="navbarDropdown" style={{ minWidth: "auto", width: isMobile ? "100vw" : "50vw", margin: "0 auto", backgroundColor: "#0D1F2D", color: "#E4C3AD", border: "5px solid red", padding: "10px", maxHeight: "60vh", overflowY: "auto" }}>
              <MoviePreferenceComponent data={netflixArray} onPreferenceChange={onPreferenceChange} uniqueGenres={uniqueGenres} />
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
