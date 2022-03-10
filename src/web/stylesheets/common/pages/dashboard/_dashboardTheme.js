const {
  Theme,
} = require('../../../../javascripts/common/_theme');

const lightTheme = Theme.light;
const darkTheme = Theme.dark;

const thememaplight = {
  'dashboard-text-color-1': lightTheme.utilColors.dark,
  'dashboard-btn-bg': lightTheme.screenYellow.btnBg,
  'dashboard-body-bg': lightTheme.screenYellow.bodyBg,
  'dashboard-nav-bg': lightTheme.screenYellow.navBg,
  'dashboard-nav-active-bg': lightTheme.screenYellow.navActiveBg,
};
// just copied the light theme colors to the dark for now
  // TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'dashboard-text-color-1': darkTheme.utilColors.dark,
  'dashboard-btn-bg': darkTheme.screenYellow.btnBg,
  'dashboard-body-bg': darkTheme.screenYellow.bodyBg,
  'dashboard-nav-bg': darkTheme.screenYellow.navBg,
  'dashboard-nav-active-bg': darkTheme.screenYellow.navActiveBg,
};

const cssvars = {
  'dashboard-text-color-1': '--dashboard-text-color-1',
  'dashboard-btn-bg': '--dashboard-btn-bg',
  'dashboard-body-bg': '--dashboard-body-bg',
  'dashboard-nav-bg': '--dashboard-nav-bg',
  'dashboard-nav-active-bg': '--dashboard-nav-active-bg',
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
