const {
  Theme,
} = require('../../../../javascripts/common/_theme');

const thememaplight = {
  'forgot-password-text-color-1': Theme.light.utilColors.dark,
  'forgot-password-text-color-2': Theme.light.screenYellow.fadedBtnTextColor,
  'forgot-password-border-color': Theme.light.screenYellow.inputBorderColor,
  'forgot-password-login-btn-bg': Theme.light.screenYellow.btnBg,
};
// just copied the light theme colors to the dark for now
  // TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'forgot-password-text-color-1': Theme.dark.utilColors.dark,
  'forgot-password-text-color-2': Theme.dark.screenYellow.fadedBtnTextColor,
  'forgot-password-border-color': Theme.dark.screenYellow.inputBorderColor,
  'forgot-password-login-btn-bg': Theme.dark.screenYellow.btnBg,
};

const cssvars = {
  'forgot-password-text-color-1': '--forgot-password-text-color-1',
  'forgot-password-text-color-2': '--forgot-password-text-color-2',
  'forgot-password-border-color': '--forgot-password-border-color',
  'forgot-password-login-btn-bg': '--forgot-password-btn-bg',
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
