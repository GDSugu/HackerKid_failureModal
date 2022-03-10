const {
  Theme,
} = require('../../../../javascripts/common/_theme');

const thememaplight = {
  'signin-text-color-1': Theme.light.utilColors.dark,
  'signin-input-border-color': Theme.light.screenYellow.inputBorderColor,
  'signin-btn-bg': Theme.light.screenYellow.btnBg,
  'signin-faded-btn-bg': Theme.light.screenYellow.fadedBtnBg,
  'signin-faded-btn-text-color': Theme.light.screenYellow.fadedBtnTextColor,
};
// just copied the light theme colors to the dark for now
  // TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'signin-text-color-1': Theme.dark.utilColors.dark,
  'signin-input-border-color': Theme.dark.screenYellow.inputBorderColor,
  'signin-btn-bg': Theme.dark.screenYellow.btnBg,
  'signin-faded-btn-bg': Theme.dark.screenYellow.fadedBtnBg,
  'signin-faded-btn-text-color': Theme.dark.screenYellow.fadedBtnTextColor,
};

const cssvars = {
  'signin-text-color-1': '--signin-text-color-1',
  'signin-input-border-color': '--signin-input-border-color',
  'signin-btn-bg': '--signin-btn-bg',
  'signin-faded-btn-bg': '--signin-faded-btn-bg',
  'signin-faded-btn-text-color': '--signin-faded-btn-text-color',
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
