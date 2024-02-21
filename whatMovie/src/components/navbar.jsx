import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import MoviePreferenceComponent from "./Preferences";

export default function NavBar({ onPreferenceChange }) {
  const [showPreferences, setShowPreferences] = useState(false);

  const handlePreferencesClick = (event) => {
    event.preventDefault(); // Prevent the default anchor behavior
    setShowPreferences(!showPreferences);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ padding: "10px", marginBottom: "20px", background: "transparent" }}>
      <a className="navbar-brand" style={{ color: "whitesmoke", fontSize: "1em" }}>Let's Choose a Damn Movie Already!</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" onClick={handlePreferencesClick} aria-haspopup="true" aria-expanded="false" style={{ color: "whitesmoke" }}>
              Preferences
            </a>
            <div className={`dropdown-menu ${showPreferences ? 'show' : ''}`} aria-labelledby="navbarDropdown">
              <MoviePreferenceComponent onPreferenceChange={onPreferenceChange} />
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
