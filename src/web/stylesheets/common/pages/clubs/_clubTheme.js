const { Yellow, Red } = require('../../../../../colors/_colors');
const {
  Theme,
} = require('../../../../javascripts/common/_theme');

const lightTheme = Theme.light;
const darkTheme = Theme.dark;

const thememaplight = {
  'club-text-color-1': lightTheme.utilColors.dark,
  'club-btn-bg': lightTheme.screenYellow.btnBg,
  'club-body-bg': lightTheme.screenYellow.bodyBg,
  'club-nav-bg': lightTheme.screenYellow.navBg,
  'club-nav-active-bg': lightTheme.screenYellow.navActiveBg,
  'club-faded-btn-bg': lightTheme.screenYellow.fadedBtnTextColor,
  'club-hero-data-bg': `${lightTheme.utilColors.shadowColor1}26`,
  'club-hero-name-bg': `${lightTheme.utilColors.white}bf`,
  'club-tab-border-color': '#dee2e6',
  'club-card-border-color': '#efefef',
  'club-card-box-shadow-color': lightTheme.utilColors.shadowColor2,
  'club-hero-card-box-shadow-color': `${lightTheme.utilColors.shadowColor1}25`,
  'club-hero-shadow': `0 4px 16px ${lightTheme.utilColors.shadowColor1}25`,
  'club-leaderboard-shadow': `0 16px 48px ${lightTheme.utilColors.shadowColor1}25`,
  'club-progress-bar-bg': Yellow.color300,
  'club-underline-color': Yellow.color100,
  'club-admin-warning-bg': Red.color50,
  'club-admin-warning-info-bg': Red.color500,
  'club-make-admin-bg': Yellow.color900,
  'club-danger-bg': Red.color900,
  'club-advanced-options-color': Red.color700,
};
// just copied the light theme colors to the dark for now
  // TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'club-text-color-1': darkTheme.utilColors.dark,
  'club-btn-bg': darkTheme.screenYellow.btnBg,
  'club-body-bg': darkTheme.screenYellow.bodyBg,
  'club-nav-bg': darkTheme.screenYellow.navBg,
  'club-nav-active-bg': darkTheme.screenYellow.navActiveBg,
  'club-faded-btn-bg': darkTheme.screenYellow.fadedBtnTextColor,
  'club-hero-data-bg': `${darkTheme.utilColors.shadowColor1}26`,
  'club-hero-name-bg': `${darkTheme.utilColors.white}bf`,
  'club-tab-border-color': '#dee2e6',
  'club-card-border-color': '#efefef',
  'club-card-box-shadow-color': darkTheme.utilColors.shadowColor2,
  'club-hero-card-box-shadow-color': `${darkTheme.utilColors.shadowColor1}25`,
  'club-hero-shadow': `0 4px 16px ${darkTheme.utilColors.shadowColor1}25`,
  'club-leaderboard-shadow': `0 16px 48px ${darkTheme.utilColors.shadowColor1}25`,
  'club-progress-bar-bg': Yellow.color300,
  'club-underline-color': Yellow.color100,
  'club-admin-warning-bg': Red.color50,
  'club-admin-warning-info-bg': Red.color500,
  'club-make-admin-bg': Yellow.color900,
  'club-danger-bg': Red.color900,
  'club-advanced-options-color': Red.color700,
};

const cssvars = {
  'club-text-color-1': '--club-text-color-1',
  'club-btn-bg': '--club-btn-bg',
  'club-body-bg': '--club-body-bg',
  'club-nav-bg': '--club-nav-bg',
  'club-nav-active-bg': '--club-nav-active-bg',
  'club-faded-btn-bg': '--club-faded-btn-bg',
  'club-hero-data-bg': '--club-hero-data-bg',
  'club-hero-name-bg': '--club-hero-name-bg',
  'club-tab-border-color': '--club-tab-border-color',
  'club-card-border-color': '--club-card-border-color',
  'club-card-box-shadow-color': '--club-card-box-shadow-color',
  'club-hero-card-box-shadow-color': '--club-hero-card-box-shadow-color',
  'club-hero-shadow': '--club-hero-shadow',
  'club-leaderboard-shadow': '--club-leaderboard-shadow',
  'club-progress-bar-bg': '--club-progress-bar-bg',
  'club-underline-color': '--club-underline-color',
  'club-admin-warning-bg': '--club-admin-warning-bg',
  'club-admin-warning-info-bg': '--club-admin-warning-info-bg',
  'club-make-admin-bg': '--club-make-admin-bg',
  'club-danger-bg': '--club-danger-bg',
  'club-advanced-options-color': '--club-advanced-options-color',
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
