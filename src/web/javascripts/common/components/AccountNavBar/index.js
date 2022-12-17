import React, { useEffect } from 'react';
import {
  Link,
  useLocation,
  Outlet,
  useNavigate,
} from 'react-router-dom';
import '../../../../stylesheets/common/sass/components/_accountNavBar.scss';

const AccountNavBar = ({ backNavigationUrl = '/dashboard', NavItems = () => <></> }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  let routes = pathname.split('/').filter((a) => a !== '');
  let screen = routes[routes.length - 1];

  useEffect(() => {
    routes = pathname.split('/').filter((a) => a !== '');
    screen = routes[routes.length - 1];
    if (screen === 'profile') navigate('edit');
  }, [pathname]);

  return <>
    <div className='account-nav'>
      <div className="account-nav-container shadow-sm">
        <div className="navigation-icon">
          <Link to={backNavigationUrl}>
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
          </Link>
        </div>
        <div className="account-nav-item-container">
          {NavItems(screen)}
        </div>
      </div>
    </div>
    <Outlet />
  </>;
};

export default AccountNavBar;
