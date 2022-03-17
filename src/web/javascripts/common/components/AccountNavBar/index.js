import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Link,
  useLocation,
  Outlet,
  useNavigate,
} from 'react-router-dom';
import '../../../../stylesheets/common/sass/components/_accountNavBar.scss';

const AccountNavBar = () => {
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
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </div>
        <div className="account-nav-item-container">
          <div className={`account-nav-item ${screen === 'edit' ? 'active' : ''}`}>
            <Link to='edit'>
              <FormattedMessage
                defaultMessage='Profile Settings'
                description='Navigation link to profile edit page'
              />
            </Link>
          </div>
          <div className={`account-nav-item ${screen === 'subscription' ? 'active' : ''}`}>
            <Link to='subscription'>
              <FormattedMessage
                defaultMessage='Subscription'
                description='Navigation link to subscription page'
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
    <Outlet />
  </>;
};

export default AccountNavBar;
