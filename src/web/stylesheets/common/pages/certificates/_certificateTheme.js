const { Yellow } = require('../../../../../colors/_colors');
const {
  Theme,
} = require('../../../../javascripts/common/_theme');

const lightTheme = Theme.light;
const darkTheme = Theme.dark;

const thememaplight = {
  'certificates-text-color-1': lightTheme.utilColors.dark,
  'certificates-btn-bg': lightTheme.screenYellow.btnBg,
  'certificates-btn-text-color': Yellow.color900,
  'certificates-body-bg': lightTheme.screenYellow.bodyBg,
  'certificates-nav-bg': lightTheme.screenYellow.navBg,
  'certificates-nav-active-bg': lightTheme.screenYellow.navActiveBg,
  'certificates-controls-border-color': Yellow.color400,
  'certificates-box-shadow-color': lightTheme.utilColors.shadowColor2,
  'certificates-list-bg': lightTheme.utilColors.white,
  'certificate-student-name-color': '#F55151',
  'certificate-border-bottom-color': lightTheme.utilColors.tertiary,
  'certificate-modal-close-btn-bg': lightTheme.utilColors.disposableIconBg,
};
// just copied the light theme colors to the dark for now
// TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'certificates-text-color-1': darkTheme.utilColors.dark,
  'certificates-btn-bg': darkTheme.screenYellow.btnBg,
  'certificates-btn-text-color': Yellow.color900,
  'certificates-body-bg': darkTheme.screenYellow.bodyBg,
  'certificates-nav-bg': darkTheme.screenYellow.navBg,
  'certificates-nav-active-bg': darkTheme.screenYellow.navActiveBg,
  'certificates-card-box-shadow-color': '#FFE8B6',
  'certificates-hero-card-box-shadow-color': '#F9A82625',
  'certificates-controls-border-color': Yellow.color400,
  'certificates-box-shadow-color': darkTheme.utilColors.shadowColor2,
  'certificates-list-bg': lightTheme.utilColors.white,
  'certificate-student-name-color': '#F55151',
  'certificate-border-bottom-color': lightTheme.utilColors.tertiary,
  'certificate-modal-close-btn-bg': lightTheme.utilColors.disposableIconBg,
};

const cssvars = {
  'certificates-text-color-1': '--certificates-text-color-1',
  'certificates-btn-bg': '--certificates-btn-bg',
  'certificates-btn-text-color': '--certificates-btn-text-color',
  'certificates-body-bg': '--certificates-body-bg',
  'certificates-nav-bg': '--certificates-nav-bg',
  'certificates-nav-active-bg': '--certificates-nav-active-bg',
  'certificates-controls-border-color': '--certificates-controls-border-color',
  'certificates-box-shadow-color': '--certificates-box-shadow-color',
  'certificates-list-bg': '--certificates-list-bg',
  'certificate-student-name-color': ' --certificate-student-name-color',
  'certificate-border-bottom-color': '--certificate-border-bottom-color',
  'certificate-modal-close-btn-bg': '--certificate-modal-close-btn-bg',
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
