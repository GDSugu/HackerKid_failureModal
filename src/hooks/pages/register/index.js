import { useState } from 'react';
import post from '../../common/framework';

const useRegister = () => {
  const [stateObj, setStateObj] = useState({
    registerFormStep: 1,
    otpTimerId: null,
    phoneNumber: '',
    email: '',
    fullName: '',
    parentName: '',
    enteredOtpArr: [],
    password: '',
  });

  const registerFormRequests = {
    stepOneRequest: () => {
      const postData = {
        type: 'send-otp',
        phone: stateObj.phoneNumber,
        countryCode: stateObj.countryCode,
      };

      return post(postData, 'register/');
    },
    stepTwoRequest: () => {
      const postData = {
        type: 'verify-otp',
        phone: stateObj.phoneNumber,
        countryCode: stateObj.countryCode,
        otp: stateObj.enteredOtpArr.join(''),
      };

      return post(postData, 'register/');
    },
    stepThreeRequest: () => {
      const postData = {
        type: 'register',
        phone: stateObj.phoneNumber,
        countryCode: stateObj.countryCode,
        name: stateObj.fullName,
        mail: stateObj.email,
        password: stateObj.password,
        url: window.location.href,
      };

      return post(postData, 'register/');
    },
  };

  return {
    stateObj,
    setStateObj,
    registerFormRequests,
  };
};

export default useRegister;
