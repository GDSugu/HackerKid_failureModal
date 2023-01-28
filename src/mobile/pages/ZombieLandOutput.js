import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import WebView from 'react-native-webview';
import md5 from 'crypto-js/md5';
import ThemeContext from '../components/theme';
import webViewElement from '../components/WebView';
import { ZombieLandContext } from '../../hooks/pages/zombieLand';
import { useSharedZLWebView } from '../../shared/zombieLand/zlwebview';
import Icon from '../common/Icons';
import { ScreenLoader } from '../components/Loader';

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
  loaderBg: {
    ...StyleSheet.absoluteFill,
    backgroundColor: utilColors.darkTransparent50,
  },
});

const ZombieLandOutput = ({ navigation }) => {
  const { theme: { utilColors, screenZombieLandOutput }, font } = React.useContext(ThemeContext);
  const style = getStyles(screenZombieLandOutput, utilColors, font);
  const webViewRef = React.useRef(null);
  const zlContext = React.useContext(ZombieLandContext);
  const [showLoader, setShowLoader] = React.useState(false);

  const { ctxState, ctxSetState, submitQuestion } = zlContext;

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

  const showStatusModal = () => {
    ctxSetState((prevState) => ({
      ...prevState,
      uiData: {
        ...prevState.uiData,
        isSuccessModalOpen: true,
      },
    }));
  };

  const endGame = (validated) => {
    setShowLoader(true);
    const sourceCode = ctxState.snippet;
    const request = {
      type: 'validateZombieQuestion',
      sourceCode,
      questionId: parseInt(ctxState.questionObject.qid, 10),
      xmlWorkSpace: '',
      validated,
    };

    let reqString = '';
    Object.keys(request).forEach((index) => {
      reqString += request[index];
    });
    const reqHash = md5(reqString + md5(reqString).toString()).toString();
    request.requestHash = reqHash;

    submitQuestion(request)
      .then(() => {
        setShowLoader(false);
        showStatusModal();
      });
  };

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
          if (typeof data.message === 'object') {
            const { type } = data.message;
            if (type === 'runCode') {
              endGame(data.message.validated);
            } else if (type === 'message') {
              console.log('popup message', data.message.message);
            } else if (type === 'error') {
              console.log('zloutput error (in game)', data.message.error);
            }
          }
          break;
        case 'log':
          console.log('zloutput case log: ', data);
          break;
        case 'error':
          console.error('zloutput case error(in game): ', data);
          break;
        default: break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (navigation.getState().index === 2) {
      runCode();
    }
  }, [navigation.getState().index]);

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
            end: endGame.toString(),
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

  return <>
    <View style={style.container}>
        <WebView
          style={style.container}
          ref={webViewRef}
          source={{ html: webViewString }}
          originWhitelist={['*']}
          injectedJavaScript={scriptToInject}
          allowUniversalAccessFromFileURLs={true}
          mixedContentMode={'always'}
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
          ]}
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
          <View>
            <Icon
                name='play'
                type='FontAwesome5'
                size={18}
                color={utilColors.white}
              />
          </View>
        </TouchableOpacity>
      </View>
    </View>
    {
      showLoader
      && <>
        <ScreenLoader route={'ZombieLandOutput'} />
      </>
    }
  </>;
};

export default ZombieLandOutput;
