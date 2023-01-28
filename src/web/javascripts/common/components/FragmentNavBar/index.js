import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import '../../../../stylesheets/common/sass/components/_fragmentNavBar.scss';

const FragmentNavBar = ({ closeType = 'icon', closeFragment = () => window.history.back() }) => <>
  <nav className='fragment-nav-bar'>
    <div className="d-flex justify-content-between align-items-center p-2">
      <Link to='/'>
        <img className='logo-img' src='../../../../../images/login/logo_H1.svg' alt='hackerkid logo' />
      </Link>
        {
          closeType === 'icon'
          && <>
            <button type='button' className='btn btn-danger close-btn close-icon mb-0' onClick={closeFragment}>
              <i className="fas fa-times"></i>
            </button>
          </>
        }
        {
          closeType === 'button'
          && <>
            <button type='button' className='btn btn-white close-btn close-btn-pill mb-0'>
              <FormattedMessage
                defaultMessage={'close'}
                description={'close button'}
              />
            </button>
          </>
        }
    </div>
  </nav>
</>;

export default FragmentNavBar;
