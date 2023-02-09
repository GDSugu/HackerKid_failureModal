const {
  Yellow, LightBlue, utilColors, Red, Purple,
} = require('../../../../../colors/_colors');
const {
  Theme,
} = require('../../../../javascripts/common/_theme');

const lightTheme = Theme.light;
const darkTheme = Theme.dark;

const thememaplight = {
  'price-text-color-1': lightTheme.utilColors.dark,
  'price-btn-bg': lightTheme.screenYellow.btnBg,
  'price-btn-text-color': Yellow.color900,
  'price-body-bg': lightTheme.screenYellow.bodyBg,
  'price-nav-bg': lightTheme.screenYellow.navBg,
  'price-nav-active-bg': lightTheme.screenYellow.navActiveBg,
  'price-ide-btn-bg': LightBlue.color900,
  'price-modal-header-bg': Yellow.color200,
  'price-modal-close-btn-bg': utilColors.disposableIconBg,
  'price-card-box-shadow-color': '#FFE8B6',
  'price-hero-card-box-shadow-color': '#F9A82625',
  'price-award-card-bg': utilColors.bg2,
  'price-navigation-card-text-color': Theme.light.screenYellow.fadedBtnTextColor,
  'price-common-gradient-color-1': Red.color500,
  'price-common-gradient-color-2': Yellow.color600,
  'price-rare-gradient-color-1': Purple.color900,
  'price-rare-gradient-color-2': Purple.color500,
  'nav-color': Yellow.color500,
  'price-bule-light': '#DFF8FE',
  'price-current-pln-btn': '#F5F5F5',
  'price-current-pln-btn-color': '#505659',
  'price-current-free': '#A9ABAC',
  'price-light-border': '#E0E0E0',
  'price-light-green-bg': '#E5F4ED',
  'price-dark-green-color': '#178958',
  'price-most-popular-tbg': '#FF423D',
};
// just copied the light theme colors to the dark for now
// TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'price-text-color-1': darkTheme.utilColors.dark,
  'price-btn-bg': darkTheme.screenYellow.btnBg,
  'price-btn-text-color': Yellow.color900,
  'price-body-bg': darkTheme.screenYellow.bodyBg,
  'price-nav-bg': darkTheme.screenYellow.navBg,
  'price-nav-active-bg': darkTheme.screenYellow.navActiveBg,
  'price-ide-btn-bg': LightBlue.color900,
  'price-modal-header-bg': Yellow.color200,
  'price-modal-close-btn-bg': utilColors.disposableIconBg,
  'price-card-box-shadow-color': '#FFE8B6',
  'price-hero-card-box-shadow-color': '#F9A82625',
  'price-award-card-bg': utilColors.bg2,
  'price-navigation-card-text-color': Theme.light.screenYellow.fadedBtnTextColor,
  'price-common-gradient-color-1': Red.color500,
  'price-common-gradient-color-2': Yellow.color600,
  'price-rare-gradient-color-1': Purple.color900,
  'price-rare-gradient-color-2': Purple.color500,
  'nav-color': Yellow.color500,
  'price-current-pln-btn' : '#F5F5F5',
  'price-current-pln-btn-color' : '#505659',
  'price-current-free' : '#A9ABAC',
  'price-bule-light': '#DFF8FE',
  'price-light-border': '#E0E0E0',
  'price-light-green-bg': '#E5F4ED',
  'price-dark-green-color': '#178958',
  'price-most-popular-tbg': '#FF423D',
};

const cssvars = {
  'nav-color': '--nav-color',
  'price-text-color-1': '--price-text-color-1',
  'price-btn-bg': '--price-btn-bg',
  'price-btn-text-color': '--price-btn-text-color',
  'price-body-bg': '--price-body-bg',
  'price-nav-bg': '--price-nav-bg',
  'price-nav-active-bg': '--price-nav-active-bg',
  'price-ide-btn-bg': '--price-ide-btn-bg',
  'price-modal-header-bg': '--price-modal-header-bg',
  'price-modal-close-btn-bg': '--price-modal-close-btn-bg',
  'price-card-box-shadow-color': '--price-card-box-shadow-color',
  'price-hero-card-box-shadow-color': '--price-hero-card-box-shadow-color',
  'price-award-card-bg': '--price-award-card-bg',
  'price-navigation-card-text-color': '--price-navigation-card-text-color',
  'price-common-gradient-color-1': '--price-collectible-gradient-color-1',
  'price-common-gradient-color-2': '--price-collectible-gradient-color-2',
  'price-rare-gradient-color-1': '--price-rare-gradient-color-1',
  'price-rare-gradient-color-2': '--price-rare-gradient-color-2',
  'price-current-pln-btn' : '--price-current-pln-btn',
  'price-current-pln-btn-color' : '--price-current-pln-btn-color',
  'price-current-free' : '--price-current-free',
  'price-bule-light': '--price-bule-light',
  'price-light-border': '--price-light-border',
  'price-light-green-bg': '--price-light-green-bg',
  'price-dark-green-color': '--price-dark-green-color',
  'price-most-popular-tbg': '--price-most-popular-tbg',
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
