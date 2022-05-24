import { useState } from 'react';
import post from '../../common/framework';

const useOtp = (phoneNumber, countryCode) => {
  const [stateObj, setStateObj] = useState({
    otpTimerId: null,
    enteredOtpArr: [],
  });

  const sendOtpRequest = () => {
    const postData = {
      type: 'send-otp',
      phone: phoneNumber,
      countryCode,
    };

    return post(postData, 'register/');
  };

  const verifyOtpRequest = () => {
    const postData = {
      type: 'verify-otp',
      phone: phoneNumber,
      countryCode,
      otp: stateObj.enteredOtpArr.join(''),
    };

    return post(postData, 'register/');
  };
  return {
    sendOtpRequest, verifyOtpRequest, stateObj, setStateObj,
  };
};

export default useOtp;
