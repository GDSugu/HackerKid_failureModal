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
    stepOneRequest: (phoneNumber, countryCode) => {
      const postData = {
        type: 'send-otp',
        phone: phoneNumber,
        countryCode,
      };

      return post(postData, 'register/');
    },
    stepTwoRequest: (phoneNumber, countryCode, enteredOtp) => {
      const postData = {
        type: 'verify-otp',
        phone: phoneNumber,
        countryCode,
        otp: enteredOtp,
      };

      return post(postData, 'register/');
    },
    stepThreeRequest: (phoneNumber, countryCode, fullName, mailAddress, password) => {
      const postData = {
        type: 'register',
        phone: phoneNumber,
        countryCode,
        name: fullName,
        mail: mailAddress,
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
