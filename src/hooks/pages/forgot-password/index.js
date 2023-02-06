import { useState } from 'react';
import post from '../../common/framework';

const useForgotPassword = () => {
  const [stateObj, setStateObj] = useState({
    phoneNumber: '',
    password: '',
    retypedPassword: '',
    formStep: 1,
  });

  const changePasswordRequest = (token, recaptchaVersion) => {
    const postData = {
      type: 'changePassword',
      phone: stateObj.phoneNumber,
      countryCode: stateObj.countryCode,
      password: stateObj.password,
      token,
      recaptchaVersion,
    };

    return post(postData, 'register/');
  };

  return {
    stateObj,
    setStateObj,
    changePasswordRequest,
  };
};

export default useForgotPassword;
