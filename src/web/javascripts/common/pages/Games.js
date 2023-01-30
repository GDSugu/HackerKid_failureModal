import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../../stylesheets/common/pages/games/style.scss';
import { FormattedMessage } from 'react-intl';
import { $, loginCheck, pageInit } from '../framework';
import { useDashboard } from '../../../../hooks/pages/dashboard';
import SwiperComponent from '../components/SwiperComponent';
import Img from '../components/Img';
import { useLeaderBoard } from '../../../../hooks/pages/leaderboard';
import BottomSheet from '../components/BottomSheet';

const showBottomSheet = () => {
  $('#viewMoreSheet').modal({
    backdrop: 'static',
  });
};

// Bottomsheet components
const IndividualGameSummaryCard = ({ gameDetails, contentContainerCustomClass, onClick }) => (
  <div className={`individual-game-summary-card ${contentContainerCustomClass}`} onClick={onClick}>
    <div className='game-cover-with-title'>
      <Img className='game-cover' src={gameDetails.gameCoverURL} />
      <div className='title-with-level-progress-indicator'>
        <h5 className='title body-bold'>
          <FormattedMessage defaultMessage={'{gameTitle}'} description={'game title'} values={{ gameTitle: gameDetails.gameTitle }} />
        </h5>
        <div className='level-progress-indicator'>
          <img className='level-icon' alt='level-icon' src='../../../../images/games/level-icon.svg' />
          <span className='level-indicator-text caption-bold'>
            <FormattedMessage defaultMessage={'{levelNumber}'}
              description={'Level indicator'}
              values={{
                levelNumber: `${gameDetails.validSubmissionCount}/${gameDetails.totalLevels}`,
              }} />
          </span>
        </div>
      </div>
    </div>
    <div className='other-stats-with-progress-bar'>
      <OtherStats totalEarnedCoins={gameDetails.totalEarnedCoins} />
      <LinearProgressBar
        step={Number(gameDetails.validSubmissionCount)}
        steps={Number(gameDetails.totalLevels)} />
    </div>
  </div>
);

const LeaderBoardCard = ({
  leaderBoardData, leaderBoardUserData, isDesktop, contentContainerCustomClass = '',
}) => (
  <div className={contentContainerCustomClass}>
    {
      isDesktop && <div className='leaderboard-card desktop-leaderboard-card'>
        <header className='leaderboard-card-title-with-your-rank'>
          <h5 className='title body-bold'>
            <FormattedMessage defaultMessage={'Leaderboard'} description={'leaderboard heading'} />
          </h5>
          <p className='your-rank caption-bold'>
            <FormattedMessage defaultMessage={'Your rank: #{rank}'} description={'your rank'} values={{ rank: leaderBoardUserData.rank }} />
          </p>
        </header>
        <ol className='top-3'>
          {
            leaderBoardData.slice(0, 3).map((obj, index) => (
              <li key={index} className='rank-listing body'>
                <p className='rank-number-with-name'>
                  <span>
                    <FormattedMessage defaultMessage={'#{rankNumber}'} description={'rank'} values={{ rankNumber: obj.rank }} />
                  </span>
                  <span>
                    <FormattedMessage defaultMessage={'{name}'} description={'rank holder name'} values={{ name: obj.name }} />
                  </span>
                </p>
                <p className='rank-holder-earned-coins'>
                  <FormattedMessage defaultMessage={'{earnedCoins}'} description={'earned coins'} values={{ earnedCoins: obj.points }} />
                </p>
              </li>
            ))
          }
        </ol>
      </div>
    }
    {
      !isDesktop && <div className='leaderboard-card mobile-leaderboard-card'>
        <header className='leaderboard-card-title-with-your-rank'>
          <h5 className='title body-bold'>
            <FormattedMessage defaultMessage={'Leaderboard Ranking'} description={'leaderboard heading'} />
          </h5>
        </header>
        <h5 className='your-rank heading3'>
          <FormattedMessage defaultMessage={'#{rank}'} description={'your rank'} values={{ rank: leaderBoardUserData.rank }} />
          <span className='caption-bold ml-1'>
            <FormattedMessage defaultMessage={'rank'} description={'rank caption'} />
          </span>
        </h5>
        <ol className='top-3'>
          {
            leaderBoardData.slice(0, 3).map((obj, index) => (
              <li key={index} className='rank-listing body'>
                <p className='rank-number-with-name'>
                  <span>
                    <FormattedMessage defaultMessage={'#{rankNumber}'} description={'rank'} values={{ rankNumber: obj.rank }} />
                  </span>
                  <span>
                    <FormattedMessage defaultMessage={'{name}'} description={'rank holder name'} values={{ name: obj.name }} />
                  </span>
                </p>
                <p className='rank-holder-earned-coins'>
                  <FormattedMessage defaultMessage={'{earnedCoins}'} description={'earned coins'} values={{ earnedCoins: obj.points }} />
                </p>
              </li>
            ))
          }
        </ol>
        <footer>
          <Link to={'/leaderboard'} className='mobile-show-leaderboard-btn btn btn-block'>
            <FormattedMessage defaultMessage={'Show Leaderboard'} description='show leaderboard btn' />
          </Link>
        </footer>
      </div>
    }
  </div>
);

// re-usable in-page components
const CircleProgressBar = ({ step, steps, contentContainerCustomClass = '' }) => (
  <div className={`circle-progress ${contentContainerCustomClass}`}>
    <svg xmlns="http://www.w3.org/2000/svg" id="yourScoreAnimated" viewBox="0 0 100 100">
      <linearGradient id="gradient">
        <stop offset="0%" className="start" />
        <stop offset="90%" className="end" />
      </linearGradient>
      <path id="yourScoreProgress" strokeLinecap="round" strokeWidth="6" strokeDasharray="140, 251.2" className="progress-bar"
        d="M50 10
                a 40 40 0 0 1 0 80
                a 40 40 0 0 1 0 -80">
      </path>
      <g transform="translate(50,45)">
        <text id="yourScoreCount" x="0" y="0" alignmentBaseline="middle" textAnchor="middle" dy="1" fontSize="14">
          <tspan>{step}</tspan>
          <tspan>/{steps}</tspan>
        </text>
        <text id="yourScore" x="0" y="15" alignmentBaseline="middle" textAnchor="middle" dy="1" fontSize="10">
          <FormattedMessage
            defaultMessage={'completed'}
            description={'completed'}
          />
        </text>
      </g>
    </svg>
  </div>
);

const LinearProgressBar = ({ step, steps, contentContainerCustomClass = '' }) => (
  <div className={`level-progress-bar-container ${contentContainerCustomClass}`}>
    <div className='level-progress-bar'>
      <div className='level-progress' style={{ width: `${(step / steps) * 100}%` }}></div>
    </div>
  </div>
);

const OtherStats = ({
  totalEarnedCoins, contentContainerCustomClass = '',
  // totalEarnedXp, averageTime
}) => (
  <div className={`other-stats ${contentContainerCustomClass}`}>
    <div className='game-stat'>
      <Img className='game-stat-icon' src='common/hkcoin.png' />
      <span className='game-stat-text body'>
        <FormattedMessage defaultMessage={'{totalEarnedCoins}'} description={'total earned coins'} values={{ totalEarnedCoins }} />
      </span>
    </div>
  </div>
);

// helper component for GameCard
const GameStats = ({
  validSubmissionCount, totalLevels, totalEarnedCoins, contentContainerCustomClass = '',
  // totalEarnedXp, averageTime
}) => (
  <div className={`game-stats-container ${contentContainerCustomClass}`} >
    <div className='level-progress-indicator'>
      <img className='level-icon' alt='level-icon' src='../../../../images/games/level-icon.svg' />
      <span className='level-indicator-text caption-bold'>
        <FormattedMessage defaultMessage={'{levelNumber}'}
          description={'Level indicator'}
          values={{
            levelNumber: `${validSubmissionCount}/${totalLevels}`,
          }} />
      </span>
    </div>
    <div className='other-stats-with-level-progress-bar'>
      <OtherStats totalEarnedCoins={totalEarnedCoins} />
      <LinearProgressBar step={validSubmissionCount} steps={totalLevels} />
    </div>
  </div>
);

// Game card component
const GameCard = ({
  gameDetails, gameCardVariant, onClick, isDesktop, contentContainerCustomClass = '',
}) => {
  const onMouseEnter = (e) => {
    const { target } = e;
    const jTarget = $(target);

    if (jTarget.hasClass('level-indicator-btn')) {
      jTarget.siblings('.game-stats-container').addClass('game-stats-container-slide-up');
    } else {
      const jParent = jTarget.parent('.level-indicator-btn');
      jParent.siblings('.game-stats-container').addClass('game-stats-container-slide-up');
    }
  };

  const onMouseLeave = (e) => {
    const { target } = e;
    const jTarget = $(target);

    if (jTarget.hasClass('level-indicator-btn')) {
      jTarget.siblings('.game-stats-container').removeClass('game-stats-container-slide-up');
    } else {
      const jParent = jTarget.parent('.level-indicator-btn');

      jParent.siblings('.game-stats-container').removeClass('game-stats-container-slide-up');
    }
  };

  const onClickMobile = (e) => {
    e.stopPropagation();
    const { target } = e;
    const jTarget = $(target);

    if (jTarget.hasClass('level-indicator-btn')) {
      jTarget.siblings('.game-stats-container').toggleClass('game-stats-container-slide-up');
    } else {
      const jParent = jTarget.parent('.level-indicator-btn');
      jParent.siblings('.game-stats-container').toggleClass('game-stats-container-slide-up');
    }
  };

  const handlers = isDesktop ? { onMouseEnter, onMouseLeave } : { onClick: onClickMobile };

  return (
    <div className={contentContainerCustomClass} onClick={onClick}>
      <div className={`game-card card ${gameCardVariant === 0 ? 'variant0' : 'variant1'}`} tabIndex='0'>
        <div className='gameimage-levelindicator-gamestats-container'>
          <Img className='card-img-top' src={gameDetails.gameCoverURL} alt="game cover" />
          {
            gameCardVariant === 0
            && <button className='level-indicator-btn' {...handlers}>
              <img alt='level-icon' src='../../../../images/games/level-icon.svg' />
              <span className='body'>
                <FormattedMessage defaultMessage={'Level {levelNumber}'}
                  description={'Level indicator'}
                  values={{
                    levelNumber: gameDetails.currentLevelNumber,
                  }} />
              </span>
            </button>
          }
          {
            gameCardVariant === 0 && <GameStats
              validSubmissionCount={Number(gameDetails.validSubmissionCount)}
              totalLevels={Number(gameDetails.totalLevels)}
              totalEarnedCoins={Number(gameDetails.totalEarnedCoins)}
            />
          }
        </div>
        <div className="card-body">
          <h5 className={`game-title card-title ${gameCardVariant === 0 ? 'heading5' : 'body-bold'}`}>
            <FormattedMessage defaultMessage={'{gameTitle}'} description={'Game Title'} values={{ gameTitle: gameDetails.gameTitle }} />
          </h5>
          <button className='play-btn'>
            <img className='play-game-icon' alt='play-game-icon' src='../../../../images/games/play-game-icon.svg' />
            {
              gameCardVariant === 0 && <span className='play-btn-text overline-bold'>
                <FormattedMessage defaultMessage={'PLAY'} description={'play btn text'} />
              </span>
            }
          </button>
        </div>
      </div>
    </div>
  );
};

// Hero card component
const HeroComponent = ({
  dashboardUserData, gameData, leaderBoardData, leaderBoardUserData, isDesktop, session,
}) => {
  let profileImg = '../../../../images/profile/default_user.png';
  if (session && dashboardUserData) {
    profileImg = (session.profileLink ? session.profileLink : dashboardUserData.profileImage)
      .toString()
      .replace(/(updatedAt=(\d+))/g, `updatedAt=${Date.now() / 1000}`);
  }

  return (
    <>
      {
        isDesktop && <div className='hero-card row'>
          <div className="hero-card-data col-6 col-sm-4">
            <div className="hero-card-img"
              style={(session.profileLink || dashboardUserData.profileImage)
                ? { backgroundImage: `url(${profileImg})` }
                : {}
              }></div>
            <div className="hero-card-data-content">
              <div className="hero-data">
                <Img src='common/hkcoin.png' />
                <p className='mb-0'>{`${gameData.totalPointsEarned || '--'} coins`}</p>
              </div>
            </div>
          </div>
          <div className='leaderboard-with-total-levels-completed col-6 col-sm-8'>
            <div className='col-4 col-lg-3 px-1 px-sm-0'>
              {
                gameData && <CircleProgressBar
                  step={gameData.gameProgress}
                  steps={gameData.totalGames} />
              }
              {
                !gameData && <div className='skeleton-card'></div>
              }
            </div>
            <div className='col-10 col-md-8 col-lg-6 px-1 px-sm-2'>
              {
                leaderBoardData && leaderBoardUserData && <LeaderBoardCard
                  leaderBoardData={leaderBoardData}
                  leaderBoardUserData={leaderBoardUserData}
                  isDesktop={isDesktop} />
              }
              {
                (!leaderBoardData || !leaderBoardUserData) && <div className='skeleton-card'></div>
              }
            </div>
          </div>
        </div>
      }
      {
        !isDesktop && <div className='mobile-hero-block'>
          <header className='page-heading-more-info'>
            <h5 className='page-heading subtitle-1'>
              <FormattedMessage defaultMessage={'Games'} description={'Games page heading'} />
            </h5>
            <button type='button' className='more-info-btn caption-bold disabled' onClick={showBottomSheet}>
              <FormattedMessage defaultMessage={'Loading...'} description={'more info btn'} />
            </button>
          </header>
          {
            gameData && <OtherStats totalEarnedCoins={gameData.totalPointsEarned} />
          }
          {
            !gameData && <div className='skeleton-card other-stats-skeleton'></div>
          }
        </div>
      }
    </>
  );
};

// top level component
const Games = () => {
  pageInit('games-container', 'Games');

  // hooks
  const navigate = useNavigate();
  const isPageMounted = React.useRef(true);
  const { state: dashboardState } = useDashboard({ isPageMounted });
  const { state: leaderBoardState } = useLeaderBoard({ isPageMounted });

  const {
    dashBoardData, userData: dashboardUserData, sessionData, gameData,
  } = dashboardState;

  const {
    leaderboardData,
    userData: leaderBoardUserData,
  } = leaderBoardState;

  // local state
  const [isDesktop, setIsDesktop] = useState(window.matchMedia('(min-width: 590px)').matches);

  // methods
  const populateScore = (selectorPrefix, score, percentage) => {
    if (score) {
      $({ Counter: 0, percent: 0 }).animate({
        Counter: score,
        percent: percentage,
      }, {
        duration: 1500,
        easing: 'linear',
        step: (val, fx) => {
          if (fx.prop === 'Counter') {
            $(`${selectorPrefix}Count tspan:first-child`).text(Math.ceil(val));
          }
          if (fx.prop === 'percent') {
            $(`${selectorPrefix}Progress`).attr('stroke-dasharray', `${val * 251.2 * 0.01}, 251.2`);
          }
        },
        complete: () => {
          $('.more-info-btn')
            .html('More Info')
            .removeClass('disabled');
        },
      });
    }
  };

  populateScore('#yourScore', gameData.gameProgress, parseInt((gameData.gameProgress / gameData.totalGames) * 100, 10));

  React.useEffect(() => {
    loginCheck();
    window.addEventListener('resize', () => {
      setIsDesktop(window.matchMedia('(min-width: 590px)').matches);
    });

    return () => {
      isPageMounted.current = false;
    };
  }, []);

  // games data
  const gameCardsDataArr = [{
    gameTitle: 'Turtle',
    currentLevelNumber: dashBoardData?.turtle?.currentQuestionDetails
      ? dashBoardData.turtle.currentQuestionDetails.virtualId : 0,
    totalEarnedCoins: dashBoardData?.turtle?.totalPointsEarned
      ? dashBoardData.turtle.totalPointsEarned : 0,
    totalLevels: dashBoardData?.turtle?.overAllQuestionCount,
    validSubmissionCount: dashBoardData?.turtle?.validSubmissionCount,
    gameCoverURL: 'games/turtle-game-cover.png',
    onClick: () => { navigate('/turtle'); },
  },
  {
    gameTitle: 'Zombieland',
    currentLevelNumber: dashBoardData?.zombieLand?.currentQuestionDetails
      ? dashBoardData.zombieLand.currentQuestionDetails.virtualId : 0,
    totalEarnedCoins: dashBoardData?.zombieLand?.totalPointsEarned
      ? dashBoardData.zombieLand.totalPointsEarned : 0,
    totalLevels: dashBoardData?.zombieLand?.overAllQuestionCount,
    validSubmissionCount: dashBoardData?.zombieLand?.validSubmissionCount,
    gameCoverURL: 'games/zombie-game-cover.png',
    onClick: () => { navigate('/zombieland'); },
  },
  {
    gameTitle: 'Webkata-CSS',
    currentLevelNumber: dashBoardData?.webkataCss?.currentQuestionDetails
      ? dashBoardData.webkataCss.currentQuestionDetails.virtualId : 0,
    totalEarnedCoins: dashBoardData?.webkataCss?.totalPointsEarned
      ? dashBoardData.webkataCss.totalPointsEarned : 0,
    totalLevels: dashBoardData?.webkataCss?.overAllQuestionCount,
    validSubmissionCount: dashBoardData?.webkataCss?.validSubmissionCount,
    gameCoverURL: 'games/webkata-css-game-cover.png',
    onClick: () => { navigate('/webkata/css'); },
  },
  {
    gameTitle: 'Webkata-HTML',
    currentLevelNumber: dashBoardData?.webkataHtml?.currentQuestionDetails
      ? dashBoardData.webkataHtml.currentQuestionDetails.virtualId : 0,
    totalEarnedCoins: dashBoardData?.webkataHtml?.totalPointsEarned
      ? dashBoardData.webkataHtml.totalPointsEarned : 0,
    totalLevels: dashBoardData?.webkataHtml?.overAllQuestionCount,
    validSubmissionCount: dashBoardData?.webkataHtml?.validSubmissionCount,
    gameCoverURL: 'games/webkata-html-game-cover.png',
    onClick: () => { navigate('/webkata/html'); },
  },
  {
    gameTitle: 'Webkata-JS',
    currentLevelNumber: dashBoardData?.webkataJs?.currentQuestionDetails
      ? dashBoardData.webkataJs.currentQuestionDetails.virtualId : 0,
    totalEarnedCoins: dashBoardData?.webkataJs?.totalPointsEarned
      ? dashBoardData.webkataJs.totalPointsEarned : 0,
    totalLevels: dashBoardData?.webkataJs?.overAllQuestionCount,
    validSubmissionCount: dashBoardData?.webkataJs?.validSubmissionCount,
    gameCoverURL: 'games/webkata-js-game-cover.png',
    onClick: () => { navigate('/webkata/js'); },
  },
  ];

  return (
    <div className='col-12 col-md-11 col-xl-10 mx-auto mx-auto'>
      {/* hero section */}
      <HeroComponent
        dashboardUserData={dashboardUserData}
        isDesktop={isDesktop}
        session={sessionData}
        gameData={gameData}
        leaderBoardUserData={leaderBoardUserData}
        leaderBoardData={leaderboardData} />
      {/* continue playing section */}
      <section className='continue-playing-games-section'>
        <header className='subtitle1 mb-2'>
          <FormattedMessage defaultMessage={'Continue playing'} description={'Section Title'} />
        </header>
        <div className='continue-playing-game-cards'>
          {
            dashBoardData && <SwiperComponent
              data={gameCardsDataArr}
              SlideComponent={({ data }) => (
                <GameCard
                  isDesktop={isDesktop}
                  onClick={data.onClick}
                  gameCardVariant={0}
                  gameDetails={{
                    gameTitle: data.gameTitle,
                    currentLevelNumber: data.currentLevelNumber,
                    validSubmissionCount: data.validSubmissionCount,
                    totalLevels: data.totalLevels,
                    totalEarnedCoins: data.totalEarnedCoins,
                    gameCoverURL: data.gameCoverURL,
                  }} />
              )}
              swiperModules={{
                navigation: true,
              }}
              swiperProps={{
                spaceBetween: 10,
                slidesPerView: 'auto',
                className: 'recommended-games-swiper',
                grabCursor: true,
                lazy: true,
                navigation: true,
              }}>
            </SwiperComponent>
          }
          {
            !dashBoardData
            && <>
              <div className="skeleton">
                <div className="d-flex align-items-center skeleton-game-cards-container">
                  {[1, 2, 3, 4, 5, 6].map((item, index) => (
                    <div key={index} className='skeleton-game-card'></div>
                  ))}
                </div>
              </div>
            </>
          }
        </div>
      </section>
      {/* recommended games section */}
      <section className='recommended-games-section'>
        <header className='subtitle1 mb-2'>
          <FormattedMessage defaultMessage={'Recommended Games'} description={'Section Title'} />
        </header>
        <div className='recommended-game-cards'>
          {
            dashBoardData && <SwiperComponent
              data={gameCardsDataArr}
              SlideComponent={({ data }) => (
                <GameCard
                  isDesktop={isDesktop}
                  onClick={data.onClick}
                  gameCardVariant={0}
                  gameDetails={{
                    gameTitle: data.gameTitle,
                    currentLevelNumber: data.currentLevelNumber,
                    validSubmissionCount: data.validSubmissionCount,
                    totalLevels: data.totalLevels,
                    totalEarnedCoins: data.totalEarnedCoins,
                    gameCoverURL: data.gameCoverURL,
                  }} />
              )}
              swiperModules={{
                navigation: true,
              }}
              swiperProps={{
                spaceBetween: 10,
                slidesPerView: 'auto',
                className: 'recommended-games-swiper',
                grabCursor: true,
                lazy: true,
                navigation: true,
              }}>
            </SwiperComponent>
          }
          {
            !dashBoardData
            && <>
              <div className="skeleton">
                <div className="d-flex align-items-center skeleton-game-cards-container">
                  {[1, 2, 3, 4, 5, 6].map((item, index) => (
                    <div key={index} className='skeleton-game-card'></div>
                  ))}
                </div>
              </div>
            </>
          }
        </div>
      </section>
      {/* all games section */}
      <section className='all-games-section'>
        <header className='subtitle1'>
          <FormattedMessage defaultMessage={'All Games'} description={'Section Title'} />
        </header>
        <div className='all-game-cards row no-gutters mx-n2'>
          {
            dashBoardData && <>
              <GameCard
                isDesktop={isDesktop}
                onClick={() => navigate('/turtle')}
                gameCardVariant={1}
                contentContainerCustomClass={'col-6 col-sm-4 col-xl-3 p-1 p-md-2'}
                gameDetails={{
                  gameTitle: 'Turtle',
                  currentLevelNumber: dashBoardData.turtle.currentQuestionDetails
                    ? dashBoardData.turtle.currentQuestionDetails.virtualId : 0,
                  totalLevels: dashBoardData.turtle.overAllQuestionCount,
                  gameCoverURL: 'games/turtle-game-cover.png',
                }} />
              <GameCard
                isDesktop={isDesktop}
                onClick={() => { navigate('/zombieland'); }}
                gameCardVariant={1}
                contentContainerCustomClass={'col-6 col-sm-4 col-xl-3 p-1 p-md-2'}
                gameDetails={{
                  gameTitle: 'Zombieland',
                  currentLevelNumber: dashBoardData.zombieLand.currentQuestionDetails
                    ? dashBoardData.zombieLand.currentQuestionDetails.virtualId : 0,
                  totalLevels: dashBoardData.turtle.overAllQuestionCount,
                  gameCoverURL: 'games/zombie-game-cover.png',
                }} />
              <GameCard
                isDesktop={isDesktop}
                onClick={() => { navigate('/webkata/css'); }}
                gameCardVariant={1}
                contentContainerCustomClass={'col-6 col-sm-4 col-xl-3 p-1 p-md-2'}
                gameDetails={{
                  gameTitle: 'Webkata-CSS',
                  currentLevelNumber: dashBoardData.turtle.currentQuestionDetails.virtualId,
                  totalLevels: dashBoardData.turtle.overAllQuestionCount,
                  gameCoverURL: 'games/webkata-css-game-cover.png',
                }} />
              <GameCard
                isDesktop={isDesktop}
                onClick={() => { navigate('/webkata/html'); }}
                gameCardVariant={1}
                contentContainerCustomClass={'col-6 col-sm-4 col-xl-3 p-1 p-md-2'}
                gameDetails={{
                  gameTitle: 'Webkata-HTML',
                  currentLevelNumber: dashBoardData.turtle.currentQuestionDetails.virtualId,
                  totalLevels: dashBoardData.turtle.overAllQuestionCount,
                  gameCoverURL: 'games/webkata-html-game-cover.png',
                }} />
              <GameCard
                isDesktop={isDesktop}
                onClick={() => { navigate('/webkata/js'); }}
                gameCardVariant={1}
                contentContainerCustomClass={'col-6 col-sm-4 col-xl-3 p-1 p-md-2'}
                gameDetails={{
                  gameTitle: 'Webkata-JS',
                  currentLevelNumber: dashBoardData.turtle.currentQuestionDetails.virtualId,
                  totalLevels: dashBoardData.turtle.overAllQuestionCount,
                  gameCoverURL: 'games/webkata-js-game-cover.png',
                }} />
              <GameCard
                isDesktop={isDesktop}
                onClick={() => { navigate('/codekata'); }}
                gameCardVariant={1}
                contentContainerCustomClass={'col-6 col-sm-4 col-xl-3 p-1 p-md-2'}
                gameDetails={{
                  gameTitle: 'CodePirate',
                  currentLevelNumber: dashBoardData.turtle.currentQuestionDetails.virtualId,
                  totalLevels: dashBoardData.turtle.overAllQuestionCount,
                  gameCoverURL: 'games/codePirateCover.png',
                }} />
            </>
          }
          {
            !dashBoardData && <>
              {
                [1, 2, 3, 4, 5].map((val) => (
                  <div key={val} className='col-6 col-sm-4 col-xl-3 p-1 p-md-2'>
                    <div className='skeleton-game-card'></div>
                  </div>
                ))
              }
            </>
          }
        </div>
      </section>
      {/* bottomSheet for mobile */}
      {
        !isDesktop
        && <>
          <BottomSheet id='viewMoreSheet'>
            {
              gameData && <div className='mobile-total-gameprogress-coins'>
                <CircleProgressBar step={gameData.gameProgress} steps={gameData.totalGames} contentContainerCustomClass='mobile-circle-progress' />
                <div className='coins-earned-with-average-time'>
                  <div className='coins-earned'>
                    <Img src='common/hkcoin.png' className='hkcoin-icon' />
                    <div>
                      <h6 className='coins-earned-subtitle caption'>
                        <FormattedMessage defaultMessage={'Coins Earned:'} description='Coins Earned subtitle' />
                      </h6>
                      <h5 className='coins-earned body-bold'>
                        <FormattedMessage defaultMessage={'{coins}'} description='Coins Earned' values={{ coins: gameData.totalPointsEarned }} />
                      </h5>
                    </div>
                  </div>
                  {/* <div className='time-spent'>
                  <Img src='common/hkcoin.png' className='hkcoin-icon' />
                    <div>
                      <h6 className='coins-earned-subtitle'>
                        <FormattedMessage
                        defaultMessage={'Time Spent:'}
                        description='Coins Earned subtitle'/>
                      </h6>
                      <h5 className='time-spent'>
                        <FormattedMessage
                        defaultMessage={'{timeSpent}'}
                        description='Time Spent'
                        values={{ coins: gameData.averageTime }}/>
                      </h5>
                    </div>
                </div> */}
                </div>
              </div>
            }
            {
              dashBoardData && <div className='inidividual-game-summary-cards'>
                {
                  gameCardsDataArr.map((gameDetails, idx) => <IndividualGameSummaryCard
                    key={idx}
                    onClick={() => navigate('/turtle')}
                    gameDetails={gameDetails} />)
                }
              </div>
            }
            {
              leaderboardData && leaderBoardUserData && <LeaderBoardCard
                leaderBoardData={leaderboardData}
                leaderBoardUserData={leaderBoardUserData}
                isDesktop={isDesktop} />
            }
          </BottomSheet>
        </>
      }
    </div>
  );
};

export default Games;
