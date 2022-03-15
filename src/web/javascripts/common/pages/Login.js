import React from 'react';
import { FormattedMessage } from 'react-intl';
import { pageInit } from '../framework';
import '../../../stylesheets/common/pages/login/style.scss';

const Signin = () => {
  pageInit('signin-container', 'Login');

  return (
    <>
      <div className='signin-form-container'>
        <form className='p-3 w-100'>
          <img src='../../../../images/signin/signin-form-svg.svg' className='signin-form-svg'></img>
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
          <a href='#' className='overline-bold text-center forgot-password'>
            <FormattedMessage
              defaultMessage = "Forgot Password?"
            />
          </a>
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
        </form>
      </div>
    </>
  );
};

export default Signin;
