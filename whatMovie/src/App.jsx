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

  const handlePreferenceChange = (runtime, genres) => {
    setSelectedRuntime(runtime);
    setSelectedGenres(genres);
  };

  return (
    <>
      <NavBar data={netflixArray} onPreferenceChange={handlePreferenceChange} />
      <div className="container">
        <RandomMovie selectedRuntime={selectedRuntime} selectedGenres={selectedGenres} />
      </div>
      <Footer />
    </>
  )
}

export default App
