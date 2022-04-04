import { useState } from 'react';
import post from '../../../web/javascripts/common/framework';

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
  const [loginMethod, setLoginMethod] = useState('loginWithPhone');

  const loginWithPhone = (phone, countryCode, password, email = false) => {
    const useEmail = loginMethod !== 'loginWithPhone';

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
    }, 'login/')
      .then((response) => response)
      .catch((error) => {
        const errData = JSON.parse(error);
        console.log(errData);
      });

    return result;
  };

  return {
    loginMethod,
    setLoginMethod,
    loginWithPhone,
  };
};

export {
  useLoginMethod,
};
