import React, { useRef, memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../stylesheets/common/pages/challenges/style.scss';
import { FormattedMessage } from 'react-intl';
import { loginCheck, pageInit } from '../framework';
import Img from '../components/Img';
import SwiperComponent from '../components/SwiperComponent';
import { useGetChallenges, useGetMyChallenges } from '../../../../hooks/pages/challenges';
import Modal from '../components/Modal';

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
  <div className="challenges-container">
    <div className="challenges-heading-container d-flex align-items-end justify-content-between">
      <h5 className="block-heading heading6">
        <FormattedMessage
          defaultMessage={'Trending'}
          description={'trending challenges heading'}
        />
      </h5>
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
              <div className="d-flex align-items-center challenge-skeleton-container">
                { [1, 2, 3, 4, 5, 6].map((item, index) => (
                  <div key={index} className='challenge-skeleton-card'></div>
                )) }
              </div>
            </div>
          </>
        }
      </div>
    </div>
  </div>
</>;

const NewlyTrendingChallenge = ({ challenge }) => (
  <>
    {
      challenge && <div className='newly-trending-challenge-container hero-card'>
      <h5 className='caption-bold text-center title'>
        <FormattedMessage defaultMessage={'Newly Trending'} description='heading' />
      </h5>
      <div className="challenge-img">
        <Img src={challenge.imgPath} local={false} alt={challenge.challengeName} />
      </div>
    </div>
    }
    {
      !challenge && <div className='newly-trending-challenge-skeleton'></div>
    }
  </>
);

const ChallengesActivity = ({ myChallenges }) => (
  <>
    {
      myChallenges && <div className='challenges-activity hero-card'>
      {
        myChallenges[0] && <div className='last-challenge'>
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.72908 9.94814L5.25399 12.4232C4.97852 12.6986 4.62757 12.8862 4.24552 12.9622C3.86347 13.0381 3.46747 12.9991 3.10759 12.8501C2.74771 12.701 2.4401 12.4486 2.22366 12.1247C2.00722 11.8009 1.89166 11.4201 1.8916 11.0306V9.94814L3.02324 4.29079C3.17438 3.53461 3.58285 2.85415 4.17915 2.36518C4.77546 1.87622 5.52275 1.60897 6.29389 1.60889H14.1678C14.939 1.60897 15.6862 1.87622 16.2825 2.36518C16.8789 2.85415 17.2873 3.53461 17.4385 4.29079L18.5701 9.94814V11.0297C18.57 11.4193 18.4545 11.8 18.238 12.1239C18.0216 12.4478 17.714 12.7002 17.3541 12.8492C16.9942 12.9983 16.5982 13.0373 16.2162 12.9613C15.8341 12.8854 15.4832 12.6978 15.2077 12.4224L12.7326 9.94814H7.72908Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className='challenge-name caption'>
            <FormattedMessage
              defaultMessage={'Created "{lastCreatedChallengeName}" challenge'}
              description='last created challenge log'
              values={{ lastCreatedChallengeName: myChallenges[0].challengeName }}
            />
          </span>
          <Link to={'#'} className='open-challenge-btn'>
            <img src='../../../../images/challenges/open-challenge-icon.svg' alt='open-challenge-icon'/>
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
      <Link to={'#'} className='view-your-challenges-text-btn caption-bold'>
        <FormattedMessage defaultMessage={'View your challenges'} description='view your challenges button text'/>
      </Link>
    </div>
    }
    {
      !myChallenges && <div className='challenges-activity-skeleton'>
      </div>
    }
  </>
);

const NewlyTrendingChallengeComponent = memo(NewlyTrendingChallenge);
const ChallengesActivityComponent = memo(ChallengesActivity);
const TrendingChallengesSwiperComponent = memo(ChallengesSwiper);

const Challenges = () => {
  const isPageMounted = useRef(true);
  pageInit('challenges-container', 'Challenges');

  const { state: getChallengesState } = useGetChallenges({ isPageMounted });
  const { state: getMyChallengesState } = useGetMyChallenges({ isPageMounted });

  const {
    status: challengesStatus,
    trendingChallenges,
  } = getChallengesState;

  const {
    status: myChallengesStatus,
    myChallenges,
  } = getMyChallengesState;

  const modalVisible = [myChallengesStatus, challengesStatus].includes('access_denied');

  useEffect(() => {
    loginCheck();
  }, []);

  return <>
  <div className="col-12 col-md-11 col-xl-10 mx-auto">
    <div className='new-trending-challenge-with-last-challenge'>
      <NewlyTrendingChallengeComponent challenge={trendingChallenges[0]} />
       <div className='last-challenge-with-create-challenge-btn'>
          <ChallengesActivityComponent
            myChallenges={myChallenges} />
        <Link to={'#'} className='btn btn-primary btn-block create-your-challenge-btn'>
          <FormattedMessage defaultMessage={'Create a Challenge'} description='create a challenge button text' />
          <i className='fa fa-chevron-right'/>
        </Link>
      </div>
    </div>
      <TrendingChallengesSwiperComponent trendingChallenges={trendingChallenges} />
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
