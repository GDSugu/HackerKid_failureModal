import React, { useState } from 'react';
import post, { logout, setUserSession } from '../../common/framework';
import getPlatform from '../../common/utlis';
import { AuthContext, SubscriptionContext } from '../root';
import API from '../../../../env';

const useLoginMethod = () => {
  const [stateObj, setState] = useState({
    loginMethod: 'loginWithPhone',
    phoneNumber: '',
    email: '',
    password: '',
  });

  const authContext = React.useContext(AuthContext);

  const loginWithPhone = (countryCode) => {
    const useEmail = stateObj.loginMethod === 'loginWithEmail';
    const email = (stateObj.loginMethod === 'loginWithEmail') ? stateObj.email : false;

    const device = getPlatform();
    // const neoeyed = getneoEyed(phone);

    // const result = post({
    //   type: 'usercheckPhone',
    //   phone: stateObj.phoneNumber,
    //   password: stateObj.password,
    //   device,
    //   countryCode,
    //   email,
    //   useEmail,
    // }, 'login/');

    // return result;
    return post({
      type: 'usercheckPhone',
      phone: stateObj.phoneNumber,
      password: stateObj.password,
      device,
      countryCode,
      email,
      useEmail,
      s3Prefix: API.S3PREFIX,
    }, 'login/')
      .then((response) => {
        const data = JSON.parse(response);
        if (data.status === 'success') {
          setUserSession(data).then(() => {
            authContext.setAuthState((prevState) => ({
              ...prevState,
              isLoggedIn: true,
              sessionData: data,
            }));
          });
        }
        return response;
      });
  };

  return {
    stateObj,
    setState,
    loginWithPhone,
  };
};

const useLogout = () => {
  const authContext = React.useContext(AuthContext);
  const subscriptionContext = React.useContext(SubscriptionContext);

  const logoutHandler = () => {
    logout()
      .then((res) => {
        if (res) {
          const device = getPlatform();
          if (device === 'app') {
            authContext.clearAuthState();
            subscriptionContext.clearSubscriptionData();
          }
        }
      });
  };

  return {
    logout: logoutHandler,
  };
};

export default useLoginMethod;

export {
  useLogout,
};
