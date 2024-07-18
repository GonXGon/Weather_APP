import React, { useState, useEffect } from 'react';
import './Card.scss';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThermometerHalf,
  faTint,
  faWind,
  faCompressArrowsAlt,
  faCloud,
  faSun,
  faArrowUp,
  faLocationDot,
  faCloudSun,
  faCloudRain,
  faSnowflake,
  faBolt,
  faSmog,
  faCloudShowersHeavy,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment-timezone';
import Forecast from '../Forecast/Forecast';

const weatherIconMapping = {
  Clear: faSun,
  Clouds: faCloud,
  Rain: faCloudRain,
  Snow: faSnowflake,
  Thunderstorm: faBolt,
  Drizzle: faCloudShowersHeavy,
  Atmosphere: faSmog,
};

const WeatherCard = ({ weather, location }) => {
  const { temp, feels_like, pressure, humidity, clouds, uvi, wind_speed, wind_deg, weather: weatherDetails } = weather.current;
  const dailyForecast = weather.daily;

  const timezone = weather.timezone;
  const offset = weather.timezone_offset;

  const [currentTime, setCurrentTime] = useState('');
  const [showForecast, setShowForecast] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const time = moment().utcOffset(offset / 60).tz(timezone).format('HH:mm');
      setCurrentTime(time);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [offset, timezone]);

  const mainWeather = weatherDetails[0].main;
  const weatherIcon = weatherIconMapping[mainWeather] || faCloudSun;

  const toggleForecast = () => {
    setShowForecast(!showForecast);
  };

  return (
    <div>
      <Card className="weather-card">
        <h1>Weather Forecast</h1>
        <div className='btns'>
          <Button onClick={toggleForecast} variant="info">
            <FontAwesomeIcon icon={faArrowRight} /> {showForecast ? 'Show Current Weather' : 'Show 5-Day Forecast'}
          </Button>
          <Button className='homebutton' href='/'>Home</Button>
        </div>
        {!showForecast ? (
          <>
            <Card.Header >
              <div className="weather-icon">
                <FontAwesomeIcon icon={weatherIcon} size="3x" />
              </div>
              <div className='center-details'>
                <h1>{temp}°C</h1>
                <h2>{currentTime}</h2>
                <h4>{weatherDetails[0].description}</h4>
                <div>
                  <FontAwesomeIcon icon={faLocationDot} />{location}
                </div>
              </div>
            </Card.Header>
            <Card.Body className="weather-details">
              <Card style={{ width: '10rem', height: '5rem' }} className="weatherDetails-card">
                <Card.Text>
                  <FontAwesomeIcon icon={faThermometerHalf} /> Feels Like: {feels_like}°C
                </Card.Text>
              </Card>

              <Card style={{ width: '10rem', height: '5rem' }} className="weatherDetails-card">
                <Card.Text>
                  <FontAwesomeIcon icon={faTint} /> Humidity: {humidity}%
                </Card.Text>
              </Card>

              <Card style={{ width: '10rem', height: '5rem' }} className="weatherDetails-card">
                <Card.Text>
                  <FontAwesomeIcon icon={faCompressArrowsAlt} /> Pressure: {pressure} hPa
                </Card.Text>
              </Card>

              <Card style={{ width: '10rem', height: '5rem' }} className="weatherDetails-card">
                <Card.Text>
                  <FontAwesomeIcon icon={faWind} /> Wind Speed: {wind_speed} m/s
                </Card.Text>
              </Card>

              <Card style={{ width: '10rem', height: '5rem' }} className="weatherDetails-card">
                <Card.Text>
                  <FontAwesomeIcon icon={faArrowUp} /> Wind Direction: {wind_deg}°
                </Card.Text>
              </Card>

              <Card style={{ width: '10rem', height: '5rem' }} className="weatherDetails-card">
                <Card.Text>
                  <FontAwesomeIcon icon={faCloud} /> Cloudiness: {clouds}%
                </Card.Text>
              </Card>

              <Card style={{ width: '10rem', height: '5rem' }} className="weatherDetails-card">
                <Card.Text>
                  <FontAwesomeIcon icon={faSun} /> UV Index: {uvi}
                </Card.Text>
              </Card>
            </Card.Body>
          </>
        ) : (
          <Forecast dailyForecast={dailyForecast} weatherIconMapping={weatherIconMapping} currentTime={currentTime}/>
        )}
      </Card>
    </div>
  );
};

export default WeatherCard;
