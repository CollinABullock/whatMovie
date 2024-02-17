import "bootstrap/dist/css/bootstrap.min.css";

export default function NavBar() {
  
return (
<nav class="navbar navbar-expand-lg navbar-light fixed-top" style={{"padding": "10px", marginBottom: "20px", background: "transparent"}}>
  <a class="navbar-brand" style={{color: "whitesmoke", fontSize: "2em"}}>Let's Choose a Damn Movie Already!</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" style={{"color": "whitesmoke"}} href="/">Preferences</a>
        </li>
    </ul>
  </div>
</nav>
)}