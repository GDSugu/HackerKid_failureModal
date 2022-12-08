import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { ClubContext } from '../../../../../hooks/pages/clubs';
import useRootPageState from '../../../../../hooks/pages/root';
import { $, debounce } from '../../framework';
import AutoCompleteInputBox from '../AutoCompleteInputBox';
import Img from '../Img';
import Modal from '../Modal';

const clubDashboardManager = {
  validatedResult: {},
  isFieldValidated: false,
};

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

const ClubHeroContainer = ({
  clubDashboardStatus,
  clubData = {},
  isVisitor,
  isApplied,
  isDesktop,
  getClubDashboardData = () => {},
  joinClub = () => {},
  leaveClub = () => {},
}) => {
  const [profileImg, setProfileImg] = React.useState('../../../../images/clubs/club.svg');
  const actionBtnRef = React.useRef(null);
  const memberBtnRef = React.useRef(null);
  const visitorBtnRef = React.useRef(null);
  const pendingBtnRef = React.useRef(null);

  // const {
  //   status: clubDashboardStatus,
  //   clubData,
  // } = clubDashboardData;

  let clubHeroAction = '';

  if (Object.keys(clubData).length) {
    if (clubData?.clubImage) {
      const profileImage = (clubData?.clubImage)
        ?.toString()
        ?.replace(/(updatedAt=(\d+))/g, `updatedAt=${Date.now() / 1000}`);

      fetch(profileImage)
        .then((response) => {
          if (response.status === 200) {
            setProfileImg(profileImage);
          }
        });
    }
  }

  const toggleClubHeroBtnAction = (action, status) => {
    let elemRef = null;
    const hideElemRefs = [];
    switch (action) {
      case 'member-action':
        elemRef = memberBtnRef;
        hideElemRefs.push(visitorBtnRef, pendingBtnRef);
        break;
      case 'visitor-action':
        elemRef = visitorBtnRef;
        hideElemRefs.push(memberBtnRef, pendingBtnRef);
        break;
      case 'pending-action':
        elemRef = pendingBtnRef;
        hideElemRefs.push(memberBtnRef, visitorBtnRef);
        break;
      default: break;
    }
    if (elemRef?.current) {
      if (status === 'show') {
        elemRef.current.style.display = 'block';
      } else if (status === 'hide') {
        elemRef.current.style.display = 'none';
      }
    }
    hideElemRefs.forEach((elem) => {
      const ref = elem;
      if (ref?.current) {
        ref.current.style.display = 'none';
      }
    });
  };

  const getUserAction = (userStatus) => {
    if (userStatus === 'member') {
      clubHeroAction = 'member-action';
    } else if (userStatus === 'visitor') {
      clubHeroAction = 'visitor-action';
    } else if (userStatus === 'pending') {
      clubHeroAction = 'pending-action';
    }
    actionBtnRef?.current.classList.remove('member-action', 'visitor-action', 'pending-action');
    actionBtnRef?.current.classList.add(clubHeroAction);
    toggleClubHeroBtnAction(clubHeroAction, 'show');
  };

  const checkMemberStatus = () => {
    let userStatus = 'member';
    if (clubDashboardStatus) {
      // if (clubDashboardData?.isVisitor) {
      if (isVisitor) {
        userStatus = 'visitor';
      }
      if (isApplied) {
        userStatus = 'pending';
      }
    }
    getUserAction(userStatus);
    return userStatus;
  };

  const handleJoinClub = () => {
    const confirm = window.confirm('Are you sure you want to join this club?');
    if (confirm) {
      joinClub({ clubName: clubData?.clubName })
        .then((resp) => {
          if (resp !== 'access_denied' && resp?.status === 'success') {
            getUserAction('pending');
          }
        });
    }
  };

  const handleLeaveClub = () => {
    const confirm = window.confirm('Are you sure you want to leave this club?');
    if (confirm) {
      leaveClub()
        .then(() => {
          getUserAction('visitor');
          getClubDashboardData({ isVisiting: true, clubId: clubData?.clubId });
        });
    }
  };

  const toggleClubInfoModal = (toggleStatus) => {
    const elem = $('.club-info-modal');
    if (toggleStatus === 'hide') {
      elem.modal(toggleStatus);
    } else if (toggleStatus === 'show') {
      elem.modal({
        keyboard: false,
        backdrop: 'static',
      });
    }
  };

  const clubAction = (e) => {
    console.log('clubAction', e.target);
    checkMemberStatus();
    switch (clubHeroAction) {
      case 'member-action':
        toggleClubInfoModal('show');
        break;
      case 'visitor-action':
        handleJoinClub();
        break;
      case 'pending-action':
        handleLeaveClub();
        break;
      default: break;
    }
  };

  React.useEffect(() => {
    if (clubDashboardStatus) {
      checkMemberStatus();
    }
  }, [clubDashboardStatus]);

  return <>
    <div className="hero-card club-hero-card"
      style={{
        background: `${isDesktop ? `url(${profileImg}) no-repeat center left / contain, url(../../../../images/dashboard/dashboard-hero-bg-right.png) no-repeat center right / contain, var(--bg-1)` : `linear-gradient(270deg, #FFFFFF 50%, rgba(255, 255, 255, 0) 100%), url(${profileImg}) no-repeat center left / contain, var(--bg-1)`}`,
      }} >
      {/* <div className="hero-card-data col-6 col-sm-4"> */}
        {/* <div className="hero-card-data-content">
          <div className="hero-data">
            <Img src='common/hkcoin.png' />
            <p className='mb-0'>{`${clubData?.points || 0} coins`}</p>
          </div>
        </div> */}
        {
          isDesktop
          && <>
            <div className="club-card-data col">
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
                      values={{ xp: clubData?.xp || 0 }}
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
                      values={{ coins: clubData?.clubPoints || 0 }}
                    />
                  </p>
                </div>
              </div>
            </div>
            <button
              ref={actionBtnRef}
              className={'btn btn-block club-action-btn'}
              onClick={clubAction}>
              {
                // clubHeroAction === 'member-action'
                // && <>
                <div ref={memberBtnRef}>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0">
                      <FormattedMessage
                        defaultMessage={'About Club'}
                      />
                    </p>
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
                // {/* </> */}
              }
              {
                // clubHeroAction === 'visitor-action'
                // && <>
                <div ref={visitorBtnRef}>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0">
                      <FormattedMessage
                        defaultMessage={'Join this Club'}
                        description={'Join Club'}
                      />
                    </p>
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
                // {/* </> */}
              }
              {
                // clubHeroAction === 'pending-action'
                // && <>
                  <div ref={pendingBtnRef}>
                    <p className="mb-0">
                      <FormattedMessage
                        defaultMessage={'Approval Pending'}
                        description={'Approval Pending'}
                      />
                    </p>
                  </div>
                // </>
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
                values={{ coins: clubData?.clubPoints || 0 }}
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

const ClubAdminWarningBannerComponent = () => <>
  <div className="club-admin-warning-banner">
    <div className="d-flex align-items-center">
      <span className="info-circle">i</span>
      <p className="mb-0">
        <FormattedMessage
          defaultMessage={'Only admins can accept invites'}
          description={'Admin warning'}
        />
      </p>
    </div>
  </div>
</>;

const ClubFeedContainerMob = ({ clubName, feedData }) => {
  const isPageMounted = React.useRef(true);
  const { state: rootPageState } = useRootPageState({ isPageMounted });
  const clubContext = React.useContext(ClubContext);

  const {
    clubState: {
      inviteLink, clubDashboardResponse, clubInfoResponse, autoCompleteResponse,
    },
    clubStatic: {
      acceptClubInvite, addMemberToClub, autoCompleteUser, changeRole, clearMembersList,
      deleteClub, editFields, getClubInfo, getClubDashboardData,
      kickOutMember, leaveClub, rejectClubInvite, sendInvite, setClubImage,
    },
    locationState,
    locationStatic: { fetchLocation },
  } = clubContext;

  const {
    status: clubInfoStatus,
    adminList,
    applicantList,
    clubData,
    memberList,
    userData,
  } = clubInfoResponse;

  const { country } = clubData;

  React.useEffect(() => {
    getClubInfo();
    fetchLocation({ locationType: 'country' });
  }, []);

  React.useEffect(() => {
    if (country) {
      fetchLocation({ locationType: 'state', country });
    }
  }, [clubData]);

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
            {/* <div className="form-group">
              <label htmlFor="clubName">
                <FormattedMessage
                  defaultMessage={'Club Name'}
                  description={'Club Name'}
                />
              </label>
              <input
                type="text"
                className="form-control"
                name="clubName"
                id="clubName"
                aria-describedby="helpId"
                placeholder="Club name" />
            </div>
            <div className="form-group">
              <label htmlFor="country">
                <FormattedMessage
                  defaultMessage={'Country'}
                  description={'Country'}
                />
              </label>
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
            <div className="form-group">
              <label htmlFor="state">
                <FormattedMessage
                  defaultMessage={'State'}
                  description={'State'}
                />
              </label>
              <select className="form-control" name="state" id="state">
                <option selected>
                  <FormattedMessage
                    defaultMessage={'{state}'}
                    description={'state'}
                    values={{ state: 'Tamil Nadu' }}
                  />
                </option>
              </select>
            </div> */}
            {
              clubInfoStatus === 'success'
              && <>
                <ClubBasicInfoComponent
                  clubData={clubData}
                  isAdmin={userData?.role === 'admin'}
                  locationState={locationState}
                  isDesktop={rootPageState.device === 'desktop'}
                  editFields={editFields}
                  setClubImage={setClubImage}
                />
                <ClubMembersInfoComponent
                  adminList={adminList}
                  memberList={memberList}
                  isAdmin={userData?.role === 'admin'}
                  applicationList={applicantList}
                  addMemberToClub={addMemberToClub}
                  autoCompleteResponse={autoCompleteResponse}
                  autoCompleteUser={autoCompleteUser}
                  clearMembersList={clearMembersList}
                  sendInvite={sendInvite}
                  inviteLink={inviteLink}
                  changeRole={changeRole}
                  kickOutMember={kickOutMember}
                  acceptInvite={acceptClubInvite}
                  rejectClubInvite={rejectClubInvite}
                  userData={userData} />
                <ClubAdvancedComponent
                  clubDashboardData={clubDashboardResponse}
                  getClubDashboardData={getClubDashboardData}
                  leaveClub={leaveClub}
                  deleteClub={deleteClub}
                  isAdmin={userData?.role === 'admin'} />
              </>
            }
          </div>
        </div>
      </div>
    </div>
  </>;
};

const ClubFeedContainer = ({ feedData = [], topMembers = [] }) => {
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
                    defaultMessage={'Points'}
                    description={'sort by option'}
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
                      values={{ points: member.points || 0 }}
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

const ClubMemberComponent = ({
  isAdmin = false,
  isApplicant = false,
  member,
  handleRole = () => {},
  handleKick = () => {},
  handleAcceptInvite = () => {},
  handleRejectInvite = () => {},
  isCurrentUser = false,
}) => <>
  {
    member
    && <>
      <div className="club-member-row">
        <div className="d-flex align-items-center">
          <div className="club-member-img-container">
            <Img
              className='club-member-img'
              src={member.profileImage}
              fallback={'profile/default_user.png'}
              local={false}
              alt='Member profile image'
            />
          </div>
          <div className="club-member-name">
            <p className='mb-0'>
              <FormattedMessage
                defaultMessage={'{name}'}
                description={'member name'}
                values={{ name: member.name || '--' }}
              />
            </p>
          </div>
        </div>
        {
          <>
          {
            isAdmin
            && <>
              <div className="club-member-actions">
                {
                  !isApplicant
                  && <>
                    <button className={`btn btn-transparent member-remove-btn ${isCurrentUser ? 'hidden' : ''}`} onClick={() => handleKick(member)}>
                      <span>&times;</span>
                    </button>
                    <button className={`btn btn-transparent member-role-btn ${isCurrentUser ? 'hidden' : ''}`} onClick={() => handleRole(member)}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M6.19363 1.10215C6.26796 0.951591 6.38294 0.824828 6.52555 0.736193C6.66816 0.647558 6.83272 0.600586 7.00063 0.600586C7.16854 0.600586 7.3331 0.647558 7.47571 0.736193C7.61832 0.824828 7.73329 0.951591 7.80763 1.10215L9.32863 4.18415L12.7296 4.67815C12.8959 4.70213 13.0521 4.77216 13.1807 4.88033C13.3092 4.98849 13.4049 5.13046 13.4569 5.29019C13.5089 5.44991 13.5152 5.62101 13.475 5.78412C13.4349 5.94723 13.3499 6.09585 13.2296 6.21315L10.7676 8.61315L11.3486 12.0002C11.3769 12.1656 11.3583 12.3357 11.2949 12.4912C11.2316 12.6466 11.126 12.7813 10.9901 12.8799C10.8543 12.9785 10.6936 13.0372 10.5261 13.0492C10.3587 13.0613 10.1912 13.0263 10.0426 12.9482L7.00063 11.3502L3.95863 12.9501C3.80988 13.0284 3.64217 13.0635 3.47452 13.0514C3.30686 13.0393 3.14594 12.9804 3.01001 12.8816C2.87407 12.7827 2.76854 12.6477 2.70538 12.4919C2.64221 12.3361 2.62394 12.1658 2.65263 12.0002L3.23263 8.61315L0.772628 6.21415C0.652405 6.09691 0.56738 5.94838 0.527165 5.78534C0.486951 5.6223 0.493152 5.45126 0.545066 5.29157C0.596981 5.13187 0.692539 4.98988 0.820936 4.88165C0.949333 4.77343 1.10545 4.70328 1.27163 4.67915L4.67163 4.18515L6.19363 1.10315V1.10215Z"
                          fill={member.role === 'admin' ? '#FE6A07' : 'currentcolor'}/>
                      </svg>
                    </button>
                  </>
                }
                {
                  isApplicant
                  && <>
                    <button className={`btn btn-transparent member-remove-btn ${isCurrentUser ? 'hidden' : ''}`} onClick={() => handleRejectInvite(member)}>
                      <span>&times;</span>
                    </button>
                    <button className={`btn btn-transparent member-role-btn ${isCurrentUser ? 'hidden' : ''}`} onClick={() => handleAcceptInvite(member)}>
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M11.0198 0.27302C11.2125 0.455165 11.3249 0.706372 11.3324 0.971405C11.3399 1.23644 11.2419 1.4936 11.0598 1.68635L5.39313 7.68635C5.30129 7.78342 5.19092 7.8611 5.06856 7.91479C4.94619 7.96849 4.8143 7.99712 4.68068 7.99898C4.54707 8.00084 4.41443 7.97591 4.29061 7.92565C4.1668 7.87539 4.05431 7.80082 3.95979 7.70635L0.959795 4.70635C0.783155 4.51679 0.686991 4.26606 0.691562 4.00699C0.696133 3.74792 0.801082 3.50074 0.9843 3.31752C1.16752 3.13431 1.4147 3.02936 1.67377 3.02479C1.93283 3.02022 2.18356 3.11638 2.37313 3.29302L4.64646 5.56502L9.60646 0.31302C9.78861 0.120349 10.0398 0.00790167 10.3048 0.000400724C10.5699 -0.00710022 10.827 0.0909596 11.0198 0.27302Z"
                          fill="black"/>
                      </svg>
                    </button>
                  </>
                }
              </div>
            </>
          }
          </>
        }
      </div>
    </>
  }
</>;

const ClubBasicInfoComponent = ({
  clubData = {}, isAdmin = false, locationState, isDesktop = true,
  editFields = () => {}, toggleFooterBtn = () => {}, setClubImage = () => {},
}) => {
  const {
    clubName, clubId, clubImage,
    country, state,
  } = clubData;

  const checkFields = () => {
    let resStatus = false;
    clubDashboardManager.isFieldValidated = true;
    Object.keys(clubDashboardManager.validatedResult)
      .forEach((key) => {
        if (typeof clubDashboardManager.validatedResult[key] === 'object') {
          resStatus = clubDashboardManager.validatedResult[key].status;
        } else {
          resStatus = clubDashboardManager.validatedResult[key];
        }
        if (
          key === 'state'
          && locationState.stateResponse.states?.length === 0) {
          clubDashboardManager.validatedResult.state = true;
          resStatus = true;
        }
        clubDashboardManager.isFieldValidated &&= resStatus;
        if (!resStatus && key !== 'members') {
          $(`#${key}`).addClass('is-invalid');
        } else {
          $(`#${key}`).removeClass('is-invalid');
        }
      });
    toggleFooterBtn(!clubDashboardManager.isFieldValidated);
  };

  const handleInput = ({ fieldName, value }) => {
    const clubAction = 'update';
    const result = editFields({ fieldName, value, clubAction });
    clubDashboardManager.validatedResult[fieldName] = result;
    if (fieldName === 'country') {
      clubDashboardManager.validatedResult.state = false;
    }
    checkFields();
  };

  const handleSetImage = (e) => {
    try {
      const clubAction = 'update';
      $('.club-image-upload small').html('');
      const profileImg = e.target.files[0];
      const twoMBInKB = 2097152;
      if (profileImg && (!['image/jpeg', 'image/png'].includes(profileImg.type) || profileImg.size > twoMBInKB)) {
        $('.club-image-upload small').html('Image format should be one of JPG or PNG with size less than 2MB');
        throw new Error('FIELDS_CHECK_FAILED');
      }
      // setState({
      //   profileImage: profileImg,
      //   profileImageName: profileImg.name,
      // });
      setClubImage({ clubImage: profileImg, clubAction });
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    checkFields();
  }, [locationState]);

  return <>
    <div className="club-basic-info-container">
      {
        isDesktop
        && <>
          <div className="form-group">
            <label htmlFor="clubPicture">
              <FormattedMessage
                defaultMessage={'Profile Picture'}
                description={'Profile Picture label'}
              />
            </label>
            <div className="club-image-upload">
              <div className="club-image-container">
                <div
                  className="club-display-picture"
                  style={{
                    backgroundImage: (
                      (clubImage
                      && typeof clubImage !== 'string')
                        ? `url(${URL.createObjectURL(clubImage)})`
                        : `url(${clubImage})`
                    ),
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                  }}
                ></div>
                <div className="image-edit-btn">
                  <label htmlFor="upload-btn">
                    <Img
                      src='profile/profile-edit.png'
                      alt='image edit icon'
                      local={true}
                      useSource={true}
                      className={'image-edit-icon'}
                    />
                    <input type="file" accept='image/*' name="upload-btn" id="upload-btn" onChange={handleSetImage} />
                  </label>
                </div>
              </div>
              <small className='form-text text-danger mt-2'></small>
            </div>
          </div>
        </>
      }
      <div className="form-group">
        <label htmlFor="clubName">
          <FormattedMessage
            defaultMessage={'Club Name'}
            description={'Club Name'}
          />
        </label>
        <input type="text" readOnly className="form-control" name="clubName" id="clubName" aria-describedby="clubName" placeholder="Club Name" value={clubName || ''}/>
      </div>
      <div className="form-group">
        <label htmlFor="">
          <FormattedMessage
            defaultMessage={'Country'}
            description={'Country'}
          />
        </label>
        <select
          className="form-control"
          name="country"
          id="country"
          value={country || ''}
          disabled={!isAdmin}
          onChange={(e) => {
            handleInput({ fieldName: 'country', value: e.target.value, type: 'locationInput' });
          }} >
            <FormattedMessage
              defaultMessage={'{countryName}'}
              values={{ countryName: 'Select Country' }}
              >
              {(message) => <option value={false}>{message}</option>}
            </FormattedMessage>
          {
            locationState.countryResponse.status === 'success'
            && locationState.countryResponse.countries.map(
              (countryName, idx) => <FormattedMessage
                key={idx}
                defaultMessage={'{countryName}'}
                values={{ countryName }}
                >
                {(message) => <option value={countryName}>{message}</option>}
              </FormattedMessage>,
            )
          }
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="">
          <FormattedMessage
            defaultMessage={'State'}
            description={'State'}
          />
        </label>
        <select
          className="form-control"
          name="state"
          id="state"
          value={state}
          disabled={!isAdmin}
          onChange={(e) => { handleInput({ fieldName: 'state', value: e.target.value }); }}
          >
          <FormattedMessage
            defaultMessage={'{stateName}'}
            values={{ stateName: 'Select State' }}
            >
            {(message) => <option value={false}>{message}</option>}
          </FormattedMessage>
          {
            locationState.stateResponse.status === 'success'
            && locationState.stateResponse.states.map(
              (stateName, idx) => <FormattedMessage
                key={idx}
                defaultMessage={'{stateName}'}
                values={{ stateName }}
                >
                {(message) => <option value={stateName}>{message}</option>}
              </FormattedMessage>,
            )
          }
        </select>
      </div>
    </div>
  </>;
};

const ClubMembersInfoComponent = ({
  adminList = [],
  applicationList = [],
  memberList = [],
  autoCompleteResponse = {},
  autoCompleteUser = () => {},
  addMemberToClub = () => {},
  clearMembersList = () => {},
  sendInvite = () => {},
  changeRole = () => {},
  kickOutMember = () => {},
  acceptInvite = () => {},
  rejectClubInvite = () => {},
  isAdmin = false,
  inviteLink = '',
  userData = {},
}) => {
  const membersAutoCompleteRef = React.useRef(null);

  const handleInput = (value) => {
    membersAutoCompleteRef.current.setLoadingState(true);
    debounce(() => {
      if (value?.length) {
        autoCompleteUser({ userName: value });
      } else {
        membersAutoCompleteRef.current.setLoadingState(false);
      }
    }, 1000);
  };

  const handleAcceptInvite = (member) => {
    acceptInvite({ username: member.unique_url });
  };

  const handleRejectInvite = (member) => {
    rejectClubInvite({ username: member.unique_url });
  };

  const handleKick = (member) => {
    const result = window.confirm('Are you sure you want to kick this member out?');
    if (result) {
      kickOutMember({ username: member.unique_url });
    }
  };

  const handleRole = (member) => {
    let confirmationMsg = '';
    if (member?.role === 'admin') {
      confirmationMsg = 'Are you sure you want to make this admin as a member?';
    } else if (member?.role === 'member') {
      confirmationMsg = 'Are you sure you want to make this member as an admin?';
    }
    const result = window.confirm(confirmationMsg);
    if (result) {
      if (member?.role === 'admin') {
        changeRole({ userid: member?.unique_url, role: 'member' });
      } else if (member?.role === 'member') {
        changeRole({ userid: member?.unique_url, role: 'admin' });
      }
    }
  };

  const notifyInviteSent = (value) => {
    const memberInputField = $('.club-members-info-container #members');
    memberInputField.popover({
      content: `Invitation link sent to ${value}`,
    });
    memberInputField.popover('show');
    setTimeout(() => {
      memberInputField.popover('dispose');
    }, 1000);
  };

  const handleCopyLink = (e) => {
    const copyField = $('#clubLink');
    const copyButton = $(e.target);
    copyField.select();
    document.execCommand('copy');
    copyButton.popover({
      content: 'Copied!',
    });
    copyButton.popover('show');
    setTimeout(() => {
      copyButton.popover('hide');
    }, 1000);
  };

  const handleSuggestionClick = async (item) => {
    let suggestionResult = false;
    try {
      membersAutoCompleteRef.current.toggleDisbledState(true);
      suggestionResult = addMemberToClub({
        userName: item.userName, isNotHKUser: item?.isNotHKUser,
      })
        .then((res) => {
          let result = false;
          if (res.status === 'error') {
            membersAutoCompleteRef.current.toggleErrorMsg('show', res.message);
            membersAutoCompleteRef.current.toggleDisbledState(false);
          } else {
            membersAutoCompleteRef.current.toggleErrorMsg('hide');
            // membersAutoCompleteRef.current.clearInput();
            // send invite
            result = sendInvite();
          }
          return result;
        })
        .then((resp) => {
          if (resp !== 'access_denied') {
            if (resp.status === 'success') {
              notifyInviteSent(item.userName);
            } else if (resp.status === 'error') {
              membersAutoCompleteRef.current.toggleErrorMsg('show', resp.message);
            }
          }
          membersAutoCompleteRef.current.toggleDisbledState(false);
          clearMembersList();
          return resp;
        });
    } catch (error) {
      console.log('suggestion error', error);
      suggestionResult = error;
    }
    return suggestionResult;
  };

  React.useEffect(() => {
    clearMembersList();
  }, []);

  return <>
    <div className="club-members-info-container">
      {
        !isAdmin
        && <>
          <ClubAdminWarningBannerComponent />
        </>
      }
      <AutoCompleteInputBox
        ref={membersAutoCompleteRef}
        name="members"
        id="members"
        label={'Members'}
        placeholder={'Search members using their name, username or email'}
        list={autoCompleteResponse?.users}
        onInputChange={(e) => { handleInput(e.target.value); }}
        onSuggestionClick={handleSuggestionClick}
        SuggesstionItem={({ item }) => <>
          <div className={`d-flex align-items-center suggestion-card ${item?.isNotHKUser ? 'user-input' : ''}`} data-username={item?.userName?.toString()}>
            {
              !(item?.isNotHKUser)
              && <div className="user-image">
                <Img
                  src={item?.profileImage?.toString()}
                  alt={`${item?.name?.toString()} profile image`}
                  className="autocomplete-profileImage"
                  fallback='/profile/default_user.png'
                  local={false}
                />
              </div>
            }
            <div className="user-name">
              <p className="mb-0">
                <FormattedMessage
                  defaultMessage={'{name}'}
                  description={'user name'}
                  values={{
                    name: item?.name?.toString(),
                  }}
                />
              </p>
            </div>
          </div>
        </>}
      />
      <div className="club-members-container">
        {
          adminList
          && adminList.map((member, idx) => <ClubMemberComponent
              key={idx}
              member={member}
              handleRole={handleRole}
              handleKick={handleKick}
              isAdmin={isAdmin}
              isCurrentUser={member?.unique_url === userData?.unique_url}
            />)
        }
        {
          memberList
          && memberList.map((member, idx) => <ClubMemberComponent
              key={idx}
              member={member}
              handleKick={handleKick}
              handleRole={handleRole}
              isAdmin={isAdmin}
              isCurrentUser={member?.unique_url === userData?.unique_url}
            />)
        }
        {
          applicationList
          && applicationList.length > 0
          && <>
            <div className="divider">
              <p className="mb-0">
                <FormattedMessage
                  defaultMessage={'Invites'}
                  description={'Invites'}
                />
                <span></span>
              </p>
            </div>
            {
            applicationList.map((member, idx) => <ClubMemberComponent
              key={idx}
              member={member}
              handleInvites={handleKick}
              handleRole={handleRole}
              handleAcceptInvite={handleAcceptInvite}
              handleRejectInvite={handleRejectInvite}
              isApplicant={true}
              isAdmin={isAdmin}
              isCurrentUser={member?.unique_url === userData?.unique_url}
            />)
            }
          </>
        }
      </div>
      <div className="form-group">
        <label htmlFor="inviteLink">
          <FormattedMessage
            defaultMessage={'Or share this link to invite someone'}
            description={'Invite link input label'}
          />
        </label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            readOnly
            name="clubLink"
            id="clubLink"
            aria-describedby="clubLink"
            placeholder="club link"
            value={inviteLink} />
          <div className="input-group-append">
            {/* <Img
              src='clubs/copy.svg'
              className='copy-icon'
              alt='copy icon'
            /> */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="transparent"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleCopyLink}>
              <path d="M8 4V16C8 16.5304 8.21071 17.0391 8.58579 17.4142C8.96086 17.7893 9.46957 18 10 18H18C18.5304 18 19.0391 17.7893 19.4142 17.4142C19.7893 17.0391 20 16.5304 20 16V7.242C20 6.97556 19.9467 6.71181 19.8433 6.46624C19.7399 6.22068 19.5885 5.99824 19.398 5.812L16.083 2.57C15.7094 2.20466 15.2076 2.00007 14.685 2H10C9.46957 2 8.96086 2.21071 8.58579 2.58579C8.21071 2.96086 8 3.46957 8 4V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 18V20C16 20.5304 15.7893 21.0391 15.4142 21.4142C15.0391 21.7893 14.5304 22 14 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V9C4 8.46957 4.21071 7.96086 4.58579 7.58579C4.96086 7.21071 5.46957 7 6 7H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </>;
};

const ClubAdvancedComponent = ({
  isAdmin = false,
  clubDashboardData = {},
  getClubDashboardData = () => {},
  leaveClub = () => {},
  deleteClub = () => {},
}) => {
  const handleLeaveClub = () => {
    const confirm = window.confirm('Are you sure you want to leave this club?');
    if (confirm) {
      leaveClub()
        .then((res) => {
          if (res !== 'access_denied') {
            if (res?.status === 'success') {
              getClubDashboardData({ });
            } else if (res?.status === 'error') {
              window.alert(res?.message);
            }
          }
        });
    }
  };

  const handleDeleteClub = () => {
    const confirm = window.confirm('Are you sure you want to delete this club?');
    if (confirm) {
      deleteClub();
    }
  };

  React.useEffect(() => {
    if (clubDashboardData?.clubList) {
      window.history.replaceState({}, '', '/clubs/');
    }
  }, [clubDashboardData]);

  return <>
    <div className="club-advanced-container">
      {
        !isAdmin
        && <>
          <ClubAdminWarningBannerComponent />
        </>
      }
      <div className="form-group">
        <p>
          <FormattedMessage
            defaultMessage={'Delete Club'}
            description={'Delete club button label'}
          />
        </p>
        <button
          className={`btn btn-transparent btn-block ${!isAdmin ? 'disabled' : ''}`}
          disabled={!isAdmin}
          onClick={handleDeleteClub}>
          <FormattedMessage
            defaultMessage={'Delete Club'}
            description={'Delete club button label'}
          />
        </button>
        {
          !isAdmin
          && <div className="admin-delete-msg">
            <p className="mb-0">
              <FormattedMessage
                defaultMessage={'Only admins can delete club'}
                description={'Only admins can delete club'}
              />
            </p>
          </div>
        }
      </div>
      <div className="form-group">
        <p>
          <FormattedMessage
            defaultMessage={'Leave Club'}
            description={'Leave club button label'}
          />
        </p>
        <button className="btn btn-transparent btn-block" onClick={handleLeaveClub}>
          <FormattedMessage
            defaultMessage={'Leave Club'}
            description={'Leave club button label'}
          />
        </button>
      </div>
    </div>
  </>;
};

const ClubInfoModalComponent = () => {
  const isPageMounted = React.useRef(true);
  const { state: rootPageState } = useRootPageState({ isPageMounted });
  const clubContext = React.useContext(ClubContext);
  const clubFooterBtnRef = React.useRef(null);

  const {
    clubState: {
      inviteLink, clubDashboardResponse, clubInfoResponse, autoCompleteResponse,
    },
    clubStatic: {
      acceptClubInvite, addMemberToClub, autoCompleteUser, clearMembersList,
      changeRole, deleteClub, editFields, getClubInfo, getClubDashboardData,
      kickOutMember, leaveClub, rejectClubInvite, sendInvite, setClubImage,
    },
    locationState,
    locationStatic: { fetchLocation },
  } = clubContext;

  const {
    status,
    adminList,
    applicantList,
    clubData,
    memberList,
    userData,
  } = clubInfoResponse;

  const toggleFooterBtn = (isDisabled = false) => {
    if (clubFooterBtnRef.current) {
      clubFooterBtnRef.current.disabled = isDisabled;
    }
  };

  const handleFooterBtnClick = () => {};

  React.useEffect(() => {
    getClubInfo();
    fetchLocation({ locationType: 'country' });
  }, []);

  React.useEffect(() => {
    if (status === 'success' && clubData?.country) {
      fetchLocation({ locationType: 'state', country: clubData?.country });
    }
  }, [clubData]);

  return <>
    <div className="club-info-modal-body">
      <ul className="nav nav-tabs" id="club-tabs">
        <li className="nav-item">
          <a className="nav-link active" data-toggle="tab" href="#club-info-tab">
            <FormattedMessage
              defaultMessage={'Basic Info'}
              description={'Basic Info tab title'}
            />
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab" href="#club-members-tab">
            <FormattedMessage
              defaultMessage={'Members'}
              description={'Members'}
            />
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab" href="#club-advanced-tab">
            <FormattedMessage
              defaultMessage={'Advanced Options'}
              description={'Advanced Options tab title'}
            />
          </a>
        </li>
      </ul>
      <div className="tab-content" id='clubTabsContent'>
        <div className="tab-pane fade show active" id="club-info-tab">
          {
            status === 'success'
            && <>
              <ClubBasicInfoComponent
                clubData={clubData}
                isAdmin={userData?.role === 'admin'}
                locationState={locationState}
                isDesktop={rootPageState.device === 'desktop'}
                editFields={editFields}
                toggleFooterBtn={toggleFooterBtn}
                setClubImage={setClubImage} />
            </>
          }
        </div>
        <div className="tab-pane fade" id="club-members-tab">
          {
            status === 'success'
            && <>
             <ClubMembersInfoComponent
              adminList={adminList}
              memberList={memberList}
              isAdmin={userData?.role === 'admin'}
              applicationList={applicantList}
              addMemberToClub={addMemberToClub}
              autoCompleteResponse={autoCompleteResponse}
              autoCompleteUser={autoCompleteUser}
              clearMembersList={clearMembersList}
              sendInvite={sendInvite}
              inviteLink={inviteLink}
              changeRole={changeRole}
              kickOutMember={kickOutMember}
              acceptInvite={acceptClubInvite}
              rejectClubInvite={rejectClubInvite}
              userData={userData}
              toggleFooterBtn={toggleFooterBtn} />
            </>
          }
        </div>
        <div className="tab-pane fade" id="club-advanced-tab">
          {
            status === 'success'
            && <>
              <ClubAdvancedComponent
                clubDashboardData={clubDashboardResponse}
                getClubDashboardData={getClubDashboardData}
                leaveClub={leaveClub}
                deleteClub={deleteClub}
                isAdmin={userData?.role === 'admin'} />
            </>
          }
        </div>
      </div>
    </div>
    <button className="btn btn-primary btn-block club-info-footer-btn" ref={clubFooterBtnRef} onClick={handleFooterBtnClick}>
      <FormattedMessage
        defaultMessage={'Save & Exit'}
        description={'save button'}
      />
    </button>
  </>;
};

const ClubInfoContainer = () => {
  console.log('clubInfoContainer ');

  return <>
    <Modal
      modalClass='club-info-modal'
      customClass='curved'
      modalTitle='Club Info'
      options={{
        keyboard: false,
        backdrop: 'static',
      }}
      header = {
        <div>
          <h5 className="modal-title">
            <FormattedMessage
              defaultMessage={'Club Info'}
              description={'Club Info modal title'}
            />
            </h5>
        </div>
      }
    >
      <ClubInfoModalComponent />
    </Modal>
  </>;
};

const ClubMemberProfileContainer = ({ memberData }) => {
  console.log('clubMemberProfileContainer ', memberData);

  return <></>;
};

const ClubHeroComponent = memo(ClubHeroContainer);
const ClubFeedComponent = memo(ClubFeedContainer);
const ClubFeedMobComponent = memo(ClubFeedContainerMob);
const ClubInfoComponent = memo(ClubInfoContainer);
const ClubMemberProfileComponent = memo(ClubMemberProfileContainer);

const ClubDashboardComponent = () => {
  const isPageMounted = React.useRef(true);
  const { state: rootPageState } = useRootPageState();
  const {
    clubState: { clubDashboardResponse: clubDashboardData },
    clubStatic: { getClubDashboardData, joinClub, leaveClub },
  } = React.useContext(ClubContext);
  const {
    status: clubDashboardStatus,
    // hasClub,
    clubData,
    topMembers,
    isVisitor,
    isApplied,
  } = clubDashboardData;

  // let userStatus = 'member';
  // if (clubDashboardStatus && clubDashboardData?.isVisitor) {
  //   userStatus = 'visitor';
  //   if (clubDashboardData?.isApplied) {
  //     userStatus = 'pending';
  //   }
  // }

  React.useEffect(() => {
    console.log();

    return () => {
      isPageMounted.current = false;
    };
  }, []);

  return <>
    {
      clubDashboardStatus === 'success'
      && clubData
      && <>
        <ClubHeroComponent
          clubDashboardStatus={clubDashboardStatus}
          clubData={clubData}
          isVisitor={isVisitor}
          isApplied={isApplied}
          // clubDashboardData={clubDashboardData}
          isDesktop={rootPageState.device === 'desktop'}
          joinClub={joinClub}
          leaveClub={leaveClub}
          getClubDashboardData={getClubDashboardData}
        />
        {
          rootPageState.device === 'mobile'
          && <>
            <ClubFeedMobComponent
              clubName={clubData?.clubName}
              feedData={clubFeedData}
            />
          </>
        }
        {
          rootPageState.device === 'desktop'
          && <>
            <ClubFeedComponent
              feedData={clubFeedData}
              topMembers={topMembers?.slice(0, 5)}
            />
          </>
        }
        <ClubInfoComponent />
        <ClubMemberProfileComponent />
      </>
    }
  </>;
};

export default null;

export {
  ClubDashboardComponent,
};
