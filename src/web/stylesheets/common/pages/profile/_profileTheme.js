const { Theme } = require('../../../../javascripts/common/_theme');
const { Yellow } = require('../../../../../colors/_colors');

const lightTheme = Theme.light;
const darkTheme = Theme.dark;

const thememaplight = {
  'profile-text-color-1': lightTheme.utilColors.dark,
  'profile-btn-bg': lightTheme.screenYellow.btnBg,
  'profile-body-bg': lightTheme.utilColors.bg3,
  'profile-mob-body-bg': lightTheme.utilColors.bg2,
  'profile-nav-bg': lightTheme.screenYellow.navBg,
  'profile-card-bg': lightTheme.utilColors.white,
  'profile-input-border-color': Yellow.color300,
};
// just copied the light theme colors to the dark for now
  // TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'profile-text-color-1': darkTheme.utilColors.dark,
  'profile-btn-bg': darkTheme.screenYellow.btnBg,
  'profile-body-bg': darkTheme.utilColors.bg3,
  'profile-mob-body-bg': darkTheme.utilColors.bg2,
  'profile-nav-bg': darkTheme.screenYellow.navBg,
  'profile-card-bg': darkTheme.utilColors.white,
  'profile-input-border-color': Yellow.color300,
};

const cssvars = {
  'profile-text-color-1': '--profile-text-color-1',
  'profile-btn-bg': '--profile-btn-bg',
  'profile-body-bg': '--profile-body-bg',
  'profile-mob-body-bg': '--profile-mob-body-bg',
  'profile-nav-bg': '--profile-nav-bg',
  'profile-card-bg': '--profile-card-bg',
  'profile-input-border-color': '--profile-input-border-color',
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
