import { useState } from 'react';
import post from '../../common/framework';

const useOtp = () => {
  const [stateObj, setStateObj] = useState({
    otpTimerId: null,
    enteredOtpArr: ['', '', '', ''],
  });

  const sendOtpRequest = (phoneNumber, countryCode, type, token, recaptchaVersion) => {
    const postData = {
      type,
      phone: phoneNumber,
      countryCode,
      token,
      recaptchaVersion: Number.toString(recaptchaVersion),
    };

    return post(postData, 'register/', false, false);
  };

  const verifyOtpRequest = (phoneNumber, countryCode, token, recaptchaVersion) => {
    const postData = {
      type: 'verify-otp',
      phone: phoneNumber,
      countryCode,
      otp: stateObj.enteredOtpArr.join(''),
      token,
      recaptchaVersion: Number.toString(recaptchaVersion),
    };

    return post(postData, 'register/');
  };
  return {
    sendOtpRequest, verifyOtpRequest, stateObj, setStateObj,
  };
};

export default useOtp;
