import { StyleSheet } from 'react-native';
import { Theme } from '../common/_theme';
import { mobileTypography } from '../../typography/_typography';
import { LightBlue, Yellow } from '../../colors/_colors';

// const font = StyleSheet.create({
//   regular: {
//     fontFamily: fontAveria.regular,
//   },
//   bold: {
//     fontFamily: fontAveria.bold,
//   },
//   xbold: {
//     fontFamily: fontAveria.bold,
//   },
// });
const font = StyleSheet.create(mobileTypography);

const fragmentBtnDisposal = {
  showHeader: true,
  showNav: false,
  viewType: 'fragment',
  disposal: 'btn',
};

const fragmentIconDisposal = {
  showHeader: true,
  showNav: false,
  viewType: 'fragment',
  disposal: 'icon',
};

const screenWithHeader = {
  showHeader: true,
  showNav: true,
  viewType: 'screen',
};

const screenTurtleHeader = {
  showHeader: false,
  showNav: false,
  viewType: 'turtleScreen',
};

const screenChallengesHeader = {
  showHeader: false,
  showNav: false,
  showBackbtn: true,
};

const ScreenSheet = {
  showHeader: false,
  showNav: false,
  viewType: 'screen',
};

const themes = {
  light: {
    screenAchievements: {
      ...Theme.light.screenYellow,
      ...fragmentIconDisposal,
    },
    screenAwardsCollectibles: {
      ...Theme.light.screenYellow,
      ...fragmentIconDisposal,
    },
    screenAskHelp: {
      ...Theme.light.screenYellow,
      ...screenWithHeader,
    },
    screenAssignments: {
      ...Theme.light.screenYellow,
      ...screenWithHeader,
    },
    screenAwards: {
      ...Theme.light.screenYellow,
      ...fragmentIconDisposal,
    },
    screenCertificates: {
      ...Theme.light.screenYellow,
      ...fragmentIconDisposal,
    },
    screenChallenges: {
      ...Theme.light.screenBlue,
      ...screenWithHeader,
    },
    screenAllChallenges: {
      ...Theme.light.screenBlue,
      ...screenChallengesHeader,
    },
    screenYourChallenges: {
      ...Theme.light.screenBlue,
      ...screenChallengesHeader,
    },
    screenYourDraftChallenges: {
      ...Theme.light.screenBlue,
      ...screenChallengesHeader,
    },
    screenClass: {
      ...Theme.light.screenPurple,
      ...screenWithHeader,
    },
    screenClub: {
      ...Theme.light.screenYellow,
      ...fragmentIconDisposal,
    },
    screenClubFeed: {
      ...Theme.light.screenYellow,
      ...fragmentIconDisposal,
    },
    screenClubInfo: {
      ...Theme.light.screenYellow,
      ...fragmentIconDisposal,
    },
    screenCollectibles: {
      ...Theme.light.screenYellow,
      ...fragmentIconDisposal,
    },
    screenCreateClub: {
      ...Theme.light.screenYellow,
      ...fragmentIconDisposal,
    },
    screenDoubts: {
      ...Theme.light.screenYellow,
      ...screenWithHeader,
    },
    screenEditProfile: {
      ...Theme.light.screenYellow,
      ...fragmentBtnDisposal,
      inputBorderColor: Yellow.color300,
    },
    screenGames: {
      ...Theme.light.screenLightBlue,
      ...screenWithHeader,
    },
    screenWebkataHome: {
      ...Theme.light.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenWebkataMain: {
      ...Theme.light.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenHTMLTab: {
      ...Theme.light.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenCSSTab: {
      ...Theme.light.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenJSTab: {
      ...Theme.light.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenLivePreviewTab: {
      ...Theme.light.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenHome: {
      ...Theme.light.screenYellow,
      ...screenWithHeader,
    },
    screenJoinClub: {
      ...Theme.light.screenYellow,
      ...fragmentIconDisposal,
    },
    screenLeaderboard: {
      ...Theme.light.screenYellow,
      ...screenWithHeader,
    },
    screenMore: {
      ...Theme.light.screenYellow,
      ...screenWithHeader,
    },
    screenHelp: {
      ...Theme.light.screenYellow,
      ...fragmentIconDisposal,
    },
    screenStudentProfile: {
      ...Theme.light.screenYellow,
      ...fragmentIconDisposal,
    },
    screenSupport: {
      ...Theme.light.screenYellow,
      fragmentIconDisposal,
    },
    screenCodekata: {
      ...Theme.light.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenCodekataMain: {
      ...Theme.light.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenTurtleHome: {
      ...Theme.light.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenTurtleMain: {
      ...Theme.light.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenTurtleQuestion: {
      ...Theme.light.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenTurtleEditor: {
      ...Theme.light.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenTurtleOutput: {
      ...Theme.light.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenGameLeaderBoard: {
      ...Theme.light.screenLightBlue,
      pointsBtnBorderColor: LightBlue.color400,
      ...screenTurtleHeader,
    },
    screenVideo: {
      ...Theme.light.screenGreen,
      ...screenWithHeader,
    },
    screenVideoHome: {
      ...Theme.light.screenGreen,
      ...screenWithHeader,
    },
    screenVideoPlayer: {
      ...Theme.light.screenGreen,
      ...screenWithHeader,
    },
    screenVideoByModule: {
      ...Theme.light.screenGreen,
      ...screenWithHeader,
    },
    screenZombieLandHome: {
      ...Theme.light.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenZombieLandMain: {
      ...Theme.light.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenZombieLandQuestion: {
      ...Theme.light.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenZombieLandEditor: {
      ...Theme.light.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenZombieLandOutput: {
      ...Theme.light.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenZombieLandLeaderBoard: {
      ...Theme.light.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenIde: {
      ...Theme.light.screenYellow,
      ...screenWithHeader,
    },
    screenCode: {
      ...Theme.light.screenYellow,
      ...screenWithHeader,
    },
    screenConsole: {
      ...Theme.light.screenYellow,
      ...screenWithHeader,
    },
    screenLogin: {
      ...Theme.light.screenYellow,
      showHeader: false,
      showNav: false,
      viewType: 'screen',
    },
    screenRegister: {
      ...Theme.light.screenYellow,
      showHeader: false,
      showNav: false,
      viewType: 'screen',
    },
    screenForgotPassword: {
      ...Theme.light.screenYellow,
      showHeader: false,
      showNav: false,
      viewType: 'screen',
    },
    screenBottomSheet: {
      ...ScreenSheet,
    },
    screenYourChallengesActions: {
      ...Theme.light.screenBlue,
      toastBtnBorderColor: Theme.light.screenYellow.fadedBtnTextColor,
      toastBtnTextColor: Theme.light.screenYellow.fadedBtnTextColor,
      ...ScreenSheet,
    },
    screenPremium: {
      ...Theme.light.screenYellow,
      // ...fragmentIconDisposal,
      ...fragmentBtnDisposal,
    },
    utilColors: Theme.light.utilColors,
    gradients: Theme.light.gradients,
  },
  dark: {
    screenWebkataHome: {
      ...Theme.dark.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenWebkataMain: {
      ...Theme.dark.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenHTMLTab: {
      ...Theme.dark.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenCSSTab: {
      ...Theme.dark.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenJSTab: {
      ...Theme.dark.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenLivePreviewTab: {
      ...Theme.dark.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenAchievements: {
      ...Theme.dark.screenYellow,
      ...fragmentIconDisposal,
    },
    screenAwardsCollectibles: {
      ...Theme.dark.screenYellow,
      ...fragmentIconDisposal,
    },
    screenAwards: {
      ...Theme.dark.screenYellow,
      ...fragmentIconDisposal,
    },
    screenCollectibles: {
      ...Theme.dark.screenYellow,
      ...fragmentIconDisposal,
    },
    screenAskHelp: {
      ...Theme.dark.screenYellow,
      ...screenWithHeader,
    },
    screenAssignments: {
      ...Theme.dark.screenYellow,
      ...screenWithHeader,
    },
    screenCertificates: {
      ...Theme.dark.screenYellow,
      ...fragmentIconDisposal,
    },
    screenChallenges: {
      ...Theme.dark.screenBlue,
      ...screenWithHeader,
    },
    screenAllChallenges: {
      ...Theme.dark.screenBlue,
    },
    screenYourChallenges: {
      ...Theme.dark.screenBlue,
      ...screenWithHeader,
    },
    screenYourDraftChallenges: {
      ...Theme.dark.screenBlue,
      ...screenWithHeader,
    },
    screenClass: {
      ...Theme.dark.screenPurple,
      ...screenWithHeader,
    },
    screenClub: {
      ...Theme.dark.screenYellow,
      ...fragmentIconDisposal,
    },
    screenClubFeed: {
      ...Theme.dark.screenYellow,
      ...fragmentIconDisposal,
    },
    screenClubInfo: {
      ...Theme.dark.screenYellow,
      ...fragmentIconDisposal,
    },
    screenCreateClub: {
      ...Theme.dark.screenYellow,
      ...fragmentIconDisposal,
    },
    screenDoubts: {
      ...Theme.dark.screenYellow,
      ...screenWithHeader,
    },
    screenEditProfile: {
      ...Theme.dark.screenYellow,
      ...fragmentBtnDisposal,
    },
    screenGames: {
      ...Theme.dark.screenLightBlue,
      ...screenWithHeader,
    },
    screenHome: {
      ...Theme.dark.screenYellow,
      ...screenWithHeader,
    },
    screenJoinClub: {
      ...Theme.dark.screenYellow,
      ...fragmentIconDisposal,
    },
    screenLeaderboard: {
      ...Theme.dark.screenYellow,
      ...screenWithHeader,
    },
    screenMore: {
      ...Theme.dark.screenYellow,
      ...screenWithHeader,
    },
    screenHelp: {
      ...Theme.dark.screenYellow,
      ...fragmentIconDisposal,
    },
    screenStudentProfile: {
      ...Theme.dark.screenYellow,
      ...fragmentIconDisposal,
    },
    screenSupport: {
      ...Theme.dark.screenYellow,
      fragmentIconDisposal,
    },
    screenTurtleHome: {
      ...Theme.dark.screenLightBlue,
      ...fragmentIconDisposal,
    },
    screenTurtleMain: {
      ...Theme.dark.screenLightBlue,
      ...fragmentIconDisposal,
    },
    screenTurtleQuestion: {
      ...Theme.dark.screenLightBlue,
      ...fragmentIconDisposal,
    },
    screenTurtleEditor: {
      ...Theme.dark.screenLightBlue,
      ...fragmentIconDisposal,
    },
    screenTurtleOutput: {
      ...Theme.dark.screenLightBlue,
      ...fragmentIconDisposal,
    },
    screenGameLeaderBoard: {
      ...Theme.dark.screenLightBlue,
      pointsBtnBorderColor: LightBlue.color400,
      ...screenTurtleHeader,
    },
    screenVideo: {
      ...Theme.dark.screenGreen,
      ...screenWithHeader,
    },
    screenZombieLandHome: {
      ...Theme.dark.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenZombieLandMain: {
      ...Theme.dark.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenZombieLandQuestion: {
      ...Theme.dark.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenZombieLandEditor: {
      ...Theme.dark.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenZombieLandOutput: {
      ...Theme.dark.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenZombieLandLeaderBoard: {
      ...Theme.dark.screenLightBlue,
      ...screenTurtleHeader,
    },
    screenLogin: {
      ...Theme.dark.screenYellow,
      showHeader: false,
      showNav: false,
      viewType: 'screen',
    },
    screenBottomSheet: {
      ...ScreenSheet,
    },
    screenYourChallengesActions: {
      ...Theme.dark.screenBlue,
      toastBtnBorderColor: Theme.dark.screenYellow.fadedBtnTextColor,
      toastBtnTextColor: Theme.dark.screenYellow.fadedBtnTextColor,
      ...ScreenSheet,
    },
    screenPremium: {
      ...Theme.dark.screenYellow,
      ...ScreenSheet,
    },
    utilColors: Theme.dark.utilColors,
    gradients: Theme.dark.gradients,
  },
};

export {
  font,
  themes,
};
