const {
  Blue,
  Green,
  LightBlue,
  Purple,
  Red,
  utilColors,
  Yellow,
  gradients,
} = require('../../../colors/_colors');

const Theme = {
  light: {
    screenBlue: {
      bodyBg: Blue.color50,
      navBg: Blue.color500,
      navActiveBg: Blue.color600,
      btnBg: Blue.color700,
      btnDarkBg: Blue.color900,
      transparentBlue: '#004BDD26',
      modalHeaderBg: Blue.color200,
    },
    screenGreen: {
      bodyBg: Green.color50,
      navBg: Green.color500,
      navActiveBg: Green.color600,
      btnBg: Green.color700,
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
    },
    screenRed: {
      bodyBg: Red.color50,
      navBg: Red.color500,
      navActiveBg: Red.color600,
      btnBg: Red.color700,
    },
    screenYellow: {
      bodyBg: Yellow.color50,
      navBg: Yellow.color500,
      navActiveBg: Yellow.color600,
      btnBg: Yellow.color700,
      inputBorderColor: Yellow.color700,
      fadedBtnBg: Yellow.color50,
      fadedBtnTextColor: Yellow.color900,
      leaderBoardControlsBorderColor: Yellow.color400,
      leaderBoardHighlightEntryColor: Yellow.color100,
    },
    utilColors,
  },
  // just copied the light theme colors to the dark for now
  // TODO: make this a real dark theme with appropriate colors
  dark: {
    screenBlue: {
      bodyBg: Blue.color50,
      navBg: Blue.color500,
      navActiveBg: Blue.color600,
      btnBg: Blue.color700,
      btnDarkBg: Blue.color900,
      transparentBlue: '#004BDD26',
      modalHeaderBg: Blue.color200,
    },
    screenGreen: {
      bodyBg: Green.color50,
      navBg: Green.color500,
      navActiveBg: Green.color600,
      btnBg: Green.color700,
    },
    screenLightBlue: {
      bodyBg: LightBlue.color50,
      navBg: LightBlue.color500,
      navActiveBg: LightBlue.color600,
      btnBg: LightBlue.color700,
      levelProgressGradient: gradients.blue,
      textBold: LightBlue.color900,
    },
    screenPurple: {
      bodyBg: Purple.color50,
      navBg: Purple.color500,
      navActiveBg: Purple.color600,
      btnBg: Purple.color700,
    },
    screenRed: {
      bodyBg: Red.color50,
      navBg: Red.color500,
      navActiveBg: Red.color600,
      btnBg: Red.color700,
    },
    screenYellow: {
      bodyBg: Yellow.color50,
      navBg: Yellow.color500,
      navActiveBg: Yellow.color600,
      btnBg: Yellow.color700,
    },
    utilColors,
  },
};

module.exports = {
  Theme,
};
