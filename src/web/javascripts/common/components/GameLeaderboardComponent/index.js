import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useLeaderBoard } from '../../../../../hooks/pages/leaderboard';
import { $, secondsToMins } from '../../framework';
import '../../../../stylesheets/common/sass/components/_gameLeaderboardComponent.scss';
import Img from '../Img';
import { useAwardsByGame } from '../../../../../hooks/pages/awards';
import { AuthContext } from '../../../../../hooks/pages/root';

const LeaderboardUserComponent = ({ user }) => <>
  <tr>
    <td>
      <p>
        <FormattedMessage
          defaultMessage={'#{rank}'}
          description={'Rank'}
          values={{
            rank: user.rank,
          }}
        />
      </p>
    </td>
    <td>
      <div className="d-flex align-items-center">
        <Img
          src={user.profileImage}
          local={false}
          fallback={'profile/default_user.png'}
        />
        <p>
          <FormattedMessage
            defaultMessage={'{studentNamt}'}
            description={'Student Name'}
            values={{
              studentNamt: user.name,
            }}
          />
        </p>
      </div>
    </td>
    <td>
      <p>
        <FormattedMessage
          defaultMessage={'{coins}'}
          description={'Coins'}
          values={{
            coins: user.points,
          }}
        />
      </p>
    </td>
  </tr>
</>;

const LeaderboardPaginationComponent = ({ handlePagination, paginationDetails }) => {
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

const AwardCollectionComponent = ({ game }) => {
  const isPageMounted = React.useRef(true);

  const { awardsByGameState, getAwardsByGame } = useAwardsByGame(
    { initializeData: true, isPageMounted, game },
  );

  const { awards } = awardsByGameState;
  console.log('awards', awards);
  React.useEffect(() => {
    getAwardsByGame({ cached: false });
  }, []);

  if (!awards || !awards.length) {
    return null;
  }

  return <>
          {
            awards?.map((award, index) => <div key={index} className="award-block">
                <img
                    src={award?.awardImage}
                    alt={award?.awardName}
                  />
              </div>)
          }
  </>;
};

const GameLeaderboardComponent = ({
  game = 'all', onshown = () => {}, onhidden = () => {},
  beforeShown = () => {}, beforeHidden = () => {},
}, ref) => {
  const isPageMounted = React.useRef(true);
  const authContext = React.useContext(AuthContext);

  const { state, getLeaderBoardData } = useLeaderBoard({ initializeData: false, isPageMounted });

  const populateScore = (selectorPrefix, score, percentage) => {
    if (score) {
      $(`${selectorPrefix}Count tspan:first-child`).text(Math.ceil(score));
    }
    if (percentage) {
      $(`${selectorPrefix}Progress`).attr('stroke-dasharray', `${percentage * 251.2 * 0.01}, 251.2`);
    }
  };

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
    alterPagination('.pagination-container-mob');
    $('.game-leaderboard-container').scrollTop(0);
  };

  const handleLeaderboardPage = (page) => {
    getLeaderBoardData({ pageNumber: page, game });
  };

  const handlePaginationNavigation = (action) => {
    if (state.status === 'success') {
      if (action === 'next') {
        const totalPage = Math.ceil(
          state.paginationDetails.overallCount / state.paginationDetails.countPerPage,
        );
        const currPage = state.paginationDetails.page;
        const nextPage = currPage < totalPage ? currPage + 1 : currPage;
        if (nextPage !== currPage) {
          getLeaderBoardData({
            pageNumber: nextPage,
            game,
          });
        }
      } else if (action === 'previous') {
        const currPage = state.paginationDetails.page;
        const prevPage = currPage > 1 ? currPage - 1 : currPage;
        if (prevPage !== currPage) {
          getLeaderBoardData({
            pageNumber: prevPage,
            game,
          });
        }
      }
    }
  };

  const footerToggle = (page, countPerPage) => {
    if (page === Math.ceil(state.userData.rank / countPerPage) || state.userData.rank === '--') {
      $('.game-table tfoot, .footer-mob').addClass('d-none');
    } else {
      $('.game-table tfoot, .footer-mob').removeClass('d-none');
    }
    $('.game-leaderboard-block').css('margin-bottom', `${$('.pos-mob-abs').height()}px`);
  };

  const showLeaderboard = () => {
    beforeShown();
    $('.game-leaderboard-component').slideDown({
      complete: () => {
        onshown();
        if (state.status === 'success' && state.paginationDetails) {
          footerToggle(state.paginationDetails.page, state.paginationDetails.countPerPage);
        }
      },
    });
  };

  const closeLeaderboard = () => {
    beforeHidden();
    $('.game-leaderboard-component').slideUp({
      complete: onhidden,
    });
  };

  const toggleLeaderboard = () => {
    if ($('.game-leaderboard-component').is(':visible')) {
      closeLeaderboard();
    } else {
      showLeaderboard();
    }
  };

  React.useImperativeHandle(ref, () => ({
    show: showLeaderboard,
    hide: closeLeaderboard,
    toggle: toggleLeaderboard,
  }));

  React.useEffect(() => {
    getLeaderBoardData({
      pageNumber: 1,
      game,
    });

    return () => {
      isPageMounted.current = false;
    };
  }, []);

  React.useEffect(() => {
    if (state.status === 'success' && isPageMounted.current) {
      if (state.paginationDetails) {
        pageSelector(state.paginationDetails.page, state.paginationDetails);
        footerToggle(state.paginationDetails.page, state.paginationDetails.countPerPage);
      }
      if (state.gameProgress) {
        populateScore('#yourScore', state.gameProgress.completedQuestions, parseInt((state.gameProgress.completedQuestions / state.gameProgress.totalQuestions) * 100, 10));
      }
    }
  }, [state]);

  return <>
    <div className={`game-leaderboard-component ${game}-leaderboard`} style={{ display: 'none' }}>
      <div className="game-leaderboard-title-container">
        <p className='mb-0'>
          <FormattedMessage
            defaultMessage={'Leaderboard'}
            description={'Leaderboard Title'}
          />
        </p>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeLeaderboard}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="game-leaderboard-main-block">
        <div className="col-12 col-md-4 game-leaderboard-block">
          <div className="game-leaderboard-container">
            <div className="game-table">
              <table className='table table-borderless'>
                <thead>
                  <tr>
                    <th>
                      <p>
                        <FormattedMessage
                          defaultMessage={'Rank'}
                          description={'Rank'}
                        />
                      </p>
                    </th>
                    <th>
                      <p>
                        <FormattedMessage
                          defaultMessage={'Student Name'}
                          description={'Student Name'}
                        />
                      </p>
                    </th>
                    <th>
                      <p>
                        <FormattedMessage
                          defaultMessage={'Coins'}
                          description={'Coins'}
                        />
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    state.status === 'success'
                    && state.leaderboardData.map(
                      (userData, index) => <LeaderboardUserComponent key={index} user={userData} />,
                    )
                  }
                </tbody>
                <tfoot>
                  {
                    state.status === 'success'
                    && <LeaderboardUserComponent user={state.userData} />
                  }
                </tfoot>
              </table>
            </div>
            <div className="pagination-container">
              <div className="d-flex align-items-center justify-content-between">
                <button className="btn pagination-navigation-btn leaderboard-previous" onClick={() => handlePaginationNavigation('previous')}>
                  <i className="fas fa-angle-left"></i>
                </button>
                <div className="pagination-block">
                  {
                    state.status === 'success' && state.paginationDetails
                    && <LeaderboardPaginationComponent
                    paginationDetails={state.paginationDetails}
                    handlePagination={handleLeaderboardPage}/>
                  }
                </div>
                <button className="btn pagination-navigation-btn leaderboard-next" onClick={() => handlePaginationNavigation('next')}>
                  <i className="fas fa-angle-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-8 game-overview-block">
          <div className="game-overview-container">
            <div className="game-overview-content-container col-md-9">
              <div className="profile-container">
                <Img
                  className='profile-image'
                  local={false}
                  src={authContext?.sessionData?.profileImage}
                  useSource={true}
                  fallback={'common/profile.png'}
                  alt={'Hackerkid Profile Image'}
                />
                <p className='mb-0'>
                  <FormattedMessage
                    defaultMessage={'{username}'}
                    description={'Username'}
                    values={{
                      username: authContext?.sessionData?.name || 'Hackerkid user',
                    }}
                  />
                </p>
              </div>
              <div className="stats-container">
                <div className="d-flex align-items-center justify-content-around">
                  <div className="col-4 stats-block">
                    <div className="stats-block-container">
                      <div className="stats-icon-container">
                        <div className="circle-progress">
                          <svg xmlns="http://www.w3.org/2000/svg" id="yourScoreAnimated" viewBox="0 0 100 100">
                            <linearGradient id="gradient">
                              <stop offset="0%" className="start" />
                              <stop offset="90%" className="end" />
                            </linearGradient>
                            <path id="yourScoreProgress" strokeLinecap="round" strokeWidth="12" strokeDasharray="140, 251.2" className="progress-bar"
                                d="M50 10
                                    a 40 40 0 0 1 0 80
                                    a 40 40 0 0 1 0 -80">
                            </path>
                          </svg>
                        </div>
                      </div>
                      <div className="stats-text-container">
                        <p>
                          <span>
                            <FormattedMessage
                              defaultMessage={'{validSubmissions}'}
                              description={'Valid Submissions'}
                              values={{
                                validSubmissions: state?.gameProgress?.completedQuestions || 0,
                              }}
                            />
                          </span>
                          <span>
                            <FormattedMessage
                              defaultMessage={'/{totalSubmissions}'}
                              description={'Total Submissions'}
                              values={{
                                totalSubmissions: state?.gameProgress?.totalQuestions || 0,
                              }}
                            />
                          </span>
                        </p>
                        <p>
                          <FormattedMessage
                            defaultMessage={'completed'}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-4 stats-block">
                    <div className="stats-block-container">
                      <div className="stats-icon-container">
                        <Img
                          src='common/hkcoin.png'
                          useSource={true}
                          alt={'Hackerkid Coin'}
                        />
                      </div>
                      <div className="stats-text-container">
                        <p>
                          <FormattedMessage
                            defaultMessage={'Coins Earned:'}
                            description={'Coins Earned'}
                          />
                        </p>
                        <p>
                          <span>
                            <FormattedMessage
                              defaultMessage={'{coinsEarned}'}
                              description={'Coins Earned'}
                              values={{
                                coinsEarned: state?.userData?.points || 0,
                              }}
                            />
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-4 stats-block">
                    <div className="stats-block-container">
                      <div className="stats-icon-container">
                        <Img
                          src='common/eva_clock-fill.png'
                          useSource={true}
                          alt={'clock Icon'}
                        />
                      </div>
                      <div className="stats-text-container">
                        <p>
                          <FormattedMessage
                            defaultMessage={'Time Spent:'}
                            description={'Time Spent'}
                          />
                        </p>
                        <p>
                          <span>
                            <FormattedMessage
                              defaultMessage={'{timeSpent}'}
                              description={'Time Spent'}
                              values={{
                                timeSpent: secondsToMins(state?.gameProgress?.totalTimeSpent),
                              }}
                            />
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="awards-container">
                <div className="awards-title-container">
                  <p>
                    <FormattedMessage
                      defaultMessage={'Earned Awards'}
                      description={'Earned Awards'}
                    />
                  </p>
                </div>
                <div className="awards-content-container">
                  <div className="row align-items-center no-gutters">
                      {/* call AwardCollectionComponent with game */}
                      <AwardCollectionComponent game={game} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pos-mob-abs">
        <div className="footer-mob">
          <table className='table table-borderless'>
            <tfoot>
              {
                state.status === 'success'
                && <LeaderboardUserComponent user={state.userData} />
              }
            </tfoot>
          </table>
        </div>
        <div className="pagination-container-mob">
          <div className="d-flex align-items-center justify-content-between">
            <button className="btn pagination-navigation-btn leaderboard-previous" onClick={() => handlePaginationNavigation('previous')}>
              <i className="fas fa-angle-left"></i>
            </button>
            <div className="pagination-block">
              {
                state.status === 'success' && state.paginationDetails
                && <LeaderboardPaginationComponent
                paginationDetails={state.paginationDetails}
                handlePagination={handleLeaderboardPage}/>
              }
            </div>
            <button className="btn pagination-navigation-btn leaderboard-next" onClick={() => handlePaginationNavigation('next')}>
              <i className="fas fa-angle-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </>;
};

export default React.forwardRef(GameLeaderboardComponent);
