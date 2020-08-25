/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import Button from 'react-bootstrap/Button';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { LinkContainer } from 'react-router-bootstrap';

import cities from '../data/cities.json';

function MapPage() {
  const mapContainerStyles = css`
    padding: 20px;
    text-align: center;
  `;

  const mapStyles = css`
    height: 500px;
  `;

  return (
    <div css={mapContainerStyles}>
      <h1>Map</h1>
      <Map center={[39, -95]} zoom={4} css={mapStyles}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities
          .sort((a, b) => Number(a.population) > Number(b.population))
          .slice(0, 100)
          .map(city => {
            const position = [city.latitude, city.longitude];
            return (
              <Marker position={position}>
                <Popup>
                  <h6>{`${city.city}, ${city.state}`}</h6>
                  <LinkContainer to={`/cities/${city.state}/${city.city}`}>
                    <Button variant="primary" active>
                      Go To Page
                    </Button>
                  </LinkContainer>
                </Popup>
              </Marker>
            );
          })}
        ;
      </Map>
    </div>
  );
}

export default MapPage;
