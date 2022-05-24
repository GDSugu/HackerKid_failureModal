import { useState } from 'react';
import post from '../../common/framework';

const useRegister = () => {
  const [stateObj, setStateObj] = useState({
    formStep: 1,
    otpTimerId: null,
    phoneNumber: '',
    email: '',
    fullName: '',
    parentName: '',
    enteredOtpArr: [],
    password: '',
  });

  const createAccountRequest = () => {
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
  };

  return {
    stateObj,
    setStateObj,
    createAccountRequest,
  };
};

export default useRegister;
