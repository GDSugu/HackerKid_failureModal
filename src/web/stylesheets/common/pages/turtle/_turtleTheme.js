const { LightBlue } = require('../../../../../colors/_colors');
const {
  cssvars: gameCssVars,
  thememapdark: gameThemeMapDark,
  thememaplight: gameThemeMapLight,
} = require('../games/_gameTheme');

const thememaplight = {
  'game-btn-text-color': LightBlue.color900,
  ...gameThemeMapLight,
};

// just copied the light theme colors to the dark for now
// TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'game-btn-text-color': LightBlue.color900,
  ...gameThemeMapDark,
};

const cssvars = {
  'game-btn-text-color': '--game-btn-text-color',
  ...gameCssVars,
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
