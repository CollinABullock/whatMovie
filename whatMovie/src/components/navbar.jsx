import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import MoviePreferenceComponent from "./Preferences";
import { moviesArray, netflixArray } from './movieArray';

export default function NavBar({ onPreferenceChange, uniqueGenres }) {
  const [showPreferences, setShowPreferences] = useState(false);
  const [glowButton, setGlowButton] = useState(false); // State to control the glowing effect
  const [showDetails, setShowDetails] = useState(true); // State to control the visibility of "More Details"

  const handlePreferencesClick = (event) => {
    event.preventDefault(); // Prevent the default anchor behavior
    setShowPreferences(!showPreferences);
  };

  useEffect(() => {
    // Add glow effect when showDetails state changes
    if (showDetails) {
      setGlowButton(true);
      const timeoutId = setTimeout(() => setGlowButton(false), 3000); // Turn off glow after 3 seconds
      return () => clearTimeout(timeoutId);
    }
  }, [showDetails]);

      // Function to toggle visibility of "More Details" text with a flickering effect
      const toggleDetailsVisibility = () => {
        setShowDetails(prevShowDetails => !prevShowDetails);
      };
    
     // Use setInterval to toggle visibility of "More Details" text with a flickering effect
     useEffect(() => {
      const intervalId = setInterval(toggleDetailsVisibility, 500); // Change flicker speed as needed (milliseconds)
      return () => clearInterval(intervalId);
    }, []); // Run only once on component mount

  const isMobile = window.innerWidth <= 768; // Assuming mobile breakpoint is 768px width

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{padding: "20px", marginBottom: "20px", background: "transparent", alignItems: "center" }}>
      <a className={glowButton ? "glow" : ""}style={{ color: "whitesmoke", fontSize: "2.5em", fontFamily: "Showtime", textShadow: "5px 5px 5px black", overflow: "wrap", margin: "20px"}}>Choose a movie already!</a>
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
