import React, { useEffect } from 'react';
import $ from 'jquery';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { closeFormError, setFormErrorField } from '../../commonLoginRegisterFunctions';
import useOtp from '../../../../../hooks/pages/otp';
import '../../../../stylesheets/common/sass/components/_otp.scss';
import showInlineLoadingSpinner from '../../loader';

const VerifyOtpFormStep = ({
  parentStateObj, setParentStateObj, setBackBtnStateObj, otpRequestType,
  secondaryActionButtons = false,
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
      sendOtpRequest(parentStateObj.phoneNumber,
        parentStateObj.countryCode,
        otpRequestType).then((response) => {
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
    verifyOtpRequest(parentStateObj.phoneNumber,
      parentStateObj.countryCode).then((response) => {
      const data = JSON.parse(response);
      if (data.status === 'success') {
        setParentStateObj((prevObj) => ({
          ...prevObj,
          formStep: prevObj.formStep + 1,
        }));
      } else if (data.status === 'error' && data.message === 'OTP_EXPIRED') {
        hideInlineLoadingSpinner();
        setFormErrorField('Enter a valid OTP', { 'data-error-type': data.message });
      }
    }).catch((err) => {
      hideInlineLoadingSpinner();
      const errData = JSON.parse(err);
      console.log(errData);
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
          }} data-close-form-error-type='OTP_EXPIRED' onKeyUp={keyUpHandler}/>
          <input type='text' className='form-control' maxLength={1} onChange={(e) => {
            onChangeHandler(e, 1);
            closeFormError(e.target);
          } } data-close-form-error-type='OTP_EXPIRED' onKeyUp={keyUpHandler} />
          <input type='text' className='form-control' maxLength={1} onChange={(e) => {
            onChangeHandler(e, 2);
            closeFormError(e.target);
          } } data-close-form-error-type='OTP_EXPIRED' onKeyUp={keyUpHandler} />
          <input type='text' className='form-control' maxLength={1} onChange={(e) => {
            onChangeHandler(e, 3);
            closeFormError(e.target);
          } } data-close-form-error-type='OTP_EXPIRED' onKeyUp={keyUpHandler}/>
        </div>
        <Link to='#' className='not-given-number overline-bold text-link' onClick={() => setParentStateObj((prevObj) => ({
          ...prevObj,
          formStep: 1,
        }))}>
          <FormattedMessage
            defaultMessage='Not {phone} ?'
            description="not button"
            values={{
              phone: parentStateObj.phoneNumber,
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
