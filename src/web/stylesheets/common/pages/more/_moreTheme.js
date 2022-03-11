const {
  Theme,
} = require('../../../../javascripts/common/_theme');

const lightTheme = Theme.light;
const darkTheme = Theme.dark;

const thememaplight = {
  'more-text-color-1': lightTheme.utilColors.dark,
  'more-btn-bg': lightTheme.screenYellow.btnBg,
  'more-body-bg': lightTheme.screenYellow.bodyBg,
  'more-nav-bg': lightTheme.screenYellow.navBg,
  'more-nav-active-bg': lightTheme.screenYellow.navActiveBg,
};
// just copied the light theme colors to the dark for now
  // TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'more-text-color-1': darkTheme.utilColors.dark,
  'more-btn-bg': darkTheme.screenYellow.btnBg,
  'more-body-bg': darkTheme.screenYellow.bodyBg,
  'more-nav-bg': darkTheme.screenYellow.navBg,
  'more-nav-active-bg': darkTheme.screenYellow.navActiveBg,
};

const cssvars = {
  'more-text-color-1': '--more-text-color-1',
  'more-btn-bg': '--more-btn-bg',
  'more-body-bg': '--more-body-bg',
  'more-nav-bg': '--more-nav-bg',
  'more-nav-active-bg': '--more-nav-active-bg',
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
