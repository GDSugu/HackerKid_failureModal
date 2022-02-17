import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import getPlatform from './utlis';
import API from '../../../env';

const authClearWeb = () => {
  localStorage.clear();
};

const authClearMob = () => {
  let result;
  try {
    result = AsyncStorage.clear();
  } catch (err) {
    console.error(err);
  }
  return result;
};

const debounce = (() => {
  if (getPlatform() === 'web') {
    let timer = 0;
    return (callback, ms) => {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  }
  return false;
})();

const getQueryString = (query) => {
  if (getPlatform() === 'web') {
    const search = new URLSearchParams(document.location.search.substring(1));
    return search.get(query);
  }
  return false;
};

const getWebSession = (key) => localStorage.getItem(key);

const getMobSession = (key) => {
  let value = null;
  try {
    value = AsyncStorage.getItem(key);
  } catch (err) {
    console.error(err);
  }
  return value;
};

const clearWebSession = (key) => {
  if (key) {
    localStorage.removeItem(key);
  }
};

const clearMobSession = (key) => {
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

const navigateWeb = (path, replace) => {
  const navigate = useNavigate();
  navigate(path, { replace });
};

const navigateMob = (path, navigator) => {
  if (!navigator || !navigator.navigate) {
    throw new Error('Invalid navigator');
  } else {
    navigator.navigate(path);
  }
};

const pathNavigator = ({ path, navigator, replace = false }) => {
  const platform = getPlatform();
  if (platform === 'web') {
    navigateWeb(path, replace);
  } else {
    navigateMob(path, navigator);
  }
};

const popover = (selector, options, showIn = 0, hideIn = 2000) => {
  if (getPlatform() === 'web') {
    try {
      setTimeout(() => {
        selector.popover(options);
        selector.popover('show');
        setTimeout(() => {
          selector.popover('hide');
          selector.popover('dispose'); // support for dynamic content
        }, hideIn);
      }, showIn);
    } catch (error) {
      console.error(error);
    }
  }
};

const showSnow = () => {
  if (getPlatform() === 'web') {
    import('magic-snowflakes')
      .then((response) => {
        response.default({
          count: 25,
        });
      })
      .catch(console.error);
  }
};

const storeWebSession = (key, value) => {
  if (value) {
    localStorage.setItem(key, value);
  }
};

const storeMobSession = (key, value) => {
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

const s3Upload = (blob, signedURL, contentType = 'image/png', processData = false) => axios({
  url: signedURL,
  data: blob,
  contentType,
  type: 'PUT',
  processData,
});

const validate = (id, type, required = 1, warnId = false, warnMsg = false) => {
  if (getPlatform() === 'web') {
    const inputField = $(id);
    let data = inputField.val();
    data = data.trim();
    if (type === 'email') {
      data = data.toLowerCase();
    }

    const regPattern = {
      email: /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i,
      name: /^[a-zA-Z ]*$/,
      password: /[\w\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))/,
      mobile: /[0-9 -()+]{8}$/,
      url: /^[A-Z0-9._%+-]*$/,
      rollnum: /([\w\d]{3,})/,
      college_name: /\w/,
      company_name: /\w/,
      school_name: /\w/,
      question: /\w/,
      select: /\w/,
      file: /\w/,
    };

    const typeName = {
      email: 'E-mail',
      name: 'Name',
      password: 'Password',
      mobile: 'Mobile No.',
      url: 'Link',
      rollnum: 'Roll Number / Register Number',
      college_name: 'College Name',
      company_name: 'Company Name',
      school_name: 'School Name',
      question: 'Question',
      select: 'This field',
      file: 'This field',
    };

    if (type === 'password') {
      if (data.length < 4) {
        inputField.addClass('is-invalid');
        return false;
      }
    }

    if (!required && !data) {
      return true;
    } // if field is not required and data is not given

    if (data === '') {
      inputField.addClass('is-invalid');
      inputField.attr('placeholder', `${typeName[type]} is required`);
      return false;
    } if (!regPattern[type].test(data)) {
      inputField.addClass('is-invalid');
      if (warnId && warnMsg) {
        $(warnId).html(warnMsg);
      }
      return false;
    }

    inputField.removeClass('is-invalid');
    inputField.removeClass('is-valid');
    if (warnId) {
      $(warnId).html('');
    }
    return data;
  }
  return false;
};

const authorize = {};

authorize.setSession = (key, value) => {
  const platform = getPlatform();
  if (platform === 'web') {
    return storeWebSession(key, value);
  }
  return storeMobSession(key, value);
};

authorize.getSession = (key) => {
  const platform = getPlatform();
  if (platform === 'web') {
    return getWebSession(key);
  }
  return getMobSession(key);
};

authorize.clearSession = (key) => {
  const platform = getPlatform();
  if (platform === 'web') {
    return clearWebSession(key);
  }
  return clearMobSession(key);
};

authorize.auth_clear = () => {
  const platform = getPlatform();
  if (platform === 'web') {
    return authClearWeb();
  }
  return authClearMob();
};

authorize.setUserSession = ({
  auth,
  name,
  rank,
  pointsEarned,
  profileImg,
  profileLink,
}) => {
  const authtokenPromise = authorize.setSession('authtoken', auth);
  const namePromise = authorize.setSession('name', name);
  const rankPromise = authorize.setSession('rank', rank);
  const pointsEarnedPromise = authorize.setSession('pointsEarned', pointsEarned);
  let profileImgPromise;
  let profileLinkPromise;
  if (profileImg !== undefined || profileImg !== false || profileImg !== 'false' || profileImg !== '') {
    profileImgPromise = authorize.setSession('profileimg', profileImg);
  } else {
    profileImgPromise = authorize.setSession('profileimg', 'default');
  }
  if (profileLink) {
    profileLinkPromise = authorize.setSession('profileLink', profileLink);
  }
  Promise.all([
    authtokenPromise,
    namePromise,
    rankPromise,
    pointsEarnedPromise,
    profileImgPromise,
    profileLinkPromise,
  ])
    .then(() => {
      pathNavigator({ path: 'dashboard', replace: true });
    })
    .catch(console.error);
};

const post = (postData, apiPath, validateResponse = true, handleLoading = true) => {
  authorize.getSession('authtoken')
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
          authorize.auth_clear();
        }
      }
      return response;
    });
};

authorize.loginCheck = () => new Promise((resolve, reject) => {
  authorize.getSession('authtoken')
    .then((authToken) => {
      if (authToken === null || authToken === undefined || authToken === '') {
        resolve(false);
        pathNavigator({ path: 'login', replace: true });
      }
      return post({ type: 'checkSession' }, 'login/', true, false);
    })
    .then((response) => {
      if (response === 'access_denied') {
        resolve(false);
      } else {
        resolve(true);
      }
    })
    .catch((error) => {
      reject(error);
    });
});

authorize.logout = () => {
  post({ type: 'logout' }, 'login/')
    .then((response) => {
      const data = JSON.parse(response);
      if (data.status === 'success') {
        authorize.auth_clear();
        pathNavigator('index.html');
      }
    })
    .catch((error) => {
      const errData = JSON.parse(error);
      console.log(errData);
    });
};

const updatePoints = (addedPoints) => {
  let availablePoints = authorize.getSession('pointsEarned');
  availablePoints = availablePoints ? Number(availablePoints) : 0;
  const safeAddedPoints = Number(addedPoints);
  const updatedPoints = availablePoints + safeAddedPoints;
  authorize.setSession('pointsEarned', updatedPoints);
  // nav update
};

const attachLogoutHandler = () => {
  if (getPlatform() === 'web') {
    $(document).on('click', '#logout, .logout-class', () => {
      authorize.logout();
      return false;
    });
  }
};

export default post;

export {
  attachLogoutHandler,
  authorize,
  debounce,
  getQueryString,
  pathNavigator,
  popover,
  showSnow,
  s3Upload,
  updatePoints,
  validate,
};
