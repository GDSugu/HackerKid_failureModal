import $ from 'jquery';
import navbar from './navbar';

const { API } = process.env;

const authorize = {};

const pageInit = (className) => {
  $('body')
    .removeClass()
    .addClass(className);
};

const pathNavigator = (path) => {
  const { origin } = window.location;
  window.location.href = `${origin}/${path}`;
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
  pathNavigator('dashboard.html');
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
    navbar.addSignInButton();
    resolve(false);
  } else {
    post({ type: 'checkSession' }, 'login/', true, false).then((response) => {
      if (response === 'access_denied') {
        resolve(false);
      } else {
        $('.username').text(authorize.getSession('name'));
        navbar.addDropdown();
        resolve(true);
      }
    }).catch((error) => {
      reject(error);
    });
  }
});

const addSignInButton = () => {
  $('.nav-trail').html('<div><a href="/login.html" class="btn btn-primary">Sign in</a></div>');
};

const loginCheck = () => new Promise((resolve, reject) => {
  const authToken = authorize.getSession('authtoken');
  if (authToken === '' || authToken === null) {
    addSignInButton();
    resolve(false);
  } else {
    post({ type: 'checkSession' }, 'login/', true, false).then((response) => {
      if (response === 'access_denied') {
        resolve(false);
      } else {
        $('.username').text(authorize.getSession('name'));
        navbar.addDropdown();
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
const validate = (id, type, required = 1, warnId = false, warnMsg = false) => {
  const inputField = $(id);
  let data = inputField.val();
  data = $.trim(data);
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
};

const getQueryString = (query) => {
  const search = new URLSearchParams(document.location.search.substring(1));
  return search.get(query);
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

const popover = (selector, options, showIn = 0, hideIn = 2000) => {
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
    // console.log(error);
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
  showSnow,
  popover,
  getShareFooter,
  attachLogoutHandler,
  loginCheck,
  addActiveRoute,
  updatePoints,
  debounce,
  getShareMarkup,
};
