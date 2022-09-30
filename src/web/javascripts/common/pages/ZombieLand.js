import React from 'react';
import { FormattedMessage } from 'react-intl';
import { pageInit } from '../framework';
import { useZombieLand } from '../../../../hooks/pages/zombieLand';
import Img from '../components/Img';
import '../../../stylesheets/common/pages/zombieLand/style.scss';

const resizeHandler = (nav = 'nav', selector) => {
  try {
    const navHeight = document.querySelector(nav).offsetHeight;
    document.querySelector(selector).style.height = `calc(100vh - ${navHeight}px)`;
  } catch (e) {
    console.log(e);
  }
};

const ZombieLandHomeComponent = ({ changeRoute = () => {} }) => {
  pageInit('zombieLand-home-container', 'ZombieLand');

  React.useEffect(() => {
    document.querySelector('nav:first-child').style.display = 'none';
    window.addEventListener('resize', () => resizeHandler('nav', '.zombieLand-frame'));

    const resizeTimeout = setTimeout(() => {
      resizeHandler('nav.zombieLand-navbar', '.zombieLand-frame');
    }, 300);

    return () => clearTimeout(resizeTimeout);
  }, []);

  return <>
    <div className="zombieLand-frame">
      <div className="zombieLand-card-container">
        <div className="zombieLand-card">
          <div className="card-container">
            <h1 className="gameTitle">
              <FormattedMessage
                defaultMessage={'ZombieLand'}
                id={'zombieLand title'}
              />
            </h1>
            <p className="gameDesc">
              <FormattedMessage
                defaultMessage={'Zombieland is a gamified approach where you will use your mind to code and help the protagonist Zombie reach his destination.'}
                id={'zombieLand description'}
              />
            </p>
          </div>
        </div>
        <button
          className='btn btn-block gameBtn'
          onClick={() => changeRoute('zombieLandGame')}
        >
          <p className="gameBtnDesc">
            <FormattedMessage
              defaultMessage={'Start Playing'}
              description={'Play button'}
            />
          </p>
        </button>
      </div>
      <div className="zombieLand-mob-card">
        <div className="zl-title">
          <h1 className="gameTitle">
            <FormattedMessage
              defaultMessage={'ZombieLand'}
              id={'zombieLand title'}
            />
          </h1>
        </div>
        <div className="zl-actions">
          <div className="d-flex align-items-center">
            <button className="btn btn-transparent zl-action-btn zl-play-btn">
              <div className="play-btn-container">
                <Img src='../../../../images/games/gamePlay.png' className='play-btn-img' alt='Game Leaderboard' />
                <p>
                  <FormattedMessage
                    defaultMessage={'Play'}
                    description={'Play button'}
                  />
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </>;
};

const ZombieLandGameComponent = ({ zlState, zlSetState, zlStatic }) => {
  pageInit('zombieLand-game-container', 'ZombieLand');

  return <>
    <h1>Game component</h1>
  </>;
};

const ZombieLand = () => {
  const isPageMounted = React.useRef(true);
  const {
    state: zlState,
    setState: zlSetState,
    static: zlStatic,
  } = useZombieLand({ isPageMounted, initialize: false });

  const { changeRoute } = zlStatic;

  React.useEffect(() => {
    const locationArray = window.location.href.split('/').filter((el) => el !== '');
    if (locationArray.length > 3) {
      changeRoute('zombieLandGame');
    }
  }, []);

  return (
    <>
      {
        zlState.route === 'zombieLandHome'
        && <ZombieLandHomeComponent changeRoute={changeRoute} />
      }
      {
        zlState.route === 'zombieLandGame'
        && <ZombieLandGameComponent
          zlState={zlState}
          zlSetState={zlSetState}
          zlStatic={zlStatic} />
      }
    </>
  );
};

export default ZombieLand;
