import "bootstrap/dist/css/bootstrap.min.css";

export default function NavBar() {
  
return (
<nav class="navbar navbar-expand-lg navbar-light bg-light" style={{"padding": "20px"}}>
  <a class="navbar-brand">Let's Choose a Damn Movie Already!</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="/">Home</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="/choices">Narrow it down</a>
          <a class="dropdown-item" href="/saved">Movies you've saved</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="http://www.collinbullock.com">Who built this?</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
  </div>
</nav>
)}