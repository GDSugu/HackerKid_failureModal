const { Yellow, Red } = require('../../../../../colors/_colors');
const {
  Theme,
} = require('../../../../javascripts/common/_theme');

const lightTheme = Theme.light;
const darkTheme = Theme.dark;

const thememaplight = {
  'awards-text-color-1': lightTheme.utilColors.dark,
  'awards-btn-bg': lightTheme.screenYellow.btnBg,
  'awards-btn-text-color': Yellow.color900,
  'awards-body-bg': lightTheme.screenYellow.bodyBg,
  'awards-nav-bg': lightTheme.screenYellow.navBg,
  'awards-nav-active-bg': lightTheme.screenYellow.navActiveBg,
  'awards-card-bg': lightTheme.utilColors.bg2,
  'awards-bg-1': lightTheme.utilColors.white,
  'awards-gradient-color-1': Red.color500,
  'awards-gradient-color-2': Yellow.color600,
  'awards-controls-border-color': Yellow.color400,
  'awards-box-shadow-color': lightTheme.utilColors.shadowColor2,
};
// just copied the light theme colors to the dark for now
// TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'awards-text-color-1': darkTheme.utilColors.dark,
  'awards-btn-bg': darkTheme.screenYellow.btnBg,
  'awards-btn-text-color': Yellow.color900,
  'awards-body-bg': darkTheme.screenYellow.bodyBg,
  'awards-nav-bg': darkTheme.screenYellow.navBg,
  'awards-nav-active-bg': darkTheme.screenYellow.navActiveBg,
  'awards-card-box-shadow-color': '#FFE8B6',
  'awards-hero-card-box-shadow-color': '#F9A82625',
  'awards-card-bg': darkTheme.utilColors.bg2,
  'awards-bg-1': darkTheme.utilColors.white,
  'awards-gradient-color-1': Red.color500,
  'awards-gradient-color-2': Yellow.color600,
  'awards-controls-border-color': Yellow.color400,
  'awards-box-shadow-color': darkTheme.utilColors.shadowColor2,
};

const cssvars = {
  'awards-text-color-1': '--awards-text-color-1',
  'awards-btn-bg': '--awards-btn-bg',
  'awards-btn-text-color': '--awards-btn-text-color',
  'awards-body-bg': '--awards-body-bg',
  'awards-nav-bg': '--awards-nav-bg',
  'awards-nav-active-bg': '--awards-nav-active-bg',
  'awards-card-bg': '--awards-card-bg',
  'awards-bg-1': '--awards-bg-1',
  'awards-gradient-color-1': '--awards-gradient-color-1',
  'awards-gradient-color-2': '--awards-gradient-color-2',
  'awards-controls-border-color': '--awards-controls-border-color',
  'awards-box-shadow-color': '--awards-box-shadow-color',
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
