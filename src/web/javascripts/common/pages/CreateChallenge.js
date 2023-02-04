import React from 'react';
// import { FormattedMessage } from 'react-intl';
import { Link, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import md5 from 'crypto-js/md5';
import autocrop from 'autocrop-worker';
import html2canvas from 'html2canvas';
import TurtleChallengeNavBar from '../components/TurtleChallengesNavBar';
import { $, pageInit, pathNavigator } from '../framework';
import '../../../stylesheets/common/pages/turtle-challenges/style.scss';
import {
  copyHandler, getCreateChallengeRequest, runSkulpt, startTurtle,
} from '../Functions/turtle';
import GameLeaderboardComponent from '../components/GameLeaderboardComponent';
import { useCreateChallenge, useGetChallenges } from '../../../../hooks/pages/challenges';
import Modal from '../components/Modal';
import Img from '../components/Img';

const checkIsCreateChallenge = () => {
  const createChallengeRegex = /turtle\/challenges\/create(\/\w*)?/g;
  return createChallengeRegex.test(window.location.pathname);
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
  const componentContainer = 'create-challenge-container';
  // eslint-disable-next-line prefer-arrow-callback
  window.addEventListener('resize', function handler() {
    if (!checkIsCreateChallenge()) {
      this.removeEventListener('resize', handler);
    }
    resizeHandler('nav.game-navbar', componentContainer);
  });
  setTimeout(() => {
    resizeHandler('nav.game-navbar', componentContainer);
  }, 300);
};

const cropImage = (element) => {
  // eslint-disable-next-line camelcase
  autocrop(element, null, { version: __webpack_hash__ });
};

const CreateChallangesQuestionComponent = ({
  status, challengeDetails,
  trendingChallengeStatus, trendingChallenges = [],
}) => {
  React.useEffect(() => {
    if (trendingChallengeStatus === 'success') {
      trendingChallenges.forEach((challenge) => {
        cropImage(document.querySelector(`.create-challenge-draft-container .challenge-img-container.challenge-img-${challenge.challengeId} img`));
      });
    }
  }, [trendingChallengeStatus]);

  return <>
    <div className="create-challenge-question-container">
      <div className="create-challenge-question-block">
        {
          status === 'success'
          && <>
            <div className="create-challenge-title-block">
              <p className='create-challenge-question mb-0'>
                <FormattedMessage
                  defaultMessage={'Challenge Name'}
                  description={'challenge name title'}
                />
              </p>
            </div>
            <div className="create-challenge-question-content">
              <div className="create-challenge-question-instructions">
                <p className="create-challenge-question-title" contentEditable suppressContentEditableWarning={true}>
                  <FormattedMessage
                    defaultMessage={'{question}'}
                    description={'Question'}
                    values={{ question: challengeDetails.challengeName }}
                  />
                </p>
              </div>
            </div>
          </>
        }
      </div>
      <div className="create-challenge-draft-container">
        <div className="create-challenge-title-block">
          <p className='create-challenge-question-title mb-0'>
            <FormattedMessage
              defaultMessage={'Try these challenges'}
              description={'draft challenge title'}
              />
          </p>
        </div>
        {
          trendingChallengeStatus === 'success'
          && <>
            {
              trendingChallenges.length > 0
              && <>
                {
                  trendingChallenges.map((challenge, idx) => <div key={idx} className={'challenge-box'}>
                    <Link to={challenge.actionUrl}>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <div className={`challenge-img-container challenge-img-${challenge.challengeId}`}>
                            <Img
                              local={false}
                              src={challenge.imgPath}
                              alt={challenge.challengeName}
                              className={'challenge-name'}
                            />
                          </div>
                          <div>
                            <p className='challengeName mb-0'>
                              <FormattedMessage
                                defaultMessage={'{challengeName} #{challengeId}'}
                                description={'challenge name'}
                                values={{
                                  challengeName: challenge.challengeName,
                                  challengeId: challenge.challengeId,
                                }}
                              />
                            </p>
                            <p className='creatorName mb-0'>
                              <FormattedMessage
                                defaultMessage={'Created by {creatorName}'}
                                description={'challenge creator name'}
                                values={{
                                  creatorName: challenge.creatorName,
                                }}
                              />
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>)}
              </>
            }
          </>
        }
      </div>
    </div>
  </>;
};

const CreateChallangesMobQuestionComponent = ({
  status, challengeDetails, handleRunCode = () => {},
}) => <>
  <div className="create-challenge-mob-question-container">
    <div className="create-challenge-mob-question-block">
        {
          status === 'success'
          && <>
          <p className='create-challenge-question-header mb-0'>
            <FormattedMessage
              defaultMessage={'Challenge Name'}
              description={'challenge name'}
            />
          </p>
          <div className="create-challenge-question-card">
            <div className="create-challenge-question-content">
              {/* <p className="create-challenge-question-title">
                <FormattedMessage
                  defaultMessage={'{question}'}
                  description={'Question'}
                  values={{
                    question: questionObject.Question,
                  }}
                />
              </p> */}
              <p
                contentEditable
                suppressContentEditableWarning
                className='create-challenge-question-title mb-0'
              >
                <FormattedMessage
                  defaultMessage={'{challengeName}'}
                  description={'Question'}
                  values={{
                    challengeName: challengeDetails.challengeName,
                  }}
                />
              </p>
            </div>
          </div>
          </>
        }
    </div>
    {
      <div className="create-challenge-preview-card">
        <div className="previewOutputContainer">
          <div id="previewCanvas"></div>
        </div>
      </div>
    }
    <div className="create-challenge-mob-hero-btn-block">
      <button type='button' className='btn d-flex align-items-center justify-content-center' onClick={() => { handleRunCode(true); }}>
        <p>
          <FormattedMessage
            defaultMessage={'Create challenge'}
            description={'create challenge button'}
          />
        </p>
      </button>
    </div>
  </div>
</>;

const CreateChallangesPlayGroundComponent = ({
  handleRunCode,
}) => <>
  <div className="create-challenge-editor-container">
    {/* <div className="create-challenge-skeleton-body"> */}
      <div className="create-challenge-editor-title">
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
          <button id='runCode' className='btn runBtn' onClick={() => { handleRunCode(true); }}>
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
              <button className="btn btn-light mt-1 repositionDrawing" title="Center">
                <i className="fa fa-crosshairs"></i>
              </button>
            </div>
            <div className="sectionContent outputContainer">
              <div id="userCanvas"></div>
            </div>
          </div>
        </div>
      </div>
    {/* </div> */}
  </div>
</>;

const CreateChallangesMobComponent = ({
  status, challengeDetails, handleRunCode = () => {},
}) => <>
  <div className="create-challenge-mob-game-container">
    <div className="d-none" id="codeBlock"></div>
    <div className="tab-content" id="tabsContent">
      <div className="tab-pane fade show active" id="turtleBlock" role="tabpanel" aria-labelledby="turtleBlock-tab">
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
          </div>
          <div className="mob-runBtnContainer">
            <button id='runCode' className='btn runBtn' onClick={() => { handleRunCode(false); }}>
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
      <div className="tab-pane fade" id="turtleSubmit" role="tabpanel" aria-labelledby="turtleSubmit-tab">
        <CreateChallangesMobQuestionComponent
          status={status}
          challengeDetails={challengeDetails}
          handleRunCode={handleRunCode}
        />
      </div>
    </div>
    <ul className="nav nav-tabs border-0" id="blocklyPythonTab" role="tablist">
      <li className="nav-item" role="presentation">
        <a className="nav-link active" id="turtle-tab" data-toggle="tab" href="#turtleBlock" role="tab" aria-controls="turtle" aria-selected="true">
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
          <div className="runCode" onClick={() => handleRunCode(false)}>
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
        </a>
      </li>
      <li className="nav-item" role="presentation">
        <a className="nav-link" id="submit-tab" data-toggle="tab" href="#turtleSubmit" role="tab" aria-controls="submit" aria-selected="false">
          <div className="nav-link-container">
            <svg width="24" height="24" viewBox="0 0 24 24" color="#A9ABAC" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.625 0C1.32663 6.28765e-09 1.04048 0.118526 0.829505 0.329505C0.618526 0.540483 0.5 0.826631 0.5 1.125C0.5 1.42337 0.618526 1.70952 0.829505 1.9205C1.04048 2.13147 1.32663 2.25 1.625 2.25H14.375C14.6734 2.25 14.9595 2.13147 15.1705 1.9205C15.3815 1.70952 15.5 1.42337 15.5 1.125C15.5 0.826631 15.3815 0.540483 15.1705 0.329505C14.9595 0.118526 14.6734 6.28765e-09 14.375 0H1.625ZM8.795 4.08C8.58406 3.86932 8.29813 3.75099 8 3.75099C7.70187 3.75099 7.41594 3.86932 7.205 4.08L2.33 8.955C2.13128 9.16826 2.0231 9.45033 2.02824 9.74178C2.03338 10.0332 2.15145 10.3113 2.35757 10.5174C2.56369 10.7236 2.84176 10.8416 3.13322 10.8468C3.42467 10.8519 3.70674 10.7437 3.92 10.545L6.875 7.59V16.875C6.875 17.1734 6.99353 17.4595 7.2045 17.6705C7.41548 17.8815 7.70163 18 8 18C8.29837 18 8.58452 17.8815 8.79549 17.6705C9.00647 17.4595 9.125 17.1734 9.125 16.875V7.59L12.08 10.545C12.183 10.6555 12.3072 10.7442 12.4452 10.8057C12.5832 10.8672 12.7322 10.9002 12.8832 10.9029C13.0343 10.9056 13.1843 10.8778 13.3244 10.8212C13.4645 10.7646 13.5917 10.6804 13.6986 10.5736C13.8054 10.4667 13.8896 10.3395 13.9462 10.1994C14.0028 10.0593 14.0306 9.90927 14.0279 9.75822C14.0252 9.60716 13.9922 9.45819 13.9307 9.32019C13.8692 9.18219 13.7805 9.05799 13.67 8.955L8.795 4.08Z"
                fill="currentColor"
                />
            </svg>
            <p>
              <FormattedMessage
                defaultMessage={'Submit'}
                description={'Submit tab'}
              />
            </p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</>;

const NewNameModalComponent = ({ handleCreateNewChallenge = () => {} }) => {
  const handleCreateChallenge = () => {
    const challengeName = document.querySelector('.new-name-modal-content #challengeName').value;
    handleCreateNewChallenge(challengeName);
  };

  return <>
    <div className="new-name-modal-content">
      <div className="form-group">
        <label htmlFor="challengeName">
          <FormattedMessage
            defaultMessage={'Enter the Challenge Name'}
            description={'challenge title'}
          />
        </label>
        <textarea className="form-control" name="challengeName" id="challengeName" rows="3"></textarea>
      </div>
      <button type="button" className="btn btn-primary create-challenge-btn" onClick={() => { handleCreateChallenge(); }}>
        <FormattedMessage
          defaultMessage={'Create'}
          description={'create challenge button'}
        />
      </button>
    </div>
  </>;
};

const AccessDeniedModalComponent = ({ handleCloseModal = () => {} }) => {
  const handleRegister = () => {
    pathNavigator('register/');
  };

  return <>
    <div className="access-denied-modal-component">
      <div className="access-denied-title">
        <h4>
          <FormattedMessage
            defaultMessage={'Ooch!'}
          />
        </h4>
      </div>
      <div className="accesss-denied-message">
        <p>
          <FormattedMessage
            defaultMessage={'Register to Create Challenge, Earn Points and Compete with friends'}
            description={'access denied compnent'}
          />
        </p>
      </div>
      <div className="register-btns my-2">
        <div className="d-flex align-items-center">
          <button className='btn btn-block continue-exploring' onClick={handleCloseModal}>
            <FormattedMessage
              defaultMessage={'Continue Exploring'}
              description={'continue button'}
            />
          </button>
          <button className="btn btn-block register-btn" onClick={handleRegister}>
            <FormattedMessage
              defaultMessage={'Register for free'}
              description={'register button'}
            />
          </button>
        </div>
      </div>
    </div>
  </>;
};

const ChallengeConfirmationModalComponent = ({
  updateChallenge = () => {},
  // challengeRequest = {},
  handleCloseModal = () => {},
  handleResponse = () => {},
}) => {
  const handleCreateChallenge = (challengeState) => {
    const request = getCreateChallengeRequest(challengeState);
    $('#loader').show();
    handleCloseModal();
    updateChallenge(request)
      .then((resp) => {
        // $('#loader').hide();
        handleResponse(resp);
      });
    // }
  };

  return <>
    <div className="create-challenge-confirmation-modal-component">
      <p>
        <FormattedMessage
          defaultMessage={'Are you sure you want to create this challenge?'}
          description={'create challenge confirmation message'}
        />
      </p>
      <div className="d-flex align-items-center">
        <button
          type="button"
          className="btn btn-block btn-outline-primary draft-btn"
          onClick={() => handleCreateChallenge('draft')} >
          <FormattedMessage
            defaultMessage={'Keep in draft'}
            description={'draft button'}
          />
        </button>
        <button
          type="button"
          className="btn btn-block btn-primary publish-btn"
          onClick={() => handleCreateChallenge('published')} >
          <FormattedMessage
            defaultMessage={'Create'}
            description={'create challenge button'}
          />
        </button>
      </div>
    </div>
  </>;
};

const SuccessCreateChallengeModalComponent = ({
  challengeState = {}, handleModalClose = () => {},
}) => {
  const {
    // awardsGiven,
    pointDetails, shareLink = '',
    challengeDetails = {},
  } = challengeState;

  return <>
    {
      !!(challengeState)
      && <>
        <div className="success-modal-content">
          <div className="success-modal-img-container">
            <Img
              src={'games/turtle-success.png'}
            />
          </div>
          <div className='col-10 mx-auto'>
            <h5>
              <FormattedMessage
                defaultMessage={'Awesome!'}
                description={'Success message'}
              />
            </h5>
            {
              !!(pointDetails)
              && <>
                <p>
                  <FormattedMessage
                    defaultMessage={'{message}'}
                    description={'success message'}
                    values={{
                      message: pointDetails?.submissionStatus,
                    }}
                  />
                </p>
                {
                  !!(challengeDetails)
                  && challengeDetails?.challengeState === 'published'
                  && <>
                    <p>
                      <FormattedMessage
                        defaultMessage={'Now your friends can view and solve your challenge'}
                        description={'success message'}
                      />
                    </p>
                    <div className='d-flex align-items-center justify-content-center my-2'>
                      <Link to={'/challenges'} className='btn btn-primary'>
                        <FormattedMessage
                          defaultMessage={'Go to Challenges'}
                          description={'challenges navigation button'}
                        />
                      </Link>
                    </div>
                    <div className="social-media-share">
                      <h4>
                        <FormattedMessage
                          defaultMessage={'Share in'}
                          description={'share in social media text'}
                        />
                      </h4>
                      <div className="d-flex flex-wrap align-items-center justify-content-center social-media-icons">
                        <Link to={`https://www.facebook.com/sharer/sharer.php?u=${shareLink}`} className="fa-stack" target="_blank">
                          <i className="fas fa-square fa-stack-2x facebook-color"></i>
                          <i className="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                        </Link>
                        <Link to={`https://twitter.com/share?url=${shareLink}`} className='fa-stack' target={'_blank'}>
                          <i className="fas fa-square fa-stack-2x twitter-color"></i>
                          <i className="fab fa-twitter fa-stack-1x fa-inverse"></i>
                        </Link>
                        <Link to={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareLink)}`} className='fa-stack' target={'_blank'}>
                          <i className="fas fa-square fa-stack-2x whatsapp-color"></i>
                          <i className="fab fa-whatsapp fa-stack-1x fa-inverse"></i>
                        </Link>
                        <Link to={`https://t.me/share/url?url=${encodeURIComponent(shareLink)}`} className='fa-stack' target={'_blank'}>
                          <i className="fas fa-square fa-stack-2x telegram-color"></i>
                          <i className="fab fa-telegram-plane fa-stack-1x fa-inverse"></i>
                        </Link>
                      </div>
                      <div className="d-flex linkShareContainer py-3">
                        <input type="text" id='shareLink' className="link-share form-control" value={shareLink} readOnly />
                        <a href="#" className="input-group-append px-2" id="linkCopy" onClick={copyHandler}>
                          <i className="far fa-copy icon-size-regular align-self-center"></i>
                        </a>
                      </div>
                    </div>
                  </>
                }
                {
                  !!(challengeDetails)
                  && challengeDetails?.challengeState === 'draft'
                  && <>
                    <p>
                      <FormattedMessage
                        defaultMessage={'{message}'}
                        description={'draft message'}
                        values={{
                          message: 'Now your work is safe with us. You can continue creating it later',
                        }}
                      />
                    </p>
                    <div className="draft-btn-container">
                      <Link to={'/challenges'} className={'btn btn-outline-primary'}>
                        <FormattedMessage
                          defaultMessage={'Go to Challenges'}
                          description={'navigation to challenges'}
                        />
                      </Link>
                      <button className={'btn btn-primary'} onClick={handleModalClose}>
                        <FormattedMessage
                          defaultMessage={'Continue Createing'}
                          description={'continue creating'}
                        />
                      </button>
                    </div>
                  </>
                }
              </>
            }
          </div>
        </div>
      </>
    }
  </>;
};

const CreateChallenge = () => {
  if (checkIsCreateChallenge()) {
    pageInit('create-challenge-container', 'Create Challenge');
  }

  const isPageMounted = React.useRef(true);
  const leaderboardComponentRef = React.useRef(true);
  const newNameModalRef = React.useRef(true);
  const createConfirmModalRef = React.useRef(true);
  const accessDeniedModalRef = React.useRef(true);
  const successModalRef = React.useRef(true);

  const createParams = useParams();
  let [
    page = undefined, action = undefined,
    id = undefined, uniqueString = undefined,
  ] = createParams['*'].split('/');
  if (action === '') {
    action = undefined;
  }
  if (page === '') {
    page = undefined;
  }
  if (id === '') {
    id = undefined;
  }
  if (uniqueString === '') {
    uniqueString = undefined;
  }

  let device = 'desktop';
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    device = 'mobile';
  } else {
    device = 'desktop';
  }

  const {
    createChallengeState,
    setCreateChallengeState,
    static: {
      createChallenge,
      getChallengeImageSignedUrl,
      loadChallenge,
      updateChallenge,
      uploadImageS3,
    },
  } = useCreateChallenge({ isPageMounted });

  const {
    state: {
      status: challengeState,
      trendingChallenges,
    },
  } = useGetChallenges({ isPageMounted });

  const memoizedCreateChallengeState = React.useMemo(() => createChallengeState,
    [createChallengeState]);
  const memoizedTrendingChallenges = React.useMemo(() => trendingChallenges,
    [trendingChallenges]);

  const {
    status, challengeDetails, requestPayload,
  } = memoizedCreateChallengeState;

  const newChallengeRequest = (challengeName) => {
    const payload = {
      type: 'createChallenge',
      challengeName,
      answerState: '',
      blockTypes: [],
      sourceCode: '',
      challengeState: 'draft',
    };
    let requestString = '';
    Object.keys(payload).forEach((index) => {
      if (index === 'blockTypes') {
        requestString += JSON.stringify(payload[index]);
      } else {
        requestString += payload[index];
      }
    });
    const requestHash = md5(requestString + md5(requestString).toString()).toString();
    payload.requestHash = requestHash;
    $('#loader').show();

    createChallenge(payload)
      .then((resp) => {
        $('#loader').hide();
        const history = `/turtle/challenges/create/${resp.challengeDetails.challengeId}/${resp.challengeDetails.uniqueString}`;
        window.history.replaceState({}, '', history);
      });
  };

  const toggleLeaderboard = () => leaderboardComponentRef.current.toggle();

  const toggleChallenges = (leaderBoardAction = 'show' || 'hide') => {
    if (leaderBoardAction === 'show') {
      $('.create-challenge-game-container').slideDown();
      $('.level-navbar').slideDown({
        complete: () => {
          $('.level-navbar').css('display', 'flex');
        },
      });
      $('.game-mob-container').slideDown();
      $('.leaderboard-btn').removeClass('active');
    } else if (leaderBoardAction === 'hide') {
      $('.create-challenge-game-container').slideUp();
      $('.game-mob-container').slideUp({
        complete: () => {
          $('.level-navbar').slideUp();
        },
      });
      $('.leaderboard-btn').addClass('active');
    }
  };

  const handleRunCode = (createChallengeKey = true) => {
    let previewKey = false;
    if (device === 'mobile' && createChallengeKey) {
      previewKey = true;
    }
    runSkulpt('create-challenge', previewKey)
      .then((resp) => {
        // $('#loader').show();
        setCreateChallengeState((prevState) => ({
          ...prevState,
          requestPayload: {
            ...resp,
          },
        }));
        if (createChallengeKey) {
          createConfirmModalRef.current.show();
        }
      });
  };

  const closeConfirmationModal = () => createConfirmModalRef?.current?.hide();
  const closeAccessDeniedModal = () => accessDeniedModalRef?.current?.hide();
  const closeSuccessModal = () => successModalRef?.current?.hide();
  const closeNewNameModal = () => newNameModalRef?.current?.hide();

  const handleUpdateResponse = (resp) => {
    if (resp === 'access_denied') {
      accessDeniedModalRef.current.show();
      $('#loader').hide();
    } else {
      const parsedResponse = JSON.parse(resp);
      if (parsedResponse.status === 'success') {
        successModalRef.current.show();
        getChallengeImageSignedUrl({
          challengeDetails: parsedResponse.challengeDetails,
        })
          .then((response) => {
            if (response !== 'access_denied') {
              const signedResponse = JSON.parse(response);
              if (signedResponse.status === 'success') {
                html2canvas(document.querySelector('#userCanvas'))
                  .then((canvas) => {
                    if (canvas) {
                      return new Promise((resolve) => {
                        canvas.toBlob((blob) => {
                          resolve(blob);
                        }, 'image/png');
                      });
                    }
                    $('#loader').hide();
                    return false;
                  })
                  .then((blob) => {
                    if (blob) {
                      return uploadImageS3(blob, signedResponse.signedURL);
                    }
                    $('#loader').hide();
                    return false;
                  });
              }
            }
          });
      }
      $('#loader').hide();
    }
  };

  React.useEffect(() => {
    hideDefaultNavBar();
    const addData = {};

    if (challengeDetails === false) {
      if (id === 'new') {
        addData.questionId = id;
        newNameModalRef.current.showWithRestriction();
      } else {
        const qid = Number(id);
        addData.questionId = qid;
        loadChallenge({ challengeId: qid });
      }
    }

    if (status === 'success') {
      startTurtle({
        response: createChallengeState,
        page: 'create-challenge',
        addData,
      });
    }
  }, [challengeDetails]);

  React.useEffect(() => () => {
    document.querySelector('nav:first-child').style.display = 'block';
    closeAccessDeniedModal();
    closeConfirmationModal();
    closeSuccessModal();
    closeNewNameModal();
    isPageMounted.current = false;
    $('.modal-backdrop').remove();
  }, []);

  return <>
      <TurtleChallengeNavBar
        title={'Challenge'}
        leaderBoardHandler={toggleLeaderboard} />
      {
        device === 'desktop'
        && <>
          <div className="create-challenge-game-container">
            <div className="game-container-block col-4">
              {
                <>
                  <CreateChallangesQuestionComponent
                    status={status}
                    trendingChallengeStatus={challengeState}
                    challengeDetails={challengeDetails}
                    trendingChallenges={memoizedTrendingChallenges}
                  />
                </>
              }
            </div>
            {/* <div className="game-container-block col-3 px-0">
              <div className="create-challenge-block-container">
                <div className="create-challenge-blockly-container">
                  <p className="create-challenge-blockly-title">
                    <FormattedMessage
                      defaultMessage={'Add a block'}
                      description={'Add a block title'}
                    />
                  </p>
                </div>
                <div id='create-challenge-toolbox' className="create-challenge-skeleton-body"></div>
              </div>
            </div> */}
            <div className="game-container-block col-8">
              <CreateChallangesPlayGroundComponent
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
          <div className="game-mob-container">
            <CreateChallangesMobComponent
              status={status}
              challengeDetails={challengeDetails}
              handleRunCode={handleRunCode}
              // status={status}
              // questionObject={memoizedCreateChallangeQuestionState.questionObject}
              // handleDrawingState={toggleDrawingState}
              // handleDebugState={toggleDebugState}
              // handleRunCode={handleRunCode}
            />
          </div>
        </>
      }
      <GameLeaderboardComponent
        ref={leaderboardComponentRef}
        game={'turtle'}
        beforeShown={() => { toggleChallenges('hide'); }}
        beforeHidden={() => { toggleChallenges('show'); }} />
    <Modal
      ref={newNameModalRef}
      options={'hide'}
      modalClass={'newNameModal'}
      customClass={'curved'}
      header={<div></div>}>
        <NewNameModalComponent
          handleCreateNewChallenge={newChallengeRequest}
        />
    </Modal>
    <Modal
      ref={createConfirmModalRef}
      options={'hide'}
      modalClass={'createConfirmationModal'}
      customClass={'curved'}
      header={
        <>
          <p className="mb-0">
            <FormattedMessage
              defaultMessage={'Create Challenge?'}
              description={'create challenge confm modal title'}
            />
          </p>
        </>
      }
      >
      {
        typeof requestPayload === 'object'
        && <>
          <ChallengeConfirmationModalComponent
            handleResponse={handleUpdateResponse}
            updateChallenge={updateChallenge}
            handleCloseModal={closeConfirmationModal}
          />
        </>
      }
    </Modal>
    <Modal
      ref={accessDeniedModalRef}
      options={'hide'}
      modalClass={'accessDeniedModal'}
      customClass={'curved'}
      header={<div></div>}
    >
      <AccessDeniedModalComponent
        handleCloseModal={closeAccessDeniedModal}
      />
    </Modal>
    <Modal
      ref={successModalRef}
      options={'hide'}
      modalClass={'successCreateChallengeModal'}
      customClass={'curved'}
      header={<div></div>}
      >
      <SuccessCreateChallengeModalComponent
        challengeState={memoizedCreateChallengeState?.validationDetails}
        handleModalClose={closeSuccessModal}
      />
    </Modal>
    <div id="loader"></div>
  </>;
};

export default CreateChallenge;
