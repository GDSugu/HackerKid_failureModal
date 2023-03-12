import React, { memo, useRef, useState } from 'react';
import {
  Animated, StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, TextInput,
} from 'react-native';
import { FormattedMessage } from 'react-intl';
import { SvgUri } from 'react-native-svg';
import GameHeader from '../components/Header/GameHeader';
import ThemeContext from '../components/theme';
import CircleGradientProgressBar from '../components/CircleGradientProgressBar';
import ImgComponent from '../components/ImgComponent';
import Icon from '../common/Icons';
import hkcoin from '../../images/common/hkcoin.png';
import timeSpent from '../../images/common/eva_clock-fill.png';
import defaultUserImg from '../../images/profile/default_user.png';
import { useLeaderBoard } from '../../hooks/pages/leaderboard';
import { LightBlue } from '../../colors/_colors';
import Loader from '../components/Loader';
import { useTimeTrack } from '../../hooks/pages/timeTrack';
import { useAwardsByGame } from '../../hooks/pages/awards';
import BottomSheet from '../components/BottomSheet';
import AwardProgressBar from '../components/AwardProgressBar';

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

const getStyle = (theme, font, utilColors, gradients) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${utilColors.black}da`,
  },
  statsCard: {
    backgroundColor: utilColors.black,
    padding: 24,
    paddingHorizontal: 32,
    margin: 8,
    marginVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  stats: {
    alignItems: 'center',
  },
  progressBar: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    marginVertical: 8,
  },
  svgGradient: {
    color: gradients.blue,
  },
  progressText: {
    ...font.subtitle1,
    color: utilColors.white,
    includeFontPadding: false,
    padding: 0,
    margin: 0,
  },
  progressTotalText: {
    ...font.subtitle1,
    color: utilColors.lightGrey,
  },
  heroCardDataIcon: {
    width: 32,
    height: 32,
    marginBottom: 8,
  },
  heroCardTitleText: {
    ...font.body,
    color: utilColors.lightGrey,
    marginBottom: 4,
  },
  heroCardText: {
    ...font.subtitle2,
    color: utilColors.white,
    marginLeft: 8,
  },
  awardsContainer: {
    margin: 8,
  },
  awardsTitleText: {
    ...font.subtitleBold,
    color: utilColors.lightGrey,
  },
  awardsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  awards: {
    width: 86,
    height: 86,
    borderRadius: 12,
    backgroundColor: utilColors.white,
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  awardImg: {
    width: 42,
    height: 32,
  },
  awardName: {
    ...font.captionBold,
    color: utilColors.dark,
  },
  leaderboardContainer: {
    marginVertical: 4,
  },
  leaderBoardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pV8: {
    paddingVertical: 8,
  },
  leaderBoardCellStart: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 12,
  },
  leaderBoardCellMiddle: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaderBoardCellLast: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  leaderBoardTitleText: {
    ...font.body,
    color: utilColors.lightGrey,
  },
  leaderBoardBtn: {
    backgroundColor: utilColors.white,
    borderColor: theme.pointsBtnBorderColor,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  leaderBoardBodyText: {
    ...font.subtitle2,
    color: utilColors.white,
  },
  leaderBoardUserImg: {
    width: 48,
    height: 48,
    borderRadius: 100,
    marginRight: 8,
  },
  loadingText: {
    ...font.heading5,
    color: utilColors.grey,
    textAlign: 'center',
  },
  loadingContainer: {
    padding: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leaderBoardFooterContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  leaderBoardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: `${utilColors.black}f1`,
  },
  leaderBoardNavIcon: {
    borderRadius: 50,
    paddingVertical: 6,
    paddingLeft: 15,
    width: 38,
    height: 38,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leaderBoardPaginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leaderBoardPaginationText: {
    ...font.heading6R,
    color: utilColors.white,
    marginHorizontal: 12,
  },
});

const getBottomSheetStyles = (theme, font, utilColors, gradients) => StyleSheet.create({
  awardProgressBar: {
    width: '100%',
    height: 5,
    marginTop: 25,
    borderRadius: 30,
    backgroundColor: theme.loginTabInactiveBorder,
  },
  awardGradient: {
    height: '100%',
    borderRadius: 30,
  },
  awardProgressGradient: gradients.redYellow,
  bottomSheetAwardImage: {
    marginTop: 30,
    alignSelf: 'center',
    width: 96,
    height: 96,
    // resizeMode: 'contain',
  },
  bottomSheetBody: {
    paddingHorizontal: 35,
    borderRadius: 18,
    paddingBottom: 16,
  },
  bottomSheetAwardSubtitle: {
    marginTop: 5,
  },
  bottomSheetProgressBar: {
    marginTop: 25,
  },
  awardTitleWithSubtitleSection: {
    marginTop: 24,
  },
  currentStreakContainer: {
    backgroundColor: theme.bodyBg,
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    marginTop: 25,
  },
  nextAchievementIndicator: {
    flexDirection: 'row',
    marginTop: 25,
  },
  nextAchievementSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressTextContainer: {
    position: 'absolute',
    right: '50%',
    width: 100,
    transform: [
      { translateX: 80 },
    ],
    bottom: 8,
  },
  progressTextualFormContainer: {
    position: 'absolute',
    right: 0,
    bottom: 2,
  },
  smallText: {
    ...font.body,
  },
  text: {
    ...font.subtitle2,
  },
  textColor1: {
    color: utilColors.dark,
  },
  textColor3: {
    color: theme.textBold,
  },
  textColor4: {
    color: utilColors.lightGrey,
  },
  whiteBg: {
    backgroundColor: utilColors.white,
  },
});

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const PaginationComponent = ({
  handlePagination, paginationDetails, style, utilColors,
}) => {
  const totalPage = Math.ceil(paginationDetails?.overallCount / paginationDetails?.countPerPage);
  let paginationFlag = false;
  let showEllipse = false;
  if (totalPage > 5) {
    paginationFlag = true;
    showEllipse = true;
  }

  return <>
    {
      Array(totalPage).fill(0).map((_, index) => {
        const idx = index + 1;
        if (paginationFlag) {
          const pageToShow = (idx === 1
            || paginationDetails?.page === idx
            || paginationDetails?.page === idx - 1
            || paginationDetails?.page === idx + 1
            || idx === totalPage);
          const rElem = (pageToShow
          && <TouchableOpacity key={index} onPress={() => handlePagination(idx)}>
            <Text style={{
              ...style.leaderBoardPaginationText,
              color: paginationDetails?.page === idx ? utilColors.shadowColor1 : utilColors.white,
            }}>
              <FormattedMessage
                defaultMessage={'{page}'}
                description={'Page'}
                values={{ page: idx }}
              />
            </Text>
          </TouchableOpacity>)
          || (
            (!pageToShow && showEllipse)
            && <TouchableOpacity key={index} onPress={() => handlePagination(idx)}>
                <Text style={{
                  ...style.leaderBoardPaginationText,
                  color: utilColors.white,
                }}>
                  <FormattedMessage
                    defaultMessage={'...'}
                    description={'Page'}
                  />
                </Text>
              </TouchableOpacity>
          );
          if (!pageToShow) {
            showEllipse = false;
            return rElem;
          }
          if (pageToShow && !showEllipse) {
            showEllipse = true;
            return rElem;
          }
        }
        return <TouchableOpacity key={index} onPress={() => handlePagination(idx)}>
          <Text style={{
            ...style.leaderBoardPaginationText,
            color: paginationDetails?.page === idx ? utilColors.shadowColor1 : utilColors.white,
          }}>
            <FormattedMessage
              defaultMessage={'{page}'}
              description={'Page'}
              values={{ page: idx }}
            />
          </Text>
        </TouchableOpacity>;
      })
    }
  </>;
};

const AwardComponent = ({ awardItem, style, onAwardItemPress = () => {} }) => <>
  {
    Object.keys(awardItem).length > 0
    && <>
      <TouchableOpacity onPress={() => onAwardItemPress(awardItem)}>
        <View style={style.awards}>
          {/* <Image
            resizeMode='center'
            source={{
              uri: awardItem.awardImage,
            }}
            style={style.awardImg}
            defaultSource={award3}
            /> */}
          <SvgUri
            uri={awardItem.awardImage}
            // style={style.awardImg}
            width={'60%'}
            height={'60%'}
          />
          <Text style={style.awardName} >
            <FormattedMessage
              defaultMessage={'{awardName}'}
              description={'award name'}
              values={{
                awardName: awardItem.awardName,
              }}
            />
          </Text>
        </View>
      </TouchableOpacity>
    </>
  }
</>;

const AwardsContainerComponent = ({ awards, style, onAwardItemPress = () => {} }) => <>
  {
    awards?.length > 0
    && <>
      <View style={style.awardsContainer}>
        <Text style={style.awardsTitleText}>
          <FormattedMessage
            defaultMessage={'Earned Awards'}
            description={'Earned Awards'}
          />
        </Text>
        <View style={style.awardsRow}>
          {
            awards.map((award, index) => <AwardComponent
              awardItem={award}
              style={style}
              key={index}
              onAwardItemPress={onAwardItemPress}
            />)
          }
        </View>
      </View>
    </>
  }
</>;

const MemoizedAwardsContainer = memo(AwardsContainerComponent, compareProps);

const GameLeaderBoard = ({ route, navigation }) => {
  const { static: { startTimeTrack, stopTimeTrack } } = useTimeTrack({ navigation });
  const { params: { game } } = route;
  const { font, theme } = React.useContext(ThemeContext);
  const style = getStyle(theme.screenGameLeaderBoard, font, theme.utilColors, theme.gradients);
  const bsStyle = getBottomSheetStyles(
    theme.screenGameLeaderBoard, font, theme.utilColors, theme.gradients,
  );
  const isPageMounted = React.useRef(true);
  const progressInputRef = React.useRef(null);
  const bottomSheetRef = React.useRef(null);
  const gameProgressValue = new Animated.Value(0);

  const [localState, setLocalState] = useState({
    awardInfoToView: false,
  });

  const {
    awardInfoToView,
  } = localState;

  const {
    state, getLeaderBoardData,
  } = useLeaderBoard({ isPageMounted, initializeData: false });
  const {
    status, gameProgress, leaderboardData, userData, paginationDetails,
  } = state;

  const { awardsByGameState } = useAwardsByGame(
    { initializeData: true, isPageMounted, game },
  );
  const { awards } = awardsByGameState;

  const memoizedProgress = React.useMemo(() => gameProgress, [gameProgress]);
  const memoizedUserData = React.useMemo(() => userData, [userData]);
  const memoizedLeaderboardData = React.useMemo(() => leaderboardData, [leaderboardData]);
  const memoizedPaginationDetails = React.useMemo(() => paginationDetails, [paginationDetails]);

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

  const showBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.open();
    }
  };

  const hideBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  };

  const totalPage = Math.ceil(
    memoizedPaginationDetails.overallCount / memoizedPaginationDetails.countPerPage,
  );

  const disablePrevBtn = memoizedPaginationDetails.page <= 1;
  const disableNextBtn = totalPage === memoizedPaginationDetails.page;

  const nextBtnPressHandler = () => {
    if (disableNextBtn) return;
    if (memoizedPaginationDetails.page === totalPage) return;
    showLoader();
    getLeaderBoardData({ pageNumber: memoizedPaginationDetails.page + 1, game })
      .then(() => {
        hideLoader();
      });
  };

  const prevBtnPressHandler = () => {
    if (disablePrevBtn) return;
    if (memoizedPaginationDetails.page === 1) return;
    showLoader();
    getLeaderBoardData({
      pageNumber: memoizedPaginationDetails.page - 1,
      game,
    })
      .then(() => {
        hideLoader();
      });
  };

  const handlePagination = (page) => {
    showLoader();
    getLeaderBoardData({ pageNumber: page, game })
      .then(() => {
        hideLoader();
      });
  };

  const isUserInCurrentPage = (currentPage, userUniqueUrl) => {
    if (currentPage && userUniqueUrl) {
      const loggedInUserFound = currentPage.find((obj) => obj.uniqueUrl === userUniqueUrl);
      return !!loggedInUserFound;
    }
    return true;
  };

  const bottomSheetStyles = {
    draggableIcon: style.bottomSheetDragButton,
    container: {
      backgroundColor: '#00000000',
      // paddingHorizontal: 12,
    },
  };

  const setToViewAward = (awardObj) => {
    setLocalState((prev) => ({
      ...prev,
      awardInfoToView: awardObj,
    }));
  };

  const onAwardItemPress = (pressedAwardDetails) => {
    setToViewAward(pressedAwardDetails);
    showBottomSheet();
  };

  // const awards = [
  //   {
  //     img: award1,
  //     title: 'Most Coins',
  //   },
  //   {
  //     img: award2,
  //     title: 'Most Time Spent',
  //   },
  //   {
  //     img: award3,
  //     title: 'Most Levels Completed',
  //   },
  // ];

  React.useEffect(() => {
    if (memoizedProgress) {
      Animated.timing(gameProgressValue, {
        toValue: memoizedProgress.completedQuestions,
        duration: 1000,
        delay: 1000,
        useNativeDriver: true,
      }).start();

      gameProgressValue.addListener(({ value }) => {
        if (progressInputRef.current) {
          progressInputRef.current.setNativeProps({
            text: `${Math.round(value)}`.toString(),
          });
        }
      });
    }
  }, [memoizedProgress]);

  React.useEffect(() => {
    startTimeTrack(`${game}-leaderboard`);
    showLoader();
    getLeaderBoardData({ pageNumber: 1, game })
      .then(() => {
        hideLoader();
      });

    return () => {
      isPageMounted.current = false;
      stopTimeTrack(`${game}-leaderboard`);
      hideLoader();
      hideBottomSheet();
    };
  }, []);

  return <>
    <GameHeader animation={false} game={game} route={'GameLeaderBoard'} closeLeaderBoard={true}/>
    <ScrollView style={{
      ...style.container,
      marginBottom: !(isUserInCurrentPage(memoizedLeaderboardData, memoizedUserData.uniqueUrl))
        ? 134 : 70,
    }}>
      <View style={style.statsCard}>
        {
          memoizedProgress
          && <>
            <View style={style.stats}>
              <View style={style.progressBar}>
                <CircleGradientProgressBar
                  gradientColors={[[style.svgGradient.color[0], '10%'], [style.svgGradient.color[1], '90%']]}
                  progressValue={memoizedProgress?.completedQuestions || 0}
                  totalValue={memoizedProgress?.totalQuestions || 0}
                  startAnim={Boolean(memoizedProgress)}
                  strokeWidth={16}
                  progressBg={theme.screenGameLeaderBoard.progressBg}
                >
                </CircleGradientProgressBar>
              </View>
              <View style={style.leaderBoardRow}>
                <AnimatedTextInput
                  ref={progressInputRef}
                  underlineColorAndroid="transparent"
                  style={style.progressText}
                  value={'0'}
                  editable={false}
                />
                <Text style={style.progressTotalText}>
                  <FormattedMessage
                    defaultMessage={'/{totalQns}'}
                    description={'Game Leader Board: Total Questions'}
                    values={{ totalQns: gameProgress ? gameProgress.totalQuestions : '--' }}
                  />
                </Text>
              </View>
              <Text style={style.heroCardTitleText}>
                <FormattedMessage
                  defaultMessage={'completed'}
                  description={'Game progress'}
                />
              </Text>
            </View>
          </>
        }
        {
          memoizedUserData
          && <>
            <View style={style.stats}>
              <Image source={hkcoin} style={style.heroCardDataIcon} />
              <Text style={style.heroCardTitleText}>
                <FormattedMessage
                  defaultMessage={'Coins Earned:'}
                  description={'Coins Earned Title'}
                />
              </Text>
              <Text style={style.heroCardText}>
                  <FormattedMessage
                    defaultMessage={'{coins} coins'}
                    description={'Coins'}
                    values={{ coins: memoizedUserData?.points || 0 }}
                  />
              </Text>
            </View>
          </>
        }
        <View style={style.stats}>
          <Image source={timeSpent} style={style.heroCardDataIcon} />
          <Text style={style.heroCardTitleText}>
            <FormattedMessage
              defaultMessage={'Time Spent:'}
              description={'Time spent title'}
            />
          </Text>
          <Text style={style.heroCardText}>
              <FormattedMessage
                defaultMessage={'{timeInMinutes} Mins'}
                description={'Time spent'}
                values={{ timeInMinutes: 10 }}
              />
          </Text>
        </View>
      </View>
      {/* {
        awards?.length > 0
        && <>
          <View style={style.awardsContainer}>
            <Text style={style.awardsTitleText}>
              <FormattedMessage
                defaultMessage={'Earned Awards'}
                description={'Earned Awards'}
              />
            </Text>
            <View style={style.awardsRow}>
              {
                awards.map((award, index) => <AwardComponent
                  awardItem={award}
                  style={style}
                  key={index}
                />)
              }
            </View>
          </View>
        </>
      } */}
      <MemoizedAwardsContainer
        awards={awards}
        style={style}
        onAwardItemPress={onAwardItemPress}
      />

      <View style={style.leaderboardContainer}>
        <View style={style.leaderBoardRow}>
          <View style={style.leaderBoardCellStart}>
            <Text style={style.leaderBoardTitleText}>
              <FormattedMessage
                defaultMessage={'Rank'}
                description={'Rank'}
              />
            </Text>
          </View>
          <View style={style.leaderBoardCellMiddle}>
            <Text style={style.leaderBoardTitleText}>
              <FormattedMessage
                defaultMessage={'Student Name'}
                description={'Student Name'}
              />
            </Text>
          </View>
          <View style={style.leaderBoardCellLast}>
            <TouchableOpacity style={style.leaderBoardBtn} onPress={() => {}} disabled={true}>
              <Text style={style.leaderBoardTitleText}>
                <FormattedMessage
                  defaultMessage={'Coins'}
                  description={'LeaderBoard Points'}
                />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* {
          state.uiData.loading
          && <Loader />
        } */}
        {
          (status === 'success' && !(state.uiData.loading))
          && memoizedLeaderboardData
            .map((item, index) => <View key={index} style={{
              ...style.leaderBoardRow,
              ...style.pV8,
              backgroundColor: item.uniqueUrl === memoizedUserData.uniqueUrl ? `${LightBlue.color100}C4` : 'transparent',
            }}>
              <View style={style.leaderBoardCellStart}>
                <Text style={style.leaderBoardBodyText}>
                  <FormattedMessage
                    defaultMessage={'#{rank}'}
                    description={'Rank'}
                    values={{ rank: item.rank }}
                  />
                </Text>
              </View>
              <View style={[style.leaderBoardCellMiddle, style.flexRow]}>
                <ImgComponent
                  fallback={defaultUserImg}
                  url={item.profileImage}
                  style={style.leaderBoardUserImg}
                  resizeMode='cover'
                />
                <Text style={style.leaderBoardBodyText}>
                  <FormattedMessage
                    defaultMessage={'{studentName}'}
                    description={'Student Name'}
                    values={{ studentName: item.name }}
                  />
                </Text>
              </View>
              <View style={style.leaderBoardCellLast}>
                <Text style={style.leaderBoardBodyText}>
                  <FormattedMessage
                    defaultMessage={'{points}'}
                    description={'user points'}
                    values={{ points: item.points }}
                  />
                </Text>
              </View>
            </View>)
        }
        {
          status === 'error'
          && <>
            <View style={style.loadingContainer}>
              <Text style={style.loadingText}>
                <FormattedMessage
                  defaultMessage={'Loading failed due to some unknown error! Please try again later.'}
                  description={'Error'}
                />
              </Text>
            </View>
          </>
        }
      </View>
    </ScrollView>
    <View style={style.leaderBoardFooterContainer}>
      {
        !(isUserInCurrentPage(memoizedLeaderboardData, memoizedUserData.uniqueUrl))
        && <>
          <View style={{
            ...style.leaderBoardRow,
            ...style.pV8,
            backgroundColor: `${LightBlue.color100}C4`,
          }}>
            <View style={style.leaderBoardCellStart}>
            <Text style={style.leaderBoardBodyText}>
              <FormattedMessage
                defaultMessage={'#{rank}'}
                description={'Rank'}
                values={{ rank: memoizedUserData.rank }}
              />
            </Text>
          </View>
          <View style={[style.leaderBoardCellMiddle, style.flexRow]}>
            <ImgComponent
              fallback={defaultUserImg}
              url={memoizedUserData.profileImage}
              style={style.leaderBoardUserImg}
              resizeMode='cover'
            />
            <Text style={style.leaderBoardBodyText}>
              <FormattedMessage
                defaultMessage={'{studentName}'}
                description={'Student Name'}
                values={{ studentName: memoizedUserData.name }}
              />
            </Text>
          </View>
          <View style={style.leaderBoardCellLast}>
            <Text style={style.leaderBoardBodyText}>
              <FormattedMessage
                defaultMessage={'{points}'}
                description={'user points'}
                values={{ points: memoizedUserData.points }}
              />
            </Text>
          </View>
        </View>
      </>
      }
      <View style={style.leaderBoardFooter}>
        <TouchableOpacity
          onPress={prevBtnPressHandler}
          disabled={disablePrevBtn}
        >
          <Icon
            style={{
              ...style.leaderBoardNavIcon,
              borderColor: disablePrevBtn
                ? theme.utilColors.lightGrey
                : theme.utilColors.shadowColor1,
            }}
            type='FontAwesome'
            size={24}
            name={'angle-left'}
            color={disablePrevBtn
              ? theme.utilColors.lightGrey
              : theme.utilColors.shadowColor1}
          />
        </TouchableOpacity>
        <View style={style.leaderBoardPaginationContainer}>
          {
            memoizedPaginationDetails
            && <>
              <PaginationComponent
                handlePagination={handlePagination}
                paginationDetails={memoizedPaginationDetails}
                style={style}
                utilColors={theme.utilColors}
              />
            </>
          }
        </View>
        <TouchableOpacity
          onPress={nextBtnPressHandler}
          disabled={disableNextBtn}
        >
          <Icon
            style={{
              ...style.leaderBoardNavIcon,
              borderColor: disableNextBtn
                ? theme.utilColors.lightGrey
                : theme.utilColors.shadowColor1,
            }}
            type='FontAwesome'
            size={24}
            name={'angle-right'}
            color={disableNextBtn
              ? theme.utilColors.lightGrey
              : theme.utilColors.shadowColor1}
          />
        </TouchableOpacity>
      </View>
    </View>
    <BottomSheet
      ref={bottomSheetRef}
      customStyles={bottomSheetStyles}
      contentPanEnabled={true}
    >
      <View style={[bsStyle.whiteBg, bsStyle.bottomSheetBody]}>
        {/* <Image
          source={{ uri: awardInfoToView.awardImage }}
          style={style.bottomSheetAwardImage} /> */}
        <View style={bsStyle.bottomSheetAwardImage}>
          <SvgUri
            uri={awardInfoToView.awardImage}
            width={'100%'}
            height={'100%'}
          />
        </View>
        <View style={bsStyle.awardTitleWithSubtitleSection}>
          <Text style={[bsStyle.textColor1, bsStyle.text]}>
            <FormattedMessage defaultMessage={'{awardName}'} description='award name' values={{
              awardName: awardInfoToView.awardName,
            }} />
          </Text>
          <Text style={[bsStyle.textColor4, bsStyle.smallText, bsStyle.bottomSheetAwardSubtitle]}>
            <FormattedMessage defaultMessage={'{awardDescription}'} description='award description' values={{
              awardDescription: awardInfoToView.awardDescription,
            }} />
          </Text>
        </View>
        <View style={bsStyle.nextAchievementSection}>
          {
            awardInfoToView.progressDetails && !!awardInfoToView.progressDetails.progress
            && <View style={bsStyle.currentStreakContainer}>
              <Text style={[bsStyle.textColor3, bsStyle.smallText]}>
                <FormattedMessage defaultMessage={'{currentProgress} {unit}'} description='current progress' values={{
                  currentProgress: awardInfoToView.progressDetails.progress,
                  unit: awardInfoToView.progressDetails.progress > 1 ? `${awardInfoToView.progressDetails.unit}s`
                    : awardInfoToView.progressDetails.unit,
                }} />
              </Text>
            </View>
          }
          {
            awardInfoToView.progressDetails && !!awardInfoToView.progressDetails.nextAwardIn
            && <View style={bsStyle.nextAchievementIndicator}>
              <Text style={[bsStyle.textColor4, bsStyle.smallText]}>
                <FormattedMessage defaultMessage={'Next award:'} description='next award label' />
              </Text>
              <Text style={[bsStyle.textColor3, bsStyle.smallText]}>
                <FormattedMessage
                  defaultMessage={'{nextAwardIn} {unit}'}
                  description='next award in'
                  values={{
                    nextAwardIn: ` ${awardInfoToView.progressDetails.nextAwardIn}`,
                    unit: awardInfoToView.progressDetails.nextAwardIn > 1 ? `${awardInfoToView.progressDetails.unit}s`
                      : awardInfoToView.progressDetails.unit,
                  }}
                />
              </Text>
            </View>
          }
        </View>
        <AwardProgressBar
          style={bsStyle}
          contentContainerStyle={bsStyle.bottomSheetProgressBar}
          progressDetailsObj={awardInfoToView.progressableAward
            ? awardInfoToView.progressDetails
            : false}
        />
      </View>
    </BottomSheet>
    <Loader
      route={'GameLeaderBoard'}
      ref={loaderRef}
    />
  </>;
};

export default GameLeaderBoard;
