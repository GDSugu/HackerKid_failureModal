const {
  Theme,
} = require('../../../../javascripts/common/_theme');

const lightTheme = Theme.light;
const darkTheme = Theme.dark;

const thememaplight = {
  'home-text-color-1': lightTheme.utilColors.dark,
  'home-btn-bg': lightTheme.screenYellow.btnBg,
  'home-body-bg': lightTheme.screenYellow.bodyBg,
  'home-nav-bg': lightTheme.screenYellow.navBg,
  'home-nav-active-bg': lightTheme.screenYellow.navActiveBg,
};
// just copied the light theme colors to the dark for now
  // TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'home-text-color-1': darkTheme.utilColors.dark,
  'home-btn-bg': darkTheme.screenYellow.btnBg,
  'home-body-bg': darkTheme.screenYellow.bodyBg,
  'home-nav-bg': darkTheme.screenYellow.navBg,
  'home-nav-active-bg': darkTheme.screenYellow.navActiveBg,
};

const cssvars = {
  'home-text-color-1': '--home-text-color-1',
  'home-btn-bg': '--home-btn-bg',
  'home-body-bg': '--home-body-bg',
  'home-nav-bg': '--home-nav-bg',
  'home-nav-active-bg': '--home-nav-active-bg',
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
