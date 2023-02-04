const {
  Theme,
} = require('../../../../javascripts/common/_theme');

const lightTheme = Theme.light;
const darkTheme = Theme.dark;

const thememaplight = {
  'ide-nav-bg': lightTheme.screenYellow.navBg,
  'ide-nav-active-bg': lightTheme.screenYellow.navActiveBg,
  'ide-bg-1': '#111212',
  'ide-bg-2': lightTheme.utilColors.dark,
  'ide-text-color-1': lightTheme.utilColors.lightGrey,
  'ide-text-color-2': lightTheme.screenYellow.navBg,
  'ide-btn-bg': lightTheme.screenYellow.fadedBtnTextColor,
};
// just copied the light theme colors to the dark for now
  // TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'ide-nav-bg': darkTheme.screenYellow.navBg,
  'ide-nav-active-bg': darkTheme.screenYellow.navActiveBg,
  'ide-bg-1': '#111212',
  'ide-bg-2': darkTheme.utilColors.dark,
  'ide-text-color-1': darkTheme.utilColors.lightGrey,
  'ide-text-color-2': lightTheme.screenYellow.leaderBoardControlsBorderColor,
  'ide-btn-bg': darkTheme.screenYellow.fadedBtnTextColor,
};

const cssvars = {
  'ide-nav-bg': '--ide-nav-bg',
  'ide-nav-active-bg': '--ide-nav-active-bg',
  'ide-bg-1': '--ide-bg-1',
  'ide-bg-2': '--ide-bg-2',
  'ide-text-color-1': '--ide-text-color-1',
  'ide-text-color-2': '--ide-text-color-2',
  'ide-btn-bg': '--ide-btn-bg',
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
