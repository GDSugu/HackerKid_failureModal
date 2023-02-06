import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';

const MobileAwardsNavBar = ({ id = 'awards-nav-bar', className }) => {
  const route = useLocation();
  return <nav id={id} className={`mobile-awards-nav-bar ${className}`}>
    <Link className={`nav-item caption-bold ${route.pathname === '/awards' ? 'active' : ''}`} to={'/awards'}>
      <FormattedMessage defaultMessage={'Awards'} description='awards page link' />
      <span className='active-indicator'></span>
    </Link>
    {/* <Link
    className={`nav-item caption-bold ${route.pathname === '/collectibles' ? 'active' : ''}`}
    to={'/collectibles'}>
      <FormattedMessage defaultMessage={'Collectibles'} description='collectibles page link' />
      <span className='active-indicator'></span>
    </Link> */}
  </nav>;
};

export default MobileAwardsNavBar;
