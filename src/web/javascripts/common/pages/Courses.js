import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import FuzzySearch from 'fuzzy-search';
import {
  $, isFeatureEnabled, loginCheck, pageInit, timeTrack,
} from '../framework';
import CourseCard, { TopContainer, CustomSwiperComponent } from '../components/courseCard';
import SwiperComponent from '../components/SwiperComponent';
import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss';
import '../../../stylesheets/common/pages/courses/style.scss';
import useCourses from '../../../../hooks/pages/courses';
import Img from '../components/Img';
import BottomSheet from '../components/BottomSheet';
import useVideos from '../../../../hooks/pages/videos';
import { SubscriptionContext } from '../../../../hooks/pages/root';

const CourseModule = ({ items, isDesktop }) => (
  <>
    <div className="course-card-container">
      <h5>
        <FormattedMessage
          // defaultMessage={'{name} - {type}'}
          defaultMessage={'{modName}'}
          description={'course Heading'}
          // values={{ name: items.moduleName, type: items.type }}
          values={{
            modName: `${items.moduleName} ${items?.type ? ` - ${items.type}` : ''}`,
          }}
        />
      </h5>
      <CustomSwiperComponent
        data={items.videos}
        SlideComponent={CourseCard}
        swiperModules={{
          navigation: true,
        }}
        module={items}
        isDesktop={isDesktop}
        swiperProps={{
          spaceBetween: 16,
          slidesPerView: 'auto',
          className: 'course-swiper',
          grabCursor: true,
          lazy: true,
          navigation: true,
        }}
      />
    </div>
  </>
);

const CircularProgress = ({ value, totalValue }) => (
  <div className="circle-progress">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="yourScoreAnimated"
      viewBox="0 0 100 100">
      <linearGradient id="gradient">
        <stop offset="0%" className="start" />
        <stop offset="90%" className="end" />
      </linearGradient>
      <path id="progressPlaceHolder" strokeLinecap="round" strokeWidth="6" strokeDasharray="251.2, 251.2" className="progress-bar-placeholder"
        d="M50 10
                a 40 40 0 0 1 0 80
                a 40 40 0 0 1 0 -80">
      </path>
      <path
        id="yourScoreProgress"
        strokeLinecap="round"
        strokeWidth="6"
        strokeDasharray="0, 251.2"
        className="progress-bar"
        d="M50 10
                            a 40 40 0 0 1 0 80
                            a 40 40 0 0 1 0 -80"></path>
      <g transform="translate(50,45)">
        <text
          id="yourScoreCount"
          x="0"
          y="0"
          alignmentBaseline="middle"
          textAnchor="middle"
          dy="1"
          fontSize="14">
          <tspan>{value}</tspan>
          <tspan>/{totalValue}</tspan>
        </text>
        <text
          id="yourScore"
          x="0"
          y="15"
          alignmentBaseline="middle"
          textAnchor="middle"
          dy="1"
          fontSize="10">
          <FormattedMessage
            defaultMessage={'completed'}
            description={'completed'}
          />
        </text>
      </g>
    </svg>
  </div>
);

const animateTotalCount = (selectorPrefix, score, percentage) => {
  if (score) {
    $({ Counter: 0, percent: 0 }).animate(
      {
        Counter: score,
        percent: percentage,
      },
      {
        duration: 1500,
        easing: 'linear',
        step: (val, fx) => {
          if (fx.prop === 'Counter') {
            $(`${selectorPrefix}Count tspan:first-child`).text(Math.ceil(val));
          }
          if (fx.prop === 'percent') {
            $(`${selectorPrefix}Progress`).attr(
              'stroke-dasharray',
              `${val * 251.2 * 0.01}, 251.2`,
            );
          }
        },
        complete: () => {
          $('.sheet-btn').html('View more').removeClass('disabled');
        },
      },
    );
  }
};

const secToMin = (time) => (time > 60 ? `${Math.floor(time / 60)} mins` : `${time} sec`);

const ProgressDesktopCard = ({ progress }) => <div className='module-progress-container'>
  <div className='module-card-cont'>
    <img
      className='module-img'
      src={progress.thumbnail}
    />
    <div>
      <p className='mb-0'><FormattedMessage
        defaultMessage={'{name}'}
        values={{ name: progress.moduleName }} /></p>
      <p className='watched-count'><FormattedMessage
        defaultMessage={'{completed}/{total} watched'}
        values={{ completed: `${progress.watched ? progress.watched : 0}`, total: progress.totalVideos }} /></p>
    </div>
  </div>
  <div className='module-progress'>
    <div className='d-flex justify-content-around'>
      {/* <div className='d-flex'>
      <Img
        className='module-icons'
        src='../../../../images/common/xp.png' />
      <p className='ml-1'><FormattedMessage
  defaultMessage={'{xp} xp'}
  values={{ xp: progress.xpEarned }}/></p>
    </div> */}
      <div className='d-flex mb-2'>
        <Img
          className='module-icons'
          src='../../../../images/courses/timer.png' />
        <p className='ml-1 mb-0'><FormattedMessage
          defaultMessage={'{time}'}
          values={{ time: secToMin(progress.watchTime) }} /></p>
      </div>
    </div>
    <div>
      <div className='linear-progress-bar'><div className='progress-done' style={{ width: `${(progress.watched / progress.totalVideos) * 100}%` }}></div></div>
    </div>
  </div>
</div>;

const CourseDetailsCard = ({ overallProgress, progress, moduleData }) => {
  const dummyData = { ...progress };
  if (moduleData.length > 0) {
    dummyData.totalVideos = moduleData[0].totalVideos;
    dummyData.thumbnail = moduleData[0].thumbnail;
    dummyData.moduleName = moduleData[0].moduleName;
  }
  dummyData.watched = 0;
  dummyData.xpEarned = 0;
  dummyData.watchTime = 0;

  let profileLink = window.localStorage.getItem('profileLink');
  if (!profileLink || profileLink === '') {
    profileLink = '../../../../images/profile/default_user.png';
  }

  return (
    <div>
      <div className='progress-card-cont'>
        <div className='overall-progress-cont col-6 col-sm-4'>
          <div className='kids-img-cont '>
            <div className="hero-card-img"
              style={{ backgroundImage: `url(${profileLink})` }}></div>
          </div>
          <div className='xp-coins-cont'>
            {/* <div className='d-flex align-items-center mr-3'>
          <Img
          src='courses/xp.png'/>
          <h5 className='xp-text'>
            <FormattedMessage
            defaultMessage={'{xp} xp'}
            values={{ xp: overallProgress.xpEarned }}/>
          </h5>
          </div> */}
            <div className='d-flex align-items-center ml-3'>
              <Img
                src='courses/Coins.png' />
              <h5 className='xp-text'>
                <FormattedMessage
                  defaultMessage={'{coins} coins'}
                  values={{ coins: overallProgress.coinsEarned }} />
              </h5>
            </div>
          </div>
        </div>
        <div className='progress-cont col-6 col-sm-8'>
          <div className='circular-progress-container'>
            <CircularProgress
              value={overallProgress.completedCount}
              totalValue={overallProgress.totalVideos} />
          </div>
          {(progress && progress.length > 0) ? <ProgressDesktopCard
            progress={progress[0]} /> : <ProgressDesktopCard
            progress={dummyData} />}
        </div>
      </div>
    </div>
  );
};

const animateModuleProgress = (percent) => {
  if (percent) {
    $({ percent: 0 }).animate(
      {
        percent,
      },
      {
        duration: 1500,
        easing: 'linear',
        step: (val, fx) => {
          if (fx.prop === 'percent') {
            $('.progress-done').width(`${val}%`);
          }
        },
      },
    );
  }
};

const CourseDetailsCardMobile = ({ progress, overallProgress }) => (
  <div className="course-details-mobile">
    {overallProgress && <div className="overall-mobile-cont">
      <div className="circular-progress-container-mobile">
        <CircularProgress value={overallProgress.completedCount}
          totalValue={overallProgress.totalVideos} />
      </div>
      <div>
        <div className="d-flex align-items-center mb-3">
          <Img src="courses/xp.png" />
          <div className="ml-4">
            <p className="xp-title">
              <FormattedMessage defaultMessage={'Coins Earned:'} />
            </p>
            <p className="mb-0">
              <FormattedMessage
                defaultMessage={'{coins}'}
                values={{ coins: overallProgress.coinsEarned }}
              />
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <Img src="courses/Coins.png" />
          <div className="ml-4">
            <p className="xp-title">
              <FormattedMessage defaultMessage={'XP Earned:'} />
            </p>
            <p className="mb-0">
              <FormattedMessage defaultMessage={'{xp}'} values={{ xp: overallProgress.xpEarned }} />
            </p>
          </div>
        </div>
      </div>
    </div>}
    {(progress && progress.length > 0) && progress.map((item, index) => <div
      key={index}
      className="module-progress-container">
      <div className="module-card-cont">
        <img
          className="module-img"
          src={item.thumbnail}
        />
        <div>
          <p className="mb-0">
            <FormattedMessage
              defaultMessage={'{name}'}
              values={{ name: item.moduleName }}
            />
          </p>
          <p className="mb-0 watched-count">
            <FormattedMessage
              defaultMessage={'{completed}/{total} watched'}
              values={{
                completed: item.watched,
                total: item.totalVideos,
              }}
            />
          </p>
        </div>
      </div>
      <div className="module-progress">
        <div className="d-flex justify-content-around">
          <div className="d-flex">
            <Img
              className="module-icons"
              src="common/xp.png"
            />
            <p className="ml-1">
              <FormattedMessage defaultMessage={'{xp} xp'} values={{ xp: item.xpEarned }} />
            </p>
          </div>
          <div className="d-flex">
            <Img
              className="module-icons"
              src="courses/timer.svg"
            />
            <p className="ml-1">
              <FormattedMessage
                defaultMessage={'{time}'}
                values={{ time: secToMin(item.watchTime) }}
              />
            </p>
          </div>
        </div>
        <div>
          <div className="linear-progress-bar">
            <div
              className="progress-done"
              style={{
                width: `${(5 / 12) * 100}%`,
              }}></div>
          </div>
        </div>
      </div>
    </div>)}
  </div>
);

const Courses = () => {
  if (window.location.href.includes('courses')) {
    pageInit('courses-container', 'Courses');
  }

  timeTrack('courses');
  const isPageMounted = React.useRef(true);

  const { courseData } = useCourses({ isPageMounted });

  const {
    moduleData, continueWatching, progress, overallProgress,
  } = courseData;

  const { timeActivity } = useVideos(
    { isPageMounted },
  );

  useEffect(() => {
    loginCheck();
    const previousVideoData = localStorage.getItem('videoData');

    if (previousVideoData) {
      const videoData = JSON.parse(previousVideoData);
      timeActivity({ videoData });
      localStorage.removeItem('videoData');
    }
  }, []);

  const [lockedData, setLockedData] = useState(false);

  const { subscriptionData } = React.useContext(SubscriptionContext);

  const coursesLimit = (category) => {
    const coursesEnabled = isFeatureEnabled(subscriptionData, 'courses', category);
    return coursesEnabled.enabled && coursesEnabled[category];
  };

  useEffect(() => {
    if (moduleData) {
      moduleData.forEach((item, index) => {
        const moduleLimit = coursesLimit(item.moduleId);
        if (moduleLimit) {
          item.videos.forEach((video, videoIndex) => {
            if (videoIndex >= moduleLimit) {
              moduleData[index].videos[videoIndex].locked = true;
            }
          });
        }
      });
      setLockedData(moduleData);
    }
  }, [moduleData]);

  const [filteredData, setFilterData] = useState(false);

  // const [filter, setFilter] = useState(false);

  const onPressMoreInfo = () => $('#course-progress-modal').modal('show');

  // const onChangeFilter = (filterValue) => {
  //   let prevFilterValue = false;
  //   setFilter((prev) => {
  //     prevFilterValue = prev === filterValue ? false : filterValue;
  //     return prevFilterValue;
  //   });
  //   if (prevFilterValue) {
  //     setFilterData(lockedData.filter((item) => item.type === prevFilterValue));
  //   } else {
  //     setFilterData(lockedData);
  //   }
  // };
  const searchers = {};

  if (lockedData) {
    lockedData.forEach((module) => {
      const searcher = new FuzzySearch(module.videos, ['title']);

      searchers[module.moduleId] = searcher;
    });
  }

  const onSearch = (e) => {
    const { value: keyword } = e.target;

    if (keyword === '' || !keyword) {
      setFilterData(false);
    } else if (Object.keys(searchers).length) {
      const searchResults = {};
      Object.keys(searchers).forEach((moduleId) => {
        const searcher = searchers[moduleId];
        const searchResult = searcher.search(keyword);

        searchResults[moduleId] = searchResult;
      });

      const newLockedData = lockedData.map((module) => {
        if (searchResults[module.moduleId] !== undefined) {
          const newModule = { ...module };
          newModule.videos = searchResults[module.moduleId];

          return newModule;
        }
        return module;
      });

      setFilterData(newLockedData);
    }
  };

  const isDesktop = window.matchMedia('(min-width: 726px)').matches;
  if (overallProgress) {
    animateTotalCount('#yourScore', overallProgress.completedCount, (overallProgress.completedCount / overallProgress.totalVideos) * 100);
  }
  if (progress && progress.length > 0) {
    animateModuleProgress((progress[0].watched / progress[0].totalVideos) * 100);
  }

  React.useEffect(() => () => {
    isPageMounted.current = false;
  }, []);

  return (
    <>
      <div className="col-12 col-md-11 col-xl-10 mx-auto courses-body-container">
        {isDesktop && overallProgress && (
          <CourseDetailsCard
            overallProgress={overallProgress}
            progress={progress}
            moduleData={moduleData}
          />
        )}
        {!isDesktop && (
          <TopContainer
            // onChangeFilter={onChangeFilter}
            // filterSet={filter}
            searchOnChange={onSearch}
            pressMoreInfo={onPressMoreInfo}
          />
        )}
        {continueWatching && continueWatching.length > 0 && (
          <div className="w-100 mt-4">
            <div className="course-card-container">
              <h5>
                <FormattedMessage
                  defaultMessage={'Continue Watching'}
                  description={'Continue Watching'} /></h5>
              <SwiperComponent
                data={continueWatching}
                SlideComponent={CourseCard}
                swiperModules={{
                  navigation: true,
                }}
                swiperProps={{
                  spaceBetween: 16,
                  slidesPerView: 'auto',
                  className: 'course-swiper',
                  grabCursor: true,
                  lazy: true,
                  navigation: true,
                }}
              />
            </div>
          </div>
        )}
        {filteredData
          ? filteredData.map((eachModule, index) => (
            <CourseModule
              key={index}
              items={eachModule}
              isDesktop={isDesktop}
            />
          ))
          : lockedData
          && lockedData.map((eachModule, index) => (
            <CourseModule
              key={index}
              items={eachModule}
              isDesktop={isDesktop}
            />
          ))}
        {!isDesktop && overallProgress && progress.length > 0 && <BottomSheet
          id={'course-progress-modal'}>
          <CourseDetailsCardMobile
            progress={progress}
            overallProgress={overallProgress} />
        </BottomSheet>}
      </div>
    </>
  );
};

export default Courses;
