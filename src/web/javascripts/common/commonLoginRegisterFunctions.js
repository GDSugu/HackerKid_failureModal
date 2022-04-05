import $ from 'jquery';

const removeInvalidBorderAndHelper = (target) => {
  if ($(target).hasClass('is-invalid')) {
    $(target).removeClass('is-invalid');
    const formHelper = $(`#${$(target).attr('id')}-form-helper`);
    if (formHelper.css('display') === 'block') {
      formHelper.hide();
    }
  }
};

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

const inputChangeAfterValidationHandler = (e) => {
  const { target } = e;
  if ($(target).hasClass('is-invalid')) {
    removeInvalidBorderAndHelper(target);
    closeFormError(target);
  }
};

const togglePasswordVisibility = (e) => {
  const currentTarget = $(e.target);
  const input = $(currentTarget.attr('toggle'));
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
  removeInvalidBorderAndHelper,
  togglePasswordVisibility,
  closeFormError,
  inputChangeAfterValidationHandler,
  setFormErrorField,
};
