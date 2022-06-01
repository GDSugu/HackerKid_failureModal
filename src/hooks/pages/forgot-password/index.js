import { useState } from 'react';
import post from '../../common/framework';

const useForgotPassword = () => {
  const [stateObj, setStateObj] = useState({
    phoneNumber: '',
    password: '',
    formStep: 1,
    otpTimerId: null,
    enteredOtpArr: [],
  });

  const stepOneRequest = () => {
    const postData = {
      type: 'send-otp-for-pwd-change',
      phone: stateObj.phoneNumber,
      countryCode: stateObj.countryCode,
    };

    return post(postData, 'register/');
  };

  const stepThreeRequest = () => {
    const postData = {
      type: 'changePassword',
      phone: stateObj.phoneNumber,
      countryCode: stateObj.countryCode,
      password: stateObj.password,
    };

    return post(postData, 'register/');
  };

  return {
    stateObj,
    setStateObj,
    stepOneRequest,
    stepThreeRequest,
  };
};

export default useForgotPassword;
