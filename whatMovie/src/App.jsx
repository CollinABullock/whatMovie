import './App.css'
import NavBar from './components/navbar';
import RandomMovie from './components/randomMovieCard';
import Footer from './components/footer';
import MoviePreferenceComponent from './components/Preferences';
import { useState, useEffect } from 'react';
import { netflixArray } from './components/movieArray';

function App() {
  const [selectedRuntime, setSelectedRuntime] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState(null);
  const [preferredGenres, setPreferredGenres] = useState(null); // Define preferredGenres state

  const handlePreferenceChange = (runtime, genres, preferredGenres) => {
    setSelectedRuntime(runtime);
    setSelectedGenres(genres);
    setPreferredGenres(preferredGenres); // Set preferredGenres state
  };

  return (
    <>
      <NavBar data={netflixArray} onPreferenceChange={handlePreferenceChange} />
      <div className="container">
        <RandomMovie selectedRuntime={selectedRuntime} selectedGenres={selectedGenres} preferredGenres={preferredGenres} /> {/* Pass preferredGenres */}
      </div>
      <Footer />
    </>
  )
}

export default App;
