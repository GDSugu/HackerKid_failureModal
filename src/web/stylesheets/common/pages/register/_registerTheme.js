const {
  Theme,
} = require('../../../../javascripts/common/_theme');

const thememaplight = {
  'register-text-color-1': Theme.light.utilColors.dark,
  'register-text-color-2': Theme.light.screenYellow.fadedBtnTextColor,
  'register-border-color': Theme.light.screenYellow.inputBorderColor,
  'register-login-btn-bg': Theme.light.screenYellow.btnBg,
};
// just copied the light theme colors to the dark for now
  // TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'register-text-color-1': Theme.dark.utilColors.dark,
  'register-text-color-2': Theme.dark.screenYellow.fadedBtnTextColor,
  'register-border-color': Theme.dark.screenYellow.inputBorderColor,
  'register-login-btn-bg': Theme.dark.screenYellow.btnBg,
};

const cssvars = {
  'register-text-color-1': '--register-text-color-1',
  'register-text-color-2': '--register-text-color-2',
  'register-border-color': '--register-border-color',
  'register-login-btn-bg': '--register-btn-bg',
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
