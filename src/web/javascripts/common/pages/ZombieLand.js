import React from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Phaser from 'phaser';
import md5 from 'crypto-js/md5';
import {
  $, pageInit, pathNavigator, timeTrack,
} from '../framework';
import { useZombieLand } from '../../../../hooks/pages/zombieLand';
import Img from '../components/Img';
import '../../../stylesheets/common/pages/zombieLand/style.scss';
import useRootPageState from '../../../../hooks/pages/root';
import GameNavBar from '../components/GameNavBar';
import GameLeaderboardComponent from '../components/GameLeaderboardComponent';
import GameLevelComponent from '../components/GameLevelComponent';
import Modal from '../components/Modal';
import { startGame, handleRunCode as runcodeAction } from '../../../../shared/zombieLand';

const zlManager = {
  initialCode: '\nawait gameDelay(500);\nend();\n',
};

const resizeHandler = (nav = 'nav', selector) => {
  try {
    const navHeight = document.querySelector(nav)?.offsetHeight;
    const element = document.querySelector(selector);
    if (element && navHeight) {
      element.style.height = `calc(100vh - ${navHeight}px)`;
    }
  } catch (e) {
    console.log(e);
  }
};

const changeMobBg = (transparent = false) => {
  let bg = '';
  if (transparent) {
    bg = 'unset';
  } else {
    bg = '#212527';
  }
  document.querySelector('.zombieLand-main-container #root').style.background = bg;
};

const hideDefaultNavBar = (device, zombieLandState, isPageMounted) => {
  document.querySelector('nav:first-child').style.display = 'none';
  let componentContainer = `.zombieLand-${zombieLandState}-container`;
  if (device === 'mobile') {
    componentContainer = `.zombieLand-mob-${zombieLandState}-container`;
  }
  // eslint-disable-next-line prefer-arrow-callback
  window.addEventListener('resize', function handler() {
    resizeHandler('nav.game-navbar', componentContainer);

    if (isPageMounted && !isPageMounted.current) {
      this.removeEventListener('resize', handler);
    }
  });
  setTimeout(() => {
    resizeHandler('nav.game-navbar', componentContainer);
  }, 300);
};

const ZombieLandHomeComponent = ({ changeRoute = () => {} }) => {
  pageInit('zombieLand-home-container', 'ZombieLand');

  const listerResizeFrame = () => resizeHandler('nav', '.zombieLand-frame');

  React.useEffect(() => {
    window.addEventListener('resize', listerResizeFrame);

    const resizeTimeout = setTimeout(() => {
      resizeHandler('nav', '.zombieLand-frame');
    }, 300);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', listerResizeFrame);
    };
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
            <button
              className="btn btn-transparent zl-action-btn zl-play-btn"
              onClick={() => changeRoute('zombieLandGame')}>
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

const ZombieLandQuestionComponent = ({ status, questionObject }) => <>
  <div className="zombieLand-question-container">
    <div className="zombieLand-question-block">
      {
        status === 'success'
        && <>
          <div className="zombieLand-title-block">
            <p className="zombieLand-question-title">
              <FormattedMessage
                defaultMessage={'Problem Statement'}
                description={'problem statement title'}
              />
            </p>
          </div>
          <div className="zombieLand-question-content">
            <div className="zombieLand-question">
              <p>
                <FormattedMessage
                  defaultMessage={'{question}'}
                  description={'Question'}
                  values={{ question: questionObject.qname }}
                />
              </p>
            </div>
            <div className="zombieLand-question-instructions">
              <ol>
                {
                  questionObject.q_instruction.map((step, index) => <li key={index}>
                    <p className='zl-instruction'>
                      <FormattedMessage
                        defaultMessage={'{step}'}
                        description={'zombieLand instruction'}
                        values={{
                          step: (step[step.length - 1] === '.') ? step.slice(0, -1) : step,
                        }}
                      />
                    </p>
                  </li>)
                }
              </ol>
            </div>
            <div id="zombieLand-image-preview" className="zombieLand-image-preview"></div>
          </div>
        </>
      }
    </div>
  </div>
</>;

const ZombieLandMobQuestionComponent = ({ status, questionObject }) => <>
  <div className="zombieLand-mob-question-container">
    <div className="zombieLand-mob-question-block">
      {
        status === 'success'
        && <>
          <p className="zombieLand-question-header">
            <FormattedMessage
              defaultMessage={'{question}'}
              description={'Question'}
              values={{
                question: questionObject.qname,
              }}
            />
          </p>
          <div className="zombieLand-question-card">
            <div className="zombieLand-question-content">
              <div className="zombieLand-question-instructions">
                <ul>
                  {
                    questionObject.q_instruction.map((step, index) => <li key={index}>
                      <p className="zl-instruction">
                        <FormattedMessage
                          defaultMessage={'{step}'}
                          description={'zombieLand instruction'}
                          values={{
                            step: (step[step.length - 1] === '.') ? step.slice(0, -1) : step,
                          }}
                        />
                      </p>
                    </li>)
                  }
                </ul>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  </div>
</>;

const ZombieLandPlayGroundComponent = ({
  handleRunCode = () => {},
  handleHint = () => {},
}) => <>
<div className="ui-droppable zombieLand-editor-container">
  <div className="zombieLand-editor-title">
    <ul className="nav nav-tabs border-0" id="zombieLandOutputTab" role="tablist">
      <li className="nav-item" role="presentation">
        <a href="#zombieLandBlock" id="zombieLandBlock-tab" className="nav-link active" data-toggle="tab" role="tab" aria-controls="zombieLand" aria-selected="true">
          <FormattedMessage
            defaultMessage={'Playground'}
            description={'Playground tab'}
          />
        </a>
      </li>
      <li className="nav-item" role="presentation">
        <a href="#zombieLandOutput" id="zombieLandOutput-tab" className="nav-link" data-toggle="tab" role="tab" aria-controls="zombieLand" aria-selected="true">
          <FormattedMessage
            defaultMessage={'Output'}
            description={'Output tab'}
          />
        </a>
      </li>
    </ul>
    <div className="runBtnContainer">
      <button id="runCode" className="btn runBtn" onClick={handleRunCode}>
        <i className="fas fa-play"></i>
      </button>
    </div>
  </div>
  <div className="tab-content" id="tabsContent">
    <div className="hintBtnContainer">
      <button className="hintBtn btn btn-transparent" onClick={handleHint}>
        <svg width="20" height="27" viewBox="0 0 20 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.384 22.664L13.9973 24.3427C13.853 24.9647 13.514 25.5245 13.0296 25.9405C12.5452 26.3566 11.9407 26.6072 11.304 26.656L11.0733 26.6653H8.25867C7.6198 26.6653 6.99761 26.4614 6.48271 26.0832C5.96781 25.705 5.58709 25.1723 5.396 24.5627L5.33467 24.34L4.948 22.664H14.384ZM9.66667 0C12.2304 0 14.6892 1.01845 16.502 2.8313C18.3149 4.64415 19.3333 7.10291 19.3333 9.66667C19.3333 12.5147 18.0853 15.124 15.6467 17.4533C15.5995 17.4984 15.5666 17.5564 15.552 17.62L14.848 20.664H4.48533L3.784 17.62C3.7692 17.5569 3.7363 17.4994 3.68933 17.4547C1.24933 15.124 0 12.5147 0 9.66533C0.00035359 7.1018 1.01896 4.64339 2.83177 2.83083C4.64459 1.01827 7.10314 -2.43855e-08 9.66667 0Z"
            fill="#ffffff"/>
        </svg>
      </button>
    </div>
    <div id="zombieLandBlock" className="tab-pane fade show active" role="tabpanel" aria-labelledby="zombieLandBlock-tab">
      <div id="playground"></div>
    </div>
    <div id="zombieLandOutput" className="tab-pane fade" role="tabpanel" aria-labelledby="zombieLandOutput-tab">
      <div id="outputContainer" className="sectionContent outputContainer d-flex">
        <div id="userCanvas"></div>
      </div>
    </div>
  </div>
</div>
</>;

const ZombieLandMobComponent = ({
  status, questionObject, handleRunCode = () => {},
}) => <>
  <div className="zombieLand-mob-game-container">
    <div className="tab-content" id="tabsContent">
      <div className="tab-pane fade show active" id="questionBlock" role="tabpane1" aria-labelledby="questionBlock-tab">
        <ZombieLandMobQuestionComponent
          status={status}
          questionObject={questionObject}
        />
      </div>
      <div className="tab-pane fade" id='zombieLandBlock' role="tabpane1" aria-labelledby="zombieLandBlock-tab">
        <a className="toolboxCollapse" data-toggle="collapse" href="#zl-toolbox" aria-expanded="false" aria-controls="zl-toolbox">
          <div className="d-flex justify-content-between align-items-center">
            <p>
              <FormattedMessage
                defaultMessage={'Add a block'}
                description={'Add a block'}
              />
            </p>
            <i className="fa fa-angle-down" aria-hidden="true"></i>
          </div>
        </a>
        <div className="collapse" id="zl-toolbox">
          <div className="zombieLand-toolbox">
            <div className="statement-container">
              <div className="commandBlocks">
                <div className="code-blk popup" draggable="true" data-id="for_loop">
                  <p className="loop">
                    <span className="tokens">
                      <span className="ellipsis-span">
                        <i className="fas fa-ellipsis-v"></i>
                        <i className="fas fa-ellipsis-v"></i>
                      </span>
                      <FormattedMessage
                        defaultMessage={'for'}
                        description={'for loop'}
                      />
                    </span> <span className="expression">
                      <FormattedMessage
                        defaultMessage={'i'}
                        description={'i'}
                      />
                    </span> <span className='tokens'>
                      <FormattedMessage
                        defaultMessage={'in'}
                        description={'in'}
                      />
                    </span> <span className="expression">
                      <FormattedMessage
                        defaultMessage={'range'}
                        description={'range'}
                      />
                    </span>
                    {/* <span className="expression">
                      <FormattedMessage
                        defaultMessage={'i'}
                        description={'i'}
                      />
                    </span>
                    <span className="tokens">
                      <FormattedMessage
                        defaultMessage={' in'}
                        description={'in'}
                      />
                    </span>
                    <span className="expression">
                      <FormattedMessage
                        defaultMessage={'range'}
                        description={'range'}
                      />
                    </span> */}
                    {'('}
                    <input className="blockInput" placeholder="int" />
                    {'):'}
                  </p>
                </div>
                <div className="code-blk object move" draggable="true" data-id="sleep()">
                  <p>
                    <span className="ellipsis-span">
                        <i className="fas fa-ellipsis-v"></i>
                        <i className="fas fa-ellipsis-v"></i>
                      </span>
                    <span className="expression functions">
                        <FormattedMessage
                          defaultMessage={'sleep'}
                          description={'sleep function'}
                        />
                    </span>()
                  </p>
                </div>
                <div className="d-block">
                  <div className="code-blk object move" draggable="true" data-id="moveUp()">
                    <p>
                      <span className="ellipsis-span">
                        <i className="fas fa-ellipsis-v"></i>
                        <i className="fas fa-ellipsis-v"></i>
                      </span>
                      <span className="expression functions">
                        <FormattedMessage
                          defaultMessage={'moveUp'}
                          description={'moveUp function'}
                        />
                      </span>()
                    </p>
                  </div>
                </div>
                <div className="code-blk object move" draggable="true" data-id="moveLeft()">
                  <p>
                    <span className="ellipsis-span">
                      <i className="fas fa-ellipsis-v"></i>
                      <i className="fas fa-ellipsis-v"></i>
                    </span>
                    <span className="expression functions">
                      <FormattedMessage
                        defaultMessage={'moveLeft'}
                        description={'moveLeft function'}
                      />
                    </span>()
                  </p>
                </div>
                <div className="code-blk object move" draggable="true" data-id="moveDown()">
                  <p>
                    <span className="ellipsis-span">
                      <i className="fas fa-ellipsis-v"></i>
                      <i className="fas fa-ellipsis-v"></i>
                    </span>
                    <span className="expression functions">
                      <FormattedMessage
                        defaultMessage={'moveDown'}
                        description={'moveDown function'}
                      />
                    </span>()
                  </p>
                </div>
                <div className="code-blk object move" draggable="true" data-id="moveRight()">
                  <p>
                    <span className="ellipsis-span">
                      <i className="fas fa-ellipsis-v"></i>
                      <i className="fas fa-ellipsis-v"></i>
                    </span>
                    <span className="expression functions">
                      <FormattedMessage
                        defaultMessage={'moveRight'}
                        description={'moveRight function'}
                      />
                    </span>()
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="playground"></div>
        <div className="w-100 dustbin-mob mb-5 pb-5 d-flex justify-content-end pr-3">
          {/* <Img
            className="dustbin"
            style={{ width: '100px', height: '100px' }}
            src={'zombieLand/assets/delete-24px.svg'}
          /> */}
          <img
            src="/images/zombieLand/assets/delete-24px.svg"
            className='dustbin'
            alt="Dustbin"
            width='100px'
            height='100px'/>
        </div>
      </div>
      <div className="tab-pane fade" id='zombieLandOutput' role="tabpane1" aria-labelledby="zombieLandOutput-tab">
        <div id="outputContainer" className="sectionContent outputContainer d-flex">
          <div id="userCanvas"></div>
        </div>
      </div>
    </div>
    <ul className="nav nav-tabs border-0" id="zombieLandTab" role="tablist">
      <li onClick={() => changeMobBg(true)} className="nav-item" role="presentation">
        <a href="#questionBlock" className="nav-link active" data-toggle="tab" role="tab" aria-selected="false" aria-controls="question">
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
      <li onClick={() => changeMobBg(false)} className="nav-item" role="presentation">
        <a href="#zombieLandBlock" id='zombieLandBlock-tab' className="nav-link" data-toggle="tab" role="tab" aria-selected="false" aria-controls="code">
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
      <li onClick={() => { changeMobBg(false); handleRunCode(); }} className="nav-item" role="presentation">
        <a href="#zombieLandOutput" id='zombieLandOutput-tab' className="nav-link" data-toggle="tab" role="tab" aria-selected="false" aria-controls="output">
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
        </a>
      </li>
    </ul>
  </div>
</>;

const SuccessModalComponent = ({
  validated, message = false, nextHandler = () => {}, qid = 0,
}) => {
  const handleRegister = () => pathNavigator('register');

  return <>
    {
      validated
      && <>
        <div className='success-modal-content'>
          <div className='recognition-content'>
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
                          // message: message.replace('{{name}}', userName),
                          message,
                        }}
                      />
                    </p>
                    <div className='d-flex align-items-center justify-content-center'>
                      <button className='btn btn-primary' onClick={nextHandler}>
                        {
                          qid === 10
                          && <>
                            <p className="my-0">
                              <FormattedMessage
                                defaultMessage={'Close'}
                                description={'success modal closed'}
                              />
                            </p>
                          </>
                        }
                        {
                          qid !== 10
                          && <>
                            <div className="d-flex justify-content-between align-items-center">
                              <FormattedMessage
                                defaultMessage={'Play next'}
                                description={'Play next button'}
                              />
                              <i className="fas fa-angle-right "></i>
                            </div>
                          </>
                        }
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
          </div>
        </div>
      </>
    }
  </>;
};

const FailureModalComponent = ({
  message = '', handleModalClose = () => {},
}) => <>
    <div className='failure-modal-content'>
      <div className='recognition-content'>
        <Img
          src={'../../../../images/games/turtle-success.png'}
          className={'failure-img'}
        />
        <div className='col-10 mx-auto'>
          {
            (!message || message === '')
              ? <>
                <h5>
                  <FormattedMessage
                    defaultMessage={'Oh ho ho.. failed'}
                    description={'Failure message'}
                  />
                </h5>
                <div className='d-flex align-items-center justify-content-center'>
                  <button className='btn btn-primary' onClick={handleModalClose}>
                    <div className="d-flex justify-content-between align-items-center">
                      <FormattedMessage
                        defaultMessage={'Try again'}
                        description={'Try again button'}
                      />
                    </div>
                  </button>
                </div>
              </>
              : <>
                <p>
                  <FormattedMessage
                // defaultMessage={'Congratulations {username}, you have cleared {level}'}
                    defaultMessage={'{message}'}
                    description={'Failure message'}
                    values={{
                      // username: 'John',
                      // level: 'level - 1',
                      // message: message.replace('{{name}}', userName),
                      message,
                    }}
                  />
                </p>
                <div className='d-flex align-items-center justify-content-center'>
                  <button className='btn btn-primary' onClick={handleModalClose}>
                    <div className="d-flex justify-content-between align-items-center">
                      <FormattedMessage
                        defaultMessage={'Try again'}
                        description={'Try again button'}
                      />
                    </div>
                  </button>
                </div>
              </>
          }
            {/* {
              message
              && <>
              </>
            } */}
        </div>
      </div>
    </div>
  </>;

const HintContent = ({ hint: hintItem }) => <>
  {
    hintItem.picture
    && <>
    <div className="hint-img-container">
      <img
        src={hintItem.picture.replace(/zombieland/g, 'zombieLand/assets')}
        alt="Instruction picture"
        className='instruction-picture'
        />
    </div>
    </>
  }
  {
    hintItem.hints && hintItem.hints.length > 0
    && <>
      <div className="instruction-title">
        <p>
          <FormattedMessage
            defaultMessage={'Instructions'}
            description={'Hints'}
          />
        </p>
      </div>
      <div className="instruction-list">
        <ul>
          {
            hintItem.hints.map((hint, index) => <li key={index}>
              <p>
                <FormattedMessage
                  defaultMessage={'{hint}'}
                  description={'Hint'}
                  values={{
                    hint,
                  }}
                />
              </p>
            </li>)
          }
        </ul>
      </div>
    </>
  }
</>;

const HintComponent = ({ hints }) => {
  const [hintIdx, setHintIdx] = React.useState(0);
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
    const { action } = srcElement.dataset;
    if (action === 'prev' && hintIdx > 0) {
      setHintIdx((prev) => prev - 1);
    } else if (action === 'next' && hintIdx < Object.keys(hints).length - 1) {
      setHintIdx((prev) => prev + 1);
    }
  };

  React.useEffect(() => {
    hideHintContainer();
  }, []);

  return <>
    <div className="hintContainer">
      <button type='button' className='close hideHint' aria-label='Close' onClick={hideHintContainer}>
        <span aria-hidden="true">&times;</span>
      </button>
      {
        hints
        && <>
          {/* <p id='currentHint'>
            <FormattedMessage
              defaultMessage={'{hintMessage}'}
              description={'Hint message'}
              values={{
                hintMessage: hints[hintIdxRef.current],
              }}
            />
          </p> */}
          <HintContent
            hint={hints[hintIdx]}
          />
          <div className="d-flex justify-content-between hintAction">
            <button type='button' className={`btn btn-transparent navigateHint ${hintIdx <= 0 && 'disabled'}`} data-action='prev' onClick={navigateHint}>
              <i className="fas fa-angle-left"></i>
            </button>
            <button type='button' className={`btn btn-transparent navigateHint ${hintIdx >= Object.keys(hints).length - 1 && 'disabled'}`} data-action='next' onClick={navigateHint}>
              <i className="fas fa-angle-right"></i>
            </button>
          </div>
        </>
      }
    </div>
  </>;
};

// const compareProps = (prev, next) => {
//   let isEqual = false;
//   Object.keys(prev).forEach((key) => {
//     isEqual = isEqual && JSON.stringify(prev[key]) === JSON.stringify(next[key]);
//   });
// };

const ZombieLandGameComponent = ({ zlState, zlSetState, zlStatic }) => {
  pageInit('zombieLand-main-container', 'ZombieLand');

  const { state: { device } } = useRootPageState();

  const successModalRef = React.useRef();
  const failureModalRef = React.useRef();
  const levelComponentRef = React.useRef();
  const leaderboardComponentRef = React.useRef();
  const { id } = useParams();
  let GameObj = {};

  const { status } = zlState;

  const memoizedZlQnState = React.useMemo(() => zlState, [zlState]);

  const showLevel = () => levelComponentRef.current.show();
  const toggleLeaderboard = () => leaderboardComponentRef.current.toggle();

  const toggleZl = (action = 'show' || 'hide') => {
    if (action === 'show') {
      $('.zombieLand-game-container').slideDown();
      $('.level-navbar').slideDown({
        complete: () => {
          $('.level-navbar').css('display', 'flex');
        },
      });
      $('.game-mob-container').slideDown();
      $('.leaderboard-btn').removeClass('active');
    } else if (action === 'hide') {
      $('.zombieLand-game-container').slideUp();
      $('.game-mob-container').slideUp({
        complete: () => {
          $('.level-navbar').slideUp();
        },
      });
      $('.leaderboard-btn').addClass('active');
    }
  };

  const setFailureModalState = (state) => {
    zlSetState((prev) => ({
      ...prev,
      uiData: {
        ...prev.uiData,
        isFailureModalOpen: state,
      },
    }));
  };

  const showFailureModal = (msg) => {
    if (zlState.uiData.isFailureModalOpen === false) {
      zlSetState((prevState) => ({
        ...prevState,
        uiData: {
          ...prevState.uiData,
          zlErrorMsg: msg,
          isFailureModalOpen: true,
        },
      }));
      GameObj?.gameData?.scene?.pause();
      failureModalRef.current.showWithRestriction();
      // setFailureModalState(true);
    }
  };

  // const handleGamePopup = (msg) => {
  //   showFailureModal(msg);
  // };

  const handleRunCode = () => {
    $('#zombieLandOutput-tab').tab('show');
    runcodeAction();
  };

  const handleHint = () => {
    const isHintShown = $('.hintContainer').hasClass('shown');
    if (!isHintShown) {
      let transform = 2;
      if (device === 'mobile') {
        transform = 16;
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
  };

  const handleFetchQuestion = (questionId) => {
    $('#loader').show();
    // GameObj?.gameData?.gameObject?.destroy(true);
    zlStatic.fetchZombieLandQuestion({
      virtualId: Number(questionId),
    })
      .then(() => {
        $('#loader').hide();
        successModalRef.current.hide();
      });
  };

  const handleNextQuestion = () => {
    const currentQuestionId = zlState.questionObject.virtualId;
    if (currentQuestionId < 10) {
      $('#loader').show();
      const nextVId = currentQuestionId + 1;
      handleFetchQuestion(nextVId);
    } else if (currentQuestionId === 10) {
      successModalRef.current.hide();
    }
  };

  const endGame = (validated, sourceCode) => {
    if (zlManager?.initialCode === sourceCode) {
      return;
    }
    $('#runCode').prop('disabled', false);
    $('#resetBtn').prop('disabled', false);
    const request = {
      type: 'validateZombieQuestion',
      sourceCode,
      questionId: parseInt(zlState.questionObject.qid, 10),
      xmlWorkSpace: '',
      validated,
    };

    $('#loader').show();
    let reqString = '';
    Object.keys(request).forEach((index) => {
      reqString += request[index];
    });
    const reqHash = md5(reqString + md5(reqString).toString()).toString();
    request.requestHash = reqHash;

    zlStatic.submitZombieLandQuestion(request)
      .then(() => {
        $('#loader').hide();
      //   if (response === 'access_denied') {
      //     if (validated) {
      //       successModalRef.current.show();
      //     }
      //   } else if (zlState.responseObject.status === 'success' && validated) {
      //     successModalRef.current.show();
      //   }
      });
  };

  React.useEffect(() => {
    // if (zlState.responseObject.status === 'access_denied') {
    //   if (zlState.responseObject.passed) {
    //     successModalRef.current.show();
    //   }
    // } else if (zlState.responseObject.status === 'success' && zlState.responseObject.passed) {
    //   successModalRef.current.show();
    // }
    if (zlState.responseObject.status === 'access_denied') {
      showFailureModal();
    } else if (zlState.responseObject.status === 'success') {
      if (zlState.responseObject.passed) {
        successModalRef.current.show();
      } else {
        showFailureModal('Sorry, you have not completed this problem... Try checking hints!');
      }
    }
  }, [zlState.responseObject]);

  React.useEffect(() => {
    if (status === 'success') {
      setTimeout(() => {
        GameObj = startGame(memoizedZlQnState, device, Phaser, 'zombieLandBlock', 'userCanvas', 'zombieLand-image-preview', endGame, showFailureModal.bind(this));
      }, 300);
    }
  }, [memoizedZlQnState.questionObject]);

  // React.useEffect(() => {
  //   hideDefaultNavBar(device, 'game');
  //   zlStatic.fetchZombieLandQuestion({
  //     virtualId: Number(id) || null,
  //   });

  //   return () => {
  //     document.querySelector('nav:first-child').style.display = 'block';
  //   };
  // }, [memoizedZlQnState.status]);
  React.useEffect(() => {
    hideDefaultNavBar(device, 'game');
    zlStatic.fetchZombieLandQuestion({
      virtualId: Number(id) || null,
    });

    return () => {
      document.querySelector('nav:first-child').style.display = 'block';
      document.querySelector('#root').style.background = 'unset';
    };
  }, []);

  return <>
    <GameNavBar
      questionState={zlState}
      handleHint={handleHint}
      levelBtnHandler={showLevel}
      isGameMainPage={true}
      leaderboardHandler={toggleLeaderboard}
    />
    {
      device === 'desktop'
      && <>
        <div className="zombieLand-game-container">
          <div className="game-container-block col-3">
            <ZombieLandQuestionComponent
              status={status}
              questionObject={memoizedZlQnState.questionObject}
            />
          </div>
          <div className="game-container-block zl-code-blks col-3 px-0">
            <div className="zombieLand-block-container">
              <div className="zombieLand-codeblocks-container">
                <p className="zombieLand-codeblocks-title">
                  <FormattedMessage
                    defaultMessage={'Add a block'}
                    description={'Add a block title'}
                  />
                </p>
              </div>
              <div className="zombieLand-toolbox">
                <div className="statement-container">
                  <div className="commandBlocks">
                    <div className="code-blk object move" draggable="true" data-id="moveUp()">
                      <p>
                        <span className='edit-span'>
                          <Img
                            local={true}
                            src={'images/zombieLand/assets/editBlock.png'}
                            alt={'edit block'}
                            className={'edit'}
                          />
                        </span>
                        <span className="ellipsis-span">
                          <i className="fas fa-ellipsis-v"></i>
                          <i className="fas fa-ellipsis-v"></i>
                        </span>
                        <span className="expression functions">moveUp</span>()
                      </p>
                    </div>
                    <div className="code-blk object move" draggable="true" data-id="moveDown()">
                      <p>
                        <span className='edit-span'>
                          <Img
                            local={true}
                            src={'images/zombieLand/assets/editBlock.png'}
                            alt={'edit block'}
                            className={'edit'}
                          />
                        </span>
                        <span className="ellipsis-span">
                          <i className="fas fa-ellipsis-v"></i>
                          <i className="fas fa-ellipsis-v"></i>
                        </span>
                        <span className="expression functions">
                          <FormattedMessage
                            defaultMessage={'moveDown'}
                            description={'moveDown function'}
                          />
                        </span>()
                      </p>
                    </div>
                    <div className="code-blk object move" draggable="true" data-id="moveLeft()">
                      <p>
                        <span className='edit-span'>
                          <Img
                            local={true}
                            src={'images/zombieLand/assets/editBlock.png'}
                            alt={'edit block'}
                            className={'edit'}
                          />
                        </span>
                        <span className="ellipsis-span">
                          <i className="fas fa-ellipsis-v"></i>
                          <i className="fas fa-ellipsis-v"></i>
                        </span>
                        <span className="expression functions">
                          <FormattedMessage
                            defaultMessage={'moveLeft'}
                            description={'moveLeft function'}
                          />
                        </span>()
                      </p>
                    </div>
                    <div className="code-blk object move" draggable="true" data-id="moveRight()">
                      <p>
                        <span className='edit-span'>
                          <Img
                            local={true}
                            src={'images/zombieLand/assets/editBlock.png'}
                            alt={'edit block'}
                            className={'edit'}
                          />
                        </span>
                        <span className="ellipsis-span">
                          <i className="fas fa-ellipsis-v"></i>
                          <i className="fas fa-ellipsis-v"></i>
                        </span>
                        <span className="expression functions">
                          <FormattedMessage
                            defaultMessage={'moveRight'}
                            description={'moveRight function'}
                          />
                        </span>()
                      </p>
                    </div>
                    <div className="code-blk object move" draggable="true" data-id="sleep()">
                      <p>
                        <span className='edit-span'>
                          <Img
                            local={true}
                            src={'images/zombieLand/assets/editBlock.png'}
                            alt={'edit block'}
                            className={'edit'}
                          />
                        </span>
                        <span className="ellipsis-span">
                          <i className="fas fa-ellipsis-v"></i>
                          <i className="fas fa-ellipsis-v"></i>
                        </span>
                        <span className="expression functions">
                            <FormattedMessage
                              defaultMessage={'sleep'}
                              description={'sleep function'}
                            />
                        </span>()
                      </p>
                    </div>
                    <div className="code-blk popup" draggable="true" data-id="for_loop">
                      <p className="loop">
                        <span className="tokens">
                          <span className="edit-span">
                            <Img
                              local={true}
                              src={'images/zombieLand/assets/editBlock.png'}
                              className={'toolbar edit'}
                            />
                          </span>
                          <span className="ellipsis-span">
                            <i className="fas fa-ellipsis-v"></i>
                            <i className="fas fa-ellipsis-v"></i>
                          </span>
                          <FormattedMessage
                            defaultMessage={'for'}
                            description={'for loop'}
                          />
                        </span> <span className="expression">
                          <FormattedMessage
                            defaultMessage={'i'}
                            description={'i'}
                          />
                        </span> <span className='tokens'>
                          <FormattedMessage
                            defaultMessage={'in'}
                            description={'in'}
                          />
                        </span> <span className="expression">
                          <FormattedMessage
                            defaultMessage={'range'}
                            description={'range'}
                          />
                        </span>
                        {/* <span className="expression">
                          <FormattedMessage
                            defaultMessage={'i'}
                            description={'i'}
                          />
                        </span>
                        <span className="tokens">
                          <FormattedMessage
                            defaultMessage={' in'}
                            description={'in'}
                          />
                        </span>
                        <span className="expression">
                          <FormattedMessage
                            defaultMessage={'range'}
                            description={'range'}
                          />
                        </span> */}
                        {'('}
                        <input className="blockInput" placeholder="int" />
                        {'):'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="game-container-block col-6">
            <ZombieLandPlayGroundComponent
              handleHint={handleHint}
              handleRunCode={handleRunCode}
            />
            <HintComponent
              hints={memoizedZlQnState.questionObject.hints}
            />
          </div>
        </div>
      </>
    }
    {
      device === 'mobile'
      && <>
        <div className="game-mob-container">
          <ZombieLandMobComponent
            status={status}
            questionObject={memoizedZlQnState.questionObject}
            handleRunCode={handleRunCode}
          />
          <HintComponent
            hints={memoizedZlQnState.questionObject.hints}
          />
        </div>
      </>
    }
    {
      memoizedZlQnState.status === 'success'
      && <>
        <GameLevelComponent
          game={'zombieLand'}
          ref={levelComponentRef}
          handleFetchQuestion={handleFetchQuestion}
          gameData={memoizedZlQnState}
        />
      </>
    }
    <GameLeaderboardComponent
      ref={leaderboardComponentRef}
      game={'zombieLand'}
      beforeShown={() => toggleZl('hide')}
      beforeHidden={() => toggleZl('show')}
    />
    <Modal
      ref={successModalRef}
      options={'hide'}
      modalClass={'successZLModal'}
      customClass={'curved'}
      header={<div></div>}
      >
        <SuccessModalComponent
          validated={zlState?.responseObject?.passed}
          message={zlState?.responseObject?.successMessage}
          userName={zlState?.responseObject?.pointsDetails?.userName}
          nextHandler={handleNextQuestion}
          qid={zlState?.questionObject?.virtualId}
        />
    </Modal>
    <Modal
      ref={failureModalRef}
      options={'hide'}
      modalClass={'errorZLModal'}
      customClass={'curved'}
      header={<div></div>}
      onHidden={() => {
        setFailureModalState(false);
      }}
      >
        <FailureModalComponent
          message={zlState.uiData.zlErrorMsg}
          handleModalClose={() => {
            failureModalRef.current?.hide();
          }}
        />
    </Modal>
    <div id="loader"></div>
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
  timeTrack('games/zombieLand');
  React.useEffect(() => {
    const locationArray = window.location.href.split('/').filter((el) => el !== '');
    if (locationArray.length > 3) {
      changeRoute('zombieLandGame');
    }

    return () => {
      isPageMounted.current = false;
    };
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
