import React from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { TurtleContext } from '../../hooks/pages/turtle';
import { useSharedTurtleWebView } from '../../shared/turtle';
import ThemeContext from '../components/theme';
import webViewElement from '../components/WebView';
import outputJS from '../components/WebView/output';
import turtleOutputJS from '../components/WebView/turtleOutput';

const getStyles = () => StyleSheet.create({
  container: {
    flex: 1,
  },
});

const TurtleOutput = ({ navigation }) => {
  const { theme: { utilColors } } = React.useContext(ThemeContext);
  const style = getStyles(utilColors);S
  const { turtleOutput } = useSharedTurtleWebView();
  const webViewRef = React.useRef(null);
  let webViewString = '';

  const {
    BodyContent, ScriptContent, scriptToInject, styleString,
  } = turtleOutput;

  const turtleContext = React.useContext(TurtleContext);

  webViewString = webViewElement({
    BodyComponent: BodyContent,
    ScriptComponent: ScriptContent,
    styleString,
  });

  if (navigation.getState().index === 2) {
    if (webViewRef.current && turtleContext.tqState.status === 'success') {
      const runTurtle = `
      try {
        window.execute({
          action: 'runCode',
          data: {
            snippet: '${JSON.stringify(turtleContext.tqState.snippet)}',
          },
        });
      } catch (err) {
        window.ReactNativeWebView.postMessage('Script Error on run: ');
        window.ReactNativeWebView.postMessage(err.message);
      }`;
      webViewRef.current.injectJavaScript(runTurtle);
    }
  }

  React.useEffect(() => {
    setTimeout(() => {
      if (webViewRef.current && turtleContext.tqState.status === 'success') {
        const initBlockly = `
        try {
            window.execute({
              action: 'renderTurtle',
              data: {
                snippet: '${JSON.stringify(turtleContext.tqState.questionObject.snippet)}',
              },
            });
        } catch (err) {
          window.ReactNativeWebView.postMessage('Script Error: ');
          window.ReactNativeWebView.postMessage(err.message);
        }
          `;
        // const initBlockly = `
        // const a = {
        //   name: 'hello',
        // };
        //   window.ReactNativeWebView.postMessage(Object.keys(Sk).toString());
        // // try {
        // // } catch (e) {
        //   // window.ReactNativeWebView.postMessage(JSON.stringify(e));
        //   // window.ReactNativeWebView.postMessage(e.toString());
        // // }
        //     `;
        webViewRef.current.injectJavaScript(initBlockly);
      }

      // const str = `
      // try {
      //   // window.ReactNativeWebView.postMessage(Object.keys(window).toString());
      //   window.execute({
      //     action: "runCode",
      //     data: "hello world"
      //   });
      // } catch (err) {
      //   window.ReactNativeWebView.postMessage('Error: ');
      //   window.ReactNativeWebView.postMessage(err.message);
      // }`;

      // webViewRef.current.injectJavaScript(str);
    }, 1000);
    // setTimeout(() => {
    //   const initBlockly = `
    //         window.ReactNativeWebView.postMessage(Object.keys(window).toString());
    //         `;
    //   webViewRef.current.injectJavaScript(initBlockly);
    // }, 500);
  }, []);

  const jsScript = `
      $(() => {
        const pool = workerpool.pool();
        const {
          managerObj, poolObj,
        } = getTurtleOutput({
          blocklyObj: window.Blockly,
          poolObj: pool,
        });
      
        window.Turtle = managerObj;
        window.SkObj = Sk;
        const abc = 'from turtle import *\nsetundobuffer(1000)\nforward(25)\nright(90)\nforward(25)\nleft(90)\nforward(25)';
        window.Turtle.runCode(abc, 'answerCanvas', true, 3, 0)
          .then(() => {
            const currentSelector = $('#answerCanvas')[0];
            if (currentSelector && currentSelector.turtleInstance) {
              currentSelector.turtleInstance.update();
            }
          });
      });
  `;

  return <>
    <View style={style.container}>
      <WebView
        style={style.container}
        ref={webViewRef}
        source={{ html: webViewString }}
        // source={{ html: outputJS }}
        // source={{ html: turtleOutputJS }}
        originWhitelist={['*']}
        // injectedJavaScript={'window.execute({action: "runCode", data: "hello world"})'}
        injectedJavaScript={scriptToInject}
        // injectedJavaScript={jsScript}
        onMessage={(e) => console.log(e)}
      />
    </View>
  </>;
};

export default TurtleOutput;
