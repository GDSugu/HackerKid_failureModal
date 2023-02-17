import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Link, useLocation, Outlet,
} from 'react-router-dom';
import { useGetSession } from '../../../../../hooks/pages/root';
import Img from '../Img';

const NavItem = (props) => {
  const { icon, route, active } = props;
  return <>
    <Link to={route} className={`navigation-item ${active ? 'active' : ''}`}>
      <div className="nav-icon">
        { icon }
      </div>
      <div className="nav-bar"></div>
    </Link>
  </>;
};

const ChallengesNavBar = ({ isDesktop }) => {
  const { pathname } = useLocation();
  const routes = pathname.split('/');
  const screen = routes[routes.length - 1];
  const isPageMounted = React.useRef(true);
  const { session: { profileLink } } = useGetSession({ sessionAttr: ['profileLink'], isPageMounted });

  const navItems = [
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke='#212427' xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>,
      route: '/dashboard',
      active: screen === 'dashboard',
    },
    {
      icon: <svg width="24" height="24" stroke="#212527" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 15L6.032 17.968C5.70167 18.2983 5.28084 18.5232 4.8227 18.6143C4.36457 18.7054 3.88971 18.6586 3.45815 18.4799C3.0266 18.3011 2.65773 17.9984 2.39819 17.6101C2.13864 17.2217 2.00007 16.7651 2 16.298V15L3.357 8.216C3.53824 7.30922 4.02806 6.49325 4.74312 5.90691C5.45817 5.32058 6.35429 5.0001 7.279 5H16.721C17.6457 5.0001 18.5418 5.32058 19.2569 5.90691C19.9719 6.49325 20.4618 7.30922 20.643 8.216L22 15V16.297C21.9999 16.7641 21.8614 17.2207 21.6018 17.6091C21.3423 17.9974 20.9734 18.3001 20.5418 18.4789C20.1103 18.6576 19.6354 18.7044 19.1773 18.6133C18.7192 18.5222 18.2983 18.2973 17.968 17.967L15 15H9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 5L10 7H14L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>,
      route: '/games',
      active: ['games', 'turtle'].indexOf(screen) !== -1,
    },
    {
      icon: <svg width="24" height="24" viewBox="24 24 24 24" fill="none" stroke="#212527" xmlns="http://www.w3.org/2000/svg">
          <path d="M41 26L36 31L31 26M28 31H44C45.1046 31 46 31.8954 46 33V44C46 45.1046 45.1046 46 44 46H28C26.8954 46 26 45.1046 26 44V33C26 31.8954 26.8954 31 28 31Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>,
      route: '/courses',
      active: screen === 'courses',
    },
    {
      icon: <svg width="24" height="24" viewBox="24 24 24 24" fill="none" stroke="#212527" xmlns="http://www.w3.org/2000/svg">
          <path d="M36 26L39.09 32.26L46 33.27L41 38.14L42.18 45.02L36 41.77L29.82 45.02L31 38.14L26 33.27L32.91 32.26L36 26Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>,
      route: '/challenges',
      active: screen === 'challenges',
    },
    {
      icon: <svg width="24" height="24" viewBox="24 24 24 24" fill="none" stroke="#212527" xmlns="http://www.w3.org/2000/svg">
          <path d="M27 36H45M27 30H45M27 42H45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>,
      route: '/more',
      active: ['more', 'certificates', 'awards', 'collectibles'].includes(screen),
    },
  ];

  const profileImg = profileLink || '../../../../../images/common/profile.png';
  const local = typeof profileLink === 'string' && profileLink.length > 0;

  React.useEffect(() => () => {
    isPageMounted.current = false;
  }, []);

  const getBackToLink = (routeName) => {
    let backToLink;
    if (routeName === 'all-challenges' || routeName === 'your-challenges') {
      backToLink = '/challenges';
    } else if (routeName === 'drafts') {
      backToLink = '/your-challenges';
    }

    return backToLink;
  };

  const getBackBtnText = (routeName) => {
    let backBtnText;
    if (routeName === 'all-challenges' || routeName === 'your-challenges') {
      backBtnText = 'Challenges';
    } else if (routeName === 'drafts') {
      backBtnText = 'My Challenges';
    }

    return backBtnText;
  };

  return <>
    <nav className='challenges-nav'>
      <div className='row justify-content-between align-items-center no-gutters'>
        <div className="back-btn-container">
          <Link to={getBackToLink(screen)} className='back-btn'>
            <i className='fa fa-chevron-left' />
            <FormattedMessage
              defaultMessage={'{backBtnText}'}
              description='back button text'
              values={{
                backBtnText: getBackBtnText(screen),
              }}/>
          </Link>
        </div>
        {
          isDesktop && <div className='navigation-container row align-items-center no-gutters'>
          {
            navItems.map((item, index) => <NavItem {...item} key={index} />)
          }
        </div>
        }
        {
          isDesktop && <div className="profileImg">
          <Link to='/profile'>
            <Img src={`${profileImg}?updatedAt=${Date.now()}`} local={!local} alt="Hackerkid User"/>
          </Link>
        </div>
        }
        {
          !isDesktop && <Link to={'/dashboard'} className='home-button'>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke='#212427' xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          </Link>
        }
      </div>
    </nav>
    <Outlet />
  </>;
};

export default ChallengesNavBar;
