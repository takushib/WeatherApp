/** @jsx jsx */
import { useState } from 'react';
import { jsx, css } from '@emotion/core';
import Container from 'react-bootstrap/container';
import { Switch, Route } from 'react-router-dom';

import City from './pages/City';
import Navbar from './components/Navbar';
import Map from './pages/Map';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Saved from './pages/Saved';

function App() {
  const [savedPlaces, setPlaces] = useState([]);
  const addCity = (city, state) => {
    const newCity = {
      city,
      state,
    };
    alert(`Added ${city}, ${state} to saved places`);
    setPlaces([...savedPlaces, newCity]);
  };
  const styles = css`
    width: 100%;
    height: 100%;
  `;
  return (
    <div css={styles}>
      <Navbar />
      <Container>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/map">
            <Map />
          </Route>
          <Route path="/cities/:state/:city">
            <City addCity={addCity} />
          </Route>
          <Route path="/browse">
            <Browse />
          </Route>
          <Route path="/saved">
            <Saved places={savedPlaces} />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
