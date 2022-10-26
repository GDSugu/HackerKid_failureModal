const { LightBlue, Purple } = require('../../../../../colors/_colors');
const {
  cssvars: gameCssVars,
  thememapdark: gameThemeMapDark,
  thememaplight: gameThemeMapLight,
} = require('../games/_gameTheme');

const {
  Theme,
} = require('../../../../javascripts/common/_theme');

const thememaplight = {
  'game-btn-text-color': LightBlue.color900,
  'game-btn-shadow': '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
  'game-leaderboard-btn-bg': Purple.color500,
  'game-label-color': Theme.light.utilColors.grey,
  ...gameThemeMapLight,
};

// just copied the light theme colors to the dark for now
// TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'game-btn-text-color': LightBlue.color900,
  'game-btn-shadow': '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
  'game-leaderboard-btn-bg': Purple.color500,
  'game-label-color': Theme.light.utilColors.grey,
  ...gameThemeMapDark,
};

const cssvars = {
  'game-btn-text-color': '--game-btn-text-color',
  'game-btn-shadow': '--game-btn-shadow',
  'game-leaderboard-btn-bg': '--game-leaderboard-btn-bg',
  'game-label-color': '--game-label-color',
  ...gameCssVars,
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
