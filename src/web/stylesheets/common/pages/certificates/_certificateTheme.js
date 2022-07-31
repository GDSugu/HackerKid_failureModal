const { Yellow } = require('../../../../../colors/_colors');
const {
  Theme,
} = require('../../../../javascripts/common/_theme');

const lightTheme = Theme.light;
const darkTheme = Theme.dark;

const thememaplight = {
  'certificate-text-color-1': lightTheme.utilColors.dark,
  'certificate-btn-bg': lightTheme.screenYellow.btnBg,
  'certificate-btn-text-color': Yellow.color900,
  'certificate-body-bg': lightTheme.screenYellow.bodyBg,
  'certificate-nav-bg': lightTheme.screenYellow.navBg,
  'certificate-nav-active-bg': lightTheme.screenYellow.navActiveBg,
};
// just copied the light theme colors to the dark for now
  // TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'certificate-text-color-1': darkTheme.utilColors.dark,
  'certificate-btn-bg': darkTheme.screenYellow.btnBg,
  'certificate-btn-text-color': Yellow.color900,
  'certificate-body-bg': darkTheme.screenYellow.bodyBg,
  'certificate-nav-bg': darkTheme.screenYellow.navBg,
  'certificate-nav-active-bg': darkTheme.screenYellow.navActiveBg,
  'certificate-card-box-shadow-color': '#FFE8B6',
  'certificate-hero-card-box-shadow-color': '#F9A82625',
};

const cssvars = {
  'certificate-text-color-1': '--certificate-text-color-1',
  'certificate-btn-bg': '--certificate-btn-bg',
  'certificate-btn-text-color': '--certificate-btn-text-color',
  'certificate-body-bg': '--certificate-body-bg',
  'certificate-nav-bg': '--certificate-nav-bg',
  'certificate-nav-active-bg': '--certificate-nav-active-bg',
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
