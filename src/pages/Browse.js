/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { LinkContainer } from 'react-router-bootstrap';

import cities from '../data/cities.json';

function Browse() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    setResults(cities);
  }, []);

  const containerStyles = css`
    width: 100%;
    height: 100%;
    text-align: center;
  `;

  const searchStyles = css`
    margin: auto;
    margin-top: 100px;
    width: 300px;
  `;

  const inputStyles = css`
    border-radius: 5px;
    padding: 5px;
    margin: 10px 0px;
    height: 40px;
    width: 100%;
  `;

  const onChange = ({ target: { value } }) => {
    const newResults = cities.filter(({ city }) =>
      city.toLowerCase().includes(value.toLowerCase()),
    );
    return setResults(newResults);
  };

  return (
    <div css={containerStyles}>
      <div css={searchStyles}>
        <h1>Browse Cities</h1>
        <input css={inputStyles} placeholder="City Name" onChange={onChange} />
        <ListGroup>
          {results.slice(0, 10).map(city => (
            <LinkContainer
              to={`/cities/${city.state}/${city.city}`}
              key={city.rank}
            >
              <ListGroup.Item action>
                {`${city.city}, ${city.state}`}
              </ListGroup.Item>
            </LinkContainer>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default Browse;
