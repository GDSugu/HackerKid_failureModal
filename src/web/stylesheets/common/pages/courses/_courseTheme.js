const {
  Theme,
} = require('../../../../javascripts/common/_theme');

const lightTheme = Theme.light;
const darkTheme = Theme.dark;

const thememaplight = {
  'course-text-color-1': lightTheme.utilColors.dark,
  'course-btn-bg': lightTheme.screenGreen.btnBg,
  'course-body-bg': lightTheme.screenGreen.bodyBg,
  'course-nav-bg': lightTheme.screenGreen.navBg,
  'course-nav-active-bg': lightTheme.screenGreen.navActiveBg,
};
// just copied the light theme colors to the dark for now
  // TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'course-text-color-1': darkTheme.utilColors.dark,
  'course-btn-bg': darkTheme.screenGreen.btnBg,
  'course-body-bg': darkTheme.screenGreen.bodyBg,
  'course-nav-bg': darkTheme.screenGreen.navBg,
  'course-nav-active-bg': darkTheme.screenGreen.navActiveBg,
};

const cssvars = {
  'course-text-color-1': '--course-text-color-1',
  'course-btn-bg': '--course-btn-bg',
  'course-body-bg': '--course-body-bg',
  'course-nav-bg': '--course-nav-bg',
  'course-nav-active-bg': '--course-nav-active-bg',
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
