const {
  Theme,
} = require('../../../../javascripts/common/_theme');

const lightTheme = Theme.light;
const darkTheme = Theme.dark;

const thememaplight = {
  'leaderboard-text-color-1': lightTheme.utilColors.dark,
  'leaderboard-btn-bg': lightTheme.screenYellow.btnBg,
  'leaderboard-body-bg': lightTheme.screenYellow.bodyBg,
  'leaderboard-nav-bg': lightTheme.screenYellow.navBg,
  'leaderboard-nav-active-bg': lightTheme.screenYellow.navActiveBg,
  'leaderboard-control-border-color': lightTheme.screenYellow.leaderBoardControlsBorderColor,
  'leaderboard-user-highlight-color': lightTheme.screenYellow.leaderBoardHighlightEntryColor,
};
// just copied the light theme colors to the dark for now
  // TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'leaderboard-text-color-1': darkTheme.utilColors.dark,
  'leaderboard-btn-bg': darkTheme.screenYellow.btnBg,
  'leaderboard-body-bg': darkTheme.screenYellow.bodyBg,
  'leaderboard-nav-bg': darkTheme.screenYellow.navBg,
  'leaderboard-nav-active-bg': darkTheme.screenYellow.navActiveBg,
};

const cssvars = {
  'leaderboard-text-color-1': '--leaderboard-text-color-1',
  'leaderboard-btn-bg': '--leaderboard-btn-bg',
  'leaderboard-body-bg': '--leaderboard-body-bg',
  'leaderboard-nav-bg': '--leaderboard-nav-bg',
  'leaderboard-nav-active-bg': '--leaderboard-nav-active-bg',
  'leaderboard-control-border-color': '--leaderboard-control-border-color',
  'leaderboard-user-highlight-color': '--leaderboard-user-highlight-color',
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
