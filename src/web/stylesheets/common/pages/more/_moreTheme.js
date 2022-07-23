const { Yellow, LightBlue } = require('../../../../../colors/_colors');
const {
  Theme,
} = require('../../../../javascripts/common/_theme');

const lightTheme = Theme.light;
const darkTheme = Theme.dark;

const thememaplight = {
  'more-text-color-1': lightTheme.utilColors.dark,
  'more-btn-bg': lightTheme.screenYellow.btnBg,
  'more-btn-text-color': Yellow.color900,
  'more-body-bg': lightTheme.screenYellow.bodyBg,
  'more-nav-bg': lightTheme.screenYellow.navBg,
  'more-nav-active-bg': lightTheme.screenYellow.navActiveBg,
  'more-ide-btn-bg': LightBlue.color700,
  'more-card-box-shadow-color': '#FFE8B6',
  'more-hero-card-box-shadow-color': '#F9A82625',
};
// just copied the light theme colors to the dark for now
  // TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'more-text-color-1': darkTheme.utilColors.dark,
  'more-btn-bg': darkTheme.screenYellow.btnBg,
  'more-btn-text-color': Yellow.color900,
  'more-body-bg': darkTheme.screenYellow.bodyBg,
  'more-nav-bg': darkTheme.screenYellow.navBg,
  'more-nav-active-bg': darkTheme.screenYellow.navActiveBg,
  'more-ide-btn-bg': LightBlue.color700,
  'more-card-box-shadow-color': '#FFE8B6',
  'more-hero-card-box-shadow-color': '#F9A82625',
};

const cssvars = {
  'more-text-color-1': '--more-text-color-1',
  'more-btn-bg': '--more-btn-bg',
  'more-btn-text-color': '--more-btn-text-color',
  'more-body-bg': '--more-body-bg',
  'more-nav-bg': '--more-nav-bg',
  'more-nav-active-bg': '--more-nav-active-bg',
  'more-ide-btn-bg': '--more-ide-btn-bg',
  'more-card-box-shadow-color': '--more-card-box-shadow-color',
  'more-hero-card-box-shadow-color': '--more-hero-card-box-shadow-color',
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
