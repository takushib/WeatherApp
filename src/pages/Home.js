/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

import WeatherData from '../components/WeatherData';

const usePosition = () => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  const onChange = ({ coords }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };
  const onError = e => {
    setError(e.message);
  };
  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not supported');
      return () => null;
    }
    const watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);

  return { ...position, error };
};

function Home() {
  const { latitude, longitude } = usePosition();
  const styles = css`
    text-align: center;
    padding-top: 20px;
  `;

  const location = {
    lat: latitude,
    lon: longitude,
  };

  return (
    <div css={styles}>
      <h1>Home</h1>
      {latitude && longitude ? (
        <WeatherData location={location} />
      ) : (
        <Card css={styles}>
          <Card.Body>
            <Card.Title>Current Weather</Card.Title>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default Home;
