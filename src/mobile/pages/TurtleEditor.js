import React from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import ThemeContext from '../components/theme';
import webViewElement from '../components/WebView';
import { TurtleContext, useTurtleValidation } from '../../hooks/pages/turtle';
import { useSharedTurtleWebView } from '../../shared/turtle';

const getStyles = (utils) => StyleSheet.create({
  container: {
    flex: 1,
  },
  webViewContainer: {
    flex: 1,
    backgroundColor: utils.dark,
  },
});

const TurtleEditor = () => {
  const { theme: { utilColors } } = React.useContext(ThemeContext);
  const style = getStyles(utilColors);
  const { blocklyWorkspace } = useSharedTurtleWebView();
  const { setState } = useTurtleValidation();
  const webViewRef = React.useRef(null);
  let webViewString = '';

  const {
    BodyContent, ScriptContent, styleString, scriptToInject,
  } = blocklyWorkspace;

  const turtleContext = React.useContext(TurtleContext);

  webViewString = webViewElement({
    BodyComponent: BodyContent,
    ScriptComponent: ScriptContent,
    styleString,
  });

  const handleMessage = (msg) => {
    try {
      const message = JSON.parse(msg.nativeEvent.data);
      console.log(message);
      const { action, data } = message;

      switch (action) {
        case 'code_changed':
          console.log(data);
          turtleContext.tqSetState((prevState) => ({
            ...prevState,
            snippet: data.snippet,
            xmlWorkSpace: data.workspace,
          }));
          // console.log(turtleContext.tqState.snippet);
          break;
        default: break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      if (webViewRef.current && turtleContext.tqState.status === 'success') {
        const initBlockly = `
          Turtle.initializeBlockly(${JSON.stringify(turtleContext.tqState)});
        `;
        webViewRef.current.injectJavaScript(initBlockly);
      }
    }, 1000);
  }, []);

  // if (turtleContext.tqState.status === 'success') {
  //   const initBlockly = `Turtle.initializeBlockly(${JSON.stringify(turtleContext.tqState)});`;
  //   webViewRef.current.injectJavaScript(initBlockly);
  // }

  return <>
    <View style={style.container}>
      <WebView
        style={style.webViewContainer}
        ref={webViewRef}
        source={{ html: webViewString }}
        originWhitelist={['*']}
        injectedJavaScript={scriptToInject}
        onMessage={handleMessage}
        />
    </View>
  </>;
};

export default TurtleEditor;
