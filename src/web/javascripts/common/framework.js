import $ from 'jquery';
import TimeMe from 'timeme.js';
import { useEffect } from 'react';
import postTimeTrack from '../../../hooks/pages/timeTrack';
import { validateField } from '../../../hooks/common/framework';
// import navbar from './navbar';

const { API } = process.env;

const authorize = {};

const isFeatureEnabled = (features, feature, subFeature) => {
  const planFeatures = features && features.planFeatures;
  if (features && planFeatures && planFeatures.length > 0) {
    const featureObj = planFeatures.find((f) => f.name === feature);
    const obj = {};
    if (featureObj) {
      obj[feature] = {
        enabled: featureObj.enabled,
        isPartial: featureObj.isPartial,
      };
      if (featureObj.isPartial && subFeature) {
        if (subFeature === 'languages') {
          obj[feature][subFeature] = featureObj.allowed;
          return obj[feature];
        }
        const subFeatureObj = featureObj.allowed.find((f) => f.category === subFeature);
        if (subFeatureObj) {
          obj[feature][subFeature] = subFeatureObj.limit;
        }
      }
      return obj[feature];
    }
    return false;
  }
  return false;
};

const secondsToMins = (s) => {
  let seconds = parseInt(s, 10);
  let minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  seconds %= 60;
  minutes %= 60;
  if (hours > 0) {
    return `${hours} Hour${hours > 1 ? 's' : ''} ${minutes} Mins`;
  }
  if (hours === 0 && minutes > 0) {
    return `${minutes} Minute${minutes > 1 ? 's' : ''}`;
  }
  if (minutes === 0 && seconds > 0) {
    return `${seconds} Seconds`;
  }
  return '0 Seconds';
};

const timeTrack = (pageName) => {
  const timeData = authorize.getSession('timeTracked');
  if (timeData) {
    const { page, timeSpent } = timeData;

    postTimeTrack({
      page,
      timeSpent,
      platform: 'web',
    });
    authorize.clearSession('timeTracked');
  }

  return useEffect(() => {
    TimeMe.setCurrentPageName(pageName);
    TimeMe.startTimer(pageName, 0);
    window.addEventListener('beforeunload', () => {
      authorize.setSession('timeTracked', JSON.stringify({
        page: pageName,
        timeSpent: TimeMe.getTimeOnPageInSeconds(pageName),
      }));
    }, true);
    return () => {
      if (TimeMe.getTimeOnPageInSeconds(pageName) > 1) {
        postTimeTrack({
          page: pageName,
          timeSpent: TimeMe.getTimeOnPageInSeconds(pageName),
          platform: 'web',
        });
      }
      TimeMe.stopTimer(pageName);
      TimeMe.resetRecordedPageTime(pageName);
    };
  });
};

const pageInit = (className, title = null) => {
  if (className) {
    $('body')
      .removeClass()
      .addClass(className);
  }
  document.title = `HackerKID${title ? ` | ${title}` : ''}`;
};

const pathNavigator = (path) => {
  console.log('pathNavigator login', path);
  const { origin } = window.location;
  if (!window.location.href.includes(path)) {
    window.location.href = `${origin}/${path}`;
  }
};

authorize.setSession = (key, value) => {
  if (value) {
    localStorage.setItem(key, value);
  }
};

authorize.getSession = (key) => localStorage.getItem(key);

authorize.clearSession = (key) => {
  localStorage.removeItem(key);
};

authorize.auth_clear = () => {
  localStorage.clear();
};

authorize.setUserSession = (user) => {
  authorize.setSession('authtoken', user.auth);
  authorize.setSession('name', user.name);
  authorize.setSession('rank', user.rank);
  authorize.setSession('pointsEarned', user.pointsEarned);
  if (user.profileImg !== undefined || user.profileImg !== false || user.profileImg !== 'false' || user.profileImg !== '') {
    authorize.setSession('profileimg', user.profileImg);
  } else {
    authorize.setSession('profileimg', 'default');
  }
  if (user.profileLink) {
    authorize.setSession('profileLink', user.profileLink);
  }
  pathNavigator('dashboard');
};

const post = (postData, apiPath, validateResponse = true, handleLoading = true) => {
  const authToken = localStorage.getItem('authtoken');
  let jsonData = postData;
  jsonData.authtoken = authToken;
  jsonData = JSON.stringify(jsonData);
  if (handleLoading) {
    $('#loader').show();
  }
  return $.ajax({
    type: 'POST',
    data: {
      myData: jsonData,
    },
    timeout: 60000,
    url: API + apiPath,
  }).then((response) => {
    if (handleLoading) {
      $('#loader').hide();
    }
    if (validateResponse) {
      // check for access denied. for now returning response
      if (response === 'access_denied') {
        authorize.auth_clear();
        authorize.loginCheck();
      }
      // dont return this
      return response;
    }
    return response;
  });
};

authorize.loginCheck = () => new Promise((resolve, reject) => {
  const authToken = authorize.getSession('authtoken');
  if (authToken === '' || authToken === null) {
    // navbar.addSignInButton();
    resolve(false);
  } else {
    post({ type: 'checkSession' }, 'login/', true, false).then((response) => {
      if (response === 'access_denied') {
        resolve(false);
      } else {
        $('.username').text(authorize.getSession('name'));
        // navbar.addDropdown();
        resolve(true);
      }
    }).catch((error) => {
      reject(error);
    });
  }
});

// const addSignInButton = () => {
//   $('.nav-trail').html('<div><a href="/login.html" class="btn btn-primary">Sign in</a></div>');
// };
const storeNavigationUrl = () => {
  const { pathname } = window.location;
  const authPages = [
    'login',
    'register',
    'forgot-password',
    'pricing-plans',
  ];
  const pages = pathname.split('/').filter((el) => el.trim() !== '');
  if (pages.length > 0) {
    const page = pages[0];
    if (!authPages.includes(page)) {
      window.sessionStorage.setItem('navigateTo', window.location.href);
    }
  }
};

const loginCheck = () => new Promise((resolve, reject) => {
  const authToken = authorize.getSession('authtoken');
  if (authToken === '' || authToken === null) {
    // addSignInButton();
    resolve(false);
    storeNavigationUrl();
    console.log('login check navigate');
    pathNavigator('login');
    console.log('path navigated');
  } else {
    post({ type: 'checkSession' }, 'login/', true, false).then((response) => {
      if (!response || response === 'access_denied') {
        storeNavigationUrl();
        pathNavigator('login');
        resolve(false);
      } else {
        $('.username').text(authorize.getSession('name'));
        // navbar.addDropdown();
        resolve(true);
      }
    }).catch((error) => {
      reject(error);
    });
  }
});

const s3Upload = (blob, signedURL, contentType = 'image/png', processData = false) => $.ajax({
  url: signedURL,
  data: blob,
  contentType,
  type: 'PUT',
  processData,
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

/*
params - {
  event_category: <value>,
  event_label: <value>
}
*/
const addEvent = (action, params = {}) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      gtag('event', action, params);
    }
  } catch (error) {
    console.log(error);
  }
};

// from guvi steroid
const validate = (id, type, required = 1, warnId = false, warnMsg = false,
  skipValueCheck = false) => {
  const inputField = $(id);
  let data = inputField.val();
  data = $.trim(data);
  if (type === 'email') {
    data = data.toLowerCase();
  }

  if (data === '' && !required) return true;

  const validationResponse = validateField(type, data, null, skipValueCheck);

  const currentTypeName = inputField.attr('data-typename') ? inputField.attr('data-typename') : inputField.attr('name');
  if (data === '' && required) {
    inputField.addClass('is-invalid');
    if (!inputField.attr('data-original-placeholder')) {
      inputField.attr('data-original-placeholder', inputField.attr('placeholder'));
    }
    inputField.attr('placeholder', `${currentTypeName} is required`);
    $(warnId).hide();
    return false;
  } if (!skipValueCheck && !validationResponse.status) {
    inputField.addClass('is-invalid');
    if (warnId && warnMsg) {
      $(warnId).html(warnMsg).show();
    } else if (warnId && !warnMsg) {
      const errorMessageToShow = (validationResponse.message) ? validationResponse.message : `Enter a valid ${currentTypeName}`;
      $(warnId).html(errorMessageToShow).show();
    }
    return false;
  }
  inputField.removeClass('is-invalid');
  inputField.removeClass('is-valid');
  if (warnId) {
    $(warnId).html('');
  }
  return data;
};

const loadScriptByURL = (id, url, async = false, defer = false, onload = false) => {
  const isScriptExist = document.getElementById(id);

  if (!isScriptExist) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.id = id;
    script.async = async;
    script.defer = defer;
    script.onload = () => {
      if (onload) onload();
    };
    document.body.appendChild(script);
  }

  if (isScriptExist && onload) onload();
};

const getQueryString = (query) => {
  const search = new URLSearchParams(document.location.search.substring(1));
  return search.get(query);
};

const popover = (selector, options, showIn = 0, hideIn = 2000) => {
  try {
    setTimeout(() => {
      $(selector).popover(options);
      $(selector).popover('show');
      setTimeout(() => {
        $(selector).popover('hide');
        $(selector).popover('dispose'); // support for dynamic content
      }, hideIn);
    }, showIn);
  } catch (error) {
    // console.log(error);
  }
};

const showSnow = () => {
  try {
    import('magic-snowflakes').then((response) => {
      // Snowflakes();
      response.default({
        count: 25,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const getShareFooter = (shareLink) => `
  <h5 class="footer-title">Share in</h5>
  <div class="d-flex flex-wrap mb-0">
    <a href="https://www.facebook.com/sharer/sharer.php?u=${shareLink}" class="fa-stack" target="_blank">
      <i class="fas fa-square fa-stack-2x facebook-color"></i>
      <i class="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
    </a>
    <a href="https://twitter.com/share?url=${shareLink}" class="fa-stack" target="_blank">
      <i class="fas fa-square fa-stack-2x text-primary"></i>
      <i class="fab fa-twitter fa-stack-1x fa-inverse"></i>
    </a>
    <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(shareLink)}" class="fa-stack" target="_blank">
      <i class="fas fa-square fa-stack-2x whatsapp-color"></i>
      <i class="fab fa-whatsapp fa-stack-1x fa-inverse"></i>
    </a>
    <a href="https://t.me/share/url?url=${encodeURIComponent(shareLink)}" class="fa-stack" target="_blank">
      <i class="fas fa-square fa-stack-2x telegram-color"></i>
      <i class="fab fa-telegram-plane fa-stack-1x fa-inverse"></i>
    </a>
  </div>
  <div class="d-flex linkShareContainer py-3">
    <input type="text" class="link-share form-control" value="${shareLink}" readonly>
    <a href="#" class="input-group-append px-2" id="linkCopy">
      <i class="far fa-copy icon-size-regular align-self-center"></i>
    </a>
  </div>
`;

const attachLogoutHandler = () => {
  $(document).on('click', '#logout, .logout-class', () => {
    authorize.logout();
    return false;
  });
};

const addActiveRoute = (selector) => {
  $(selector).addClass('active');
};

const updatePoints = (addedPoints) => {
  let availablePoints = localStorage.getItem('pointsEarned');
  availablePoints = availablePoints ? Number(availablePoints) : 0;
  const safeAddedPoints = Number(addedPoints);
  const updatedPoints = availablePoints + safeAddedPoints;
  localStorage.setItem('pointsEarned', updatedPoints);

  // nav update
  $('.points-wrap span').html(updatedPoints);
};

const debounce = (() => {
  let timer = 0;
  return (callback, ms) => {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

const getShareMarkup = (shareLink, withLink) => `
<div class="d-flex flex-wrap">
  <div class="d-flex flex-column align-items-center m-2">
    <a href="https://www.facebook.com/sharer/sharer.php?u=${shareLink}" class="fa-stack" target="_blank">
      <i class="fas fa-square fa-stack-2x facebook-color"></i>
      <i class="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
    </a>
    <p>Facebook</p>
  </div>
  <div class="d-flex flex-column align-items-center m-2">
    <a href="https://twitter.com/share?url=${shareLink}" class="fa-stack" target="_blank">
      <i class="fas fa-square fa-stack-2x twitter-color"></i>
      <i class="fab fa-twitter fa-stack-1x fa-inverse"></i>
    </a>
    <p>Twitter</p>
  </div>
  <div class="d-flex flex-column align-items-center m-2">
    <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(shareLink)}" class="fa-stack" target="_blank">
      <i class="fas fa-square fa-stack-2x whatsapp-color"></i>
      <i class="fab fa-whatsapp fa-stack-1x fa-inverse"></i>
    </a>
    <p>Facebook</p>
  </div>
  <div class="d-flex flex-column align-items-center m-2">
    <a href="https://t.me/share/url?url=${encodeURIComponent(shareLink)}" class="fa-stack" target="_blank">
      <i class="fas fa-square fa-stack-2x telegram-color"></i>
      <i class="fab fa-telegram-plane fa-stack-1x fa-inverse"></i>
    </a>
    <p>Telegram</p>
  </div>
</div>
${withLink ? `
  <div class="d-flex linkShareContainer py-3">
    <input type="text" class="link-share form-control" value="${shareLink}" readonly>
    <a href="#" class="input-group-append px-2" id="linkCopy">
      <i class="far fa-copy icon-size-regular align-self-center"></i>
    </a>
  </div>
  ` : ''}
`;

export default post;

export {
  pageInit,
  pathNavigator,
  authorize,
  s3Upload,
  addEvent,
  validate,
  getQueryString,
  $,
  showSnow,
  popover,
  getShareFooter,
  attachLogoutHandler,
  loginCheck,
  addActiveRoute,
  updatePoints,
  debounce,
  getShareMarkup,
  loadScriptByURL,
  timeTrack,
  secondsToMins,
  isFeatureEnabled,
};
