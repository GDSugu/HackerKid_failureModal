const { Yellow } = require('../../../../../colors/_colors');
const {
  Theme,
} = require('../../../../javascripts/common/_theme');

const lightTheme = Theme.light;
const darkTheme = Theme.dark;

const thememaplight = {
  'collectibles-text-color-1': lightTheme.utilColors.dark,
  'collectibles-btn-bg': lightTheme.screenYellow.btnBg,
  'collectibles-btn-text-color': Yellow.color900,
  'collectibles-body-bg': lightTheme.screenYellow.bodyBg,
  'collectibles-nav-bg': lightTheme.screenYellow.navBg,
  'collectibles-nav-active-bg': lightTheme.screenYellow.navActiveBg,
  'collectibles-controls-border-color': Yellow.color400,
  'collectibles-box-shadow-color': lightTheme.utilColors.shadowColor2,
};
// just copied the light theme colors to the dark for now
// TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'collectibles-text-color-1': darkTheme.utilColors.dark,
  'collectibles-btn-bg': darkTheme.screenYellow.btnBg,
  'collectibles-btn-text-color': Yellow.color900,
  'collectibles-body-bg': darkTheme.screenYellow.bodyBg,
  'collectibles-nav-bg': darkTheme.screenYellow.navBg,
  'collectibles-nav-active-bg': darkTheme.screenYellow.navActiveBg,
  'collectibles-card-box-shadow-color': '#FFE8B6',
  'collectibles-hero-card-box-shadow-color': '#F9A82625',
  'collectibles-controls-border-color': Yellow.color400,
  'collectibles-box-shadow-color': darkTheme.utilColors.shadowColor2,
};

const cssvars = {
  'collectibles-text-color-1': '--collectibles-text-color-1',
  'collectibles-btn-bg': '--collectibles-btn-bg',
  'collectibles-btn-text-color': '--collectibles-btn-text-color',
  'collectibles-body-bg': '--collectibles-body-bg',
  'collectibles-nav-bg': '--collectibles-nav-bg',
  'collectibles-nav-active-bg': '--collectibles-nav-active-bg',
  'collectibles-controls-border-color': '--collectibles-controls-border-color',
  'collectibles-box-shadow-color': '--colelctibles-box-shadow-color',
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
