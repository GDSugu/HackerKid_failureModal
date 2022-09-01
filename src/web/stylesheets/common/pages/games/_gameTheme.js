const { Blue, LightBlue } = require('../../../../../colors/_colors');
const {
  Theme,
} = require('../../../../javascripts/common/_theme');

const lightTheme = Theme.light;
const darkTheme = Theme.dark;

const thememaplight = {
  'game-text-color-1': lightTheme.utilColors.dark,
  'game-btn-bg': lightTheme.screenLightBlue.btnBg,
  'game-hero-card-box-shadow': '#00BAFF40',
  'game-hero-leaderboard-title-color': lightTheme.screenLightBlue.textBold,
  'game-hero-leaderboard-br-color': lightTheme.screenLightBlue.navBg,
  'game-more-info-btn-text-color': lightTheme.screenLightBlue.textBold,
  'game-leaderboard-button-bg': lightTheme.screenBlue.btnBg,
  'game-card-body-bg': lightTheme.screenLightBlue.btnBg,
  'game-level-progress-bar-bg': lightTheme.screenLightBlue.bodyBg,
  'game-level-progress-gradient-1': Blue.color500,
  'game-level-progress-gradient-2': LightBlue.color500,
  'game-play-btn-text-color': lightTheme.screenLightBlue.textBold,
  'game-level-indicator-btn-bg': `${lightTheme.utilColors.dark}ad`,
  'game-body-bg': lightTheme.screenLightBlue.bodyBg,
  'game-nav-bg': lightTheme.screenLightBlue.navBg,
  'game-nav-active-bg': lightTheme.screenLightBlue.navActiveBg,
};
// just copied the light theme colors to the dark for now
  // TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'game-text-color-1': darkTheme.utilColors.dark,
  'game-btn-bg': darkTheme.screenLightBlue.btnBg,
  'game-hero-card-box-shadow': '#00BAFF40',
  'game-hero-leaderboard-title-color': lightTheme.screenLightBlue.textBold,
  'game-hero-leaderboard-br-color': lightTheme.screenLightBlue.navBg,
  'game-more-info-btn-text-color': lightTheme.screenLightBlue.textBold,
  'game-leaderboard-button-bg': lightTheme.screenBlue.btnBg,
  'game-level-indicator-btn-bg': `${lightTheme.utilColors.dark}ad`,
  'game-card-body-bg': lightTheme.screenLightBlue.btnBg,
  'game-play-btn-text-color': lightTheme.screenLightBlue.textBold,
  'game-level-progress-bar-bg': lightTheme.screenLightBlue.bodyBg,
  'game-level-progress-gradient-1': Blue.color500,
  'game-level-progress-gradient-2': LightBlue.color500,
  'game-body-bg': darkTheme.screenLightBlue.bodyBg,
  'game-nav-bg': darkTheme.screenLightBlue.navBg,
  'game-nav-active-bg': darkTheme.screenLightBlue.navActiveBg,
};

const cssvars = {
  'game-text-color-1': '--game-text-color-1',
  'game-btn-bg': '--game-btn-bg',
  'game-body-bg': '--game-body-bg',
  'game-nav-bg': '--game-nav-bg',
  'game-nav-active-bg': '--game-nav-active-bg',
  'game-hero-card-box-shadow': '--game-hero-card-box-shadow',
  'game-hero-leaderboard-title-color': '--game-hero-leaderboard-title-color',
  'game-hero-leaderboard-br-color': '--game-hero-leaderboard-br-color',
  'game-leaderboard-button-bg': '--game-leaderboard-button-bg',
  'game-leaderboard-heading-text-color': '--game-leaderboard-heading-text-color',
  'game-more-info-btn-text-color': '--game-more-info-btn-text-color',
  'game-card-body-bg': '--game-card-body-bg',
  'game-play-btn-text-color': '--game-play-btn-text-color',
  'game-level-progress-bar-bg': '--game-level-progress-bar-bg',
  'game-level-progress-gradient-1': '--game-level-progress-gradient-1',
  'game-level-progress-gradient-2': '--game-level-progress-gradient-2',
  'game-level-indicator-btn-bg': '--game-level-indicator-btn-bg',
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
