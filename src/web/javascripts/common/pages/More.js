import React from 'react';
import { FormattedMessage } from 'react-intl';
import { logout } from '../../../../hooks/common/framework';
import { useGetSession } from '../../../../hooks/pages/root';
import '../../../stylesheets/common/pages/more/style.scss';
import Img from '../components/Img';
import { pageInit } from '../framework';

const MoreHero = ({ isDesktop, session }) => <>
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
            <a href='#' className="more-menu-card btn btn-block">
              <p>
                <FormattedMessage
                  defaultMessage={'Your Collections and Perks'}
                  description={'more menu button'}
                />
              </p>
              <i className="fas fa-angle-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</>;

const MoreCards = () => <>
  <div className="more-card-container">
    <div className="row no-gutters align-items-stretch">
      <div className='more-card-block col-12 col-md-6'>
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
            <button className="more-card-btn btn">
              <p>
                <FormattedMessage
                  defaultMessage={'Unlock Now'}
                  description={'more card button'}
                />
              </p>
            </button>
          </div>
        </div>
      </div>
      <div className='more-card-block col-12 col-md-6'>
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
            <button className="more-card-btn btn">
              <p>
                <FormattedMessage
                  defaultMessage={'Visit Club'}
                  description={'more card button'}
                />
              </p>
            </button>
          </div>
        </div>
      </div>
      <div className='more-card-block col-12 col-md-6'>
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
            <button className="more-card-btn btn">
              <p>
                <FormattedMessage
                  defaultMessage={'Try IDE Now'}
                  description={'more card button'}
                />
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</>;

const MoreMenu = () => <>
  <div className="more-menu-container">
    <a href='#' className="more-menu-card btn btn-block" onClick={logout}>
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
    <a href='#' className="more-menu-card btn btn-block">
      <p>
        <FormattedMessage
          defaultMessage={'Help'}
          description={'more menu button'}
        />
      </p>
      <i className="fas fa-angle-right"></i>
    </a>
  </div>
</>;

const More = () => {
  pageInit('more-container', 'More');

  const [isDesktop, setIsDesktop] = React.useState(window.matchMedia('(min-width: 576px)').matches);
  const { session } = useGetSession(['name', 'pointsEarned', 'profileLink']);

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setIsDesktop(window.matchMedia('(min-width: 576px)').matches);
    });
  }, []);

  return <>
  <div className='col-12 col-md-11 col-xl-10 mx-auto'>
    <MoreHero isDesktop={isDesktop} session={session} />
    <div className='row no-gutters'>
      <div className="col-12 col-md-8">
        <MoreCards />
      </div>
      <div className="col-12 col-md-4">
        <MoreMenu />
      </div>
    </div>
  </div>
  </>;
};

export default More;
