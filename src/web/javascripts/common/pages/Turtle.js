import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import loadable from '@loadable/component';
import '../../../stylesheets/common/pages/turtle/style.scss';
import {
  $, isFeatureEnabled, pageInit, pathNavigator, timeTrack,
} from '../framework';
import Img from '../components/Img';
import GameNavBar from '../components/GameNavBar';
import Modal from '../components/Modal';
import { useTurtleFetchQuestion } from '../../../../hooks/pages/turtle';
import {
  copyHandler,
  repositionTurtle, runSkulpt, startTurtle, toggleDebugState, toggleDrawingState,
} from '../Functions/turtle';
import GameLevelComponent from '../components/GameLevelComponent';
import GameLeaderboardComponent from '../components/GameLeaderboardComponent';
import AwardsNotificationCard from '../components/AwardsNotificationCard';
import Loader from '../components/Loader';
import { SubscriptionContext } from '../../../../hooks/pages/root';

const Loading = () => <Loader />;
const RouteTakeChallenge = loadable(() => import('./TakeChallenge'), { fallback: <Loading /> });
const RouteCreateChallenge = loadable(() => import('./CreateChallenge'), { fallback: <Loading /> });

const resizeHandler = (nav = 'nav', selector) => {
  try {
    const navHeight = document.querySelector(nav).offsetHeight;
    const element = document.querySelector(selector);
    if (element) {
      element.style.height = `calc(100vh - ${navHeight}px)`;
    }
  } catch (e) {
    console.log(e);
  }
};

const hideDefaultNavBar = (device, turtleState) => {
  document.querySelector('nav:first-child').style.display = 'none';
  let componentContainer = `.turtle-${turtleState}-container`;
  if (device === 'desktop') {
    componentContainer = `.turtle-${turtleState}-container`;
  } else if (device === 'mobile') {
    componentContainer = '.game-mob-container';
  }
  // eslint-disable-next-line prefer-arrow-callback
  window.addEventListener('resize', function handler() {
    if (!window.location.pathname.includes('turtle')) {
      this.removeEventListener('resize', handler);
    }
    resizeHandler('nav.game-navbar', componentContainer);
  });
  setTimeout(() => {
    resizeHandler('nav.game-navbar', componentContainer);
  }, 300);
};

const TurtleHomeComponent = ({ changeRoute }) => {
  pageInit('turtle-home-container', 'Turtle');

  const listenResizeTFrame = () => resizeHandler('nav', '.turtle-frame');

  React.useEffect(() => {
    window.addEventListener('resize', listenResizeTFrame);
    const resizeTimeout = setTimeout(() => {
      resizeHandler('nav', '.turtle-frame');
    }, 300);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', listenResizeTFrame);
    };
  }, []);

  return <>
    {/* <GameNavBar
    // questionState={memoizedTurtleQuestionState}
    // handleHint={handleHint}
    isGameMainPage={false}
  /> */}
    <div className="turtle-frame">
      <div className="turtle-card-container">
        <div className="turtle-card">
          <div className="card-container">
            <h1 className='gameTitle'>
              <FormattedMessage
                defaultMessage={'Turtle'}
                description={'Turtle title'}
              />
            </h1>
            <p className="gameDesc">
              <FormattedMessage
                defaultMessage={'Learn to code while drawing, and code along to see the output right on your screens. Everyone draws to express themselves the best! Why not channelize that to learn?'}
                description={'Turtle description'}
              />
            </p>
          </div>
        </div>
        <button
          className='btn btn-block gameBtn'
          onClick={() => changeRoute('turtleGame')}>
          <p className='gameBtnDesc'>
            <FormattedMessage
              defaultMessage={'Start Playing'}
              description={'Play button'}
            />
          </p>
        </button>
      </div>
      <div className="turtle-mob-card">
        <div className="turtle-title">
          <h1 className='gameTitle'>
            <FormattedMessage
              defaultMessage={'Turtle'}
              description={'Turtle title'}
            />
          </h1>
        </div>
        <div className="turtle-actions">
          <div className="d-flex align-items-center">
            {/* <a href="../../" className="btn btn-transparent turtle-action-btn turtle-audio-btn">
              <Img src='../../../../images/games/gameAudio.png' alt='Game Audio' />
            </a> */}
            <button className="btn btn-transparent turtle-action-btn turtle-play-btn" onClick={() => changeRoute('turtleGame')}>
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

const TurtleQuestionComponent = ({ status, questionObject }) => <>
  <div className="turtle-question-container">
    <div className="turtle-question-block">
      {
        status === 'success'
        && <>
          <div className="turtle-title-block">
            <p className="turtle-question-title">
              <FormattedMessage
                defaultMessage={'{question}'}
                description={'Question'}
                values={{ question: questionObject.Question }}
              />
            </p>
          </div>
          <div className="turtle-question-content">
            {/* <p className='turtle-question'>
            <FormattedMessage
              defaultMessage={'{question}'}
              description={'Question'}
              values={{ question: questionObject.Question }}
            />
          </p> */}
            <div className="turtle-question-instructions">
              {/* <p className='turtle-question-instructions-title'>
              <FormattedMessage
                defaultMessage={'Instructions'}
                description={'Instructions title'}
              />
            </p> */}
              <ul className='list-unstyled'>
                {
                  questionObject.steps.map((step, index) => <li key={index}>
                    <FormattedMessage
                      defaultMessage={'{step}'}
                      description={'turtle instruction'}
                      values={{ step: (step[step.length - 1] === '.') ? step.slice(0, -1) : step }}
                    />
                  </li>)
                }
              </ul>
            </div>
          </div>
        </>
      }
    </div>
    <div className="turtle-exoup-block">
      <div className="turtle-title-block">
        <p className="turtle-question-title">
          <FormattedMessage
            defaultMessage={'Expected output'}
            description={'Expected output title'}
          />
        </p>
      </div>
      <div className="turtle-question-content turtle-qnout-container">
        <div id="expOutCanvas"></div>
      </div>
    </div>
  </div>
</>;

const TurtleMobQuestionComponent = ({ status, questionObject }) => <>
  <div className="turtle-mob-question-container">
    <div className="turtle-mob-question-block">
      {
        status === 'success'
        && <>
          <p className='turtle-question-header'>
            <FormattedMessage
              defaultMessage={'{question}'}
              description={'Question'}
              values={{
                question: questionObject.Question,
              }}
            />
          </p>
          <div className="turtle-question-card">
            <div className="turtle-question-content">
              {/* <p className="turtle-question-title">
                <FormattedMessage
                  defaultMessage={'{question}'}
                  description={'Question'}
                  values={{
                    question: questionObject.Question,
                  }}
                />
              </p> */}
              <div className="turtle-question-instructions">
                {/* <p className='turtle-question-instructions-title'>
                  <FormattedMessage
                    defaultMessage={'Instructions'}
                    description={'Instructions title'}
                  />
                </p> */}
                <ul className='list-unstyled'>
                  {
                    questionObject.steps.map((step, index) => <li key={index}>
                      <FormattedMessage
                        defaultMessage={'{step}'}
                        description={'turtle instruction'}
                        values={{ step: (step[step.length - 1] === '.') ? step.slice(0, -1) : step }}
                      />
                    </li>)
                  }
                </ul>
              </div>
            </div>
          </div>
        </>
      }
    </div>
    <div className="turtle-mob-output-block">
      <button type='button' className='d-flex align-items-center justify-content-between' data-toggle="collapse" data-target="#expOupCollapse" aria-expanded="true" aria-controls='expOupCollapse'>
        <p className='mb-0'>
          <FormattedMessage
            defaultMessage={'Expected output'}
            description={'Expected output title'}
          />
        </p>
        <i className="fas fa-angle-down "></i>
      </button>
      <div className="collapse show" id="expOupCollapse">
        <div className="turtle-qnout-container">
          <div id="expOutCanvas"></div>
        </div>
      </div>
    </div>
    <div className="turtle-mob-hero-btn-block">
      <button type='button' className='btn d-flex align-items-center justify-content-between' onClick={() => { $('#output-tab').tab('show'); }}>
        <p>
          <FormattedMessage
            defaultMessage={'Try now'}
            description={'Continue Playing button'}
          />
        </p>
        <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 30L12.064 35.936C11.4033 36.5965 10.5617 37.0463 9.6454 37.2285C8.72913 37.4107 7.77941 37.3172 6.9163 36.9597C6.0532 36.6022 5.31546 35.9968 4.79637 35.2201C4.27729 34.4434 4.00015 33.5302 4 32.596V30L6.714 16.432C7.07649 14.6184 8.05612 12.9865 9.48623 11.8138C10.9163 10.6412 12.7086 10.0002 14.558 10H33.442C35.2914 10.0002 37.0837 10.6412 38.5138 11.8138C39.9439 12.9865 40.9235 14.6184 41.286 16.432L44 30V32.594C43.9999 33.5282 43.7227 34.4414 43.2036 35.2181C42.6845 35.9948 41.9468 36.6002 41.0837 36.9577C40.2206 37.3152 39.2709 37.4087 38.3546 37.2265C37.4383 37.0443 36.5967 36.5945 35.936 35.934L30 30H18Z" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 10L20 14H28L30 10" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  </div>
</>;

const TurtlePlayGroundComponent = ({ handleRunCode, handleDrawingState, handleHint }) => {
  const toggleHintBtn = (dark) => {
    if (dark) {
      $('.hintBtn').addClass('hintBtn-dark');
    } else {
      $('.hintBtn').removeClass('hintBtn-dark');
    }
  };

  return <>
    <div className="turtle-editor-container">
      {/* <div className="turtle-skeleton-body"> */}
      <div className="turtle-editor-title">
        <ul className="nav nav-tabs border-0" id="blocklyPythonTab" role="tablist">
          <li className="nav-item" role="presentation">
            <a className="nav-link active" id="turtle-tab" onClick={() => toggleHintBtn(false)} data-toggle="tab" href="#turtleBlock" role="tab" aria-controls="turtle" aria-selected="true">
              <FormattedMessage
                defaultMessage={'Playground'}
                description={'Playground tab'}
              />
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" id="code-tab" onClick={() => toggleHintBtn(false)} data-toggle="tab" href="#codeBlock" role="tab" aria-controls="code" aria-selected="false">
              <FormattedMessage
                defaultMessage={'Code'}
                description={'Code tab'}
              />
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" id="output-tab" onClick={() => toggleHintBtn(true)} data-toggle="tab" href="#turtleOutput" role="tab" aria-controls="output" aria-selected="false">
              <FormattedMessage
                defaultMessage={'Output'}
                description={'Output tab'}
              />
            </a>
          </li>
        </ul>
        <div className="runBtnContainer">
          <button id='runCode' className='btn runBtn' onClick={() => { toggleHintBtn(true); handleRunCode(); }}>
            <div className="d-flex align-items-center">
              <i className="fas fa-play"></i>
              <p className="mb-0">
                <FormattedMessage
                  defaultMessage={'Play'}
                  description={'play button'}
                />
              </p>
            </div>
          </button>
          <button id='continueDebugger' className='btn runBtn' onClick={() => { toggleHintBtn(true); }}>
            <div className="d-flex align-items-center">
              <i className="fas fa-play"></i>
              <p className="mb-0">
                <FormattedMessage
                  defaultMessage={'Continue'}
                  description={'debugger button'}
                />
              </p>
            </div>
          </button>
        </div>
      </div>
      <div className="tab-content" id="tabsContent">
        <div className="hintBtnContainer">
          <button className="hintBtn btn btn-transparent" onClick={handleHint}>
            <svg width="20" height="27" viewBox="0 0 20 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.384 22.664L13.9973 24.3427C13.853 24.9647 13.514 25.5245 13.0296 25.9405C12.5452 26.3566 11.9407 26.6072 11.304 26.656L11.0733 26.6653H8.25867C7.6198 26.6653 6.99761 26.4614 6.48271 26.0832C5.96781 25.705 5.58709 25.1723 5.396 24.5627L5.33467 24.34L4.948 22.664H14.384ZM9.66667 0C12.2304 0 14.6892 1.01845 16.502 2.8313C18.3149 4.64415 19.3333 7.10291 19.3333 9.66667C19.3333 12.5147 18.0853 15.124 15.6467 17.4533C15.5995 17.4984 15.5666 17.5564 15.552 17.62L14.848 20.664H4.48533L3.784 17.62C3.7692 17.5569 3.7363 17.4994 3.68933 17.4547C1.24933 15.124 0 12.5147 0 9.66533C0.00035359 7.1018 1.01896 4.64339 2.83177 2.83083C4.64459 1.01827 7.10314 -2.43855e-08 9.66667 0Z"
                fill="#ffffff" />
            </svg>
          </button>
        </div>
        <div className="tab-pane fade show active" id="turtleBlock" role="tabpanel" aria-labelledby="turtleBlock-tab">
          {/* turtle block */}
        </div>
        <div className="tab-pane fade" id="codeBlock" role="tabpanel" aria-labelledby="codeBlock-tab">
          {/* code block */}
        </div>
        <div className="tab-pane fade" id="turtleOutput" role="tabpanel" aria-labelledby="turtleOutput-tab">
          <div id="outputSection">
            <div className="drawing-controls">
              {/* <button
                  className="btn btn-light mt-1 zoom-control zoomIn font-weight-bold"
                  data-zoomaction="in" title="Zoom In" disabled>+</button>
                <button
                  className="btn btn-light mt-1 zoom-control zoomOut font-weight-bold"
                  data-zoomaction="out" title="Zoom Out" disabled>-</button> */}
              <button className="btn btn-light mt-1 repositionDrawing" title="Center">
                <i className="fa fa-crosshairs"></i>
              </button>
              <button className="btn btn-light mt-1 drawingToggle" title="Hide output" onClick={handleDrawingState}>
                <i className="fas fa-eye"></i>
              </button>
              <button className="btn btn-light mt-1 debugToggle" title="Enable debugger" onClick={toggleDebugState}>
                <i className="fas fa-pause-circle"></i>
              </button>
            </div>
            <div className="sectionContent outputContainer">
              <div id="userCanvas"></div>
              <div id="answerCanvas"></div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  </>;
};

const SuccessModalComponent = ({
  questionObject, validated, uniqueUrl, message = false, userName = 'user', nextHandler = () => { },
}, ref) => {
  const [screen, setScreen] = React.useState('recognition-screen');
  const shareUrl = `${window.location.origin}/turtle/submissions/${uniqueUrl}/${questionObject.question_id}/${questionObject.uniqueString}`;
  const handleRegister = () => pathNavigator('register');

  React.useImperativeHandle(ref, () => ({
    resetScreen: () => setScreen('recognition-screen'),
  }));

  return <>
    {
      validated
      && <>
        <div className='success-modal-content'>
          {
            screen === 'recognition-screen'
            && <div className='recognition-content'>
              <Img
                src={'../../../../images/games/turtle-success.png'}
              />
              <div className='col-10 mx-auto'>
                <h5>
                  <FormattedMessage
                    defaultMessage={'Awesome!'}
                    description={'Success message'}
                  />
                </h5>
                {
                  message
                  && <>
                    <p>
                      <FormattedMessage
                        // defaultMessage={'Congratulations {username}, you have cleared {level}'}
                        defaultMessage={'{message}'}
                        description={'Success message'}
                        values={{
                          // username: 'John',
                          // level: 'level - 1',
                          message: message.replace('{{name}}', userName),
                        }}
                      />
                    </p>
                    <div className='d-flex align-items-center justify-content-center'>
                      {/* <button className='btn btn-outline-primary' onClick={handleScreen}>
                        <FormattedMessage
                          defaultMessage={'Share'}
                          description={'Share button'}
                        />
                      </button> */}
                      <button className='btn btn-primary' onClick={nextHandler}>
                        <div className="d-flex justify-content-between align-items-center">
                          <FormattedMessage
                            defaultMessage={'Play next'}
                            description={'Play next button'}
                          />
                          <i className="fas fa-angle-right "></i>
                        </div>
                      </button>
                    </div>
                  </>
                }
                {
                  !message
                  && <>
                    <p className='mb-0'>
                      <FormattedMessage
                        // defaultMessage={'Congratulations {username}, you have cleared {level}'}
                        defaultMessage={'You have completed this level !'}
                        description={'Success message'}
                      />
                    </p>
                    <p className='mt-0'>
                      <FormattedMessage
                        // defaultMessage={'Congratulations {username}, you have cleared {level}'}
                        defaultMessage={'Register to save your progess and compete with others'}
                        description={'Success message'}
                      />
                    </p>
                    <div className='d-flex align-items-center justify-content-center'>
                      {/* <button className='btn btn-outline-primary' onClick={handleScreen}>
                              <FormattedMessage
                                defaultMessage={'Continue Exploring'}
                                description={'continue button'}
                              />
                            </button> */}
                      <button className='btn btn-primary' onClick={handleRegister}>
                        <FormattedMessage
                          defaultMessage={'Register for free'}
                          description={'register button'}
                        />
                      </button>
                    </div>
                  </>
                }
              </div>
              { }
            </div>
          }
          {screen === 'share-screen'
            && <div className='share-content'>
              <div className='content-header'>
                <h5>
                  <FormattedMessage
                    defaultMessage={'Share'}
                    description={'Share message'}
                  />
                </h5>
              </div>
              <div className="col-11 col-md-10 btn-container">
                <div className="form-group col">
                  <input type="text" className="form-control" name="shareLink" id="shareLink" value={shareUrl} aria-describedby="helpId" placeholder="share link" readOnly />
                </div>
                <button className='btn btn-outline-primary' onClick={copyHandler} >
                  <FormattedMessage
                    defaultMessage={'Copy Link'}
                    description={'Copy Link button'}
                  />
                </button>
              </div>
            </div>
          }
        </div>
      </>
    }
  </>;
};

const SuccessModalRefComponent = React.forwardRef(SuccessModalComponent);

const HintComponent = ({ hintDetails, handleHint }) => {
  const hideHintContainer = () => $('.hintContainer').animate({
    transform: 200,
  }, {
    duration: 200,
    step: (now) => {
      $('.hintContainer').css('transform', `translate(-50%, ${now}%)`);
    },
    complete: () => {
      $('.hintContainer').removeClass('shown');
    },
  });

  const navigateHint = (e) => {
    const { nativeEvent } = e;
    nativeEvent.stopPropagation();
    const { srcElement } = nativeEvent;
    const disabled = srcElement.classList.value.includes('disabled');
    if (!disabled) {
      const { action } = srcElement.dataset;
      handleHint(action);
    }
  };

  return <>
    <div className="hintContainer">
      {
        hintDetails === 'access_denied'
        && <>
          <button type='button' className='close hideHint' aria-label='Close' onClick={hideHintContainer}>
            <span aria-hidden="true">&times;</span>
          </button>
          <p className='text-center' id='currentHint'>
            <FormattedMessage
              defaultMessage={'Register to Get help from Turtle'}
              description={'Hint message'}
            />
          </p>
          <div className="d-flex justify-content-center hintAction">
            <button type='button' className='btn hideHintBtn mx-2 px-3 py-1' onClick={hideHintContainer}>
              <FormattedMessage
                defaultMessage={'Later'}
                description={'Later button'}
              />
            </button>
            <button type='button' className='btn registerBtn mx-2 px-3 py-1' onClick={() => pathNavigator('register')}>
              <FormattedMessage
                defaultMessage={'Register'}
                description={'Register button'}
              />
            </button>
          </div>
        </>
      }
      {
        hintDetails?.status === 'success'
        && <>
          <button type='button' className='close hideHint' aria-label='Close' onClick={hideHintContainer}>
            <span aria-hidden="true">&times;</span>
          </button>
          <p id='currentHint'>
            <FormattedMessage
              defaultMessage={'{hintMessage}'}
              description={'Hint message'}
              values={{
                hintMessage: hintDetails.hint,
              }}
            />
          </p>
          <div className="d-flex justify-content-between hintAction">
            <button type='button' className={`btn btn-transparent navigateHint ${hintDetails.isFirstHint && 'disabled'}`} data-action='prev' onClick={navigateHint}>
              <i className="fas fa-angle-left"></i>
            </button>
            <button type='button' className={`btn btn-transparent navigateHint ${hintDetails.isLastHint && 'disabled'}`} data-action='next' onClick={navigateHint}>
              <i className="fas fa-angle-right"></i>
            </button>
          </div>
        </>
      }
      {
        hintDetails?.status === 'error'
        && <>
          <button type='button' className='close hideHint' aria-label='Close' onClick={hideHintContainer}>
            <span aria-hidden="true">&times;</span>
          </button>
          <p className='text-center' id='currentHint'>
            <FormattedMessage
              defaultMessage={'{hintMessage}'}
              description={'Hint message'}
              values={{
                hintMessage: hintDetails.message,
              }}
            />
          </p>
          <div className="d-flex justify-content-center hintAction">
            <button type='button' className='mx-2 px-3 py-1' onClick={hideHintContainer}>
              <FormattedMessage
                defaultMessage={'ok'}
                description={'ok button'}
              />
            </button>
          </div>
        </>
      }
    </div>
  </>;
};

const TurtleMobComponent = ({
  status, handleDrawingState, handleDebugState, handleRunCode, questionObject,
}) => <>
    <div className="turtle-mob-game-container">
      <div className="d-none" id="codeBlock"></div>
      <div className="tab-content" id="tabsContent">
        <div className="tab-pane fade show active" id="questionBlock" role="tabpanel" aria-labelledby="questionBlock-tab">
          <TurtleMobQuestionComponent
            status={status}
            questionObject={questionObject}
          />
        </div>
        <div className="tab-pane fade" id="turtleBlock" role="tabpanel" aria-labelledby="turtleBlock-tab">
          {/* turtle block */}
        </div>
        <div className="tab-pane fade" id="turtleOutput" role="tabpanel" aria-labelledby="turtleOutput-tab">
          <div id="outputSection">
            <div className="drawing-controls">
              {/* <button
              className="btn btn-light mt-1 zoom-control zoomIn font-weight-bold"
              data-zoomaction="in" title="Zoom In" disabled>+</button>
            <button
              className="btn btn-light mt-1 zoom-control zoomOut font-weight-bold"
              data-zoomaction="out" title="Zoom Out" disabled>-</button> */}
              <button className="btn btn-light mt-1 repositionDrawing" title="Center">
                <i className="fa fa-crosshairs"></i>
              </button>
              <button className="btn btn-light mt-1 drawingToggle" title="Hide output" onClick={handleDrawingState}>
                <i className="fas fa-eye"></i>
              </button>
              <button className="btn btn-light mt-1 debugToggle" title="Enable debugger" onClick={handleDebugState}>
                <i className="fas fa-pause-circle"></i>
              </button>
            </div>
            <div className="sectionContent outputContainer">
              <div id="userCanvas"></div>
              <div id="answerCanvas"></div>
            </div>
            <div className="mob-runBtnContainer">
              <button id='runCode' className='btn runBtn' onClick={() => { handleRunCode(); }}>
                <p className='mb-0'>
                  <FormattedMessage
                    defaultMessage={'Play'}
                    description={'Play button'}
                  />
                </p>
                <i className="fas fa-play"></i>
              </button>
              <button id='continueDebugger' className='btn runBtn'>
                <p className='mb-0'>
                  <FormattedMessage
                    defaultMessage={'Continue'}
                    description={'Continue button'}
                  />
                </p>
                <i className="fas fa-play"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ul className="nav nav-tabs border-0" id="blocklyPythonTab" role="tablist">
        <li className="nav-item" role="presentation">
          <a className="nav-link active" id="question-tab" data-toggle="tab" href="#questionBlock" role="tab" aria-controls="code" aria-selected="false">
            {/* <FormattedMessage
            defaultMessage={'Question'}
            description={'Question tab'}
          /> */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" color="#A9ABAC" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.7998 4.80002V19.2C4.7998 19.8365 5.05266 20.447 5.50275 20.8971C5.95284 21.3472 6.56329 21.6 7.1998 21.6H18.5998C18.7589 21.6 18.9115 21.5368 19.0241 21.4243C19.1366 21.3118 19.1998 21.1592 19.1998 21C19.1998 20.8409 19.1366 20.6883 19.0241 20.5758C18.9115 20.4632 18.7589 20.4 18.5998 20.4H7.1998C6.88154 20.4 6.57632 20.2736 6.35128 20.0486C6.12623 19.8235 5.9998 19.5183 5.9998 19.2H17.9998C18.3181 19.2 18.6233 19.0736 18.8483 18.8486C19.0734 18.6235 19.1998 18.3183 19.1998 18V4.80002C19.1998 4.1635 18.9469 3.55306 18.4969 3.10297C18.0468 2.65288 17.4363 2.40002 16.7998 2.40002H7.1998C6.56329 2.40002 5.95284 2.65288 5.50275 3.10297C5.05266 3.55306 4.7998 4.1635 4.7998 4.80002V4.80002ZM16.7998 3.60002C17.1181 3.60002 17.4233 3.72645 17.6483 3.9515C17.8734 4.17654 17.9998 4.48176 17.9998 4.80002V18H5.9998V4.80002C5.9998 4.48176 6.12623 4.17654 6.35128 3.9515C6.57632 3.72645 6.88154 3.60002 7.1998 3.60002H16.7998ZM10.5118 7.69082C10.7398 7.45202 11.1718 7.20002 11.9998 7.20002C12.8278 7.20002 13.2598 7.45322 13.4878 7.69082C13.7278 7.94282 13.7998 8.23802 13.7998 8.40002C13.7998 8.94482 13.4758 9.23762 12.9322 9.50882C12.7967 9.57491 12.6595 9.63733 12.5206 9.69602L12.4942 9.70802C12.367 9.76202 12.2278 9.82202 12.1054 9.88442C11.9551 9.95545 11.8157 10.0476 11.6914 10.158C11.601 10.239 11.5285 10.3379 11.4783 10.4484C11.4281 10.5589 11.4014 10.6787 11.3998 10.8V12C11.3998 12.1592 11.463 12.3118 11.5755 12.4243C11.6881 12.5368 11.8407 12.6 11.9998 12.6C12.1589 12.6 12.3115 12.5368 12.4241 12.4243C12.5366 12.3118 12.5998 12.1592 12.5998 12V10.98L12.6442 10.956C12.7342 10.9104 12.8434 10.8636 12.9838 10.8036L12.997 10.7976C13.1374 10.7364 13.3006 10.6656 13.4674 10.5816C14.1238 10.2576 14.9998 9.65642 14.9998 8.40002C14.9998 7.96202 14.8318 7.35722 14.3518 6.85922C13.8598 6.34802 13.0918 6.00002 11.9998 6.00002C10.9078 6.00002 10.1398 6.34682 9.6478 6.85922C9.1678 7.35722 8.9998 7.96202 8.9998 8.40002C8.9998 8.55915 9.06302 8.71177 9.17554 8.82429C9.28806 8.93681 9.44067 9.00002 9.5998 9.00002C9.75893 9.00002 9.91155 8.93681 10.0241 8.82429C10.1366 8.71177 10.1998 8.55915 10.1998 8.40002C10.1998 8.23802 10.2718 7.94282 10.5118 7.69082ZM11.9998 15.6C12.2385 15.6 12.4674 15.5052 12.6362 15.3364C12.805 15.1676 12.8998 14.9387 12.8998 14.7C12.8998 14.4613 12.805 14.2324 12.6362 14.0636C12.4674 13.8948 12.2385 13.8 11.9998 13.8C11.7611 13.8 11.5322 13.8948 11.3634 14.0636C11.1946 14.2324 11.0998 14.4613 11.0998 14.7C11.0998 14.9387 11.1946 15.1676 11.3634 15.3364C11.5322 15.5052 11.7611 15.6 11.9998 15.6Z"
                fill="currentColor" />
            </svg>
            <p>
              <FormattedMessage
                defaultMessage={'Question'}
                description={'Question tab'}
              />
            </p>
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a className="nav-link" id="turtle-tab" data-toggle="tab" href="#turtleBlock" role="tab" aria-controls="turtle" aria-selected="true">
            <svg width="24" height="24" viewBox="0 0 24 24" color="#A9ABAC" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.64042 5.23C8.53937 5.1458 8.4227 5.08236 8.2971 5.04332C8.1715 5.00427 8.03942 4.99039 7.90845 5.00247C7.77747 5.01454 7.65016 5.05234 7.53381 5.11369C7.41747 5.17504 7.31437 5.25875 7.23042 5.36L2.23042 11.36C2.08334 11.5389 2.00293 11.7634 2.00293 11.995C2.00293 12.2266 2.08334 12.4511 2.23042 12.63L7.06042 18.63C7.15454 18.746 7.27345 18.8395 7.40843 18.9035C7.54341 18.9675 7.69102 19.0005 7.84042 19C8.02965 19.0006 8.21519 18.9476 8.37546 18.847C8.53574 18.7464 8.66418 18.6024 8.74587 18.4317C8.82755 18.261 8.85912 18.0706 8.83692 17.8827C8.81471 17.6947 8.73964 17.517 8.62042 17.37L4.29042 12L8.77042 6.64C8.85462 6.53896 8.91806 6.42229 8.9571 6.29668C8.99615 6.17108 9.01003 6.03901 8.99795 5.90803C8.98588 5.77706 8.94808 5.64975 8.88673 5.5334C8.82538 5.41705 8.74168 5.31395 8.64042 5.23V5.23ZM21.7804 11.37L17.0004 5.37C16.9179 5.26728 16.8159 5.18187 16.7002 5.1187C16.5846 5.05552 16.4576 5.01583 16.3266 5.00189C16.1956 4.98795 16.0631 5.00004 15.9367 5.03747C15.8104 5.07491 15.6927 5.13694 15.5904 5.22C15.4877 5.30253 15.4023 5.40454 15.3391 5.52017C15.2759 5.63581 15.2362 5.76279 15.2223 5.89382C15.2084 6.02485 15.2205 6.15734 15.2579 6.28368C15.2953 6.41002 15.3574 6.52772 15.4404 6.63L19.7104 12L15.2304 17.37C15.1462 17.4711 15.0828 17.5877 15.0437 17.7133C15.0047 17.8389 14.9908 17.971 15.0029 18.102C15.015 18.233 15.0528 18.3603 15.1141 18.4766C15.1755 18.593 15.2592 18.6961 15.3604 18.78C15.5417 18.9255 15.768 19.0033 16.0004 19C16.1473 19.0002 16.2925 18.9681 16.4256 18.9059C16.5587 18.8437 16.6764 18.7529 16.7704 18.64L21.7704 12.64C21.9189 12.4622 22.0011 12.2384 22.0029 12.0068C22.0047 11.7752 21.9261 11.5501 21.7804 11.37V11.37Z"
                fill="currentColor" />
            </svg>
            <p>
              <FormattedMessage
                defaultMessage={'Code'}
                description={'Code tab'}
              />
            </p>
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a className="nav-link" id="output-tab" data-toggle="tab" href="#turtleOutput" role="tab" aria-controls="output" aria-selected="false">
            <div className="runCode" onClick={handleRunCode}>
              <div className="nav-link-container">
                <svg width="24" height="24" viewBox="0 0 24 24" stroke="#A9ABAC" color="#A9ABAC" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 4V20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" />
                  <path d="M20 12L6 20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" />
                  <path d="M20 12L6 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" />
                </svg>
                <p>
                  <FormattedMessage
                    defaultMessage={'Output'}
                    description={'Output tab'}
                  />
                </p>
              </div>
            </div>
            <div className="continueDebugger">
              <div className="nav-link-container">
                <svg width="24" height="24" viewBox="0 0 24 24" stroke="#A9ABAC" color="#A9ABAC" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 4V20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" />
                  <path d="M20 12L6 20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" />
                  <path d="M20 12L6 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" />
                </svg>
                <p>
                  <FormattedMessage
                    defaultMessage={'Continue'}
                    description={'Output tab'}
                  />
                </p>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </>;

const TurtleGameComponent = () => {
  pageInit('turtle-main-container', 'Turtle');

  // const { state: { device } } = useRootPageState();
  let device = 'desktop';
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    device = 'mobile';
  } else {
    device = 'desktop';
  }

  const isPageMounted = React.useRef(true);
  const successModalRef = React.useRef();
  const successModalComponentRef = React.useRef();
  const levelComponentRef = React.useRef();
  const leaderboardComponentRef = React.useRef();
  const awardsNotificationCardRef = React.useRef();

  // const { id } = useParams();
  const turtleParams = useParams();
  const params = turtleParams;
  let [id = undefined, uniqueString = undefined] = params['*'].split('/');
  if (id === '') {
    id = undefined;
  }
  if (uniqueString === '') {
    uniqueString = undefined;
  }

  const {
    state: turtleQuestionState,
    setState: setTurtleQuestionState,
    static: {
      fetchTurtleQuestion, getNextQuestion, loadHints, submitTurtle,
    },
  } = useTurtleFetchQuestion({ isPageMounted, virtualid: id });

  const isAlreadyCompleted = () => turtleQuestionState.submissionDetails
                                  && turtleQuestionState.submissionDetails.completed;

  const { subscriptionData } = React.useContext(SubscriptionContext);

  const gamesLimit = (gameName) => {
    const gamesEnabled = isFeatureEnabled(subscriptionData, 'games', gameName);
    return gamesEnabled.enabled && gamesEnabled[gameName];
  };

  const {
    status, questionObject, validated, validationDetails,
  } = turtleQuestionState;

  const memoizedTurtleQuestionState = React.useMemo(() => turtleQuestionState,
    [turtleQuestionState]);

  const showLevel = () => levelComponentRef.current.show();
  const toggleLeaderboard = () => leaderboardComponentRef.current.toggle();

  const toggleTurtle = (action = 'show' || 'hide') => {
    if (action === 'show') {
      $('.turtle-game-container').slideDown();
      $('.level-navbar').slideDown({
        complete: () => {
          $('.level-navbar').css('display', 'flex');
        },
      });
      $('.game-mob-container').slideDown();
      $('.leaderboard-btn').removeClass('active');
    } else if (action === 'hide') {
      $('.turtle-game-container').slideUp();
      $('.game-mob-container').slideUp({
        complete: () => {
          $('.level-navbar').slideUp();
        },
      });
      $('.leaderboard-btn').addClass('active');
    }
  };

  const reposQnOutContainer = () => {
    repositionTurtle('#expOutCanvas', '.turtle-qnout-container', 'question');
  };

  const reposeOutContainer = () => {
    repositionTurtle('#answerCanvas', '.outputContainer', 'output');
  };

  const handleRunCode = () => {
    let validation;
    runSkulpt()
      .then((resp) => {
        validation = resp.validated;
        setTurtleQuestionState((prevState) => ({
          ...prevState,
          validated: validation,
          screen: 'recognition-screen',
        }));
        $('#loader').show();
        return submitTurtle(resp);
      })
      .then((resp) => {
        $('#loader').hide();
        if (resp === 'access_denied') {
          if (validation) {
            awardsNotificationCardRef.current.show();
            successModalRef.current.show();
          }
        } else {
          const parsedResponse = JSON.parse(resp);
          setTurtleQuestionState((prevState) => ({
            ...prevState,
            validationDetails: {
              ...parsedResponse,
            },
          }));
          if (parsedResponse.status === 'success' && parsedResponse.passed) {
            awardsNotificationCardRef.current.show();
            successModalRef.current.show();
          }
        }
      });
  };

  const handleNextQuestion = () => {
    $('#loader').show();
    getNextQuestion()
      .then(() => {
        $('#loader').hide();
        successModalRef.current.hide();
        awardsNotificationCardRef.current.hide();
      });
  };

  const handleFetchQuestion = (questionId) => {
    $('#loader').show();
    fetchTurtleQuestion({
      type: 'getQuestionById',
      questionId,
    })
      .then(() => {
        $('#loader').hide();
        successModalRef.current.hide();
        awardsNotificationCardRef.current.hide();
      });
  };

  const handleHint = (action = false) => {
    const blocks = window.manager?.workspace?.getAllBlocks();
    const blockTypes = blocks.map((value) => value.type);
    $('#loader').show();
    return loadHints({ blockTypes, action })
      .then(() => {
        $('#loader').hide();
        const isHintShown = $('.hintContainer').hasClass('shown');
        if (!isHintShown) {
          let transform = 10;
          if (device === 'mobile') {
            transform = 75;
          }
          $('.hintContainer').show();
          $('.hintContainer').animate({
            transform,
          }, {
            start: (promise) => {
              for (let i = 0; i < promise.tweens.length; i += 1) {
                const tween = promise.tweens[i];
                if (tween.prop === 'transform') {
                  tween.start = -100;
                }
              }
            },
            step: (now, fx) => {
              if (fx.prop === 'transform') {
                $('.hintContainer').css('transform', `translate(-50%, -${now}%)`);
              }
            },
            complete: () => {
              $('.hintContainer').addClass('shown');
            },
          });
        }
      });
  };

  React.useEffect(() => {
    // let cleanUp = () => {};

    if (id !== undefined && id > gamesLimit('turtle') && !isAlreadyCompleted()) {
      pathNavigator('pricing');
    }

    if (status === 'success') {
      // setTimeout(() => {
      //   repositionTurtle('#answerCanvas', '.outputContainer', 'output');
      //   repositionTurtle('#expOutCanvas', '.turtle-qnout-container', 'question');
      // }, 500);
      if (device === 'desktop') {
        $('#turtle-tab').tab('show');
      } else if (device === 'mobile') {
        $('#question-tab').tab('show');
      }
      startTurtle({ response: turtleQuestionState, page: 'turtle' });
    }
  }, [memoizedTurtleQuestionState.questionObject]);

  React.useEffect(() => {
    isPageMounted.current = true;
    hideDefaultNavBar(device, 'main');
    $('#runCode').hide();
    $('#continueDebugger').hide();

    // if (status === 'success') {
    //   $('#loader').hide();
    //   startTurtle({ response: turtleQuestionState });
    // }
    $('#question-tab').on('shown.bs.tab', reposQnOutContainer);
    $('#output-tab').on('shown.bs.tab', reposeOutContainer);
  }, [status]);

  React.useEffect(() => () => {
    document.querySelector('nav:first-child').style.display = 'block';
    isPageMounted.current = false;
    successModalRef?.current?.hide();
    $('#question-tab').off('shown.bs.tab', reposQnOutContainer);
    $('#output-tab').off('shown.bs.tab', reposeOutContainer);
  }, []);

  return <>
    <GameNavBar
      questionState={memoizedTurtleQuestionState}
      handleHint={handleHint}
      levelBtnHandler={showLevel}
      isGameMainPage={true}
      leaderboardHandler={toggleLeaderboard}
    />
    {
      device === 'desktop'
      && <>
        <div className="turtle-game-container">
          <div className="game-container-block col-4">
            <TurtleQuestionComponent
              status={status}
              questionObject={memoizedTurtleQuestionState.questionObject}
            />
          </div>
          {/* <div className="game-container-block col-3 px-0">
            <div className="turtle-block-container">
              <div className="turtle-blockly-container">
                <p className="turtle-blockly-title">
                  <FormattedMessage
                    defaultMessage={'Add a block'}
                    description={'Add a block title'}
                  />
                </p>
              </div>
              <div id='turtle-toolbox' className="turtle-skeleton-body"></div>
            </div>
          </div> */}
          <div className="game-container-block col-8">
            <TurtlePlayGroundComponent
              handleRunCode={handleRunCode}
              handleDrawingState={toggleDrawingState}
              handleHint={handleHint}
            />
            <HintComponent
              hintDetails={memoizedTurtleQuestionState.hintDetails}
              handleHint={handleHint}
            />
          </div>
        </div>
      </>
    }
    {
      device === 'mobile'
      && <>
        <div className="game-mob-container">
          <TurtleMobComponent
            status={status}
            questionObject={memoizedTurtleQuestionState.questionObject}
            handleDrawingState={toggleDrawingState}
            handleDebugState={toggleDebugState}
            handleRunCode={handleRunCode}
          />
          <HintComponent
            hintDetails={memoizedTurtleQuestionState.hintDetails}
            handleHint={handleHint}
          />
        </div>
      </>
    }
    <Modal
      ref={successModalRef}
      options={'hide'}
      modalClass={'successModal'}
      customClass={'curved'}
      onHidden={() => { successModalComponentRef.current.resetScreen(); }}
      header={<div></div>}>
      <SuccessModalRefComponent
        ref={successModalComponentRef}
        questionObject={questionObject}
        validated={validated}
        uniqueUrl={validationDetails?.profileDetails?.uniqueUrl}
        message={validationDetails?.pointsDetails?.submissionStatus}
        userName={validationDetails?.profileDetails?.name}
        nextHandler={handleNextQuestion}
      />
    </Modal>
    <AwardsNotificationCard ref={awardsNotificationCardRef} />
    <GameLeaderboardComponent
      ref={leaderboardComponentRef}
      game={'turtle'}
      beforeShown={() => { toggleTurtle('hide'); }}
      beforeHidden={() => { toggleTurtle('show'); }} />
    {
      memoizedTurtleQuestionState.status === 'success'
      && <>
        <GameLevelComponent
          game={'turtle'}
          ref={levelComponentRef}
          handleFetchQuestion={handleFetchQuestion}
          gameData={memoizedTurtleQuestionState} />
      </>
    }
    <div id="loader"></div>
  </>;
};

const Turtle = () => {
  const [turtleRoute, setTurtleRoute] = React.useState('turtleHome');
  const changeRoute = (route) => setTurtleRoute(route);

  timeTrack('games/turtle');

  const turtleParams = useParams();
  const params = turtleParams;
  let [id = undefined, uniqueString = undefined] = params['*'].split('/');
  if (id === '') {
    id = undefined;
  }
  if (uniqueString === '') {
    uniqueString = undefined;
  }

  React.useEffect(() => {
    // const locationArray = window.location.pathname.split('/').filter((el) => el !== '');
    // if (locationArray.length > 1) {
    //   changeRoute('turtleGame');
    // }
    if (id !== undefined) {
      if (id === 'challenges') {
        if (uniqueString === undefined) {
          window.location.pathname = '/challenges';
        } else if (uniqueString === 'create') {
          changeRoute('turtleCreateChallenge');
        } else {
          changeRoute('turtleTakeChallenges');
        }
      } else {
        changeRoute('turtleGame');
      }
    }
  }, []);

  return <>
    {
      turtleRoute === 'turtleHome' && <TurtleHomeComponent changeRoute={changeRoute} />
    }
    {
      turtleRoute === 'turtleGame' && <TurtleGameComponent />
    }
    {
      turtleRoute === 'turtleTakeChallenges' && <RouteTakeChallenge />
    }
    {
      turtleRoute === 'turtleCreateChallenge' && <RouteCreateChallenge />
    }
  </>;
};

export default Turtle;
