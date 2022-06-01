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

const TurtleOutput = () => {
  const { theme: { utilColors } } = React.useContext(ThemeContext);
  const style = getStyles(utilColors);
  const { turtleOutput } = useSharedTurtleWebView();
  const webViewRef = React.useRef(null);
  let webViewString = '';

  const {
    BodyContent, ScriptContent, scriptToInject,
  } = turtleOutput;

  const turtleContext = React.useContext(TurtleContext);

  webViewString = webViewElement({
    BodyComponent: BodyContent,
    ScriptComponent: ScriptContent,
  });

  React.useEffect(() => {
    setTimeout(() => {
      // console.log('turtleContext: ', turtleContext.questionObject.snippet);
      if (webViewRef.current && turtleContext.status === 'success') {
        const initBlockly = `
        try {
          window.ReactNativeWebView.postMessage('turtle output');
            // window.ReactNativeWebView.postMessage(Object.keys(Sk).toString());
            // window.ReactNativeWebView.postMessage(Object.keys(managerObj).toString());
            window.execute({
              action: 'runCode',
              data: {
                snippet: '${JSON.stringify(turtleContext.questionObject.snippet)}',
              },
            });
          /* window.Turtle.runCode('${JSON.stringify(turtleContext.questionObject.snippet)}', 'answerCanvas', true, 3, 0)
             .then(() => {
               window.ReactNativeWebView.postMessage('turtle output success');
               const currentSelector = $('#answerCanvas')[0];
               if (currentSelector && currentSelector.turtleInstance) {
                 currentSelector.turtleInstance.update();
               }
             }); */
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
    }, 3000);
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

  // console.log(turtleOutputJS);

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
        onMessage={console.log}
      />
    </View>
  </>;
};

export default TurtleOutput;
