import React from 'react';
import { FormattedMessage } from 'react-intl';
import { $, pageInit } from '../framework';
import CourseCard from '../components/courseCard';
import SwiperComponent from '../components/SwiperComponent';
import '../../../stylesheets/common/pages/courses/style.scss';
import useCourses from '../../../../hooks/pages/courses';
import Img from '../components/Img';

const CourseModule = ({ items }) => <>
  <div className='w-100 mt-4'>
    <div className='course-card-container'>
      <h5>{items.moduleName}</h5>
      <SwiperComponent
        data={items.videos}
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

const CourseDetailsCard = ({ module }) => (
  <div className='p-3 bg-white'>
  <div className='module-progress-container'>
    <div>
      <Img
        src='' />
      <div>
        <h6>Zombieland Videos</h6>
        <p>60/100 watched</p>
      </div>
    </div>
    <div className=''>
      <div className='d-flex justify-content-around'>
        <div className='d-flex'>
          <Img
            className='module-icons'
            src='../../../../images/common/xp.png' />
          <p className='ml-1'>12345 xp</p>
        </div>
        <div className='d-flex'>
          <Img
            className='module-icons'
            src='../../../../images/courses/timer.svg' />
          <p className='ml-1'>12 min</p>
        </div>
      </div>
      <div>
        <div className='linear-progress-bar'><div className='progress-done'></div></div>
      </div>
    </div>
  </div>
  <div className='circular-progress-container'>
    <CircularProgress
      value={1}
      totalValue={10} />
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

  const { moduleData } = courseData;

  return <>
  <CourseDetailsCard
  />
    {moduleData && moduleData.map((eachModule, index) => <CourseModule
      key={index}
      items={eachModule} />)}
  </>;
};

export default Courses;
