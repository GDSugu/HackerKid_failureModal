import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import '../../../stylesheets/common/pages/clubs/style.scss';
import useRootPageState, { SubscriptionContext, useGetSession } from '../../../../hooks/pages/root';
import { ClubContext, useClubs } from '../../../../hooks/pages/clubs';
import { useCountryStateCity } from '../../../../hooks/common/CountryStateCity';
import FragmentNavBar from '../components/FragmentNavBar';
import ClubDashboardComponent from '../components/ClubDashboardComponents';
import ClubHomeComponent from '../components/ClubHomeComponent';
import {
  $, isFeatureEnabled, pageInit, pathNavigator, timeTrack,
} from '../framework';
import Modal from '../components/Modal';

const MemoizedClubDashboardComponent = React.memo(ClubDashboardComponent);
const MemoizedClubHomeComponent = React.memo(ClubHomeComponent);

const Clubs = () => {
  pageInit('clubs-container', 'Clubs');

  timeTrack('clubs');

  const { subscriptionData } = React.useContext(SubscriptionContext);

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
  const tryAgainModalRef = useRef(true);
  const clubUrlParams = useParams();
  const { id: clubId } = clubUrlParams;

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

  const tryAgainAction = () => {
    window.location.href = '/clubs/';
  };

  const showTryAgainModal = () => tryAgainModalRef?.current?.showWithRestriction();
  const hideTryAgainModal = () => tryAgainModalRef?.current?.hide();

  const clubEnabled = isFeatureEnabled(subscriptionData, 'clubs');

  React.useEffect(() => {
    if (clubEnabled && !clubEnabled.enabled) {
      pathNavigator('pricing');
    }
  }, [clubEnabled]);

  React.useEffect(() => {
    toggleMobNavBar();

    $('#loader').show();
    if (clubId && clubId !== '') {
      urlData.clubId = clubId;
      getClubDashboardData({ clubId, isVisiting: true });
      setAppData('showClub', true);
    } else {
      getClubDashboardData({});
    }

    return () => {
      isPageMounted.current = false;
      hideTryAgainModal();
      $('#loader').hide();
    };
  }, []);

  React.useEffect(() => {
    if (clubDashboardStatus) {
      $('#loader').hide();
      const urlRegex = /(\/clubs)(\/)?/g;
      if (clubDashboardStatus === 'error') {
        setAppData('showClub', false);
        showTryAgainModal();
      }
      if (clubData) {
        setAppData('showClub', true);
        if (urlRegex.test(window.location.pathname)) {
          window.history.replaceState({}, '', `/clubs/${clubData?.clubId}/`);
        }

        if (urlData.action === 'join' && urlData.invitedByUserName && urlData.userEmail) {
          $('#loader').show();
          joinClub({
            invitedBy: urlData.invitedByUserName,
            userEmail: urlData.userEmail,
          })
            .then((resp) => {
              $('#loader').show();
              if (resp !== 'access_denied') {
                if (resp.status === 'error') {
                  console.log(resp.message);
                } else if (resp.status === 'success') {
                  getClubDashboardData({});
                  $('#loader').show();
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
              />
            </>}
            { showClub
              && <>
              <MemoizedClubDashboardComponent
                />
            </> }
          </>
        }
        </>
      }
    <div id="loader"></div>
    </div>
    <Modal
      modalClass='errorModal'
      customClass={'curved'}
      options={'hide'}
      ref={tryAgainModalRef} >
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
        onClick={tryAgainAction} >
        <FormattedMessage
          defaultMessage='Try again'
          description='try again btn'
        />
      </button>
    </Modal>
  </ClubContext.Provider>
  </>;
};

export default Clubs;
