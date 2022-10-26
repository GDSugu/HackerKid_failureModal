import React, { useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import { $, pageInit } from '../framework';
import Img from '../components/Img';
import '../../../stylesheets/common/pages/webkata/style.scss';
import useRootPageState from '../../../../hooks/pages/root';
import { useWebkataFetchQuestion } from '../../../../hooks/pages/webkata';
import WebkataLevelComponent from '../components/WebkataLevelComponent';
import WebkataNavBar from '../components/WebkataNavBar';
import GameLeaderboardComponent from '../components/GameLeaderboardComponent';

const updateHistory = (response) => {
  try {
    const { uniqueString, virtualId, conceptId } = response.questionObject;
    window.history.replaceState({}, '', `/webkata/${conceptId.toLowerCase()}/${virtualId}/${uniqueString}`);
  } catch (error) {
    console.log(error);
  }
};

const resizeHandler = (nav = 'nav', selector) => {
  try {
    const navHeight = document.querySelector(nav).offsetHeight;
    document.querySelector(selector).style.height = `calc(100vh - ${navHeight}px)`;
  } catch (e) {
    console.log(e);
  }
};

const hideDefaultNavBar = (device, turtleState) => {
  document.querySelector('nav:first-child').style.display = 'none';
  let componentContainer = `.webkata-${turtleState}-container`;
  if (device === 'desktop') {
    componentContainer = `.webkata-${turtleState}-container`;
  } else if (device === 'mobile') {
    componentContainer = `.webkata-mob-${turtleState}-container`;
  }
  window.addEventListener('resize', () => resizeHandler('nav.turtle-navbar', componentContainer));
  setTimeout(() => {
    resizeHandler('nav.turtle-navbar', componentContainer);
  }, 300);
};

const WebkataHomeComponent = ({ changeRoute }) => {
  pageInit('webkata-home-container', 'WebKata');

  React.useEffect(() => {
    window.addEventListener('resize', () => resizeHandler('nav', '.webkata-frame'));
    const resizeTimeout = setTimeout(() => {
      resizeHandler('nav', '.webkata-frame');
    }, 300);

    return () => clearTimeout(resizeTimeout);
  }, []);

  return <>
    {/* <TurtleNavBar
    // questionState={memoizedTurtleQuestionState}
    // handleHint={handleHint}
    isTurtleMainPage={false}
  /> */}
    <div className="webkata-frame">
      <div className="webkata-card-container">
        <div className="webkata-card">
          <div className="card-container">
            <h1 className='game-title'>
              <FormattedMessage
                defaultMessage={'WebKata - HTML'}
                description={'Webkata title'}
              />
            </h1>
            <p className="game-description">
              <FormattedMessage
                defaultMessage={'Learn to code while drawing, and code along to see the output right on your screens. Everyone draws to express themselves the best! Why not channelize that to learn?'}
                description={'WebKata description'}
              />
            </p>
          </div>
        </div>
        <button
          className='btn btn-block game-btn'
          onClick={() => changeRoute('webkataGame')}>
          <p className='gameBtnDesc'>
            <FormattedMessage
              defaultMessage={'Start Playing'}
              description={'Play button'}
            />
          </p>
        </button>
      </div>
      <div className="webkata-mob-card">
        <div className="webkata-title">
          <h1 className='game-title'>
            <FormattedMessage
              defaultMessage={'WebKata - HTML'}
              description={'webkata title'}
            />
          </h1>
        </div>
        <div className="webkata-actions">
          <div className="d-flex align-items-center">
            {/* <a href="../../" className="btn btn-transparent turtle-action-btn turtle-audio-btn">
              <Img src='../../../../images/games/gameAudio.png' alt='Game Audio' />
            </a> */}
            <button className="btn btn-transparent turtle-action-btn webkata-play-btn" onClick={() => changeRoute('webkataGame')}>
              <div className="play-btn-container">
                <Img src='../../../../images/games/gamePlay.png' className='play-btn-img' alt='Game Leaderboard' />
                <p>
                  <FormattedMessage
                    defaultMessage={'PLAY'}
                    description={'Play button'}
                  />
                </p>
              </div>
            </button>
            {/* <a href="" className="btn btn-transparent turtle-action-btn turtle-leaderboard-btn">
              <Img src='../../../../images/games/gameLeaderboard.png' alt='Game Leaderboard' />
            </a> */}
          </div>
        </div>
      </div>
    </div>
  </>;
};

const WebkataGameComponent = () => {
  const isPageMounted = useRef(true);
  const levelComponentRef = useRef(null);
  const leaderboardComponentRef = useRef(null);

  pageInit('webkata-main-container', 'Webkata');

  const { state: { device } } = useRootPageState();
  const { conceptId, id } = useParams();

  const {
    state: webkataState,
    fetchWebkataQuestion,
  } = useWebkataFetchQuestion({
    isPageMounted, initializeData: true, conceptid: conceptId, virtualid: id,
  });

  const {
    status,
    questionList,
    questionObject,
  } = webkataState;

  const memorizedWebkataQuestionState = React.useMemo(() => webkataState,
    [questionList]);

  useEffect(() => {
    hideDefaultNavBar(device, 'game');

    return () => {
      document.querySelector('nav:first-child').style.display = 'block';
    };
  }, []);

  useEffect(() => {
    updateHistory(memorizedWebkataQuestionState);
  }, [memorizedWebkataQuestionState.questionObject]);

  // methods
  const handleFetchQuestion = (clickedUponVirtualId) => fetchWebkataQuestion(conceptId,
    clickedUponVirtualId);
  const onLevelIndicatorClick = () => {
    levelComponentRef.current.show();
  };

  const onLeaderboardBtnClick = () => {
    leaderboardComponentRef.current.toggle();
  };

  const toggleWebkata = (action = 'show' || 'hide') => {
    if (action === 'show') {
      $('.webkata-game-container').slideDown();
      $('.level-navbar').slideDown({
        complete: () => {
          $('.level-navbar').css('display', 'flex');
        },
      });
      $('.game-mob-container').slideDown();
      $('.leaderboard-btn').removeClass('active');
    } else if (action === 'hide') {
      $('.webkata-game-container').slideUp();
      $('.game-mob-container').slideUp({
        complete: () => {
          $('.level-navbar').slideUp();
        },
      });
      $('.leaderboard-btn').addClass('active');
    }
  };

  const ProblemStatement = ({ currentDevice, currentQuestion }) => <>
    {
      currentDevice === 'desktop'
      && <div className='question'>
        <label className='problem-statement-label body-bold'>
          <FormattedMessage defaultMessage={'Problem Statement:'} description='problem statement label' />
        </label>
        <h6 className='problem-statement body-bold'>
          <FormattedMessage defaultMessage={'{problemStatement}'} description='problem statement' values={{
            problemStatement: currentQuestion.question,
          }} />
        </h6>
      </div>
    }
    {
      currentDevice === 'mobile'
      && <div className='mobile-question-container'>
        <button
          type='button'
          className='mobile-question-revealer btn-block body-bold'
          onClick={() => {
            $('.mobile-question-revealer').toggleClass('question-open');

            if ($('.problem-statement-container').hasClass('show')) {
              $('.problem-statement-container').removeClass('show');
              $('.problem-statement-container').addClass('hide');
            } else {
              $('.problem-statement-container').removeClass('hide');
              $('.problem-statement-container').addClass('show');
            }

            $('.question-revealer-icon').toggleClass('rotate180');
          }}
        >
          <FormattedMessage defaultMessage={'Problem Statement'} description='problem statement label' />
          <i className={'fa fa-chevron-down question-revealer-icon'} />
        </button>
        <div className='problem-statement-container'>
          <h6 className='problem-statement body-bold'>
            <FormattedMessage defaultMessage={'{problemStatement}'} description='problem statement' values={{
              problemStatement: currentQuestion.question,
            }} />
          </h6>
        </div>
      </div>
    }
  </>;

  return <>
    <WebkataNavBar
      levelBtnHandler={onLevelIndicatorClick}
      leaderboardHandler={onLeaderboardBtnClick}
      questionState={memorizedWebkataQuestionState}
      isWebkataGamePage={true}
    />
    <main className='webkata-game-container'>
      <ProblemStatement currentDevice={device} currentQuestion={questionObject} />
      
    </main>
    <GameLeaderboardComponent
      ref={leaderboardComponentRef}
      game={'webkata'}
      beforeShown={() => { toggleWebkata('hide'); }}
      beforeHidden={() => { toggleWebkata('show'); }} />
    {
      memorizedWebkataQuestionState.status === 'success'
      && <WebkataLevelComponent
        ref={levelComponentRef}
        handleFetchQuestion={handleFetchQuestion}
        gameData={memorizedWebkataQuestionState} />
    }
  </>;
};

const Webkata = () => {
  const [webkataRoute, setWebaktaRoute] = React.useState('webkataHome');
  const changeRoute = (route) => setWebaktaRoute(route);

  React.useEffect(() => {
    const locationArray = window.location.href.split('/').filter((el) => el !== '');
    if (locationArray.length > 4) {
      changeRoute('webkataGame');
    }
  }, []);

  return <>
    {
      webkataRoute === 'webkataHome' && <WebkataHomeComponent changeRoute={changeRoute} />
    }
    {
      webkataRoute === 'webkataGame' && <WebkataGameComponent />
    }
  </>;
};

export default Webkata;
