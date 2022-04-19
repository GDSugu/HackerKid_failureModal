import { useState } from 'react';
import post from '../../common/framework';

const getDevice = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'web';
};

const useLoginMethod = () => {
  const [stateObj, setState] = useState({
    loginMethod: 'loginWithPhone',
    phoneNumber: '',
    email: '',
    password: '',
  });

  const loginWithPhone = (phone, countryCode, password, email = false) => {
    const useEmail = stateObj.loginMethod !== 'loginWithPhone';

    const device = getDevice();
    // const neoeyed = getneoEyed(phone);
    const result = post({
      type: 'usercheckPhone',
      phone,
      password,
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
