import { useState } from 'react';
import post from '../../../web/javascripts/common/framework';

const useRegisterFormStep = (initialStep) => useState(initialStep);
const useRegisterFormSavedFields = (fn) => useState(fn);
const useOtpTimerId = (initialValue) => useState(initialValue);
const useRegisterFormRequests = () => {
  const stepOneRequest = (phoneNumber, countryCode) => {
    const postData = {
      type: 'send-otp',
      phone: phoneNumber,
      countryCode,
    };

    return post(postData, 'register/');
  };

  const stepTwoRequest = (phoneNumber, countryCode, enteredOtp) => {
    const postData = {
      type: 'verify-otp',
      phone: phoneNumber,
      countryCode,
      otp: enteredOtp,
    };

    return post(postData, 'register/');
  };

  const stepThreeRequest = (phoneNumber, countryCode, fullName, mailAddress, password) => {
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
  };

  return {
    stepOneRequest,
    stepTwoRequest,
    stepThreeRequest,
  };
};

export {
  useRegisterFormStep, useRegisterFormSavedFields, useOtpTimerId, useRegisterFormRequests,
};
