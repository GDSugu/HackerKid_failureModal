import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import TurtleChallengeNavBar from '../components/TurtleChallengesNavBar';
import { $, pageInit, pathNavigator } from '../framework';
import '../../../stylesheets/common/pages/turtle-challenges/style.scss';
import {
  copyHandler,
  repositionTurtle,
  runSkulpt, startTurtle,
// toggleDebugState,
// toggleDrawingState,
} from '../Functions/turtle';
import { useTakeChallenge } from '../../../../hooks/pages/challenges';
import instructionGenerator from '../../../../shared/turtle/instructionGenerator';
import GameLeaderboardComponent from '../components/GameLeaderboardComponent';
import Modal from '../components/Modal';
import Img from '../components/Img';

const checkIsTakeChallenge = () => {
  const takeChallengeRegex = /turtle\/challenges\/\d/g;
  return takeChallengeRegex.test(window.location.pathname);
};

const compareProps = (prev, next) => {
  let isEqual = true;
  Object.keys(prev).forEach((key) => {
    if (key === 'avatar' || key === 'navigation' || key === 'style') {
      isEqual = isEqual && true;
    } else if (typeof prev[key] === 'function') {
      // use memoized function for passing as props
      isEqual = isEqual && true;
    } else if (key.toLowerCase().includes('ref')) {
      isEqual = true;
    } else {
      isEqual = isEqual && JSON.stringify(prev[key]) === JSON.stringify(next[key]);
    }
  });
  return isEqual;
};

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

const hideDefaultNavBar = () => {
  document.querySelector('nav:first-child').style.display = 'none';
  const componentContainer = 'take-challenge-container';
  // eslint-disable-next-line prefer-arrow-callback
  window.addEventListener('resize', function handler() {
    if (!checkIsTakeChallenge()) {
      this.removeEventListener('resize', handler);
    }
    resizeHandler('nav.game-navbar', componentContainer);
  });
  setTimeout(() => {
    resizeHandler('nav.game-navbar', componentContainer);
  }, 300);
};

const TakeChallangesQuestionComponent = ({ status, challengeObject }) => {
  const source = challengeObject?.sourceCode;
  let instructions = [];
  if (source) {
    instructions = instructionGenerator(source);
  }

  return <>
    <div className="take-challenge-question-container">
      <div className="take-challenge-question-block">
        {
          status === 'success'
          && <>
            <div className="take-challenge-title-block">
              <p className="take-challenge-question-title">
                <FormattedMessage
                  defaultMessage={'{question}'}
                  description={'Question'}
                  values={{ question: challengeObject.challengeName }}
                />
              </p>
            </div>
            <div className="take-challenge-question-content">
            {/* <p className='take-challenge-question'>
              <FormattedMessage
                defaultMessage={'{question}'}
                description={'Question'}
                values={{ question: questionObject.Question }}
              />
            </p> */}
            <div className="take-challenge-question-instructions">
              <p className='take-challenge-question-instructions-title'>
                <FormattedMessage
                  defaultMessage={'Instructions'}
                  description={'Instructions title'}
                />
              </p>
              <ul className=''>
                {
                  typeof instructions === 'object'
                  && instructions.map((step, index) => <li key={index}>
                      <FormattedMessage
                        defaultMessage={'{step}'}
                        description={'take challanges instruction'}
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
      <div className="take-challenge-exoup-block">
        <div className="take-challenge-title-block">
          <p className="take-challenge-question-title">
            <FormattedMessage
              defaultMessage={'Expected output'}
              description={'Expected output title'}
            />
          </p>
        </div>
        <div className="take-challenge-question-content turtle-qnout-container">
            <div id="expOutCanvas"></div>
        </div>
      </div>
    </div>
  </>;
};

const TakeChallangesMobQuestionComponent = ({ status, challengeObject }) => {
  const source = challengeObject.sourceCode;
  let instructions = [];
  if (source) {
    instructions = instructionGenerator(source);
  }

  return <>
    <div className="take-challenge-mob-question-container">
      <div className="take-challenge-mob-question-block">
          {
            status === 'success'
            && <>
            <p className='take-challenge-question-header'>
              <FormattedMessage
                defaultMessage={'{question}'}
                description={'Question'}
                values={{
                  question: challengeObject.challengeName,
                }}
              />
            </p>
            <div className="take-challenge-question-card">
              <div className="take-challenge-question-content">
                {/* <p className="take-challenge-question-title">
                  <FormattedMessage
                    defaultMessage={'{question}'}
                    description={'Question'}
                    values={{
                      question: questionObject.Question,
                    }}
                  />
                </p> */}
                <div className="take-challenge-question-instructions">
                  {/* <p className='take-challenge-question-instructions-title'>
                    <FormattedMessage
                      defaultMessage={'Instructions'}
                      description={'Instructions title'}
                    />
                  </p> */}
                  <ul className='list-unstyled'>
                    {
                      typeof instructions === 'object'
                      && instructions.map((step, index) => <li key={index}>
                          <FormattedMessage
                            defaultMessage={'{step}'}
                            description={'take challenge instruction'}
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
      <div className="take-challenge-mob-output-block">
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
      <div className="take-challenge-mob-hero-btn-block">
        <button type='button' className='btn d-flex align-items-center justify-content-between' onClick={() => { $('#output-tab').tab('show'); }}>
          <p>
            <FormattedMessage
              defaultMessage={'Try now'}
              description={'Continue Playing button'}
            />
          </p>
          <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 30L12.064 35.936C11.4033 36.5965 10.5617 37.0463 9.6454 37.2285C8.72913 37.4107 7.77941 37.3172 6.9163 36.9597C6.0532 36.6022 5.31546 35.9968 4.79637 35.2201C4.27729 34.4434 4.00015 33.5302 4 32.596V30L6.714 16.432C7.07649 14.6184 8.05612 12.9865 9.48623 11.8138C10.9163 10.6412 12.7086 10.0002 14.558 10H33.442C35.2914 10.0002 37.0837 10.6412 38.5138 11.8138C39.9439 12.9865 40.9235 14.6184 41.286 16.432L44 30V32.594C43.9999 33.5282 43.7227 34.4414 43.2036 35.2181C42.6845 35.9948 41.9468 36.6002 41.0837 36.9577C40.2206 37.3152 39.2709 37.4087 38.3546 37.2265C37.4383 37.0443 36.5967 36.5945 35.936 35.934L30 30H18Z" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 10L20 14H28L30 10" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </>;
};

const TakeChallangesPlayGroundComponent = ({ handleRunCode }) => <>
  <div className="take-challenge-editor-container">
    {/* <div className="take-challenge-skeleton-body"> */}
      <div className="take-challenge-editor-title">
        <ul className="nav nav-tabs border-0" id="blocklyPythonTab" role="tablist">
          <li className="nav-item" role="presentation">
            <a className="nav-link active" id="turtle-tab" data-toggle="tab" href="#turtleBlock" role="tab" aria-controls="turtle" aria-selected="true">
              <FormattedMessage
                defaultMessage={'Playground'}
                description={'Playground tab'}
              />
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" id="code-tab" data-toggle="tab" href="#codeBlock" role="tab" aria-controls="code" aria-selected="false">
              <FormattedMessage
                defaultMessage={'Code'}
                description={'Code tab'}
              />
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" id="output-tab" data-toggle="tab" href="#turtleOutput" role="tab" aria-controls="output" aria-selected="false">
              <FormattedMessage
                defaultMessage={'Output'}
                description={'Output tab'}
              />
            </a>
          </li>
        </ul>
        <div className="runBtnContainer">
          <button id='runCode' className='btn runBtn' onClick={() => { handleRunCode(); }}>
            <i className="fas fa-play"></i>
          </button>
        </div>
      </div>
      <div className="tab-content" id="tabsContent">
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

const TakeChallangesMobComponent = ({
  status, handleRunCode = () => {},
  challengeObject = {},
}) => <>
  <div className="take-challenge-mob-game-container">
    <div className="d-none" id="codeBlock"></div>
    <div className="tab-content" id="tabsContent">
      <div className="tab-pane fade show active" id="questionBlock" role="tabpanel" aria-labelledby="questionBlock-tab">
        <MemoizedTakeChallengesMobQuestionComponent
          status={status}
          challengeObject={challengeObject}
        />
      </div>
      <div className="tab-pane fade" id="turtleBlock" role="tabpanel" aria-labelledby="turtleBlock-tab">
        {/* turtle block */}
      </div>
      <div className="tab-pane fade" id="turtleOutput" role="tabpanel" aria-labelledby="turtleOutput-tab">
        <div id="outputSection">
          <div className="drawing-controls">
            <button className="btn btn-light mt-1 repositionDrawing" title="Center">
              <i className="fa fa-crosshairs"></i>
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
              fill="currentColor"/>
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
                <path d="M20 12L6 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor"/>
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
                <path d="M20 12L6 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor"/>
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

const SuccessModalComponent = ({
  questionObject, validated, uniqueUrl, message = false, userName = 'user', backChallengesHandler = () => {},
}, ref) => {
  const [screen, setScreen] = React.useState('recognition-screen');
  const handleScreen = () => setScreen('share-screen');
  const shareUrl = `${window.location.origin}/turtle/submissions/${uniqueUrl}/${questionObject.challengeId}/${questionObject.uniqueString}`;
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
                      src={'games/turtle-success.png'}
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
                          <div className='recognition-btn-container'>
                            <button className='btn btn-outline-primary' onClick={handleScreen}>
                              <FormattedMessage
                                defaultMessage={'Share'}
                                description={'Share button'}
                              />
                            </button>
                            <button className='btn btn-primary' onClick={backChallengesHandler}>
                              <div className="d-flex justify-content-between align-items-center">
                                <FormattedMessage
                                  defaultMessage={'Back to Challenges'}
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
                    {}
                  </div>
            }
            { screen === 'share-screen'
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

const MemoizedTakeChallengesQuestionComponent = memo(TakeChallangesQuestionComponent, compareProps);
const MemoizedTakeChallengesMobQuestionComponent = memo(
  TakeChallangesMobQuestionComponent, compareProps,
);
const MemoizedTakeChallengesPlayGroundComponent = memo(
  TakeChallangesPlayGroundComponent, compareProps,
);
const MemoizedTakeChallengesMobComponent = memo(TakeChallangesMobComponent, compareProps);

const TakeChallenge = () => {
  if (checkIsTakeChallenge()) {
    pageInit('take-challenge-container', 'Take Challenge');
  }

  const isPageMounted = React.useRef(true);
  const leaderboardComponentRef = React.useRef(true);
  const successModalRef = React.useRef(true);
  const successModalComponentRef = React.useRef(true);

  const takeParams = useParams();
  let [page = undefined, id = undefined, uniqueString = undefined] = takeParams['*'].split('/');
  if (page === '') {
    page = undefined;
  }
  if (id === '') {
    id = undefined;
  }
  if (uniqueString === '') {
    uniqueString = undefined;
  }
  id = parseInt(id, 10);

  let device = 'desktop';
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    device = 'mobile';
  } else {
    device = 'desktop';
  }

  const {
    state: takeChallengeState,
    setState: setTakeChallenge,
    static: {
      fetchChallenge,
      submitChallenge,
    },
  } = useTakeChallenge({ isPageMounted });

  const {
    status, challengeObject, questionObject,
    validated, validationDetails,
  } = takeChallengeState;

  const toggleLeaderboard = () => leaderboardComponentRef.current.toggle();

  const toggleChallenges = (action = 'show' || 'hide') => {
    if (action === 'show') {
      $('.take-challenge-game-container').slideDown();
      $('.level-navbar').slideDown({
        complete: () => {
          $('.level-navbar').css('display', 'flex');
        },
      });
      $('.game-mob-container').slideDown();
      $('.leaderboard-btn').removeClass('active');
    } else if (action === 'hide') {
      $('.take-challenge-game-container').slideUp();
      $('.game-mob-container').slideUp({
        complete: () => {
          $('.level-navbar').slideUp();
        },
      });
      $('.leaderboard-btn').addClass('active');
    }
  };

  const reposQnOutContainer = () => {
    console.log('repo qn container');
    repositionTurtle('#expOutCanvas', '.turtle-qnout-container', 'question');
  };

  const reposeOutContainer = () => {
    console.log('repos output container');
    repositionTurtle('#answerCanvas', '.outputContainer', 'output');
  };

  const handleBackToChallenge = () => {
    window.location.pathname = '/challenges';
  };

  const handleRunCode = () => {
    let validation;
    runSkulpt('take-challenge')
      .then((resp) => {
        validation = resp.validated;
        setTakeChallenge((prevState) => ({
          ...prevState,
          validated: validation,
        }));
        $('#loader').show();
        return submitChallenge(resp);
      })
      .then((resp) => {
        $('#loader').hide();
        if (resp === 'access_denied') {
          if (validation) {
            successModalRef.current.show();
          }
        } else {
          const parsedResponse = JSON.parse(resp);
          // setTakeChallenge((prevState) => ({
          //   ...prevState,
          //   validationDetails: {
          //     ...parsedResponse,
          //   },
          // }));
          if (parsedResponse.status === 'success' && parsedResponse.passed) {
            successModalRef.current.show();
          }
        }
      });
  };

  React.useEffect(() => {
    hideDefaultNavBar();
    if (id) {
      fetchChallenge({ challengeId: id, cached: false });
    }

    return () => {
      document.querySelector('nav:first-child').style.display = 'block';
      isPageMounted.current = false;
      successModalRef?.current?.hide();
      $('#question-tab').off('shown.bs.tab', reposQnOutContainer);
      $('#output-tab').off('shown.bs.tab', reposeOutContainer);
    };
  }, []);

  React.useEffect(() => {
    if (status === 'success') {
      $('#question-tab').on('shown.bs.tab', reposQnOutContainer);
      $('#output-tab').on('shown.bs.tab', reposeOutContainer);

      // setTimeout(() => {
      //   repositionTurtle('#answerCanvas', '.outputContainer', 'output');
      //   repositionTurtle('#expOutCanvas', '.turtle-qnout-container', 'question');
      // }, 500);

      const qnObj = {
        // ...prevState.questionObject,
        question_id: challengeObject?.challengeId,
        virtualId: challengeObject?.challengeId,
        Question: challengeObject?.challengeName,
        blockLen: challengeObject?.totalBlocks,
        totalBlocks: challengeObject?.xmlMarkUp,
        img_link: challengeObject?.imagePath,
        snippet: challengeObject?.sourceCode,
        uniqueString: challengeObject?.uniqueString,
        steps: instructionGenerator(challengeObject?.sourceCode),
      };

      setTakeChallenge({
        questionObject: qnObj,
      });
      // setTimeout(() => {
      //   setTakeChallenge((prevState) => ({
      //     ...prevState,
      //     test: 'hello',
      //   }));
      // }, 1000);
    }
  }, [challengeObject]);

  React.useEffect(() => {
    if (typeof questionObject === 'object' && Object.keys(questionObject).length > 1) {
      startTurtle({ response: takeChallengeState, page: 'take-challenge' });
    }
  }, [questionObject]);

  return <>
    <TurtleChallengeNavBar
      title={`Challenge ${id}`}
      leaderBoardHandler={toggleLeaderboard} />
    {
      device === 'desktop'
      && <>
        <div className="take-challenge-game-container">
          <div className="game-container-block col-4">
            {
              status === 'success'
              && <>
                <MemoizedTakeChallengesQuestionComponent
                  status={status}
                  challengeObject={challengeObject}
                />
              </>
            }
          </div>
          {/* <div className="game-container-block col-3 px-0">
            <div className="take-challenge-block-container">
              <div className="take-challenge-blockly-container">
                <p className="take-challenge-blockly-title">
                  <FormattedMessage
                    defaultMessage={'Add a block'}
                    description={'Add a block title'}
                  />
                </p>
              </div>
              <div id='take-challenge-toolbox' className="take-challenge-skeleton-body"></div>
            </div>
          </div> */}
          <div className="game-container-block col-8">
            <MemoizedTakeChallengesPlayGroundComponent
              handleRunCode={handleRunCode}
              // handleDrawingState={toggleDrawingState}
            />
          </div>
        </div>
      </>
    }
    {
      device === 'mobile'
      && <>
      {
        status === 'success'
        && <>
          <div className="game-mob-container">
            <MemoizedTakeChallengesMobComponent
              status={status}
              challengeObject={challengeObject}
              // questionObject={memoizedTakeChallangeQuestionState.questionObject}
              // handleDrawingState={toggleDrawingState}
              // handleDebugState={toggleDebugState}
              handleRunCode={handleRunCode}
            />
          </div>
        </>
      }
      </>
    }
    <GameLeaderboardComponent
      ref={leaderboardComponentRef}
      game={'turtle'}
      beforeShown={() => { toggleChallenges('hide'); }}
      beforeHidden={() => { toggleChallenges('show'); }} />
    <Modal
      ref={successModalRef}
      options={'hide'}
      modalClass={'successModal'}
      customClass={'curved'}
      onHidden={() => { successModalComponentRef.current.resetScreen(); }}
      header={<div></div>}>
        <SuccessModalRefComponent
          ref={successModalComponentRef}
          questionObject={challengeObject}
          validated={validated}
          uniqueUrl={validationDetails?.profileDetails?.uniqueUrl}
          message={validationDetails?.pointsDetails?.submissionStatus}
          userName={validationDetails?.profileDetails?.name}
          backChallengesHandler={handleBackToChallenge}
        />
    </Modal>
  </>;
};

export default TakeChallenge;
