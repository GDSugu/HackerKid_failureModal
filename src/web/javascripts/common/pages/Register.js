import React, { useEffect } from 'react';
import $, { event } from 'jquery';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import {
  pageInit, authorize, validate,
} from '../framework';
import '../../../stylesheets/common/pages/register/style.scss';
import useRegister from '../../../../hooks/pages/register';
import {
  togglePasswordVisibility, inputOnChangeHandler, closeFormError, setFormErrorField,
} from '../commonLoginRegisterFunctions';

const manager = {};

const RegisterFormStepOne = ({
  stepOneRequest, stateObj, setStateObj,
}) => {
  useEffect(() => {
    const flaginput = document.querySelector('#phone');
    manager.telInput = intlTelInput(flaginput, {
      allowDropdown: true,
      initialCountry: 'in',
      separateDialCode: true,
      utilsScript: intlTelInput.utilsScript,
    });
  }, []);

  const nextBtnClickHandler = (e) => {
    e.preventDefault();

    const inputFields = $('input');
    const resultArr = [];

    inputFields.each(function () {
      const idSelector = `#${$(this).attr('id')}`;
      const type = $(this).attr('type');
      const formHelperIdSelector = `${idSelector}-form-helper`;
      const required = ($(this).attr('required') ? 1 : 0);
      const skipValueCheck = $(this).attr('data-skip-value-check');

      const result = validate(idSelector, type, required,
        formHelperIdSelector, null, skipValueCheck);

      resultArr.push(result);
    });

    if (resultArr.every((result) => {
      if (result) return true;
      return false;
    })) {
      let countryCode = manager.telInput.getSelectedCountryData();
      countryCode = `+${countryCode.dialCode}`;

      stepOneRequest(stateObj.phoneNumber, countryCode).then((response) => {
        const data = JSON.parse(response);
        if (data.status === 'success') {
          setStateObj((prevObj) => ({
            ...prevObj,
            countryCode,
            registerFormStep: prevObj.registerFormStep + 1,
          }));
        } else if (data.status === 'error' && data.message === 'ACCOUNT_EXIST') {
          $('#phone').addClass('is-invalid').removeClass('is-valid');
          $('#form-error').text('Account already exists!, try logging in').attr('data-error-type', data.message).show();
        }
      }).catch((err) => {
        const errData = JSON.parse(err);
        console.log(errData);
      });
    }
  };

  const handleStateChange = (key, value, e) => {
    setStateObj((prevObj) => (
      {
        ...prevObj,
        [key]: value,
      }
    ));

    inputOnChangeHandler(e);
  };

  return (
    <div className='step-1-fields'>
      <div className="form-group mb-3">
        <div className='label-with-helper d-flex justify-content-between'>
          <label htmlFor="username" className="form-label overline-bold">
            <FormattedMessage
              defaultMessage="Phone"
              description="Phone label"
            />
          </label>
          <span className='form-helper text-danger overline-bold' id='phone-form-helper'>
          </span>
        </div>
        <input className='form-control' type='tel' name='phone' id='phone' placeholder='Phone' defaultValue={stateObj.phoneNumber} required={true} onChange={(e) => handleStateChange('phoneNumber', e.target.value, e)} data-close-form-error-type='ACCOUNT_EXIST' data-typename='Phone Number'/>
      </div>
      <div className="form-group mb-3">
        <div className='label-with-helper d-flex justify-content-between'>
          <label htmlFor="email" className="form-label overline-bold">
            <FormattedMessage
              defaultMessage="Email"
              description="Email label"
            />
          </label>
          <span className='form-helper text-danger overline-bold' id='email-form-helper'>
          </span>
        </div>
        <input className='form-control' type='email' name='email' id='email' placeholder='Email' defaultValue={stateObj.email} required={ true } onChange={(e) => handleStateChange('email', e.target.value, e)} data-typename='Email Address'/>
      </div>
      <div className="form-group mb-3">
        <div className='label-with-helper d-flex justify-content-between'>
          <label htmlFor="fullname" className="form-label overline-bold">
            <FormattedMessage
              defaultMessage="Name"
              description="Name label"
            />
          </label>
          <span className='form-helper text-danger overline-bold' id='name-form-helper'>
          </span>
        </div>
        <input className='form-control' type='name' name='name' id='name' placeholder='Name' defaultValue={stateObj.fullName} required={ true } onChange={(e) => handleStateChange('fullName', e.target.value, e)} data-typename='Full Name'/>
      </div>
      <div className="form-group mb-3">
        <div className='label-with-helper d-flex justify-content-between'>
          <label htmlFor="parent-name" className="form-label overline-bold">
            <FormattedMessage
              defaultMessage="Parent's Name"
              description="Parent's Name label"
            />
          </label>
          <span className='form-helper text-danger overline-bold' id='parent-name-form-helper'>
          </span>
        </div>
        <input className='form-control' type='name' name='parent-name' id='parent-name' placeholder="Parent's Name" defaultValue={stateObj.parentName} required={ true } onChange={(e) => handleStateChange('parentName', e.target.value, e)} data-typename="Parent's Name" />
      </div>
      <p className='form-error text-danger overline-bold text-center' id='form-error'></p>
      <div className='take-action-buttons mt-4'>
        <button type="submit" className='next-btn btn btn-primary btn-block mb-3' onClick={nextBtnClickHandler}>
          <span className='overline-bold'>
            <FormattedMessage
              defaultMessage="Next"
              description="Next button"
            />
          </span>
          <i className="fa fa-angle-right"></i>
        </button>
        <Link to='/login' className='login-into-existing-account overline-bold text-center mb-3'>
          <FormattedMessage
            defaultMessage="Login Into Existing Account"
            description="Login Into existing account button"
          />
        </Link>
      </div>
    </div>
  );
};

const RegisterFormStepTwo = ({
  stepOneRequest, stepTwoRequest, stateObj, setStateObj,
}) => {
  const startOtpTimer = () => {
    const otpTimerDOM = $('.otp-timer');
    const resendOtp = $('.resend-otp');

    let seconds = 30;
    let secondsText = '00 : 30';

    otpTimerDOM.text(secondsText);
    otpTimerDOM.show();

    const timer = setInterval(() => {
      seconds -= 1;
      secondsText = `00 : ${(seconds > 9) ? seconds : (`0${seconds.toString()}`)}`;
      otpTimerDOM.text(secondsText);
      if (seconds <= 0) {
        otpTimerDOM.hide();
        resendOtp.show();
        setStateObj((prevObj) => ({
          ...prevObj,
          otpTimerId: null,
        }));
        clearInterval(timer);
      }
    }, 1000);
    setStateObj((prevObj) => ({
      ...prevObj,
      otpTimerId: timer,
    }));
  };

  const resendOtpClickHandler = () => {
    $('.resend-otp').hide();
    if (stateObj.otpTimerId === null) {
      stepOneRequest(stateObj.phoneNumber,
        stateObj.countryCode).then((response) => {
        const data = JSON.parse(response);
        if (data.status === 'success') {
          startOtpTimer();
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  const keyUpHandler = (e) => {
    const { target } = e;

    if (String.fromCharCode(e.keyCode).match(/\w|\d/g)) {
      const isInputFilled = target.value.length === 1;

      if (isInputFilled) {
        const nextOtpField = $(target).next();

        if (nextOtpField.length) {
          $(target).trigger('blur');
          nextOtpField.trigger('focus');
        }
      }
    }
  };

  const onKeyDownHandler = (e) => {
    const { key, target } = e;
    if (key === 'Tab' && target.value.length === 0) {
      e.preventDefault();
    }

    if ((key === 'Backspace') && target.value.length === 0) {
      e.preventDefault();
      const prevOtpField = $(target).prev();

      if (prevOtpField.length) {
        $(target).trigger('blur');
        prevOtpField.trigger('focus');
      }
    }
  };

  const gatherDigitsFromOtpFields = () => {
    const otpFields = $('.otp-fields input');
    const digits = [];

    otpFields.each(function () {
      digits.push($(this).val());
    });

    return digits.join('');
  };

  const validateOtp = (enteredOtp, regex, length) => {
    const regexObj = new RegExp(regex);
    const value = enteredOtp;
    if (value.length === length && regexObj.test(value)) {
      return value;
    }
    return false;
  };

  const verifyBtnClickHandler = () => {
    const enteredOtp = gatherDigitsFromOtpFields();
    const validatedOtp = validateOtp(enteredOtp, '[0-9]{4,4}$', 4);
    console.log(validatedOtp);

    if (validatedOtp) {
      stepTwoRequest(stateObj.phoneNumber,
        stateObj.countryCode,
        validatedOtp).then((response) => {
        const data = JSON.parse(response);

        if (data.status === 'success') {
          setStateObj((prevObj) => ({
            ...prevObj,
            registerFormStep: prevObj.registerFormStep + 1,
          }));
        } else if (data.status === 'error' && data.message === 'OTP_EXPIRED') {
          $('#form-error').html('Enter a valid OTP').attr('data-error-type', data.message).show();
        }
      }).catch((err) => {
        const errData = JSON.parse(err);
        console.log(errData);
      });
    } else {
      setFormErrorField('Enter a OTP which contains only digits', { 'data-error-type': 'OTP_EXPIRED' });
    }
  };

  useEffect(() => {
    startOtpTimer();

    return () => {
      clearInterval(stateObj.otpTimerId);
    };
  }, []);

  return (
    <div className='step-2-fields'>
      <div className='label-and-otp-fields mb-5'>
        <div className='label-with-otp-timer d-flex justify-content-between'>
          <label>
            <FormattedMessage defaultMessage='OTP' description='OTP Label' />
          </label>
          <span className='otp-timer overline-bold'></span>
          <span className='resend-otp overline-bold' onClick={resendOtpClickHandler}>Resend</span>
        </div>
        <div className='otp-fields mb-5'>
          <input type='text' className='form-control' maxLength={1} onChange={(e) => {
            closeFormError(e.target);
          }} data-close-form-error-type='OTP_EXPIRED' onKeyUp={keyUpHandler} onKeyDown={onKeyDownHandler }/>
          <input type='text' className='form-control' maxLength={1} onChange={(e) => {
            closeFormError(e.target);
          } } data-close-form-error-type='OTP_EXPIRED' onKeyUp={keyUpHandler} onKeyDown={onKeyDownHandler }/>
          <input type='text' className='form-control' maxLength={1} onChange={(e) => {
            closeFormError(e.target);
          } } data-close-form-error-type='OTP_EXPIRED' onKeyUp={keyUpHandler} onKeyDown={onKeyDownHandler }/>
          <input type='text' className='form-control' maxLength={1} onChange={(e) => {
            closeFormError(e.target);
          } } data-close-form-error-type='OTP_EXPIRED' onKeyUp={keyUpHandler} onKeyDown={onKeyDownHandler }/>
        </div>
        <Link to='#' className='not-given-number overline-bold text-center' onClick={() => setStateObj((prevObj) => ({
          ...prevObj,
          registerFormStep: 1,
        }))}>
          <FormattedMessage
            defaultMessage='Not {phone}'
            description="not button"
            values={{
              phone: stateObj.phoneNumber,
            }}
          />
        </Link>
      </div>
      <p className='form-error text-danger overline-bold text-center' id='form-error'></p>
      <div className='take-action-buttons mt-4'>
        <button type='button'
          className='verify-otp-btn btn btn-primary btn-block mb-2'
          onClick={verifyBtnClickHandler}>
          <FormattedMessage
            defaultMessage="Verify OTP and proceed"
            description="verify otp button" />
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
};

const RegisterFormStepThree = ({ stateObj, stepThreeRequest }) => {
  const createAccountBtnClickHandler = () => {
    const inputFields = $('input');
    const resultArr = [];

    inputFields.each(function () {
      const idSelector = `#${$(this).attr('id')}`;
      const type = $(this).attr('type');
      const formHelperIdSelector = `${idSelector}-form-helper`;
      const required = ($(this).attr('required') ? 1 : 0);
      const skipValueCheck = $(this).attr('data-skip-value-check');

      const result = validate(idSelector, type, required,
        formHelperIdSelector, null, skipValueCheck);

      resultArr.push(result);
    });
    const [enteredPassword, retypedPassword] = resultArr;

    if ((enteredPassword && retypedPassword)) {
      if (enteredPassword === retypedPassword) {
        stepThreeRequest(stateObj.registerFormFieldValues.phoneNumber,
          stateObj.registerFormFieldValues.countryCode,
          stateObj.registerFormFieldValues.fullName,
          stateObj.registerFormFieldValues.email,
          enteredPassword).then((response) => {
          const data = JSON.parse(response);

          if (data.status === 'success' && data.message === 'REGISTERED') {
            const sessionDetails = data.session;
            authorize.setUserSession(sessionDetails);
          }
        }).catch((error) => {
          const errData = JSON.parse(error);
          console.log(errData);
        });
      } else {
        $('#password').addClass('is-invalid').removeClass('is-valid');
        $('#password-form-helper').html('Passwords do not match').show();
        $('#retyped-password').addClass('is-invalid').removeClass('is-valid');
      }
    } else if (!enteredPassword && !retypedPassword) {
      setFormErrorField('Passwords length must be atleast 4, consisting of letters and numbers', { 'data-error-type': 'INVALID_PASSWORD' });
    }
  };

  return (
  <div className='step-3-fields'>
    <div className="form-group mb-3">
        <div className='label-with-helper d-flex justify-content-between'>
          <label htmlFor="password" className="form-label overline-bold">
            <FormattedMessage
            defaultMessage="Set a Password"
            description="Set password label"
              />
          </label>
          <span className='form-helper text-danger overline-bold' id='password-form-helper'></span>
        </div>
        <div className='passwordfield-with-toggle-icon'>
          <input className='form-control' type='password' name='password' id='password' placeholder='Password' onChange={inputOnChangeHandler} data-close-form-error-type='INVALID_PASSWORD' />
          <span className="password-toggle-icon-container">
            <i className="fa fa-fw fa-eye toggle-password" toggle="#password" onClick={togglePasswordVisibility}></i>
          </span>
        </div>
    </div>
    <div className="form-group mb-3">
        <div className='label-with-helper d-flex justify-content-between'>
          <label htmlFor="retyped-password" className="form-label overline-bold">
            <FormattedMessage
            defaultMessage="Re-type password"
            description="Re-type password label"
              />
          </label>
          <span className='form-helper text-danger overline-bold' id='retyped-password-form-helper'>
          </span>
        </div>
        <div className='passwordfield-with-toggle-icon'>
          <input className='form-control' type='password' name='retyped-password' id='retyped-password' placeholder='Re-type Password' typename='Re-type Password' onChange={inputOnChangeHandler} data-close-form-error-type='INVALID_PASSWORD'/>
          <span className="password-toggle-icon-container">
            <i className="fa fa-fw fa-eye toggle-password" toggle="#retyped-password" onClick={togglePasswordVisibility}></i>
          </span>
        </div>
      </div>
      <p className='form-error text-danger overline-bold text-center' id='form-error'></p>
      <div className='take-action-buttons mt-4'>
        <button type="button" className='create-account-btn btn btn-primary btn-block' onClick={createAccountBtnClickHandler}>
          <FormattedMessage
            defaultMessage="Create Account"
            description="Create Account button"/>
        </button>
      </div>
  </div>
  );
};

const Register = () => {
  pageInit('auth-container', 'Register');

  const { stateObj, setStateObj, registerFormRequests } = useRegister();

  const backBtnClickHandler = () => {
    if (stateObj.registerFormStep === 3) {
      setStateObj((prevState) => ({
        ...prevState,
        registerFormStep: 1,
      }));
    } else {
      setStateObj((prevState) => ({
        ...prevState,
        registerFormStep: prevState.registerFormStep - 1,
      }));
    }
  };

  const backBtnDisplay = stateObj.registerFormStep > 1 ? 'd-block' : 'd-none';

  return (
    <>
      <div className='form-container'>
        <form className='create-account-form p-3 w-100'>
          <header className='d-flex'>
            <i
              className={`back-btn fa fa-arrow-left ${backBtnDisplay}`}
              onClick={backBtnClickHandler}></i>
            <h5 className='subtitle1 text-center flex-grow-1'>
              <FormattedMessage
                defaultMessage="Create a New Account"
                description="Create a New Account heading"/>
            </h5>
          </header>
          <img src='../../../../images/register/register-form-svg.svg' className='form-svg' />
          <RegisterFormStepTwo
              stateObj={stateObj}
              setStateObj={setStateObj}
              stepOneRequest={registerFormRequests.stepOneRequest}
              stepTwoRequest={registerFormRequests.stepTwoRequest}
               />
          {/* {
            ((stateObj.registerFormStep === 1)
              && <RegisterFormStepOne
              stateObj={stateObj}
              setStateObj={setStateObj}
              stepOneRequest = {registerFormRequests.stepOneRequest}
            />)
            || ((stateObj.registerFormStep === 2)
              && <RegisterFormStepTwo
              stateObj={stateObj}
              setStateObj={setStateObj}
              stepOneRequest={registerFormRequests.stepOneRequest}
              stepTwoRequest={registerFormRequests.stepTwoRequest}
               />)
            || ((stateObj.registerFormStep === 3)
              && <RegisterFormStepThree
              stateObj={stateObj}
              setStateObj={setStateObj}
              stepThreeRequest = {registerFormRequests.stepThreeRequest}
               />)
          } */}
        </form>

      </div>
    </>
  );
};

export default Register;
