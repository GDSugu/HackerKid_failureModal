import React from 'react';
import { FormattedMessage } from 'react-intl';
import { pageInit } from '../framework';
import '../../../stylesheets/common/pages/signin/style.scss';

const Signin = () => {
  pageInit('signin-container', 'Register');

  return (
    <>
      <nav className='d-none d-sm-flex justify-content-between align-items-center '>
        <img className='logo-img' src='../../../../images/signin/logo_H1.svg' />
        <p className='help caption-bold mb-0'>
          <FormattedMessage defaultMessage="Help"/>
        </p>
      </nav>
      <div className='signin-form'>
        <div className='p-3 w-100'>
          <img src='../../../../images/signin/signin-form-svg.svg' className='signin-form-svg'></img>
          <div className="mb-3">
            <div className='d-flex justify-content-between'>
              <label htmlFor="username" className="form-label overline-bold">
                <FormattedMessage
                    defaultMessage = "Phone or Email"
                  />
              </label>
              <span className='form-helper danger overline-bold'>
                <FormattedMessage
                  defaultMessage = "Enter a valid username"
                />
              </span>
            </div>
            <input className='form-control' type='text' name='username' id='username' placeholder='Phone or Email'/>
          </div>
          <div className="mb-3">
            <div className='d-flex justify-content-between'>
              <label htmlFor="password" className="form-label overline-bold">
                <FormattedMessage
                    defaultMessage = "Password"
                />
              </label>
              <span className='form-helper danger overline-bold'>
                <FormattedMessage
                  defaultMessage = "Password or username does not match"
                />
              </span>
            </div>
            <input className='form-control' type='password' name='password' id='password' placeholder='Password'/>
          </div>
          <p className='overline-bold text-center forgot-password'>
            <FormattedMessage
              defaultMessage = "Forgot Password?"
            />
          </p>
          <div className='take-action-buttons'>
            <button className='btn login-btn btn-block'>
              <span className='overline-bold'>
                <FormattedMessage
                  defaultMessage="Login"
                />
              </span>
            </button>
            <button className='btn btn-block login-with-otp-btn'>
              <span className='overline-bold'>
                <FormattedMessage
                  defaultMessage="Login with OTP"
                />
              </span>
            </button>
            <button className='btn btn-block create-new-account-btn'>
              <span className='overline-bold'>
                <FormattedMessage
                  defaultMessage="Create a New Account"
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
