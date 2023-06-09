const {
  Theme,
} = require('../../../../javascripts/common/_theme');
const {
  Blue, LightBlue, Purple, utilColors, Yellow, Green,
} = require('../../../../../colors/_colors');

const lightTheme = Theme.light;
const darkTheme = Theme.dark;

const thememaplight = {
  'dashboard-text-color-1': lightTheme.utilColors.dark,
  'dashboard-text-color-2': lightTheme.screenYellow.fadedBtnTextColor,
  'dashboard-text-color-3': lightTheme.screenYellow.btnBg,
  'dashboard-text-color-4': utilColors.lightGrey,
  'dashboard-btn-bg': lightTheme.screenYellow.btnBg,
  'dashboard-body-bg': lightTheme.screenYellow.bodyBg,
  'dashboard-nav-bg': lightTheme.screenYellow.navBg,
  'dashboard-nav-active-bg': lightTheme.screenYellow.navActiveBg,
  'dashboard-hero-nav-games-bg': LightBlue.color300,
  'dashboard-hero-nav-course-bg': '#6ec399',
  'dashboard-hero-nav-class-bg': Purple.color300,
  'dashboard-hero-nav-challenge-bg': Blue.color300,
  'dashboard-game-card-bg': LightBlue.color50,
  'dashboard-game-btn-bg': LightBlue.color700,
  'dashboard-game-progress-gradient-1': Blue.color500,
  'dashboard-game-progress-gradient-2': LightBlue.color500,
  'dashboard-exclusive-card-bg': Green.color50,
  'dashboard-exclusive-title-color': Green.color700,
  'dashboard-leaderboard-title-bg': Blue.color50,
  'dashboard-leaderboard-title-text': LightBlue.color900,
  'dashboard-leaderboard-btn-color': Blue.color900,
  'dashboard-achievement-title-bg': Yellow.color100,
  'dashboard-achievement-btn-color': Yellow.color900,
  'dashboard-club-title-bg': lightTheme.screenGreen.bodyBg,
  'dashboard-club-btn-color': Green.color900,
  'dashboard-challenges-arrow-color': Yellow.color900,
  'dashboard-hero-shadow': '0 4px 16px #f9a82625',
  'price-light-green-bg': '#E5F4ED',
  'price-dark-green-color': '#178958',
};
// just copied the light theme colors to the dark for now
  // TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'dashboard-text-color-1': darkTheme.utilColors.dark,
  'dashboard-text-color-2': darkTheme.screenYellow.fadedBtnTextColor,
  'dashboard-text-color-3': darkTheme.screenYellow.btnBg,
  'dashboard-text-color-4': utilColors.lightGrey,
  'dashboard-btn-bg': darkTheme.screenYellow.btnBg,
  'dashboard-body-bg': darkTheme.screenYellow.bodyBg,
  'dashboard-nav-bg': darkTheme.screenYellow.navBg,
  'dashboard-nav-active-bg': darkTheme.screenYellow.navActiveBg,
  'dashboard-hero-nav-games-bg': LightBlue.color300,
  'dashboard-hero-nav-course-bg': '#6ec399',
  'dashboard-hero-nav-class-bg': Purple.color300,
  'dashboard-hero-nav-challenge-bg': Blue.color300,
  'dashboard-game-card-bg': LightBlue.color50,
  'dashboard-game-btn-bg': LightBlue.color700,
  'dashboard-game-progress-gradient-1': Blue.color500,
  'dashboard-game-progress-gradient-2': LightBlue.color500,
  'dashboard-exclusive-card-bg': Green.color50,
  'dashboard-exclusive-title-color': Green.color700,
  'dashboard-leaderboard-title-bg': Blue.color50,
  'dashboard-leaderboard-title-text': LightBlue.color900,
  'dashboard-leaderboard-btn-color': Blue.color900,
  'dashboard-achievement-title-bg': Yellow.color100,
  'dashboard-achievement-btn-color': Yellow.color900,
  'dashboard-club-title-bg': lightTheme.screenGreen.bodyBg,
  'dashboard-club-btn-color': Green.color900,
  'dashboard-challenges-arrow-color': Yellow.color900,
  'dashboard-hero-shadow': '0 4px 16px #f9a82625',
  'price-light-green-bg': '#E5F4ED',
  'price-dark-green-color': '#178958',
};

const cssvars = {
  'dashboard-text-color-1': '--dashboard-text-color-1',
  'dashboard-text-color-2': '--dashboard-text-color-2',
  'dashboard-text-color-3': '--dashboard-text-color-3',
  'dashboard-text-color-4': '--dashboard-text-color-4',
  'dashboard-btn-bg': '--dashboard-btn-bg',
  'dashboard-body-bg': '--dashboard-body-bg',
  'dashboard-nav-bg': '--dashboard-nav-bg',
  'dashboard-nav-active-bg': '--dashboard-nav-active-bg',
  'dashboard-hero-nav-games-bg': '--dashboard-hero-nav-games-bg',
  'dashboard-hero-nav-course-bg': '--dashboard-hero-nav-course-bg',
  'dashboard-hero-nav-class-bg': '--dashboard-hero-nav-class-bg',
  'dashboard-hero-nav-challenge-bg': '--dashboard-hero-nav-challenge-bg',
  'dashboard-game-card-bg': '--dashboard-game-card-bg',
  'dashboard-game-btn-bg': '--dashboard-game-btn-bg',
  'dashboard-game-progress-gradient-1': '--dashboard-game-progress-gradient-1',
  'dashboard-game-progress-gradient-2': '--dashboard-game-progress-gradient-2',
  'dashboard-exclusive-card-bg': '--dashboard-exclusive-card-bg',
  'dashboard-exclusive-title-color': '--dashboard-exclusive-title-color',
  'dashboard-leaderboard-title-bg': '--dashboard-leaderboard-title-bg',
  'dashboard-leaderboard-title-text': '--dashboard-leaderboard-title-text',
  'dashboard-leaderboard-btn-color': '--dashboard-leaderboard-btn-color',
  'dashboard-achievement-title-bg': '--dashboard-achievement-title-bg',
  'dashboard-achievement-btn-color': '--dashboard-achievement-btn-color',
  'dashboard-club-title-bg': '--dashboard-club-title-bg',
  'dashboard-club-btn-color': '--dashboard-club-btn-color',
  'dashboard-challenges-arrow-color': '--dashboard-challenges-arrow-color',
  'dashboard-hero-shadow': '--dashboard-hero-shadow',
  'price-light-green-bg': '--price-light-green-bg',
  'price-dark-green-color': '--price-dark-green-color',
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
