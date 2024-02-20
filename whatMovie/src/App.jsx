import './App.css'
import NavBar from './components/navbar';
import RandomMovie from './components/randomMovieCard';
import Footer from './components/footer';
import MoviePreferenceComponent from './components/Preferences';
import { useState, useEffect } from 'react';
import { netflixArray } from './components/movieArray';


function App() {
  const [selectedRuntime, setSelectedRuntime] = useState(null);

  const handlePreferenceChange = (runtime) => {
    setSelectedRuntime(runtime);
  };

  return (
    <>
    <NavBar />
    
      <RandomMovie selectedRuntime={selectedRuntime} />

      <MoviePreferenceComponent onPreferenceChange={handlePreferenceChange} data={netflixArray}/>

    <Footer />
    </>
  )
}

export default App
