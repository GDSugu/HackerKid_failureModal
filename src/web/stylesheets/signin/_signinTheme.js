const {
  Theme,
} = require('../../javascripts/common/_theme');

const thememaplight = {
  'text-color-1': Theme.light.utilColors.dark,
  'text-color-2': Theme.light.screenYellow.fadedBtnTextColor,
  'input-border-color': Theme.light.screenYellow.inputBorderColor,
  'btn-bg': Theme.light.screenYellow.btnBg,
  'faded-btn-bg': Theme.light.screenYellow.fadedBtnBg,
};
// just copied the light theme colors to the dark for now
  // TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'text-color-1': Theme.dark.utilColors.dark,
  'text-color-2': Theme.dark.screenYellow.fadedBtnTextColor,
  'input-border-color': Theme.dark.screenYellow.inputBorderColor,
  'btn-bg': Theme.dark.screenYellow.btnBg,
  'faded-btn-bg': Theme.dark.screenYellow.fadedBtnBg,
};

const cssvars = {
  'text-color-1': '--text-color-1',
  'text-color-2': '--faded-btn-text-color',
  'input-border-color': '--input-border-color',
  'btn-bg': '--btn-bg',
  'faded-btn-bg': '--faded-btn-bg',
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
