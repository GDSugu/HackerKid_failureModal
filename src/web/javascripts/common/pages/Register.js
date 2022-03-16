import React from 'react';
import $ from 'jquery';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { pageInit } from '../framework';
import '../../../stylesheets/common/pages/register/style.scss';

const nextBtnClickHandler = (e) => {
  e.preventDefault();
  $('.step-1-fields').hide();
  $('.step-2-fields').addClass('d-block');
  $('.back-btn').addClass('d-block');
};

const backBtnClickHandler = (e) => {
  e.preventDefault();

  $('.step-1-fields').show();
  $('.step-2-fields').removeClass('d-block');
  $('.back-btn').removeClass('d-block');
};

const Register = () => {
  pageInit('auth-container', 'Register');

  return (
    <>
      <div className='form-container'>
        <form className='p-3 w-100'>
          <header className='d-flex'>
            <span className='d-none back-btn' onClick={backBtnClickHandler}>back</span>
            <p className='subtitle1 text-center flex-grow-1'>Create a New Account</p>
          </header>
          <img src='../../../../images/register/register-form-svg.svg' className='form-svg' />
          <div className='step-2-fields d-none'>
            <div className="mb-3 form-group">
                <div className='d-flex justify-content-between label-with-helper'>
                  <label htmlFor="password" className="form-label overline-bold">
                    <FormattedMessage
                        defaultMessage = "Set a Password"
                      />
                  </label>
                  <span className='form-helper danger overline-bold d-none'>
                    <FormattedMessage
                      defaultMessage = "Enter a valid username"
                    />
                  </span>
                </div>
                <input className='form-control' type='password' name='password' id='password' placeholder='Password' />
            </div>
            <div className="mb-3 form-group">
                <div className='d-flex justify-content-between label-with-helper'>
                  <label htmlFor="retyped-password" className="form-label overline-bold">
                    <FormattedMessage
                        defaultMessage = "Re-type password"
                      />
                  </label>
                  <span className='form-helper danger overline-bold d-none'>
                    <FormattedMessage
                      defaultMessage = "Enter a valid username"
                    />
                  </span>
                </div>
                <input className='form-control' type='password' name='retyped-password' id='retyped-password' placeholder='Re-type Password' />
            </div>
            <div className='take-action-buttons'>
                <button className='btn btn-primary btn-block'>Create Account</button>
            </div>
          </div>
          <div className='step-1-fields'>
            <div className="mb-3 form-group">
              <div className='label-with-helper d-flex justify-content-between'>
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
              <div className='label-with-helper d-flex justify-content-between'>
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
              <button className='btn btn-primary next-btn btn-block mb-3' onClick={nextBtnClickHandler}>
                <span className='overline-bold'>
                  <FormattedMessage
                    defaultMessage="Next"
                  />
                </span>
              </button>
              <Link to='/login' className='overline-bold text-center login-into-existing-account mb-3'>
                <FormattedMessage
                    defaultMessage = "Login Into Existing Account"
                  />
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
