import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

export default function MoviePreferenceComponent({ onPreferenceChange, data }) {
  const [runtime, setRuntime] = useState(sessionStorage.getItem('selectedRuntime') || 240);
  const [selectedGenres, setSelectedGenres] = useState(JSON.parse(sessionStorage.getItem('selectedGenres')) || []);
  const [preferredGenres, setPreferredGenres] = useState(JSON.parse(sessionStorage.getItem('preferredGenres')) || []);
  const [selectedService, setSelectedService] = useState([]);
  const [uniqueGenres, setUniqueGenres] = useState([]);
  const [isStreamingServicesOpen, setStreamingServicesOpen] = useState(false); // State for streaming services visibility
  const [isRuntimeOpen, setIsRuntimeOpen] = useState(false); 
  const [isPreferredGenresOpen, setIsPreferredGenresOpen] = useState(false);
  const [isSelectedGenresOpen, setIsSelectedGenresOpen] = useState(false);
  const [isDirectorOpen, setIsDirectorOpen] = useState(false);
  const [directorSearch, setDirectorSearch] = useState('');
  const [filteredDirectors, setFilteredDirectors] = useState([]);
  const [preferredDirectors, setPreferredDirectors] = useState([]);

  console.log("preferred directors:", preferredDirectors);

  const handleDirectorSearch = (event) => {
    const searchTerm = event.target.value.trim().toLowerCase(); // Remove whitespace and convert to lowercase
    const flattenedDirectors = data.reduce((acc, movie) => {
      if (movie.director) {
        acc.push(...movie.director);
      }
      return acc;
    }, []);
  
    const uniqueDirectors = new Set(); // Set to keep track of unique directors
    const filtered = searchTerm === '' ?
      [] :
      flattenedDirectors.filter(director => {
        const lowerCaseName = director.name.trim().toLowerCase(); // Remove whitespace and convert to lowercase
        // Check if director's name includes search term and if it's not already in uniqueDirectors
        if (lowerCaseName.includes(searchTerm) && !uniqueDirectors.has(lowerCaseName)) {
          uniqueDirectors.add(lowerCaseName); // Add director's name to set
          return true;
        }
        return false;
      });
  
    setFilteredDirectors(filtered);
    setDirectorSearch(event.target.value);
  };
  
  // Define handleDirectorCheckboxChange function
  const handleDirectorClick = (directorName) => {
    // Toggle director selection
    const isSelected = preferredDirectors.includes(directorName);
    if (isSelected) {
      // Remove director from preferredDirectors array
      const updatedDirectors = preferredDirectors.filter(director => director !== directorName);
      setPreferredDirectors(updatedDirectors);
    } else {
      // Add director to preferredDirectors array
      const updatedDirectors = [...preferredDirectors, directorName];
      setPreferredDirectors(updatedDirectors);
    }

    // Update session storage
    sessionStorage.setItem('preferredDirectors', JSON.stringify(preferredDirectors));
  };

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
        {/* Collapsible streaming services section */}
        <div style={{ marginBottom: '30px', width: "100%", border: '1px solid #ccc', padding: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '10px' }} onClick={() => setStreamingServicesOpen(!isStreamingServicesOpen)}>
  <h4 style={{ marginRight: '5px' }}>What streaming services are you currently paying for and/or stealing?</h4>
  {isStreamingServicesOpen ? <BsChevronUp style={{"boxShadow": "5px 5px 5px green", "margin": "10px"}}/> : <BsChevronDown style={{"boxShadow": "5px 5px 5px gred", "margin": "10px"}} />} {/* Display the arrow icon based on the state */}
</div>

        {isStreamingServicesOpen && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
            {streamingServices.map(service => (
              <div style={{ position: 'relative', display: 'inline-block' }} key={service.name}>
                {/* Streaming service items */}
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
        )}
      </div>

      <div style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
        <div
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '10px' }}
          onClick={() => setIsRuntimeOpen(!isRuntimeOpen)}
        >
          <h4 style={{ marginRight: '5px' }}>What's the longest movie you're down to watch?</h4>
          {isRuntimeOpen ? <BsChevronUp style={{ boxShadow: '5px 5px 5px green', margin: '10px' }} /> : <BsChevronDown style={{ boxShadow: '5px 5px 5px gred', margin: '10px' }} />}
          {/* Display the arrow icon based on the state */}
        </div>
        {isRuntimeOpen && (
          <div>
            <p>{runtime} minutes</p>
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
        )}
      </div>

      <div style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
      <div
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '10px' }}
          onClick={() => setIsPreferredGenresOpen(!isPreferredGenresOpen)}
        >
        <h4>What kind of movie <span style={{ color: 'red', fontSize: '1.2em', textDecoration: 'underline' }}>DO</span> you want to see?</h4>
        {isPreferredGenresOpen ? <BsChevronUp style={{ boxShadow: '5px 5px 5px green', margin: '10px' }} /> : <BsChevronDown style={{ boxShadow: '5px 5px 5px gred', margin: '10px' }} />}
        </div>
        {isPreferredGenresOpen && (
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
        )}
      </div>

      <div style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '10px' }} onClick={() => setIsSelectedGenresOpen(!isSelectedGenresOpen)}>
        <h4>What kind of movie <span style={{ color: 'red', fontSize: '1.2em', textDecoration: 'underline' }}>DON'T</span> you want to see?</h4>
        {isSelectedGenresOpen ? <BsChevronUp style={{"boxShadow": "5px 5px 5px green", "margin": "10px"}}/> : <BsChevronDown style={{"boxShadow": "5px 5px 5px gred", "margin": "10px"}} />} {/* Display the arrow icon based on the state */}
        </div>
        {isSelectedGenresOpen && (
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
        )}
      </div>

      <div style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '10px' }} onClick={() => setIsDirectorOpen(!isDirectorOpen)}>
          <h4>Any directors you're fond of?</h4>
          {isDirectorOpen ? <BsChevronUp style={{ boxShadow: '5px 5px 5px green', margin: '10px' }} /> : <BsChevronDown style={{ boxShadow: '5px 5px 5px red', margin: '10px' }} />}
        </div>
        {isDirectorOpen && (
          <div>
            <input
              type="text"
              placeholder="Search directors..."
              value={directorSearch}
              onChange={handleDirectorSearch}
              style={{ marginBottom: '10px' }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
              {filteredDirectors.map(director => (
                <div className='filtered-director-item' onClick={() => handleDirectorClick(director.name)} key={director.name} style={{ textAlign: 'center' }}>
                  {director.image && (
                    <img
                    className='filtered-director-img'
                      src={director.image}
                      alt={director.name}
                      style={{ width: '100%', height: '75%', objectFit: "cover", marginBottom: '10px' }}
                    />
                  )}
                  <p style={{ margin: '0' }}>{director.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: "15px", marginBottom: "30px"}}>
  <div style={{ display: 'flex', justifyContent: 'center'}}>
    <Button onClick={() => {
  sessionStorage.clear();
  setSelectedGenres([]);
  setPreferredGenres([]);
  setRuntime(240);
  setSelectedService([]);
  window.alert("Preferences have been reset.  Happy viewing!")
}} style={{ marginLeft: '10px', fontSize: "2em", backgroundColor: "red" }}>Reset Preferences</Button>
  </div>
</div>
     
    </div>
  );
}
