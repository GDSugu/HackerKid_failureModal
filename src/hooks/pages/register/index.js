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
  });

  const registerFormRequests = {
    stepOneRequest: (countryCode) => {
      const postData = {
        type: 'send-otp',
        phone: stateObj.phoneNumber,
        countryCode,
      };

      return post(postData, 'register/');
    },
    stepTwoRequest: (enteredOtp) => {
      const postData = {
        type: 'verify-otp',
        phone: stateObj.phoneNumber,
        countryCode: stateObj.countryCode,
        otp: enteredOtp,
      };

      return post(postData, 'register/');
    },
    stepThreeRequest: (password) => {
      const postData = {
        type: 'register',
        phone: stateObj.phoneNumber,
        countryCode: stateObj.countryCode,
        name: stateObj.fullName,
        mail: stateObj.email,
        password,
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
