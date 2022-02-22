import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import { AppEventsLogger } from 'react-native-fbsdk';
import getPlatform from './utlis';
import API from '../../../env';

const mobAuthClear = () => {
  let result;
  try {
    result = AsyncStorage.clear();
  } catch (err) {
    console.error(err);
  }
  return result;
};

const mobGetSession = (key) => {
  let value = null;
  try {
    value = AsyncStorage.getItem(key);
  } catch (err) {
    console.error(err);
  }
  return value;
};

const mobClearSession = (key) => {
  let result;
  if (key) {
    try {
      result = AsyncStorage.removeItem(key);
    } catch (err) {
      console.error(err);
    }
  }
  return result;
};

const mobStoreSession = (key, value) => {
  let result;
  try {
    if (value) {
      result = AsyncStorage.setItem('key', JSON.stringify(value));
    }
  } catch (err) {
    console.error(err);
  }
  return result;
};

const webAuthClear = () => {
  localStorage.clear();
};

const webGetSession = (key) => localStorage.getItem(key);

const webClearSession = (key) => {
  if (key) {
    localStorage.removeItem(key);
  }
};

const webStoreSession = (key, value) => {
  if (value) {
    localStorage.setItem(key, value);
  }
};

const s3Upload = (blob, signedURL, contentType = 'image/png', processData = false) => axios({
  url: signedURL,
  data: blob,
  contentType,
  type: 'PUT',
  processData,
});

const setSession = (key, value) => {
  const platform = getPlatform();
  if (platform === 'web') {
    return webStoreSession(key, value);
  }
  return mobStoreSession(key, value);
};

const getSession = (key) => {
  const platform = getPlatform();
  if (platform === 'web') {
    return webGetSession(key);
  }
  return mobGetSession(key);
};

const clearSession = (key) => {
  const platform = getPlatform();
  if (platform === 'web') {
    return webClearSession(key);
  }
  return mobClearSession(key);
};

const authClear = () => {
  const platform = getPlatform();
  if (platform === 'web') {
    return webAuthClear();
  }
  return mobAuthClear();
};

const setUserSession = ({
  auth,
  name,
  rank,
  pointsEarned,
  profileImg,
  profileLink,
}) => {
  const authtokenPromise = setSession('authtoken', auth);
  const namePromise = setSession('name', name);
  const rankPromise = setSession('rank', rank);
  const pointsEarnedPromise = setSession('pointsEarned', pointsEarned);
  let profileImgPromise;
  let profileLinkPromise;
  if (profileImg !== undefined || profileImg !== false || profileImg !== 'false' || profileImg !== '') {
    profileImgPromise = setSession('profileimg', profileImg);
  } else {
    profileImgPromise = setSession('profileimg', 'default');
  }
  if (profileLink) {
    profileLinkPromise = setSession('profileLink', profileLink);
  }
  return Promise.all([
    authtokenPromise,
    namePromise,
    rankPromise,
    pointsEarnedPromise,
    profileImgPromise,
    profileLinkPromise,
  ]);
};

const post = (postData, apiPath, validateResponse = true) => getSession('authtoken')
  .then((authToken) => {
    const jsonData = postData;
    jsonData.authToken = authToken;
    const jsonString = JSON.stringify(jsonData);
    return axios({
      method: 'post',
      url: `${API}${apiPath}`,
      timeout: 60000,
      data: {
        myData: jsonString,
      },
    });
  })
  .then((response) => {
    if (validateResponse) {
      // check for access denied. for now returning response
      if (response === 'access_denied') {
        authClear();
      }
    }
    return response;
  });

const loginCheck = () => (resolve) => getSession('authtoken')
  .then((authToken) => {
    if (authToken === null || authToken === undefined || authToken === '') {
      resolve(false);
    }
    return post({ type: 'checkSession' }, 'login/', true, false);
  })
  .then((response) => {
    if (response === 'access_denied') {
      resolve(false);
    }
    return response;
  });

const logout = () => post({ type: 'logout' }, 'login/')
  .then((response) => {
    const data = JSON.parse(response);
    if (data.status === 'success') {
      authClear();
    }
  });

const updatePoints = (addedPoints) => {
  let availablePoints = getSession('pointsEarned');
  availablePoints = availablePoints ? Number(availablePoints) : 0;
  const safeAddedPoints = Number(addedPoints);
  const updatedPoints = availablePoints + safeAddedPoints;
  setSession('pointsEarned', updatedPoints);
  // nav update
};

export default post;

export {
  clearSession,
  loginCheck,
  logout,
  setUserSession,
  s3Upload,
  updatePoints,
};
