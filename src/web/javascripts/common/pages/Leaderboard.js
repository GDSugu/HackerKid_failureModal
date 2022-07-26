import React from 'react';
import { FormattedMessage } from 'react-intl';
import { pageInit } from '../framework';
import '../../../stylesheets/common/pages/leaderboard/style.scss';
import { useLeaderBoard } from '../../../../hooks/pages/leaderboard';
import Img from '../components/Img';
import Modal from '../components/Modal';

const Leaderboard = () => {
  pageInit('leaderboard-container', 'Leaderboard');

  const { state, getLeaderBoardData } = useLeaderBoard(true);

  return (
  <div className='wrapper col-12 col-md-10 col-lg-9 col-xl-5 mx-auto'>
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
    <table className='skeleton leaderboard-table'>
      <thead>
        <tr>
          <th className='rank-header-cell'>
            <FormattedMessage
              defaultMessage={'Rank'}
              description='Rank table cell header'/>
          </th>
            <th className='student-name-header-cell'>
              <FormattedMessage
              defaultMessage={"Student's Name"}
              description='Student Name cell header' />
            </th>
          <th className='coins-header-cell'>
            <FormattedMessage
              defaultMessage={'Coins'}
              description='Coins cell header' />
          </th>
        </tr>
      </thead>
      <tbody>
      {
        (!state.leaderboardData) && new Array(10).fill().map((obj, index) => (
          <tr key={index}>
            <td className='rank-cell'>
              <div></div>
            </td>
            <td className='name-with-picture-cell'>
              <div className='name-with-profile-picture'>
                <div className='profile-picture'></div>
                <div className='name'></div>
              </div>
            </td>
            <td className='coins-cell'>
              <div></div>
            </td>
          </tr>
        ))
      }
      {
        (state.leaderboardData) && state.leaderboardData.map((obj, index) => <tr key={index}>
        <td>
          <FormattedMessage
          defaultMessage='{rank}'
          description='rank'
          values = {{ rank: obj.rank ? `#${obj.rank}` : '--' }}/>
        </td>
        <td>
          <div className='name-with-profile-picture'>
            <Img className='profile-picture'
              alt={obj.name}
              src={(obj.profileImage) || 'common/profile/default_user.png'}
              local={!(obj.profileImage)}
            />
            <FormattedMessage
              defaultMessage='{name}'
              description='name'
              values = {{ name: obj.name }}/>
          </div>
        </td>
        <td>
          <FormattedMessage
          defaultMessage='{coins}'
          description='Coins'
          values = {{ coins: obj.points || '--' }}/>
        </td>
      </tr>)
      }
      </tbody>
    </table>
    <footer>
      <div className='paginator d-flex justify-content-between mb-5'>
        <button className='previous-page-btn btn btn-primary'
          disabled={state.paginationDetails.page <= 1}
          onClick={() => {
            getLeaderBoardData(state.paginationDetails.page - 1)
              .then(() => window.scrollTo({ top: 0 }));
          }}>
          Previous
        </button>
        <button
          className='next-page-btn btn btn-primary'
          disabled={state.paginationDetails.overallCount / state.paginationDetails.countPerPage
          === state.paginationDetails.page}
          onClick={() => {
            getLeaderBoardData(state.paginationDetails.page + 1)
              .then(() => window.scrollTo({ top: 0 }));
          }}>
          Next
        </button>
      </div>
    </footer>
    {
      (state.status === 'access_denied' || !state.status) && <Modal
        customClass={'curved'}
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
          onClick={() => window.location.reload()} >
          <FormattedMessage
            defaultMessage='Try again'
            description='try again btn'
          />
        </button>
      </Modal>
    }
    </div>
  );
};

export default Leaderboard;
