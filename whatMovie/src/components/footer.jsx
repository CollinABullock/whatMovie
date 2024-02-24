import React from "react"
import { FaLinkedin, FaGithub} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Footer = () => <footer className="page-footer font-small blue pt-4">
    <div className="footer-copyright text-center py-3" style={{fontSize: "2em",}}>© 2024 Copyright:<br />
        <a href="www.collinbullock.com"> Collin A Bullock</a><br />
        <a className= "footer-a" href="mailto: collin@collinbullock.com" target="_blank" rel="noopener noreferrer">
      <MdEmail />
    </a>
        <a className= "footer-a" href="https://www.linkedin.com/in/collin-bullock/" target="_blank" rel="noopener noreferrer">
      <FaLinkedin />
    </a>
    <a href="https://github.com/CollinABullock" target="_blank" rel="noopener noreferrer">
      <FaGithub />
    </a>
    </div>

</footer>

export default Footer