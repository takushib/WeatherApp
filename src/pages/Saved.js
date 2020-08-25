/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import SavedItem from '../components/SavedItem';

function Saved({ places }) {
  const styles = css`
    text-align: center;
    padding-top: 20px;
  `;

  const itemStyles = css`
    display: flex;
    flex-direction: row;
  `;

  return (
    <div css={styles}>
      <h1>Saved Cities</h1>
      <div css={itemStyles}>
        {places.map(place => {
          return <SavedItem state={place.state} city={place.city} />;
        })}
      </div>
    </div>
  );
}

export default Saved;
