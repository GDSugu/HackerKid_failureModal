import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useLeaderBoard } from '../../../../../hooks/pages/leaderboard';
import { $ } from '../../framework';
import '../../../../stylesheets/common/sass/components/_gameLeaderboardComponent.scss';
import Img from '../Img';
import { AuthContext } from '../../../../../hooks/pages/root';

const LeaderboardUserComponent = () => <>
  <tr>
    <td>
      <p>
        <FormattedMessage
          defaultMessage={'#{rank}'}
          description={'Rank'}
          values={{
            rank: 1,
          }}
        />
      </p>
    </td>
    <td>
      <div className="d-flex align-items-center">
        <Img
          src={'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?s=200&d=identicon&r=PG'}
          local={false}
          fallback={'profile/default_user.png'}
        />
        <p>
          <FormattedMessage
            defaultMessage={'{studentNamt}'}
            description={'Student Name'}
            values={{
              studentNamt: 'John Doe',
            }}
          />
        </p>
      </div>
    </td>
    <td>
      <p>
        <FormattedMessage
          defaultMessage={'{xp}'}
          description={'XP'}
          values={{
            xp: '100',
          }}
        />
      </p>
    </td>
  </tr>
</>;

const LeaderboardPaginationComponent = ({ paginationDetails }) => {
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
          return <button key={index} className={`btn paginate_button paginate_numbers ${pageToShow ? '' : 'd-none'} ${idx === paginationDetails.page ? 'current' : ''}`} aria-controls={'leaderboard'} tabIndex="0">{idx}</button>;
        }
        return <button key={index} className={`btn paginate_button paginate_numbers ${idx === paginationDetails.page ? 'current' : ''}`} aria-controls={'leaderboard'} tabIndex="0">{idx}</button>;
      })
    }
  </>;
};

const GameLeaderboardComponent = ({
  game = 'all', onshown = () => {}, onhidden = () => {},
  beforeShown = () => {}, beforeHidden = () => {},
}, ref) => {
  const isPageMounted = React.useRef(true);
  const authContext = React.useContext(AuthContext);

  const showLeaderboard = () => {
    beforeShown();
    $('.game-leaderboard-component').slideDown({
      complete: onshown,
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

  // const { state, getLeaderBoardData } = useLeaderBoard({ isPageMounted });

  const populateScore = (selectorPrefix, score, percentage) => {
    if (score) {
      $(`${selectorPrefix}Count tspan:first-child`).text(Math.ceil(score));
    }
    if (percentage) {
      $(`${selectorPrefix}Progress`).attr('stroke-dasharray', `${percentage * 251.2 * 0.01}, 251.2`);
    }
  };

  const generatePageNumbers = (paginationDetails) => {
    // eslint-disable-next-line max-len
    const totalPage = Math.ceil(paginationDetails?.overallCount / paginationDetails?.countPerPage);
    let pageButtonString = '';
    let paginationFlag = false;
    if (totalPage > 5) {
      paginationFlag = true;
    }
    for (let i = 1; i <= totalPage; i += 1) {
      if (paginationFlag) {
        // eslint-disable-next-line max-len
        if (paginationDetails?.page === i || paginationDetails?.page === i - 1 || paginationDetails?.page === i + 1 || i === totalPage) {
          pageButtonString += `<a class="paginate_button paginate_numbers ${i === paginationDetails?.page ? 'current' : ''}" aria-controls="individual-leaderboard" data-dt-idx="${i}" tabindex="0">${i}</a>`;
        } else {
          pageButtonString += `<a class="paginate_button paginate_numbers d-none" aria-controls="individual-leaderboard" data-dt-idx="${i}" tabindex="0">${i}</a>`;
        }
      } else {
        pageButtonString += `<a class="paginate_button paginate_numbers ${i === paginationDetails?.page ? 'current' : ''}" aria-controls="individual-leaderboard" data-dt-idx="${i}" tabindex="0">${i}</a>`;
      }
    }
    $('.pagination-block, .pagination-block-mob').html(pageButtonString);
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
      console.log('pagesel ', page, totalPage);
      if (page === totalPage) {
        $(`${selector} .leaderboard-next`).addClass('disabled');
      } else {
        $(`${selector} .leaderboard-next`).removeClass('disabled');
      }
    };

    alterPagination('.pagination-container');
    alterPagination('.pagination-container-mob');
  };

  React.useEffect(() => {
    // populateScore('#yourScore', gameData.gameProgress, parseInt((gameData.gameProgress / gameData.totalGames) * 100, 10));
    populateScore('#yourScore', 50, parseInt((50 / 200) * 100, 10));
    // generatePageNumbers({
    //   page: 5,
    //   countPerPage: 10,
    //   overallCount: 100,
    // });
    pageSelector(10, {
      page: 1,
      countPerPage: 10,
      overallCount: 100,
    });

    return () => {
      isPageMounted.current = false;
    };
  }, []);

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
                        defaultMessage={'XP'}
                        description={'XP'}
                      />
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  Array(10).fill(0).map((_, index) => <LeaderboardUserComponent key={index} />)
                }
              </tbody>
            </table>
            <div className="pagination-container">
              <div className="d-flex align-items-center justify-content-between">
                <button className="btn pagination-navigation-btn leaderboard-previous">
                  <i className="fas fa-angle-left"></i>
                </button>
                <div className="pagination-block">
                  <LeaderboardPaginationComponent
                    paginationDetails={{
                      page: 1,
                      countPerPage: 10,
                      overallCount: 100,
                    }}
                  />
                </div>
                <button className="btn pagination-navigation-btn leaderboard-next">
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
                <div className="d-flex align-items-center">
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
                                validSubmissions: 134 || 0,
                              }}
                            />
                          </span>
                          <span>
                            <FormattedMessage
                              defaultMessage={'/{totalSubmissions}'}
                              description={'Total Submissions'}
                              values={{
                                totalSubmissions: 200 || 0,
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
                                coinsEarned: 134 || 0,
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
                                timeSpent: '14 mins' || 0,
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
                    <div className="award-block">
                      <Img
                        src='achievements/award1.png'
                        useSource={true}
                        alt={'earned award'}
                      />
                    </div>
                    <div className="award-block">
                      <Img
                        src='achievements/award2.png'
                        useSource={true}
                        alt={'earned award'}
                      />
                    </div>
                    <div className="award-block">
                      <Img
                        src='achievements/award3.png'
                        useSource={true}
                        alt={'earned award'}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pagination-container-mob">
        <div className="d-flex align-items-center justify-content-between">
          <button className="btn pagination-navigation-btn leaderboard-previous">
            <i className="fas fa-angle-left"></i>
          </button>
          <div className="pagination-block">
            <LeaderboardPaginationComponent
              paginationDetails={{
                page: 1,
                countPerPage: 10,
                overallCount: 100,
              }}
            />
          </div>
          <button className="btn pagination-navigation-btn leaderboard-next">
            <i className="fas fa-angle-right"></i>
          </button>
        </div>
      </div>
    </div>
  </>;
};

export default React.forwardRef(GameLeaderboardComponent);
