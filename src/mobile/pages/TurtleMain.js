import React, { useContext, useEffect, useRef } from 'react';
import {
  ImageBackground, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FormattedMessage } from 'react-intl';
import ThemeContext from '../components/theme';
// import turtleMainBg from '../../images/turtle/turtleMainBg.png';
import turtleBg from '../../images/turtle/turtleBg.png';
import GameQuestion from '../../images/games/question.svg';
import GameCode from '../../images/games/code.svg';
import GameOutput from '../../images/games/output.svg';
import TurtleQuestion from './TurtleQuestion';
import TurtleEditor from './TurtleEditor';
import TurtleOutput from './TurtleOutput';
import GameNavigator from '../components/GameNavigator';
import { useTurtleFetchQuestion, TurtleContext } from '../../hooks/pages/turtle';
import Icon from '../common/Icons';
import { Red, Yellow } from '../../colors/_colors';
import TurtleSuccessModal from '../components/Modals/TurtleSuccessModal';

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

  useEffect(() => {
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
          hintDetails?.status === 'access_denied'
          && <>
            <View style={style.flexBetween}>
              <Text style={style.hintText}>
                <FormattedMessage
                  defaultMessage={'Register to Get help from Turtle'}
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
            <View style={{
              ...style.flexBetween,
              ...style.mt16,
            }}>
              <TouchableOpacity
                onPress={closeHintContainer}
                style={style.laterBtn}>
                  <Text style={style.laterBtnText}>
                    <FormattedMessage
                      defaultMessage={'Later'}
                      description={'Later'}
                    />
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                style={style.registerBtn}>
                <Text style={style.registerBtnText}>
                  <FormattedMessage
                    defaultMessage={'Register'}
                    description={'Register'}
                  />
                </Text>
              </TouchableOpacity>
            </View>
          </>
        }
        {
          hintDetails?.status === 'success'
          && <>
            <View style={style.flexBetween}>
              <Text style={style.hintText}>
                <FormattedMessage
                  defaultMessage={'{hint}'}
                  description={'Hint'}
                  values={{
                    hint: hintDetails.hint,
                  }}
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
          hintDetails?.status === 'error'
          && <>
            <View style={style.flexBetween}>
              <Text style={style.hintText}>
                <FormattedMessage
                  defaultMessage={'{hintMessage}'}
                  description={'Hint'}
                  values={{
                    hintMessage: hintDetails.message,
                  }}
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
            <View style={{
              ...style.flexCenter,
              ...style.mt16,
            }}>
              <TouchableOpacity
                onPress={closeHintContainer}
                style={style.navigationBtn}>
                  <FormattedMessage
                    defaultMessage={'OK'}
                    description={'OK'}
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

const TurtleMain = () => {
  const isPageMounted = useRef(true);
  const { font, theme } = useContext(ThemeContext);
  const pageTheme = theme.screenTurtleHome;
  const style = getStyles(pageTheme, font, theme.utilColors);

  // const [gameScreen, setGameScreen] = React.useState({
  //   currentGameScreen: 'TurtleQuestion',
  //   hintContainerVisible: false,
  // });

  const {
    state: turtleQuestionState,
    setState: setTurtleQuestionState,
    static: {
      fetchTurtleQuestion,
      getNextQuestion,
      loadHints,
      submitTurtle,
    },
  } = useTurtleFetchQuestion({
    isPageMounted,
  });

  const {
    uiData: {
      currentGameScreen,
      hintContainerVisible,
    },
  } = turtleQuestionState;

  const setGameScreen = (screen) => {
    setTurtleQuestionState((prevState) => ({
      ...prevState,
      uiData: {
        ...prevState.uiData,
        currentGameScreen: screen,
      },
    }));
  };

  // const handleHintVisibility = (visibility) => setGameScreen((prevState) => ({
  //   ...prevState,
  //   hintContainerVisible: visibility,
  // }));

  const handleHintVisibility = (visibility) => setTurtleQuestionState((prevState) => ({
    ...prevState,
    uiData: {
      ...prevState.uiData,
      hintContainerVisible: visibility,
    },
  }));

  const { hintDetails } = turtleQuestionState;

  const TurtleScreenArray = [
    {
      tabTitle: 'Question',
      name: 'TurtleQuestion',
      component: TurtleQuestion,
      Icon: GameQuestion,
    },
    {
      tabTitle: 'Code',
      name: 'TurtleEditor',
      component: TurtleEditor,
      Icon: GameCode,
    },
    {
      tabTitle: 'Output',
      name: 'TurtleOutput',
      component: TurtleOutput,
      Icon: GameOutput,
    },
  ];

  const handleHint = (action = false) => {
    const { blockTypes } = turtleQuestionState;
    // const blockTypes = blocks.map((value) => value.type);
    return loadHints({ blockTypes, action });
  };

  return <>
    <View style={style.container}>
      <ImageBackground
        source={turtleBg}
        style={style.container}
      >
        <View style={style.container}>
          <TurtleContext.Provider value={{
            ctxState: turtleQuestionState,
            ctxSetState: setTurtleQuestionState,
            handleHintVisibility,
            fetchQuestion: fetchTurtleQuestion,
            fetchTurtleQuestion,
            getNextQuestion,
            submitQuestion: submitTurtle,
          }}>
            <GameNavigator
              currentScreen={{
                currentGameScreen,
                setCurrentGameScreen: setGameScreen,
              }}
              game='turtle'
              initialRoute='TurtleQuestion'
              ScreenArray={TurtleScreenArray}
              themeKey='screenTurtleQuestion'
              />
            <HintComponent
              handleHint={handleHint}
              hintDetails={hintDetails}
              hintVisible={hintContainerVisible}
              handleHintVisibility={handleHintVisibility}
              style={style} />
            <TurtleSuccessModal />
          </TurtleContext.Provider>
        </View>
      </ImageBackground>
    </View>
  </>;
};

export default TurtleMain;
