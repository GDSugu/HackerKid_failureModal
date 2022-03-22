import React from 'react';
import $ from 'jquery';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { pageInit } from '../framework';
import '../../../stylesheets/common/pages/register/style.scss';

const nextBtnClickHandler = () => {
  $('.step-1-fields').hide();
  $('.step-2-fields').addClass('d-block');
  $('.back-btn').addClass('d-block');
};

const backBtnClickHandler = () => {
  $('.step-1-fields').show();
  $('.step-2-fields').removeClass('d-block');
  $('.back-btn').removeClass('d-block');
};

const RegisterFormStepOne = () => (
  <div className='step-1-fields'>
  <div className="form-group mb-3">
    <div className='label-with-helper d-flex justify-content-between'>
      <label htmlFor="username" className="form-label overline-bold">
        <FormattedMessage
          defaultMessage="Phone"
          description="Phone label"
          />
      </label>
      <span className='form-helper text-danger overline-bold d-none'>
        <FormattedMessage
          defaultMessage="Enter a phone number"
          description="Phone label form helper"
        />
      </span>
    </div>
    <input className='form-control' type='tel' name='phone' id='phone' placeholder='Phone'/>
  </div>
  <div className="form-group mb-3">
    <div className='label-with-helper d-flex justify-content-between'>
      <label htmlFor="email" className="form-label overline-bold">
        <FormattedMessage
          defaultMessage="Email"
          description="Email label"
        />
      </label>
      <span className='form-helper text-danger overline-bold d-none'>
        <FormattedMessage
          defaultMessage="Enter a valid Email address"
          description="Email form helper"
        />
      </span>
    </div>
    <input className='form-control' type='email' name='email' id='email' placeholder='Email'/>
  </div>
  <div className="form-group mb-3">
    <div className='label-with-helper d-flex justify-content-between'>
      <label htmlFor="fullname" className="form-label overline-bold">
        <FormattedMessage
          defaultMessage="Name"
          description="Name label"
        />
      </label>
      <span className='form-helper text-danger overline-bold d-none'>
        <FormattedMessage
          defaultMessage="Enter a valid Name"
          description="Name form helper"
        />
      </span>
    </div>
    <input className='form-control' type='text' name='fullname' id='fullname' placeholder='Name'/>
  </div>
  <div className="form-group mb-3">
    <div className='label-with-helper d-flex justify-content-between'>
      <label htmlFor="parent-name" className="form-label overline-bold">
        <FormattedMessage
          defaultMessage="Parent's Name"
          description="Parent's Name label"
        />
      </label>
      <span className='form-helper text-danger overline-bold d-none'>
        <FormattedMessage
          defaultMessage="Enter a valid Parent's name"
          description="Parent's name form helper"
        />
      </span>
    </div>
    <input className='form-control' type='text' name='parent-name' id='parent-name' placeholder="Parent's Name"/>
  </div>
  <div className='take-action-buttons mt-4'>
    <button type="button" className='next-btn btn btn-primary btn-block mb-3' onClick={nextBtnClickHandler}>
      <span className='overline-bold'>
        <FormattedMessage
          defaultMessage="Next"
          description="Next button"
        />
      </span>
      <i className="fa fa-angle-right"></i>
    </button>
    <Link to='/login' className='overline-bold text-center login-into-existing-account mb-3'>
      <FormattedMessage
        defaultMessage="Login Into Existing Account"
        description="Login Into existing account button"
        />
    </Link>
  </div>
</div>
);

const RegisterFormStepThree = () => (
  <div className='step-3-fields d-none'>
            <div className="form-group mb-3">
                <div className='label-with-helper d-flex justify-content-between'>
                  <label htmlFor="password" className="form-label overline-bold">
                    <FormattedMessage
                    defaultMessage="Set a Password"
                    description="Set password label"
                      />
                  </label>
                  <span className='form-helper text-danger overline-bold d-none'>
                    <FormattedMessage
                    defaultMessage="Enter a valid password"
                    description="Set password form helper"
                    />
                  </span>
                </div>
                <input className='form-control' type='password' name='password' id='password' placeholder='Password' />
            </div>
            <div className="form-group mb-3">
                <div className='d-flex justify-content-between label-with-helper'>
                  <label htmlFor="retyped-password" className="form-label overline-bold">
                    <FormattedMessage
                    defaultMessage="Re-type password"
                    description="Re-type password label"
                      />
                  </label>
                  <span className='form-helper text-danger overline-bold d-none'>
                    <FormattedMessage
                    defaultMessage="Passwords do not match"
                    description="Re-type password form helper"
                    />
                  </span>
                </div>
                <input className='form-control' type='password' name='retyped-password' id='retyped-password' placeholder='Re-type Password' />
            </div>
            <div className='take-action-buttons'>
              <button type="button" className='create-account-btn btn btn-primary btn-block'>
                <FormattedMessage
                  defaultMessage="Create Account"
                  description="Create Account button"/>
              </button>
            </div>
          </div>
);

const RegisterFormStepTwo = () => (
  <div className='step-2-fields d-none'>
    <div className='label-and-otp-fields mb-5'>
      <label>
        <FormattedMessage defaultMessage='OTP' description='OTP Label' />
      </label>
      <div className='otp-fields mb-5'>
        <input type='text' className='form-control' maxLength={1}/>
        <input type='text' className='form-control' maxLength={1}/>
        <input type='text' className='form-control' maxLength={1}/>
        <input type='text' className='form-control' maxLength={1}/>
        <input type='text' className='form-control' maxLength={1}/>
        <input type='text' className='form-control' maxLength={1}/>
      </div>
      <Link to='#' className='not-given-number overline-bold text-center'>
        <FormattedMessage
          defaultMessage="Not 9876543210?"
          description="not button"
          />
    </Link>
    </div>
    <div className='take-action-buttons'>
      <button type='button' className='verify-otp-btn btn btn-primary btn-block mb-2'>
        <FormattedMessage
          defaultMessage="Verify OTP and proceed"
          description="verify otp button"/>
      </button>
      <Link to='/login' className='d-block text-decoration-none'>
        <button type='button' className='login-into-existing-account-btn btn btn-outline-primary btn-block'>
            <span className='overline-bold'>
              <FormattedMessage
              defaultMessage="Login into existing account"
              description="login into existing account button"
              />
            </span>
        </button>
      </Link>
    </div>
  </div>
);
const Register = () => {
  pageInit('auth-container', 'Register');

  return (
    <>
      <div className='form-container'>
        <form className='create-account-form p-3 w-100'>
          <header className='d-flex'>
            <i className='back-btn fa fa-arrow-left d-none' onClick={backBtnClickHandler}></i>
            <h5 className='subtitle1 text-center flex-grow-1'>
              <FormattedMessage
                defaultMessage="Create a New Account"
                description="Create a New Account heading"/>
            </h5>
          </header>
          <img src='../../../../images/register/register-form-svg.svg' className='form-svg' />
          <RegisterFormStepOne />
          <RegisterFormStepTwo />
          <RegisterFormStepThree />
        </form>
      </div>
    </>
  );
};

export default Register;
