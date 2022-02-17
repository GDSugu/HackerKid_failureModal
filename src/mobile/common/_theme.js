const {
  Blue,
  Green,
  LightBlue,
  Purple,
  Red,
  utilColors,
  Yellow,
} = require('../../colors/_colors');

const Theme = {
  light: {
    screenBlue: {
      navBg: Blue.color500,
      bodyBg: Blue.color50,
    },
    screenGreen: {
      navBg: Green.color500,
      bodyBg: Green.color50,
    },
    screenLightBlue: {
      navBg: LightBlue.color500,
      bodyBg: LightBlue.color50,
    },
    screenPurple: {
      navBg: Purple.color500,
      bodyBg: Purple.color50,
    },
    screenRed: {
      navBg: Red.color500,
      bodyBg: Red.color50,
    },
    screenYellow: {
      navBg: Yellow.color500,
      bodyBg: Yellow.color50,
    },
    textColor1: utilColors.white,
    textColor2: utilColors.dark,
    textColor3: utilColors.grey,
    textColor4: utilColors.dimGrey,
    textColor5: utilColors.lightGrey,
    textColor6: utilColors.tertiary,
  },
  // just copied the light theme colors to the dark for now
  // TODO: make this a real dark theme with appropriate colors
  dark: {
    screenBlue: {
      navBg: Blue.color500,
      bodyBg: Blue.color50,
    },
    screenGreen: {
      navBg: Green.color500,
      bodyBg: Green.color50,
    },
    screenLightBlue: {
      navBg: LightBlue.color500,
      bodyBg: LightBlue.color50,
    },
    screenPurple: {
      navBg: Purple.color500,
      bodyBg: Purple.color50,
    },
    screenRed: {
      navBg: Red.color500,
      bodyBg: Red.color50,
    },
    screenYellow: {
      navBg: Yellow.color500,
      bodyBg: Yellow.color50,
    },
    textColor1: utilColors.white,
    textColor2: utilColors.dark,
    textColor3: utilColors.grey,
    textColor4: utilColors.dimGrey,
    textColor5: utilColors.lightGrey,
    textColor6: utilColors.tertiary,
  },
};

module.exports = {
  Theme,
};
