import React, { useEffect } from 'react';
import $ from 'jquery';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import post, { pageInit, validate, authorize } from '../framework';
import '../../../stylesheets/common/pages/register/style.scss';
import { useRegisterFormStep, useRegisterFormSavedFields } from '../../../../hooks/pages/register';

const manager = {};

const stepOneRequest = (phoneNumber, countryCode) => {
  const postData = {
    type: 'send-otp',
    phone: phoneNumber,
    countryCode,
  };

  return new Promise((resolve, reject) => {
    post(postData, 'register/').then((response) => {
      const data = JSON.parse(response);
      resolve(data);
    }).catch((error) => {
      const errData = JSON.parse(error);
      reject(errData);
      console.log(errData);
    });
  });
};

const stepTwoRequest = (phoneNumber, countryCode, enteredOtp) => {
  const postData = {
    type: 'verify-otp',
    phone: phoneNumber,
    countryCode,
    otp: enteredOtp,
  };

  return new Promise((resolve, reject) => {
    post(postData, 'register/').then((response) => {
      const data = JSON.parse(response);
      resolve(data);
    }).catch((error) => {
      const errData = JSON.parse(error);
      reject(errData);
      console.log(errData);
    });
  });
};

const stepThreeRequest = (phoneNumber, countryCode, fullName, mailAddress, password) => {
  const postData = {
    type: 'register',
    phone: phoneNumber,
    countryCode,
    name: fullName,
    mail: mailAddress,
    password,
    url: window.location.href,
  };

  return new Promise((resolve, reject) => {
    post(postData, 'register/').then((response) => {
      const data = JSON.parse(response);
      resolve(data);
    }).catch((error) => {
      const errData = JSON.parse(error);
      reject(errData);
      console.log(errData);
    });
  });
};

const RegisterFormStepOne = ({
  savedValuesObj, setSavedValuesObj, currentStep, setCurrentStep, getValuesObj,
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
  const nextBtnClickHandler = () => {
    const phoneFieldValue = validate('#phone', 'mobile', 1, '#phone-form-helper', 'Enter a valid phone number');
    const emailFieldValue = validate('#email', 'email', 1, '#email-form-helper', 'Enter a valid E-mail address');
    const nameFieldValue = validate('#name', 'name', 1, '#name-form-helper', 'Enter a valid name');
    const parentNameFieldValue = validate('#parent-name', 'name', 1, '#parent-name-form-helper', "Enter a valid Parent's Name");

    console.log(phoneFieldValue, emailFieldValue, nameFieldValue, parentNameFieldValue);

    if (phoneFieldValue
      && emailFieldValue
      && nameFieldValue
      && parentNameFieldValue) {
      let countryCode = manager.telInput.getSelectedCountryData();
      countryCode = `+${countryCode.dialCode}`;

      setSavedValuesObj(getValuesObj('.create-account-form .step-1-fields input'));
      // setCurrentStep(currentStep + 1);

      stepOneRequest(phoneFieldValue, countryCode).then((data) => {
        if (data.status === 'success') {
          setCurrentStep(currentStep + 1);
        } else if (data.status === 'error' && data.message === 'ACCOUNT_EXIST') {
          $('#phone').addClass('is-invalid').removeClass('is-valid');
          $('#step-error').text('Account already exists!, try logging in').removeClass('invisible');
        }
      });
    }
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
        <input className='form-control' type='tel' name='phone' id='phone' placeholder='Phone' defaultValue={savedValuesObj.phone} required={ true }/>
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
        <input className='form-control' type='email' name='email' id='email' placeholder='Email' defaultValue={savedValuesObj.email} required={ true }/>
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
        <input className='form-control' type='text' name='name' id='name' placeholder='Name' defaultValue={savedValuesObj.name} required={ true }/>
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
        <input className='form-control' type='text' name='parent-name' id='parent-name' placeholder="Parent's Name" defaultValue={savedValuesObj['parent-name']} required={ true }/>
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

const RegisterFormStepTwo = ({ phoneNumber, currentStep, setCurrentStep }) => {
  const inputOnChangeHandler = (e) => {
    const { target } = e;
    const currentValue = target.value;
    const inputFieldFilled = currentValue.length === 1;

    if (inputFieldFilled) {
      const nextSibling = $(target).next();

      if (nextSibling.length) {
        $(target).trigger('blur');
        nextSibling.trigger('focus');
      }
    } else if (!inputFieldFilled) {
      const previousSibling = $(target).prev();

      if (previousSibling.length > 0) {
        $(target).trigger('blur');
        previousSibling.trigger('focus');
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

    if (validatedOtp) {
      let countryCode = manager.telInput.getSelectedCountryData();
      countryCode = `+${countryCode.dialCode}`;

      stepTwoRequest(phoneNumber, countryCode, validatedOtp).then((data) => {
        if (data.status === 'success') {
          setCurrentStep(currentStep + 1);
        } else if (data.status === 'error' && data.message === 'OTP_EXPIRED') {
          $('#otp-form-helper').html('Enter a valid OTP');
        }
      });
    }
  };
  return (
    <div className='step-2-fields'>
      <div className='label-and-otp-fields mb-5'>
        <label>
          <FormattedMessage defaultMessage='OTP' description='OTP Label' />
        </label>
        <div className='otp-fields mb-5'>
          <input type='text' className='form-control' maxLength={1} onChange={ inputOnChangeHandler }/>
          <input type='text' className='form-control' maxLength={1} onChange={ inputOnChangeHandler }/>
          <input type='text' className='form-control' maxLength={1} onChange={ inputOnChangeHandler }/>
          <input type='text' className='form-control' maxLength={1} onChange={ inputOnChangeHandler }/>
        </div>
        <Link to='#' className='not-given-number overline-bold text-center' onClick={() => setCurrentStep(1)}>
          <FormattedMessage
            defaultMessage='Not {phone}'
            description="not button"
            values={{
              phone: phoneNumber,
            }}
          />
        </Link>
      </div>
      <div className='take-action-buttons'>
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

const RegisterFormStepThree = ({ savedValuesObj }) => {
  const createAccountBtnClickHandler = () => {
    // let countryCode = manager.telInput.getSelectedCountryData();
    // countryCode = `+${countryCode.dialCode}`;

    const enteredPassword = validate('#password', 'password', 1, '#password-form-helper', 'Enter a valid password');
    const retypedPassword = validate('#retyped-password', 'password', 1, '#retyped-password-form-helper', 'Enter a valid password');

    if ((enteredPassword && retypedPassword)) {
      if (enteredPassword !== retypedPassword) {
        $('#password').addClass('is-invalid').removeClass('is-valid');
        $('#password-form-helper').html('Passwords do not match');

        $('#retyped-password').addClass('is-invalid').removeClass('is-valid');
      }
      // stepThreeRequest(savedValuesObj.phone,
      //   countryCode,
      //   savedValuesObj.name,
      //   savedValuesObj.email,
      //   enteredPassword).then((data) => {
      //   if (data.status === 'success' && data.message === 'REGISTERED') {
      //     const sessionDetails = data.session;
      //     authorize.setUserSession(sessionDetails);
      //   }
      // });
    } else {
      $('#password-form-helper').text('Enter a valid password');
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
        <input className='form-control' type='password' name='password' id='password' placeholder='Password' />
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
        <input className='form-control' type='password' name='retyped-password' id='retyped-password' placeholder='Re-type Password' />
    </div>
    <div className='take-action-buttons'>
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

  const getValuesObj = (selector) => {
    const valuesObj = {};

    $(selector).each(function () {
      valuesObj[$(this).attr('name')] = $(this).val();
    });

    return valuesObj;
  };
  const [savedValuesObj, setSavedValuesObj] = useRegisterFormSavedFields(() => getValuesObj('.create-account-form .step-1-fields input'));

  const [currentStep, setCurrentStep] = useRegisterFormStep(1);

  const backBtnClickHandler = () => {
    if (currentStep === 3) {
      setCurrentStep(1);
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const backBtnDisplay = currentStep > 1 ? 'd-block' : 'd-none';

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
          {/* <RegisterFormStepThree currentStep={currentStep} setCurrentStep={setCurrentStep} /> */}
          {
            ((currentStep === 1)
              && <RegisterFormStepOne
              savedValuesObj={savedValuesObj}
              setSavedValuesObj={setSavedValuesObj}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              getValuesObj={ getValuesObj } />)
            || ((currentStep === 2)
              && <RegisterFormStepTwo
                phoneNumber={savedValuesObj.phone}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep} />)
            || ((currentStep === 3)
            && <RegisterFormStepThree currentStep={currentStep} setCurrentStep={setCurrentStep} />)
          }
          <p className='step-error text-danger overline-bold invisible text-center' id='step-error'></p>
        </form>

      </div>
    </>
  );
};

export default Register;
