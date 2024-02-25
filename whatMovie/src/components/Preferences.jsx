import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function MoviePreferenceComponent({ onPreferenceChange, data }) {
  const [runtime, setRuntime] = useState(sessionStorage.getItem('selectedRuntime') || 240);
  const [selectedGenres, setSelectedGenres] = useState(JSON.parse(sessionStorage.getItem('selectedGenres')) || []);
  const [preferredGenres, setPreferredGenres] = useState(JSON.parse(sessionStorage.getItem('preferredGenres')) || []);
  const [selectedService, setSelectedService] = useState([]);
  const [uniqueGenres, setUniqueGenres] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (data && data.length > 0) {
      onPreferenceChange(runtime, selectedGenres);
      const genresSet = new Set();
      data.forEach(movie => {
        if (movie.genre) {
          movie.genre.forEach(genre => {
            genresSet.add(genre);
          });
        }
      });
      const sortedGenres = Array.from(genresSet).sort();
      setUniqueGenres(sortedGenres);
    }
  }, [data, onPreferenceChange, runtime, selectedGenres]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedGenres(prevSelectedGenres => [...prevSelectedGenres, value]);
      setPreferredGenres(prevPreferredGenres => prevPreferredGenres.filter(genre => genre !== value)); // Remove from preferredGenres if present
    } else {
      setSelectedGenres(prevSelectedGenres => prevSelectedGenres.filter(genre => genre !== value));
    }
  };
  
  const handlePreferredCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setPreferredGenres(prevPreferredGenres => [...prevPreferredGenres, value]);
      setSelectedGenres(prevSelectedGenres => prevSelectedGenres.filter(genre => genre !== value)); // Remove from selectedGenres if present
    } else {
      setPreferredGenres(prevPreferredGenres => prevPreferredGenres.filter(genre => genre !== value));
    }
  };
  
  useEffect(() => {
    // Update sessionStorage whenever selectedGenres or preferredGenres change
    sessionStorage.setItem('selectedGenres', JSON.stringify(selectedGenres));
    sessionStorage.setItem('preferredGenres', JSON.stringify(preferredGenres));
  }, [selectedGenres, preferredGenres]);

  const handleSliderChange = (event) => {
    const value = event.target.value;
    setRuntime(value);
    sessionStorage.setItem('selectedRuntime', value);
  };

  

  const handleCloseModal = () => {
    setShowModal(false);
    window.location.reload();
  };

  const streamingServices = [
    { name: 'Netflix', logo: 'https://cdn.vox-cdn.com/thumbor/pNxD2NFOCjbljnMPUSGdkFWeDjI=/0x0:3151x2048/1400x788/filters:focal(1575x1024:1576x1025)/cdn.vox-cdn.com/uploads/chorus_asset/file/15844974/netflixlogo.0.0.1466448626.png' },
    { name: 'Max', logo: 'https://pbs.twimg.com/media/Fth6aQMXwQEb4NU.jpg' },
    { name: 'Prime', logo: 'https://www.shutterstock.com/image-vector/chattogram-bangladesh-may-18-2023-600nw-2304763275.jpg' },
    { name: 'Hulu', logo: 'https://wallpapers.com/images/featured/hulu-fxo5g9d2z5nmrq7p.jpg' },
    { name: "Peacock", logo: "https://akns-images.eonline.com/eol_images/Entire_Site/20191131/rs_1024x759-191231151709-1024x759.peacock-logo-lp.123119.jpg?fit=around%7C1024:759&output-quality=90&crop=1024:759;center,top" },
    { name: "Apple", logo: "https://s.yimg.com/ny/api/res/1.2/olinh0MApHyLLoBgciYoIA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQyNw--/https://s.yimg.com/uu/api/res/1.2/xDQXaqk95THWr3WD.EjcdQ--~B/aD0xODI0O3c9MjczNjthcHBpZD15dGFjaHlvbg--/http://globalfinance.zenfs.com/en_us/Finance/US_AFTP_SILICONALLEY_H_LIVE/The_new_Apple_TV_ads-ba77edc8097181dd910c9885454fd180"},
    { name: "Disney", logo: "https://lumiere-a.akamaihd.net/v1/images/disney_logo_nov_2021_rbg_0fa74b54.jpeg?region=0,0,1920,1080"},
    { name: "Paramount", logo: "https://www.paramount.com/sites/g/files/dxjhpe226/files/styles/twitter_image_1024_x_512_/public/ViacomCBSDotCom/NewsPage/Images/Paramount_SocialShare.jpg?h=79d7b992&itok=X2IUZz7U"} ,
    { name: "Criterion", logo: "https://pyxis.nymag.com/v1/imgs/485/852/690bf30879dd192d9d3bd2b9b44f945c12-streamliner-criterion.jpg"},
    { name: "Tubi", logo: "https://cloudfront-us-east-1.images.arcpublishing.com/gmg/BVVRXGRYJ5BZTBKPJXLQC5TIJM.jpg"}
  ];

  const handleServiceClick = (serviceName) => {
    setSelectedService(prevSelectedServices => {
      const updatedServices = prevSelectedServices.includes(serviceName) ?
        prevSelectedServices.filter(service => service !== serviceName) :
        [...prevSelectedServices, serviceName];
      
      // Store the updated selectedServices array in sessionStorage
      sessionStorage.setItem('selectedServices', JSON.stringify(updatedServices));
  
      return updatedServices;
    });
  };
  

  console.log(selectedService);

  return (
    <div style={{ width: '100%', padding: '0 10px' }}>
      <div style={{ marginBottom: '30px', width: "100%", border: '1px solid #ccc', padding: '15px' }}>
        <p style={{ marginBottom: '10px' }}>What streaming services are you currently paying for and/or stealing?</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
          {streamingServices.map(service => (
            <div style={{ position: 'relative', display: 'inline-block' }} key={service.name}>
              <img 
                className='streaming-service-img' 
                src={service.logo} 
                alt={service.name} 
                style={{ 
                  width: '100%', 
                  maxWidth: '220px', 
                  height: '100px', 
                  objectFit: "cover", 
                  cursor: "pointer",
                  filter: selectedService.includes(service.name) ? "none" : "sepia(100%) hue-rotate(90deg)"
                }} 
                onClick={() => handleServiceClick(service.name)} 
              />
              {selectedService.includes(service.name) && (
                <div style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  backgroundColor: 'green',
                  borderRadius: '50%',
                  padding: '3px',
                  zIndex: '1'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                    <path fill="#FFFFFF" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>


      <div style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
        <p>What's the longest movie you're down to watch?<br />{runtime} minutes</p>
        <input
          type="range"
          id="runtimeSlider"
          name="runtime"
          min="90"
          max="240"
          step="15"
          value={runtime}
          onChange={handleSliderChange}
        />
      </div>

      <div style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
        <h4>What kind of movie <span style={{ color: 'red', fontSize: '1.2em', textDecoration: 'underline' }}>DO</span> you want to see?</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          {uniqueGenres.map(genre => (
            <label key={genre} style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                value={genre}
                checked={preferredGenres.includes(genre)}
                onChange={handlePreferredCheckboxChange}
              />
              {genre}
            </label>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
        <h4>What kind of movie <span style={{ color: 'red', fontSize: '1.2em', textDecoration: 'underline' }}>DON'T</span> you want to see?</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          {uniqueGenres.filter(genre => !preferredGenres.includes(genre)).map(genre => (
            <label key={genre} style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                value={genre}
                checked={selectedGenres.includes(genre)}
                onChange={handleCheckboxChange}
              />
              {genre}
            </label>
          ))}
        </div>
        
      </div>

      <div style={{ padding: "15px", marginBottom: "30px"}}>
  <div style={{ display: 'flex', justifyContent: 'center'}}>
    <button onClick={() => {
  sessionStorage.removeItem('selectedServices');
  sessionStorage.clear();
  setSelectedGenres([]);
  setPreferredGenres([]);
  setRuntime(240);
  setSelectedService([]);
}} style={{ marginLeft: '10px' }}>Reset Preferences</button>
  </div>
</div>
      <Modal style={{ fontFamily: "Signwood", textShadow: "2px 2px 2px black", color: "white" }} show={showModal} onHide={handleCloseModal}>
        <Modal.Header style={{ backgroundColor: "red" }}>
          <Modal.Title>Preferences Applied</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "red" }}>
          You don't wanna see a {selectedGenres.map((genre, index) => (
            index === selectedGenres.length - 1 ?
              <span key={genre}>
                or {genre}
              </span> :
              <span key={genre}>
                {genre},{' '}
              </span>
          ))} movie and you don't want to watch a movie longer than {runtime} minutes.
          <br /><br />
          You DO want to see a {preferredGenres.map((genre, index) => (
            index === preferredGenres.length - 1 ?
              <span key={genre}>
                or {genre}
              </span> :
              <span key={genre}>
                {genre},{' '}
              </span>
          ))} movie.
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "red" }}>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
