import { useContext, useState } from 'react';
import post, { setUserSession } from '../../common/framework';
import { AuthContext } from '../root';

const useRegister = () => {
  const authContext = useContext(AuthContext);
  const [stateObj, setStateObj] = useState({
    formStep: 1,
    otpTimerId: null,
    phoneNumber: '',
    email: '',
    fullName: '',
    parentName: '',
    enteredOtpArr: [],
    password: '',
    retypedPassword: '',
  });

  const createAccountRequest = (token, recaptchaVersion) => {
    const postData = {
      type: 'register',
      phone: stateObj.phoneNumber,
      countryCode: stateObj.countryCode,
      name: stateObj.fullName,
      mail: stateObj.email,
      password: stateObj.password,
      token,
      recaptchaVersion: Number.toString(recaptchaVersion),
    };

    return post(postData, 'register/').then((response) => {
      const data = JSON.parse(response);
      if (data.status === 'success') {
        setUserSession(data.session).then(() => {
          authContext.setAuthState({
            isLoggedIn: true,
            sessionData: data,
          });
        });
      }
      return response;
    });
  };

  return {
    stateObj,
    setStateObj,
    createAccountRequest,
  };
};

export default useRegister;
