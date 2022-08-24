import React from 'react';
import '../../../stylesheets/common/pages/challenges/style.scss';
import { pageInit } from '../framework';

const Challenges = () => {
  pageInit('challenges-container', 'Challenges');

  return <>
  <div className='w-100 mt-5'>
    <h4 className='text-center text-secondary'>Challenges</h4>
    <h4 className='text-center text-secondary'>Coming Soon...</h4>
  </div>
  </>;
};

export default Challenges;
