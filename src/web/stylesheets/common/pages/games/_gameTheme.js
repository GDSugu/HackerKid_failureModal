const {
  Theme,
} = require('../../../../javascripts/common/_theme');

const lightTheme = Theme.light;
const darkTheme = Theme.dark;

const thememaplight = {
  'game-text-color-1': lightTheme.utilColors.dark,
  'game-btn-bg': lightTheme.screenLightBlue.btnBg,
  'game-body-bg': lightTheme.screenLightBlue.bodyBg,
  'game-nav-bg': lightTheme.screenLightBlue.navBg,
  'game-nav-active-bg': lightTheme.screenLightBlue.navActiveBg,
};
// just copied the light theme colors to the dark for now
  // TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'game-text-color-1': darkTheme.utilColors.dark,
  'game-btn-bg': darkTheme.screenLightBlue.btnBg,
  'game-body-bg': darkTheme.screenLightBlue.bodyBg,
  'game-nav-bg': darkTheme.screenLightBlue.navBg,
  'game-nav-active-bg': darkTheme.screenLightBlue.navActiveBg,
};

const cssvars = {
  'game-text-color-1': '--game-text-color-1',
  'game-btn-bg': '--game-btn-bg',
  'game-body-bg': '--game-body-bg',
  'game-nav-bg': '--game-nav-bg',
  'game-nav-active-bg': '--game-nav-active-bg',
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};