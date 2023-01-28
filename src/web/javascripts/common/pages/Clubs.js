import React from 'react';
import '../../../stylesheets/common/pages/clubs/style.scss';
import useRootPageState, { useGetSession } from '../../../../hooks/pages/root';
import { ClubContext, useClubs } from '../../../../hooks/pages/clubs';
import { useCountryStateCity } from '../../../../hooks/common/CountryStateCity';
import FragmentNavBar from '../components/FragmentNavBar';
import ClubDashboardComponent from '../components/ClubDashboardComponents';
import ClubHomeComponent from '../components/ClubHomeComponent';
import {
  $, pageInit,
} from '../framework';

const MemoizedClubDashboardComponent = React.memo(ClubDashboardComponent);
const MemoizedClubHomeComponent = React.memo(ClubHomeComponent);

const Clubs = () => {
  pageInit('clubs-container', 'Clubs');

  const isPageMounted = React.useRef(true);
  const {
    state: clubState,
    static: clubStatic,
  } = useClubs({ isPageMounted });
  const {
    state: locationState,
    static: locationStatic,
  } = useCountryStateCity({ isPageMounted });
  const { state: rootPageState } = useRootPageState();
  const { session: sessionState } = useGetSession({ isPageMounted });
  const params = new URLSearchParams(window.location.search);

  const { appData, clubDashboardResponse: clubDashboardData } = clubState;
  const { showClub } = appData;
  const {
    getClubDashboardData, joinClub, setAppData,
  } = clubStatic;

  const {
    clubData,
    clubList,
    status: clubDashboardStatus,
  } = clubDashboardData;

  let clubId = '';
  const urlData = {
    clubId: false,
    action: params.get('action'),
    invitedByUserName: params.get('invitedBy'),
    userEmail: params.get('userEmail'),
  };

  const toggleMobNavBar = () => {
    if (rootPageState.device === 'mobile') {
      $('nav:not(.fragment-nav-bar)').css('display', 'none');
    } else if (rootPageState.device === 'desktop') {
      $('nav.fragment-nav-bar').css('display', 'none');
    }
  };

  React.useEffect(() => {
    toggleMobNavBar();
    const locationArray = window.location.href.split('/').filter((el) => el !== '');
    if (locationArray.length > 3) {
      [, , , clubId] = locationArray;

      // setHasClub(true);
      urlData.clubId = clubId;
      getClubDashboardData({ clubId, isVisiting: true });
      setAppData('showClub', true);
    } else {
      getClubDashboardData({});
    }
    return () => {
      isPageMounted.current = false;
    };
  }, []);

  React.useEffect(() => {
    if (clubDashboardStatus) {
      if (clubDashboardStatus === 'error') {
        setAppData('showClub', false);
        window.location.href = '/clubs/';
      }
      if (clubData) {
        setAppData('showClub', true);
        if (window.location.pathname === '/clubs/' || window.location.pathname === '/clubs') {
          window.history.replaceState({}, '', `/clubs/${clubData?.clubId}/`);
        }

        if (urlData.action === 'join' && urlData.invitedByUserName && urlData.userEmail) {
          joinClub({
            invitedBy: urlData.invitedByUserName,
            userEmail: urlData.userEmail,
          })
            .then((resp) => {
              if (resp !== 'access_denied') {
                if (resp.status === 'error') {
                  alert(resp.message);
                } else if (resp.status === 'success') {
                  getClubDashboardData({});
                }
              }
              window.history.replaceState({}, '', `/clubs/${clubData?.clubId}/`);
            });
        }
      }

      if (clubList) {
        setAppData('showClub', false);
        window.history.replaceState({}, '', '/clubs/');
      }
    }
  }, [clubDashboardData]);

  return <>
  <ClubContext.Provider
    value={{
      clubState,
      sessionState,
      clubStatic,
      locationState,
      locationStatic,
    }}
  >
    <FragmentNavBar />
    <div className='club-block col-12 col-md-11 col-xl-10 mx-auto'>
      {
        clubDashboardStatus && <>
        {
          showClub !== null
          && <>
            { !showClub
              && <>
              <MemoizedClubHomeComponent
                // clubList={clubList}
              />
            </>}
            { showClub
              && <>
              <MemoizedClubDashboardComponent
                // clubDashboardData={clubDashboardResponse}
                // getClubDashboardData={getClubDashboardData}
                // joinClub={joinClub}
                // leaveClub={leaveClub}
                />
            </> }
          </>
        }
        </>
      }
    </div>
  </ClubContext.Provider>
  </>;
};

export default Clubs;
