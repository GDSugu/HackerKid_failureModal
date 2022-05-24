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

  React.useEffect(() => {
    setTimeout(() => {
      if (webViewRef.current && turtleContext.status === 'success') {
        const initBlockly = `Turtle.initializeBlockly(${JSON.stringify(turtleContext)});`;
        webViewRef.current.injectJavaScript(initBlockly);
      }
    }, 500);
  }, []);

  // if (turtleContext.status === 'success') {
  //   const initBlockly = `Turtle.initializeBlockly(${JSON.stringify(turtleContext)});`;
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
        onMessage={console.log}
        />
    </View>
  </>;
};

export default TurtleEditor;
