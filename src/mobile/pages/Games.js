import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  FlatList,
  RefreshControl,
  TextInput,
} from 'react-native';
import { FormattedMessage } from 'react-intl';
import { Skeleton } from '@rneui/base';
import LinearGradient from 'react-native-linear-gradient';
import ThemeContext from '../components/theme';
import turtleGameCover from '../../images/games/turtle-game-cover.png';
import zombieLandGameCover from '../../images/games/zombie-game-cover.png';
import webkataHtmlGameCover from '../../images/games/webkata-html-game-cover.png';
import webkataCssGameCover from '../../images/games/webkata-css-game-cover.png';
import webkataJsGameCover from '../../images/games/webkata-js-game-cover.png';
import codingPirateGameCover from '../../images/games/code-pirate-cover.png';
import LevelIcon from '../../images/games/level-icon.svg';
import PlayBtnIcon from '../../images/games/play-game-icon.svg';
import { useDashboard } from '../../hooks/pages/dashboard';
import hkcoin from '../../images/common/hkcoin.png';
import { AuthContext } from '../../hooks/pages/root';
import BottomSheet from '../components/BottomSheet';
import { useLeaderBoard } from '../../hooks/pages/leaderboard';
import CircleGradientProgressBar from '../components/CircleGradientProgressBar';
import Loader from '../components/Loader';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const getStyles = (theme, utilColors, gradients, font, additionalThemes) => {
  const containerPaddingHorizontal = 12;
  const gameCardBorderRadius = 12;

  const variant0DivideTotalHeightBy = 3;

  const variant0 = {
    width: 300,
    height: Dimensions.get('window').height / variant0DivideTotalHeightBy - (containerPaddingHorizontal),
  };

  const variant1DivideTotalHeightBy = 4.1;
  const variant1NumberOfGridCol = 2;
  const variant1marginBtwCards = 10;

  const variant1 = {
    width: Dimensions.get('window').width / variant1NumberOfGridCol - (containerPaddingHorizontal + variant1marginBtwCards),
    height: Dimensions.get('window').height / variant1DivideTotalHeightBy - (containerPaddingHorizontal + variant1marginBtwCards),
  };

  return StyleSheet.create({
    container: {
      paddingHorizontal: containerPaddingHorizontal,
      flex: 1,
      backgroundColor: theme.bodyBg,
    },
    pageHeadingWithMoreInfoBtn: {
      marginVertical: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    pageHeading: {
      color: utilColors.dark,
      ...font.subtitleBold,
    },
    moreInfoBtnText: {
      color: theme.textBold,
      ...font.bodyBold,
    },
    totalStats: {
      borderRadius: 10,
      padding: 18,
      backgroundColor: utilColors.white,
    },
    allGameSection: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    recommendedGameSection: {
      flex: 1,
      flexDirection: 'row',
    },
    sectionHeading: {
      marginVertical: 15,
      marginTop: 20,
      color: utilColors.dark,
      ...font.subtitleBold,
    },
    skeleton: {
      variant0: {
        width: 300,
        height: variant0.height,
        marginRight: 10,
        borderRadius: gameCardBorderRadius,
      },
      variant1: {
        width: variant1.width,
        height: variant1.height,
        borderRadius: gameCardBorderRadius,
        marginRight: variant1marginBtwCards,
        marginBottom: variant1marginBtwCards,
      },
    },
    gameCard: {
      variant0: {
        position: 'relative',
        zIndex: 200,
        elevation: -1,
        width: 300,
        height: variant0.height,
        marginRight: 10,
      },
      variant1: {
        width: variant1.width,
        height: variant1.height,
        marginRight: variant1marginBtwCards,
        marginBottom: variant1marginBtwCards,
        flexGrow: 1,
      },
    },
    imageWithLevelIndicator: {
      borderTopLeftRadius: gameCardBorderRadius,
      borderTopRightRadius: gameCardBorderRadius,
      flex: 7.5,
      overflow: 'hidden',
    },
    gameBg: {
      width: '100%',
      height: '100%',
      alignSelf: 'center',
      resizeMode: 'contain',
    },
    levelIndicatorBtn: {
      position: 'absolute',
      top: 8,
      right: 10,
      borderRadius: 5,
      paddingHorizontal: 5,
      paddingVertical: 3,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.levelIndicatorBtnBg,
    },
    levelNumberText: {
      marginLeft: 2,
      color: utilColors.white,
      ...font.body,
    },
    cardBody: {
      borderBottomLeftRadius: gameCardBorderRadius,
      borderBottomRightRadius: gameCardBorderRadius,
      padding: 8,
      backgroundColor: theme.gameCardBg,
      flex: 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    gameTitleText: {
      variant0: {
        marginLeft: 3,
        ...font.heading6,
        color: utilColors.white,
        flex: 1,
      },
      variant1: {
        marginLeft: 3,
        ...font.subtitleBold,
        color: utilColors.white,
        flex: 1,
      },
    },
    playGameBtn: {
      variant0: {
        position: 'absolute',
        top: -20,
        right: 10,
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: utilColors.white,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 16,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
      variant1: {
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
        backgroundColor: utilColors.white,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 16,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    },
    playBtnText: {
      ...font.overlineBold,
      color: theme.textBold,
      marginTop: 1,
      letterSpacing: 1,
    },
    gameStatsContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      borderRadius: gameCardBorderRadius,
      backgroundColor: utilColors.bg3,
      overflow: 'hidden',
      zIndex: 1,
    },
    gameStatsOtherStatsWithProgress: {
      backgroundColor: utilColors.bg2,
      borderTopLeftRadius: gameCardBorderRadius,
      borderTopRightRadius: gameCardBorderRadius,
      padding: 10,
    },
    gameStat: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    gameStatText: {
      ...font.bodyBold,
      marginLeft: 5,
      color: utilColors.dark,
    },
    levelProgressIndicator: {
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    otherStats: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    gameStatsCoinsIcon: {
      width: 22,
      height: 22,
    },
    levelProgressBar: {
      overflow: 'hidden',
      height: 8,
      borderRadius: gameCardBorderRadius,
      backgroundColor: theme.levelProgressBarBackgroundColor,
    },
    levelProgressGradient: gradients.blue,
    levelProgress: {
      width: '100%',
      height: 8,
      borderRadius: gameCardBorderRadius,
      backgroundColor: theme.levelProgressColor,
    },
    sheetCard: {
      backgroundColor: utilColors.white,
      borderRadius: 16,
      padding: 12,
      marginVertical: 6,
    },
    sheetCardHeading: {
      marginVertical: 10,
    },
    sheetCardHeadingText: {
      ...font.subtitle1,
      textAlign: 'center',
    },
    sheetCardHeroContent: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'baseline',
      marginVertical: 16,
    },
    sheetCardTextColor: {
      color: utilColors.dark,
    },
    sheetCardHeroTitle: {
      ...font.heading1,
      marginRight: 2,
    },
    sheetCardBodyText: {
      ...font.subtitle2,
      color: utilColors.dark,
    },
    sheetCardBodyTextBold: {
      ...font.subtitle1,
      color: utilColors.dark,
    },
    sheetCardSubtitle: {
      ...font.body,
      color: utilColors.lightGrey,
      marginBottom: 4,
    },
    sheetCardBodyContent: {
      marginBottom: 8,
    },
    sheetCardBodyRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 6,
    },
    sheetCardBodyRow1: {
      flexDirection: 'row',
    },
    sheetCardRowIndex: {
      marginRight: 18,
    },
    sheetCardButton: {
      width: '100%',
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
    },
    sheetCardButtonText: {
      ...font.subtitle1,
      color: utilColors.white,
    },
    sheetLeaderboardHeadingText: {
      color: additionalThemes.screenGames.textBold,
    },
    sheetLeaderboardBtn: {
      backgroundColor: additionalThemes.screenChallenges.btnBg,
    },
    gameCardText: {
      ...font.subtitle1,
      color: utilColors.dark,
      includeFontPadding: false,
      padding: 0,
      margin: 0,
    },
    gameCardTextLight: {
      ...font.subtitle1,
      color: utilColors.lightGrey,
    },
    gameCardSubtitle: {
      ...font.body,
      marginBottom: 8,
      color: utilColors.lightGrey,
    },
    bodyCardContentTitle: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    bodyCardContentTitleImage: {
      width: 48,
      height: 48,
      borderRadius: 100,
    },
    gameCardIcons: {
      width: 32,
      height: 32,
      marginRight: 10,
    },
    gameCardProgressBlock: {
      width: '50%',
      flex: 1,
      justifyContent: 'center',
    },
    gameCardSvgCaption: {
      ...font.caption,
      color: utilColors.lightGrey,
    },
    svgGradient: {
      color: gradients.blue,
    },
    gameCardContent: {
      marginVertical: 8,
    },
    gameSummaryCard: {
      width: '100%',
      paddingVertical: 20,
      paddingHorizontal: 15,
      backgroundColor: utilColors.white,
      borderRadius: 12,
    },
    gameSummaryCoverImageAndTitle: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    gameSummaryGameTitleText: {
      color: utilColors.dark,
      ...font.subtitle1,
      paddingHorizontal: 10,
    },
    gameSummaryGameCoverImage: {
      flex: 1,
      width: '100%',
      height: '100%',
      borderRadius: 20,
      alignSelf: 'center',
      resizeMode: 'contain',
    },
    gameSummaryGameTitleAndLevelProgress: {
      flex: 2.5,
    },
    gameSummaryOtherStatsAndProgressBar: {
      borderRadius: 12,
      backgroundColor: utilColors.bg2,
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
  });
};

// Bottom sheet components
const LeaderBoardCard = ({
  leaderboardData, leaderBoardUserData, navigation, style, bottomSheetRef,
}) => <>
    <View style={[style.sheetCard]}>
      <View style={style.sheetCardHeading}>
        <Text style={[style.sheetCardHeadingText, style.sheetLeaderboardHeadingText]}>
          <FormattedMessage
            defaultMessage='Leaderboard Ranking'
            description='Leaderboard card heading text'
          />
        </Text>
      </View>
      {
        leaderBoardUserData && <>
          <View style={style.sheetCardHeroContent}>
            <Text
              style={[style.sheetCardTextColor, style.sheetCardHeroTitle]}
            >#{leaderBoardUserData.rank}</Text>
            <Text style={style.sheetCardBodyText}>
              <FormattedMessage
                defaultMessage='rank'
                description='sheet card subtitle'
              />
            </Text>
          </View>
        </>
      }
      {!leaderBoardUserData && <>
        <Skeleton width='20%' height={48} style={{ borderRadius: 8, alignSelf: 'center', marginVertical: 8 }} />
      </>}
      <View style={style.sheetCardBodyContent}>
        {leaderboardData
          && leaderboardData.slice(0, 3).map((item, index) => (
            <View style={style.sheetCardBodyRow} key={index}>
              <View style={style.sheetCardBodyRow1}>
                <Text
                  style={[
                    style.sheetCardBodyText, style.sheetCardRowIndex,
                  ]}
                >#{item.rank}</Text>
                <Text style={style.sheetCardBodyText}>{item.name}</Text>
              </View>
              <Text style={style.sheetCardBodyText}>{item.points}</Text>
            </View>))}
        {
          !leaderboardData
          && [1, 2, 3].map((item, index) => (
            <View key={index} style={style.sheetCardBodyRow}>
              <Skeleton width='50%' height={24} style={{ borderRadius: 8 }} />
              <Skeleton width='15%' height={24} style={{ borderRadius: 8 }} />
            </View>
          ))
        }
      </View>
      <TouchableOpacity
        onPress={() => {
          bottomSheetRef.current.close();
          navigation.navigate('Leaderboard');
        }}
        style={[style.sheetCardButton, style.sheetLeaderboardBtn]}
      >
        <Text style={style.sheetCardButtonText}>
          <FormattedMessage
            defaultMessage='Show Leaderboard'
            description='Leaderboard show button'
          />
        </Text>
      </TouchableOpacity>
    </View>
  </>;

const IndividualGameSummaryCard = ({
  style, contentContainerStyles = {}, gameTitle, gameCoverImage, validSubmissionCount, totalLevels,
  totalEarnedCoins, onPress,
}) => (
  <View style={[style.gameSummaryCard, contentContainerStyles]}>
    <View style={style.gameSummaryCoverImageAndTitle}>
      <TouchableOpacity style={{ flex: 1, height: 60 }} onPress={onPress} activeOpacity={0.7}>
        <Image source={gameCoverImage} style={style.gameSummaryGameCoverImage} resizeMode={'stretch'} />
      </TouchableOpacity>
      <View style={style.gameSummaryGameTitleAndLevelProgress}>
        <Text style={style.gameSummaryGameTitleText}>
          <FormattedMessage defaultMessage={'{gameTitle}'} description={'game title'} values={{ gameTitle }} />
        </Text>
        <View style={style.levelProgressIndicator}>
          <LevelIcon />
          <Text style={style.gameStatText}>
            <FormattedMessage defaultMessage={'{levelText}'} description='level text' values={{ levelText: `${validSubmissionCount}/${totalLevels}` }} />
          </Text>
        </View>
      </View>
    </View>
    <View style={style.gameSummaryOtherStatsAndProgressBar}>
      <OtherStats
        style={style}
        totalEarnedCoins={totalEarnedCoins}
        contentContainerSyle={{ marginBottom: 10 }} />
      <LinearProgressBar
        style={style}
        step={validSubmissionCount}
        steps={totalLevels} />
    </View>
  </View>
);

// in page re-usable components
const OtherStats = ({
  style, totalEarnedCoins, contentContainerSyle = {},
  // totalEarnedXp = 0, averageTime = 0,
}) => (<View style={[style.otherStats, contentContainerSyle]}>
  <View style={style.gameStat}>
    <Image style={style.gameStatsCoinsIcon} source={hkcoin} />
    <Text style={style.gameStatText}>
      <FormattedMessage defaultMessage={'{totalEarnedCoins}'} description='level text' values={{ totalEarnedCoins }} />
    </Text>
  </View>
</View>);

const LinearProgressBar = ({ style, step, steps }) => (
  <View style={style.levelProgressBar}>
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={style.levelProgressGradient}
      style={[style.levelProgress, {
        width: `${(step / steps) * 100}%`,
      }]} />
  </View>
);

// game card component
const GameCard = ({
  style, gameDetails, onPress, gameCardVariant,
}) => {
  const [state, setState] = useState({
    showGameStats: false,
    translateValue: new Animated.Value(1000),
  });

  useEffect(() => {
    if (state.showGameStats === true) {
      Animated.timing(state.translateValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(state.translateValue, {
        toValue: 1000,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [state.showGameStats]);

  const GameStats = ({
    validSubmissionCount, totalLevels, totalEarnedCoins,
  }) => (
    <Animated.View
      style={[style.gameStatsContainer, { transform: [{ translateY: state.translateValue }] }]}>
      <View style={style.levelProgressIndicator}>
        <LevelIcon />
        <Text style={style.gameStatText}>
          <FormattedMessage defaultMessage={'{levelText}'} description='level text' values={{ levelText: `${validSubmissionCount}/${totalLevels}` }} />
        </Text>
      </View>
      <View style={style.gameStatsOtherStatsWithProgress}>
        <OtherStats style={style} totalEarnedCoins={totalEarnedCoins} contentContainerSyle={{
          backgroundColor: 'transparent',
          marginBottom: 12,
        }} />
        <LinearProgressBar
          step={validSubmissionCount}
          steps={totalLevels}
          style={style} />
      </View>
    </Animated.View>
  );

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={gameCardVariant === 0 ? style.gameCard.variant0 : style.gameCard.variant1}>
        <View style={style.imageWithLevelIndicator}>
          <Image
            style={style.gameBg}
            source={gameDetails.gameCoverImage}
            resizeMode='stretch' />
          {
            gameCardVariant === 0
              ? <TouchableOpacity
                style={style.levelIndicatorBtn}
                onPress={() => setState((prev) => ({
                  ...prev,
                  showGameStats: !prev.showGameStats,
                }))}>
                <LevelIcon />
                <Text style={style.levelNumberText}>
                  <FormattedMessage defaultMessage={'Level {currentLevelNumber}'} values={{ currentLevelNumber: gameDetails.currentLevelNumber }} />
                </Text>
              </TouchableOpacity> : null
          }
        </View>
        <View style={gameCardVariant === 0 ? [style.cardBody, { position: 'relative' }] : style.cardBody}>
          <Text style={gameCardVariant === 0 ? style.gameTitleText.variant0 : style.gameTitleText.variant1} numberOfLines={1} ellipsizeMode={'middle'}>
            <FormattedMessage defaultMessage={'{gameTitle}'} description={'game title'} values={{ gameTitle: gameDetails.gameTitle }} />
          </Text>
          <TouchableOpacity
            style={gameCardVariant === 0 ? style.playGameBtn.variant0 : style.playGameBtn.variant1}
            onPress={onPress}>
            <PlayBtnIcon />
            {
              gameCardVariant === 0
              && <Text style={style.playBtnText}>
                <FormattedMessage defaultMessage={'PLAY'} description={'play text'} />
              </Text>
            }
          </TouchableOpacity>
        </View>
        {
          gameCardVariant === 0
          && <GameStats
            validSubmissionCount={gameDetails.validSubmissionCount}
            totalLevels={gameDetails.totalLevels}
            totalEarnedCoins={gameDetails.totalEarnedCoins} />
        }
      </View>
    </TouchableOpacity>
  );
};

// continue playing section
const ContinuePlayingSection = ({ style, gameCardsData }) => (
  <View style={style.continuePlayingSection}>
    <Text style={style.sectionHeading}>
      <FormattedMessage
        defaultMessage="Continue Playing"
        description="Continue playing heading"
      />
    </Text>
    {
      gameCardsData && <>
        <FlatList
          data={gameCardsData}
          renderItem={({ item: data }) => <GameCard
            style={style}
            onPress={data.onPress}
            gameCardVariant={0}
            gameDetails={{
              gameTitle: data.gameTitle,
              gameCoverImage: data.gameCoverImage,
              currentLevelNumber: data.currentLevelNumber,
              totalLevels: data.totalLevels,
              totalEarnedCoins: data.totalEarnedCoins,
              validSubmissionCount: data.validSubmissionCount,
            }} />}
          keyExtractor={(data, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          fadingEdgeLength={50}
          initialNumToRender={2}
          snapToInterval={300}
          decelerationRate={0.001}
          snapToAlignment={'start'}
          contentInset={{ left: 20 }}
          automaticallyAdjustContentInsets={false}
        />
      </>
    }
    {
      !gameCardsData && <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {
          [1, 2, 3, 4].map((val) => <Skeleton key={val} style={style.skeleton.variant0} />)
        }
      </ScrollView>
    }
  </View>
);

// recommended games section
// const RecommendedGamesSection = ({ style, gameCardsData }) => (
//   <View style={style.recommendedGamesSection}>
//     <Text style={style.sectionHeading}>
//       <FormattedMessage
//         defaultMessage="Recommended"
//         description="Recommended games heading"
//       />
//     </Text>
//     {
//       gameCardsData && <>
//         <FlatList
//           data={gameCardsData}
//           renderItem={({ item: data }) => <GameCard
//             style={style}
//             onPress={data.onPress}
//             gameCardVariant={0}
//             gameDetails={{
//               gameTitle: data.gameTitle,
//               gameCoverImage: data.gameCoverImage,
//               currentLevelNumber: data.currentLevelNumber,
//               totalLevels: data.totalLevels,
//               totalEarnedCoins: data.totalEarnedCoins,
//               validSubmissionCount: data.validSubmissionCount,
//             }} />}
//           keyExtractor={(item, index) => index.toString()}
//           horizontal={true}
//           showsHorizontalScrollIndicator={false}
//           fadingEdgeLength={50}
//           initialNumToRender={2}
//           snapToInterval={300}
//           decelerationRate={0.001}
//           snapToAlignment={'start'}
//           contentInset={{ left: 20 }}
//           automaticallyAdjustContentInsets={false}
//         />
//       </>
//     }
//     {
//       !gameCardsData && <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
//         {
//           [1, 2, 3, 4].map((val) => <Skeleton key={val} style={style.skeleton.variant0} />)
//         }
//       </ScrollView>
//     }
//   </View>
// );

// all games section
const AllGamesSection = ({ style, gameCardsData }) => (
  <>
    <Text style={style.sectionHeading}>
      <FormattedMessage
        defaultMessage="All Games"
        description="All games heading"
      />
    </Text>
    <View style={style.allGameSection}>
      {
        gameCardsData && <>
          {
            gameCardsData.map((data, index) => <GameCard
              key={index.toString()}
              style={style}
              onPress={data.onPress}
              gameCardVariant={1}
              gameDetails={{
                gameTitle: data.gameTitle,
                gameCoverImage: data.gameCoverImage,
                currentLevelNumber: data.currentLevelNumber,
                totalLevels: data.totalLevels,
                totalEarnedCoins: data.totalEarnedCoins,
              }} />)
          }
        </>
      }
      {
        !gameCardsData && <>
          {
            [1, 2, 3, 4, 5].map((val) => <Skeleton
              key={val}
              style={style.skeleton.variant1}></Skeleton>)
          }
        </>
      }
    </View>
  </>
);

// top level component
const Games = ({ navigation }) => {
  const isPageMounted = useRef(true);
  // hooks
  const { state: dashBoardState, static: { getDashboardData } } = useDashboard({ isPageMounted });
  const { state: leaderBoardState } = useLeaderBoard({ isPageMounted });
  const { dashBoardData, gameData } = dashBoardState;
  const { leaderboardData, userData: leaderBoardUserData } = leaderBoardState;
  const authContext = useContext(AuthContext);
  const loaderRef = useRef(null);

  const showLoader = () => {
    if (loaderRef.current) {
      loaderRef.current.show();
    }
  };

  const hideLoader = () => {
    if (loaderRef.current) {
      loaderRef.current.hide();
    }
  };

  // onRefresh
  const onRefresh = () => {
    // authContext.setAuthState((prevState) => ({
    //   ...prevState,
    //   gamesPageAppData: { refreshing: true },
    // }));
    showLoader();

    Promise.all([
      getDashboardData({ cached: false }),
    ])
      .then(() => {
        hideLoader();
        // authContext.setAuthState((prevState) => ({
        //   ...prevState,
        //   gamesPageAppData: {
        //     reloadComponent: authContext?.gamesPageAppData?.reloadComponent + 1,
        //     refreshing: false,
        //   },
        // }));
      })
      .catch(() => {
        // show snackbar of error
        hideLoader();
        // authContext.setAuthState((prevState) => ({
        //   ...prevState,
        //   gamesPageAppData: {
        //     refreshing: false,
        //   },
        // }));
      });
  };

  const gameCardsDataArr = [{
    gameTitle: 'Turtle',
    gameCoverImage: turtleGameCover,
    currentLevelNumber: dashBoardData?.turtle?.currentQuestionDetails
      ? dashBoardData.turtle.currentQuestionDetails.virtualId : 0,
    validSubmissionCount: dashBoardData?.turtle?.validSubmissionCount,
    totalLevels: dashBoardData?.turtle?.overAllQuestionCount,
    totalEarnedCoins: dashBoardData?.turtle?.totalPointsEarned,
    onPress: () => { navigation.navigate('TurtleHome'); },
  },
  {
    gameTitle: 'Zombieland',
    gameCoverImage: zombieLandGameCover,
    currentLevelNumber: dashBoardData?.zombieLand?.currentQuestionDetails
      ? dashBoardData.zombieLand.currentQuestionDetails.virtualId : 0,
    validSubmissionCount: dashBoardData?.zombieLand?.validSubmissionCount,
    totalLevels: dashBoardData?.zombieLand?.overAllQuestionCount,
    totalEarnedCoins: dashBoardData?.zombieLand?.totalPointsEarned,
    onPress: () => { navigation.navigate('ZombieLandHome'); },
  },
  {
    gameTitle: 'Webkata-HTML',
    gameCoverImage: webkataHtmlGameCover,
    currentLevelNumber: dashBoardData?.webkataHtml?.currentQuestionDetails
      ? dashBoardData.webkataHtml.currentQuestionDetails.virtualId : 0,
    totalLevels: dashBoardData?.webkataHtml?.overAllQuestionCount,
    validSubmissionCount: dashBoardData?.webkataHtml?.validSubmissionCount,
    totalEarnedCoins: dashBoardData?.webkataHtml?.totalPointsEarned,
    onPress: () => navigation.navigate('WebkataHome', {
      conceptId: 'HTML',
    }),
  },
  {
    gameTitle: 'Webkata-CSS',
    gameCoverImage: webkataCssGameCover,
    currentLevelNumber: dashBoardData?.webkataCss?.currentQuestionDetails
      ? dashBoardData?.webkataCss?.currentQuestionDetails?.virtualId : 0,
    totalLevels: dashBoardData?.webkataCss?.overAllQuestionCount,
    validSubmissionCount: dashBoardData?.webkataCss?.validSubmissionCount,
    totalEarnedCoins: dashBoardData?.webkataCss?.totalPointsEarned,
    onPress: () => navigation.navigate('WebkataHome', {
      conceptId: 'CSS',
    }),
  },
  {
    gameTitle: 'Webkata-JS',
    gameCoverImage: webkataJsGameCover,
    currentLevelNumber: dashBoardData?.webkataJs?.currentQuestionDetails
      ? dashBoardData?.webkataJs?.currentQuestionDetails?.virtualId : 0,
    totalLevels: dashBoardData?.webkataJs?.overAllQuestionCount,
    validSubmissionCount: dashBoardData?.webkataJs?.validSubmissionCount,
    totalEarnedCoins: dashBoardData?.webkataJs?.totalPointsEarned,
    onPress: () => navigation.navigate('WebkataHome', {
      conceptId: 'JS',
    }),
  },
  {
    gameTitle: 'Coding Pirate',
    gameCoverImage: codingPirateGameCover,
    currentLevelNumber: dashBoardData?.codekata?.currentQuestionDetails
      ? dashBoardData?.codekata?.currentQuestionDetails?.virtualId : 0,
    totalLevels: dashBoardData?.codekata?.overAllQuestionCount,
    validSubmissionCount: dashBoardData?.codekata?.validSubmissionCount,
    totalEarnedCoins: dashBoardData?.codekata?.totalPointsEarned,
    onPress: () => navigation.navigate('Codekata'),
  },
  ];

  if (authContext.appData.isRefresh) {
    onRefresh();
    authContext.setAuthState((prevState) => ({
      ...prevState,
      appData: {
        isRefresh: false,
      },
    }));
  }

  // styles
  const { font, theme } = useContext(ThemeContext);
  const screenTheme = theme.screenGames;
  const style = getStyles(screenTheme, theme.utilColors, theme.gradients, font, theme);
  const bottomSheetRef = useRef(null);
  const gameDataTextRef = useRef();
  const bottomSheetStyles = {
    draggableIcon: {
      backgroundColor: theme.utilColors.white,
    },
    container: {
      backgroundColor: 'transparent',
      paddingHorizontal: 12,
    },
  };
  const gameProgressValue = new Animated.Value(0);

  gameProgressValue.addListener(({ value }) => {
    if (gameDataTextRef?.current) {
      gameDataTextRef.current.setNativeProps({
        text: `${Math.round(value)}`.toString(),
      });
    }
  });

  // handlers
  const onBottomSheetOpen = () => {
    Animated.timing(gameProgressValue, {
      toValue: gameData.gameProgress,
      duration: 1000,
      delay: 1000,
      useNativeDriver: true,
    }).start();
  };

  const onBottomSheetClose = () => {
    gameProgressValue.resetAnimation();
  };

  // initial render side effect
  useEffect(() => {
    const initialState = {
      reloadComponent: 0,
      refreshing: false,
      gameCardsData: false,
    };

    authContext.setAuthState((prevState) => ({
      ...prevState,
      gamesPageAppData: initialState,
    }));

    onRefresh();
    return () => {
      isPageMounted.current = false;
      gameProgressValue.removeAllListeners();
      hideLoader();
    };
  }, []);

  return (
    <>
      <ScrollView
        style={style.container}
        refreshControl={<RefreshControl
          // refreshing={authContext?.gamesPageAppData?.refreshing}
          refreshing={false}
          onRefresh={onRefresh} />}>
        <View style={style.pageHeadingWithMoreInfoBtn}>
          <Text style={style.pageHeading}>
            <FormattedMessage defaultMessage={'Games'} description={'games page heading'} />
          </Text>
          <TouchableOpacity style={style.moreInfoBtn} onPress={() => bottomSheetRef.current.open()}>
            <Text style={style.moreInfoBtnText}>
              <FormattedMessage defaultMessage={'More Info'} description={'More info button'} />
            </Text>
          </TouchableOpacity>
        </View>
        {
          gameData && <OtherStats
            style={style}
            contentContainerSyle={style.totalStats} totalEarnedCoins={gameData.totalPointsEarned} />
        }
        {
          !gameData && <Skeleton width={'100%'} height={50} style={{ borderRadius: 8 }} />
        }
        <ContinuePlayingSection
          gameCardsData={gameCardsDataArr}
          style={style} />
        {/* <RecommendedGamesSection
          gameCardsData={gameCardsDataArr}
          style={style} /> */}
        <AllGamesSection
          gameCardsData={gameCardsDataArr}
          style={style} />
      </ScrollView>
      {/* bottom sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        customStyles={bottomSheetStyles}
        contentPanEnabled={true}
        onOpen={onBottomSheetOpen}
        onClose={onBottomSheetClose}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {
            gameData && <View style={{
              paddingVertical: 40,
              backgroundColor: 'white',
              flexDirection: 'row',
              borderRadius: 15,
            }}>
              <View style={style.gameCardProgressBlock}>
                <CircleGradientProgressBar
                  gradientColors={[[style.svgGradient.color[0], '10%'], [style.svgGradient.color[1], '90%']]}
                  progressValue={gameData ? gameData.progress : 0}
                  totalValue={gameData ? gameData.totalGames : 100}
                  startAnim={Boolean(gameData)}
                >
                  <View style={style.bodyCardContentTitle}>
                    <AnimatedTextInput
                      ref={gameDataTextRef}
                      underlineColorAndroid='transparent'
                      style={style.gameCardText}
                      value={'0'}
                      editable={false}
                    />
                    <Text style={style.gameCardTextLight}>/{gameData ? gameData.totalGames : '--'}</Text>
                  </View>
                  <Text style={style.gameCardSvgCaption}>
                    <FormattedMessage
                      defaultMessage="completed"
                      description="Game Progress card caption"
                    />
                  </Text>
                </CircleGradientProgressBar>
              </View>
              <View style={style.gameCardProgressBlock}>
                <View style={[style.bodyCardContentTitle, style.gameCardContent]}>
                  <Image
                    style={[style.bodyCardContentTitleImage, style.gameCardIcons]}
                    source={hkcoin}
                  />
                  <View>
                    <Text style={style.gameCardSubtitle}>
                      <FormattedMessage
                        defaultMessage={'Coins Earned:'}
                        description='Coins Earned'
                      />
                    </Text>
                    <Text style={style.gameCardText}>{gameData ? gameData.totalPointsEarned : '--'}</Text>
                  </View>
                </View>
              </View>
            </View>
          }
          {
            gameCardsDataArr
            && <>
              {
                gameCardsDataArr.map((data, index) => <IndividualGameSummaryCard
                  key={index}
                  style={style}
                  contentContainerStyles={{ marginTop: 5 }}
                  {...data}
                />)
              }
            </>
          }
          {
            leaderboardData
            && <LeaderBoardCard
              leaderboardData={leaderboardData}
              leaderBoardUserData={leaderBoardUserData}
              bottomSheetRef={bottomSheetRef}
              navigation={navigation}
              style={style} />
          }
        </ScrollView>
      </BottomSheet>
      <Loader
        route={'Games'}
        ref={loaderRef}
      />
    </>
  );
};

export default Games;
