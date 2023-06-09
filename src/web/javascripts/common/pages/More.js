import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { SubscriptionContext, useGetSession } from '../../../../hooks/pages/root';
import '../../../stylesheets/common/pages/more/style.scss';
import {
  $, loginCheck, pageInit, authorize, pathNavigator, timeTrack, isFeatureEnabled,
} from '../framework';
import Img from '../components/Img';
import Modal from '../components/Modal';
import HelpModal from '../components/HelpModal';
import { useProfileInfo } from '../../../../hooks/pages/profile';
import AwardCard from '../components/AwardsCard';
// import CollectibleCard from '../components/CollectibleCard';
import { useAwards } from '../../../../hooks/pages/awards';
// import AwardsNotificationModal from '../components/AwardsNotificationCard';
import { copyHandler } from '../Functions/turtle';
import AwardInfo from '../components/AwardsInfo';

const Certificates = ({ gameDetails, onCertificateShareBtnClick = () => { } }) => {
  const certificateDataObj = gameDetails?.[0].certificateData;
  const certificatesArr = certificateDataObj && Object.values(certificateDataObj).slice(0, 3);

  return <ul className='certificates-list'>
    {
      (!certificatesArr || certificatesArr.length === 0)
      && <h5 className='text-center'>
        <FormattedMessage defaultMessage={'No Certificates Found'} description='no certificates' />
      </h5>
    }
    {
      certificatesArr?.map((certificate, idx) => <li className='body-bold' key={idx}>
        <img src='../../../../images/common/black-joystick.svg' className='list-icon' alt='list-icon' />
        <FormattedMessage
          defaultMessage={'{certificateName}'}
          description='certificate name'
          values={{
            certificateName: certificate.certificateName,
          }}
        />
        <button type='button' className='share-btn' onClick={() => onCertificateShareBtnClick(certificate.certificateId)}>
          <img src='../../../../images/common/black-share-icon.svg' className='share-icon' alt='list-icon' />
        </button>
      </li>)
    }
  </ul>;
};

const Awards = ({
  awards,
  showSeeMoreCard = true,
  isDesktop,
}) => <div className='row'>
    {
      awards && awards.map((award, idx) => <div className='col-4 col-lg-3 px-2 py-2' key={idx}>
        <div className='award-card-with-awards-info'>
          <AwardCard
            className={`pointer-cursor award-card-${award.awardId}`}
            awardImage={award.awardImage}
            awardName={award.awardName}
            interactable={true}
          />
          <AwardInfo
            isDesktop={isDesktop}
            className={`award-info-container-${award.awardId}`}
            currentAwardDetails={award}
            repeatingAwards={award.repeatingAwards ? award.repeatingAwards : false}
          />
        </div>
      </div>)
    }
    {
      awards && isDesktop && showSeeMoreCard && <div className='col-4 col-lg-3 px-2 py-2'>
        <Link to='/awards' className='achievement-card award-card navigation-link'>
          <FormattedMessage defaultMessage={'See more'} description='see more card text' />
        </Link>
      </div>
    }
    {
      !awards && [1, 2, 3, 4].map((_, idx) => <div key={idx} className='skeleton-container col-4 col-lg-3 px-2 py-2'>
        <div className='award-card skeleton'></div>
      </div>)
    }
  </div>;

// const Collectibles = () => <div className='row'>
//   <div className='col-6 col-sm-4 col-lg-3 px-2 py-2 px-md-2 py-md-2'>
//     <CollectibleCard rarity={'Common'} />
//   </div>
//   <div className='col-6 col-sm-4 col-lg-3 px-2 py-2 px-md-2 py-md-2'>
//     <CollectibleCard rarity={'Rare'} />
//   </div>
//   <div className='col-6 col-sm-4 col-lg-3 px-2 py-2 px-md-2 py-md-2'>
//     <CollectibleCard rarity={'Rare'} />
//   </div>
//   <div className='col-6 col-sm-4 col-lg-3 px-2 py-2 px-md-2 py-md-2'>
//     <Link to='/collectibles' className='achievement-card collectible-card navigation-link'>
//       <FormattedMessage defaultMessage={'See more'} description='see more card text' />
//     </Link>
//   </div>
// </div>;

const handleClubCard = (clubEnabled) => {
  if (clubEnabled) {
    pathNavigator('clubs');
  } else {
    pathNavigator('pricing');
  }
};

const handleAwardsCard = () => {
  pathNavigator('awards');
};

const MoreHero = ({ isDesktop, session, toggleModal }) => <>
  <div className="more-hero-container">
    <div className="hero-card">
      <div className="hero-card-data col-6 col-sm-4">
        <div className="hero-card-img" style={(session.profileLink || '../../../../../images/common/profile.png') && { backgroundImage: `url(${session.profileLink ? session.profileLink : '../../../../../images/common/profile.png'})` }}></div>
        {isDesktop
          && <>
            <div className="hero-card-data-content">
              <div className="hero-data">
                <Img src='common/hkcoin.png' />
                <p className='mb-0'>{`${session.pointsEarned || '--'} coins`}</p>
              </div>
              {/* <div className="hero-data">
                  <Img src='common/xp.png' />
                  <p className='mb-0'>
                    <FormattedMessage
                      defaultMessage={`${12345 || '--'} XP`}
                      description={'hk XP'}
                    />
                  </p>
                </div> */}
            </div>
          </>}
      </div>
      <div className="hero-card-nav col-6 col-sm-8">
        <div className="col-10 d-flex mx-auto">
          <div className="col-4"></div>
          <div className="col-8">
            <div className="streak-container">
              <button className="more-menu-card btn btn-block" onClick={toggleModal}>
                <p>
                  <FormattedMessage
                    defaultMessage={'Your Collections and Perks'}
                    description={'more menu button'}
                  />
                </p>
                <i className="fas fa-angle-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="hero-card-mob">
      <div className='hero-card-nav'>
        <div className="streak-container">
          <button className="more-menu-card btn btn-block" onClick={toggleModal}>
            <p>
              <FormattedMessage
                defaultMessage={'Your Collections and Perks'}
                description={'more menu button'}
              />
            </p>
            <i className="fas fa-angle-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</>;

const MoreCards = ({ clubsEnabled }) => <>
  <div className="more-card-container">
    <div className="row no-gutters align-items-stretch">
      <div className='more-card-block col-12'>
        <div className="more-card-block-cntnr collectible-card">
          <div className="more-card">
            <div className="more-card-contnr">
              <h5 className="more-card-title">
                <FormattedMessage
                  defaultMessage={'Check your award collections and certificates'}
                  description={'more card title'}
                />
              </h5>
            </div>
            <div className="more-card-btn-container">
              <button className="more-card-btn btn" onClick={handleAwardsCard}
>
                <p>
                  <FormattedMessage
                    defaultMessage={'View'}
                    description={'more card button'}
                  />
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='more-card-block col-12'>
        <div className="more-card-block-cntnr club-card">
          {
            clubsEnabled ? <div className="more-card">
            <div className="more-card-contnr">
              <h5 className="more-card-title">
                <FormattedMessage
                  defaultMessage={'More friends = More fun'}
                  description={'more card title'}
                />
              </h5>
              <p className='more-card-subtitle'>
                <FormattedMessage
                  defaultMessage={'Join your friends in the club'}
                  description={'more card subtitle'}
                />
              </p>
            </div>
            <div className="more-card-btn-container">
              <button className="more-card-btn btn" onClick={() => handleClubCard(clubsEnabled)}>
                <p>
                  <FormattedMessage
                    defaultMessage={'Visit Club'}
                    description={'more card button'}
                  />
                </p>
              </button>
            </div>
          </div>
              : <div className="more-card">
          <div className="more-card-contnr">
            <h5 className="more-card-title">
              <FormattedMessage
                defaultMessage={'School Clubs'}
                description={'more card title'}
              />
            </h5>
            <p className='more-card-subtitle'>
            Buy premium to use this feature
            </p>
          </div>
          <div className="more-card-btn-container">
            <button className="more-card-btn btn" onClick={() => handleClubCard(clubsEnabled)}>
              <p>
                <FormattedMessage
                  defaultMessage={'Unlock Now'}
                  description={'Unlock Now button'}
                />
              </p>
            </button>
          </div>
        </div>
          }

        </div>
      </div>
      <div className='more-card-block col-12'>
        <div className="more-card-block-cntnr ide-card">
          <div className="more-card">
            <div className="more-card-contnr">
              <h5 className="more-card-title">
                <FormattedMessage
                  defaultMessage={'Try the new in-built IDE'}
                  description={'more card title'}
                />
              </h5>
              <p className='more-card-subtitle'>
                <FormattedMessage
                  defaultMessage={'Practise... or play with the new code editor'}
                  description={'more card subtitle'}
                />
              </p>
            </div>
            <div className="more-card-btn-container">
              <Link to={'/ide'} className="more-card-btn btn">
                <p>
                  <FormattedMessage
                    defaultMessage={'Try IDE Now'}
                    description={'more card button'}
                  />
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>;

const MoreMenu = ({ logoutHandler = () => { } }) => <>
  <div className="more-menu-container">
    <button className="more-menu-card btn btn-block" onClick={logoutHandler}>
      <p>
        <FormattedMessage
          defaultMessage={'Logout'}
          description={'more menu button'}
        />
      </p>
      <i className="fas fa-angle-right"></i>
    </button>
    <Link to='/profile/edit' className="more-menu-card btn btn-block">
      <p>
        <FormattedMessage
          defaultMessage={'Account Settings'}
          description={'more menu button'}
        />
      </p>
      <i className="fas fa-angle-right"></i>
    </Link>
    <Link to='/pricing' className="more-menu-card btn btn-block">
      <p>
        <FormattedMessage
          defaultMessage={'Subscription'}
          description={'more menu button'}
        />
      </p>
      <i className="fas fa-angle-right"></i>
    </Link>
    <button className="more-menu-card btn btn-block" onClick={() => $('.help-modal').modal('show')}>
      <p>
        <FormattedMessage
          defaultMessage={'Help'}
          description={'more menu button'}
        />
      </p>
      <i className="fas fa-angle-right"></i>
    </button>
  </div>
</>;

const LogoutModalComponent = ({ logoutAction, closeModal }) => <>
  <div className='logoutContainer'>
    <h5>
      <FormattedMessage
        defaultMessage='Are you sure you want to logout?'
        description='logout prompt message'
      />
    </h5>
    <div className="d-flex align-items-center justify-content-center">
      <button className='btn btn-primary' onClick={logoutAction}>
        <FormattedMessage
          defaultMessage='Yes'
          description='logout yes btn'
        />
      </button>
      <button className='btn btn-outline-primary' onClick={closeModal} >
        <FormattedMessage
          defaultMessage='No'
          description='logout no btn'
        />
      </button>
    </div>
  </div>
</>;

const CollectionsModalComponent = ({
  toggleModal,
  gameDetails,
  awards,
  // collectibles,
  isDesktop,
  session,
  onCertificateShareBtnClick,
}) => <>
    <div className='col-12 col-md-10 mx-auto'>
      {
        !isDesktop
        && <div className='mob-hero-card'>
          <div className='stats-container'>
            <div className="hero-data">
              <Img src='common/hkcoin.png' />
              <p className='mb-0'>{`${session.pointsEarned || '--'} coins`}</p>
            </div>
          </div>
          <div className='leaderboard-container'>
            <img src='../../../../../images/more/leaderboard.svg' alt='leaderboard' />
            <Link to='/leaderboard' className='btn btn-primary view-more-btn'>
              <FormattedMessage defaultMessage='Leaderboard' description='leaderboard button' />
              <i className='fas fa-angle-right' />
            </Link>
          </div>
        </div>
      }
      <div className={`certificates-block collection-block ${!isDesktop ? 'mob-certificates-block' : ''}`}>
        <div className="collection-header d-flex justify-content-between">
          <h5>
            <FormattedMessage
              defaultMessage={'Certificates'}
              description={'collection header'}
            />
          </h5>
          {
            isDesktop && gameDetails && Object.keys(gameDetails[0].certificateData).length > 0
            && <Link to={'/certificates'} className='navigation-link'>
              <FormattedMessage defaultMessage={'See More'} description='see more certificates link' />
            </Link>
          }
        </div>
        <div className="collection-content">
          <Certificates
            gameDetails={gameDetails}
            onCertificateShareBtnClick={onCertificateShareBtnClick} />
          {
            !isDesktop && gameDetails && Object.keys(gameDetails[0].certificateData).length > 0
            && <Link to={'/certificates'} type='button' className='btn btn-primary btn-block body-bold view-more-btn'>
              <FormattedMessage
                defaultMessage={'View Certificates'}
                description='View certificates button'
              />
              <i className='fas fa-angle-right' />
            </Link>
          }
        </div>
      </div>
      <div className={`awards-block collection-block ${!isDesktop ? 'mob-awards-block' : ''}`}>
        <div className="collection-header">
          <h5>
            <FormattedMessage
              defaultMessage={'Awards'}
              description={'collection header'}
            />
          </h5>
        </div>
        <div className="awards-content">
          <Awards
            awards={awards}
            isDesktop={isDesktop}
          />
          {
            !isDesktop
            && <Link to='/awards' className='btn btn-primary btn-block body-bold view-more-btn mt-2'>
              <FormattedMessage
                defaultMessage={'View Awards'}
                description='View Awards button'
              />
              <i className='fas fa-angle-right' />
            </Link>
          }
        </div>
      </div>
      {/* <div
      className={`collectibles-block collection-block ${!isDesktop
        ? 'mob-collectibles-block' : ''}`}>
        <div className="collection-header">
          <h5>
            <FormattedMessage
              defaultMessage={'Collectibles'}
              description={'collection header'}
            />
          </h5>
        </div>
        <div className="collection-content">
          <Collectibles />
        </div>
      </div> */}
    </div>
    {
      isDesktop
      && <div className='footer'
        onClick={() => {
          toggleModal();
          window.location.pathname = '/certificates';
        }}>
        <button className='footer-btn'>
          <FormattedMessage
            defaultMessage={'View all collections'}
            description={'modal collection button'}
          />
        </button>
      </div>
    }
  </>;

const More = () => {
  if (window.location.href.includes('more')) {
    pageInit('more-container', 'More');
  }

  const isPageMounted = React.useRef(true);

  timeTrack('more');
  const { subscriptionData } = React.useContext(SubscriptionContext);

  const isClubEnabled = () => {
    const clubEnabled = isFeatureEnabled(subscriptionData, 'clubs');
    return clubEnabled && clubEnabled.enabled;
  };

  const [isDesktop, setIsDesktop] = React.useState(window.matchMedia('(min-width: 576px)').matches);
  const { session } = useGetSession({ sessionAttr: ['name', 'pointsEarned', 'profileLink'], isPageMounted });
  const {
    state: {
      uniqueUrl,
    },
  } = useProfileInfo({ isPageMounted });
  const {
    state: {
      gameDetails,
    },
    getProfileData,
  } = useProfileInfo({ isPageMounted, action: 'getProfileData', uniqueurl: uniqueUrl });

  const {
    awardsState,
    getAwards,
  } = useAwards({ isPageMounted, initializeData: false });

  const { awards } = awardsState;

  const collectionRef = React.useRef();
  const logoutModalRef = React.useRef();
  const shareCertificateModalRef = React.useRef();

  // const toggleModal = () => setCollectionModalVisibile(!collectionModalVisibile);
  const toggleModal = () => collectionRef.current.show();

  const showLogoutModal = () => logoutModalRef.current.show();
  const closeLogoutModal = () => logoutModalRef.current.hide();

  const logoutHandler = () => {
    authorize.logout();
  };

  React.useEffect(() => {
    loginCheck();
    window.addEventListener('resize', () => {
      setIsDesktop(window.matchMedia('(min-width: 576px)').matches);
    });

    getAwards({ cached: false, limit: 3, sort: 'posted' });

    return () => {
      $('.modal-backdrop').remove();
      isPageMounted.current = false;
    };
  }, []);

  React.useEffect(() => {
    if (uniqueUrl) {
      getProfileData({ cached: false });
    }
  }, [uniqueUrl]);

  React.useEffect(() => {
    getAwards({ cached: false, limit: 3, sort: 'posted' });
  }, []);

  const onCertificateShareBtnClick = (certificateId) => {
    collectionRef.current.hide();
    $('.copy-link-input').val(`${window.location.origin}/certificate/view/${certificateId}`);
    shareCertificateModalRef.current.show();
  };

  return <>
    <div className='col-12 col-md-11 col-xl-10 mx-auto'>
      <MoreHero isDesktop={isDesktop} session={session} toggleModal={toggleModal} />
      <div className='row no-gutters'>
        <div className="col-12 col-md-8">
          <MoreCards clubsEnabled={isClubEnabled()} />
        </div>
        <div className="col-12 col-md-4">
          <MoreMenu logoutHandler={showLogoutModal} />
        </div>
      </div>
    </div>
    <Modal
      modalClass='logoutModal'
      customClass={'curved'}
      ref={logoutModalRef}
      options={'hide'}
      header={<div></div>}>
      <LogoutModalComponent closeModal={closeLogoutModal} logoutAction={logoutHandler} />
    </Modal>
    <Modal
      ref={collectionRef}
      modalClass={'collectibles-modal'}
      customClass={`curved ${!isDesktop ? 'mob-collectibles-modal' : ''}`}
      // options={{
      //   keyboard: false,
      //   backdrop: 'static',
      // }}
      options={'hide'}
      // modalVisible={collectionModalVisibile}
      // onHidden={toggleModal}
      header={
        <div>
          <h5 className="modal-title">
            <FormattedMessage
              defaultMessage={'Collections'}
              description={'collectibles modal title'}
            />
          </h5>
        </div>
      }
    >
      <CollectionsModalComponent
        session={session}
        toggleModal={toggleModal}
        gameDetails={gameDetails}
        awards={awards}
        collectibles={[]}
        isDesktop={isDesktop}
        onCertificateShareBtnClick={onCertificateShareBtnClick}
      />
    </Modal>
    <Modal
      ref={shareCertificateModalRef}
      modalClass={'share-certificate-modal'}
      customClass={'curved'}
      options={'hide'}>
      <div className='share-content'>
        <div className='content-header'>
          <h5>
            <FormattedMessage
              defaultMessage={'Share'}
              description={'Share message'}
            />
          </h5>
        </div>
        <div className="col-11 col-md-10 btn-container">
          <div className="form-group col">
            <input
              type="text"
              className="form-control copy-link-input"
              name="shareLink" id="shareLink"
              aria-describedby="helpId"
              placeholder="share link"
              readOnly />
          </div>
          <button className='btn btn-outline-primary' onClick={copyHandler} >
            <FormattedMessage
              defaultMessage={'Copy Link'}
              description={'Copy Link button'}
            />
          </button>
        </div>
      </div>
    </Modal>
    <HelpModal />
  </>;
};

export default More;
