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
  'club-hero-data-bg': '#f9a82626',
  'club-hero-name-bg': '#ffffffbf',
  'club-tab-border-color': '#dee2e6',
  'club-card-border-color': '#efefef',
  'club-card-box-shadow-color': '#FFE8B6',
  'club-hero-card-box-shadow-color': '#F9A82625',
  'club-hero-shadow': '0 4px 16px #f9a82625',
  'club-leaderboard-shadow': '0 16px 48px #f9a82625',
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
  'club-hero-data-bg': '#f9a82626',
  'club-hero-name-bg': '#ffffffbf',
  'club-tab-border-color': '#dee2e6',
  'club-card-border-color': '#efefef',
  'club-card-box-shadow-color': '#FFE8B6',
  'club-hero-card-box-shadow-color': '#F9A82625',
  'club-hero-shadow': '0 4px 16px #f9a82625',
  'club-leaderboard-shadow': '0 16px 48px #f9a82625',
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
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
