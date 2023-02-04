import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { pageInit, $, timeTrack } from '../framework';
import '../../../stylesheets/common/pages/leaderboard/style.scss';
import { useLeaderBoard } from '../../../../hooks/pages/leaderboard';
import Img from '../components/Img';
import Modal from '../components/Modal';

const pageSelector = (page, paginationDetails) => {
  $('.paginate_numbers').removeClass('current');
  const pageShowArray = [0];
  // eslint-disable-next-line max-len
  const totalPage = Math.ceil(paginationDetails?.overallCount / paginationDetails?.countPerPage);
  pageShowArray.push(totalPage - 1);
  $('.ellipse').remove();

  const alterPagination = (selector) => {
    $(`${selector} .paginate_numbers`).each((index, elem) => {
      if (page - 1 === index) {
        $(elem).html(page);
        $(elem).addClass('current')
          .removeClass('d-none');
      } else if (page - 2 === index) {
        $(elem).removeClass('d-none');
        if (pageShowArray.indexOf(index) === -1) {
          $(elem).before('<span class="ellipse">...</span>');
        }
      } else if (page === index) {
        $(elem).removeClass('d-none');
        if (pageShowArray.indexOf(index) === -1) {
          $(elem).after('<span class="ellipse">...</span>');
        }
      } else if (pageShowArray.indexOf(index) === -1) {
        $(elem).addClass('d-none');
      }
    });

    if (page === 1) {
      $(`${selector} .leaderboard-previous`).addClass('disabled');
    } else {
      $(`${selector} .leaderboard-previous`).removeClass('disabled');
    }
    if (page === totalPage) {
      $(`${selector} .leaderboard-next`).addClass('disabled');
    } else {
      $(`${selector} .leaderboard-next`).removeClass('disabled');
    }
  };

  alterPagination('.pagination-container');
};

const Leaderboard = () => {
  pageInit('leaderboard-container', 'Leaderboard');

  const isPageMounted = React.useRef(true);

  timeTrack('leaderboard');

  const { state, setLeaderBoardData, getLeaderBoardData } = useLeaderBoard({ isPageMounted });
  const {
    leaderboardData, userData, paginationDetails,
  } = state;
  // methods
  const previousBtnClickHandler = () => {
    $('#loader').show();
    getLeaderBoardData({ pageNumber: paginationDetails.page - 1 })
      .then(() => {
        $('#loader').hide();
        window.scrollTo({ top: 0 });
      });
  };

  const nextBtnClickHandler = () => {
    $('#loader').show();
    getLeaderBoardData({ pageNumber: paginationDetails.page + 1 })
      .then(() => {
        $('#loader').hide();
        window.scrollTo({ top: 0 });
      });
  };

  const handleLeaderboardPage = (page) => {
    getLeaderBoardData({ pageNumber: page });
  };

  const LeaderboardPaginationComponent = ({ handlePagination }) => {
    const totalPage = Math.ceil(paginationDetails?.overallCount / paginationDetails?.countPerPage);
    let paginationFlag = false;
    if (totalPage > 5) {
      paginationFlag = true;
    }

    return <>
      {
        Array(totalPage).fill(0).map((_, index) => {
          const idx = index + 1;
          if (paginationFlag) {
            const pageToShow = (paginationDetails?.page === idx
              || paginationDetails?.page === idx - 1
              || paginationDetails?.page === idx + 1
              || idx === totalPage);
            return <button key={index} className={`btn paginate_button paginate_numbers ${pageToShow ? '' : 'd-none'} ${idx === paginationDetails.page ? 'current' : ''}`} aria-controls={'leaderboard'} tabIndex="0" onClick={() => handlePagination(idx)} >{idx}</button>;
          }
          return <button key={index} className={`btn paginate_button paginate_numbers ${idx === paginationDetails.page ? 'current' : ''}`} aria-controls={'leaderboard'} tabIndex="0" onClick={() => handlePagination(idx)} >{idx}</button>;
        })
      }
    </>;
  };

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
    pageSelector(paginationDetails.page, paginationDetails);
  }, [state]);

  return (
  <div className='wrapper col-12 col-md-10 col-lg-9 col-xl-5 mx-auto'>
    <h5 className="subtitle1 my-4">
      <FormattedMessage defaultMessage={'Leaderboard'} description='Leaderboard page title'/>
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
              description='Rank table cell header'/>
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
          values = {{ rank: !Number.isNaN(Number(profileObj.rank)) ? `#${profileObj.rank}` : '--' }}/>
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
              values = {{ name: profileObj.name }}/>
          </div>
        </td>
        <td>
          <FormattedMessage
          defaultMessage='{coins}'
          description='Coins'
          values = {{ coins: profileObj.points || '--' }}/>
        </td>
      </tr>)
      }
      </tbody>
    </table>
    <footer>
      <div className="pagination-container col-xl-5">
              <div className="d-flex align-items-center justify-content-between">
                <button className="btn pagination-navigation-btn leaderboard-previous" onClick={() => previousBtnClickHandler('previous')}>
                  <i className="fas fa-angle-left"></i>
                </button>
                <div className="pagination-block">
                  {
                    state.status === 'success' && state.paginationDetails
                    && <LeaderboardPaginationComponent
                    handlePagination={handleLeaderboardPage}/>
                  }
                </div>
                <button className="btn pagination-navigation-btn leaderboard-next" onClick={() => nextBtnClickHandler('next')}>
                  <i className="fas fa-angle-right"></i>
                </button>
              </div>
          </div>
    </footer>
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
