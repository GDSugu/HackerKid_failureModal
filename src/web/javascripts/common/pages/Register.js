import React, { useEffect } from 'react';
import $ from 'jquery';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import {
  pageInit, pathNavigator, validate,
} from '../framework';
import '../../../stylesheets/common/pages/register/style.scss';
import useRegister from '../../../../hooks/pages/register';
import {
  togglePasswordVisibility, validateInputOnChange, closeFormError, setFormErrorField,
} from '../commonLoginRegisterFunctions';
import { loginCheck, setSession } from '../../../../hooks/common/framework';
import VerifyOtpFormStep from '../components/VerifyOtpFormStep';
import useOtp from '../../../../hooks/pages/otp';
import useBackBtn from '../../../../hooks/pages/back-btn';
import { showInlineLoadingSpinner } from '../loader';
import useRecapchav3 from '../../../../hooks/pages/recapchav3';

const manager = {};

const checkUrl = () => {
  const url = window.sessionStorage.getItem('navigateTo');
  if (url) {
    window.location.href = url;
    window.sessionStorage.removeItem('navigateTo');
    return true;
  }
  return false;
};

const RegisterFormStepOne = ({
  stateObj, setStateObj, handleStateChange, setBackBtnStateObj, getRecapchaToken,
}) => {
  // hooks
  const { sendOtpRequest } = useOtp();

  useEffect(() => {
    const flaginput = document.querySelector('#phone');
    manager.telInput = intlTelInput(flaginput, {
      allowDropdown: true,
      initialCountry: stateObj.countryAbbrevation || 'in',
      separateDialCode: true,
      utilsScript: intlTelInput.utilsScript,
    });

    setBackBtnStateObj((prevBackObj) => ({
      ...prevBackObj,
      showBackBtn: false,
    }));
  }, [stateObj.formStep]);

  // methods
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

    const checkAllValidations = () => resultArr.every((result) => {
      if (result) return true;
      return false;
    });

    const getCurrentCountryData = () => {
      const countryData = manager.telInput.getSelectedCountryData();

      return {
        countryCode: `+${countryData.dialCode}`,
        countryAbbrevation: countryData.iso2,
      };
    };

    const allValidationsPassed = checkAllValidations();
    if (allValidationsPassed) {
      const hideInlineLoadingSpinner = showInlineLoadingSpinner('.next-btn');
      const { countryCode, countryAbbrevation } = getCurrentCountryData();

      getRecapchaToken({ action: 'register' }).then((token) => sendOtpRequest(stateObj.phoneNumber, countryCode, 'send-otp', token).then((response) => {
        const data = JSON.parse(response);
        const { status, message } = data;

        if (status === 'success') {
          setStateObj((prevObj) => ({
            ...prevObj,
            formStep: prevObj.formStep + 1,
            countryCode,
            countryAbbrevation,
          }));
        } else if (status === 'error') {
          const errorCause = 'postData';

          switch (message) {
            case 'ACCOUNT_EXIST': {
              $('#phone').addClass('is-invalid').removeClass('is-valid');
              const err = new Error('Account already exists!, try logging in');
              err.errorTypeObject = { 'data-error-type': 'ACCOUNT_EXIST' };
              err.cause = errorCause;

              throw err;
            }
            case 'UNAUTHORIZED_ACCESS': {
              const err = new Error('Unauthorized access, reload and try again!');
              err.errorTypeObject = { 'data-error-type': 'ERROR' };
              err.cause = errorCause;

              throw err;
            }
            default: {
              const err = new Error('Something went wrong!Try again');
              err.errorTypeObject = { 'data-error-type': 'ERROR' };
              err.cause = errorCause;

              throw err;
            }
          }
        }
      })).catch((err) => {
        hideInlineLoadingSpinner();
        if (err.cause === 'postData') {
          setFormErrorField(err.message, err.errorTypeObject);
        } else {
          setFormErrorField('Something went wrong! Try again', { 'data-error-type': 'ERROR' });

          const errData = JSON.parse(err);
          console.error(errData);
        }
      });
    }
  };

  return (
    <div className='step-1-fields'>
      <div className="form-group mb-3">
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
        <input className='form-control' type='tel' name='phone' id='phone' placeholder='Phone' defaultValue={stateObj.phoneNumber} required={true} onChange={(e) => {
          handleStateChange('phoneNumber', e.target.value);
          validateInputOnChange(e);
          closeFormError(e.target);
        }} data-close-form-error-type='ACCOUNT_EXIST,ERROR' data-typename='Phone Number'/>
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
        <input className='form-control' type='email' name='email' id='email' placeholder='Email' defaultValue={stateObj.email} required={true} onChange={(e) => {
          handleStateChange('email', e.target.value);
          validateInputOnChange(e);
          closeFormError(e.target);
        }} data-typename='Email Address'
        data-close-form-error-type='ERROR'/>
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
        <input className='form-control' type='name' name='name' id='name' placeholder='Name' defaultValue={stateObj.fullName} required={true} onChange={(e) => {
          handleStateChange('fullName', e.target.value, e);
          validateInputOnChange(e);
          closeFormError(e.target);
        }} data-typename='Full Name'
        data-close-form-error-type='ERROR'/>
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
        <input className='form-control' type='name' name='parent-name' id='parent-name' placeholder="Parent's Name" defaultValue={stateObj.parentName} required={ true } onChange={(e) => {
          handleStateChange('parentName', e.target.value, e);
          validateInputOnChange(e);
          closeFormError(e.target);
        }} data-typename="Parent's Name"
        data-close-form-error-type='ERROR'/>
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
        <Link to='/login' className='login-into-existing-account text-link overline-bold text-center mb-3'>
          <FormattedMessage
            defaultMessage="Login Into Existing Account"
            description="Login Into existing account button"
          />
        </Link>
      </div>
    </div>
  );
};

const RegisterFormStepThree = ({
  createAccountRequest, handleStateChange, setStateObj, setBackBtnStateObj, getRecapchaToken,
}) => {
  // hooks
  useEffect(() => {
    setBackBtnStateObj((prevBackObj) => ({
      ...prevBackObj,
      showBackBtn: true,
      backFn: () => {
        setStateObj((prevObj) => ({
          ...prevObj,
          formStep: 1,
        }));
      },
    }));
  }, []);

  // methods
  const matchValueTo = (e, matchTo) => {
    const { target } = e;
    const { value } = target;
    const matchToValue = $(matchTo).val();

    if (value === '') return;

    const id = $(target).attr('id');

    const formHelperId = `#${id}-form-helper`;
    if (value !== matchToValue) {
      $(target).addClass('is-invalid');

      $(formHelperId).html('Passwords dont match').show();
    } else {
      $(formHelperId).hide();
    }
  };

  const createAccountBtnClickHandler = (e) => {
    e.preventDefault();

    const enteredPassword = validate('#password', 'password', 1);
    const retypedPassword = validate('#retyped-password', 'password', 1);

    if ((enteredPassword && retypedPassword) && (enteredPassword !== retypedPassword)) {
      $('#retyped-password').addClass('is-invalid');
      $('#retyped-password-form-helper').text('Password do not match').show();
    }
    if ((enteredPassword && retypedPassword) && (enteredPassword === retypedPassword)) {
      const hideInlineLoadingSpinner = showInlineLoadingSpinner('.create-account-btn');

      getRecapchaToken({ action: 'register' }).then((token) => createAccountRequest(token).then((response) => {
        const data = JSON.parse(response);
        const { status, message } = data;

        if (status === 'success') {
          if (data.awardsGiven) {
            setSession('awardsGiven', JSON.stringify(data.awardsGiven));
          }
          // pathNavigator('dashboard');
          const urlPresent = checkUrl();
          if (!urlPresent) {
            pathNavigator('dashboard');
          }
        } else if (status === 'error') {
          const errorCause = 'postData';
          switch (message) {
            case 'UNAUTHORIZED_ACCESS': {
              const err = new Error('Unauthorized access, reload and try again!');
              err.errorTypeObject = { 'data-error-type': 'ERROR' };
              err.cause = errorCause;

              throw err;
            }
            default: {
              const err = new Error('Something went wrong! Try again', errorCause);
              err.errorTypeObject = { 'data-error-type': 'ERROR' };
              err.cause = errorCause;

              throw err;
            }
          }
        }
      })).catch((err) => {
        hideInlineLoadingSpinner();

        if (err.cause === 'postData') {
          setFormErrorField(err.message, err.errorTypeObject);
        } else {
          setFormErrorField('Something went wrong! Try again');

          console.error(err);
        }
      });
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
          <input className='form-control' type='password' name='password' id='password' placeholder='Password' onChange={(e) => {
            handleStateChange('password', e.target.value);
            validateInputOnChange(e, 'password', 'Use a stronger password');
            closeFormError(e.target);
          }} data-close-form-error-type='ERROR,INVALID_PASSWORD' required={ true} data-typename='Password' />
          <span className="password-toggle-icon-container">
            <i className="fa fa-fw fa-eye toggle-password" data-toggle="#password" onClick={togglePasswordVisibility}></i>
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
          <input className='form-control' type='password' name='retyped-password' id='retyped-password' placeholder='Re-type Password' onChange={(e) => {
            handleStateChange('password', e.target.value);
            validateInputOnChange(e, 'password', 'Use a stronger password');
            closeFormError(e.target);
            matchValueTo(e, '#password');
          }} data-close-form-error-type='ERROR,INVALID_PASSWORD' required={true} data-typename='Re-type Password'/>
          <span className="password-toggle-icon-container">
            <i className="fa fa-fw fa-eye toggle-password" data-toggle="#retyped-password" onClick={togglePasswordVisibility}></i>
          </span>
        </div>
      </div>
      <p className='form-error text-danger overline-bold text-center' id='form-error'></p>
      <div className='take-action-buttons mt-4'>
        <button type="submit" className='create-account-btn btn btn-primary btn-block' onClick={createAccountBtnClickHandler}>
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

  // hooks
  const { stateObj, setStateObj, createAccountRequest } = useRegister();
  const { stateObj: backBtnStateObj, setStateObj: setBackBtnStateObj } = useBackBtn();
  const getRecapchaToken = useRecapchav3();

  useEffect(() => {
    loginCheck().then((response) => {
      const data = JSON.parse(response);
      if (data.status === 'success') {
        pathNavigator('dashboard');
      }
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  // styles
  const backBtnDisplay = backBtnStateObj.showBackBtn ? 'd-block' : 'd-none';

  // methods
  const handleStateChange = (key, value) => {
    setStateObj((prevObj) => ({
      ...prevObj,
      [key]: value,
    }));
  };

  const commonProps = {
    stateObj,
    setStateObj,
    handleStateChange,
    setBackBtnStateObj,
    getRecapchaToken,
  };

  return (
    <>
      <div className='form-container'>
        <form className='register-account-form py-5 py-sm-3 px-3 w-100'>
          <header className='d-flex'>
            <i
              className={`back-btn fa fa-arrow-left ${backBtnDisplay}`}
              onClick={backBtnStateObj.backFn}></i>
            <h5 className='subtitle1 text-center flex-grow-1'>
              <FormattedMessage
                defaultMessage="Create a New Account"
                description="Create a New Account heading"/>
            </h5>
          </header>
          <img src='../../../../images/register/register-form-svg.svg' className='form-svg' />
          {
            ((stateObj.formStep === 1)
              && <RegisterFormStepOne {...commonProps} />)
            || ((stateObj.formStep === 2)
              && <VerifyOtpFormStep
              parentStateObj={stateObj}
              setParentStateObj={setStateObj}
              setBackBtnStateObj={setBackBtnStateObj}
              otpRequestType={'send-otp'}
              getRecapchaToken = {getRecapchaToken}
              recapchaExecuteOptions = {{ action: 'register' }}
              secondaryActionButtons={[<Link key={0} to='/login' className='login-into-existing-account-btn text-link mt-3'>
              <span className='overline-bold'>
                <FormattedMessage
                  defaultMessage="Login into existing account"
                  description="login into existing account button"
                />
              </span>
              </Link>]}
               />)
            || ((stateObj.formStep === 3)
              && <RegisterFormStepThree
              {...commonProps}
              createAccountRequest={createAccountRequest}
               />)
          }
        </form>
      </div>
    </>
  );
};

export default Register;
