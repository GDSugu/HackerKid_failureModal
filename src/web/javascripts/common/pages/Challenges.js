import React, {
  useRef, memo, useEffect, useState,
} from 'react';
import { Link } from 'react-router-dom';
import '../../../stylesheets/common/pages/challenges/style.scss';
import { FormattedMessage } from 'react-intl';
import { loginCheck, pageInit } from '../framework';
import Img from '../components/Img';
import SwiperComponent from '../components/SwiperComponent';
import { useGetAttemptedChallenges, useGetChallenges, useGetMyChallenges } from '../../../../hooks/pages/challenges';
import Modal from '../components/Modal';
import { useDashboard } from '../../../../hooks/pages/dashboard';

const HeroContainer = ({
  dashboardUserData,
  isDesktop,
  session,
  NewlyTrendingChallengeComponent,
  ChallengesActivityComponent,
}) => {
  let profileImg = '../../../../images/profile/default_user.png';
  if (session && dashboardUserData) {
    profileImg = (session.profileLink ? session.profileLink : dashboardUserData.profileImage)
      .toString()
      .replace(/(updatedAt=(\d+))/g, `updatedAt=${Date.now() / 1000}`);
  }

  return <>
    {
      isDesktop && <div className='hero-card'>
      <div className='hero-card-data col-6 col-sm-4'>
        <div className="hero-card-img"
            style={(session.profileLink || dashboardUserData.profileImage)
              ? { backgroundImage: `url(${profileImg})` }
              : {}
          }></div>
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
      </div>
      <div className="hero-card-nav col-6 col-sm-8">
        <div className='hero-nav-cards-container'>
          <NewlyTrendingChallengeComponent />
          <div className='last-challenge-with-create-challenge-btn'>
            <ChallengesActivityComponent />
            <Link to={'#'} className='btn btn-primary btn-block create-challenge-btn'>
              <FormattedMessage defaultMessage={'Create a Challenge'} description='create a challenge button text' />
              <i className='fa fa-chevron-right'/>
            </Link>
          </div>
        </div>
      </div>
    </div>
    }
    {
      !isDesktop
      && <div className='mobile-hero-card'>
      <h6 className='heading6 page-title'>
        <FormattedMessage defaultMessage={'Challenges'} description='page title'/>
      </h6>
      {
        !isDesktop && (!dashboardUserData || !session) && <div className='mobile-hero-card-skeleton'></div>
      }
      {
        !isDesktop && (dashboardUserData && session)
        && <div className='game-stat-container'>
        <div className='game-stat'>
          <Img className='game-stat-icon' src='common/hkcoin.png' />
          <span className='game-stat-text body'>
            <FormattedMessage defaultMessage={'{totalEarnedCoins}'} description={'total earned coins'} values={{
              totalEarnedCoins: session.pointsEarned || '--',
            }} />
          </span>
        </div>
      </div>
      }
      <Link to={'#'} className='btn btn-primary btn-block create-challenge-btn'>
        <FormattedMessage defaultMessage={'Create a Challenge'} description='create a challenge button text' />
        <i className='fa fa-chevron-right'/>
      </Link>
    </div>
    }
  </>;
};

const ChallengeSwiperSlide = ({ data, showChallengeAuthorName }) => <>
  <Link className='challenge-item' to={data.actionUrl}>
    <div className="challenge-block">
      <div className="challenge-img">
        <img src={data.imgPath} alt={data.challengeName} />
      </div>
      <div className="challenge-title">
        <p>{data.challengeName || '--'}</p>
      </div>
      {
        showChallengeAuthorName && <div className="challenge-author">
        <p>{`by ${data.creatorName || '--'}`}</p>
      </div>
      }
    </div>
  </Link>
</>;

const NavigationSlide = ({ to, navigationText }) => <>
  <Link to={to} className='navigation-slide'>
    <FormattedMessage defaultMessage={'{navigationText}'} description='navigation slide text' values={{
      navigationText,
    }}/>
  </Link>
</>;

const ChallengesSwiper = ({
  challenges, swiperClassName = '', swiperHeading, totalNumberOfSlides, NavigationSlideComponent = false,
  showChallengeAuthorName = true,
}) => (
  <div>
    {
      challenges && challenges.length > 0
      && <div className="challenges-container">
      <div className="challenges-heading-container d-flex align-items-end justify-content-between">
        <h5 className="block-heading heading6">
          <FormattedMessage
            defaultMessage={'{swiperHeading}'}
            description={'swiper heading'}
            values={{ swiperHeading }}
          />
        </h5>
      </div>
      <div className="challenges-block">
        <div className="row no-gutters">
          <SwiperComponent
            data={challenges}
            SlideComponent={({ data }) => <ChallengeSwiperSlide
                  data={data} showChallengeAuthorName={showChallengeAuthorName} />}
            LastSlideComponent={NavigationSlideComponent}
            swiperModules={{
              navigation: true,
            }}
            swiperProps={{
              spaceBetween: 10,
              slidesPerView: 'auto',
              className: `challenges-swiper ${swiperClassName}`,
              grabCursor: true,
              lazy: true,
              navigation: true,
            }} />
        </div>
      </div>
    </div>
    }
    {
      !challenges && <div className="challenges-container">
      <div className="challenges-heading-container d-flex align-items-end justify-content-between">
        <h5 className="block-heading heading6">
          <FormattedMessage
            defaultMessage={'{swiperHeading}'}
            description={'swiper heading'}
            values={{ swiperHeading }}
          />
        </h5>
      </div>
      <div className="challenges-block">
        <div className="row no-gutters">
          {
              !challenges
              && <>
                <div className="skeleton">
                  <div className="d-flex align-items-center challenge-skeleton-container">
                    { new Array(totalNumberOfSlides).fill(1).map((item, index) => (
                      <div key={index} className='challenge-skeleton-card'></div>
                    )) }
                  </div>
                </div>
              </>
            }
          </div>
      </div>
    </div>
    }
  </div>
);

const NewlyTrendingChallenge = ({ challenge }) => (
  <>
    {
      challenge && <div className='newly-trending-challenge-container hero-nav-card'>
      <h5 className='caption-bold text-center title'>
        <FormattedMessage defaultMessage={'Newly Trending'} description='heading' />
      </h5>
      <div className="challenge-img">
        <img src={challenge.imgPath} alt={challenge.challengeName} />
      </div>
    </div>
    }
    {
      !challenge && <div className='newly-trending-challenge-skeleton'></div>
    }
  </>
);

const ChallengesActivity = ({ myChallenges }) => <>
    {
      myChallenges && <div className='challenges-activity hero-nav-card'>
        {
          myChallenges[0] && <div className='last-challenge'>
            <img className='icon' src='../../../../images/challenges/joystick-icon.svg' alt='joystick-icon'/>
            <span className='challenge-name caption'>
              <FormattedMessage
                defaultMessage={'Created "{lastCreatedChallengeName}" challenge'}
                description='last created challenge log'
                values={{ lastCreatedChallengeName: myChallenges[0].challengeName }}
              />
            </span>
            <Link to={myChallenges[0].actionUrl} className='open-challenge-btn'>
              <img className='icon' src='../../../../images/challenges/open-challenge-icon.svg' alt='open-challenge-icon' />
            </Link>
          </div>
        }
        {
          !myChallenges[0]
          && <div className='last-challenge'>
            <span className='caption'>
              <FormattedMessage
                defaultMessage={'No challenges published yet !'}
                description='last created challenge log' />
            </span>
          </div>
        }
        <Link to={'/your-challenges'} className='view-your-challenges-text-btn caption-bold'>
          <FormattedMessage defaultMessage={'View your challenges'} description='view your challenges button text' />
        </Link>
      </div>
    }
    {
      !myChallenges && <div className='challenges-activity-skeleton'>
      </div>
    }
  </>;

const HeroComponent = memo(HeroContainer);
const NewlyTrendingChallengeComponent = memo(NewlyTrendingChallenge);
const ChallengesActivityComponent = memo(ChallengesActivity);
const ChallengesSwiperComponent = memo(ChallengesSwiper);

const Challenges = () => {
  const isPageMounted = useRef(true);
  const numberOfChallengesSlideToShow = 7;
  pageInit('challenges-container', 'Challenges');

  const [isDesktop, setIsDesktop] = useState(window.matchMedia('(min-width: 768px)').matches);

  const {
    state: getChallengesState,
    static: { getChallenges },
  } = useGetChallenges({ initializeData: false, isPageMounted });
  const { state: getMyChallengesState } = useGetMyChallenges({ isPageMounted });
  const { state: getAttemptedChallengesState } = useGetAttemptedChallenges({ isPageMounted });
  const { state: getDashboardUserState } = useDashboard({ isPageMounted });

  const {
    status: challengesStatus,
    trendingChallenges,
  } = getChallengesState;

  const {
    status: attemptedChallengesStatus,
    attemptedChallenges,
  } = getAttemptedChallengesState;

  const {
    status: myChallengesStatus,
    myChallenges,
  } = getMyChallengesState;

  const {
    status: dashboardUserDataStatus,
    userData: dashboardUserData,
    sessionData,
  } = getDashboardUserState;

  const modalVisible = [myChallengesStatus, challengesStatus, dashboardUserDataStatus, attemptedChallengesStatus].includes('access_denied');

  useEffect(() => {
    loginCheck();

    window.addEventListener('resize', () => {
      setIsDesktop(window.matchMedia('(min-width: 768px)').matches);
    });

    return () => {
      isPageMounted.current = false;
    };
  }, []);

  useEffect(() => {
    getChallenges({ cached: false });
  }, []);

  return <>
  <div className="col-12 col-md-11 col-xl-10 mx-auto">
      <HeroComponent
        isDesktop={isDesktop}
        dashboardUserData={dashboardUserData}
        session={sessionData}
        NewlyTrendingChallengeComponent={
          () => <NewlyTrendingChallengeComponent challenge={trendingChallenges[0]} />
        }
        ChallengesActivityComponent={
          () => <ChallengesActivityComponent myChallenges={myChallenges} />
        }
      />
      <ChallengesSwiperComponent
        showChallengeAuthorName={false}
        swiperClassName='my-challenges-swiper'
        swiperHeading='My Challenges'
        totalNumberOfSlides={numberOfChallengesSlideToShow}
        challenges={myChallenges.length >= numberOfChallengesSlideToShow
          ? myChallenges.slice(0, numberOfChallengesSlideToShow) : myChallenges}
        NavigationSlideComponent={() => <NavigationSlide to={'/your-challenges'} navigationText='View My Challenges'/>}
      />
      <ChallengesSwiperComponent
        swiperClassName='continue-challenges-swiper'
        swiperHeading='Continue'
        totalNumberOfSlides={numberOfChallengesSlideToShow}
        challenges={attemptedChallenges.length >= numberOfChallengesSlideToShow
          ? attemptedChallenges.slice(0, numberOfChallengesSlideToShow) : attemptedChallenges}
        NavigationSlideComponent={() => <NavigationSlide to={'/all-challenges'} navigationText='View All Challenges'/>}
      />
      <ChallengesSwiperComponent
        swiperClassName='trending-challenges-swiper'
        swiperHeading='Trending'
        totalNumberOfSlides={numberOfChallengesSlideToShow}
        challenges={trendingChallenges.length >= numberOfChallengesSlideToShow
          ? trendingChallenges.slice(0, numberOfChallengesSlideToShow) : trendingChallenges}
        NavigationSlideComponent={() => <NavigationSlide to={'/all-challenges'} navigationText='View All Challenges'/>}
      />
    </div>
    {
      modalVisible
      && <Modal
        modalClass='errorModal'
        customClass={'curved'}
        modalVisible={modalVisible}
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

export default Challenges;
