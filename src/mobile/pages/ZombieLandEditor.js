import React from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { useSharedZLWebView } from '../../shared/zombieLand/zlwebview';
import ThemeContext from '../components/theme';
import webViewElement from '../components/WebView';
import { ZombieLandContext } from '../../hooks/pages/zombieLand';

const getStyles = (utils) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  webViewContainer: {
    flex: 1,
    backgroundColor: utils.dark,
  },
});

const ZombieLandEditor = () => {
  const { theme: { utilColors } } = React.useContext(ThemeContext);
  const style = getStyles(utilColors);
  const { zlEditor } = useSharedZLWebView();
  const zlContext = React.useContext(ZombieLandContext);
  const webViewRef = React.useRef(null);
  let webViewString = '';
  const isPageMounted = React.useRef(true);

  // const {
  //   ctxState: zlState,
  //   ctxSetState: zlStatic,
  // } = zlContext;

  const {
    BodyContent, ScriptContent, styleString, scriptToInject,
  } = zlEditor;

  webViewString = webViewElement({
    BodyComponent: BodyContent,
    ScriptComponent: ScriptContent,
    styleString,
  });

  const handleMessage = (msg) => {
    try {
      const message = JSON.parse(msg.nativeEvent.data);
      const { action, data } = message;

      switch (action) {
        case 'codeChanged':
          zlContext.ctxSetState((prevState) => ({
            ...prevState,
            snippet: data.snippet,
          }));
          break;
        case 'popupBox':
          console.warn('case editor popupBox: ', data);
          break;
        case 'log':
          console.log('case editor log: ', data);
          break;
        case 'error':
          console.error('case editor error: ', data);
          break;
        default: break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const setFailureModalState = (state) => {
  //   zlStatic((prev) => ({
  //     ...prev,
  //     uiData: {
  //       ...prev.uiData,
  //       isFailureModalOpen: state,
  //     },
  //   }));
  // };

  React.useEffect(() => {
    setTimeout(() => {
      if (webViewRef.current && zlContext.ctxState.status === 'success') {
        const obj = {
          action: 'startGame',
          data: {
            zlState: zlContext.ctxState,
            endGame: (msg) => console.log('endgame, ', msg),
            // popupBox: showFailureModal.bind(this),
            popupBox: (msg) => console.log('popub ', msg),
          },
        };

        const initScript = `
        try {
            function initEditor() {
              if (window.execute) {
                window.execute(${JSON.stringify(obj)});
              } else {
                setTimeout(initEditor, 1000);
              }
            }
            initEditor();
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
        if (isPageMounted.current) {
          webViewRef.current.injectJavaScript(initScript);
        }
      }
    }, 1000);
  }, [zlContext.ctxState.questionObject]);

  React.useEffect(() => () => {
    isPageMounted.current = false;
  }, []);

  return <>
    <View style={style.container}>
      <WebView
        style={style.webViewContainer}
        ref={webViewRef}
        source={{ html: webViewString }}
        originWhitelist={['*']}
        injectedJavaScript={scriptToInject}
        nestedScrollEnabled={true}
        onMessage={handleMessage}
      />
    </View>
  </>;
};

export default ZombieLandEditor;
