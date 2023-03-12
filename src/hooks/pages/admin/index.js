import 'react';
import post from '../../common/framework';

const useAdmin = () => {
  const getUserRole = () => {
    const payload = {
      type: 'getUserRole',
    };

    return post(payload, 'login/');
  };

  const activateUser = ({ countryCode, phone, paymentId }) => {
    const payload = {
      type: 'activateSubscription',
      countryCode,
      phone,
      paymentId,
    };

    return post(payload, 'admin/');
  };

  return {
    static: {
      activateUser,
      getUserRole,
    },
  };
};

export default null;

export {
  useAdmin,
};
