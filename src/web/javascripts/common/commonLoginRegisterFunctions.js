import $ from 'jquery';
import { validate } from './framework';

const closeFormError = (callingToCloseTarget) => {
  const formError = $('#form-error');
  const errorTypeString = $(callingToCloseTarget).attr('data-close-form-error-type');

  if (errorTypeString) {
    const errorTypeArr = errorTypeString.split(',');

    if (errorTypeArr.includes(formError.attr('data-error-type'))
      && formError.css('display') === 'block') {
      formError.hide();
    }
  }
};

const validateInputOnChange = (e, providedType = '', customMessage = '') => {
  const { target } = e;

  const idSelector = `#${$(target).attr('id')}`;
  const type = (providedType) || $(target).attr('type');
  const formHelperIdSelector = `${idSelector}-form-helper`;
  const required = ($(target).attr('required') ? 1 : 0);
  const skipValueCheck = $(target).attr('data-skip-value-check');

  return validate(idSelector, type, required, formHelperIdSelector, customMessage, skipValueCheck);
};

const togglePasswordVisibility = (e) => {
  const currentTarget = $(e.target);
  const input = $(currentTarget.attr('data-toggle'));
  const inputValueLength = input.val().length;

  if (inputValueLength) {
    currentTarget.toggleClass('fa-eye fa-eye-slash');
    if (input.attr('type') === 'password') {
      input.attr('type', 'text');
    } else {
      input.attr('type', 'password');
    }
  }
};

const setFormErrorField = (value, attrObj = {}) => {
  Object.keys(attrObj).forEach((attrName) => {
    $('#form-error').attr(attrName, attrObj[attrName]);
  });

  $('#form-error').text(value).show();
};

export {
  togglePasswordVisibility,
  closeFormError,
  validateInputOnChange,
  setFormErrorField,
};
