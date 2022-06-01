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
import { loginCheck, setUserSession } from '../../../../hooks/common/framework';
import VerifyOtpFormStep from '../components/VerifyOtpFormStep/VeriyOtpFormStep';
import useOtp from '../../../../hooks/pages/otp';

const manager = {};

const TakeActionButtons = ({ buttonsArr }) => (
    <div className='take-action-buttons mt-4'>
    {
      buttonsArr.map((button) => button)
    }
  </div>
);

const RegisterFormStepOne = ({
  stateObj, setStateObj, handleStateChange,
}) => {
  const { sendOtpRequest } = useOtp(stateObj.phoneNumber, stateObj.countryCode);

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
      sendOtpRequest().then((response) => {
        const data = JSON.parse(response);
        if (data.status === 'success') {
          setStateObj((prevObj) => ({
            ...prevObj,
            formStep: prevObj.formStep + 1,
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
        }} data-close-form-error-type='ACCOUNT_EXIST' data-typename='Phone Number'/>
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
        }} data-typename='Email Address'/>
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
        }} data-typename='Full Name'/>
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
        }} data-typename="Parent's Name" />
      </div>
      <p className='form-error text-danger overline-bold text-center' id='form-error'></p>
      <TakeActionButtons buttonsArr ={[]} />
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

const RegisterFormStepThree = ({ createAccountRequest, handleStateChange }) => {
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
        createAccountRequest().then((response) => {
          const data = JSON.parse(response);

          if (data.status === 'success' && data.message === 'REGISTERED') {
            const sessionDetails = data.session;
            setUserSession(sessionDetails);
            pathNavigator('dashboard');
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
          <input className='form-control' type='password' name='password' id='password' placeholder='Password' onChange={(e) => {
            handleStateChange('password', e.target.value);
            validateInputOnChange(e, 'password', 'Use a stronger password');
            closeFormError(e.target);
          }} data-close-form-error-type='INVALID_PASSWORD' required={ true} data-typename='Password' />
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
          <input className='form-control' type='password' name='retyped-password' id='retyped-password' placeholder='Re-type Password' typename='Re-type Password' onChange={(e) => {
            handleStateChange('password', e.target.value);
            validateInputOnChange(e, 'password', 'Use a stronger password');
            closeFormError(e.target);
            matchValueTo(e, '#password');
          }} data-close-form-error-type='INVALID_PASSWORD' required={ true} data-typename='Re-type Password'/>
          <span className="password-toggle-icon-container">
            <i className="fa fa-fw fa-eye toggle-password" toggle="#retyped-password" onClick={togglePasswordVisibility}></i>
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

  const { stateObj, setStateObj, createAccountRequest } = useRegister();

  const handleStateChange = (key, value) => {
    setStateObj((prevObj) => {
      const newObj = {
        ...prevObj,
        [key]: value,
      };

      if (key === 'phoneNumber') {
        let countryCode = manager.telInput.getSelectedCountryData();
        countryCode = `+${countryCode.dialCode}`;
        newObj.countryCode = countryCode;
      }
      return newObj;
    });
  };

  const backBtnClickHandler = () => {
    if (stateObj.formStep === 3) {
      setStateObj((prevState) => ({
        ...prevState,
        formStep: 1,
      }));
    } else {
      setStateObj((prevState) => ({
        ...prevState,
        formStep: prevState.formStep - 1,
      }));
    }
  };

  const backBtnDisplay = stateObj.formStep > 1 ? 'd-block' : 'd-none';

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

  return (
    <>
      <div className='form-container'>
        <form className='register-account-form py-5 py-sm-3 px-3 w-100'>
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
          {
            ((stateObj.formStep === 1)
              && <RegisterFormStepOne
              stateObj={stateObj}
              setStateObj={setStateObj}
              handleStateChange={ handleStateChange}
            />)
            || ((stateObj.formStep === 2)
              && <VerifyOtpFormStep
              parentStateObj={stateObj}
              setParentStateObj={setStateObj}
              secondaryActionButtons={[<Link key={ 0} to='/login' className='login-into-existing-account-btn text-link mt-3'>
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
              stateObj={stateObj}
              setStateObj={setStateObj}
              createAccountRequest={createAccountRequest}
              handleStateChange={ handleStateChange}
               />)
          }
        </form>
      </div>
    </>
  );
};

export default Register;
