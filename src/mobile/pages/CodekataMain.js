import React, { useContext, useEffect, useRef } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { FormattedMessage } from 'react-intl';
import WebView from 'react-native-webview';
import webViewElement from '../components/WebView';
import ThemeContext from '../components/theme';
import codekataBg from '../../images/codekata/codekatabg-mob.png';
import TurtleHeader from '../components/Header/TurtleHeader';
import { Yellow } from '../../colors/_colors';
import GameLevelComponent from '../components/GameLevelComponent';
import useCodekata, { CodekataContext } from '../../hooks/pages/codekata';
import CodeEditor from '../components/Editor';

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

const CodekataHeader = () => {
  const codekataContext = useContext(CodekataContext);
  const { font, theme } = useContext(ThemeContext);
  const { gradients, utilColors } = theme;
  const onpressLevel = () => {
    codekataContext.tqSetState((prevState) => ({
      ...prevState,
      uiData: {
        ...prevState.uiData,
        showGameLevel: true,
      },
    }));
  };
  return <>
  <TurtleHeader
  forCodekata={true}
  level={codekataContext.tqState.questionObject.virtualId}
  onpressLevel={onpressLevel}/>
            <GameLevelComponent
              context={codekataContext}
              game={'turtle'}
              font={font}
              gradients={gradients}
              utilColors={utilColors}
              theme={theme}
              themeKey={'screenTurtleQuestion'}
              forCodekata={true}
            /></>;
};

const Editor = () => {
  const webString = webViewElement({
  });
  return <WebView>

  </WebView>;
};

const CodekataBody = () => {
  const codekataContext = useContext(CodekataContext);
  const { font, theme } = useContext(ThemeContext);
  const { gradients, utilColors } = theme;

  return <View>
    <CodeEditor/>
  </View>;
};

const CodekataMain = () => {
  const isPageMounted = useRef(true);
  const { font, theme } = useContext(ThemeContext);
  const pageTheme = theme.screenTurtleHome;
  const style = getStyles(pageTheme, font, theme.utilColors);
  const {
    state: codekataData,
    setState: setCodekata,
    static: {
      getCodekataQuestions,
      availableLanguages,
      getTempleteData,
      getLanguageId,
      runCode,
      submitCode,
    },
  } = useCodekata({ isPageMounted });

  return (
    <>
      <View style={style.container}>
        <ImageBackground source={codekataBg} style={style.container}>
          <View style={style.container}>
          <CodekataContext.Provider value={{
            tqState: codekataData,
            tqSetState: setCodekata,
            getCodekataQuestions,
            availableLanguages,
            getTempleteData,
            getLanguageId,
            runCode,
            submitCode,
          }}>
            <CodekataHeader/>
            <CodekataBody/>
            </CodekataContext.Provider>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

export default CodekataMain;
