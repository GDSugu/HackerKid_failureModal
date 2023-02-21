const { Yellow } = require('../../../../../colors/_colors');
const {
  Theme,
} = require('../../../../javascripts/common/_theme');

const lightTheme = Theme.light;
const darkTheme = Theme.dark;

const thememaplight = {
  'home-body-bg': lightTheme.screenYellow.bodyBg,
  'landing-header-bg': lightTheme.utilColors.dark,
  'landing-yellow-color': lightTheme.screenYellow.btnBg,
  'landing-yellow-light-color': lightTheme.screenYellow.leaderBoardHighlightEntryColor,
  'landing-black-color': lightTheme.utilColors.black,
  'landing-text-color': '#505659',
  'landing-green-color': lightTheme.screenGreen.btnBg,
  'landing-faq-head-color': lightTheme.screenGreen.btnBg,
  'landing-border-color': lightTheme.utilColors.lightGrey,
  'landing-white-color': lightTheme.utilColors.white,
  'landing-blue-light-color': lightTheme.screenLightBlue.bodyBg,
  'landing-blue-color': lightTheme.screenLightBlue.navBg,
  'landing-grey-light-color': '#EFEFEF',
  'landing-red-light-color': lightTheme.utilColors.disposableIconBg,
  'landing-input-border-color': Yellow.color300,
  'landing-modal-title-color': lightTheme.screenYellow.fadedBtnTextColor,
};
// just copied the light theme colors to the dark for now
// TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'home-body-bg': darkTheme.screenYellow.bodyBg,
  'landing-header-bg': darkTheme.utilColors.dark,
  'landing-yellow-color': darkTheme.screenYellow.btnBg,
  'landing-yellow-light-color': darkTheme.screenYellow.leaderBoardHighlightEntryColor,
  'landing-black-color': darkTheme.utilColors.black,
  'landing-text-color': '#505659',
  'landing-green-color': darkTheme.screenGreen.btnBg,
  'landing-faq-head-color': darkTheme.screenGreen.btnBg,
  'landing-border-color': darkTheme.utilColors.lightGrey,
  'landing-white-color': darkTheme.utilColors.white,
  'landing-blue-light-color': darkTheme.screenLightBlue.bodyBg,
  'landing-blue-color': darkTheme.screenLightBlue.navBg,
  'landing-grey-light-color': '#EFEFEF',
  'landing-red-light-color': darkTheme.utilColors.disposableIconBg,
  'landing-input-border-color': Yellow.color300,
  'landing-modal-title-color': darkTheme.screenYellow.fadedBtnTextColor,
};

const cssvars = {
  'home-body-bg': '--home-body-bg',
  'landing-header-bg': '--landing-header-bg',
  'landing-yellow-color': '--landing-yellow-color',
  'landing-black-color': '--landing-black-color',
  'landing-text-color': '--landing-text-color',
  'landing-green-color': '--landing-green-color',
  'landing-faq-head-color': '--landing-faq-head-color',
  'landing-yellow-light-color': '--landing-yellow-light-color',
  'landing-border-color': '--landing-border-color',
  'landing-white-color': '--landing-white-color',
  'landing-blue-light-color': '--landing-blue-light-color',
  'landing-blue-color': '--landing-blue-color',
  'landing-grey-light-color': '--landing-grey-light-color',
  'landing-red-light-color': '--landing-red-light-color',
  'landing-input-border-color': '--landing-input-border-color',
  'landing-modal-title-color': '--landing-modal-title-color',
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
