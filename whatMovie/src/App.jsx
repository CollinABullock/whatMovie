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
      <NavBar data={netflixArray} onPreferenceChange={handlePreferenceChange} />
    
      <RandomMovie selectedRuntime={selectedRuntime} />

   

    <Footer />
    </>
  )
}

export default App
