import { useState } from 'react';
import post from '../../common/framework';

const useOtp = () => {
  const [stateObj, setStateObj] = useState({
    otpTimerId: null,
    enteredOtpArr: ['', '', '', ''],
  });

  const sendOtpRequest = (phoneNumber, countryCode, type, token) => {
    const postData = {
      type,
      phone: phoneNumber,
      countryCode,
      token,
    };

    return post(postData, 'register/', false, false);
  };

  const verifyOtpRequest = (phoneNumber, countryCode, token) => {
    const postData = {
      type: 'verify-otp',
      phone: phoneNumber,
      countryCode,
      otp: stateObj.enteredOtpArr.join(''),
      token,
    };

    return post(postData, 'register/');
  };
  return {
    sendOtpRequest, verifyOtpRequest, stateObj, setStateObj,
  };
};

export default useOtp;
