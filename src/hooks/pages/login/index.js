import { useState } from 'react';
import post from '../../common/framework';
import getPlatform from '../../common/utlis';

const useLoginMethod = () => {
  const [stateObj, setState] = useState({
    loginMethod: 'loginWithPhone',
    phoneNumber: '',
    email: '',
    password: '',
  });

  const loginWithPhone = (countryCode) => {
    const useEmail = stateObj.loginMethod === 'loginWithEmail';
    const email = (stateObj.loginMethod === 'loginWithEmail') ? stateObj.email : false;

    const device = getPlatform();
    // const neoeyed = getneoEyed(phone);
    const result = post({
      type: 'usercheckPhone',
      phone: stateObj.phoneNumber,
      password: stateObj.password,
      device,
      countryCode,
      email,
      useEmail,
    }, 'login/');

    return result;
  };

  return {
    stateObj,
    setState,
    loginWithPhone,
  };
};

export default useLoginMethod;
