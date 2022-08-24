import React from 'react';
import '../../../stylesheets/common/pages/courses/style.scss';
import { pageInit } from '../framework';

const Courses = () => {
  if (window.location.href.includes('courses')) {
    pageInit('courses-container', 'Courses');
  }

  return <>
  <div className='w-100 mt-5'>
    <h4 className='text-center text-secondary'>Courses</h4>
    <h4 className='text-center text-secondary'>Coming Soon...</h4>
  </div>
  </>;
};

export default Courses;
