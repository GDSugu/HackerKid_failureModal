import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  BackHandler,
  ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import WebView from 'react-native-webview';
import ThemeContext from '../components/theme';
import { TurtleContext } from '../../hooks/pages/turtle';
import { useSharedTurtleWebView } from '../../shared/turtle';
import webViewElement from '../components/WebView';
import TryNowSVG from '../../images/games/trynow.svg';

const getStyles = (theme, font, utilColors) => StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  titleText: {
    ...font.subtitle1,
    color: utilColors.white,
  },
  card: {
    borderRadius: 12,
    paddingVertical: 16,
    marginVertical: 4,
    backgroundColor: utilColors.white,
    // backgroundColor: 'white',
  },
  outputCard: {
    flex: 1,
    paddingLeft: 4,
    paddingTop: 4,
    paddingRight: 10,
    paddingBottom: 10,
    borderRadius: 12,
    backgroundColor: utilColors.white,
    marginVertical: 4,
    marginBottom: 8,
  },
  collapseCard: {
    flex: 1,
    padding: 16,
  },
  collapseCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  collapseCardHeaderContent: {
    ...font.subtitleBold,
    color: utilColors.black,
  },
  cardProblemBg: {
    backgroundColor: '#ffffffee',
    paddingVertical: 8,
    paddingHorizontal: 16,
    height: '25%',
  },
  cardContent: {
    ...font.subtitleBold,
    color: utilColors.dark,
    lineHeight: 24,
    marginBottom: 8,
  },
  mb1: {
    marginBottom: 16,
  },
  problemStatement: {
    ...font.subtitle2,
    color: utilColors.dark,
    lineHeight: 24,
    // marginLeft: 16,
  },
  tryNowBtn: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: theme.btnBg,
    marginTop: 8,
    padding: 16,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const TurtleQuestion = ({ navigation }) => {
  const isPageMounted = React.useRef(true);
  const { font, theme } = React.useContext(ThemeContext);
  const { utilColors } = theme;
  const turtleContext = React.useContext(TurtleContext);
  const webViewRef = React.useRef(null);
  const style = getStyles(theme.screenTurtleHome, font, utilColors);

  const {
    turtleQuestion: {
      BodyContent, ScriptContent, scriptToInject, styleString,
    },
  } = useSharedTurtleWebView();

  const webViewString = webViewElement({
    BodyComponent: BodyContent,
    ScriptComponent: ScriptContent,
    styleString,
  });

  const repositionTurtle = () => {
    if (webViewRef.current && turtleContext.ctxState.status === 'success') {
      const obj = {
        action: 'repositionTurtle',
      };
      const runTurtle = `
      try {
        window.execute(${JSON.stringify(obj)});
      } catch (err) {
        const errmsg = {
          action: 'error',
          data: err.message,
          caller: 'repositionTurtle from turtle output screen',
        };
        window.ReactNativeWebView.postMessage(JSON.stringify(errmsg));
      }`;
      setTimeout(() => {
        if (isPageMounted.current) {
          webViewRef.current.injectJavaScript(runTurtle);
        }
      }, 300);
    }
  };

  const renderTurtle = () => {
    if (webViewRef.current && turtleContext.ctxState.status === 'success') {
      const obj = {
        action: 'renderTurtle',
        data: {
          snippet: turtleContext.ctxState.questionObject.snippet,
          canvas: 'answerCanvas',
        },
      };

      const init = `
        try {
          window.execute(${JSON.stringify(obj)});
        } catch (err) {
          window.ReactNativeWebView.postMessage('Script Error: ');
          window.ReactNativeWebView.postMessage(err.message);
        }
      `;
      if (isPageMounted.current) {
        webViewRef.current.injectJavaScript(init);
      }
    }
  };

  if (navigation.getState().index === 0) {
    repositionTurtle();
  }

  React.useEffect(() => {
    const closeLevel = () => {
      if (turtleContext?.ctxState?.uiData?.showGameLevel) {
        turtleContext.ctxSetState((prevState) => ({
          ...prevState,
          uiData: {
            ...prevState.uiData,
            showGameLevel: false,
          },
        }));
        return true;
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', closeLevel);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', closeLevel);
    };
  }, [turtleContext.ctxState]);

  React.useEffect(() => {
    setTimeout(() => {
      renderTurtle();
      repositionTurtle();
    }, 500);

    if (turtleContext?.ctxState?.uiData) {
      turtleContext.ctxSetState((prevState) => ({
        ...prevState,
        uiData: {
          ...prevState.uiData,
          refreshKey: parseInt(Math.random() * 10, 10),
        },
      }));
    }
  }, [turtleContext.ctxState.questionObject]);

  React.useEffect(() => () => {
    isPageMounted.current = false;
  }, []);

  return <>
    <View style={style.container}>
      <Text style={style.titleText}>
        <FormattedMessage
          defaultMessage='{question}'
          description='Question'
          values={{
            question: turtleContext.ctxState.questionObject.Question,
          }}
        />
      </Text>
      <View style={[style.card, style.cardProblemBg]}>
        <ScrollView>
          {turtleContext.ctxState.questionObject.steps
            && turtleContext.ctxState.questionObject.steps.map(
              (step, index) => <Text key={index} style={style.problemStatement}>
                <FormattedMessage
                  defaultMessage={'{step}'}
                  description='Steps'
                  values={{
                    step: step.trim(),
                  }}
                />
              </Text>,
            )}
        </ScrollView>
      </View>
      <Text style={{
        ...style.titleText,
        marginTop: 8,
      }}>
        <FormattedMessage
          defaultMessage='Output'
          description='Output'
        />
      </Text>
      <View style={style.outputCard}>
        <WebView
          ref={webViewRef}
          source={{ html: webViewString }}
          originWhitelist={['*']}
          startInLoadingState={true}
          injectedJavaScript={scriptToInject}
        />
      </View>
      <TouchableOpacity
        onPress={() => { navigation.navigate('TurtleOutput'); }}
        style={style.tryNowBtn}
      >
        <View style={style.rowBetween}>
          <Text style={style.titleText}>
            <FormattedMessage
              defaultMessage='Try Now'
              description='Try Now Button'
            />
          </Text>
          <TryNowSVG />
        </View>
      </TouchableOpacity>
    </View>
  </>;
};

export default TurtleQuestion;
