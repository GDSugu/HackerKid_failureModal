const {
  Theme,
} = require('../../javascripts/common/_theme');

const thememaplight = {
  'text-color-1': Theme.light.utilColors.white,
  'text-color-2': Theme.light.utilColors.dark,
  'text-color-3': Theme.light.utilColors.grey,
  'text-color-4': Theme.light.utilColors.dimGrey,
  'text-color-5': Theme.light.utilColors.lightGrey,
  'text-color-6': Theme.light.utilColors.tertiary,
  'nav-bg-blue': Theme.light.screenBlue.navBg,
  'nav-bg-green': Theme.light.screenGreen.navBg,
  'nav-bg-lightBlue': Theme.light.screenLightBlue.navBg,
  'nav-bg-red': Theme.light.screenRed.navBg,
  'nav-bg-yellow': Theme.light.screenYellow.navBg,
  'body-bg-blue': Theme.light.screenBlue.bodyBg,
  'body-bg-green': Theme.light.screenGreen.bodyBg,
  'body-bg-lightBlue': Theme.light.screenLightBlue.bodyBg,
  'body-bg-red': Theme.light.screenRed.bodyBg,
  'body-bg-yellow': Theme.light.screenYellow.bodyBg,
};
// just copied the light theme colors to the dark for now
  // TODO: make this a real dark theme with appropriate colors
const thememapdark = {
  'text-color-1': Theme.dark.utilColors.white,
  'text-color-2': Theme.dark.utilColors.dark,
  'text-color-3': Theme.dark.utilColors.grey,
  'text-color-4': Theme.dark.utilColors.dimGrey,
  'text-color-5': Theme.dark.utilColors.lightGrey,
  'text-color-6': Theme.dark.utilColors.tertiary,
  'nav-bg-blue': Theme.dark.screenBlue.navBg,
  'nav-bg-green': Theme.dark.screenGreen.navBg,
  'nav-bg-lightBlue': Theme.dark.screenLightBlue.navBg,
  'nav-bg-red': Theme.dark.screenRed.navBg,
  'nav-bg-yellow': Theme.dark.screenYellow.navBg,
  'body-bg-blue': Theme.dark.screenBlue.bodyBg,
  'body-bg-green': Theme.dark.screenGreen.bodyBg,
  'body-bg-lightBlue': Theme.dark.screenLightBlue.bodyBg,
  'body-bg-red': Theme.dark.screenRed.bodyBg,
  'body-bg-yellow': Theme.dark.screenYellow.bodyBg,
};

const cssvars = {
  'text-color-1': '--text-color-1',
  'text-color-2': '--text-color-2',
  'text-color-3': '--text-color-3',
  'text-color-4': '--text-color-4',
  'text-color-5': '--text-color-5',
  'text-color-6': '--text-color-6',
  'nav-bg-blue': '--nav-bg-blue',
  'nav-bg-green': '--nav-bg-green',
  'nav-bg-lightBlue': '--nav-bg-lightblue',
  'nav-bg-red': '--nav-bg-red',
  'nav-bg-yellow': '--nav-bg-yellow',
  'body-bg-blue': '--body-bg-blue',
  'body-bg-green': '--body-bg-green',
  'body-bg-lightBlue': '--body-bg-lightblue',
  'body-bg-red': '--body-bg-red',
  'body-bg-yellow': '--body-bg-yellow',
};

module.exports = {
  thememapdark,
  thememaplight,
  cssvars,
};
