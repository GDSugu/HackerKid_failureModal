import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { pageInit } from '../framework';
import '../../../stylesheets/common/pages/login/style.scss';

const Signin = () => {
  pageInit('auth-container', 'Login');

  return (
    <>
      <div className='form-container'>
        <form className='p-3 w-100'>
          <img src='../../../../images/signin/signin-form-svg.svg' className='form-svg' />
          <div className="mb-3 form-group">
            <div className='d-flex justify-content-between label-with-helper'>
              <label htmlFor="username" className="form-label overline-bold">
                <FormattedMessage
                    defaultMessage = "Phone or Email"
                  />
              </label>
              <span className='form-helper danger overline-bold d-none'>
                <FormattedMessage
                  defaultMessage = "Enter a valid username"
                />
              </span>
            </div>
            <input className='form-control' type='text' name='username' id='username' placeholder='Phone or Email'/>
          </div>
          <div className="mb-3 form-group">
            <div className='d-flex justify-content-between label-with-helper'>
              <label htmlFor="password" className="form-label overline-bold">
                <FormattedMessage
                    defaultMessage = "Password"
                />
              </label>
              <span className='form-helper danger overline-bold d-none'>
                <FormattedMessage
                  defaultMessage = "Password or username does not match"
                />
              </span>
            </div>
            <input className='form-control' type='password' name='password' id='password' placeholder='Password'/>
          </div>
          <Link to='#' className='overline-bold text-center forgot-password'>
            <FormattedMessage
              defaultMessage = "Forgot Password?"
            />
          </Link>
          <div className='take-action-buttons'>
            <button className='btn btn-primary login-btn btn-block'>
              <span className='overline-bold'>
                <FormattedMessage
                  defaultMessage="Login"
                />
              </span>
            </button>
            <button className='btn btn-outline-primary btn-block login-with-otp-btn'>
              <span className='overline-bold'>
                <FormattedMessage
                  defaultMessage="Login with OTP"
                />
              </span>
            </button>
            <Link to='/register' className='d-block mt-2 text-decoration-none'>
              <button className='btn btn-outline-primary btn-block create-new-account-btn'>
                  <span className='overline-bold'>
                    <FormattedMessage
                      defaultMessage="Create a New Account"
                    />
                  </span>
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signin;
