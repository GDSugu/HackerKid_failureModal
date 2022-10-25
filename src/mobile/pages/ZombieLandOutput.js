import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import WebView from 'react-native-webview';
// import Canvas from 'react-native-canvas';
// import Phaser from 'phaser';
// import md5 from 'crypto-js/md5';
import ThemeContext from '../components/theme';
import webViewElement from '../components/WebView';
import { ZombieLandContext } from '../../hooks/pages/zombieLand';
import { useSharedZLWebView } from '../../shared/zombieLand/zlwebview';
// import { getGameFunctions } from '../../shared/zombieLand/gameFunctions';

const getStyles = (theme, utilColors, font) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  btnContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 2,
  },
  outputBtn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 12,
    padding: 16,
    margin: 6,
    // flex: 1,
    borderColor: theme.btnBg,
    borderWidth: 1,
  },
  shareBtn: {
    backgroundColor: utilColors.white,
  },
  playBtn: {
    backgroundColor: theme.btnBg,
  },
  btnText: {
    ...font.subtitle1,
  },
  shareBtnText: {
    color: utilColors.dark,
  },
  playBtnText: {
    color: utilColors.white,
  },
  disabled: {
    opacity: 0.5,
  },
});

const ZombieLandOutput = ({ navigation }) => {
  const { theme: { utilColors, screenZombieLandOutput }, font } = React.useContext(ThemeContext);
  const style = getStyles(screenZombieLandOutput, utilColors, font);
  const webViewRef = React.useRef(null);
  const zlContext = React.useContext(ZombieLandContext);

  const { zlOutput } = useSharedZLWebView();
  const {
    BodyContent, ScriptContent, styleString, scriptToInject,
  } = zlOutput;
  let webViewString = '';

  webViewString = webViewElement({
    BodyComponent: BodyContent,
    ScriptComponent: ScriptContent,
    styleString,
  });

  const runCode = () => {
    if (webViewRef.current && zlContext.ctxState.snippet) {
      const obj = {
        action: 'runCode',
        data: {
          snippet: zlContext.ctxState.snippet,
        },
      };

      const runZl = `
        try {
          if (window.execute) {
            window.execute(${JSON.stringify(obj)});
          }
        } catch (err) {
          const errmsg = {
            action: 'error',
            data: err.message,
            caller: 'runCode from zombieLandOutput'
          };
          window.ReactNativeWebView.postMessage(JSON.stringify(errmsg));
        }
        `;
      setTimeout(() => {
        webViewRef.current.injectJavaScript(runZl);
      }, 300);
    }
  };

  const handleMessage = (msg) => {
    try {
      const message = JSON.parse(msg.nativeEvent.data);
      const { action, data } = message;

      switch (action) {
        case 'popupBox':
          console.warn('case popupBox: ', data);
          break;
        case 'log':
          console.log('zloutput case log: ', data);
          break;
        case 'error':
          console.error('zloutput case error: ', data);
          break;
        default: break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (navigation.getState().index === 2) {
    runCode();
  }

  React.useEffect(() => {
    const timeout = 1000;
    setTimeout(() => {
      if (webViewRef.current && zlContext.ctxState.status === 'success') {
        const obj = {
          action: 'renderGame',
          data: {
            parentElement: 'outputContainer',
            canvasElement: 'userCanvas',
            qnObj: zlContext.ctxState,
          },
        };

        const initScript = `
          try {
            function renderGame() {
              if (window.execute) {
                window.execute(${JSON.stringify(obj)});
              } else {
                setTimeout(renderGame, 1000);
              }
            }

            renderGame();
          } catch (err) {
            const errmsg = {
              action: 'error',
              data: {
                error: err,
                message: err.message,
                caller: 'initScript from zombieLandOutput'
              },
            };
            window.ReactNativeWebView.postMessage(JSON.stringify(errmsg));
          }
        `;

        webViewRef.current.injectJavaScript(initScript);
      }
    }, timeout);
  }, [zlContext.ctxState.questionObject]);

  // const popupBox = (msg) => {
  //   console.warn('popupBox: ', msg);
  // };

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     if (webViewRef.current && zlContext.ctxState.status === 'success') {
  //       const { GameObj } = getGameFunctions({});
  //       try {
  //         console.log(zlContext.ctxState.questionObject.qid);
  //         GameObj.initGame(
  //           Phaser, false, false, zlContext.ctxState,
  //           popupBox, true, 760, 360, webViewRef.current.getContext('2d'),
  //         );
  //       } catch (err) {
  //         console.error('error in rn initGame: ', err);
  //       }
  //     }
  //   }, 1000);
  // }, [zlContext.ctxState.questionObject]);

  return <>
    <View style={style.container}>
        <WebView
          style={style.container}
          ref={webViewRef}
          source={{ html: webViewString }}
          originWhitelist={['*']}
          injectedJavaScript={scriptToInject}
          scrollEnabled={false}
          scalesPageToFit={false}
          startInLoadingState={true}
          onMessage={handleMessage}
          androidLayerType="hardware"
        />
        <View style={style.btnContainer}>
        <TouchableOpacity
          style={[
            style.outputBtn,
            style.playBtn,

            !zlContext.ctxState.snippet && style.disabled,
          ]}
          disabled={!zlContext.ctxState.snippet}
          onPress={runCode}
        >
          <Text
            style={{
              ...style.btnText,
              ...style.playBtnText,
            }}
          >
            {<FormattedMessage
                  defaultMessage={'Play'}
                  description={'Turtle Play Button'}
                />
            }
          </Text>
          {/* <View>
            <Icon
                name='play'
                type='FontAwesome5'
                size={18}
                color={utilColors.white}
              />
          </View> */}
        </TouchableOpacity>
      </View>
    </View>
  </>;
};

export default ZombieLandOutput;
