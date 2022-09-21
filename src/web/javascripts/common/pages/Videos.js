import React from 'react';
import { FormattedMessage } from 'react-intl';
import { $, pageInit } from '../framework';
import CourseCard from '../components/courseCard';
import SwiperComponent from '../components/SwiperComponent';
import '../../../stylesheets/common/pages/courses/style.scss';
import useCourses from '../../../../hooks/pages/courses';
import Img from '../components/Img';

const Videos = () => {
  if (window.location.href.includes('videos')) {
    pageInit('courses-container', 'Courses');
  }

  return (
    <div>

    </div>
  );
};

export default Videos;
