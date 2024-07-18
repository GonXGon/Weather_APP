import React, { useState } from 'react';
import './Search.scss';

const Search = ({ onSearch }) => {
  const [location, setLocation] = useState('');

  const handleSearch = async () => {
    if (!location) return;
    const apiKey = process.env.REACT_APP_MAPBOX_API_KEY;
    const response = await fetch(`https://geocode.maps.co/search?q=${location}&api_key=${apiKey}`);
    const data = await response.json();

    if (data && data.length > 0) {
      const lat = data[0].lat;
      const lng = data[0].lon;
      onSearch({ lat, lng, location});
    }
  };

  return (
    <div className="search-container">
      <input
        className="input"
        type="text"
        placeholder="Enter city"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button className="button is-info" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
