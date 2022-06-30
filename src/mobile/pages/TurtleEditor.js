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

  console.log('turtleeditor before jsx');

  const handleMessage = (msg) => {
    const message = JSON.parse(msg.nativeEvent.data);
    const { action, data } = message;

    switch (action) {
      case 'code_changed':
        turtleContext.tqSetState((prevState) => ({
          ...prevState,
          snippet: data.snippet,
        }));
        console.log(turtleContext.tqState.snippet);
        break;
      default: break;
    }
  };

  React.useEffect(() => {
    console.log('turtle editor useeffect hook');
    setTimeout(() => {
      if (webViewRef.current && turtleContext.tqState.status === 'success') {
        const initBlockly = `
          Turtle.initializeBlockly(${JSON.stringify(turtleContext.tqState)});
        `;
        webViewRef.current.injectJavaScript(initBlockly);
      }
    }, 500);
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
