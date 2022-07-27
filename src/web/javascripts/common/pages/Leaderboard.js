import React from 'react';
import { FormattedMessage } from 'react-intl';
import { pageInit } from '../framework';
import '../../../stylesheets/common/pages/leaderboard/style.scss';

const Leaderboard = () => {
  pageInit('leaderboard-container', 'Leaderboard');
  return (
  <div className='wrapper'>
    <div className='controls-container'>
      <div className='control-with-icon filter-btn-container'>
        <img className='icon' src='../../../../images/leaderboard/filter-icon-svg.svg' alt='filter-icon'/>
        <button className='btn filter-btn control caption-bold'>
          <FormattedMessage defaultMessage='Filter' description='Filter button'/>
        </button>
      </div>
      <div className='control-with-icon search-box-container'>
        <img className='icon' src='../../../../images/leaderboard/search-icon-svg.svg' alt='filter-icon'/>
        <input className='search-box form-control control caption-bold' name='search' type={'search'} placeholder='Search' />
      </div>
    </div>
    <table className='leaderboard-table'>
      <tr>
        <th>Rank</th>
        <th>Student Name</th>
        <th>Coins</th>
        <th>XP</th>
      </tr>
    </table>
    </div>
  );
};

export default Leaderboard;
