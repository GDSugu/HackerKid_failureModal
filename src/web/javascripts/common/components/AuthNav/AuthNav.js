import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, Outlet } from 'react-router-dom';
import { $ } from '../../framework';
import HelpModal from '../HelpModal';

const AuthNav = () => (
  <>
    <nav className='d-none d-sm-flex justify-content-between align-items-center'>
      <Link to='/'>
        <img className='logo-img' src='../../../../../images/login/logo_H1.svg' alt='hackerkid logo' />
      </Link>
      <button type='button' className='help btn-as-interactive-link caption-bold mb-0' onClick={() => {
        $('.help-modal').modal('show');
      }}>
        <FormattedMessage defaultMessage="Help" description='help button'/>
      </button>
    </nav>
    <HelpModal />
    <Outlet />
  </>
);

export default AuthNav;
