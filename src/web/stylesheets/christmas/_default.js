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

module.exports = {
  themeMapLight: {
    name: 'themeMapLight',
    theme: JSON.parse(JSON.stringify(themeMapLight)),
  },
  themeMapDark: {
    name: 'themeMapDark',
    theme: JSON.parse(JSON.stringify(themeMapDark)),
  },
};
