import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { pageInit } from '../framework';
import '../../../stylesheets/common/pages/register/style.scss';

const Register = () => {
  pageInit('auth-container', 'Register');

  return (
    <>
      <div className='form-container'>
        <form className='p-3 w-100'>
          <header className='subtitle1 text-center'>Create a New Account</header>
          <img src='../../../../images/register/register-form-svg.svg' className='form-svg' />
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
          <div className='take-action-buttons mb-3'>
            <button className='btn btn-primary next-btn btn-block'>
              <span className='overline-bold'>
                <FormattedMessage
                  defaultMessage="Next"
                />
              </span>
            </button>
          </div>
          <Link to='/login' className='overline-bold text-center login-into-existing-account mb-3'>
            <FormattedMessage
                defaultMessage = "Login Into Existing Account"
              />
          </Link>
        </form>
      </div>
    </>
  );
};

export default Register;
