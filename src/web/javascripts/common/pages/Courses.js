import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import FuzzySearch from 'fuzzy-search';
import { $, pageInit } from '../framework';
import CourseCard, { TopContainer, CustomSwiperComponent } from '../components/courseCard';
import SwiperComponent from '../components/SwiperComponent';
import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss';
import '../../../stylesheets/common/pages/courses/style.scss';
import useCourses from '../../../../hooks/pages/courses';
import Img from '../components/Img';
import BottomSheet from '../components/BottomSheet';

const CourseModule = ({ items, isDesktop }) => (
  <>
    <div className="w-100 mt-4">
      <div className="course-card-container">
        <h5>
        <FormattedMessage
          defaultMessage={'{name} - {type}'}
          description={'course Heading'}
          values={{ name: items.moduleName, type: items.type }}/>
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
      <path
        id="yourScoreProgress"
        strokeLinecap="round"
        strokeWidth="6"
        strokeDasharray="140, 251.2"
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

const CourseDetailsCard = ({ overallProgress, progress }) => (
  <div>
  <div className='progress-card-cont'>
  <div className='overall-progress-cont'>
  <div className='kids-img-cont'>
    <Img
    src='courses/kids.png'/>
  </div>
  <div className='xp-coins-cont'>
    <div className='d-flex align-items-center mr-3'>
    <Img
    src='courses/xp.png'/>
    <h5 className='xp-text'>
      <FormattedMessage
      defaultMessage={'{xp} xp'}
      values={{ xp: overallProgress.xpEarned }}/>
    </h5>
    </div>
    <div className='d-flex align-items-center ml-3'>
    <Img
    src='courses/Coins.png'/>
    <h5 className='xp-text'>
      <FormattedMessage
      defaultMessage={'{coins} coins'}
      values={{ coins: overallProgress.coinsEarned }}/>
    </h5>
    </div>
  </div>
  </div>
  <div className='progress-cont'>
  <div className='circular-progress-container'>
    <CircularProgress
      value={overallProgress.completedCount}
      totalValue={overallProgress.totalVideos} />
  </div>
  {progress && <div className='module-progress-container'>
    <div className='module-card-cont'>
      <img className='module-img' src={progress.thumbnail}/>
      <div>
        <p className='mb-0'><FormattedMessage
      defaultMessage={'{name}'}
      values={{ name: progress.moduleName }}/></p>
        <p className='watched-count'><FormattedMessage
      defaultMessage={'{completed}/{total} watched'}
      values={{ completed: progress.watched, total: progress.totalVideos }}/></p>
      </div>
    </div>
    <div className='module-progress'>
      <div className='d-flex justify-content-around'>
        <div className='d-flex'>
          <Img
            className='module-icons'
            src='../../../../images/common/xp.png' />
          <p className='ml-1'><FormattedMessage
      defaultMessage={'{xp} xp'}
      values={{ xp: progress.xpEarned }}/></p>
        </div>
        <div className='d-flex'>
          <Img
            className='module-icons'
            src='../../../../images/courses/timer.png' />
          <p className='ml-1'><FormattedMessage
      defaultMessage={'{time}'}
      values={{ time: secToMin(progress.watchTime) }}/></p>
        </div>
      </div>
      <div>
        <div className='linear-progress-bar'><div className='progress-done' style={{ width: `${(progress.watched / progress.totalVideos) * 100}%` }}></div></div>
      </div>
    </div>
  </div>}
  </div>
</div>
</div>
);

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
    {progress && progress.map((item, index) => <div
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
  const isPageMounted = React.useRef(true);

  const { courseData } = useCourses({ isPageMounted });

  const {
    moduleData, continueWatching, progress, overallProgress,
  } = courseData;

  const [filteredData, setFilterData] = useState(false);

  const [filter, setFilter] = useState(false);

  const onPressMoreInfo = () => $('#course-progress-modal').modal('show');

  const onChangeFilter = (filterValue) => {
    let prevFilterValue = false;
    setFilter((prev) => {
      prevFilterValue = prev === filterValue ? false : filterValue;
      return prevFilterValue;
    });
    if (prevFilterValue) {
      setFilterData(moduleData.filter((item) => item.type === prevFilterValue));
    } else {
      setFilterData(moduleData);
    }
  };
  const searcher = new FuzzySearch(moduleData, ['moduleName']);
  const onSearch = (e) => {
    const keyword = e.target.value;
    const result = searcher.search(keyword);
    setFilterData(result);
  };

  const isDesktop = window.matchMedia('(min-width: 576px)').matches;
  if (overallProgress) {
    animateTotalCount('#yourScore', overallProgress.completedCount, (overallProgress.completedCount / overallProgress.totalVideos) * 100);
  }
  if (progress && progress.length > 0) {
    animateModuleProgress((progress[0].watched / progress[0].totalVideos) * 100);
  }
  return (
    <>
      {isDesktop && overallProgress && progress.length > 0 && (
        <CourseDetailsCard
          overallProgress={overallProgress}
          progress={progress[0]}
        />
      )}
      {!isDesktop && (
        <TopContainer
          onChangeFilter={onChangeFilter}
          filterSet={filter}
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
      description={'Continue Watching'}/></h5>
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
        : moduleData
          && moduleData.map((eachModule, index) => (
            <CourseModule
              key={index}
              items={eachModule}
              isDesktop={isDesktop}
            />
          ))}
          {!isDesktop && overallProgress && <BottomSheet
          id={'course-progress-modal'}>
            <CourseDetailsCardMobile
      progress={progress}
      overallProgress={overallProgress}/>
            </BottomSheet>}
    </>
  );
};

export default Courses;
