import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import FuzzySearch from 'fuzzy-search';
import { $, pageInit } from '../framework';
import CourseCard, { TopContainer } from '../components/courseCard';
import SwiperComponent from '../components/SwiperComponent';
import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss';
import '../../../stylesheets/common/pages/courses/style.scss';
import useCourses from '../../../../hooks/pages/courses';
import Img from '../components/Img';
import courseCard from '../components/courseCard';

const CustomSwiperComponent = ({
  data, SlideComponent, swiperModules, swiperProps, isDesktop, module,
}) => {
  const modulesList = [];

  if (swiperModules.navigation) modulesList.push(Navigation);

  return (
    <>
      <Swiper
        {...swiperProps}
        modules={modulesList}
      >
        {
          (data.length < 4 || isDesktop) ? data.map((item, index) => (
            <SwiperSlide key={index}>
              <SlideComponent data={item} />
            </SwiperSlide>
          )) : data.map((item, index) => (
            (index < 4) && <SwiperSlide key={index}>
              <SlideComponent data={item} />
            </SwiperSlide>
          ))
        }
        {
          (data.length > 4 && !isDesktop) && <SwiperSlide key={5}>
          <MobileOnlyComponent
          data = {module}
          />
        </SwiperSlide>
        }
      </Swiper>
    </>
  );
};

const MobileOnlyComponent = ({ data }) => (
  <a href={`${window.location.origin}/videos/${data.moduleId}`}>
    <div className='course-card mobile-only-card'>
      <div className='text-center mt-4'>
      <p className='mb-0'>View all {data.moduleName}</p>
      <p className='mb-0'>{data.type}?</p>
      </div>
      <img className='mobile-play-btn' src='../../../../../images/courses/play-btn.png' />
    </div>
  </a>
);

const CourseModule = ({ items, isDesktop }) => <>
  <div className='w-100 mt-4'>
    <div className='course-card-container'>
      <h5>{items.moduleName} - {items.type}</h5>
      <CustomSwiperComponent
        data={items.videos}
        SlideComponent={CourseCard}
        // MobileOnlyComponent = {MobileOnlyComponent}
        swiperModules={{
          navigation: true,
        }}
        module={items}
        isDesktop = {isDesktop}
        swiperProps={{
          spaceBetween: 16,
          slidesPerView: 'auto',
          className: 'course-swiper',
          grabCursor: true,
          lazy: true,
          navigation: true,
        }} />
    </div>
  </div>
</>;

const CircularProgress = ({ value, totalValue }) => (
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
          <tspan>{value}</tspan>
          <tspan>/{totalValue}</tspan>
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
);

const animateTotalCount = (selectorPrefix, score, percentage) => {
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

const secToMin = (time) => ((time > 50) ? `${Math.floor(time / 60)} mins` : `${time} sec`);

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
      <img className='module-img' src='https://s3.ap-south-1.amazonaws.com/guvi-2.0/course-thumbnail/javascript.png'/>
      <div>
        <p className='mb-0'><FormattedMessage
      defaultMessage={'{name}'}
      values={{ name: progress.moduleName }}/></p>
        <p className='mb-0'><FormattedMessage
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
            src='../../../../images/courses/timer.svg' />
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
    $({ percent: 0 }).animate({
      percent,
    }, {
      duration: 1500,
      easing: 'linear',
      step: (val, fx) => {
        if (fx.prop === 'percent') {
          $('.progress-done').width(`${val}%`);
        }
      },
    });
  }
};

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

  const onChangeFilter = (filterValue) => {
    let prevFilterValue = false;
    setFilter((prev) => {
      prevFilterValue = ((prev === filterValue) ? false : filterValue);
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
  return <>
  {(isDesktop && overallProgress) && <CourseDetailsCard
  overallProgress={overallProgress}
  progress={progress[0]}
  />}
  {!isDesktop && <TopContainer
  onChangeFilter = {onChangeFilter}
  filterSet = {filter}
  searchOnChange={onSearch}
  />}
 {continueWatching && <div className='w-100 mt-4'>
    <div className='course-card-container'>
      <h5>Continue Watching</h5>
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
        }} />
    </div>
  </div>}
  {filteredData ? filteredData.map((eachModule, index) => <CourseModule
      key={index}
      items={eachModule}
      isDesktop={isDesktop} />) : moduleData && moduleData.map((eachModule, index) => <CourseModule
        key={index}
        items={eachModule}
        isDesktop={isDesktop} />)}
  </>;
};

export default Courses;
