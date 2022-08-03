import React from 'react';
import { FormattedMessage } from 'react-intl';
import '../../../stylesheets/common/pages/turtle/style.scss';
import { $, pageInit } from '../framework';
import Img from '../components/Img';
import TurtleNavBar from '../components/TurtleNavBar';
import Modal from '../components/Modal';
import { useTurtleFetchQuestion } from '../../../../hooks/pages/turtle';
import {
  repositionTurtle, runSkulpt, startTurtle, toggleDrawingState,
} from '../Functions/turtle';

const resizeHandler = (nav = 'nav', selector) => {
  const navHeight = document.querySelector(nav).offsetHeight;
  document.querySelector(selector).style.height = `calc(100vh - ${navHeight}px)`;
};

const TurtleHomeComponent = ({ changeRoute }) => {
  pageInit('turtle-home-container', 'Turtle');

  React.useEffect(() => {
    window.addEventListener('resize', () => resizeHandler('nav:first-child', '.turtle-frame'));
    document.querySelector('nav:first-child').style.display = 'block';
    resizeHandler('nav:first-child', '.turtle-frame');
  }, []);

  return <>
    <div className="turtle-frame">
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
              defaultMessage={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ullam deleniti nobis deserunt, eveniet, architecto incidunt sunt maiores itaque culpa voluptate molestiae pariatur voluptatem laudantium nostrum maxime obcaecati asperiores minima.'}
              description={'Turtle description'}
            />
          </p>
          <button
            className='gameBtn btn'
            // eslint-disable-next-line no-param-reassign
            onClick={() => changeRoute('turtleGame')}>
            <div className="d-flex align-items-center">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 30L12.064 35.936C11.4033 36.5965 10.5617 37.0463 9.6454 37.2285C8.72913 37.4107 7.77941 37.3172 6.9163 36.9597C6.0532 36.6022 5.31546 35.9968 4.79637 35.2201C4.27729 34.4434 4.00015 33.5302 4 32.596V30L6.714 16.432C7.07649 14.6184 8.05612 12.9865 9.48623 11.8138C10.9163 10.6412 12.7086 10.0002 14.558 10H33.442C35.2914 10.0002 37.0837 10.6412 38.5138 11.8138C39.9439 12.9865 40.9235 14.6184 41.286 16.432L44 30V32.594C43.9999 33.5282 43.7227 34.4414 43.2036 35.2181C42.6845 35.9948 41.9468 36.6002 41.0837 36.9577C40.2206 37.3152 39.2709 37.4087 38.3546 37.2265C37.4383 37.0443 36.5967 36.5945 35.936 35.934L30 30H18Z" stroke="#0066AF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 10L20 14H28L30 10" stroke="#0066AF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className='gameBtnDesc'>
              <FormattedMessage
                defaultMessage={'Play Now'}
                description={'Play button'}
              />
            </p>
            </div>
          </button>
        </div>
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
            <a href="" className="btn btn-transparent turtle-action-btn turtle-play-btn">
              <div className="play-btn-container">
                <Img src='../../../../images/games/gamePlay.png' className='play-btn-img' alt='Game Leaderboard' />
                <p>
                  <FormattedMessage
                    defaultMessage={'PLAY'}
                    description={'Play button'}
                  />
                </p>
              </div>
            </a>
            {/* <a href="" className="btn btn-transparent turtle-action-btn turtle-leaderboard-btn">
              <Img src='../../../../images/games/gameLeaderboard.png' alt='Game Leaderboard' />
            </a> */}
          </div>
        </div>
      </div>
    </div>
  </>;
};

const SuccessComponent = ({ questionObject, validated, uniqueUrl }) => {
  const [screen, setScreen] = React.useState('recognition-screen');
  const shareUrl = `${window.location.origin}/turtle/submissions/${uniqueUrl}/${questionObject.question_id}/${questionObject.uniqueString}`;

  const handleScreen = () => setScreen('share-screen');

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
                <div>
                  <h5>
                    <FormattedMessage
                      defaultMessage={'Awesome!'}
                      description={'Success message'}
                    />
                  </h5>
                  <p>
                    <FormattedMessage
                      defaultMessage={'Congratulations {username}, you have cleared {level}'}
                      description={'Success message'}
                      values={{
                        username: 'John',
                        level: 'level - 1',
                      }}
                    />
                  </p>
                </div>
                <div className='d-flex align-items-center justify-content-center'>
                  <button className='btn btn-outline-primary' onClick={handleScreen}>
                    <FormattedMessage
                      defaultMessage={'Share'}
                      description={'Share button'}
                    />
                  </button>
                  <button className='btn btn-primary' onClick={() => {}}>
                    <div className="d-flex justify-content-between align-items-center">
                      <FormattedMessage
                        defaultMessage={'Play next'}
                        description={'Play next button'}
                      />
                      <i className="fas fa-angle-right "></i>
                    </div>
                  </button>
                </div>
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
            <div className="d-flex align-items-center btn-container">
              <div className="form-group mb-0">
                <input type="text" className="form-control" name="shareLink" id="shareLink" value={shareUrl} aria-describedby="helpId" placeholder="share link" readOnly />
              </div>
              <button className='btn btn-outline-primary'>
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

const TurtleGameComponent = () => {
  pageInit('turtle-main-container', 'Turtle');

  const isPageMounted = React.useRef(true);
  const successModalRef = React.useRef();

  const {
    state: turtleQuestionState,
    setState: setTurtleQuestionState,
    static: { submitTurtle },
  } = useTurtleFetchQuestion({ isPageMounted });
  const { status, questionObject, validated } = turtleQuestionState;

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
        return submitTurtle(resp);
      })
      .then((resp) => {
        if (resp === 'access_denied') {
          if (validation) {
            successModalRef.current.show();
          }
        }
      });
  };

  React.useEffect(() => {
    document.querySelector('nav:first-child').style.display = 'none';
    window.addEventListener('resize', () => resizeHandler('nav.turtle-navbar', '.turtle-game-container'));
    setTimeout(() => {
      resizeHandler('nav.turtle-navbar', '.turtle-game-container');
    }, 300);

    if (status === 'success') {
      startTurtle({ response: turtleQuestionState });
    }

    $('#output-tab').on('shown.bs.tab', () => {
      repositionTurtle('#answerCanvas', '.outputContainer');
    });

    // console.log(successModalRef);
    window.modalshow = successModalRef.current.show;

    return () => {
      document.querySelector('nav:first-child').style.display = 'block';
      isPageMounted.current = false;
      successModalRef.current.hide();
    };
  }, [status]);

  return <>
    <TurtleNavBar />
    <div className="turtle-game-container">
      <div className="game-container-block col-4">
        <div className="turtle-question-container">
          <div className="turtle-question-block">
            <div className="turtle-title-block">
              <p className="turtle-question-title">
                <FormattedMessage
                  defaultMessage={'Problem Statement'}
                  description={'Problem statement title'}
                />
              </p>
            </div>
            {
              status === 'success'
              && <div className="turtle-question-content">
              <p className='turtle-question'>
                <FormattedMessage
                  defaultMessage={'{question}'}
                  description={'Question'}
                  values={{ question: questionObject.Question }}
                />
              </p>
              <div className="turtle-question-instructions">
                <p className='turtle-question-instructions-title'>
                  <FormattedMessage
                    defaultMessage={'Instructions'}
                    description={'Instructions title'}
                  />
                </p>
                <ul>
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
        <div className="turtle-editor-container">
          {/* <div className="turtle-skeleton-body"> */}
            <div className="turtle-editor-title">
              <ul className="nav nav-tabs border-0" id="blocklyPythonTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <a className="nav-link active" id="turtle-tab" data-toggle="tab" href="#turtleBlock" role="tab" aria-controls="turtle" aria-selected="true">Playground</a>
                </li>
                <li className="nav-item" role="presentation">
                  <a className="nav-link" id="code-tab" data-toggle="tab" href="#codeBlock" role="tab" aria-controls="code" aria-selected="false">Code</a>
                </li>
                <li className="nav-item" role="presentation">
                  <a className="nav-link" id="output-tab" data-toggle="tab" href="#turtleOutput" role="tab" aria-controls="output" aria-selected="false">Output</a>
                </li>
              </ul>
              <button id='runCode' className='btn runBtn' onClick={handleRunCode}>
                <i className="fas fa-play"></i>
              </button>
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
                    <button className="btn btn-light mt-1 zoom-control zoomIn font-weight-bold" data-zoomaction="in" title="Zoom In" disabled>+</button>
                    <button className="btn btn-light mt-1 zoom-control zoomOut font-weight-bold" data-zoomaction="out" title="Zoom Out" disabled>-</button>
                    <button className="btn btn-light mt-1 repositionDrawing" title="Center">
                      <i className="fa fa-crosshairs"></i>
                    </button>
                    <button className="btn btn-light mt-1 drawingToggle" title="Hide output" onClick={toggleDrawingState}>
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="btn btn-light mt-1 debugToggle" title="Enable debugger">
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
      </div>
    </div>
    <Modal ref={successModalRef} options={'hide'} customClass={'successModal curved'}>
      <SuccessComponent
        questionObject={questionObject}
        validated={validated}
      />
    </Modal>
  </>;
};

const Turtle = () => {
  const [turtleRoute, setTurtleRoute] = React.useState('turtleGame');

  const changeRoute = (route) => setTurtleRoute(route);

  return <>
    {
      turtleRoute === 'turtleHome' && <TurtleHomeComponent changeRoute={changeRoute} />
    }
    {
      turtleRoute === 'turtleGame' && <TurtleGameComponent />
    }
  </>;
};

export default Turtle;
