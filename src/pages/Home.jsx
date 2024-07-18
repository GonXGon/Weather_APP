import React, { useState } from 'react';
import Search from '../components/Search/Search';
import './Home.scss';
import WeatherCard from '../components/Card/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('');

  const fetchWeather = async ({ lat, lng, location }) => {
    const apikey = process.env.REACT_APP_WEATHER_API_KEY;
    const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${apikey}`);
    const data = await response.json();
    setWeather(data);
    setLocation(location);
    console.log(data);
  };

  return (
    <div className="content">
      {weather ? (
        <WeatherCard weather={weather} location={location}/>
      ) : (
        <div className="card-container">
          <div className='icon-container'>
            <h2>Weather Forecast</h2>
            <FontAwesomeIcon icon={faCloudSun} size="9x" />
          </div>
          <div className='input-container'>
            <h4>Enter city below</h4>
            <Search onSearch={fetchWeather} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
