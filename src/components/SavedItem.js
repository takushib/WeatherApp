/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { LinkContainer } from 'react-router-bootstrap';

function SavedItem({ city, state }) {
  const styles = css`
    margin: 5px;
    width: 18rem;
  `;
  return (
    <Card css={styles}>
      <Card.Body>
        <Card.Title>{city}</Card.Title>
        <LinkContainer to={`/cities/${state}/${city}`}>
          <Button variant="primary">Go To Page</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
}

export default SavedItem;
