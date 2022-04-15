import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { $, pageInit } from '../framework';
import Img from '../components/Img';
import SwiperComponent from '../components/SwiperComponent';
import { useDashboard } from '../../../../hooks/pages/dashboard';
import { useLeaderBoard } from '../../../../hooks/pages/leaderboard';
import { useGetChallenges } from '../../../../hooks/pages/challenges';
import Modal from '../components/Modal';
import BottomSheet from '../components/BottomSheet';
import '../../../stylesheets/common/pages/dashboard/style.scss';

const showBottomSheet = () => {
  $('#viewMoreSheet').modal({
    backdrop: 'static',
  });
};

const HeroContainer = ({ dashboardUserData, isDesktop, session }) => <>
  <div className="hero-card">
    <div className="hero-card-data col-6 col-sm-4">
      <div className="hero-card-img" style={ (session.profileLink || dashboardUserData.profileImage) && { backgroundImage: `url(${session.profileLink ? session.profileLink : dashboardUserData.profileImage})` }}></div>
      { isDesktop
        && <>
            <div className="hero-card-data-content">
              <div className="hero-data">
                <Img src='common/hkcoin.png' />
                <p className='mb-0'>{`${session.pointsEarned || '--'} coins`}</p>
              </div>
              {/* <div className="hero-data">
                <Img src='common/xp.png' />
                <p className='mb-0'>
                  <FormattedMessage
                    defaultMessage={`${12345 || '--'} XP`}
                    description={'hk XP'}
                  />
                </p>
              </div> */}
            </div>
          </> }
    </div>
    <div className="hero-card-nav col-6 col-sm-8">
      { isDesktop
      && <>
      <div className="hero-nav-container">
        <Link to='/games' className='hero-nav-link nav-game-card col' >
          <div className="hero-nav-card">
            <div className="hero-nav-card-content">
              <div className="hero-nav-icon">
                <svg width="24" height="24" stroke="white" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 15L6.032 17.968C5.70167 18.2983 5.28084 18.5232 4.8227 18.6143C4.36457 18.7054 3.88971 18.6586 3.45815 18.4799C3.0266 18.3011 2.65773 17.9984 2.39819 17.6101C2.13864 17.2217 2.00007 16.7651 2 16.298V15L3.357 8.216C3.53824 7.30922 4.02806 6.49325 4.74312 5.90691C5.45817 5.32058 6.35429 5.0001 7.279 5H16.721C17.6457 5.0001 18.5418 5.32058 19.2569 5.90691C19.9719 6.49325 20.4618 7.30922 20.643 8.216L22 15V16.297C21.9999 16.7641 21.8614 17.2207 21.6018 17.6091C21.3423 17.9974 20.9734 18.3001 20.5418 18.4789C20.1103 18.6576 19.6354 18.7044 19.1773 18.6133C18.7192 18.5222 18.2983 18.2973 17.968 17.967L15 15H9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 5L10 7H14L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="hero-nav-title">
                <h3 className='mb-0'>
                  <FormattedMessage
                    defaultMessage={'Games'}
                    description={'games nav text'}
                  />
                </h3>
              </div>
            </div>
          </div>
        </Link>
        <Link to='/courses' className='hero-nav-link nav-course-card col' >
          <div className="hero-nav-card">
            <div className="hero-nav-card-content">
              <div className="hero-nav-icon">
                <svg width="24" height="24" viewBox="24 24 24 24" fill="none" stroke="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M41 26L36 31L31 26M28 31H44C45.1046 31 46 31.8954 46 33V44C46 45.1046 45.1046 46 44 46H28C26.8954 46 26 45.1046 26 44V33C26 31.8954 26.8954 31 28 31Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="hero-nav-title">
                <h3 className='mb-0'>
                  <FormattedMessage
                    defaultMessage={'Videos'}
                    description={'videos nav text'}
                  />
                </h3>
              </div>
            </div>
          </div>
        </Link>
        <Link to='/class' className='hero-nav-link nav-class-card col' >
          <div className="hero-nav-card">
            <div className="hero-nav-card-content">
              <div className="hero-nav-icon">
                <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M26.5 0C27.2223 0 27.9375 0.142262 28.6048 0.418663C29.2721 0.695063 29.8784 1.10019 30.3891 1.61091C30.8998 2.12163 31.3049 2.72795 31.5813 3.39524C31.8577 4.06253 32 4.77773 32 5.5V34.5C32 35.2223 31.8577 35.9375 31.5813 36.6048C31.3049 37.272 30.8998 37.8784 30.3891 38.3891C29.8784 38.8998 29.2721 39.3049 28.6048 39.5813C27.9375 39.8577 27.2223 40 26.5 40H5.5C4.77756 40 4.0622 39.8577 3.39478 39.5811C2.72736 39.3046 2.12095 38.8993 1.61021 38.3884C1.09946 37.8774 0.694372 37.2709 0.418088 36.6034C0.141805 35.9359 -0.000262341 35.2204 3.63671e-07 34.498V5.5C3.63671e-07 2.98 1.692 0.86 4 0.206V3.5C3.392 3.956 3 4.68 3 5.5V34.496C3 35.876 4.12 36.996 5.5 36.996H26.5C27.88 36.996 29 35.876 29 34.496V5.5C29 4.12 27.88 3 26.5 3H22V0H26.5ZM20 0V16.278C20 17.772 18.4 18.332 17.42 17.806L17.256 17.702L13.004 15.132L8.848 17.634C7.848 18.354 6.188 17.914 6.014 16.518L6 16.28V0H20ZM17 3H9V14.046L12.146 12.148C12.3966 12.0148 12.6746 11.9411 12.9584 11.9328C13.2421 11.9245 13.524 11.9817 13.782 12.1L17.002 14.048V3H17Z" fill="white" />
                </svg>
              </div>
              <div className="hero-nav-title">
                <h3 className='mb-0'>
                  <FormattedMessage
                    defaultMessage={'Class'}
                    description={'class nav text'}
                  />
                </h3>
              </div>
            </div>
          </div>
        </Link>
      </div>
      </> }
      { !isDesktop
      && <>
        <div className="hero-data-content">
          <div className="hero-data">
            <Img src='common/hkcoin.png' />
            <p className='mb-0'>{`${session.pointsEarned || '--'} coins`}</p>
          </div>
          {/* <div className="hero-data">
            <Img src='common/xp.png' />
            <p className='mb-0'>
              <FormattedMessage
                defaultMessage={`${12345 || '--'} XP`}
                description={'hk xp'}
              />
            </p>
          </div> */}
          <div className="dashboard-hero-sheet-btn">
            <button className='btn btn-block sheet-btn disabled' onClick={showBottomSheet}>Loading...</button>
          </div>
        </div>
      </> }
    </div>
  </div>
</>;

const ProfileContainer = ({ dashboardUserData, isDesktop, session }) => <>
  <div className="dashboard-profile-container dashboard-body-block">
    <div className="profile-heading-container">
      {
        isDesktop
        && <div className="d-flex align-items-center">
        <p className="block-heading">
          <FormattedMessage
            defaultMessage={'Profile'}
            description={'profile heading'}
          />
        </p>
        <Link className="profile-heading-menu" to={'/profile/edit'}>
          <p>
            <FormattedMessage
              defaultMessage={'Edit'}
              description={'edit profile'}
            />
          </p>
        </Link>
      </div>
      }
      {
        !isDesktop
        && <div className="d-flex align-items-center justify-content-between">
        <p className="block-heading">
          <FormattedMessage
            defaultMessage={'Home'}
            description={'home heading'}
          />
        </p>
        <Link className="profile-heading-menu" to={'/profile/edit'}>
          <p>
            <FormattedMessage
              defaultMessage={'Edit Profile'}
              description={'edit profile'}
            />
          </p>
        </Link>
      </div>
      }
    </div>
    {
      dashboardUserData
      && <>
      <div className="profile-content card card-block">
        <p className="profile-content-heading">{session.name ? session.name : dashboardUserData.name || '--'}</p>
        <p>{ session.about ? session.about : dashboardUserData.about || '--'}</p>
      </div>
      </>
    }
    {
      !dashboardUserData
      && <>
        <div className="skeleton">
          <div className="skeleton-body"></div>
        </div>
      </>
    }
  </div>
</>;

const GameContainer = ({
  dashboardUserData, overAllQuestionsCount, totalPointsEarned, validSubmissionsCount,
}) => <>
  <div className="dashboard-games-container dashboard-body-block">
    <div className="games-heading-container">
      <p className="block-heading">
        <FormattedMessage
          defaultMessage={'Game Progress'}
          description={'game progress heading'}
        />
      </p>
    </div>
    <div className="games-content card card-block">
      <div className="row">
        <div className="col-12 col-md-6 game-progress-block">
        {
          dashboardUserData
          && <>
            <div className="progress-container card card-block h-100">
              <div className="col-6">
                <div className="circle-progress">
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
                        <tspan>{validSubmissionsCount}</tspan>
                        <tspan>/{overAllQuestionsCount}</tspan>
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
              </div>
              <div className="col-6">
                <div className="game-progress-data">
                  <div className="game-data-container game-coins-data">
                    <div className="d-flex align-items-center">
                      <div className="game-progress-icon game-coins">
                        <Img src='common/hkcoin.png' />
                      </div>
                      <div className="progress-coins">
                        <p className="progress-sub-header">
                          <FormattedMessage
                            defaultMessage={'Coins Earned:'}
                            description={'coins earned'}
                          />
                        </p>
                        <p className="progress-data">{totalPointsEarned || '--'}</p>
                      </div>
                    </div>
                  </div>
                  {/* <div className="game-data-container game-time-data">
                    <div className="d-flex align-items-center">
                      <div className="game-progress-icon game-time">
                        <Img src='common/eva_clock-fill.png' />
                      </div>
                      <div className="progress-time">
                        <p className="progress-sub-header">
                          <FormattedMessage
                            defaultMessage={'Time Spent:'}
                            description={'time spent heading text'}
                          />
                        </p>
                        <p className="progress-data">{'14 Mins'}</p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </>
          }
          {
              !dashboardUserData
              && <>
                <div className="skeleton">
                  <div className="skeleton-body"></div>
                </div>
              </>
            }
        </div>
        <div className="col-12 col-md-6">
          <div className="games-container">
            <div className="games-block game-progress-block">
              <div className="games-cards d-flex align-items-center no-gutters">
                <div className="col-3">
                  <Link className="game-item" to='/turtle'>
                    <Img src='dashboard/dashboard-turtle.png' />
                  </Link>
                </div>
                <div className="col-3">
                  <Link className="game-item" to='/zombieland'>
                    <Img src='dashboard/dashboard-zombieLand.png' />
                  </Link>
                </div>
                <div className="col-3">
                  <Link className="game-item" to='/marioland'>
                    <Img src='dashboard/dashboard-marioLand.png' />
                  </Link>
                </div>
              </div>
            </div>
            <div className="game-btn-block game-progress-block mt-md-1">
              <button className='btn btn-block'>
                <div className="d-flex align-items-center justify-content-between">
                  <p>
                    <FormattedMessage
                      defaultMessage={'Continue Playing'}
                      description={'continue playing'}
                    />
                  </p>
                  <i className="fa fa-angle-right" aria-hidden="true"></i>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>;

const ChallengeSwiperSlide = ({ data }) => <>
  <Link className='challenge-item' to={data.actionUrl}>
    <div className="challenge-block">
      <div className="challenge-img">
        <Img src={data.imgPath} local={false} alt={data.challengeName} />
      </div>
      <div className="challenge-title">
        <p>{data.challengeName || '--'}</p>
      </div>
      <div className="challenge-author">
        <p>{`by ${data.creatorName || '--'}`}</p>
      </div>
    </div>
  </Link>
  </>;

const ChallengesSwiper = ({ trendingChallenges }) => <>
  <div className="dashboard-challenges-container dashboard-body-block">
    <div className="challenges-heading-container d-flex align-items-end justify-content-between">
      <p className="block-heading">
        <FormattedMessage
          defaultMessage={'Challenges'}
          description={'challenges heading'}
        />
      </p>
      <Link className='challenges-nav' to='/challenges'>
        <p>
          <FormattedMessage
            defaultMessage={'All Challenges'}
            description={'all challenges'}
          />
        </p>
      </Link>
    </div>
    <div className="challenges-block">
      <div className="row no-gutters">
        {
          trendingChallenges && trendingChallenges.length > 0
          && <>
            <SwiperComponent
              data={trendingChallenges}
              SlideComponent={ChallengeSwiperSlide}
              swiperModules={{
                navigation: true,
              }}
              swiperProps={{
                spaceBetween: 10,
                slidesPerView: 'auto',
                className: 'trending-challenges-swiper',
                grabCursor: true,
                lazy: true,
                navigation: true,
              }} />
          </>
        }
        {
          !trendingChallenges
          && <>
            <div className="skeleton">
              <div className="d-flex align-items-center skeleton-challenge-container">
                { [1, 2, 3, 4, 5, 6].map((item, index) => (
                  <div key={index} className='skeleton-challenge-card'></div>
                )) }
              </div>
            </div>
          </>
        }
      </div>
    </div>
  </div>
</>;

const LeaderBoardCard = ({ leaderboardData, leaderBoardUserData, className }) => <>
  { <>
    <div className={`dashboard-leaderboard-container dashboard-body-block ${className}`}>
      <div className="sideboard-card card">
        <div className="leaderboard-card-heading">
          <p className='sideboard-heading-text'>
            <FormattedMessage
              defaultMessage={'Leaderboard Rank'}
              description={'leaderboard rank heading'}
            />
          </p>
        </div>
        <div className="leaderboard-card-content">
          {
            !leaderBoardUserData && <>
              <div className="skeleton">
                <div className="sideboard-content-title"></div>
                <div className="sideboard-content-data">
                  {[1, 2, 3].map((item, index) => <div key={index} className="d-flex align-items-center justify-content-between sideboard-row">
                    <div className="sideboard-names"></div>
                  </div>)}
                </div>
              </div>
            </>
          }
          {
            leaderBoardUserData && <>
            <div className="sideboard-content-title">
              <p>
                <span>{`#${leaderBoardUserData.rank || '--'}`}</span>
                <span>
                  <FormattedMessage
                    defaultMessage={'rank'}
                    description={'rank'}
                  />
                </span>
              </p>
            </div>
            <div className="sideboard-content-data">
              {
                leaderboardData && leaderboardData.slice(0, 3).map((item, index) => <div key={index} className={`d-flex align-items-center justify-content-between ${leaderBoardUserData.rank === item.rank ? 'font-weight-bold' : ''}`}>
                    <div className="sideboard-names d-flex align-items-center">
                      <p>{`#${item.rank || '--'}`}</p>
                      <p>{item.name || '--'}</p>
                    </div>
                    <div className='sideboard-rank'>
                      <p>{item.points || '--'}</p>
                    </div>
                  </div>)
              }
              <div className="sideboard-btn-block">
                <Link className='btn btn-block leaderboard-btn' to='/leaderboard'>
                  <FormattedMessage
                    defaultMessage={'Show Leaderboard'}
                    description={'show leaderboard'}
                  />
                </Link>
              </div>
            </div>
            </>
          }
        </div>
      </div>
    </div>
  </> }
</>;

const HeroComponent = memo(HeroContainer);
const ProfileComponent = memo(ProfileContainer);
const GameComponent = memo(GameContainer);
const ChallengesComponent = memo(ChallengesSwiper);
const LeaderBoardCardComponent = memo(LeaderBoardCard);

const Dashboard = () => {
  pageInit('dashboard-container', 'Dashboard');

  const [isDesktop, setIsDesktop] = useState(window.matchMedia('(min-width: 576px)').matches);

  const { state: dashboardState } = useDashboard();
  const { state: leaderBoardState } = useLeaderBoard();
  const { state: getChallengesState } = useGetChallenges();

  const {
    status: dashboarStatus,
    userData: dashboardUserData,
    sessionData,
    gameData,
  } = dashboardState;

  const {
    leaderboardData,
    status: leaderboardStatus,
    userData: leaderBoardUserData,
  } = leaderBoardState;

  const {
    status: challengesStatus,
    trendingChallenges,
  } = getChallengesState;

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
          $('.sheet-btn')
            .html('View more')
            .removeClass('disabled');
        },
      });
    }
  };

  populateScore('#yourScore', gameData.gameProgress, parseInt((gameData.gameProgress / gameData.totalGames) * 100, 10));

  useEffect(() => {
    window.addEventListener('resize', () => {
      setIsDesktop(window.matchMedia('(min-width: 576px)').matches);
    });
    populateScore('#yourScore', gameData.gameProgress, parseInt((gameData.gameProgress / gameData.totalGames) * 100, 10));
  }, []);

  return <>
    <div className='dashboard-block col-12 col-md-11 col-xl-10 mx-auto'>
      <HeroComponent
        isDesktop={isDesktop}
        session={sessionData}
        dashboardUserData={dashboardUserData}
      />
      <div className="dashboard-body row">
        <div className="col-12 col-md-8">
          <ProfileComponent
            dashboardUserData={dashboardUserData}
            isDesktop={isDesktop}
            session={sessionData}
          />
          <GameComponent
            dashboardUserData={dashboardUserData}
            overAllQuestionsCount={gameData.totalGames}
            totalPointsEarned={gameData.totalPointsEarned}
            validSubmissionsCount={gameData.gameProgress} />
        </div>
        {
          isDesktop
          && <>
          <div className="col-md-4 dashboard-sideboard">
            <LeaderBoardCardComponent
              leaderboardData={leaderboardData}
              leaderBoardUserData={leaderBoardUserData} />
          </div>
          </>
        }
        <div className="col-12">
          <ChallengesComponent trendingChallenges={trendingChallenges} />
        </div>
      </div>
    </div>
    {
      !isDesktop
      && <>
        <BottomSheet id='viewMoreSheet'>
          <LeaderBoardCardComponent leaderboardData={leaderboardData} leaderBoardUserData={leaderBoardUserData} className='sheet-card' />
        </BottomSheet>
      </>
    }
    {
      [dashboarStatus, leaderboardStatus, challengesStatus].includes('access_denied')
      && <Modal
        customClass={'curved'}
        options={{
          keyboard: false,
          backdrop: 'static',
        }} >
        <div className="container">
          <p className='text-center my-5'>
            <FormattedMessage
              defaultMessage='Something went wrong. Please try again'
              description='error modal'
            />
          </p>
        </div>
        <button
          className='btn btn-block btn-primary'
          onClick={() => { window.location.reload(); }} >
          <FormattedMessage
            defaultMessage='Try again'
            description='try again btn'
          />
        </button>
      </Modal>
    }
  </>;
};

export default Dashboard;
