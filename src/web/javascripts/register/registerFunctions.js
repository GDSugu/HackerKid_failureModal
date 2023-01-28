import $ from 'jquery';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import post, {
  authorize,
} from '../common/framework';

const actionsOrder = ['send-otp', 'verify-otp', 'register'];
const otpTimerDOM = $('#otptimer');
const flaginput = document.querySelector('#phone');
const telInput = intlTelInput(flaginput, {
  allowDropdown: true,
  initialCountry: 'in',
  separateDialCode: true,
  utilsScript: intlTelInput.utilsScript,
});

function startResendOtpTimer() {
  $('.resendotp a').addClass('is-disabled');
  let seconds = 30;
  let secondsText = '00 : 30';
  otpTimerDOM.text(secondsText);
  otpTimerDOM.show();
  const timer = setInterval(() => {
    seconds -= 1;
    secondsText = `00 : ${(seconds > 9) ? seconds : (`0${seconds.toString()}`)}`;
    otpTimerDOM.text(secondsText);
    if (seconds <= 0) {
      otpTimerDOM.hide();
      $('.resendotp a').removeClass('is-disabled');
      clearInterval(timer);
    }
  }, 1000);
}

function validateField(selector, type, length = 0) {
  const defaultRegex = {
    email: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$',
    phone: '^\\d+$',
    name: '^[a-zA-Z. ]+$',
  };
  const regex = (defaultRegex[type] !== undefined) ? defaultRegex[type] : type;
  const regexObj = new RegExp(regex);
  const value = $(selector).val();
  if (value.length >= length) {
    if ((value.length === 0 && length === 0) || (regexObj.test(value))) {
      if (value.length === 0) {
        return true;
      }
      $(selector).removeClass('is-invalid').addClass('is-valid');
      return value;
    }
  }
  $(selector).removeClass('is-valid').addClass('is-invalid');
  return false;
}

function changeBtnActionTo(actionId) {
  if (actionId < actionsOrder.length && actionId >= 0) {
    const newAction = actionsOrder[actionId];
    $('#register-action').data('action', newAction);
    if (newAction === 'send-otp') {
      $('.togdisappear2,.togdisappear3').hide();
      $('.togdisappear1').show();
      $('#phone').attr('disabled', false);
      $('.tryContainer-mobile').removeClass('d-none');
    } else if (newAction === 'verify-otp') {
      $('#phone').attr('disabled', true);
      $('.togdisappear3').hide();
      $('.togdisappear1,.togdisappear2').show();
      startResendOtpTimer();
      $('.tryContainer-mobile').addClass('d-none');
    } else if (newAction === 'register') {
      $('.togdisappear1,.togdisappear2').hide();
      $('.togdisappear3').show();
      $('#phone').attr('disabled', true);
    }
    return newAction;
  }
  return false;
}

const actionHandler = () => {
  $('#register-action,.resendotp a').on('click', function () {
    if ($(this).hasClass('is-disabled')) {
      return false;
    }
    const mobileNumber = validateField('#phone', 'phone', 8);
    let countryCode = telInput.getSelectedCountryData();
    countryCode = `+${countryCode.dialCode}`;
    if (mobileNumber === false) {
      return false;
    }
    const triggeredAction = $(this).data('action');
    const requestData = {};
    requestData.phone = mobileNumber;
    requestData.countryCode = countryCode;
    requestData.type = triggeredAction;
    if (triggeredAction === 'verify-otp') {
      requestData.otp = validateField('#otp', '[0-9]{4,4}$', 4);
      if (requestData.otp === false) {
        return false;
      }
    } else if (triggeredAction === 'register') {
      requestData.name = validateField('#uname', 'name', 3);
      requestData.mail = validateField('#inputEmail', 'email', 1);
      requestData.password = validateField('#inputPassword', '.*', 6);
      if (!requestData.name || !requestData.password || !requestData.mail) {
        return false;
      }
      requestData.url = window.location.href;
    }

    post(requestData, 'register/')
      .then((response) => {
        const data = JSON.parse(response);
        if (data.status === 'success') {
          if (triggeredAction === 'register') {
            if (data.message === 'REGISTERED') {
              const sessionDetails = data.session;
              authorize.setUserSession(sessionDetails);
            }
          } else {
            const nextActionId = actionsOrder.indexOf(triggeredAction) + 1;
            changeBtnActionTo(nextActionId);
          }
        } else if (data.status === 'error') {
          if (data.message === 'OTP_EXPIRED') {
            $('#otp').addClass('is-invalid').removeClass('is-valid');
            $('#error-msg').text('Your OTP expired!, Please try again').show();
          } else if (data.message === 'ACCOUNT_EXIST') {
            $('#phone').addClass('is-invalid').removeClass('is-valid');
            $('#error-msg').text('Account already exists!, try logging in').show();
          }
        }
      })
      .catch((error) => {
        const errData = JSON.parse(error);
        console.log(errData);
      });
    return true;
  });
};

const attachPasswordToggle = () => {
  $('#toggle-password').on('click', function () {
    $(this).toggleClass('fa-eye fa-eye-slash');
    const input = $('#inputPassword');
    if (input.attr('type') === 'password') {
      input.attr('type', 'text');
    } else {
      input.attr('type', 'password');
    }
  });
};

const attachEditNumber = () => {
  $('#editnumber').on('click', () => {
    changeBtnActionTo(0);
  });
};

const attachInvalidListener = () => {
  $(document).on('click', '.is-invalid', function () {
    $(this).removeClass('is-invalid');
    $('#error-msg').text('');
  });
};

const initialize = () => {
  attachInvalidListener();
  attachEditNumber();
  attachPasswordToggle();
  actionHandler();
};

export default initialize;
