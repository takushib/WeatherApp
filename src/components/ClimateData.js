/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import qs from 'qs';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

import { noaa as noaaToken } from '../credentials.json';

const DIFF = 0.15;

export default ({ location }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [climateData, setClimateData] = useState(null);

  const options = {
    method: 'GET',
    headers: {
      token: noaaToken,
    },
  };

  const fetchClimateData = async stations => {
    const querystring = qs.stringify(
      {
        datasetid: 'GSOY',
        datatypeid: ['TAVG', 'PRCP'],
        limit: 1000,
        startdate: '2005-01-01',
        enddate: '2015-01-01',
        units: 'standard',
        includemetadata: false,
        stationid: stations.map(({ id }) => id),
      },
      {
        arrayFormat: 'repeat',
        encode: false,
      },
    );
    const url = `https://www.ncdc.noaa.gov/cdo-web/api/v2/data?${querystring}`;

    try {
      const res = await fetch(url, options);
      const { results } = await res.json();
      if (results && results.length) {
        const precipResults = results.filter(
          ({ datatype }) => datatype === 'PRCP',
        );
        const precip =
          precipResults.reduce((acc, { value }) => acc + value, 0) /
          precipResults.length;

        const tempResults = results.filter(
          ({ datatype }) => datatype === 'TAVG',
        );
        const temp =
          tempResults.reduce((acc, { value }) => acc + value, 0) /
          tempResults.length;

        return { precip, temp };
      }
    } catch (e) {
      console.error(e);
    }

    return null;
  };

  const fetchStations = async ({ lat, lon }) => {
    const querystring = qs.stringify({
      extent: `${lat - DIFF},${lon - DIFF},${lat + DIFF},${lon + DIFF}`,
      limit: 5,
      sortfield: 'datacoverage',
      sortorder: 'desc',
      startdate: '2015-01-01',
      enddate: '2005-01-01',
    });
    const url = `https://www.ncdc.noaa.gov/cdo-web/api/v2/stations?${querystring}`;

    try {
      const res = await fetch(url, options);
      const { results } = await res.json();
      if (results) {
        const stations = results.filter(({ id }) => id.includes('GHCND'));
        const data = await fetchClimateData(stations);

        setClimateData(data);
        setIsLoading(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (location) {
      fetchStations(location);
    }
  }, [location]);

  const cardStyles = css`
    margin: 5px;
    flex: 1;
  `;

  if (isLoading) {
    return (
      <Card css={cardStyles}>
        <Card.Body>
          <Card.Title>Yearly Climate Data</Card.Title>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Card.Body>
      </Card>
    );
  }

  const temp = climateData.temp.toFixed(1);
  const precip = climateData.precip.toFixed(1);

  return (
    <Card css={cardStyles}>
      <Card.Body>
        <Card.Title>Yearly Climate Data</Card.Title>
        <Card.Text>{`Average Temp: ${temp}°F`}</Card.Text>
        <Card.Text>{`Average Precip: ${precip}"`}</Card.Text>
      </Card.Body>
    </Card>
  );
};
