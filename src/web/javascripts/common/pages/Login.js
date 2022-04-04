import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import intlTelInput from 'intl-tel-input';
import $ from 'jquery';
import { inputChangeAfterValidationHandler, togglePasswordVisibility } from '../commonLoginRegisterFunctions';
import 'intl-tel-input/build/css/intlTelInput.css';
import post, {
  pageInit, validate, authorize,
} from '../framework';
import '../../../stylesheets/common/pages/login/style.scss';

const manager = {};

const getDevice = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'web';
};

const Login = () => {
  pageInit('auth-container', 'Login');

  useEffect(() => {
    const flaginput = document.querySelector('#phone');
    manager.telInput = intlTelInput(flaginput, {
      allowDropdown: true,
      initialCountry: 'in',
      separateDialCode: true,
      utilsScript: intlTelInput.utilsScript,
    });
  }, []);

  const loginWithPhone = (phone, password, email = false, useEmail = false) => {
    const device = getDevice();
    let countryCode = manager.telInput.getSelectedCountryData();
    countryCode = `+${countryCode.dialCode}`;
    // const neoeyed = getneoEyed(phone);
    post({
      type: 'usercheckPhone',
      phone,
      password,
      device,
      countryCode,
      email,
      useEmail,
    }, 'login/')
      .then((response) => {
        const data = JSON.parse(response);

        if (data.status === 'success') {
          authorize.setUserSession(data);
        } else if (data.status === 'not-exists') {
          $('#form-error').html('You are not registered user, <a href="register.html">Register Now</a>').show();
          $('#phone').addClass('is-invalid').removeClass('is-valid');
          $('#password').removeClass('is-invalid');
        } else if (data.status === 'not-valid') {
          $('#form-error').text('Incorrect Phone Number or Password').show();
          $('#phone').addClass('is-invalid').removeClass('is-valid');
          $('#password').addClass('is-invalid').removeClass('is-valid');
        }
      })
      .catch((error) => {
        const errData = JSON.parse(error);
        console.log(errData);
      });
  };

  const loginBtnClickHandler = () => {
    const validatedPhone = validate('#phone', 'mobile', 1, '#phone-form-helper', 'Enter a valid phone number');
    const password = validate('#password', 'password', 1, '#password-form-helper', null, true);

    if (validatedPhone && password) {
      loginWithPhone(validatedPhone, password);
    }
  };
  return (
    <>
      <div className='form-container'>
        <form className='login-form p-3 w-100'>
          <img src='../../../../images/login/login-form-svg.svg' className='form-svg' alt='form-svg' />
          <ul className="login-method-tabs nav nav-pills nav-fill mb-3" id="pills-tab" role="tablist">
            <li className="nav-item overline-bold" role="presentation">
              <a className="nav-link active" id="login-with-phone-tab" data-toggle="pill" href="#login-with-phone" role="tab">Login with Phone</a>
            </li>
            <li className="nav-item overline-bold" role="presentation">
            <a className="nav-link" id="login-with-email-tab" data-toggle="pill" href="#login-with-email" role="tab">Login with Email</a>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="login-with-phone" role="tabpanel">
              <div className="mb-3 form-group">
                <div className='label-with-helper d-flex justify-content-between'>
                  <label htmlFor="phone" className="form-label overline-bold">
                    <FormattedMessage
                      defaultMessage="Phone"
                      description="Phone label"
                      />
                  </label>
                  <span className='form-helper text-danger overline-bold' id='phone-form-helper'>
                  </span>
                </div>
                <input className='form-control' type='text' name='phone' id='phone' placeholder='Phone' onChange={removeValidationIndicatiors} data-close-form-error={true }/>
              </div>
            </div>
            <div className="tab-pane fade" id="login-with-email" role="tabpanel">
              <div className="mb-3 form-group">
                <div className='label-with-helper d-flex justify-content-between'>
                  <label htmlFor="phone" className="form-label overline-bold">
                    <FormattedMessage
                      defaultMessage="Email"
                      description="Email label"
                      />
                  </label>
                  <span className='form-helper text-danger overline-bold' id='email-form-helper'>
                  </span>
                </div>
                <input className='form-control' type='email' name='email' id='email' placeholder='Email' onChange={removeValidationIndicatiors} data-close-form-error={true }/>
              </div>
            </div>
          </div>
          <div className="mb-3 form-group">
            <div className='label-with-helper d-flex justify-content-between'>
              <label htmlFor="password" className="form-label overline-bold">
                <FormattedMessage
                  defaultMessage="Password"
                  description="Password Field"
                />
              </label>
              <span className='form-helper text-danger overline-bold' id='#password-form-helper'>
              </span>
            </div>
            <div className='passwordfield-with-toggle-icon'>
              <input className='form-control' type='password' name='password' id='password' placeholder='Password' onChange={removeValidationIndicatiors} data-close-form-error={true }/>
              <span className="password-toggle-icon-container">
                <i className="fa fa-fw fa-eye toggle-password" toggle="#password" onClick={togglePasswordVisibility}></i>
              </span>
            </div>
          </div>
          <Link to='#' className='forgot-password overline-bold text-center mt-3 mb-4'>
            <FormattedMessage
              defaultMessage="Forgot Password?"
              description="forgot password link"
            />
          </Link>
          <p className='form-error text-danger overline-bold text-center' id='form-error'></p>
          <div className='take-action-buttons mt-4'>
            <button type='button' className='login-btn btn btn-primary btn-block' onClick={loginBtnClickHandler}>
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
