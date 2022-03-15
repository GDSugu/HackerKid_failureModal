import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Outlet } from 'react-router-dom';

const Header = () => (
  <>
    <nav className='d-none d-sm-flex justify-content-between align-items-center '>
      <img className='logo-img' src='../../../../../images/signin/logo_H1.svg' alt='hackerkid logo' />
      <a href="#" className='help caption-bold mb-0'>
        <FormattedMessage defaultMessage="Help" />
      </a>
    </nav>
    <Outlet />
  </>
);

export default Header;
