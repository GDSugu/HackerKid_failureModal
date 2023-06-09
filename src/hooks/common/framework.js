import AsyncStorage from '@react-native-async-storage/async-storage';
import getPlatform from './utlis';
import ENV from '../../../env';

let { API } = ENV;

if (getPlatform() === 'web') {
  API = process.env.API;
}

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
  let result = null;
  try {
    result = AsyncStorage.getItem(key);
  } catch (err) {
    console.error(err);
  }
  return result;
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
      result = AsyncStorage.setItem(key, (typeof value !== 'string') ? JSON.stringify(value) : value);
    }
  } catch (err) {
    console.error(err);
  }
  return result;
};

const webAuthClear = () => {
  window.localStorage.clear();
};

const webGetSession = (key) => new Promise((resolve) => resolve(window.localStorage.getItem(key)));

const webClearSession = (key) => {
  if (key) {
    window.localStorage.removeItem(key);
  }
};

const webStoreSession = (key, value) => {
  let result;
  if (value) {
    result = new Promise((resolve, reject) => {
      try {
        window.localStorage.setItem(key, value);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }
  return result;
};

const s3Upload = (blob, signedURL, contentType = 'image/png', processData = false) => fetch(signedURL, {
  body: blob,
  contentType,
  method: 'PUT',
  processData,
});

const setSession = (key, value) => {
  const platform = getPlatform();
  if (platform === 'web') {
    return webStoreSession(key, value);
  }
  return mobStoreSession(key, value);
};

const getSession = async (key) => {
  const platform = getPlatform();
  if (platform === 'web') {
    return webGetSession(key);
  }
  return mobGetSession(key);
};

const clearSession = async (key) => {
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
  unique_url: uniqueUrl,
}) => {
  const authtokenPromise = setSession('authtoken', auth);
  const namePromise = setSession('name', name);
  const rankPromise = setSession('rank', rank);
  const pointsEarnedPromise = setSession('pointsEarned', pointsEarned);
  const uniqueURLPromise = setSession('unique_url', uniqueUrl);
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
    uniqueURLPromise,
  ]);
};

const post = (postData, apiPath, validateResponse = true) => getSession('authtoken')
  .then((authToken) => {
    const jsonData = postData;
    jsonData.authtoken = authToken || null;
    const jsonString = JSON.stringify(jsonData);
    const payload = new FormData();
    payload.append('myData', jsonString);
    const url = `${API}${apiPath}`;
    const headers = {};
    if (getPlatform() === 'app') {
      headers['Content-Type'] = 'multipart/form-data';
    }
    return fetch(url, {
      method: 'post',
      headers,
      body: payload,
    });
  })
  .then((resp) => resp.text())
  .then(async (response) => {
    if (validateResponse) {
      if (response === 'access_denied') {
        await authClear();
      }
    }
    return response;
  });

const loginCheck = () => new Promise((resolve) => getSession('authtoken')
  .then((authToken) => {
    if (authToken === null || authToken === undefined || authToken === '') {
      resolve(false);
    }
    resolve(post({ type: 'checkSession' }, 'login/', true, false));
  })
  .then((response) => {
    if (response === 'access_denied') {
      resolve(false);
    }
    return response;
  }));

const logout = () => post({ type: 'logout' }, 'login/')
  .then((response) => {
    let result = false;
    if (response === 'access_denied') {
      authClear();
      result = true;
    } else {
      const data = JSON.parse(response);
      if (data.status === 'success') {
        authClear();
        result = true;
      }
    }
    return result;
  });

const updatePoints = (addedPoints) => {
  let availablePoints = getSession('pointsEarned');
  availablePoints = availablePoints ? Number(availablePoints) : 0;
  const safeAddedPoints = Number(addedPoints);
  const updatedPoints = availablePoints + safeAddedPoints;
  setSession('pointsEarned', updatedPoints);
  // nav update
};

const validateField = (type, value, lengthRangeObj = false, skipValueCheck = false) => {
  try {
    if (lengthRangeObj) {
      const { min, max } = lengthRangeObj;

      let minLengthSatisfied;
      let maxLengthSatisfied;

      if (min) {
        minLengthSatisfied = value.length >= min;

        if (!minLengthSatisfied) {
          throw new Error(`Enter a value that must be a minimum length of ${min}`);
        }
      }

      if (max) {
        maxLengthSatisfied = value.length <= max;

        if (!maxLengthSatisfied) {
          throw new Error(`Enter a value that must be a maximum length of ${max}`);
        }
      }
    }

    const regPattern = {
      word: /\w/,
      digit: /\d/,
      email: /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i,
      name: /^[a-zA-Z ]*$/,
      // regex for passwords containing letters(upperCase or lowerCase)
      // with digits OR special characters(excluding regex special characters like ^&* ()`),
      // given the password minimum length of 4
      password: /^(?=[^a-zA-Z\n]*[a-zA-Z])(?=[^\d\n!@#$]*[\d!@#$])[\w!@#$]{4,}$/,
      tel: /[0-9 -()+]{8}$/,
      url: /^[A-Z0-9._%+-]*$/,
      rollnum: /([\w\d]{3,})/,
      college_name: /\w/,
      company_name: /\w/,
      school_name: /\w/,
      question: /\w/,
      select: /\w/,
      file: /\w/,
    };

    let status;

    if (skipValueCheck) {
      status = true;
    } else {
      const passed = regPattern[type].test(value);

      if (!passed) {
        throw new Error();
      }
      status = regPattern[type].test(value);
    }

    return {
      status,
      value,
    };
  } catch (e) {
    const errorObj = {
      status: false,
      value,
    };

    if (e.message) {
      errorObj.message = e.message;
    }
    return errorObj;
  }
};

const mergeRecursive = (obj1, obj2) => {
  const source1 = JSON.parse(JSON.stringify(obj1));
  const source2 = JSON.parse(JSON.stringify(obj2));
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const key in source2) {
    try {
      // Property in destination object set; update its value.
      if (source2[key].constructor === Object) {
        source1[key] = mergeRecursive(source1[key], source2[key]);
      } else {
        source1[key] = source2[key];
      }
    } catch (e) {
      // Property in destination object not set; create it and set its value.
      source1[key] = source2[key];
    }
  }
  return source1;
};

export default post;

export {
  clearSession,
  getSession,
  loginCheck,
  logout,
  setSession,
  setUserSession,
  s3Upload,
  updatePoints,
  validateField,
  mergeRecursive,
};
