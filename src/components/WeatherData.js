/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

import { owm as apiKey } from '../credentials.json';

export default ({ location: { lat, lon } }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState();

  const fetchData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log({ data });
      setWeatherData(data);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const cardStyles = css`
    margin: 5px;
    flex: 1;
  `;

  if (isLoading) {
    return (
      <Card css={cardStyles}>
        <Card.Body>
          <Card.Title>Current Weather</Card.Title>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Card.Body>
      </Card>
    );
  }

  const temp = weatherData.main.temp.toFixed(1);
  const windSpeed = Math.round(weatherData.wind.speed);

  return (
    <Card css={cardStyles}>
      <Card.Body>
        <Card.Title>Current Weather</Card.Title>
        <Card.Text>{weatherData.weather[0].main}</Card.Text>
        <Card.Text>{`Temperature: ${temp}°F`}</Card.Text>
        <Card.Text>{`Humidity: ${weatherData.main.humidity}%`}</Card.Text>
        <Card.Text>{`Wind Speed: ${windSpeed} mph`}</Card.Text>
      </Card.Body>
    </Card>
  );
};
