import React from 'react';
import { Link } from 'react-router-dom';
import '../../../stylesheets/common/pages/games/style.scss';
import { FormattedMessage } from 'react-intl';
import { loginCheck, pageInit } from '../framework';
import { useDashboard } from '../../../../hooks/pages/dashboard';

const Games = () => {
  pageInit('games-container', 'Games');

  const isPageMounted = React.useRef(true);
  const { state: dashboardState } = useDashboard({ isPageMounted });
  const { dashBoardData } = dashboardState;

  React.useEffect(() => {
    loginCheck();
  }, []);

  return (
    dashBoardData && <section className='container all-games-section'>
    <header className='subtitle1 mb-3'>
        <FormattedMessage defaultMessage={'All Games'} description={'Section Title'} />
    </header>
    <div className='all-game-cards row'>
      <Link to={'/turtle'} className='col-12 col-sm-8 col-md-6 col-ml-4'>
        <div className='game-card card'>
          <div className='game-image-with-level-indicator'>
            <img className='card-img-top' src='../../../../images/games/turtle-game-bg.png' alt="Turle game bg" />
            <button className='level-indicator-btn'>
              <img alt='level-icon' src='../../../../images/games/level-icon.svg' />
              <span className='body'>
                <FormattedMessage defaultMessage={'Level {levelNumber}'}
                  description={'Level indicator'}
                  values={{
                    levelNumber: dashBoardData.turtle.currentQuestionDetails.virtualId,
                  }} />
              </span>
            </button>
          </div>
          <div className="card-body">
            <h5 className="game-title card-title body-bold">
              <FormattedMessage defaultMessage={'Turtle'} description={'Game Title'}/>
            </h5>
            <button className='play-btn'>
              <img className='play-game-icon' alt='play-game-icon' src='../../../../images/games/play-game-icon.svg'/>
            </button>
          </div>
        </div>
      </Link>
    </div>
    </section>
  );
};

export default Games;
