const {
  Theme,
} = require('../../../../javascripts/common/_theme');

const thememaplight = {
  'signin-text-color-1': Theme.light.utilColors.dark,
  'signin-text-color-2': Theme.light.screenYellow.fadedBtnTextColor,
  'signin-border-color': Theme.light.screenYellow.inputBorderColor,
  'signin-login-btn-bg': Theme.light.screenYellow.btnBg,
};
// just copied the light theme colors to the dark for now
  // TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'signin-text-color-1': Theme.dark.utilColors.dark,
  'signin-text-color-2': Theme.dark.screenYellow.fadedBtnTextColor,
  'signin-border-color': Theme.dark.screenYellow.inputBorderColor,
  'signin-login-btn-bg': Theme.dark.screenYellow.btnBg,
};

const cssvars = {
  'signin-text-color-1': '--signin-text-color-1',
  'signin-text-color-2': '--signin-text-color-2',
  'signin-border-color': '--signin-border-color',
  'signin-login-btn-bg': '--signin-btn-bg',
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
