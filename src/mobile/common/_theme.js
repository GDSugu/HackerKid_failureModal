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
      notificationBg: Blue.color700,
      btnBg: Blue.color700,
      textBold: Blue.color900,
      bg1: utilColors.white,
      textColor1: utilColors.dark,
      textColor2: utilColors.white,
      borderColor: utilColors.dimGrey,
      loaderBg: Blue.color50,
      loaderBlock1: Blue.color800,
      loaderBlock2: Blue.color600,
      loaderBlock3: Blue.color400,
    },
    screenGreen: {
      bodyBg: Green.color50,
      navBg: Green.color500,
      navActiveBg: Green.color600,
      notificationBg: Green.color700,
      btnBg: Green.color700,
      textBold: Green.color900,
      primaryBtn: Yellow.color900,
      secondaryBtn: Yellow.color700,
      progressBg: Green.color100,
      loaderBg: Green.color50,
      loaderBlock1: Green.color800,
      loaderBlock2: Green.color600,
      loaderBlock3: Green.color400,
    },
    screenLightBlue: {
      bodyBg: LightBlue.color50,
      navBg: LightBlue.color500,
      navActiveBg: LightBlue.color600,
      notificationBg: LightBlue.color700,
      btnBg: LightBlue.color700,
      gameCardBg: LightBlue.color700,
      levelIndicatorBtnBg: `${utilColors.dark}ad`,
      levelProgressBarBackgroundColor: LightBlue.color50,
      levelProgressColor: LightBlue.color900,
      textBold: LightBlue.color900,
      progressBg: LightBlue.color100,
      loaderBg: LightBlue.color50,
      loaderBlock1: LightBlue.color800,
      loaderBlock2: LightBlue.color600,
      loaderBlock3: LightBlue.color400,
    },
    screenPurple: {
      bodyBg: Purple.color50,
      navBg: Purple.color500,
      navActiveBg: Purple.color600,
      notificationBg: Purple.color700,
      btnBg: Purple.color700,
      textBold: Purple.color900,
      loaderBg: Purple.color50,
      loaderBlock1: Purple.color800,
      loaderBlock2: Purple.color600,
      loaderBlock3: Purple.color400,
    },
    screenRed: {
      bodyBg: Red.color50,
      navBg: Red.color500,
      navActiveBg: Red.color600,
      notificationBg: Red.color700,
      btnBg: Red.color700,
      textBold: Red.color900,
      loaderBg: Red.color50,
      loaderBlock1: Red.color800,
      loaderBlock2: Red.color600,
      loaderBlock3: Red.color400,
    },
    screenYellow: {
      bodyBg: Yellow.color50,
      navBg: Yellow.color500,
      navActiveBg: Yellow.color600,
      notificationBg: Yellow.color700,
      btnBg: Yellow.color700,
      inputBorderColor: Yellow.color700,
      borderLight: Yellow.color200,
      borderDark: Yellow.color300,
      fadedBtnBg: Yellow.color50,
      fadedBtnTextColor: Yellow.color900,
      loginTabInactiveBorder: Yellow.color100,
      textBold: Yellow.color900,
      disabledBtnColor: `${Yellow.color700}99`,
      leaderBoardHighlightEntryColor: Yellow.color100,
      loaderBg: Yellow.color50,
      loaderBlock1: Yellow.color800,
      loaderBlock2: Yellow.color600,
      loaderBlock3: Yellow.color400,
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
      notificationBg: Blue.color700,
      btnBg: Blue.color700,
      textBold: Blue.color900,
      bg1: utilColors.white,
      textColor1: utilColors.dark,
      textColor2: utilColors.white,
      borderColor: utilColors.dimGrey,
      loaderBg: Blue.color50,
      loaderBlock1: Blue.color800,
      loaderBlock2: Blue.color600,
      loaderBlock3: Blue.color400,
    },
    screenGreen: {
      bodyBg: Green.color50,
      navBg: Green.color500,
      navActiveBg: Green.color600,
      notificationBg: Green.color700,
      btnBg: Green.color700,
      textBold: Green.color900,
      primaryBtn: Yellow.color900,
      secondaryBtn: Yellow.color700,
      loaderBg: Green.color50,
      loaderBlock1: Green.color800,
      loaderBlock2: Green.color600,
      loaderBlock3: Green.color400,
    },
    screenLightBlue: {
      bodyBg: LightBlue.color50,
      navBg: LightBlue.color500,
      navActiveBg: LightBlue.color600,
      notificationBg: LightBlue.color700,
      btnBg: LightBlue.color700,
      gameCardBg: LightBlue.color700,
      levelIndicatorBtnBg: `${utilColors.dark}ad`,
      levelProgressBarBackgroundColor: LightBlue.color50,
      levelProgressColor: LightBlue.color900,
      textBold: LightBlue.color900,
      progressBg: LightBlue.color100,
      loaderBg: LightBlue.color50,
      loaderBlock1: LightBlue.color800,
      loaderBlock2: LightBlue.color600,
      loaderBlock3: LightBlue.color400,
    },
    screenPurple: {
      bodyBg: Purple.color50,
      navBg: Purple.color500,
      navActiveBg: Purple.color600,
      notificationBg: Purple.color700,
      btnBg: Purple.color700,
      textBold: Purple.color900,
      loaderBg: Purple.color50,
      loaderBlock1: Purple.color800,
      loaderBlock2: Purple.color600,
      loaderBlock3: Purple.color400,
    },
    screenRed: {
      bodyBg: Red.color50,
      navBg: Red.color500,
      navActiveBg: Red.color600,
      notificationBg: Red.color700,
      btnBg: Red.color700,
      textBold: Red.color900,
      loaderBg: Red.color50,
      loaderBlock1: Red.color800,
      loaderBlock2: Red.color600,
      loaderBlock3: Red.color400,
    },
    screenYellow: {
      bodyBg: Yellow.color50,
      navBg: Yellow.color500,
      navActiveBg: Yellow.color600,
      notificationBg: Yellow.color700,
      btnBg: Yellow.color700,
      inputBorderColor: Yellow.color700,
      borderLight: Yellow.color200,
      borderDark: Yellow.color300,
      fadedBtnBg: Yellow.color50,
      fadedBtnTextColor: Yellow.color900,
      loginTabInactiveBorder: Yellow.color100,
      textBold: Yellow.color900,
      disabledBtnColor: `${Yellow.color700}99`,
      leaderBoardHighlightEntryColor: Yellow.color100,
      loaderBg: Yellow.color50,
      loaderBlock1: Yellow.color800,
      loaderBlock2: Yellow.color600,
      loaderBlock3: Yellow.color400,
    },
    utilColors,
    gradients,
  },
};

module.exports = {
  Theme,
};
