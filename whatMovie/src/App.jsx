import { netflixArray } from './components/netflix'
import './App.css'

function App() {

  return (
    <>
    <h1>What movie should you watch tonight?</h1>
    {netflixArray.map((item, index) => (
      <div>
      <h1>{item.title}</h1>
      <img src={item.poster} alt="This Film's Poster" />
      </div>
    ))}
    </>
  )
}

export default App
