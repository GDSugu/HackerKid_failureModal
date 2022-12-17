import React from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import ThemeContext from '../components/theme';
import webViewElement from '../components/WebView';
import { TurtleContext } from '../../hooks/pages/turtle';
import { useSharedTurtleWebView } from '../../shared/turtle';

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

const TurtleEditor = () => {
  const { theme: { utilColors } } = React.useContext(ThemeContext);
  const style = getStyles(utilColors);
  const { blocklyWorkspace } = useSharedTurtleWebView();
  const turtleContext = React.useContext(TurtleContext);
  const webViewRef = React.useRef(null);
  let webViewString = '';

  const {
    BodyContent, ScriptContent, styleString, scriptToInject,
  } = blocklyWorkspace;

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
        case 'code_changed':
          turtleContext.tqSetState((prevState) => ({
            ...prevState,
            snippet: data.snippet,
            xmlWorkSpace: data.workspace,
            blockTypes: data.blockTypes,
          }));
          break;
        case 'workspace_initialized':
          break;
        default: break;
      }
    } catch (error) {
      console.error(error);
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
    turtleContext.tqSetState((prevState) => ({
      ...prevState,
      xmlWorkSpace: turtleContext.tqState,
    }));
  }, [turtleContext.tqState.questionObject]);

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