import React from 'react';
import { Link } from 'react-router-dom';
import '../../../stylesheets/common/pages/games/style.scss';
import { loginCheck, pageInit } from '../framework';

const Games = () => {
  pageInit('games-container', 'Games');

  React.useEffect(() => {
    loginCheck();
  }, []);

  return <div className='container'>
  <header className='subtitle1 mb-3'>All Games</header>
  <div className='all-game-cards row'>
    <Link to={'/turtle'} className='col-12 col-md-6 col-lg-4'>
      <div className='card'>
        <img className="card-img-top" src='../../../../images/games/turtle-game-bg.png' alt="Turle game bg" />
        <div className="card-body">
          <h5 className="card-title body-bold">Turtle</h5>
          <button className='play-btn'>
            <img className='play-game-icon' alt='play-game-icon' src='../../../../images/games/play-game-icon.svg'/>
          </button>
        </div>
      </div>
    </Link>
  </div>
  </div>;
};

export default Games;
