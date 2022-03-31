import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { pageInit } from '../framework';
import '../../../stylesheets/common/pages/login/style.scss';

const Login = () => {
  pageInit('auth-container', 'Login');

  return (
    <>
      <div className='form-container'>
        <form className='login-form p-3 w-100'>
          <img src='../../../../images/login/login-form-svg.svg' className='form-svg' alt='form-svg'/>
          <div className="mb-3 form-group">
            <div className='label-with-helper d-flex justify-content-between'>
              <label htmlFor="phone-or-email" className="form-label overline-bold">
                <FormattedMessage
                  defaultMessage="Phone or Email"
                  description="Phone or Email label"
                  />
              </label>
              <span className='form-helper text-danger overline-bold d-none'>
                <FormattedMessage
                  defaultMessage="Enter a valid Phone or Email"
                  description="Phone or Email form helper"
                />
              </span>
            </div>
            <input required className='form-control' type='text' name='phone-or-email' id='phone-or-email' placeholder='Phone or Email'/>
          </div>
          <div className="mb-3 form-group">
            <div className='label-with-helper d-flex justify-content-between'>
              <label htmlFor="password" className="form-label overline-bold">
                <FormattedMessage
                  defaultMessage="Password"
                  description="Password Field"
                />
              </label>
              <span className='form-helper text-danger overline-bold d-none'>
                <FormattedMessage
                  defaultMessage="Password or username does not match"
                  description="Password form helper"
                />
              </span>
            </div>
            <input required className='form-control' type='password' name='password' id='password' placeholder='Password'/>
          </div>
          <Link to='#' className='forgot-password overline-bold text-center mt-3 mb-4'>
            <FormattedMessage
              defaultMessage="Forgot Password?"
              description="forgot password link"
            />
          </Link>
          <div className='take-action-buttons'>
            <button className='login-btn btn btn-primary btn-block'>
              <span className='overline-bold'>
                <FormattedMessage
                  defaultMessage="Login"
                  description="Login button"
                />
              </span>
            </button>
            <button type='button' className='login-with-otp-btn btn btn-outline-primary btn-block mb-2'>
              <span className='overline-bold'>
                <FormattedMessage
                  defaultMessage="Login with OTP"
                  description="Login with OTP button"
                />
              </span>
            </button>
            <Link to='/register' className='d-block text-decoration-none'>
              <button type='button' className='create-new-account-btn btn btn-outline-primary btn-block'>
                  <span className='overline-bold'>
                    <FormattedMessage
                    defaultMessage="Create a New Account"
                    description="Create a New Account button"
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

export default Login;
