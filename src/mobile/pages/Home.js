import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  Animated,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  // FlatList,
  RefreshControl,
  Pressable,
} from 'react-native';
import { FormattedMessage } from 'react-intl';
import { useFocusEffect } from '@react-navigation/native';
import { Skeleton } from '@rneui/base';
import { useDashboard } from '../../hooks/pages/dashboard';
import { useLeaderBoard } from '../../hooks/pages/leaderboard';
import { useGetChallenges } from '../../hooks/pages/challenges';
import ThemeContext from '../components/theme';
import BottomSheet from '../components/BottomSheet';
import Icon from '../common/Icons';
import dashboardHero from '../../images/dashboard/dashboard-hero-bg-mobile.png';
import defaultUser from '../../images/profile/default_user.png';
import hkcoin from '../../images/common/hkcoin.png';
// import xpPoints from '../../images/common/xp.png';
import timeSpent from '../../images/common/eva_clock-fill.png';
import turtle from '../../images/dashboard/dashboard-turtle.png';
import zombieLand from '../../images/dashboard/dashboard-zombieLand.png';
import codekata from '../../images/dashboard/dashboard-codePirate.png';
import achievementImage from '../../images/dashboard/dashboard-achievements.png';
import CircleGradientProgressBar from '../components/CircleGradientProgressBar';
import AuthErrorModal from '../components/Modals/AuthErrorModal';
import Loader from '../components/Loader';
import {
  AuthContext,
  // SubscriptionContext,
} from '../../hooks/pages/root';
import { formatSeconds } from '../../hooks/common/utlis';
// import { isFeatureEnabled } from '../../web/javascripts/common/framework';
// import LockSvg from '../../images/common/feature-lock.svg';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const getStyles = (theme, utilColors, gradients, font, additionalThemes) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bodyBg,
  },
  skeletonCard: {
    width: '95%',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 16,
  },
  marginRight24: {
    marginRight: 24,
  },
  marginBottm32: {
    marginBottom: 32,
  },
  bodyCard: {
    margin: 16,
  },
  textSecondary: {
    color: utilColors.grey,
  },
  bodyCardHeading: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  bodyCardHeadingText: {
    ...font.subtitleBold,
    color: utilColors.dark,
  },
  bodyCardHeadingMenu: {
    ...font.bodyBold,
  },
  HomeCardHeadingMenu: {
    color: theme.textBold,
  },
  bodyCardContent: {
    backgroundColor: utilColors.white,
    borderRadius: 12,
    padding: 12,
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
  bodyCardContentTitleText: {
    marginLeft: 15,
    ...font.subtitle1,
    color: utilColors.dark,
  },
  bodyCardContentContainer: {
    marginTop: 10,
  },
  bodyCardContentText: {
    ...font.body,
    color: utilColors.dark,
    lineHeight: 20,
  },
  heroCard: {
    borderRadius: 12,
    shadowColor: `${utilColors.shadowColor1}25`,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 16,
    shadowOpacity: 0,
    overflow: 'hidden',
    backgroundColor: utilColors.white,
    height: 160,
  },
  heroCardImageBg: {
    height: '100%',
    width: '100%',
    backgroundColor: utilColors.white,
  },
  heroCardContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  heroCardBlock1: {
    width: '60%',
    height: '100%',
    justifyContent: 'center',
  },
  heroCardBlock2: {
    width: '40%',
    height: '100%',
    justifyContent: 'center',
  },
  heroBlockDataContainer: {
    width: 110,
    height: '100%',
    justifyContent: 'center',
  },
  heroCardImage: {
    width: 84,
    height: 84,
    left: '-15%',
    bottom: '-15%',
    alignSelf: 'center',
    borderRadius: 100,
  },
  heroCardText: {
    ...font.body,
    color: utilColors.dark,
    marginLeft: 8,
  },
  heroCardDataIcon: {
    width: 24,
    height: 24,
  },
  heroCardDataBlock: {
    marginVertical: 4,
  },
  heroCardPrimaryBtn: {
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: theme.btnBg,
    width: '100%',
    textAlign: 'center',
    marginTop: 12,
  },
  heroCardPrimaryBtnText: {
    ...font.subtitle1,
    color: utilColors.white,
    textAlign: 'center',
  },
  gameCard: {
    backgroundColor: additionalThemes.screenGames.bodyBg,
    padding: 20,
    paddingVertical: 24,
    margin: 0,
  },
  gameInnerCard: {
    marginTop: 8,
  },
  gameCardProgressContainer: {
    paddingVertical: 16,
  },
  gameCardHeadingMenu: {
    ...font.bodyBold,
    color: additionalThemes.screenGames.textBold,
  },
  gameCardProgressBlock: {
    width: '50%',
    flex: 1,
    justifyContent: 'center',
    // padding: 12,
    // flexWrap: 'wrap',
  },
  gameCircularProgressBlock: {
    width: '50%',
    flex: 0.8,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  gameCardSvgCaption: {
    ...font.caption,
    color: utilColors.lightGrey,
  },
  gameCardContent: {
    marginVertical: 8,
    // flexWrap: 'wrap',
  },
  gameCardTextContent: {
    flex: 1,
  },
  gameCardIcons: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  gameCardSubtitle: {
    ...font.body,
    marginBottom: 8,
    color: utilColors.lightGrey,
    flexWrap: 'wrap',
  },
  gameCardText: {
    ...font.subtitle1,
    color: utilColors.dark,
    includeFontPadding: false,
    padding: 0,
    margin: 0,
    flexWrap: 'wrap',
  },
  gameCardTextLight: {
    ...font.subtitle1,
    color: utilColors.lightGrey,
  },
  gameCardImageContainer: {
    marginHorizontal: 4,
  },
  gameCardImage: {
    borderRadius: 8,
    width: 64,
    height: 64,
  },
  bodyCardPrimaryBtn: {
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginVertical: 8,
  },
  gameCardPrimaryBtn: {
    backgroundColor: additionalThemes.screenGames.btnBg,
  },
  bodyCardPrimaryBtnText: {
    ...font.subtitle1,
    color: utilColors.white,
  },
  bodyCardPrimaryBtnIcon: {
    color: utilColors.white,
  },
  svgGradient: {
    color: gradients.blue,
  },
  svgProgressBackground: {
    color: additionalThemes.screenGames.progressBg,
  },
  challengeCardList: {
    marginLeft: 8,
  },
  challengeCardItem: {
    margin: 4,
  },
  challengeCardImage: {
    borderRadius: 12,
    width: 200,
    height: 112,
  },
  challengeCardTitle: {
    ...font.subtitle1,
    marginVertical: 8,
    color: utilColors.dark,
  },
  challengeCardAuthor: {
    ...font.body,
    color: utilColors.grey,
  },
  challengeCardPrimaryBtn: {
    backgroundColor: theme.btnBg,
    marginVertical: 14,
  },
  sheetContainer: {
    flex: 1,
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
  sheetCardHeroImage: {
    width: 72,
    height: 72,
    marginBottom: 12,
    alignSelf: 'center',
  },
  sheetAchievementCard: {
    backgroundColor: utilColors.white,
    borderRadius: 16,
    marginBottom: 6,
    overflow: 'hidden',
  },
  sheetAchievementCardContent: {
    padding: 12,
  },
  sheetAchievementHeader: {
    backgroundColor: theme.bodyBg,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sheetAchievementHeaderText: {
    ...font.bodyBold,
    color: utilColors.dark,
  },
  sheetAchievementBtn: {
    backgroundColor: theme.btnBg,
  },
  sheetClubHeadingText: {
    color: additionalThemes.screenVideo.textBold,
  },
  sheetClubBtn: {
    backgroundColor: additionalThemes.screenVideo.btnBg,
  },
  sheetLeaderboardHeadingText: {
    color: additionalThemes.screenGames.textBold,
  },
  sheetLeaderboardBtn: {
    backgroundColor: additionalThemes.screenChallenges.btnBg,
  },
});

const DashboardBlock = ({
  avatar, bottomSheetRef, dashboardUserData, sessionData, style, reloadComponent,
}) => {
  const profileImg = sessionData?.profileLink || dashboardUserData?.profileImage;

  return <>
    <View style={style.bodyCard} key={reloadComponent}>
      <View style={style.heroCard}>
          <View style={style.heroCardContent}>
            <View style={style.heroCardBlock1}>
              <ImageBackground
                style={style.heroCardImageBg}
                source={dashboardHero}
                resizeMode='stretch'
                resizeMethod='scale'
              >
                <Image
                  source={profileImg ? {
                    uri: profileImg.toString(),
                  } : avatar }
                  style={style.heroCardImage}
                  defaultSource={avatar}
                />
              </ImageBackground>
            </View>
            <View style={style.heroCardBlock2}>
              <View style={style.heroBlockDataContainer}>
                <View style={[style.bodyCardContentTitle, style.heroCardDataBlock]}>
                  <Image source={hkcoin} style={style.heroCardDataIcon} />
                  <Text
                    style={style.heroCardText}>
                      <FormattedMessage
                        defaultMessage={'{coins} coins'}
                        description={'user coins'}
                        values={{
                          coins: sessionData?.pointsEarned || 0,
                        }}
                      />
                  </Text>
                </View>
                {/* <View style={[style.bodyCardContentTitle, style.heroCardDataBlock]}>
                  <Image source={xpPoints} style={style.heroCardDataIcon} />
                  <Text style={style.heroCardText}>{12345} xp</Text>
                </View> */}
              <TouchableOpacity
                style={style.heroCardPrimaryBtn}
                onPress={() => bottomSheetRef.current.open()}
              >
                <Text style={style.heroCardPrimaryBtnText}>
                  <FormattedMessage
                    defaultMessage={'View more'}
                    description={'View More Bottomsheet Btn'}
                  />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  </>;
};

const HomeBlock = ({
  avatar, dashboardUserData, sessionData, navigation, style, reloadComponent,
}) => {
  const profileImg = sessionData?.profileLink || dashboardUserData?.profileImage;
  return <>
    <View style={style.bodyCard} key={reloadComponent}>
      <View style={style.bodyCardHeading}>
        <Text style={style.bodyCardHeadingText}>
          <FormattedMessage
            defaultMessage="Home"
            description="Home card heading"
          />
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Text style={[style.bodyCardHeadingMenu, style.HomeCardHeadingMenu]}>
            <FormattedMessage
              defaultMessage="Edit Profile"
              description="Home card menu"
            />
          </Text>
        </TouchableOpacity>
      </View>
      <View style={style.bodyCardContent}>
        <View style={style.bodyCardContentTitle}>
          <Image
            style={style.bodyCardContentTitleImage}
            source={profileImg ? {
              uri: profileImg.toString(),
            } : avatar}
            defaultSource={avatar}
          />
          <>
            {
              !dashboardUserData
              && <Skeleton width='50%' height={20} style={{ borderRadius: 4, marginLeft: 8 }} />
            }
            {
              dashboardUserData?.name
              && <Text style={style.bodyCardContentTitleText}>{dashboardUserData.name}</Text>
            }
            {
              !dashboardUserData?.name
              && <Text style={[style.bodyCardContentTitleText, style.textSecondary]}>
                <FormattedMessage
                  defaultMessage={'Your name will be shown here'}
                  description={'name fallback message'}
                />
              </Text>
            }
          </>
        </View>
        <View style={style.bodyCardContentContainer}>
          <>
            {
              !dashboardUserData
              && <Skeleton width='50%' height={16} style={{ borderRadius: 4 }} />
            }
            {
              dashboardUserData?.about
              && <Text style={style.bodyCardContentText}>{dashboardUserData.about}</Text>
            }
            {
              !dashboardUserData?.about
              && <Text style={[style.bodyCardContentTitleText, style.textSecondary]}>
                <FormattedMessage
                  defaultMessage={'Your bio will be shown here'}
                  description={'about fallback message'}
                />
              </Text>
            }
          </>
        </View>
      </View>
    </View>
  </>;
};

const GameBlock = ({
  style, navigation, gameData, gameProgress,
}) => {
  const gameProgressValue = new Animated.Value(0);
  const gameDataTextRef = useRef();

  if (gameData) {
    Animated.timing(gameProgressValue, {
      toValue: gameData.gameProgress,
      duration: 1000,
      delay: 1000,
      useNativeDriver: true,
    }).start();

    gameProgressValue.addListener(({ value }) => {
      if (gameDataTextRef?.current) {
        gameDataTextRef.current.setNativeProps({
          text: `${Math.round(value)}`.toString(),
        });
      }
    });
  }

  return <>
    <View style={[style.bodyCard, style.gameCard]}>
      <View style={style.bodyCardHeading}>
        <Text style={style.bodyCardHeadingText}>
          <FormattedMessage
            defaultMessage="Game Progress"
            description="Game Progress card heading"
          />
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Games')}
        >
          <Text style={[style.bodyCardHeadingMenu, style.gameCardHeadingMenu]}>
            <FormattedMessage
              defaultMessage="All Games"
              description="Game Progress card menu"
            />
          </Text>
        </TouchableOpacity>
      </View>
      <View style={style.bodyCardContent}>
        <View style={[style.bodyCardContentTitle, style.gameCardProgressContainer]}>
          <View style={style.gameCardProgressBlock}>
            <View style={style.gameCircularProgressBlock}>
              <CircleGradientProgressBar
                gradientColors={[[style.svgGradient.color[0], '10%'], [style.svgGradient.color[1], '90%']]}
                progressValue={gameData ? gameData.gameProgress : 0}
                totalValue={gameData ? gameData.totalGames : 100}
                startAnim={Boolean(gameData)}
                progressBg={style.svgProgressBackground.color}
              >
                <View style={style.bodyCardContentTitle}>
                  <AnimatedTextInput
                    ref={gameDataTextRef}
                    underlineColorAndroid='transparent'
                    style={style.gameCardText}
                    value={'0'}
                    editable={false}
                  />
                  <Text style={style.gameCardTextLight}>
                    <FormattedMessage
                      defaultMessage={'/{totalGames}'}
                      description={'total games'}
                      values={{
                        totalGames: gameData?.totalGames || '0',
                      }}
                    />
                  </Text>
                </View>
                <Text style={style.gameCardSvgCaption}>
                  <FormattedMessage
                    defaultMessage="completed"
                    description="Game Progress card caption"
                  />
                </Text>
              </CircleGradientProgressBar>
            </View>
          </View>
          <View style={style.gameCardProgressBlock}>
            <View style={[style.bodyCardContentTitle, style.gameCardContent]}>
              <Image
                style={[style.bodyCardContentTitleImage, style.gameCardIcons]}
                source={hkcoin}
              />
              <View style={style.gameCardTextContent}>
                <Text style={style.gameCardSubtitle}>
                  <FormattedMessage
                    defaultMessage={'Coins Earned:'}
                    description='Coins Earned'
                  />
                </Text>
                <Text style={style.gameCardText}>
                  <FormattedMessage
                    defaultMessage={'{totalPointsEarned}'}
                    description={'total points earned'}
                    values={{
                      totalPointsEarned: gameData?.totalPointsEarned || 0,
                    }}
                  />
                </Text>
              </View>
            </View>
            <View style={[style.bodyCardContentTitle, style.gameCardContent]}>
              <Image
                style={[style.bodyCardContentTitleImage, style.gameCardIcons]}
                source={timeSpent}
              />
              <View style={style.gameCardTextContent}>
                <Text style={[style.gameCardSubtitle]}>
                  <FormattedMessage
                    defaultMessage={'Time Spent:'}
                    description='Time Spent'
                  />
                </Text>
                <Text style={style.gameCardText}>
                  <FormattedMessage
                    defaultMessage={'{timeSpent}'}
                    description={'total time spent on platform'}
                    values={{
                      timeSpent: formatSeconds(gameProgress?.totalTimeSpent),
                    }}
                  />
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={[style.bodyCardContent, style.gameInnerCard]}>
        <ScrollView horizontal={true} >
          <View style={style.gameCardImageContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('TurtleHome')} >
              <Image style={style.gameCardImage} source={turtle} />
            </TouchableOpacity>
          </View>
          <View style={style.gameCardImageContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('ZombieLandHome')} >
              <Image style={style.gameCardImage} source={zombieLand} />
            </TouchableOpacity>
          </View>
          <View style={style.gameCardImageContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Codekata')} >
              <Image style={style.gameCardImage} source={codekata} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <View>
        <TouchableOpacity style={[style.bodyCardPrimaryBtn, style.gameCardPrimaryBtn]} onPress={() => navigation.navigate('Games')} >
          <Text style={style.bodyCardPrimaryBtnText}>
            <FormattedMessage
              defaultMessage="Continue Playing"
              description="Game Progress card primary button"
            />
          </Text>
          <Icon
            name="angle-right"
            size={20}
            type="FontAwesome5"
            style={style.bodyCardPrimaryBtnIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  </>;
};

// const ChallengeBlock = ({ challengeData, navigation, style }) => {
//   const challengeCardItem = ({ item }) => <>
//     <TouchableOpacity
//       onPress={() => {
//          navigation.navigate('Challenges', {
//            challengeId: item.challengeId,
//            challengeVirtualName: item.actionUrl.split('/').pop(),
//           });
//          }}
//       activeOpacity={0.5}
//     >
//       <View style={style.challengeCardItem}>
//         <Image
//           source={{
//             uri: item.imgPath,
//           }}
//           style={style.challengeCardImage}
//         />
//         <Text style={style.challengeCardTitle}>{item.challengeName}</Text>
//         <Text style={style.challengeCardAuthor}>{`by ${item.creatorName}`}</Text>
//       </View>
//     </TouchableOpacity>
//   </>;

//   return <>
//     <View>
//       <View style={[style.bodyCardHeading, style.bodyCard]}>
//         <Text style={style.bodyCardHeadingText}>
//           <FormattedMessage
//             defaultMessage="Challenges"
//             description="Challenges card heading"
//           />
//         </Text>
//         <TouchableOpacity
//           onPress={() => navigation.navigate('Challenges')}
//         >
//           <Text style={[style.bodyCardHeadingMenu, style.HomeCardHeadingMenu]}>
//             <FormattedMessage
//               defaultMessage="All Challenges"
//               description="Challenges card menu"
//             />
//           </Text>
//         </TouchableOpacity>
//       </View>
//       <View>
//         {
//           challengeData && <>
//             <FlatList
//               data={challengeData}
//               renderItem={challengeCardItem}
//               keyExtractor={(item, index) => index.toString()}
//               horizontal={true}
//               showsHorizontalScrollIndicator={false}
//               fadingEdgeLength={50}
//               initialNumToRender={3}
//               snapToInterval={200}
//               decelerationRate={0.001}
//               snapToAlignment={'start'}
//               contentInset={{ left: 20 }}
//               automaticallyAdjustContentInsets={false}
//               style={style.challengeCardList}
//             />
//           </>
//         }
//         {
//           !challengeData && <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
//             { [1, 2, 3, 4].map((item) => (
//               <View style={[style.challengeCardItem, { width: 200 }]} key={item}>
//                 <Skeleton width='100%' height={100} style={{ borderRadius: 10, margin: 4 }} />
//                 <Skeleton width='25%' height={24} style={{ borderRadius: 10, margin: 4 }} />
//                 <Skeleton width='75%' height={16} style={{ borderRadius: 8, margin: 4 }} />
//               </View>
//             )) }
//           </ScrollView>
//         }
//       </View>
//       <View style={style.bodyCard}>
//         <TouchableOpacity
//           style={[style.bodyCardPrimaryBtn, style.challengeCardPrimaryBtn]}
//           onPress={() => navigation.navigate('Challenges')}
//         >
//           <Text style={style.bodyCardPrimaryBtnText}>
//             <FormattedMessage
//               defaultMessage="Continue Challenge"
//               description="Game Progress card primary button"
//             />
//           </Text>
//           <Icon
//             name="angle-right"
//             size={20}
//             type="FontAwesome5"
//             style={style.bodyCardPrimaryBtnIcon}
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   </>;
// };

const AchievementCard = ({
  achievementHandler = () => {},
  sessionData = {}, style,
}) => <>
  <View style={style.sheetAchievementCard}>
    <View style={style.sheetAchievementHeader}>
      <View style={[style.bodyCardContentTitle, style.heroCardDataBlock, style.marginRight24]}>
        <Image source={hkcoin} style={style.heroCardDataIcon} />
        <Text style={style.heroCardText}>
          <FormattedMessage
            defaultMessage={'{coins} coins'}
            description={'user coins'}
            values={{
              coins: sessionData?.pointsEarned || 0,
            }}
          />
        </Text>
      </View>
      {/* <View style={[style.bodyCardContentTitle, style.heroCardDataBlock]}>
        <Image source={xpPoints} style={style.heroCardDataIcon} />
          <FormattedMessage
            defaultMessage={'{xp} xp'}
            description={'user xp'}
            values={{
              xp: userData?.xp,
            }}
          />
      </View> */}
      <View style={style.sheetCardBodyRow1}></View>
    </View>
    <View style={style.sheetAchievementCardContent}>
      <View style={style.sheetCardHeroContent}>
        <View>
          <Image
            source={achievementImage}
            style={style.sheetCardHeroImage}
          />
          <Text style={style.sheetCardBodyTextBold}>
            <FormattedMessage
              defaultMessage='Achieved Badge'
              description='achieved badge'
            />
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={achievementHandler}
        style={[style.sheetCardButton, style.sheetAchievementBtn]}
      >
        <Text style={style.sheetCardButtonText}>
          <FormattedMessage
            defaultMessage='View All Awards'
            description='View awards button'
          />
        </Text>
      </TouchableOpacity>
    </View>
  </View>
</>;

// const ClubCard = ({
//   clubData, navigation, style, bottomSheetRef,
// }) => <>
//   <View style={style.sheetCard}>
//     <View style={style.sheetCardHeading}>
//       <Text style={[style.sheetCardHeadingText, style.sheetClubHeadingText]}>
//         <FormattedMessage
//           defaultMessage={'{clubName}'}
//           description={'Club card heading text'}
//           values={{
//             clubName: clubData?.clubName,
//           }}
//         />
//       </Text>
//     </View>
//     <View style={style.sheetCardHeroContent}>
//       <Text style={[style.sheetCardTextColor, style.sheetCardHeroTitle]}>
//         <FormattedMessage
//           defaultMessage={'#{rank}'}
//           description={'club rank'}
//           values={{
//             rank: clubData?.rank,
//           }}
//         />
//       </Text>
//       <Text style={style.sheetCardBodyText}>
//         <FormattedMessage
//           defaultMessage={'rank'}
//           description={'sheet card subtitle'}
//         />
//       </Text>
//     </View>
//     <View style={style.sheetCardBodyContent}>
//       <Text style={style.sheetCardSubtitle}>
//         <FormattedMessage
//           defaultMessage={'Most active members'}
//           description={'sheet card subtitle'}
//         />
//       </Text>
//       { clubData?.topMembers?.length > 0
//         && clubData.topMembers.map((item, index) => (
//         <View style={style.sheetCardBodyRow} key={index}>
//           <Text style={style.sheetCardBodyText}>
//             <FormattedMessage
//               defaultMessage={'{name}'}
//               description={'member name'}
//               values={{
//                 name: item.name,
//               }}
//             />
//           </Text>
//           <Text style={style.sheetCardBodyText}>
//             <FormattedMessage
//               defaultMessage={'{points}'}
//               description={'member points'}
//               values={{
//                 points: item.points,
//               }}
//             />
//           </Text>
//         </View>)) }
//     </View>
//     <TouchableOpacity
//       onPress={() => {
//         bottomSheetRef.current.close();
//         navigation.navigate('Club');
//       }}
//       style={[style.sheetCardButton, style.sheetClubBtn]}
//     >
//       <Text style={style.sheetCardButtonText}>
//         <FormattedMessage
//           defaultMessage='View Club'
//           description='Club show button'
//         />
//       </Text>
//     </TouchableOpacity>
//   </View>
// </>;

const LeaderBoardCard = ({
  handleShowLeaderBoard = () => {},
  leaderboardData, leaderBoardUserData, style,
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
            >
              <FormattedMessage
                defaultMessage={'#{rank}'}
                description={'user rank'}
                values={{
                  rank: leaderBoardUserData?.rank || '--',
                }}
              />
            </Text>
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
                >
                  <FormattedMessage
                    defaultMessage={'#{rank}'}
                    description={'members rank'}
                    values={{
                      rank: item?.rank || '--',
                    }}
                  />
                </Text>
                <Text style={style.sheetCardBodyText}>
                  <FormattedMessage
                    defaultMessage={'{name}'}
                    description={'member name'}
                    values={{
                      name: item.name,
                    }}
                  />
                </Text>
              </View>
              <Text style={style.sheetCardBodyText}>
                <FormattedMessage
                  defaultMessage={'{points}'}
                  description={'member points'}
                  values={{
                    points: item.points,
                  }}
                />
              </Text>
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
      onPress={handleShowLeaderBoard}
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

const compareProps = (prev, next) => {
  let isEqual = true;
  Object.keys(prev).forEach((key) => {
    if (key === 'avatar' || key === 'navigation' || key === 'style') {
      isEqual = isEqual && true;
    } else if (typeof prev[key] === 'function') {
      // use memoized function for passing as props
      isEqual = isEqual && true;
    } else if (key.toLowerCase().includes('ref')) {
      isEqual = true;
    } else {
      isEqual = isEqual && JSON.stringify(prev[key]) === JSON.stringify(next[key]);
    }
  });
  return isEqual;
};

const DashboardComponent = memo(DashboardBlock, compareProps);
const HomeComponent = memo(HomeBlock, compareProps);
const GameComponent = memo(GameBlock, compareProps);
// const ChallengeComponent = memo(ChallengeBlock, compareProps);
const LeaderBoardComponent = memo(LeaderBoardCard, compareProps);
// const ClubComponent = memo(ClubCard, compareProps);
const AchievementComponent = memo(AchievementCard, compareProps);

const Index = ({ route, navigation }) => {
  const { font, theme } = useContext(ThemeContext);
  const pageTheme = theme.screenHome;
  const style = getStyles(pageTheme, theme.utilColors, theme.gradients, font, theme);

  const isPageMounted = React.useRef(true);
  const [reloadComponent, setReloadComponent] = React.useState(0);
  const authContext = React.useContext(AuthContext);
  const bottomSheetRef = useRef();
  const loaderRef = useRef(null);
  // const { subscriptionData } = useContext(SubscriptionContext);

  const {
    state: dashboardState,
    static: { getSessionData, getDashboardData },
  } = useDashboard({ isPageMounted });
  const { state: leaderBoardState } = useLeaderBoard({ isPageMounted });
  const {
    state: getChallengesState,
    static: { getChallenges },
  } = useGetChallenges({ isPageMounted });

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

  const onRefresh = () => {
    // setRefreshing(true);
    showLoader();
    Promise.all([
      getSessionData({ cached: false }),
      getDashboardData({ cached: false }),
      getChallenges({ cached: false }),
    ])
      .then(() => {
        setReloadComponent(reloadComponent + 1);
        hideLoader();
      })
      .catch(() => {
        // show snackbar of error
        hideLoader();
      });
  };

  const {
    status: dashboarStatus,
    userData: dashboardUserData,
    // clubData,
    // sessionData,
    gameData,
  } = dashboardState;

  const {
    leaderboardData,
    userData: leaderBoardUserData,
    status: leaderboardStatus,
    gameProgress,
  } = leaderBoardState;

  const { authState: { sessionData } } = authContext;

  const {
    status: challengesStatus,
    // trendingChallenges,
  } = getChallengesState;

  const bottomSheetStyles = {
    draggableIcon: {
      backgroundColor: theme.utilColors.white,
    },
    container: {
      backgroundColor: 'transparent',
      paddingHorizontal: 12,
    },
  };

  const handleLoginRoute = () => {
    authContext.setAuthState((prevState) => ({
      ...prevState,
      isLoggedIn: false,
    }));
  };

  const handleViewAllAwards = () => {
    bottomSheetRef.current.close();
    navigation.navigate('AwardsCollectibles');
  };

  const handleShowLeaderBoard = () => {
    bottomSheetRef.current.close();
    navigation.navigate('Leaderboard');
  };

  const onHomeFocused = () => {
    // if (authContext.authState.appData.isRefresh) {
    //   onRefresh();
    //   authContext.setAuthState((prevState) => ({
    //     ...prevState,
    //     appData {
    //       isRefresh: false,
    //     },
    //   }));
    // }
    if (authContext.authState.appData.isRefresh) {
      onRefresh();
      if (isPageMounted.current) {
        authContext.setAuthState((prevState) => ({
          ...prevState,
          appData: {
            isRefresh: false,
          },
        }));
      }
    }
  };

  // const onHomeUnFocused = () => {
  //   console.log('home unfocused');
  // };

  // const isClubEnabled = () => {
  //   const clubEnabled = isFeatureEnabled(subscriptionData, 'clubs');
  //   return clubEnabled && clubEnabled.enabled;
  // };

  const focusEffect = useCallback(() => {
    onHomeFocused();

    // return () => {
    //   onHomeUnFocused();
    // };
  }, []);

  useFocusEffect(() => {
    focusEffect();
  });

  const memoizedAppData = useMemo(() => authContext.authState.appData,
    [authContext.authState.appData]);

  useEffect(() => {
    onHomeFocused();
  }, [memoizedAppData]);

  React.useEffect(() => {
    onRefresh();

    return () => {
      isPageMounted.current = false;
      hideLoader();
    };
  }, []);

  return (
    <>
      {
        [dashboarStatus, leaderboardStatus, challengesStatus].includes('access_denied')
        && <AuthErrorModal
          navigation={navigation}
          route={route}
          handleLoginRoute={handleLoginRoute}
        />
      }
      {
        ![dashboarStatus, leaderboardStatus, challengesStatus].includes('access_denied')
        && <>
          <ScrollView
            style={style.container}
            refreshControl={
              <RefreshControl
                // refreshing={refreshing}
                refreshing={false}
                onRefresh={onRefresh}
              />
            }>
            <View style={style.container}>
              {
                dashboardUserData
                && <>
                  <DashboardComponent
                    avatar={defaultUser}
                    bottomSheetRef={bottomSheetRef}
                    dashboardUserData={dashboardUserData}
                    // gameData={gameData}
                    sessionData={sessionData}
                    style={style}
                    navigation={navigation}
                    reloadComponent={reloadComponent}
                  />
                  <HomeComponent
                    avatar={defaultUser}
                    dashboardUserData={dashboardUserData}
                    sessionData={sessionData}
                    navigation={navigation}
                    style={style}
                    reloadComponent={reloadComponent}
                  />
                </>
              }
              {
                gameData
                && <>
                  <GameComponent
                    gameData={gameData}
                    navigation={navigation}
                    style={style}
                    reloadComponent={reloadComponent}
                    gameProgress={gameProgress}
                  />
                </>
              }
              {/* {
                trendingChallenges
                && <>
                  <ChallengeComponent
                    challengeData={trendingChallenges}
                    navigation={navigation}
                    style={style} />
                </>
              } */}
            </View>
          </ScrollView>
          <BottomSheet
            ref={bottomSheetRef}
            customStyles={bottomSheetStyles}
            contentPanEnabled={true}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              <Pressable onPress={() => {}}>
                <AchievementComponent
                  navigation={navigation}
                  style={style}
                  achievementHandler={handleViewAllAwards}
                  // gameData={gameData}
                  sessionData={sessionData}
                />
              {/* {
                  clubData
                  && clubData?.hasClub
                  && <ClubComponent
                    clubData={clubData}
                    navigation={navigation}
                    style={style}
                    bottomSheetRef={bottomSheetRef}
                    enabled={isClubEnabled()}
                  />
                } */}
                {
                  leaderboardData
                  && <LeaderBoardComponent
                  leaderboardData={leaderboardData}
                  leaderBoardUserData={leaderBoardUserData}
                  bottomSheetRef={bottomSheetRef}
                  navigation={navigation}
                  style={style}
                  handleShowLeaderBoard={handleShowLeaderBoard} />
                }
              </Pressable>
            </ScrollView>
          </BottomSheet>
        </>
      }
      <Loader
        ref={loaderRef}
        route={'Home'}
      />
    </>
  );
};

export default Index;
