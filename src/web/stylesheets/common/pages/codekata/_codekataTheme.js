const {
  LightBlue, Yellow, Purple, utilColors,
} = require('../../../../../colors/_colors');
const {
  cssvars: gameCssVars,
  thememapdark: gameThemeMapDark,
  thememaplight: gameThemeMapLight,
} = require('../games/_gameTheme');

const thememaplight = {
  'game-btn-text-color': LightBlue.color900,
  'game-btn-shadow': '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
  'game-transparent-bg': 'rgba(255, 255, 255, 0.9)',
  'game-question-title-bg': Yellow.color200,
  'game-input-border-color': Yellow.color100,
  'game-leaderboard-btn-bg': Purple.color500,
  'game-hint-btn-bg': Yellow.color700,
  'game-run-btn': Yellow.color900,
  'game-nav-active-color': LightBlue.color300,
  'game-modal-close-btn-bg': utilColors.disposableIconBg,
  'game-white-gradient-bg': 'linear-gradient(90deg, #fff, #fff)',
  ...gameThemeMapLight,
};

// just copied the light theme colors to the dark for now
// TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'game-btn-text-color': LightBlue.color900,
  'game-btn-shadow': '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
  'game-transparent-bg': 'rgba(255, 255, 255, 0.9)',
  'game-question-title-bg': Yellow.color200,
  'game-input-border-color': Yellow.color100,
  'game-leaderboard-btn-bg': Purple.color500,
  'game-hint-btn-bg': Yellow.color700,
  'game-run-btn': Yellow.color900,
  'game-nav-active-color': LightBlue.color300,
  'game-modal-close-btn-bg': utilColors.disposableIconBg,
  'game-white-gradient-bg': 'linear-gradient(90deg, #fff, #fff)',
  ...gameThemeMapDark,
};

const cssvars = {
  'game-btn-text-color': '--game-btn-text-color',
  'game-btn-shadow': '--game-btn-shadow',
  'game-transparent-bg': '--game-transparent-bg',
  'game-question-title-bg': '--game-question-title-bg',
  'game-leaderboard-btn-bg': '--game-leaderboard-btn-bg',
  'game-input-border-color': '--game-input-border-color',
  'game-hint-btn-bg': '--game-hint-btn-bg',
  'game-run-btn': '--game-run-btn',
  'game-nav-active-color': '--game-nav-active-color',
  'game-modal-close-btn-bg': '--game-modal-close-btn-bg',
  'game-white-gradient-bg': '--game-white-gradient-bg',
  ...gameCssVars,
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
