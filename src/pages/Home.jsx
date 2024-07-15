import React, { useState } from 'react';
import Search from '../components/Search/Search';
import './Home.scss';
import WeatherCard from '../components/Card/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [weather, setWeather] = useState(null);

  const fetchWeather = async ({ lat, lng }) => {
    const apikey = 'd24f18dc0bf342480fa1e02eed14038a';
    const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${apikey}`);
    const data = await response.json();
    setWeather(data);
    console.log(data);
  };

  return (
    <div className="content">
      {weather ? (
        <WeatherCard weather={weather} />
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
