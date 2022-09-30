const {
  Theme,
} = require('../../../../javascripts/common/_theme');

const lightTheme = Theme.light;
const darkTheme = Theme.dark;

const thememaplight = {
  'challenges-text-color-1': lightTheme.utilColors.dark,
  'challenges-text-color-2': lightTheme.utilColors.grey,
  'challenges-text-color-3': lightTheme.screenBlue.btnDarkBg,
  'challenges-text-color-4': lightTheme.utilColors.white,
  'challenges-btn-bg': lightTheme.screenBlue.btnBg,
  'challenges-body-bg': lightTheme.screenBlue.bodyBg,
  'challenges-nav-bg': lightTheme.screenBlue.navBg,
  'challenges-nav-active-bg': lightTheme.screenBlue.navActiveBg,
  'challenges-swiper-arrow-color': lightTheme.screenBlue.btnDarkBg,
  'challenges-hero-card-bg': lightTheme.screenBlue.transparentBlue,
};
// just copied the light theme colors to the dark for now
  // TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'challenges-text-color-1': darkTheme.utilColors.dark,
  'challenges-text-color-2': darkTheme.utilColors.grey,
  'challenges-text-color-3': lightTheme.screenBlue.btnDarkBg,
  'challenges-text-color-4': lightTheme.utilColors.white,
  'challenges-btn-bg': darkTheme.screenBlue.btnBg,
  'challenges-body-bg': darkTheme.screenBlue.bodyBg,
  'challenges-nav-bg': darkTheme.screenBlue.navBg,
  'challenges-nav-active-bg': darkTheme.screenBlue.navActiveBg,
  'challenges-swiper-arrow-color': lightTheme.screenBlue.btnDarkBg,
  'challenges-hero-card-bg': lightTheme.screenBlue.transparentBlue,
};

const cssvars = {
  'challenges-text-color-1': '--challenges-text-color-1',
  'challenges-text-color-2': '--challenges-text-color-2',
  'challenges-text-color-3': '--challenges-text-color-3',
  'challenges-text-color-4': '--challenges-text-color-4',
  'challenges-btn-bg': '--challenges-btn-bg',
  'challenges-body-bg': '--challenges-body-bg',
  'challenges-nav-bg': '--challenges-nav-bg',
  'challenges-nav-active-bg': '--challenges-nav-active-bg',
  'challenges-swiper-arrow-color': '--challenges-swiper-arrow-color',
  'challenges-hero-card-bg': '--challenges-hero-card-bg',
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
