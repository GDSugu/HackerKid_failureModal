import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import useRootPageState, { SubscriptionContext } from '../../../../../hooks/pages/root';
import '../../../../stylesheets/common/sass/components/_gameLevelComponent.scss';
import { $, isFeatureEnabled } from '../../framework';
import { attachDragHandler } from '../../Functions/turtle';
import Img from '../Img';

const GameLevelButton = ({
  game = 'all',
  handleFetchQuestion,
  question,
  gameState,
  isCurrentQuestion,
  virtualId,
}) => (<>
  <button
    id={`turtle-${virtualId}`}
    className={`btn game-level-button ${gameState} ${isCurrentQuestion ? 'current-question' : ''}`}
    onClick={() => {
      if (gameState === 'locked') return;
      if (game === 'turtle') {
        handleFetchQuestion(question.question_id);
      } else if (game === 'zombieLand') {
        handleFetchQuestion(question.virtualId);
      } else if (game === 'codekata') {
        handleFetchQuestion(question.virtualId);
      }
    }}>
    <p>
      {
        gameState === 'locked'
          ? <Img src="common/feature-lock-white.png" />
          : <FormattedMessage
            defaultMessage={'{level}'}
            description={'Level'}
            values={{ level: virtualId }}
          />
      }

    </p>
  </button>
</>);

const GameLevelComponent = ({ game, gameData, handleFetchQuestion }, ref) => {
  const { state: { device } } = useRootPageState();

  const { subscriptionData } = React.useContext(SubscriptionContext);
  const gamesLimit = (gameName) => {
    const gamesEnabled = isFeatureEnabled(subscriptionData, 'games', gameName);
    return gamesEnabled.enabled && gamesEnabled[gameName];
  };

  const questionState = (gameName, question, virtualId) => {
    if (question.state === 'completed') {
      return 'completed';
    }
    const gameLimit = gamesLimit(gameName);
    if (gameLimit && virtualId > gameLimit) {
      return 'locked';
    }
    if ((question.state === 'current') && (question.id !== gameData?.questionObject?.qid)) {
      return 'open';
    }
    return (question.state || 'open');
  };

  let currentQuestion = '';
  if (game === 'turtle') {
    currentQuestion = gameData.questionList
      .findIndex((el) => el.question_id === gameData.questionObject.question_id) + 1;
  } else {
    currentQuestion = gameData.questionList
      .findIndex((el) => el.virtualId === gameData.questionObject.virtualId) + 1;
  }

  const closeLevelComponent = () => {
    $('.game-level-component').slideUp();
  };

  const fetchQuestion = (questionId) => {
    handleFetchQuestion(questionId);
    closeLevelComponent();
  };

  const isCurrentQuestion = (question, index) => {
    let isCurrent = false;
    if (game === 'turtle') {
      isCurrent = currentQuestion === index + 1;
    } else if (game === 'zombieLand') {
      isCurrent = gameData?.questionObject?.qid === question?.qid;
    }
    return isCurrent;
  };

  const scrollToQuestion = () => {
    const questionElement = document.getElementById(`turtle-${currentQuestion}`);
    questionElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  };

  const onGameListScroll = () => {
    const element = $('.game-levels-list')[0];
    const scrollLeftBtn = $('.game-levels-list .scroll-left-btn')[0];
    const scrollRightBtn = $('.game-levels-list .scroll-right-btn')[0];

    if (element.offsetWidth + element.scrollLeft >= element.scrollWidth) {
      $(scrollRightBtn).attr('disabled', true);
    } else {
      $(scrollRightBtn).removeAttr('disabled');
    }

    if (element.scrollLeft === 0) {
      $(scrollLeftBtn).attr('disabled', true);
    } else if (element.scrollLeft > 0) {
      $(scrollLeftBtn).removeAttr('disabled');
    }
  };

  const onScrollLeftBtnClick = () => {
    const scrollList = $('.game-levels-list')[0];
    const levelBtnWidth = $('.game-level-button')[0].clientWidth;

    const left = -(levelBtnWidth + 100);

    scrollList.scrollBy({
      left,
      behavior: 'smooth',
    });
  };

  const onScrollRightBtnClick = () => {
    const scrollList = $('.game-levels-list')[0];
    const levelBtnWidth = $('.game-level-button')[0].clientWidth;

    const left = (levelBtnWidth + 100);

    scrollList.scrollBy({
      left,
      behavior: 'smooth',
    });
  };

  React.useImperativeHandle(ref, () => ({
    show: () => {
      $('.game-level-component').slideDown({
        complete: scrollToQuestion,
      });
    },
    hide: () => {
      $('.game-level-component').slideUp();
    },
  }));

  React.useEffect(() => {
    attachDragHandler('.game-levels-list');
  }, []);

  return <>
    <div className='game-navbar game-level-component' style={{
      display: 'none',
    }}>
      <div className="game-level-container">
        {
          device === 'desktop'
          && <>
            <div className="row justify-content-between align-items-center no-gutters px-3">
              <div className="col-4 flex-start">
                <div className='dashboard-nav-link'>
                  <Link to="/dashboard">
                    <div className="d-flex align-items-center">
                      <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7.55 0.531488C7.95577 0.18951 8.46935 0.00195312 9 0.00195312C9.53065 0.00195312 10.0442 0.18951 10.45 0.531488L17.2 6.22349C17.707 6.65149 18 7.28049 18 7.94349V17.7465C18 18.2106 17.8156 18.6557 17.4874 18.9839C17.1592 19.3121 16.7141 19.4965 16.25 19.4965H12.75C12.2859 19.4965 11.8408 19.3121 11.5126 18.9839C11.1844 18.6557 11 18.2106 11 17.7465V12.2465C11 12.1802 10.9737 12.1166 10.9268 12.0697C10.8799 12.0228 10.8163 11.9965 10.75 11.9965H7.25C7.1837 11.9965 7.12011 12.0228 7.07322 12.0697C7.02634 12.1166 7 12.1802 7 12.2465V17.7465C7 18.2106 6.81563 18.6557 6.48744 18.9839C6.15925 19.3121 5.71413 19.4965 5.25 19.4965H1.75C1.52019 19.4965 1.29262 19.4512 1.0803 19.3633C0.867984 19.2753 0.675066 19.1464 0.512563 18.9839C0.350061 18.8214 0.221157 18.6285 0.133211 18.4162C0.0452652 18.2039 0 17.9763 0 17.7465V7.94349C0 7.28049 0.293 6.65149 0.8 6.22349L7.55 0.531488ZM9.483 1.67849C9.34779 1.56467 9.17673 1.50226 9 1.50226C8.82327 1.50226 8.65221 1.56467 8.517 1.67849L1.767 7.36949C1.68347 7.4398 1.6163 7.52751 1.57018 7.62648C1.52406 7.72545 1.50011 7.8333 1.5 7.94249V17.7455C1.5 17.8835 1.612 17.9955 1.75 17.9955H5.25C5.3163 17.9955 5.37989 17.9692 5.42678 17.9223C5.47366 17.8754 5.5 17.8118 5.5 17.7455V12.2455C5.5 11.2785 6.284 10.4955 7.25 10.4955H10.75C11.716 10.4955 12.5 11.2785 12.5 12.2455V17.7455C12.5 17.8835 12.612 17.9955 12.75 17.9955H16.25C16.3163 17.9955 16.3799 17.9692 16.4268 17.9223C16.4737 17.8754 16.5 17.8118 16.5 17.7455V7.94349C16.4999 7.8343 16.4759 7.72645 16.4298 7.62748C16.3837 7.52851 16.3165 7.4408 16.233 7.37049L9.483 1.67849Z"
                          fill="white"
                        />
                      </svg>
                      <p className='font-weight-bold ml-2 mb-0'>
                        <FormattedMessage
                          defaultMessage={'Home'}
                          description={'Home navigation link'}
                        />
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-4 flex-center">
                <div>
                  <p className='font-weight-bold mb-0'>
                    <FormattedMessage
                      defaultMessage={'Levels'}
                      description={'Game Level'}
                    />
                  </p>
                </div>
              </div>
              <div className="col-4 flex-end">
                <div className="d-flex align-items-center">
                  {/* <div>
                    <button className="btn leaderboard-btn" onClick={leaderboarddHandler}>
                      <FormattedMessage
                        defaultMessage={'Scoreboard'}
                        description={'Leaderboard button'}
                      />
                    </button>
                  </div> */}
                  <div className="profileImg ml-2">
                    <Link to='/profile'>
                      <img src={'../../../../../images/common/profile.png'} alt="Hackerkid User" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
        {
          gameData?.questionList
          && <>
            <div className="game-levels-list" onScroll={onGameListScroll}>
              {
                device === 'desktop'
                && <button type='button' className='scroll-left-btn' onClick={onScrollLeftBtnClick}>
                  <i className='fa fa-chevron-left'></i>
                </button>
              }
              {
                gameData.questionList.map((question, index) => <GameLevelButton
                  game={game}
                  key={index}
                  handleFetchQuestion={fetchQuestion}
                  question={question}
                  gameState={questionState(game, question, index + 1)}
                  virtualId={index + 1}
                  // isCurrentQuestion={currentQuestion === index + 1}
                  isCurrentQuestion={isCurrentQuestion(question, index)}
                />)

                // <GameLevelButton
                // question={{ state: 'open' }}
                // virtualId={1}
                // isCurrentQuestion={true}
                // />
              }
              {
                device === 'desktop'
                && <button type='button' className='scroll-right-btn' onClick={onScrollRightBtnClick}>
                  <i className='fa fa-chevron-right'></i>
                </button>
              }
            </div>
          </>
        }
        {
          device === 'desktop'
          && <>
            <div className="close-btn btn" onClick={closeLevelComponent}>
              <p>
                <FormattedMessage
                  defaultMessage={'Close'}
                  description={'Close button'}
                />
              </p>
            </div>
          </>
        }

        {
          device === 'mobile'
          && <>
            <div className="close-btn-mob btn" onClick={closeLevelComponent}>
              <div className="d-flex align-items-center justify-content-between w-100">
                <p>
                  <FormattedMessage
                    defaultMessage={'Continue Playing'}
                    description={'Continue Playing button'}
                  />
                </p>
                <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 7.76795C16.3333 8.53775 16.3333 10.4623 15 11.2321L3 18.1603C1.66667 18.9301 1.01267e-06 17.9678 1.07997e-06 16.4282L1.68565e-06 2.5718C1.75295e-06 1.0322 1.66667 0.0699456 3 0.839746L15 7.76795Z" fill="white" />
                </svg>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  </>;
};

export default React.forwardRef(GameLevelComponent);
