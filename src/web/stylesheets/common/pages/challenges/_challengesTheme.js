const {
  Theme,
} = require('../../../../javascripts/common/_theme');

const lightTheme = Theme.light;
const darkTheme = Theme.dark;

const thememaplight = {
  'challenges-text-color-1': lightTheme.utilColors.dark,
  'challenges-btn-bg': lightTheme.screenBlue.btnBg,
  'challenges-body-bg': lightTheme.screenBlue.bodyBg,
  'challenges-nav-bg': lightTheme.screenBlue.navBg,
  'challenges-nav-active-bg': lightTheme.screenBlue.navActiveBg,
};
// just copied the light theme colors to the dark for now
  // TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'challenges-text-color-1': darkTheme.utilColors.dark,
  'challenges-btn-bg': darkTheme.screenBlue.btnBg,
  'challenges-body-bg': darkTheme.screenBlue.bodyBg,
  'challenges-nav-bg': darkTheme.screenBlue.navBg,
  'challenges-nav-active-bg': darkTheme.screenBlue.navActiveBg,
};

const cssvars = {
  'challenges-text-color-1': '--challenges-text-color-1',
  'challenges-btn-bg': '--challenges-btn-bg',
  'challenges-body-bg': '--challenges-body-bg',
  'challenges-nav-bg': '--challenges-nav-bg',
  'challenges-nav-active-bg': '--challenges-nav-active-bg',
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
