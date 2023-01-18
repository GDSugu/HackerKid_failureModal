import React from 'react';
import {
  // Image,
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
  handleHint, handleHintVisibility, hintDetails, hintVisible, style,
}) => {
  const navigateHint = (action) => {
    handleHint(action);
  };

  const closeHintContainer = () => handleHintVisibility(false);

  // console.log(hintDetails);

  React.useEffect(() => {
    if (hintVisible) {
      handleHint();
    }
  }, [hintVisible]);

  return <>
    <Animatable.View
      style={{
        ...style.hintContainer,
        bottom: hintVisible ? 84 : -200,
      }}
      animation={ hintVisible ? 'fadeInUp' : 'fadeOutDown' }
      duration={500}
      >
        {
          hintDetails && Object.keys(hintDetails).length > 0
          && <>
            {/* <View style={style.flexBetween}>
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
            </View> */}
            {/* { console.log(hintDetails[0].hints) } */}
            {
              hintDetails[0].hints.map((hint, idx) => <Text key={idx} style={style.hintText}>
                { console.log('hinting   .....', hint) }
                {/* <FormattedMessage
                  defaultMessage={'hint'}
                  description={'Hint'}
                  // values={{
                  //   hint: 'hint 1',
                  // }}
                /> */}
                {/* {hint} */}
                
              </Text>)
            }
            <View style={{
              ...style.flexBetween,
              ...style.mt16,
            }}>
              <TouchableOpacity
                onPress={() => { navigateHint('prev'); }}
                disabled={hintDetails.isFirstHint}
                style={style.navigationBtn}>
                  <Icon
                    name='angle-left'
                    type='FontAwesome5'
                    color={Yellow.color700}
                    size={24}
                  />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { navigateHint('next'); }}
                disabled={hintDetails.isLastHint}
                style={style.navigationBtn}>
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

const ZombieLandMain = () => {
  const isPageMounted = React.useRef(true);
  const { font, theme } = React.useContext(ThemeContext);
  const pageTheme = theme.screenZombieLand;
  const style = getStyles(pageTheme, font, theme.utilColors);

  const ZLScreenArray = [
    {
      tabTitle: 'Question',
      name: 'ZombieLandQuestion',
      component: ZombieLandQuestion,
      Icon: GameQuestion,
    },
    {
      tabTitle: 'Code',
      name: 'ZombieLandEditor',
      component: ZombieLandEditor,
      Icon: GameCode,
    },
    {
      tabTitle: 'Output',
      name: 'ZombieLandOutput',
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

  const handleHintVisibility = (visibility) => {
    toggleHintComponent(visibility);
  };

  const handleHint = (action = false) => {};

  const getNextQuestion = () => {};

  console.log('state , ', zlState.questionObject.hints);

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
            />
            <HintComponent
              handleHint={handleHint}
              hintDetails={zlState.questionObject.hints}
              hintVisible={hintContainerVisible}
              handleHintVisibility={handleHintVisibility}
              style={style}
            />
            <ZombieLandStatusModal
              visible={zlState.uiData.isSuccessModalOpen}
              handleCloseBtn={hideStatusModal}
            />

          </ZombieLandContext.Provider>
        </View>
      </ImageBackground>
    </View>
  </>;
};

export default ZombieLandMain;
