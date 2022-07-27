import { useEffect, useState } from 'react';
import post, { s3Upload } from '../../common/framework';
import API from '../../../../env';

const useProfileInfo = (action = 'getBasicInfo') => {
  const [profileInfo, setProfileInfo] = useState({
    status: true,
    name: false,
    profileImage: false,
    profileImageName: false,
    uniqueUrl: false,
    about: false,
    grade: false,
    school: false,
  });

  const saveProfile = () => {
    let result = false;
    try {
      const {
        name,
        about,
        grade,
        school,
        profileImage,
        profileImageName,
        uniqueUrl,
      } = profileInfo;
      const payload = {
        type: 'updateProfile',
        name,
        about,
        grade,
        school,
      };
      result = post(payload, 'profile/', false, false)
        .then((res) => {
          if (res === 'access_denied') {
            setProfileInfo((prevState) => ({
              ...prevState,
              status: 'access_denied',
            }));
          } else if (profileImage && typeof profileImage !== 'object') {
            setProfileInfo((prevState) => ({
              ...prevState,
              status: 'success',
            }));
          }
        })
        .then(() => {
          let signedReq = false;
          if (profileImage && typeof profileImage === 'object') {
            const signedRequestPayload = {
              type: 'profileSignedURL',
              fileName: profileImageName || `${uniqueUrl}_profile.png`,
              s3Prefix: API.S3PREFIX,
            };
            signedReq = post(signedRequestPayload, 'profile/', false, false);
          }
          return signedReq;
        })
        .then((signedResponse) => {
          const parsedResponse = JSON.parse(signedResponse);
          let uploadReq = false;
          if (parsedResponse.status === 'success') {
            uploadReq = s3Upload(profileImage, parsedResponse.signedURL, profileImage.type);
            setProfileInfo((prevState) => ({
              ...prevState,
              status: 'success',
            }));
          }
          return uploadReq;
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
    return result;
  };

  const result = {
    state: profileInfo,
    setState: setProfileInfo,
    saveProfile,
  };

  useEffect(() => {
    switch (action) {
      case 'getBasicInfo': {
        post({
          type: 'getBasicInfo',
          s3Prefix: API.S3PREFIX,
        }, 'profile/')
          .then((response) => {
            if (response === 'access_denied') {
              setProfileInfo((prevState) => ({
                status: 'access_denied',
                ...prevState,
                response,
              }));
            } else {
              const parsedResponse = JSON.parse(response);
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
                  response: parsedResponse,
                }));
              }
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
