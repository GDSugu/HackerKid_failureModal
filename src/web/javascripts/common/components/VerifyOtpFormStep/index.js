import React, { useEffect } from 'react';
import $ from 'jquery';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { closeFormError, setFormErrorField } from '../../commonLoginRegisterFunctions';
import useOtp from '../../../../../hooks/pages/otp';
import '../../../../stylesheets/common/sass/components/_otp.scss';
import { showInlineLoadingSpinner } from '../../loader';

const VerifyOtpFormStep = ({
  parentStateObj, setParentStateObj, setBackBtnStateObj, otpRequestType, recapchaExecuteOptions,
  getRecapchaToken, secondaryActionButtons = false,
}) => {
  // hooks
  const {
    sendOtpRequest, verifyOtpRequest, stateObj, setStateObj,
  } = useOtp();

  // methods
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
      getRecapchaToken(recapchaExecuteOptions)
        .then((token) => sendOtpRequest(parentStateObj.phoneNumber,
          parentStateObj.countryCode,
          otpRequestType, token).then((response) => {
          const data = JSON.parse(response);
          const { status, message } = data;

          if (status === 'success') {
            startOtpTimer();
          } else if (status === 'error') {
            const errorCause = 'postData';
            const errorTypeObject = { 'data-error-type': 'ERROR' };

            switch (message) {
              case 'UNAUTHORIZED _ACCESS': {
                const err = new Error('Unauthorized access, reload and try again');
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
          if (err.cause === 'postData') {
            setFormErrorField(err.message, err.errorTypeObject);
          } else {
            setFormErrorField('Something went wrong! Try again', { 'data-error-type': 'ERROR' });
            console.error(err);
          }
        });
    }
  };

  const keyUpHandler = (e) => {
    const { key, target } = e;

    if (e.key.match(/\d/g)) {
      const isInputFilled = target.value.length === 1;

      if (isInputFilled) {
        const nextOtpField = $(target).next();

        if (nextOtpField.length) {
          $(target).trigger('blur');
          nextOtpField.trigger('focus');
        }
      }
    } else if (key === 'Backspace' || key === 'Delete') {
      const prevOtpField = $(target).prev();

      if (prevOtpField.length) {
        $(target).trigger('blur');
        prevOtpField.trigger('focus');
        const htmlElement = prevOtpField[0];
        htmlElement.select();
      }
    }
  };

  const onChangeHandler = (e, otpIndex) => {
    const { target } = e;
    const { value } = target;
    const regex = /\D/g;

    if (regex.test(value)) {
      e.target.value = value.replace(regex, '');
      return;
    }

    // if digit is entered in the field
    if (value.length) {
      setStateObj((prevObj) => {
        const prevEnteredOtpArr = prevObj.enteredOtpArr;

        prevEnteredOtpArr.splice(otpIndex, 1, value);

        return {
          ...prevObj,
          enteredOtpArr: [...prevEnteredOtpArr],
        };
      });
    } else {
      // else if its being removed from the field
      setStateObj((prevObj) => {
        const prevEnteredOtpArr = prevObj.enteredOtpArr;

        prevEnteredOtpArr.splice(otpIndex, 1, '');

        return {
          ...prevObj,
          enteredOtpArr: [...prevEnteredOtpArr],
        };
      });
    }
  };

  const verifyBtnClickHandler = (e) => {
    e.preventDefault();
    const { enteredOtpArr } = stateObj;

    if (enteredOtpArr.join('').length !== 4) {
      setFormErrorField('Enter a OTP to proceed', { 'data-error-type': 'OTP_EXPIRED' });
      return;
    }

    const hideInlineLoadingSpinner = showInlineLoadingSpinner('.verify-otp-btn');

    getRecapchaToken(recapchaExecuteOptions)
      .then((token) => verifyOtpRequest(parentStateObj.phoneNumber,
        parentStateObj.countryCode, token).then((response) => {
        const data = JSON.parse(response);
        const { status, message } = data;

        if (status === 'success') {
          setParentStateObj((prevObj) => ({
            ...prevObj,
            formStep: prevObj.formStep + 1,
          }));
        } else if (status === 'error') {
          const errorCause = 'postData';
          switch (message) {
            case 'OTP_EXPIRED': {
              const err = new Error('Enter a valid OTP');
              err.errorTypeObject = { 'data-error-type': message };
              err.cause = errorCause;

              throw err;
            }
            case 'UNAUTHORIZED _ACCESS': {
              const err = new Error('Unauthorized access, reload and try again');
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
        hideInlineLoadingSpinner();
        if (err.cause === 'postData') {
          setFormErrorField(err.message, err.errorTypeObject);
        } else {
          setFormErrorField('Something went wrong! Try again', { 'data-error-type': 'ERROR' });

          console.error(err);
        }
      });
  };

  useEffect(() => {
    startOtpTimer();

    setBackBtnStateObj((prevObj) => ({
      ...prevObj,
      showBackBtn: true,
      backFn: () => {
        setParentStateObj((prevParentObj) => ({
          ...prevParentObj,
          formStep: prevParentObj.formStep - 1,
        }));
      },
    }));

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
          <button type='button' className='resend-otp btn-as-interactive-link overline-bold' onClick={resendOtpClickHandler}>
            <FormattedMessage defaultMessage='Resend' description='resend otp button' />
          </button>
        </div>
        <div className='otp-fields mb-5'>
          <input type='text' className='form-control' maxLength={1} onChange={(e) => {
            onChangeHandler(e, 0);
            closeFormError(e.target);
          }} data-close-form-error-type='ERROR,OTP_EXPIRED' onKeyUp={keyUpHandler}/>
          <input type='text' className='form-control' maxLength={1} onChange={(e) => {
            onChangeHandler(e, 1);
            closeFormError(e.target);
          } } data-close-form-error-type='ERROR,OTP_EXPIRED' onKeyUp={keyUpHandler} />
          <input type='text' className='form-control' maxLength={1} onChange={(e) => {
            onChangeHandler(e, 2);
            closeFormError(e.target);
          } } data-close-form-error-type='ERROR,OTP_EXPIRED' onKeyUp={keyUpHandler} />
          <input type='text' className='form-control' maxLength={1} onChange={(e) => {
            onChangeHandler(e, 3);
            closeFormError(e.target);
          } } data-close-form-error-type='ERROR,OTP_EXPIRED' onKeyUp={keyUpHandler}/>
        </div>
        <Link to='#' className='not-given-number overline-bold text-link' onClick={() => setParentStateObj((prevObj) => ({
          ...prevObj,
          formStep: 1,
        }))}>
          <FormattedMessage
            defaultMessage='Not {phone} ?'
            description="not button"
            values={{
              phone: `${parentStateObj.countryCode}${parentStateObj.phoneNumber}`,
            }}
          />
        </Link>
      </div>
      <p className='form-error text-danger overline-bold text-center' id='form-error'></p>
      <div className='take-action-buttons mt-4'>
        <button type={'submit'}
          className='verify-otp-btn btn btn-primary btn-block mb-2'
          onClick={verifyBtnClickHandler}>
          <FormattedMessage
            defaultMessage="Verify OTP and proceed"
            description="verify otp button" />
        </button>
        <div className='secondary-take-action-buttons'>
        {
              (Array.isArray(secondaryActionButtons))
                ? secondaryActionButtons.map((secondaryActionBtn) => secondaryActionBtn)
                : secondaryActionButtons
            }
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpFormStep;
