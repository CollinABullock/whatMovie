import './App.css';
import NavBar from './components/navbar';
import RandomMovie from './components/randomMovieCard';
import Footer from './components/footer';
import { useState, useEffect } from 'react';
import { moviesArray, netflixArray } from './components/movieArray';

function App() {
  const [selectedRuntime, setSelectedRuntime] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState(null);
  const [preferredGenres, setPreferredGenres] = useState([]); // Change to an empty array

  const handlePreferenceChange = (runtime, genres, preferredGenres) => {
    setSelectedRuntime(runtime);
    setSelectedGenres(genres);
    setPreferredGenres(preferredGenres); // Set preferredGenres state
  };

  return (
    <>
      <NavBar data={moviesArray} onPreferenceChange={handlePreferenceChange} />
      <div className="container">
        <RandomMovie selectedRuntime={selectedRuntime} selectedGenres={selectedGenres} preferredGenres={preferredGenres} /> {/* Pass preferredGenres */}
      </div>
      <Footer />
    </>
  )
}

export default App;
