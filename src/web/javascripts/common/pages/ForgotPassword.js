import React, { useEffect } from 'react';
import $ from 'jquery';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import {
  pageInit, validate,
} from '../framework';
import '../../../stylesheets/common/pages/forgot-password/style.scss';
import useForgotPassword from '../../../../hooks/pages/forgot-password';
import {
  validateInputOnChange, closeFormError, setFormErrorField, togglePasswordVisibility,
} from '../commonLoginRegisterFunctions';
import VerifyOtpFormStep from '../components/VerifyOtpFormStep';
import useBackBtn from '../../../../hooks/pages/back-btn';
import { showInlineLoadingSpinner } from '../loader';
import useOtp from '../../../../hooks/pages/otp';
import useRecapchav3 from '../../../../hooks/pages/recapchav3';

const manager = {};

const LoginIntoExistingAccountBtn = () => <Link to='/login' className='login-to-existing-account-btn btn btn-outline-primary btn-block mb-2'>
  <span className='overline-bold'>
    <FormattedMessage
      defaultMessage="Login to existing Account"
      description="Login to existing account button"
    />
  </span>
</Link>;

const CreateAccountBtn = () => <Link to='/register' className='create-new-account-btn btn btn-outline-primary btn-block mt-0 mb-2'>
  <span className='overline-bold'>
    <FormattedMessage
      defaultMessage="Create a New Account"
      description="create new account button"
    />
  </span>
</Link>;

const TakeActionButtons = ({ children }) => (
  <div className='take-action-buttons mt-4'>
    {(children) || false}
    <div className='secondary-take-action-buttons'>
      <LoginIntoExistingAccountBtn />
      <CreateAccountBtn />
    </div>
  </div>
);

const ForgotPasswordStepOne = ({
  stateObj, setStateObj, handleStateChange, setBackBtnStateObj, getRecapchaToken,
}) => {
  // hooks
  const { sendOtpRequest } = useOtp();

  useEffect(() => {
    const flaginput = document.querySelector('#phone');
    manager.telInput = intlTelInput(flaginput, {
      allowDropdown: true,
      initialCountry: 'in',
      separateDialCode: true,
      utilsScript: intlTelInput.utilsScript,
    });

    setBackBtnStateObj((prevObj) => ({
      ...prevObj,
      showBackBtn: false,
    }));
  }, []);

  // methods
  const sendOtpClickHandler = (e) => {
    e.preventDefault();
    const result = validate('#phone', 'tel', 1, '#phone-form-helper');

    let countryCode = manager.telInput.getSelectedCountryData();
    countryCode = `+${countryCode.dialCode}`;

    if (result) {
      const hideInLineLoadingSpinner = showInlineLoadingSpinner('.send-otp-btn');
      getRecapchaToken({ action: 'forgotPassword' })
        .then((token) => sendOtpRequest(stateObj.phoneNumber, countryCode, 'send-otp-for-pwd-change', token)
          .then((response) => {
            const data = JSON.parse(response);
            const { status, message } = data;

            if (status === 'success') {
              setStateObj((prevObj) => (
                {
                  ...prevObj,
                  formStep: 2,
                  countryCode,
                }
              ));
            } else if (data.status === 'error') {
              const errorCause = 'postData';
              switch (message) {
                case 'ACCOUNT_NOT_EXIST': {
                  $('#phone').addClass('is-invalid');

                  const err = new Error("Account doesn't exists!, try signing up");
                  err.errorTypeObject = { 'data-error-type': 'ACCOUNT_NOT_EXIST' };
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
                  const err = new Error('Something went wrong! Try again');
                  err.errorTypeObject = { 'data-error-type': 'ERROR' };
                  err.cause = errorCause;

                  throw err;
                }
              }
            }
          })).catch((err) => {
          hideInLineLoadingSpinner();

          if (err.cause === 'postData') {
            setFormErrorField(err.message, err.errorTypeObject);
          } else {
            setFormErrorField('Something went wrong! Try again', { 'data-error-type': 'ERROR' });
            console.error(err);
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
        }} data-close-form-error-type='ERROR,ACCOUNT_NOT_EXIST' data-typename='Phone Number' />
      </div>
      <p className='form-error text-danger overline-bold text-center' id='form-error'></p>
      <TakeActionButtons>
        <button type="submit" className='send-otp-btn btn btn-primary btn-block mb-3' onClick={sendOtpClickHandler}>
          <span className='overline-bold'>
            <FormattedMessage
              defaultMessage="Send OTP"
              description="send otp button"
            />
          </span>
        </button>
      </TakeActionButtons>
    </div>
  );
};

const ForgotPasswordStepThree = ({
  changePasswordRequest, setStateObj, handleStateChange, setBackBtnStateObj, getRecapchaToken,
}) => {
  // hooks
  useEffect(() => {
    setBackBtnStateObj((prevBackObj) => ({
      ...prevBackObj,
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

  const changePasswordBtnClickHandler = (e) => {
    e.preventDefault();

    const enteredPassword = validate('#password', 'password', 1);
    const retypedPassword = validate('#retyped-password', 'password', 1);

    if ((enteredPassword && retypedPassword) && (enteredPassword !== retypedPassword)) {
      $('#retyped-password').addClass('is-invalid');
      $('#retyped-password-form-helper').text('Password do not match').show();
    }

    if ((enteredPassword && retypedPassword) && (enteredPassword === retypedPassword)) {
      const hideInlineLoadingSpinner = showInlineLoadingSpinner('.change-password-btn');

      getRecapchaToken({ action: 'forgotPassword' }).then((token) => changePasswordRequest(token).then((response) => {
        const data = JSON.parse(response);
        const { status, message } = data;

        if (status === 'success') {
          setStateObj((prevObj) => ({
            ...prevObj,
            formStep: 4,
          }));
        } else if (status === 'error') {
          const errorCause = 'postData';
          const errorTypeObject = { 'data-error-type': 'ERROR' };
          switch (message) {
            case 'UNAUTHORIZED_ACCESS': {
              const err = new Error('Unauthorized access, reload and try again!');
              err.errorTypeObject = errorTypeObject;
              err.cause = errorCause;

              throw err;
            }
            default: {
              const err = new Error('Something went wrong! Try again');
              err.errorTypeObject = errorTypeObject;
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
              defaultMessage="New Password"
              description="New Password label"
            />
          </label>
          <span className='form-helper text-danger overline-bold' id='password-form-helper'></span>
        </div>
        <div className='passwordfield-with-toggle-icon'>
          <input className='form-control' type='password' name='password' id='password' placeholder='Password' onChange={(e) => {
            handleStateChange('password', e.target.value);
            validateInputOnChange(e, 'password', 'Use a stronger password');
            closeFormError(e.target);
          }} data-close-form-error-type='ERROR,INVALID_PASSWORD' required={true} data-typename='Password' />
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
            validateInputOnChange(e, 'password', 'Use a stronger Password');
            matchValueTo(e, '#password');
          }} data-close-form-error-type='ERROR,INVALID_PASSWORD' required={true} data-typename='Re-type Password' />
          <span className="password-toggle-icon-container">
            <i className="fa fa-fw fa-eye toggle-password" data-toggle="#retyped-password" onClick={togglePasswordVisibility}></i>
          </span>
        </div>
      </div>
      <p className='form-error text-danger overline-bold text-center' id='form-error'></p>
      <div className='take-action-buttons mt-4'>
        <button type="submit" className='change-password-btn btn btn-primary btn-block' onClick={changePasswordBtnClickHandler}>
          <FormattedMessage
            defaultMessage="Change password"
            description="Change password Button" />
        </button>
      </div>
    </div>
  );
};

const ForgotPasswordStepFour = ({ setBackBtnStateObj }) => {
  // hooks
  useEffect(() => {
    setBackBtnStateObj((prevBackObj) => ({
      ...prevBackObj,
      showBackBtn: false,
    }));
  }, []);

  return (
    <div>
      <h5 className='text-center'>
        <FormattedMessage
          defaultMessage={'Password changed successfully'}
          description="Password changed text" />
      </h5>
      <div className='take-action-buttons mt-5'>
        <Link to='/login' className='d-block text-decoration-none'>
          <button type='button' className='go-to-login-btn btn btn-primary btn-block'>
            <span className='overline-bold'>
              <FormattedMessage
                defaultMessage="Go to login"
                description="Go to login button"
              />
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

const ForgotPassword = () => {
  pageInit('auth-container', 'Forgot-Password');
  // hooks
  const {
    stateObj, setStateObj, changePasswordRequest,
  } = useForgotPassword();

  const { stateObj: backBtnStateObj, setStateObj: setBackBtnStateObj } = useBackBtn();
  const getRecapchaToken = useRecapchav3();

  // styles
  const backBtnDisplay = backBtnStateObj.showBackBtn ? 'd-block' : 'd-none';
  let formSvgPath = '../../../../images/forgot-password/forgot-password-form-svg.svg';

  if (stateObj.formStep === 3) {
    formSvgPath = '../../../../images/forgot-password/forgot-password-step-3-svg.svg';
  } else if (stateObj.formStep === 4) {
    formSvgPath = '../../../../images/forgot-password/forgot-password-step-4-svg.svg';
  }

  const handleStateChange = (key, value) => {
    setStateObj((prevObj) => ({
      ...prevObj,
      [key]: value,
    }));
  };

  // common props
  const commonProps = {
    getRecapchaToken,
    stateObj,
    setStateObj,
    handleStateChange,
    setBackBtnStateObj,
  };

  return (
    <div className='form-container'>
      <form className='forgot-password-form py-5 px-3 py-sm-3 w-100'>
        <header className='d-flex'>
          <i
            className={`back-btn fa fa-arrow-left ${backBtnDisplay}`}
            onClick={backBtnStateObj.backFn}></i>
          <h5 className='subtitle1 text-center flex-grow-1'>
            <FormattedMessage
              defaultMessage="Forgot Password"
              description="Forgot Password heading" />
          </h5>
        </header>
        <img src={formSvgPath} className='form-svg' />
        {
          ((stateObj.formStep === 1
            && <ForgotPasswordStepOne {...commonProps} />)
            || (stateObj.formStep === 2
              && <VerifyOtpFormStep
                parentStateObj={stateObj}
                setParentStateObj={setStateObj}
                setBackBtnStateObj={setBackBtnStateObj}
                otpRequestType={'send-otp-for-pwd-change'}
                recapchaExecuteOptions={{ action: 'forgotPassword' }}
                getRecapchaToken={getRecapchaToken}
                secondaryActionButtons={[<LoginIntoExistingAccountBtn key={0} />,
                <CreateAccountBtn key={1} />]} />)
            || (stateObj.formStep === 3
              && <ForgotPasswordStepThree
                {...commonProps}
                changePasswordRequest={changePasswordRequest}
              />)
            || (stateObj.formStep === 4
              && <ForgotPasswordStepFour setBackBtnStateObj={setBackBtnStateObj} />)
          )
        }
      </form>
    </div>
  );
};

export default ForgotPassword;
