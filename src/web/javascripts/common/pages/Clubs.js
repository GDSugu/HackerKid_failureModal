import React, { memo } from 'react';
import '../../../stylesheets/common/pages/clubs/style.scss';
import { FormattedMessage } from 'react-intl';
import { pageInit } from '../framework';
import Img from '../components/Img';
import useRootPageState, { useGetSession } from '../../../../hooks/pages/root';

const HeroContainer = ({ clubLeaderBoard, isDesktop, session }) => {
  const [profileImg, setProfileImg] = React.useState('../../../../images/profile/default_user.png');

  if (Object.keys(session).length) {
    const profileImage = (session?.profileImage)
      ?.toString()
      ?.replace(/(updatedAt=(\d+))/g, `updatedAt=${Date.now() / 1000}`);

    fetch(profileImage)
      .then((response) => {
        if (response.status === 200) {
          setProfileImg(profileImage);
        }
      });
  }

  return <>
    {
      (Object.keys(session).length)
      && <>
      {
        isDesktop
        && <>
          <div className="hero-card">
            <div className="hero-card-data col-6 col-sm-4">
              <div className="hero-card-img"
                style={(session?.profileImage)
                  ? { backgroundImage: `url(${profileImg})` }
                  : {}
              }></div>
              <div className="hero-card-data-content">
                <div className="hero-data">
                  <Img src='common/hkcoin.png' />
                  <p className='mb-0'>{`${session?.pointsEarned || '--'} coins`}</p>
                </div>
                {/* <div className="hero-data">
                  <Img src='common/xp.svg' />
                  <p className='mb-0'>
                    <FormattedMessage
                      defaultMessage={`${12345 || '--'} XP`}
                      description={'hk XP'}
                    />
                  </p>
                </div> */}
              </div>
            </div>
          <div className='hero-card-data col'>
            <div className="club-leaderboard-container">
              <div className="club-leaderboard-content">
                {
                  clubLeaderBoard.map((club, index) => <div key={index} className="club-leaderboard-row">
                  <div className="club-lb-rank">
                    <p className='mb-0'>
                      <FormattedMessage
                        defaultMessage={'#{rank}'}
                        description={'club leaderboard rank'}
                        values={{ rank: club.rank }}
                      />
                    </p>
                  </div>
                  <div className="club-lb-name">
                    <a href="#">
                      <div className="d-flex align-items-center">
                        {/* <picture>
                          <img src={club.clubImage} alt='Club Display Picture' />
                        </picture> */}
                        <Img
                          src={club.clubImage}
                          fallback={'clubs/club.png'}
                          alt='Club Display Picture'
                          local={false}
                        />
                        <p className='mb-0'>
                          <FormattedMessage
                            defaultMessage={'{name}'}
                            description={'club leaderboard name'}
                            values={{ name: club.clubName }}
                          />
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="club-lb-members">
                    <div className="d-flex align-items-center">
                      <picture>
                        <img src={'../../../../images/clubs/members.svg'} alt='Club members' />
                      </picture>
                      <p className='mb-0'>
                        <FormattedMessage
                          defaultMessage={'{membersCount}'}
                          description={'club members count'}
                          values={{ membersCount: club.membersCount }}
                        />
                      </p>
                    </div>
                  </div>
                </div>)
                }
              </div>
              <div className="btn-container d-flex align-items-center">
                <button className="btn btn-block btn-primary">
                  <p className="mb-0">
                    <FormattedMessage
                      defaultMessage={'Join a club'}
                      description={'Join a club button'}
                    />
                  </p>
                </button>
                <button className="btn btn-block btn-primary">
                  <div className="d-flex align-items-center justify-content-center">
                    <p className="mb-0">
                      <FormattedMessage
                        defaultMessage={'Create club'}
                        description={'Create a club button'}
                      />
                    </p>
                    <i className="fas fa-angle-right"></i>
                  </div>
                </button>
              </div>
            </div>
          </div>
          </div>
        </>
      }
      {
        !isDesktop
        && <>
          <div className="hero-no-club-card">
            <div className="hero-no-club-card-data">
              <p>
                <FormattedMessage
                  defaultMessage={'You are not a part of any club right now!'}
                  description={'Non club member text'}
                />
              </p>
            </div>
            <div className="hero-no-club-img">
              <picture>
                <img src={'../../../../images/clubs/no-club.svg'} alt={'You are not a part of any club'} />
              </picture>
            </div>
            <div className="btn-container d-flex align-items-center">
              <button className="btn btn-block btn-primary">
                <p className="mb-0">
                  <FormattedMessage
                    defaultMessage={'Join a club'}
                    description={'Join a club button'}
                  />
                </p>
              </button>
              <button className="btn btn-block btn-primary">
                <div className="d-flex align-items-center justify-content-center">
                  <p className="mb-0">
                    <FormattedMessage
                      defaultMessage={'Create club'}
                      description={'Create a club button'}
                    />
                  </p>
                  <i className="fas fa-angle-right"></i>
                </div>
              </button>
            </div>
          </div>
        </>
      }
      </>
    }
  </>;
};

const ClubListContainer = ({ clubList, isDesktop }) => <>
  {
    isDesktop
    && <>
      <div className="no-club-message-card">
        <p className="mb-0">
          <FormattedMessage
            defaultMessage={'You are not a part of any club right now!'}
            description={'Non club member text'}
          />
        </p>
      </div>
    </>
  }
  <div className="browse-club-heading">
    <p>
      <FormattedMessage
        defaultMessage={'Browse clubs:'}
        description={'Browse clubs heading'}
      />
    </p>
    <div className="input-group">
      <div className="input-group-prepend">
        <i className="fas fa-search"></i>
      </div>
      <input type="text" className="form-control" placeholder="Search" />
    </div>
  </div>
  <div className="club-list">
    {
      clubList.map((club, index) => <div key={index} className="">
        <div className="club-card">
          <div className="club-card-img">
            <Img
              src={club.clubImage}
              fallback={'clubs/club.png'}
              alt='Club Display Picture'
              local={false}
            />
          </div>
          <div className="club-card-data">
            <div className="d-flex align-items-start justify-content-between">
              <div className="club-card-name">
                <p className='mb-0'>
                  <FormattedMessage
                    defaultMessage={'{name}'}
                    description={'club name'}
                    values={{ name: club.clubName }}
                  />
                </p>
              </div>
              <div className="club-card-rank">
                <p className='mb-0'>
                  <FormattedMessage
                    defaultMessage={'#{rank} rank'}
                    description={'club rank'}
                    values={{ rank: club.rank }}
                  />
                </p>
              </div>
            </div>
            <div className="d-flex align-items-end">
              <div className="col">
                <div className="d-flex align-items-center">
                  <Img
                    className='club-coin-img'
                    src={'common/hkcoin.png'}
                    fallback={'common/hkcoin.png'}
                    alt='HK Coin'
                  />
                  <p className='mb-0'>
                    <FormattedMessage
                      defaultMessage={'{coins}'}
                      description={'club coins'}
                      values={{ coins: club.clubPoints }}
                    />
                  </p>
                </div>
              </div>
              <div className="col">
                <div className="d-flex align-items-center">
                  <picture className='club-members-img'>
                    <img src={'../../../../images/clubs/members.svg'} alt='Club members' />
                  </picture>
                  <p className='mb-0'>
                    <FormattedMessage
                      defaultMessage={'{membersCount}'}
                      description={'club members count'}
                      values={{ membersCount: club.membersCount }}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>)
    }
  </div>
</>;

const ClubHeroContainer = ({ clubData = {}, isDesktop, userStatus }) => {
  const [profileImg, setProfileImg] = React.useState('../../../../images/clubs/club.svg');
  let clubHeroAction = '';
  const clubAction = () => {};
  if (Object.keys(clubData).length) {
    if (clubData?.clubImage) {
      const profileImage = (clubData?.clubImage)
        ?.toString()
        ?.replace(/(updatedAt=(\d+))/g, `updatedAt=${Date.now() / 1000}`);

      fetch(profileImage)
        .then((response) => {
          if (response.status === 200) {
            console.log('set profile image', profileImage, typeof profileImage);
            setProfileImg(profileImage);
          }
        });
    }

    if (userStatus === 'member') {
      clubHeroAction = 'member-action';
    } else if (userStatus === 'visitor') {
      clubHeroAction = 'visitor-action';
    } else if (userStatus === 'pending') {
      clubHeroAction = 'pending-action';
    }
  }

  return <>
    <div className="hero-card club-hero-card"
      style={{
        background: `${isDesktop ? `url(${profileImg}) no-repeat center left / contain, url(../../../../images/dashboard/dashboard-hero-bg-right.png) no-repeat center right / contain, var(--bg-1)` : `linear-gradient(270deg, #FFFFFF 50%, rgba(255, 255, 255, 0) 100%), url(${profileImg}) no-repeat center left / contain, var(--bg-1)`}`,
      }} >
      {/* <div className="hero-card-data col-6 col-sm-4"> */}
        {/* <div className="hero-card-data-content">
          <div className="hero-data">
            <Img src='common/hkcoin.png' />
            <p className='mb-0'>{`${clubData?.points || '--'} coins`}</p>
          </div>
        </div> */}
        {
          isDesktop
          && <>
            <div className="club-card-data">
              <p className='mb-0'>
                <FormattedMessage
                  defaultMessage={'{name}'}
                  description={'club name'}
                  values={{ name: clubData?.clubName || '--' }}
                />
              </p>
            </div>
          </>
        }
      {/* </div> */}
      {
        isDesktop
        && <>
          <div className='club-hero-data-container col-7'>
            <div className="club-rank-container">
              <p className='mb-0'>
                <FormattedMessage
                  defaultMessage={'Club Rank'}
                  description={'Club Rank'}
                />
              </p>
              <h2 className="display-4">
                <FormattedMessage
                  defaultMessage={'#{rank}'}
                  description={'club rank'}
                  values={{ rank: clubData?.rank || '--' }}
                />
              </h2>
            </div>
            <div className="club-points-container">
              <div className="d-flex align-items-center">
                <div className="col d-flex align-items-center justify-content-center">
                  <Img
                    className='club-xp-img'
                    src={'common/xp.png'}
                    fallback={'common/xp.png'}
                    alt='XP'
                  />
                  <p className='mb-0'>
                    <FormattedMessage
                      defaultMessage={'{xp} xp'}
                      description={'club xp'}
                      values={{ xp: clubData?.xp || '0' }}
                    />
                  </p>
                </div>
                <div className="col d-flex align-items-center justify-content-center">
                  <Img
                    className='club-coin-img'
                    src={'common/hkcoin.png'}
                    fallback={'common/hkcoin.png'}
                    alt='HK Coin'
                  />
                  <p className='mb-0'>
                    <FormattedMessage
                      defaultMessage={'{coins} coins'}
                      description={'club coins'}
                      values={{ coins: clubData?.clubPoints || '--' }}
                    />
                  </p>
                </div>
              </div>
            </div>
            <button
              className={`btn btn-block club-action-btn ${clubHeroAction} ${clubHeroAction === 'pending-action' && 'disabled'}`}
              onClick={clubAction}>
              {
                clubHeroAction === 'member-action'
                && <>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0">
                      <FormattedMessage
                        defaultMessage={'About Club'}
                      />
                    </p>
                    <i className="fas fa-angle-right"></i>
                  </div>
                </>
              }
              {
                clubHeroAction === 'visitor-action'
                && <>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0">
                      <FormattedMessage
                        defaultMessage={'Join this Club'}
                        description={'Join Club'}
                      />
                    </p>
                    <i className="fas fa-angle-right"></i>
                  </div>
                </>
              }
              {
                clubHeroAction === 'pending-action'
                && <>
                    <p className="mb-0">
                      <FormattedMessage
                        defaultMessage={'Approval Pending'}
                        description={'Approval Pending'}
                      />
                    </p>
                </>
              }
            </button>
          </div>
        </>
      }
      {
        !isDesktop
        && <>
         <div className="club-hero-data-container-mob">
          <div className="d-flex align-items-center">
            <Img
              className='club-coin-img'
              src={'common/hkcoin.png'}
              fallback={'common/hkcoin.png'}
              alt='HK Coin'
            />
            <p className='mb-0'>
              <FormattedMessage
                defaultMessage={'{coins} coins'}
                description={'club coins'}
                values={{ coins: clubData?.clubPoints || '--' }}
              />
            </p>
          </div>
          <div className="d-flex align-items-center">
            <Img
              className='club-xp-img'
              src={'common/xp.png'}
              fallback={'common/xp.png'}
              alt='XP'
            />
            <p className='mb-0'>
              <FormattedMessage
                defaultMessage={'{xp} xp'}
                description={'club xp'}
                values={{ xp: clubData?.xp || '0' }}
              />
            </p>
          </div>
          <div className="d-flex align-items-center">
            <picture className='rank-img' >
              <img src='../../../../images/clubs/rank-upwards.svg' alt='rank'/>
            </picture>
            <p className='mb-0'>
              <FormattedMessage
                defaultMessage={'#{rank}'}
                description={'club rank'}
                values={{ rank: clubData?.rank || '--' }}
              />
            </p>
          </div>
         </div>
        </>
      }
    </div>
  </>;
};

const ClubFeedContainerMob = ({ clubName, feedData }) => {
  console.log();

  return <>
    <div className="club-feed-mob-container">
      <div className="club-name">
        <h5 className='mb-0'>
          <FormattedMessage
            defaultMessage={'{name}'}
            description={'club name'}
            values={{ name: clubName || '--' }}
          />
        </h5>
      </div>
      <div className="feed-container">
        <ul className="nav nav-tabs" id="club-tabs">
          <li className="nav-item">
            <a className="nav-link active" data-toggle="tab" href="#feed-tab">
              <FormattedMessage
                defaultMessage={'Feed'}
                description={'Feed'}
              />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#members-tab">
              <FormattedMessage
                defaultMessage={'Members'}
                description={'Members'}
              />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#more-tab">
              <FormattedMessage
                defaultMessage={'More'}
                description={'More'}
              />
            </a>
          </li>
        </ul>
        <div className="tab-content" id='clubTabsContent'>
          <div className="tab-pane fade show active" id="feed-tab">
            {
              feedData.length
              && feedData.map((feed, index) => <div key={index} className="feed-card">
                <div className="feed-title">
                  <div className="d-flex align-items-center">
                    <Img
                      className='club-member-img'
                      src={feed?.memberImage}
                      fallback={'profile/default_user.png'}
                      alt='Member profile image'
                      local={false}
                    />
                    <p className='mb-0'>
                      <FormattedMessage
                        defaultMessage={'{name}'}
                        description={'member name'}
                        values={{ name: feed?.memberName || '--' }}
                      />
                    </p>
                  </div>
                </div>
                <div className="feed-content">
                  <div className="d-flex align-items-center">
                    <picture className='feed-icon'>
                      <img src='../../../../images/clubs/feed-achievement-icon.svg' />
                    </picture>
                    <p className='mb-0'>
                      <FormattedMessage
                        defaultMessage={'{message}'}
                        description={'feed message'}
                        values={{ message: feed?.activityMessage || '--' }}
                      />
                    </p>
                  </div>
                </div>
              </div>)
            }
          </div>
          <div className="tab-pane fade" id="members-tab">
            members tab
          </div>
          <div className="tab-pane fade" id="more-tab">
            <div className="form-group">
              <label htmlFor="clubName">Club Name</label>
              <input type="text" className="form-control" name="clubName" id="clubName" aria-describedby="helpId" placeholder="Club name" />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <select className="form-control" name="country" id="country">
                <option selected>
                  <FormattedMessage
                    defaultMessage={'{country}'}
                    description={'country'}
                    values={{ country: 'India' }}
                  />
                </option>
              </select>
            </div>
            {/* <div className="form-group">
              <label htmlFor="country">Country</label>
              <input type="text" className="form-control" name="country" id="country" aria-describedby="helpId" placeholder="Country"/>
            </div> */}
            <div className="form-group">
              <label htmlFor="state">State</label>
              {/* <input type="text" className="form-control" name="state" id="state" aria-describedby="helpId" placeholder="State"/> */}
              <select className="form-control" name="state" id="state">
                <option selected>
                  <FormattedMessage
                    defaultMessage={'{state}'}
                    description={'state'}
                    values={{ state: 'Tamil Nadu' }}
                  />
                </option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="members">Members</label>
              <input type="text" className="form-control" name="members" id="members" aria-describedby="helpId" placeholder="Members"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>;
};

const ClubFeedContainer = ({ feedData = [], topMembers = [] }) => {
  console.log();
  const handleMemberClick = (memberUrl) => { console.log(memberUrl); };

  return <>
    <div className="club-dashboard-container">
      <div className="club-feed-container">
        <div className="dashboard-title">
          <p className='mb-0'>
            <FormattedMessage
              defaultMessage={'Feed'}
              description={'Feed'}
            />
          </p>
        </div>
        <div className="feed-container">
          {
            feedData.length
            && feedData.map((feed, index) => <div key={index} className="feed-card">
              <div className="feed-title">
                <div className="d-flex align-items-center">
                  <Img
                    className='club-member-img'
                    src={feed?.memberImage}
                    fallback={'profile/default_user.png'}
                    alt='Member profile image'
                    local={false}
                  />
                  <p className='mb-0'>
                    <FormattedMessage
                      defaultMessage={'{name}'}
                      description={'member name'}
                      values={{ name: feed?.memberName || '--' }}
                    />
                  </p>
                </div>
              </div>
              <div className="feed-content">
                <div className="d-flex align-items-center">
                  <picture className='feed-icon'>
                    <img src='../../../../images/clubs/feed-achievement-icon.svg' />
                  </picture>
                  <p className='mb-0'>
                    <FormattedMessage
                      defaultMessage={'{message}'}
                      description={'feed message'}
                      values={{ message: feed?.activityMessage || '--' }}
                    />
                  </p>
                </div>
              </div>
            </div>)
          }
        </div>
      </div>
      <div className="club-members-container">
        <div className="club-top-members-container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="dashboard-title">
              <p className="mb-0">
                <FormattedMessage
                  defaultMessage={'Top Members'}
                  description={'Top Members'}
                />
              </p>
            </div>
            <button className="btn sort-btn">
              <p className='mb-0'>
                <FormattedMessage
                  defaultMessage={'Sort by: '}
                  description={'Sort by:'}
                /> <span>
                  <FormattedMessage
                    defaultMessage={'XP'}
                    description={'xp'}
                  />
                </span>
              </p>
            </button>
          </div>
          <div className="top-members-container">
            {
              topMembers.length
              && topMembers.map((member, index) => <div key={index} className='top-members-row' onClick={() => handleMemberClick(member.unique_url) }>
                <div className="top-members-rank">
                  <p className='mb-0'>
                    <FormattedMessage
                      defaultMessage={'#{rank}'}
                      description={'rank'}
                      values={{ rank: index + 1 }}
                    />
                  </p>
                </div>
                <div className="top-members-name">
                  <div className="d-flex align-items-center">
                    <Img
                      className='top-members-img'
                      src={member.profileImage}
                      fallback={'profile/default_user.png'}
                      local={false}
                      alt='Member profile image'
                    />
                    <p className='mb-0'>
                      <FormattedMessage
                        defaultMessage={'{name}'}
                        description={'member name'}
                        values={{ name: member.name || '--' }}
                      />
                    </p>
                  </div>
                </div>
                <div className="top-members-points">
                  <p className='mb-0'>
                    <FormattedMessage
                      defaultMessage={'{points}'}
                      description={'member points'}
                      values={{ points: member.points || '--' }}
                    />
                  </p>
                </div>
              </div>)
            }
          </div>
        </div>
      </div>
    </div>
  </>;
};

const clubLeaderBoard = [{
  clubName: 'Club 1',
  rank: 1,
  membersCount: 10,
  clubImage: '../../../../images/clubs/club.png',
  clubId: 'club-1',
  clubPoints: 1234,
}, {
  clubName: 'Club 2',
  rank: 2,
  membersCount: 9,
  clubImage: '../../../../images/clubs/club.png',
  clubId: 'club-2',
  clubPoints: 456,
}, {
  clubName: 'Club 3',
  rank: 3,
  membersCount: 1003,
  clubImage: '../../../../images/clubs/club.png',
  clubId: 'club-3',
  clubPoints: 23,
}];

const clubList = JSON.parse(JSON.stringify(clubLeaderBoard));
clubLeaderBoard.forEach((club, index) => {
  clubList.push({
    ...club,
    rank: index + 4,
  });
});

const clubFeedData = [{
  memberName: 'Member 1',
  memberImage: '../../../../images/clubs/club.png',
  activityType: 'award',
  activityImage: '../../../../images/clubs/club.png',
  activityMessage: 'New Award: Most Active Member',
}, {
  memberName: 'Member 2',
  memberImage: '../../../../images/clubs/club.png',
  activityType: 'badge',
  activityImage: '../../../../images/clubs/club.png',
  activityMessage: 'New Badge: Most Active Member',
}, {
  memberName: 'Member 3',
  memberImage: '../../../../images/profile/default_user.png',
  activityType: 'xp',
  activityImage: '../../../../images/profile/default_user.png',
  activityMessage: 'New XP: Most Active Member',
}, {
  memberName: 'Member 4',
  memberImage: '../../../../images/common/profile.png',
  activityType: 'points',
  activityImage: '../../../../images/clubs/club.png',
  activityMessage: 'New XP: Most Active Member',
}, {
  memberName: 'Member 5',
  memberImage: '../../../../images/clubs/club.png',
  activityType: 'xp',
  activityImage: '../../../../images/clubs/club.png',
  activityMessage: 'New XP: Most Active Member',
}, {
  memberName: 'Member 6',
  memberImage: '../../../../images/clubs/club.png',
  activityType: 'left',
  activityImage: '../../../../images/clubs/club.png',
  activityMessage: 'New XP: Most Active Member',
}, {
  memberName: 'Member 7',
  memberImage: '../../../../images/clubs/club.png',
  activityType: 'joined',
  activityImage: '../../../../images/clubs/club.png',
  activityMessage: 'New XP: Most Active Member',
}, {
  memberName: 'Member 8',
  memberImage: '../../../../images/clubs/club.png',
  activityType: 'kicked-out',
  activityImage: '../../../../images/clubs/club.png',
  activityMessage: 'New XP: Most Active Member',
}];

const HeroComponent = memo(HeroContainer);
const ClubListComponent = memo(ClubListContainer);
const ClubHeroComponent = memo(ClubHeroContainer);
const ClubFeedComponent = memo(ClubFeedContainer);
const ClubFeedMobComponent = memo(ClubFeedContainerMob);

const ClubHomeComponent = () => {
  const isPageMounted = React.useRef(true);
  const { session } = useGetSession({ isPageMounted });
  const { state: rootPageState } = useRootPageState();

  React.useEffect(() => {
    console.log();

    return () => {
      isPageMounted.current = false;
    };
  }, []);

  return <>
    <HeroComponent
      clubLeaderBoard={clubLeaderBoard}
      session={session}
      isDesktop={rootPageState.device === 'desktop'}
    />
    <ClubListComponent
      clubList={clubList}
      isDesktop={rootPageState.device === 'desktop'}
    />
  </>;
};

const ClubDashboardComponent = () => {
  const isPageMounted = React.useRef(true);
  const { state: rootPageState } = useRootPageState();

  const clubDashboardData = {
    status: 'success',
    hasClub: true,
    clubData: {
      clubName: 'club1',
      clubId: 'club1',
      clubImage: false,
      clubPoints: 4812,
      country: 'India',
      state: 'Tamil Nadu1',
      membersCount: 1,
      rank: 1,
    },
    topMembers: [
      {
        name: 'Balaji Anand B',
        profileImage: false,
        unique_url: 'BalajiAnand3',
        role: 'admin',
        points: 4046,
      },
    ],
  };

  const tpMEmbers = new Array(5).fill(clubDashboardData.topMembers[0]);

  React.useEffect(() => {
    console.log();

    return () => {
      isPageMounted.current = false;
    };
  });

  return <>
    {
      clubDashboardData.status === 'success'
      && clubDashboardData.clubData
      && <>
        <ClubHeroComponent
          clubData={clubDashboardData?.clubData}
          isDesktop={rootPageState.device === 'desktop'}
          userStatus={'member'}
        />
        {
          rootPageState.device === 'mobile'
          && <>
            <ClubFeedMobComponent
              clubName={clubDashboardData?.clubData?.clubName}
              feedData={clubFeedData}
            />
          </>
        }
        {
          rootPageState.device === 'desktop'
          && <>
            <ClubFeedComponent
              feedData={clubFeedData}
              topMembers={tpMEmbers}
            />
          </>
        }
      </>
    }
  </>;
};

const Clubs = () => {
  pageInit('clubs-container', 'Clubs');

  const [hasClub, setHasClub] = React.useState(false);
  const isPageMounted = React.useRef(true);

  React.useEffect(() => {
    const locationArray = window.location.href.split('/').filter((el) => el !== '');
    let clubId = '';
    if (locationArray.length > 3) {
      [, , , clubId] = locationArray;
      setHasClub(true);
      console.log('clubId', clubId);
    }
    return () => {
      isPageMounted.current = false;
    };
  }, []);

  return <>
    <div className='club-block col-12 col-md-11 col-xl-10 mx-auto'>
      { !hasClub && <ClubHomeComponent /> }
      { hasClub && <ClubDashboardComponent /> }
    </div>
  </>;
};

export default Clubs;
