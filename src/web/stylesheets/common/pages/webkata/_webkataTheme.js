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
  'webkata-bg-1': Theme.light.utilColors.black,
  'webkata-bg-2': Theme.light.utilColors.white,
  'webkata-bg-3': Theme.light.utilColors.grey,
  'webkata-text-color-1': Theme.light.utilColors.white,
  'webkata-text-color-2': Theme.light.utilColors.lightGrey,
  'webkata-run-btn-bg': Theme.light.screenYellow.fadedBtnTextColor,
  'webkata-code-editor-transparent-bg': '#00000061',
  'webkata-background-img-gradient-color-1': '#242b2c',
  'webkata-background-img-gradient-color-2': 'rgba(0, 0, 0, 0)',
  ...gameThemeMapLight,
};

// just copied the light theme colors to the dark for now
// TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'game-btn-text-color': LightBlue.color900,
  'game-btn-shadow': '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
  'game-leaderboard-btn-bg': Purple.color500,
  'game-label-color': Theme.light.utilColors.grey,
  'webkata-bg-1': Theme.light.utilColors.black,
  'webkata-bg-2': Theme.light.utilColors.white,
  'webkata-bg-3': Theme.light.utilColors.grey,
  'webkata-text-color-1': Theme.light.utilColors.white,
  'webkata-text-color-2': Theme.light.utilColors.lightGrey,
  'webkata-run-btn-bg': Theme.light.screenYellow.fadedBtnTextColor,
  'webkata-code-editor-transparent-bg': '#00000061',
  'webkata-background-img-gradient-color-1': '#242b2c',
  'webkata-background-img-gradient-color-2': 'rgba(0, 0, 0, 0)',
  ...gameThemeMapDark,
};

const cssvars = {
  'game-btn-text-color': '--game-btn-text-color',
  'game-btn-shadow': '--game-btn-shadow',
  'game-leaderboard-btn-bg': '--game-leaderboard-btn-bg',
  'game-label-color': '--game-label-color',
  'webkata-bg-1': '--webkata-bg-1',
  'webkata-bg-2': '--webkata-bg-2',
  'webkata-bg-3': '--webkata-bg-3',
  'webkata-run-btn-bg': '--webkata-run-btn-bg',
  'webkata-text-color-1': '--webkata-text-color-1',
  'webkata-text-color-2': '--webkata-text-color-2',
  'webkata-code-editor-transparent-bg': '--webkata-code-editor-transparent-bg',
  'webkata-background-img-gradient-color-1': '--webkata-background-img-gradient-color-1',
  'webkata-background-img-gradient-color-2': '--webkata-background-img-gradient-color-2',
  ...gameCssVars,
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
