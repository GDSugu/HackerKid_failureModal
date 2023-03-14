import React, { useEffect } from 'react';
import {
  Image,
  ImageBackground,
  // Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FormattedMessage } from 'react-intl';
import * as Animatable from 'react-native-animatable';
import {
  Red,
  // Red,
  Yellow,
} from '../../colors/_colors';
import ThemeContext from '../components/theme';
import ZombieLandBg from '../../images/zombieLand/zombieLand-home-mob-bg.png';
import GameQuestion from '../../images/games/question.svg';
import GameCode from '../../images/games/code.svg';
import GameOutput from '../../images/games/output.svg';
import ZombieLandQuestion from './ZombieLandQuestion';
import ZombieLandEditor from './ZombieLandEditor';
import ZombieLandOutput from './ZombieLandOutput';
import GameNavigator from '../components/GameNavigator';
import { useZombieLand, ZombieLandContext } from '../../hooks/pages/zombieLand';
import Icon from '../common/Icons';
import ZombieLandStatusModal from '../components/Modals/ZombieLandStatusModal';
import { useTimeTrack } from '../../hooks/pages/timeTrack';
import { SubscriptionContext } from '../../hooks/pages/root';
import { isFeatureEnabled } from '../../web/javascripts/common/framework';

const getStyles = (theme, font, utilColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  hintContainer: {
    position: 'absolute',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 12,
    backgroundColor: utilColors.white,
    padding: 16,
  },
  flexBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintText: {
    ...font.subtitle1,
    width: '90%',
    marginBottom: 8,
    color: utilColors.dark,
  },
  registerBtn: {
    backgroundColor: Yellow.color700,
    borderRadius: 12,
    borderColor: Yellow.color700,
    borderWidth: 1,
    flex: 1,
  },
  registerBtnText: {
    color: utilColors.white,
    ...font.subtitle1,
  },
  laterBtn: {
    backgroundColor: utilColors.white,
    borderRadius: 12,
    borderColor: Yellow.color700,
    borderWidth: 1,
    flex: 1,
  },
  laterBtnText: {
    color: utilColors.dark,
    ...font.subtitle1,
  },
  hintTitle: {
    color: utilColors.dark,
    ...font.heading6,
    marginBottom: 12,
  },
  hintImage: {
    aspectRatio: 1,
    width: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 12,
  },
  navigationBtn: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Yellow.color700,
    padding: 2,
    paddingHorizontal: 10,
  },
  mt16: {
    marginTop: 16,
  },
});

const HintComponent = ({
  handleHintVisibility, hintDetails = {}, hintVisible, style,
}) => {
  if (Object.keys(hintDetails).length === 0) {
    return <></>;
  }
  let hintIdx = 0;
  const [currentHint, setCurrentHint] = React.useState({
    idx: hintIdx,
    active: Object.values(hintDetails)[hintIdx],
    isFirst: true,
    isLast: false,
  });

  const changeHint = (state = 'next') => {
    if (state === 'next' && hintIdx <= Object.keys(hintDetails).length - 1) {
      hintIdx += 1;
    } else if (state === 'prev' && hintIdx > 0) {
      hintIdx -= 1;
    }
    setCurrentHint({
      active: hintDetails[hintIdx],
      idx: hintIdx,
      isFirst: hintIdx === 0,
      isLast: hintIdx === Object.keys(hintDetails).length - 1,
    });
  };

  const navigateHint = (action) => {
    changeHint(action);
  };

  const closeHintContainer = () => handleHintVisibility(false);

  return <>
    <Animatable.View
      style={{
        ...style.hintContainer,
        bottom: hintVisible ? 84 : -500,
      }}
      animation={hintVisible ? 'fadeInUp' : 'fadeOutDown'}
      duration={500}
    >
      {
        hintDetails && Object.keys(hintDetails).length > 0
        && <>
          <View style={style.flexBetween}>
            <Text
              style={style.hintTitle}
            >
              <FormattedMessage
                defaultMessage={'Hint:'}
                description={'Hint title'}
              />
            </Text>
            <TouchableOpacity
              onPress={closeHintContainer}>
              <Icon
                name='close'
                color={Red.color500}
                type='FontAwesome'
                size={28}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Image
              style={style.hintImage}
              resizeMode={'contain'}
              source={{
                uri: `https://static.hackerkid.org/hackerKid/live/zombieLandAssets/assets/${currentHint.active.picture.split('/')[3]}`,
              }}
            />
          </View>
          {
            Object.keys(currentHint.active).length > 0
            && currentHint.active.hints.map((hint, idx) => <Text key={idx} style={style.hintText}>
              <FormattedMessage
                defaultMessage={'{idx}. {hint}'}
                description={'Hint'}
                values={{
                  hint,
                  idx: idx + 1,
                }}
              />
            </Text>)
          }
          <View style={{
            ...style.flexBetween,
            ...style.mt16,
          }}>
            <TouchableOpacity
              onPress={() => { navigateHint('prev'); }}
              disabled={currentHint.isFirst}
              style={[style.navigationBtn, { opacity: currentHint.isFirst ? 0.5 : 1 }]}>
              <Icon
                name='angle-left'
                type='FontAwesome5'
                color={Yellow.color700}
                size={24}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { navigateHint('next'); }}
              disabled={currentHint.isLast}
              style={[style.navigationBtn, { opacity: currentHint.isLast ? 0.5 : 1 }]}>
              <Icon
                name='angle-right'
                type='FontAwesome5'
                color={Yellow.color700}
                size={24}
              />
            </TouchableOpacity>
          </View>
        </>
      }
      {
        !hintDetails
        && <>
          <View style={style.flexBetween}>
            <Text style={style.hintText}>
              <FormattedMessage
                defaultMessage={'Move any blocks to get hints'}
                description={'Hint message'}
              />
            </Text>
            <TouchableOpacity
              onPress={closeHintContainer}>
              <Icon
                name='close'
                color={Red.color500}
                type='FontAwesome'
                size={28}
              />
            </TouchableOpacity>
          </View>
        </>
      }
    </Animatable.View>
  </>;
};

const ZombieLandMain = ({ navigation }) => {
  const { static: { startTimeTrack, stopTimeTrack } } = useTimeTrack({ navigation });

  const isPageMounted = React.useRef(true);
  const { font, theme } = React.useContext(ThemeContext);
  const pageTheme = theme.screenZombieLand;
  const style = getStyles(pageTheme, font, theme.utilColors);

  const ZLScreenArray = [
    {
      tabTitle: 'Question',
      name: 'ZombieLandQuestion',
      id: 'zombieland-question',
      component: ZombieLandQuestion,
      Icon: GameQuestion,
    },
    {
      tabTitle: 'Code',
      name: 'ZombieLandEditor',
      id: 'zombieland-editor',
      component: ZombieLandEditor,
      Icon: GameCode,
    },
    {
      tabTitle: 'Output',
      name: 'ZombieLandOutput',
      id: 'zombieland-output',
      component: ZombieLandOutput,
      Icon: GameOutput,
    },
  ];

  const {
    state: zlState,
    setState: zlSetState,
    static: {
      fetchZombieLandQuestion,
      submitZombieLandQuestion,
      toggleHintComponent,
    },
  } = useZombieLand({
    isPageMounted,
    virtualid: 5,
  });

  const {
    uiData: {
      currentGameScreen,
      hintContainerVisible,
    },
  } = zlState;

  const setGameScreen = (screen) => zlSetState((prevState) => ({
    ...prevState,
    uiData: {
      ...prevState.uiData,
      currentGameScreen: screen,
    },
  }));

  const hideStatusModal = () => {
    zlSetState((prevState) => ({
      ...prevState,
      uiData: {
        ...prevState.uiData,
        isSuccessModalOpen: false,
      },
    }));
  };

  const isAlreadyCompleted = () => zlSetState.submissionDetails
    && zlSetState.submissionDetails.completed;

  const { subscriptionData } = React.useContext(SubscriptionContext);

  const gamesLimit = (gameName) => {
    const gamesEnabled = isFeatureEnabled(subscriptionData, 'games', gameName);
    return gamesEnabled.enabled && gamesEnabled[gameName];
  };

  const handleStatusCTA = (status) => {
    if (status === 'passed') {
      // const virtualId = zlState.questionObject.virtualId + 1;
      // if (virtualId < 10) {
      //   fetchZombieLandQuestion({ virtualId })
      //     .then(hideStatusModal);
      const currentVirtualId = zlState.questionObject.virtualId;
      const nextVirtualId = currentVirtualId + 1;
      const isLastQuestion = zlState.questionList[zlState.questionList.length - 1].virtualId
        === currentVirtualId;
      const lastOpenVirtualId = gamesLimit('zombieLand');

      if (isLastQuestion) {
        hideStatusModal();
      } else if (lastOpenVirtualId && (currentVirtualId === lastOpenVirtualId)) {
        navigation.navigate('Premium');
      } else {
        fetchZombieLandQuestion({ virtualId: nextVirtualId }).then(hideStatusModal);
      }
    } else if (status === 'failed') {
      hideStatusModal();
    }
  };

  const handleHintVisibility = (visibility) => {
    toggleHintComponent(visibility);
  };

  const getNextQuestion = () => {

  };

  useEffect(() => {
    startTimeTrack('zombieland-main');

    return () => {
      stopTimeTrack('zombieland-main');
    };
  }, []);

  useEffect(() => {
    const { virtualId } = zlState.questionObject;
    const lastOpenVirtualId = gamesLimit('zombieLand');
    if (lastOpenVirtualId && virtualId > lastOpenVirtualId && !isAlreadyCompleted()) {
      fetchZombieLandQuestion({ virtualId: lastOpenVirtualId });
    }
  }, [zlState]);
  // console.log('state , ', zlState.questionObject.hints);

  return <>
    <View style={style.container}>
      <ImageBackground
        source={ZombieLandBg}
        style={style.container}
      >
        <View style={style.container}>
          <ZombieLandContext.Provider
            value={{
              ctxState: zlState,
              ctxSetState: zlSetState,
              fetchQuestion: fetchZombieLandQuestion,
              handleHintVisibility,
              getNextQuestion,
              submitQuestion: submitZombieLandQuestion,
            }}
          >
            <GameNavigator
              currentScreen={{
                currentGameScreen,
                setCurrentGameScreen: setGameScreen,
              }}
              game='zombieLand'
              initialRoute={'ZombieLandQuestion'}
              ScreenArray={ZLScreenArray}
              themeKey='screenZombieLandQuestion'
              navigation={navigation}
            />
            <HintComponent
              hintDetails={zlState.questionObject.hints}
              hintVisible={hintContainerVisible}
              handleHintVisibility={handleHintVisibility}
              style={style}
            />
            <ZombieLandStatusModal
              visible={zlState.uiData.isSuccessModalOpen}
              handleCloseBtn={hideStatusModal}
              handleCTA={handleStatusCTA}
            />

          </ZombieLandContext.Provider>
        </View>
      </ImageBackground>
    </View>
  </>;
};

export default ZombieLandMain;
