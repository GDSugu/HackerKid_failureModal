import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, Outlet } from 'react-router-dom';
import useRootPageState from '../../../../../hooks/pages/root';
import '../../../../stylesheets/common/sass/components/_game_navBar.scss';
import Img from '../Img';

const GameNavBar = ({
  questionState = {},
  handleHint = () => {},
  levelBtnHandler = () => {},
  leaderboardHandler = () => {},
  isGameMainPage = false,
}) => {
  const { state: { device } } = useRootPageState();

  const { status, questionObject } = questionState;

  const handleLeaderboard = () => {
    leaderboardHandler();
  };

  return <>
    <nav className='game-navbar'>
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
                <button className='btn btn-transparent level-btn' onClick={levelBtnHandler}>
                  <div className="d-flex align-items-center">
                    <Img
                      src='../../../../../images/games/levelStar.png'
                      className='levelIcon'
                      alt='Level icon' />
                      {
                        status === 'success'
                        && <>
                          <p className='font-weight-bold ml-2 mb-0'>
                            <FormattedMessage
                              defaultMessage={'Level {level}'}
                              description={'Level navigation link'}
                              values={{
                                level: questionObject.virtualId,
                              }}
                            />
                          </p>
                        </>
                      }
                  </div>
                </button>
              </div>
            </div>
            <div className="col-4 flex-end">
              <div className="d-flex align-items-center">
                <div>
                  <button className="btn leaderboard-btn" onClick={handleLeaderboard}>
                    <FormattedMessage
                      defaultMessage={'Scoreboard'}
                      description={'Leaderboard button'}
                    />
                  </button>
                </div>
                <div className="profileImg ml-2">
                  <Link to='/profile'>
                    <img src={'../../../../../images/common/profile.png'} alt="Hackerkid User"/>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      }
      {
        device === 'mobile'
        && <>
          <div className="row justify-content-between align-items-center no-gutters mob-nav-header p-3">
            <Link to='/dashboard' className='homeNavIcon'>
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.55 0.531488C7.95577 0.18951 8.46935 0.00195312 9 0.00195312C9.53065 0.00195312 10.0442 0.18951 10.45 0.531488L17.2 6.22349C17.707 6.65149 18 7.28049 18 7.94349V17.7465C18 18.2106 17.8156 18.6557 17.4874 18.9839C17.1592 19.3121 16.7141 19.4965 16.25 19.4965H12.75C12.2859 19.4965 11.8408 19.3121 11.5126 18.9839C11.1844 18.6557 11 18.2106 11 17.7465V12.2465C11 12.1802 10.9737 12.1166 10.9268 12.0697C10.8799 12.0228 10.8163 11.9965 10.75 11.9965H7.25C7.1837 11.9965 7.12011 12.0228 7.07322 12.0697C7.02634 12.1166 7 12.1802 7 12.2465V17.7465C7 18.2106 6.81563 18.6557 6.48744 18.9839C6.15925 19.3121 5.71413 19.4965 5.25 19.4965H1.75C1.52019 19.4965 1.29262 19.4512 1.0803 19.3633C0.867984 19.2753 0.675066 19.1464 0.512563 18.9839C0.350061 18.8214 0.221157 18.6285 0.133211 18.4162C0.0452652 18.2039 0 17.9763 0 17.7465V7.94349C0 7.28049 0.293 6.65149 0.8 6.22349L7.55 0.531488ZM9.483 1.67849C9.34779 1.56467 9.17673 1.50226 9 1.50226C8.82327 1.50226 8.65221 1.56467 8.517 1.67849L1.767 7.36949C1.68347 7.4398 1.6163 7.52751 1.57018 7.62648C1.52406 7.72545 1.50011 7.8333 1.5 7.94249V17.7455C1.5 17.8835 1.612 17.9955 1.75 17.9955H5.25C5.3163 17.9955 5.37989 17.9692 5.42678 17.9223C5.47366 17.8754 5.5 17.8118 5.5 17.7455V12.2455C5.5 11.2785 6.284 10.4955 7.25 10.4955H10.75C11.716 10.4955 12.5 11.2785 12.5 12.2455V17.7455C12.5 17.8835 12.612 17.9955 12.75 17.9955H16.25C16.3163 17.9955 16.3799 17.9692 16.4268 17.9223C16.4737 17.8754 16.5 17.8118 16.5 17.7455V7.94349C16.4999 7.8343 16.4759 7.72645 16.4298 7.62748C16.3837 7.52851 16.3165 7.4408 16.233 7.37049L9.483 1.67849Z"
                  fill="white"
                />
              </svg>
            </Link>
            <div className="d-flex align-items-center">
              <button className='btn' onClick={leaderboardHandler}>
                <svg width="42" height="42" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M29.333 9.33333H21.777V5.33333C21.777 4.97971 21.6365 4.64057 21.3865 4.39052C21.1364 4.14048 20.7973 4 20.4437 4H11.5557C11.2021 4 10.8629 4.14048 10.6129 4.39052C10.3628 4.64057 10.2223 4.97971 10.2223 5.33333V14.6667H2.66634C2.31272 14.6667 1.97358 14.8071 1.72353 15.0572C1.47348 15.3072 1.33301 15.6464 1.33301 16V26.6667C1.33301 27.0203 1.47348 27.3594 1.72353 27.6095C1.97358 27.8595 2.31272 28 2.66634 28H29.333C29.6866 28 30.0258 27.8595 30.2758 27.6095C30.5259 27.3594 30.6663 27.0203 30.6663 26.6667V10.6667C30.6663 10.313 30.5259 9.97391 30.2758 9.72386C30.0258 9.47381 29.6866 9.33333 29.333 9.33333ZM10.2223 25.3333H3.99967V17.3333H10.2223V25.3333ZM19.1103 25.3333H12.889V6.66667H19.1103V25.3333ZM27.9997 25.3333H21.777V12H27.9997V25.3333Z" fill="white"/>
                </svg>
              </button>
              <div className="profileImg ml-3">
                <Link to='/profile'>
                  <img src={'../../../../../images/common/profile.png'} alt="Hackerkid User"/>
                </Link>
              </div>
            </div>
          </div>
        {
          isGameMainPage && <>
            <div className="row justify-content-between align-items-center no-gutters level-navbar p-2">
              <div>
                <button className='btn btn-transparent level-btn' onClick={levelBtnHandler}>
                  <div className="d-flex align-items-center">
                    <Img
                      src='../../../../../images/games/levelStar.png'
                      className='levelIcon'
                      alt='Level icon' />
                    {
                      status === 'success'
                      && <>
                        <p className='font-weight-bold ml-2 mb-0'>
                          <FormattedMessage
                            defaultMessage={'Level {level}'}
                            description={'Level 1 navigation link'}
                            values={{
                              level: questionObject.virtualId,
                            }}
                          />
                        </p>
                      </>
                    }
                  </div>
                </button>
              </div>
              <div className='d-flex align-items-center'>
                <button className="hintBtn btn btn-transparent" onClick={handleHint}>
                  <svg width="20" height="27" viewBox="0 0 20 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M14.384 22.664L13.9973 24.3427C13.853 24.9647 13.514 25.5245 13.0296 25.9405C12.5452 26.3566 11.9407 26.6072 11.304 26.656L11.0733 26.6653H8.25867C7.6198 26.6653 6.99761 26.4614 6.48271 26.0832C5.96781 25.705 5.58709 25.1723 5.396 24.5627L5.33467 24.34L4.948 22.664H14.384ZM9.66667 0C12.2304 0 14.6892 1.01845 16.502 2.8313C18.3149 4.64415 19.3333 7.10291 19.3333 9.66667C19.3333 12.5147 18.0853 15.124 15.6467 17.4533C15.5995 17.4984 15.5666 17.5564 15.552 17.62L14.848 20.664H4.48533L3.784 17.62C3.7692 17.5569 3.7363 17.4994 3.68933 17.4547C1.24933 15.124 0 12.5147 0 9.66533C0.00035359 7.1018 1.01896 4.64339 2.83177 2.83083C4.64459 1.01827 7.10314 -2.43855e-08 9.66667 0Z"
                      fill="#ffffff"/>
                  </svg>
                </button>
                {/* <button type='button' className='btn btn-transparent' onClick={() => {}}>
                  <Img
                    src='../../../../../images/games/gameMenu.png'
                    className='moreIcon'
                    alt='game menu'
                  />
                </button> */}
              </div>
            </div>
          </>
        }
        </>
      }
    </nav>
    <Outlet />
  </>;
};

export default GameNavBar;
