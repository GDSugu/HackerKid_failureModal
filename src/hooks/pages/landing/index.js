import API from '../../../../env';
import post from '../../common/framework';

const useLanding = () => {
  const storeData = ({
    name, phone, countryCode, email, url,
  }) => {
    const payload = {
      type: 'storeData',
      name,
      phone,
      countryCode,
      email,
      url,
      s3Prefix: API.S3PREFIX,
    };

    return post(payload, 'index/');
  };

  return {
    static: {
      storeData,
    },
  };
};

export default useLanding;
