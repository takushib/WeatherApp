/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';

import ClimateData from '../components/ClimateData';
import WeatherData from '../components/WeatherData';
import cities from '../data/cities.json';

const City = ({ addCity }) => {
  const { city, state } = useParams();
  const [location, setLocation] = useState();

  useEffect(() => {
    const result = cities.find(
      item => item.city === city && item.state === state,
    );
    if (result) {
      setLocation({ lat: result.latitude, lon: result.longitude });
    }
  }, []);

  const containerStyles = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 10px;
  `;

  const h1Styles = css`
    margin-top: 10px;
  `;

  const pageStyles = css`
    text-align: center;
  `;

  if (!location) {
    return null;
  }

  return (
    <div css={pageStyles}>
      <h1 css={h1Styles}>{`${city}, ${state}`}</h1>
      <p>{location ? `${location.lat}, ${location.lon}` : ''}</p>
      <Button onClick={() => addCity(city, state)}>Save Location</Button>
      <div css={containerStyles}>
        <WeatherData location={location} />
        <ClimateData location={location} />
      </div>
    </div>
  );
};

export default City;
