const {
  Blue,
  gradients,
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
      bodyBg: Blue.color50,
      navBg: Blue.color500,
      navActiveBg: Blue.color600,
      btnBg: Blue.color700,
      textBold: Blue.color900,
    },
    screenGreen: {
      bodyBg: Green.color50,
      navBg: Green.color500,
      navActiveBg: Green.color600,
      btnBg: Green.color700,
      textBold: Green.color900,
    },
    screenLightBlue: {
      bodyBg: LightBlue.color50,
      navBg: LightBlue.color500,
      navActiveBg: LightBlue.color600,
      btnBg: LightBlue.color700,
      textBold: LightBlue.color900,
    },
    screenPurple: {
      bodyBg: Purple.color50,
      navBg: Purple.color500,
      navActiveBg: Purple.color600,
      btnBg: Purple.color700,
      textBold: Purple.color900,
    },
    screenRed: {
      bodyBg: Red.color50,
      navBg: Red.color500,
      navActiveBg: Red.color600,
      btnBg: Red.color700,
      textBold: Red.color900,
    },
    screenYellow: {
      bodyBg: Yellow.color50,
      navBg: Yellow.color500,
      navActiveBg: Yellow.color600,
      btnBg: Yellow.color700,
      inputBorderColor: Yellow.color700,
      fadedBtnBg: Yellow.color50,
      fadedBtnTextColor: Yellow.color900,
      loginTabInactiveBorder: Yellow.color100,
      textBold: Yellow.color900,
    },
    utilColors,
    gradients,
  },
  // just copied the light theme colors to the dark for now
  // TODO: make this a real dark theme with appropriate colors
  dark: {
    screenBlue: {
      bodyBg: Blue.color50,
      navBg: Blue.color500,
      navActiveBg: Blue.color600,
      btnBg: Blue.color700,
      textBold: Blue.color900,
    },
    screenGreen: {
      bodyBg: Green.color50,
      navBg: Green.color500,
      navActiveBg: Green.color600,
      btnBg: Green.color700,
      textBold: Green.color900,
    },
    screenLightBlue: {
      bodyBg: LightBlue.color50,
      navBg: LightBlue.color500,
      navActiveBg: LightBlue.color600,
      btnBg: LightBlue.color700,
      textBold: LightBlue.color900,
    },
    screenPurple: {
      bodyBg: Purple.color50,
      navBg: Purple.color500,
      navActiveBg: Purple.color600,
      btnBg: Purple.color700,
      textBold: Purple.color900,
    },
    screenRed: {
      bodyBg: Red.color50,
      navBg: Red.color500,
      navActiveBg: Red.color600,
      btnBg: Red.color700,
      textBold: Red.color900,
    },
    screenYellow: {
      bodyBg: Yellow.color50,
      navBg: Yellow.color500,
      navActiveBg: Yellow.color600,
      btnBg: Yellow.color700,
      inputBorderColor: Yellow.color700,
      fadedBtnBg: Yellow.color50,
      fadedBtnTextColor: Yellow.color900,
      textBold: Yellow.color900,
    },
    utilColors,
    gradients,
  },
};

module.exports = {
  Theme,
};
