import React from 'react';
import '../../../stylesheets/common/pages/games/style.scss';
import { pageInit } from '../framework';

const Games = () => {
  pageInit('games-container', 'Games');

  return <>
  <div>
    <div>
      games
    </div>
  </div>
  </>;
};

export default Games;