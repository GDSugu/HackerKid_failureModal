const {
  Theme,
} = require('../../../../javascripts/common/_theme');

const {
  Green, Yellow, utilColors,
} = require('../../../../../colors/_colors');

const lightTheme = Theme.light;
const darkTheme = Theme.dark;

const thememaplight = {
  'course-text-color-1': lightTheme.utilColors.dark,
  'course-btn-bg': lightTheme.screenGreen.btnBg,
  'course-body-bg': lightTheme.screenGreen.bodyBg,
  'course-nav-bg': lightTheme.screenGreen.navBg,
  'course-nav-active-bg': lightTheme.screenGreen.navActiveBg,
  'videos-progress-gradient-1': Green.color900,
  'videos-progress-gradient-2': Green.color500,
  'basic-color': Yellow.color700,
  'rating-color': Yellow.color500,
  'rating-background': utilColors.dimGrey,
  'color-sub-topic': utilColors.lightGrey,
  'shadow-color': utilColors.shadowColor1,
  'course-progress-placeholder-bg': Green.color100,
  'course-hero-shadow': '0 4px 16px #f9a82625',
};
// just copied the light theme colors to the dark for now
  // TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'course-text-color-1': darkTheme.utilColors.dark,
  'course-btn-bg': darkTheme.screenGreen.btnBg,
  'course-body-bg': darkTheme.screenGreen.bodyBg,
  'course-nav-bg': darkTheme.screenGreen.navBg,
  'course-nav-active-bg': darkTheme.screenGreen.navActiveBg,
  'videos-progress-gradient-1': Green.color900,
  'videos-progress-gradient-2': Green.color500,
  'basic-color': Yellow.color700,
  'rating-color': Yellow.color500,
  'rating-background': utilColors.dimGrey,
  'color-sub-topic': utilColors.lightGrey,
  'shadow-color': utilColors.shadowColor1,
  'course-progress-placeholder-bg': Green.color100,
  'course-hero-shadow': '0 4px 16px #f9a82625',
};

const cssvars = {
  'course-text-color-1': '--course-text-color-1',
  'course-btn-bg': '--course-btn-bg',
  'course-body-bg': '--course-body-bg',
  'course-nav-bg': '--course-nav-bg',
  'course-nav-active-bg': '--course-nav-active-bg',
  'videos-progress-gradient-1': '--videos-progress-gradient-1',
  'videos-progress-gradient-2': '--videos-progress-gradient-2',
  'rating-color': '--rating-color',
  'basic-color': '--basic-color',
  'rating-background': '--rating-background',
  'color-sub-topic': '--color-sub-topic',
  'shadow-color': '--shadow-color',
  'course-progress-placeholder-bg': '--course-progress-placeholder-bg',
  'course-hero-shadow': '--course-hero-shadow',
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
