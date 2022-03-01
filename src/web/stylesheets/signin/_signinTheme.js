const {
  Theme,
} = require('../../javascripts/common/_theme');

const thememaplight = {
  'text-color-1': Theme.light.utilColors.dark,
  'input-border-color': Theme.light.screenYellow.inputBorderColor,
  'btn-bg': Theme.light.screenYellow.btnBg,
};
// just copied the light theme colors to the dark for now
  // TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'text-color-1': Theme.dark.utilColors.dark,
  'input-border-color': Theme.dark.screenYellow.inputBorderColor,
  'btn-bg': Theme.dark.screenYellow.btnBg,
};

const cssvars = {
  'text-color-1': '--text-color-1',
  'input-border-color': '--input-border-color',
  'btn-bg': '--btn-bg',
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
