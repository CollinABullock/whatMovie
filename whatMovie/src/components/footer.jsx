import React from "react"
import { FaLinkedin, FaGithub} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Footer = () => <footer className="page-footer font-small blue pt-4">
    <div className="container-fluid text-center text-md-left">
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase">Collin Bullock made this.</h5>
                <p>Go check out some other stuff he's made.</p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0"/>

            <div className="col-md-3 mb-md-0 mb-3">
                <ul className="list-unstyled">
                    <li><a href="http://www.collinbullock.com" target="_blank">CollinBullock.com</a></li>
                    <li><a href="https://collinspuppybowl.netlify.app/" target="_blank">Puppy Bowl</a></li>
                    <li><a href="https://strangersthingscfrt.netlify.app/" target="_blank">Stranger's Things</a></li>
                    <li><a href="https://simpsonspedia.netlify.app/" target="_blank">SimpsonsPedia</a></li>
                </ul>
            </div>

        </div>
    </div>

    <div className="footer-copyright text-center py-3" style={{fontSize: "2em",}}>© 2024 Copyright:
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