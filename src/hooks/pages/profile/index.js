import { useContext, useEffect, useState } from 'react';
import post, { s3Upload, setSession } from '../../common/framework';
import API from '../../../../env';
import { AuthContext } from '../root';

const useProfileInfo = ({
  action = 'getBasicInfo', isPageMounted, uniqueurl,
}) => {
  const [profileInfo, setProfileInfo] = useState({
    status: true,
    name: '',
    profileImage: false,
    profileImageName: '',
    uniqueUrl: '',
    about: '',
    grade: '',
    school: '',
    parentEmail: '',
    parentPhone: '',
  });

  const authContext = useContext(AuthContext);

  const setState = (args) => {
    setProfileInfo((prevState) => ({
      ...prevState,
      ...args,
    }));
    authContext.setAuthState((prevState) => ({
      ...prevState,
      profileInfoHook: {
        ...profileInfo,
        ...args,
      },
    }));
  };

  const getProfileInfo = ({ cached = true }) => {
    if (cached && authContext.authState.profileInfoHook) {
      const { authState: { profileInfoHook } } = authContext;
      setProfileInfo({
        ...profileInfoHook,
        status: 'success',
      });
    } else {
      post({
        type: 'getBasicInfo',
        s3Prefix: API.S3PREFIX,
      }, 'profile/')
        .then((response) => {
          if (isPageMounted.current) {
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
                authContext.setAuthState((prevState) => ({
                  ...prevState,
                  profileInfoHook: {
                    ...userInfo,
                    status: 'success',
                  },
                }));
              } else {
                setProfileInfo((prevState) => ({
                  ...prevState,
                  status: 'error',
                  response: parsedResponse,
                }));
              }
            }
          }
        });
    }
  };

  const getProfileData = ({ cached = true }) => {
    let result = new Promise((res) => res());
    if (uniqueurl) {
      if (cached && authContext.authState.profileDataHook) {
        const { authState: { profileDataHook } } = authContext;
        setProfileInfo({
          ...profileDataHook,
        });
      } else {
        result = post({
          type: 'getProfileData',
          s3Prefix: API.S3PREFIX,
          uniqueUrl: uniqueurl,
        }, 'profile/')
          .then((response) => {
            if (isPageMounted.current) {
              if (response === 'access_denied') {
                setProfileInfo((prevState) => ({
                  status: 'access_denied',
                  ...prevState,
                  response,
                }));
              } else {
                const parsedResponse = JSON.parse(response);
                if (parsedResponse.status === 'success') {
                  setProfileInfo(parsedResponse);
                  authContext.setAuthState((prevState) => ({
                    ...prevState,
                    profileDataHook: {
                      parsedResponse,
                    },
                  }));
                } else {
                  setProfileInfo((prevState) => ({
                    ...prevState,
                    status: 'error',
                    response: parsedResponse,
                  }));
                }
              }
            }
          });
      }
    }
    return result;
  };

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
        parentEmail,
        parentPhone,
      } = profileInfo;
      const payload = {
        type: 'updateProfile',
        name: name && name.trim(),
        about: about && about.trim(),
        grade: grade && parseInt(grade, 10),
        school: school && school.trim(),
        parentEmail: parentEmail && parentEmail.trim(),
        parentPhone: parentPhone && parentPhone.toString().trim(),
      };
      result = post(payload, 'profile/', false, false)
        .then((res) => {
          if (isPageMounted.current) {
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
          }
        })
        .then(() => {
          let signedReq = false;
          if (isPageMounted.current) {
            if (profileImage && typeof profileImage === 'object') {
              const signedRequestPayload = {
                type: 'profileSignedURL',
                fileName: profileImageName || `${uniqueUrl}_profile.png`,
                s3Prefix: API.S3PREFIX,
              };
              signedReq = post(signedRequestPayload, 'profile/', false, false);
            }
          }
          return signedReq;
        })
        .then((signedResponse) => {
          let uploadReq = false;
          if (isPageMounted.current) {
            const parsedResponse = JSON.parse(signedResponse);
            if (parsedResponse.status === 'success') {
              uploadReq = s3Upload(profileImage, parsedResponse.signedURL, profileImage.type);
              setProfileInfo((prevState) => ({
                ...prevState,
                status: 'success',
              }));
              if (
                parsedResponse?.profileImage
                && parsedResponse?.profileImage !== ''
              ) {
                setSession('profileLink', parsedResponse.profileImage);
              }
            }
          }
          getProfileInfo({ cached: false });
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
    setState,
    saveProfile,
    getProfileData,
  };

  useEffect(() => {
    switch (action) {
      case 'getBasicInfo': {
        getProfileInfo({});
        break;
      }
      case 'getProfileData': {
        getProfileData({});
        break;
      }
      default: break;
    }
  }, []);
  return result;
};

export default null;

export { useProfileInfo };
