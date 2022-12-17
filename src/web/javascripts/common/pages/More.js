import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { useGetSession } from '../../../../hooks/pages/root';
import '../../../stylesheets/common/pages/more/style.scss';
import {
  $, loginCheck, pageInit, authorize,
} from '../framework';
import Img from '../components/Img';
import Modal from '../components/Modal';
import HelpModal from '../components/HelpModal';

const MoreHero = ({ isDesktop, session, toggleModal }) => <>
  <div className="more-hero-container">
    <div className="hero-card">
      <div className="hero-card-data col-6 col-sm-4">
        <div className="hero-card-img" style={ (session.profileLink || '../../../../../images/common/profile.png') && { backgroundImage: `url(${session.profileLink ? session.profileLink : '../../../../../images/common/profile.png'})` }}></div>
        { isDesktop
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
            </> }
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

const MoreCards = () => <>
  <div className="more-card-container">
    <div className="row no-gutters align-items-stretch">
      <div className='more-card-block col-12 col-md-6'>
        <div className="more-card-block-cntnr collectible-card">
          <div className="more-card">
            <div className="more-card-contnr">
              <h5 className="more-card-title">
                <FormattedMessage
                  defaultMessage={'Get the rare collectibles with your coins now'}
                  description={'more card title'}
                />
              </h5>
            </div>
            <div className="more-card-btn-container">
              <button className="more-card-btn btn" disabled>
                <p>
                  <FormattedMessage
                    defaultMessage={'Coming Soon...'}
                    description={'more card button'}
                  />
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='more-card-block col-12 col-md-6'>
        <div className="more-card-block-cntnr club-card">
          <div className="more-card">
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
              <button className="more-card-btn btn" disabled>
                <p>
                  <FormattedMessage
                    defaultMessage={'Coming Soon...'}
                    description={'more card button'}
                  />
                </p>
              </button>
            </div>
          </div>
        </div>
      </div> */}
      <div className='more-card-block col-12 col-md-6'>
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

const MoreMenu = ({ logoutHandler = () => {} }) => <>
  <div className="more-menu-container">
    <a href='#' className="more-menu-card btn btn-block" onClick={logoutHandler}>
      <p>
        <FormattedMessage
          defaultMessage={'Logout'}
          description={'more menu button'}
        />
      </p>
      <i className="fas fa-angle-right"></i>
    </a>
    <a href='/profile/edit' className="more-menu-card btn btn-block">
      <p>
        <FormattedMessage
          defaultMessage={'Account Settings'}
          description={'more menu button'}
        />
      </p>
      <i className="fas fa-angle-right"></i>
    </a>
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

const More = () => {
  if (window.location.href.includes('more')) {
    pageInit('more-container', 'More');
  }

  const isPageMounted = React.useRef(true);
  const [isDesktop, setIsDesktop] = React.useState(window.matchMedia('(min-width: 576px)').matches);
  const { session } = useGetSession({ sessionAttr: ['name', 'pointsEarned', 'profileLink'], isPageMounted });
  const collectionRef = React.useRef();
  const logoutModalRef = React.useRef();

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

    return () => {
      isPageMounted.current = false;
    };
  }, []);

  return <>
  <div className='col-12 col-md-11 col-xl-10 mx-auto'>
    <MoreHero isDesktop={isDesktop} session={session} toggleModal={toggleModal} />
    <div className='row no-gutters'>
      <div className="col-12 col-md-8">
        <MoreCards />
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
    modalClass='collectibles-modal'
    customClass={'curved'}
    // options={{
    //   keyboard: false,
    //   backdrop: 'static',
    // }}
    options={'hide'}
    // modalVisible={collectionModalVisibile}
    // onHidden={toggleModal}
    header = {
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
    <div className='col-12 col-md-10 mx-auto'>
      {/* <div className="certificates-block collection-block">
        <div className="collection-header">
          <h5>
            <FormattedMessage
              defaultMessage={'Certificates'}
              description={'collection header'}
            />
          </h5>
        </div>
        <div className="collection-content">
          <p>
            <FormattedMessage
              defaultMessage={'Your certificates will be shown here'}
              description={'collection content'}
            />
          </p>
        </div>
      </div> */}
      <div className='collection-content'>
        <h3 className='text-center'>
          <FormattedMessage
            defaultMessage={'Coming Soon'}
            description={'collectibles header'}
          />
        </h3>
      </div>
      {/* <div className="awards-block collection-block">
        <div className="collection-header">
          <h5>
            <FormattedMessage
              defaultMessage={'Awards'}
              description={'collection header'}
            />
          </h5>
        </div>
        <div className="collection-content">
          <p>
            <FormattedMessage
              defaultMessage={'Your awards will be shown here'}
              description={'collection content'}
            />
          </p>
        </div>
      </div>
      <div className="collectibles-block collection-block">
        <div className="collection-header">
          <h5>
            <FormattedMessage
              defaultMessage={'Collectibles'}
              description={'collection header'}
            />
          </h5>
        </div>
        <div className="collection-content">
          <p>
            <FormattedMessage
              defaultMessage={'Your collectibles will be shown here'}
              description={'collection content'}
            />
          </p>
        </div>
      </div> */}
    </div>
    {/* <div className='footer'
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
    </div> */}
  </Modal>
  <HelpModal />
  </>;
};

export default More;
