import './App.css'
import NavBar from './components/navbar';
import RandomMovie from './components/randomMovieCard';
import Footer from './components/footer';
import Preferences from './components/Preferences';


function App() {

  return (
    <>
    <NavBar />
    <Preferences />
    <RandomMovie />
    <Footer />
    </>
  )
}

export default App
