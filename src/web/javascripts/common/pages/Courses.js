import React from 'react';
import '../../../stylesheets/common/pages/courses/style.scss';
import { pageInit } from '../framework';

const Courses = () => {
  if (window.location.href.includes('courses')) {
    pageInit('courses-container', 'Courses');
  }

  return <>
  <div>
    <div>
      Courses
    </div>
  </div>
  </>;
};

export default Courses;
