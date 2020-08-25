/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { NavLink } from 'react-router-dom';

function SideNav({ open, toggleButton }) {
  const styles = css`
    height: 100%; /* 100% Full-height */
    width: ${open ? `30%` : `0%`}; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 1; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    background-color: #333; /* Black*/
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 30px; /* Place content 60px from the top */
    transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
    @media (min-width: 768px) {
      display: none;
    }

    li a {
      padding: 8px 8px 8px 32px;
      text-decoration: none;
      font-size: 3vw;
      color: white;
      display: block;
      transition: 0.3s;
    }
    li a:hover {
      background-color: #111;
    }

    li a.active {
      background-color: #4caf50;
    }

    ul {
      list-style-type: none;
      text-decoration: none;
      padding: 0px;
      margin: 0px;
    }

    button {
      position: absolute;
      right: 1%;
      top: 1%;
      width: 20%;
    }
  `;
  return (
    <div css={styles}>
      <button type="button" onClick={() => toggleButton(false)}>
        &#10094;
      </button>
      <ul>
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/map">Map</NavLink>
        </li>
        <li>
          <NavLink to="/browse">Browse</NavLink>
        </li>
        <li>
          <NavLink to="/saved">Saved</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideNav;
