import React, { useState } from 'react';
import "./Forecast.scss";
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faArrowLeft, faArrowRight, faThermometerHalf,faTint,faWind,faCompressArrowsAlt,faCloud,faSun,faArrowUp, } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment-timezone';

const Forecast = ({ dailyForecast, weatherIconMapping, currentTime }) => {
    const [showNextDay, setShowNextDay] = useState(false);
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  
    const handlePrevDay = () => {
      setSelectedDayIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      setShowNextDay(false);
    };
  
    const handleNextDay = () => {
      setSelectedDayIndex((prevIndex) => Math.min(prevIndex + 1, dailyForecast.length - 1));
      setShowNextDay(true);
    };
  
    const selectedDay = dailyForecast[selectedDayIndex];
  
    return (
        <div className="forecast-section">
            <Card.Body  key={selectedDayIndex} className='forecastdetail-cards'>
                <Card.Header className="forecastHeader">
                    <h2>{moment(selectedDay.dt * 1000).format('ddd, MMM D')}</h2>
                    <FontAwesomeIcon icon={weatherIconMapping[selectedDay.weather[0].main] || faCloudSun} size="4x" />
                    <div className='forecastHeader-detail'>
                        <h4>{selectedDay.temp.day}°C</h4>
                        <h4>{currentTime}</h4>
                        <h4>{selectedDay.weather[0].description}</h4>
                    </div>
                </Card.Header>
                <div className='forecastDetail-card'>
                    <Card style={{ width: '10rem', height: '5rem' }} className='cardDetails'>
                        <Card.Text>
                            <FontAwesomeIcon icon={faThermometerHalf} /> Feels Like: {selectedDay.feels_like.day}°C
                        </Card.Text>
                    </Card>

                    <Card style={{ width: '10rem', height: '5rem' }} className='cardDetails'>
                        <Card.Text>
                        <FontAwesomeIcon icon={faTint} /> Humidity: {selectedDay.humidity}%
                        </Card.Text>
                    </Card>

                    <Card style={{ width: '10rem', height: '5rem' }} className='cardDetails'>
                        <Card.Text>
                        <FontAwesomeIcon icon={faCompressArrowsAlt} /> Pressure: {selectedDay.pressure} hPa
                        </Card.Text>
                    </Card>

                    <Card style={{ width: '10rem', height: '5rem' }} className='cardDetails'>
                        <Card.Text>
                        <FontAwesomeIcon icon={faWind} /> Wind Speed: {selectedDay.wind_speed} m/s
                        </Card.Text>
                    </Card>

                    <Card style={{ width: '10rem', height: '5rem' }} className='cardDetails'>
                        <Card.Text>
                        <FontAwesomeIcon icon={faArrowUp} /> Wind Direction: {selectedDay.wind_deg}°
                        </Card.Text>
                    </Card>

                    <Card style={{ width: '10rem', height: '5rem' }} className='cardDetails'>
                        <Card.Text>
                            <FontAwesomeIcon icon={faCloud} /> Cloudiness: {selectedDay.clouds}%
                        </Card.Text>
                    </Card>

                    <Card style={{ width: '10rem', height: '5rem' }} className='cardDetails'>
                        <Card.Text>
                            <FontAwesomeIcon icon={faSun} /> UV Index: {selectedDay.uvi}
                        </Card.Text>
                    </Card>
                </div>
            </Card.Body>
        <div className="forecast-navigation">
          <Button onClick={handlePrevDay} disabled={selectedDayIndex === 0} variant="info">
            <FontAwesomeIcon icon={faArrowLeft} /> Previous Day
          </Button>
          <Button onClick={handleNextDay} disabled={selectedDayIndex === dailyForecast.length - 1} variant="info">
            Next Day <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </div>
      </div>
    );
  }

export default Forecast;
