import "bootstrap/dist/css/bootstrap.min.css";

export default function NavBar() {
  
return (
<nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{"padding": "10px", marginBottom: "20px", background: "transparent"}}>
  <a className="navbar-brand" style={{color: "whitesmoke", fontSize: "1em"}}>Let's Choose a Damn Movie Already!</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" style={{"color": "whitesmoke"}} href="/">Preferences</a>
        </li>
    </ul>
  </div>
</nav>
)}