import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import {
  $, isFeatureEnabled, pageInit, pathNavigator, timeTrack,
} from '../framework';
import useRootPageState, { SubscriptionContext } from '../../../../hooks/pages/root';
import { useWebkataFetchQuestion, useWebkataSubmitQuestion } from '../../../../hooks/pages/webkata';
import '../../../stylesheets/common/pages/webkata/style.scss';
import Img from '../components/Img';
import WebkataLevelComponent from '../components/WebkataLevelComponent';
import WebkataNavBar from '../components/WebkataNavBar';
// import GameNavBar from '../components/GameNavBar';
import GameLeaderboardComponent from '../components/GameLeaderboardComponent';
import Modal from '../components/Modal';
import CodeEditor from '../components/CodeEditor';
import {
  getCurrentEditorInstances,
  hideDefaultNavBar,
  initializeWebkata,
  resizeEditor,
  resizeHandler,
  runUnitTests,
  updateHistory,
  updateLivePreview,
} from '../Functions/webkata';
import { showInlineLoadingSpinner } from '../loader';
import { debounce1 as debounce } from '../../../../hooks/common/utlis';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import AwardsNotificationCard from '../components/AwardsNotificationCard';

// inpage components
const ProblemStatement = ({
  currentDevice,
  currentQuestion,
  isDesktop,
}) => <>
    {
      (currentDevice === 'desktop' && isDesktop)
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
      (currentDevice === 'mobile' || !isDesktop)
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

const CodeEditors = ({
  files, entry, onCodeEditorChange, onRunBtnClick,
}) => <div className='editor-with-header'>
    <header className='tabs-container'>
      <ul className="nav nav-pills" id="pills-tab" role="tablist">
        <>
          {
            files
            && Object.keys(files)
              .map((filePath, idx) => {
                const currentLanguageName = files[filePath].name;

                return <li key={idx} className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${filePath === entry ? 'active' : ''}`}
                    id={`pills-${currentLanguageName.toLowerCase()}-tab`}
                    data-toggle="pill"
                    data-target={`#pills-${currentLanguageName.toLowerCase()}`}
                    type="button"
                    role="tab"
                    aria-controls={`#pills-${currentLanguageName.toLowerCase()}`}
                    aria-selected={filePath === entry}>
                    <FormattedMessage
                      defaultMessage={'{languageTabName}'}
                      description='tab button text'
                      values={{
                        languageTabName: currentLanguageName,
                      }}
                    />
                    <span className='active-indicator'></span>
                  </button>
                </li>;
              })
          }
        </>
      </ul>
    </header>
    <div className="tab-content" id="pills-editors">
      <>
        {
          files
          && Object.keys(files)
            .map((filePath, idx) => {
              const {
                name: currentLanguageName,
              } = files[filePath];

              return <div
                key={idx}
                className={`tab-pane fade show ${entry === filePath ? 'active' : ''}`}
                id={`pills-${currentLanguageName.toLowerCase()}`}
                role="tabpanel"
                aria-labelledby={`pills-${currentLanguageName.toLowerCase()}`}>
                <CodeEditor
                  className='test-editor'
                  id={`${currentLanguageName.toLowerCase()}-editor`}
                  onChange={debounce(onCodeEditorChange, 800)}
                />
              </div>;
            })
        }
      </>
      <button
        type='button'
        className='run-btn btn btn-primary'
        onClick={onRunBtnClick}
      >
        <FormattedMessage defaultMessage={'Run'} description='run webkata button text' />
        <i className="fa fa-play" />
      </button>
    </div>
  </div>;

const ValidatedResult = ({ evaluationDetails, onRunBtnClick }) => <div className='validated-result'>
  {
    !evaluationDetails
    && <div className='not-validated'>
      <span className='body-bold'>
        <FormattedMessage
          defaultMessage={'Click "Run" to validate your code'}
          description='empty validated result text'
        />
      </span>
      <button
        type='button'
        className='run-btn btn btn-primary'
        onClick={onRunBtnClick}
      >
        <FormattedMessage defaultMessage={'Run'} description='run webkata button text' />
        <i className="fa fa-play" />
      </button>
    </div>
  }
  {
    evaluationDetails
    && <div className='validated'>
      <ol className='test-cases-list'>
        {
          evaluationDetails.result.map((testObj, idx) => <li key={idx} className='test-case'>
            <img
              className='test-case-pass-fail-icon'
              src={`../../../../images/webkata/${testObj.passed ? 'test-case-passed-icon.svg' : 'test-case-failed-icon.svg'} `}
              alt='pass-fail-icon' />
            <span className='test-case-text body-bold'>
              <FormattedMessage
                defaultMessage={'Private test case {testCaseNumber} - {result}'}
                description='test case text'
                values={{
                  testCaseNumber: idx + 1,
                  result: testObj.passed ? 'Passed' : 'Failed',
                }}
              />
            </span>
          </li>)
        }
      </ol>
    </div>
  }
</div>;

const SuccessModalComponent = ({
  passedAllTestCases, message = false, userName = 'user', nextHandler = () => { },
}) => <>
    {
      passedAllTestCases
      && <>
        <div className='success-modal-content'>
          <Img
            src={'../../../../images/games/turtle-success.png'}
          />
          <div className='col-10 mx-auto'>
            <h5 className='main-message'>
              <FormattedMessage
                defaultMessage={'Awesome!'}
                description={'Success message'}
              />
            </h5>
            {
              message
              && <>
                <p className='congrajulations-message'>
                  <FormattedMessage
                    defaultMessage={'{message}'}
                    description={'Success message'}
                    values={{
                      message: message.replace('{{name}}', userName),
                    }}
                  />
                </p>
                <div className='d-flex align-items-center justify-content-center'>
                  <button className='btn btn-primary play-next-btn' onClick={nextHandler}>
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
          </div>
        </div>
      </>
    }
  </>;

const WebkataHomeComponent = ({ changeRoute }) => {
  const { conceptId } = useParams();
  pageInit(`webkata-home-container webkata-${conceptId}-bg`, 'WebKata');
  const onResize = () => resizeHandler('nav', '.webkata-frame');

  React.useEffect(() => {
    window.addEventListener('resize', onResize);
    const resizeTimeout = setTimeout(() => {
      resizeHandler('nav', '.webkata-frame');
    }, 300);

    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimeout);
    };
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
                defaultMessage={'WebKata - {concept}'}
                description={'Webkata title'}
                values={{
                  concept: conceptId.toUpperCase(),
                }}
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
          onClick={() => changeRoute('game')}>
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
              defaultMessage={'WebKata - {concept}'}
              description={'Webkata title'}
              values={{
                concept: conceptId.toUpperCase(),
              }}
            />
          </h1>
        </div>
        <div className="webkata-actions">
          <div className="d-flex align-items-center">
            {/* <a href="../../" className="btn btn-transparent turtle-action-btn turtle-audio-btn">
              <Img src='../../../../images/games/gameAudio.png' alt='Game Audio' />
            </a> */}
            <button className="btn btn-transparent turtle-action-btn webkata-play-btn" onClick={() => changeRoute('game')}>
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
  const successModalRef = useRef(null);
  const awardsNotificationCardRef = useRef(null);

  const { state: { device } } = useRootPageState();
  const { conceptId, id } = useParams();

  pageInit(`webkata-main-container webkata-${conceptId}-bg`, 'Webkata');
  const [isDesktop, setIsDesktop] = useState(window.matchMedia('(min-width: 1024px)').matches);
  const [showLivePreview, setShowLivePreview] = useState(false);

  const {
    state: webkataState,
    fetchWebkataQuestion,
  } = useWebkataFetchQuestion({
    isPageMounted, initializeData: true, conceptid: conceptId, virtualid: id,
  });

  const {
    state: webkataSubmitState,
    submitWebkataQuestion,
    resetWebkataSubmitState,
  } = useWebkataSubmitQuestion({ isPageMounted });

  const {
    status,
    questionList,
    questionObject,
    submissionDetails,
  } = webkataState;

  const memorizedWebkataQuestionState = React.useMemo(() => webkataState,
    [questionList]);

  // methods
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

  const toggleCollapseLivePreview = (toggleStatus) => {
    if (typeof toggleStatus === 'boolean') {
      if (showLivePreview !== toggleStatus) {
        setShowLivePreview(toggleStatus);
      }
    } else {
      setShowLivePreview((prev) => !prev);
    }
  };

  // event handlers
  const onCodeEditorChange = () => {
    updateLivePreview($('#live-preview')[0]);
  };

  const handleFetchQuestion = (clickedUponVirtualId) => fetchWebkataQuestion(conceptId,
    clickedUponVirtualId);
  const onLevelIndicatorClick = () => {
    levelComponentRef.current.show();
  };

  const onLeaderboardBtnClick = () => {
    leaderboardComponentRef.current.toggle();
  };

  const onRunBtnClick = () => {
    const hideInLineLoadingSpinner = showInlineLoadingSpinner('.run-btn');
    const currentEditorInstances = getCurrentEditorInstances();

    const {
      questionObject: currentQuestionObject,
    } = memorizedWebkataQuestionState;

    const {
      questionId,
      testCases,
      questionSetup,
      conceptId: conceptIdentifier,
    } = currentQuestionObject;
    const currentQuestionSetup = { ...questionSetup };
    const { files } = currentQuestionSetup;

    const testResult = runUnitTests(testCases, '#live-preview');

    Object.keys(currentEditorInstances).forEach((concept) => {
      const { editorInstance, filePath } = currentEditorInstances[concept];
      const file = files[filePath];

      file.code = editorInstance.getValue();
    });

    submitWebkataQuestion(questionId, testResult, currentQuestionSetup, conceptIdentifier)
      .then(() => {
        hideInLineLoadingSpinner();
        toggleCollapseLivePreview(true);
        $('#pills-validated-result-tab').trigger('click');
      });
  };

  const handleSuccess = () => {
    fetchWebkataQuestion(
      memorizedWebkataQuestionState.questionObject.conceptId,
      memorizedWebkataQuestionState.questionObject.virtualId + 1,
    )
      .then((res) => {
        if (res !== 'access_denied') {
          if (res.status === 'success' && res.questionObject) {
            toggleCollapseLivePreview(false);
            awardsNotificationCardRef.current.hide();
          }
        }
      });
  };

  const listenResizeWebkata = () => {
    resizeEditor();
    setIsDesktop(window.matchMedia('(min-width: 1024px)').matches);
  };
  const { subscriptionData } = React.useContext(SubscriptionContext);
  const isAlreadyCompleted = () => questionObject.submissionDetails
  && questionObject.submissionDetails?.completed;

  const gamesLimit = (gameName) => {
    const gamesEnabled = isFeatureEnabled(subscriptionData, 'games', gameName);
    return gamesEnabled.enabled && gamesEnabled[gameName];
  };
  // side effects
  useEffect(() => {
    hideDefaultNavBar(device, 'game');
    window.addEventListener('resize', listenResizeWebkata);

    const timer = setTimeout(() => {
      resizeEditor();
    }, 300);

    return () => {
      clearTimeout(timer);
      successModalRef?.current?.hide();
      // document.querySelector('nav:first-child').style.display = 'block';
      $('nav:first-child').show();
      window.removeEventListener('resize', listenResizeWebkata);
    };
  }, []);

  useEffect(() => {
    if (status && status === 'success') {
      resizeEditor();
      // choosing setup
      let redirectId = 1;
      if (id) {
        redirectId = id;
      } else {
        redirectId = questionObject.virtualId;
      }
      if (redirectId > gamesLimit('webkata') && !isAlreadyCompleted()) {
        pathNavigator(`webkata/${conceptId}/${gamesLimit('webkata') || 1}`);
      }
      const questionSetup = submissionDetails.isSubmitted
        ? submissionDetails.submissionSetup : questionObject.questionSetup;

      // initialize code editor instances
      initializeWebkata(['HTML', 'CSS', 'JS'].includes(questionObject.conceptId) ? 'static' : questionObject.conceptId,
        questionSetup, $('#live-preview')[0]);
      // reset validation and come back to live preview tab
      resetWebkataSubmitState();
      $('#pills-live-preview-tab').trigger('click');
      // close modal if open
      successModalRef.current.hide();
    } else if (status === 'error') {
      const { origin } = window.location;
      window.location.href = `${origin}/webkata/${conceptId}`;
    }
  }, [webkataState]);

  useEffect(() => {
    updateHistory(memorizedWebkataQuestionState);
  }, [memorizedWebkataQuestionState.questionObject]);

  useEffect(() => {
    if (webkataSubmitState.status === 'success') {
      if (webkataSubmitState.passed) {
        successModalRef.current.show();
        awardsNotificationCardRef.current.show(webkataSubmitState.awardsGiven);
      } else if (!webkataSubmitState.passed && !showLivePreview) {
        setShowLivePreview(true);
      }
    }
  }, [webkataSubmitState]);

  return <>
    <WebkataNavBar
      levelBtnHandler={onLevelIndicatorClick}
      leaderboardHandler={onLeaderboardBtnClick}
      questionState={memorizedWebkataQuestionState}
      isWebkataGamePage={true}
    />
    {/* <GameNavBar
      questionState={memorizedWebkataQuestionState}
      // handleHint={handleHint}
      levelBtnHandler={onLevelIndicatorClick}
      isGameMainPage={true}
      leaderboardHandler={onLeaderboardBtnClick}
    /> */}
    <main className={`webkata-game-container ${(device === 'mobile' || !isDesktop) ? 'webkata-game-mob-container' : ''}`}>
      <ProblemStatement
        currentDevice={device}
        currentQuestion={questionObject}
        isDesktop={isDesktop} />
      <div className='editor-with-live-preview'>
        <CodeEditors
          files={memorizedWebkataQuestionState.questionObject?.questionSetup?.files}
          entry={memorizedWebkataQuestionState.questionObject?.questionSetup?.entry}
          onCodeEditorChange={onCodeEditorChange}
          onRunBtnClick={onRunBtnClick}
        />
        <div className={`live-preview-with-validated-result ${showLivePreview ? 'open' : ''}`}>
          {
            (!isDesktop || device === 'mobile')
            && <div className={`collapse-live-preview-btn-container ${showLivePreview ? 'open' : ''}`}>
              <button
                type='button'
                className={`collapse-live-preview-btn ${showLivePreview ? 'open' : ''}`}
                onClick={toggleCollapseLivePreview}
              >
                <i className={`fa fa-chevron-left ${showLivePreview ? 'fa-chevron-right' : ''}`} />
              </button>
            </div>
          }
          <div className='tabs-container-with-tab-content'>
            <header className='tabs-container'>
              <ul className="nav nav-pills" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className='nav-link active'
                    id='pills-live-preview-tab'
                    data-toggle="pill"
                    data-target='#pills-live-preview'
                    type="button"
                    role="tab"
                    aria-controls='#pills-live-preview'
                    aria-selected='true'>
                    <FormattedMessage
                      defaultMessage={'Live Preview'}
                      description='tab button text'
                    />
                    <span className='active-indicator'></span>
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className='nav-link'
                    id='pills-validated-result-tab'
                    data-toggle="pill"
                    data-target='#pills-validated-result'
                    type="button"
                    role="tab"
                    aria-controls='#pills-validated-result'
                    aria-selected='true'>
                    <FormattedMessage
                      defaultMessage={'Validated Result'}
                      description='tab button text'
                    />
                    <span className='active-indicator'></span>
                  </button>
                </li>
              </ul>
            </header>
            <div className='tab-content' id='live-preview-with-validated-result'>
              <div
                className={'tab-pane fade show active'}
                id='pills-live-preview'
                role="tabpanel"
                aria-labelledby='#pills-live-preview-tab'>
                <iframe
                  id='live-preview'
                  sandbox='allow-forms allow-modals allow-same-origin allow-popups allow-presentation allow-scripts' />
              </div>
              <div
                className={'tab-pane fade'}
                id='pills-validated-result'
                role="tabpanel"
                aria-labelledby='#pills-validated-result-tab'>
                <ValidatedResult
                  evaluationDetails={webkataSubmitState.evaluationDetails}
                  onRunBtnClick={onRunBtnClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Modal
      ref={successModalRef}
      options={'hide'}
      modalClass={'success-modal'}
      customClass={'curved'}
      header={<div></div>}>
      <SuccessModalComponent
        passedAllTestCases={webkataSubmitState.passed}
        message={webkataSubmitState.pointsDetails.submissionStatus}
        userName={webkataSubmitState.profileDetails.name}
        nextHandler={handleSuccess}
      />
    </Modal>
    <AwardsNotificationCard ref={awardsNotificationCardRef} />
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
  const [webkataRoute, setWebaktaRoute] = React.useState('home');
  const changeRoute = (route) => setWebaktaRoute(route);

  timeTrack('games/webkata');

  React.useEffect(() => {
    const locationArray = window.location.href.split('/').filter((el) => el !== '');
    if (locationArray.length > 4) {
      changeRoute('game');
    }
  }, []);

  return <>
    {
      webkataRoute === 'home' && <WebkataHomeComponent changeRoute={changeRoute} />
    }
    {
      webkataRoute === 'game' && <WebkataGameComponent />
    }
  </>;
};

export default Webkata;
