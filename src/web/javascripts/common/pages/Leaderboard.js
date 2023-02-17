import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { pageInit, $, timeTrack } from '../framework';
import '../../../stylesheets/common/pages/leaderboard/style.scss';
import { useLeaderBoard } from '../../../../hooks/pages/leaderboard';
import Img from '../components/Img';
import Modal from '../components/Modal';
import Paginator from '../components/Paginator';

const Leaderboard = () => {
  pageInit('leaderboard-container', 'Leaderboard');

  const isPageMounted = React.useRef(true);

  timeTrack('leaderboard');

  const { state, setLeaderBoardData, getLeaderBoardData } = useLeaderBoard({ isPageMounted });
  const {
    leaderboardData, userData, paginationDetails,
  } = state;
  // methods
  const loggedInUserInCurrentPage = (currentPage, userUniqueUrl) => {
    const loggedInUserFound = currentPage.find((obj) => obj.uniqueUrl === userUniqueUrl);

    return !!loggedInUserFound;
  };

  // side effect
  useEffect(() => {
    // if no userData OR user doesnt have points or rank, do nothing!
    if (!userData || (userData.points === 0 && userData.rank === '--')) return;

    const loggedInUserFound = loggedInUserInCurrentPage(leaderboardData, userData.uniqueUrl);

    if (!loggedInUserFound) {
      leaderboardData.push(userData);
      setLeaderBoardData((prev) => ({
        ...prev,
        leaderboardData: [...leaderboardData],
      }));
    }
  }, [state]);

  return (
    <div className='wrapper col-12 col-md-10 col-lg-9 col-xl-5 mx-auto'>
      <h5 className="subtitle1 my-4">
        <FormattedMessage defaultMessage={'Leaderboard'} description='Leaderboard page title' />
      </h5>
      {/* <div className='controls-container d-flex'>
      <div className='filter-btn-container control-with-icon'>
        <img className='icon'
        src='../../../../images/leaderboard/filter-icon-svg.svg' alt='filter-icon'/>
        <button className='btn filter-btn control caption-bold'>
          <FormattedMessage defaultMessage='Filter' description='Filter button'/>
        </button>
      </div>
      <div className='search-box-container control-with-icon'>
        <img className='icon'
        src='../../../../images/leaderboard/search-icon-svg.svg' alt='filter-icon'/>
        <input className='search-box form-control control caption-bold'
        name='search' type={'search'} placeholder='Search' />
      </div>
    </div> */}
      <table className='skeleton leaderboard-table'>
        <thead>
          <tr>
            <th className='rank-header-cell'>
              <FormattedMessage
                defaultMessage={'Rank'}
                description='Rank table cell header' />
            </th>
            <th className='student-name-header-cell'>
              <FormattedMessage
                defaultMessage={"Student's Name"}
                description='Student Name cell header' />
            </th>
            <th className='coins-header-cell text-center'>
              <FormattedMessage
                defaultMessage={'Coins'}
                description='Coins cell header' />
            </th>
          </tr>
        </thead>
        <tbody>
          {
            (!leaderboardData) && new Array(10).fill().map((val, index) => <tr key={index}>
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
            </tr>)
          }
          {
            (leaderboardData) && leaderboardData.map((profileObj, index) => <tr key={index}
              tabIndex={0}
              className={profileObj.uniqueUrl === userData.uniqueUrl ? 'loggedin-user-highlight' : ''}>
              <td>
                <FormattedMessage
                  defaultMessage='{rank}'
                  description='rank'
                  values={{ rank: !Number.isNaN(Number(profileObj.rank)) ? `#${profileObj.rank}` : '--' }} />
              </td>
              <td>
                <div className='name-with-profile-picture'>
                  <Img className='profile-picture'
                    alt={profileObj.name}
                    src={(profileObj.profileImage) || 'common/profile/default_user.png'}
                    local={!(profileObj.profileImage)}
                  />
                  <FormattedMessage
                    defaultMessage='{name}'
                    description='name'
                    values={{ name: profileObj.name }} />
                </div>
              </td>
              <td>
                <FormattedMessage
                  defaultMessage='{coins}'
                  description='Coins'
                  values={{ coins: profileObj.points || '--' }} />
              </td>
            </tr>)
          }
        </tbody>
      </table>
      {
        paginationDetails && Boolean(Number(paginationDetails.overallCount))
        && Boolean(Number(paginationDetails.countPerPage)) && <Paginator
          totalItems={Number(paginationDetails.overallCount)}
          countPerPage={Number(paginationDetails.countPerPage)}
          currentPageNumber={paginationDetails.page}
          initialWindow={5}
          onPageChange={(pageNumber) => {
            getLeaderBoardData({ pageNumber });
          }}
          onNextBtnClick={() => {
            getLeaderBoardData({ pageNumber: paginationDetails.page + 1 });
          }}
          onPrevBtnClick={() => {
            getLeaderBoardData({ pageNumber: paginationDetails.page - 1 });
          }}
        />
      }
      {
        (state.status === 'access_denied' || !state.status) && <Modal
          modalClass='errorModal'
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
      <div id="loader"></div>
    </div>
  );
};

export default Leaderboard;
