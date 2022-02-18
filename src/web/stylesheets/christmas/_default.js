const {
  utilColors,
  LightBlue,
  Blue,
  Green,
  Yellow,
  Red,
} = require('../../../colors/_colors');

const themeMapLight = {
  'text-color-1': utilColors.white,
  'text-color-2': utilColors.dark,
  'text-color-3': utilColors.grey,
  'text-color-4': utilColors.dimGrey,
  'text-color-5': utilColors.lightGrey,
  'text-color-6': utilColors.tertiary,
  'nav-bg-blue': Blue.color500,
  'nav-bg-green': Green.color500,
  'nav-bg-lightBlue': LightBlue.color500,
  'nav-bg-red': Red.color500,
  'nav-bg-yellow': Yellow.color500,
  'body-bg-blue': Blue.color50,
  'body-bg-green': Green.color50,
  'body-bg-lightBlue': LightBlue.color50,
  'body-bg-red': Red.color500,
  'body-bg-yellow': Yellow.color50,
};
// just copied the light theme colors to the dark for now
  // TODO: make this a real dark theme with appropriate colors
const themeMapDark = {
  'text-color-1': utilColors.white,
  'text-color-2': utilColors.dark,
  'text-color-3': utilColors.grey,
  'text-color-4': utilColors.dimGrey,
  'text-color-5': utilColors.lightGrey,
  'text-color-6': utilColors.tertiary,
  'nav-bg-blue': Blue.color500,
  'nav-bg-green': Green.color500,
  'nav-bg-lightBlue': LightBlue.color500,
  'nav-bg-red': Red.color500,
  'nav-bg-yellow': Yellow.color500,
  'body-bg-blue': Blue.color50,
  'body-bg-green': Green.color50,
  'body-bg-lightBlue': LightBlue.color50,
  'body-bg-red': Red.color50,
  'body-bg-yellow': Yellow.color50,
};

const cssVars = {
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
  themeMapLight,
  themeMapDark,
  cssVars,
};
