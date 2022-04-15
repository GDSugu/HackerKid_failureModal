import { StyleSheet } from 'react-native';
import { Theme } from '../common/_theme';
import { mobileTypography } from '../../typography/_typography';
import { Yellow } from '../../colors/_colors';

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
    screenHome: {
      ...Theme.light.screenYellow,
      ...screenWithHeader,
    },
    screenJoinClub: {
      ...Theme.light.screenYellow,
      ...fragmentIconDisposal,
    },
    screenLeaderBoard: {
      ...Theme.light.screenYellow,
      ...fragmentIconDisposal,
    },
    screenMore: {
      ...Theme.light.screenYellow,
      ...screenWithHeader,
    },
    screenStudentProfile: {
      ...Theme.light.screenYellow,
      ...fragmentIconDisposal,
    },
    screenSupport: {
      ...Theme.light.screenYellow,
      fragmentIconDisposal,
    },
    screenTurtle: {
      ...Theme.light.screenLightBlue,
      ...fragmentIconDisposal,
    },
    screenVideo: {
      ...Theme.light.screenGreen,
      ...screenWithHeader,
    },
    screenZombieLand: {
      ...Theme.light.screenLightBlue,
      ...fragmentIconDisposal,
    },
    screenSignin: {
      ...Theme.light.screenYellow,
    },
    screenBottomSheet: {
      ...ScreenSheet,
    },
    utilColors: Theme.light.utilColors,
    gradients: Theme.light.gradients,
  },
  dark: {
    screenAchievements: {
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
    },
    screenGames: {
      ...Theme.light.screenLightBlue,
      ...screenWithHeader,
    },
    screenHome: {
      ...Theme.light.screenYellow,
      ...screenWithHeader,
    },
    screenJoinClub: {
      ...Theme.light.screenYellow,
      ...fragmentIconDisposal,
    },
    screenLeaderBoard: {
      ...Theme.light.screenYellow,
      ...fragmentIconDisposal,
    },
    screenMore: {
      ...Theme.light.screenYellow,
      ...screenWithHeader,
    },
    screenStudentProfile: {
      ...Theme.light.screenYellow,
      ...fragmentIconDisposal,
    },
    screenSupport: {
      ...Theme.light.screenYellow,
      fragmentIconDisposal,
    },
    screenTurtle: {
      ...Theme.light.screenLightBlue,
      ...fragmentIconDisposal,
    },
    screenVideo: {
      ...Theme.light.screenGreen,
      ...screenWithHeader,
    },
    screenZombieLand: {
      ...Theme.light.screenLightBlue,
      ...fragmentIconDisposal,
    },
    screenSignin: {
      ...Theme.light.screenYellow,
      showHeader: false,
      showNav: false,
      viewType: 'screen',
    },
    screenBottomSheet: {
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
