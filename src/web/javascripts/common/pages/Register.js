import React from 'react';
import { FormattedMessage } from 'react-intl';
import { pageInit } from '../framework';
import Header from '../components/loginHeader/Header';
import '../../../stylesheets/common/pages/register/style.scss';

const Register = () => {
  pageInit('auth-container', 'Register');

  return (
    <>
      <div className='form-container'>
      <form className='p-3 w-100'>
          <div className="mb-3 form-group">
            <div className='d-flex justify-content-between label-with-helper'>
              <label htmlFor="username" className="form-label overline-bold">
                <FormattedMessage
                    defaultMessage = "Phone"
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
              <label htmlFor="email" className="form-label overline-bold">
                <FormattedMessage
                    defaultMessage = "Email"
                />
              </label>
              <span className='form-helper danger overline-bold d-none'>
                <FormattedMessage
                  defaultMessage = "Password or username does not match"
                />
              </span>
            </div>
            <input className='form-control' type='text' name='email' id='email' placeholder='Email'/>
          </div>
          <div className="mb-3 form-group">
            <div className='d-flex justify-content-between label-with-helper'>
              <label htmlFor="name" className="form-label overline-bold">
                <FormattedMessage
                    defaultMessage = "Name"
                />
              </label>
              <span className='form-helper danger overline-bold d-none'>
                <FormattedMessage
                  defaultMessage = "Password or username does not match"
                />
              </span>
            </div>
            <input className='form-control' type='text' name='fullname' id='name' placeholder='Name'/>
          </div>
          <div className="mb-3 form-group">
            <div className='d-flex justify-content-between label-with-helper'>
              <label htmlFor="parent-name" className="form-label overline-bold">
                <FormattedMessage
                    defaultMessage = "Parent's Name"
                />
              </label>
              <span className='form-helper danger overline-bold d-none'>
                <FormattedMessage
                  defaultMessage = "Password or username does not match"
                />
              </span>
            </div>
            <input className='form-control' type='text' name='parent-name' id='parent-name' placeholder='Parent Name'/>
          </div>
          <div className='take-action-buttons'>
            <button className='btn btn-primary next-btn btn-block'>
              <span className='overline-bold'>
                <FormattedMessage
                  defaultMessage="Next"
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
            <button className='btn btn-outline-primary btn-block create-new-account-btn'>
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

export default Register;
