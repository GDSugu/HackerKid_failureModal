import { useEffect, useState } from 'react';
import post from '../../common/framework';
import API from '../../../../env';

const useProfileInfo = (action = 'getBasicInfo') => {
  const [profileInfo, setProfileInfo] = useState({
    status: null,
    name: null,
    profileImage: null,
    uniqueUrl: null,
    about: null,
    grade: null,
    school: null,
  });

  const result = {
    state: profileInfo,
    setState: setProfileInfo,
  };

  useEffect(() => {
    switch (action) {
      case 'getBasicInfo': {
        post({
          type: 'getBasicInfo',
          s3Prefix: API.S3PREFIX,
        }, 'profile/')
          .then((response) => {
            const parsedResponse = JSON.parse(response.data);
            if (parsedResponse.status === 'success') {
              const { userInfo } = parsedResponse;
              setProfileInfo(() => ({
                ...userInfo,
                status: 'success',
              }));
            } else {
              setProfileInfo((prevState) => ({
                ...prevState,
                status: 'error',
              }));
            }
          });
        break;
      }
      default: break;
    }
  }, []);
  return result;
};

export default null;

export { useProfileInfo };
