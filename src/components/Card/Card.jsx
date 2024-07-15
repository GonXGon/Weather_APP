import React from 'react';
import './Card.scss';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faThermometerHalf, faTint, faWind, faCompressArrowsAlt, faCloud, faSun, faEye, faArrowUp } from '@fortawesome/free-solid-svg-icons';

const WeatherCard = ({ weather }) => {
  const { temp, feels_like, pressure, humidity, clouds, uvi, visibility, wind_speed, wind_gust, wind_deg, weather: weatherDetails } = weather.current;

  return (
    <div>
      <Card className="weather-card">
        <Card.Header className="heading-weather">
          <h2>Current Weather</h2>
          <img src={`http://openweathermap.org/img/wn/${weatherDetails[0].icon}@2x.png`} alt="Weather icon" />
        </Card.Header>
        <Card.Body className="weather-details">
          <Card.Text>
            <FontAwesomeIcon icon={faTemperatureHigh} /> Temperature: {temp}°C
          </Card.Text>
          <Card.Text>
            <FontAwesomeIcon icon={faThermometerHalf} /> Feels Like: {feels_like}°C
          </Card.Text>
          <Card.Text>
            <FontAwesomeIcon icon={faTint} /> Humidity: {humidity}%
          </Card.Text>
          <Card.Text>
            <FontAwesomeIcon icon={faCompressArrowsAlt} /> Pressure: {pressure} hPa
          </Card.Text>
          <Card.Text>
            <FontAwesomeIcon icon={faWind} /> Wind Speed: {wind_speed} m/s
          </Card.Text>
          {wind_gust && (
            <Card.Text>
              <FontAwesomeIcon icon={faWind} /> Wind Gust: {wind_gust} m/s
            </Card.Text>
          )}
          <Card.Text>
            <FontAwesomeIcon icon={faArrowUp} /> Wind Direction: {wind_deg}°
          </Card.Text>
          <Card.Text>
            <FontAwesomeIcon icon={faCloud} /> Cloudiness: {clouds}%
          </Card.Text>
          <Card.Text>
            <FontAwesomeIcon icon={faSun} /> UV Index: {uvi}
          </Card.Text>
          <Card.Text>
            <FontAwesomeIcon icon={faEye} /> Visibility: {visibility} meters
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default WeatherCard;
