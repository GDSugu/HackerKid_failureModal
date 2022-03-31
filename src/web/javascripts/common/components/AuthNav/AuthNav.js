import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, Outlet } from 'react-router-dom';

const AuthNav = () => (
  <>
    <nav className='d-none d-sm-flex justify-content-between align-items-center '>
      <img className='logo-img' src='../../../../../images/login/logo_H1.svg' alt='hackerkid logo' />
      <Link to='#' className='help caption-bold mb-0'>
        <FormattedMessage defaultMessage="Help" />
      </Link>
    </nav>
    <Outlet />
  </>
);

export default AuthNav;
