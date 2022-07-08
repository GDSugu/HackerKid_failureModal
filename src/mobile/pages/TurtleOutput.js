import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import WebView from 'react-native-webview';
import {
  Svg, Path,
} from 'react-native-svg';
import { TurtleContext, useTurtleValidation } from '../../hooks/pages/turtle';
import { useSharedTurtleWebView } from '../../shared/turtle';
import ThemeContext from '../components/theme';
import webViewElement from '../components/WebView';
import outputJS from '../components/WebView/output';
import turtleOutputJS from '../components/WebView/turtleOutput';
import Icon from '../common/Icons';

const getStyles = (theme, utilColors, font) => StyleSheet.create({
  container: {
    flex: 1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
  },
  outputBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    borderRadius: 6,
    padding: 12,
    margin: 6,
    flex: 1,
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
});

const TurtleOutput = ({ navigation }) => {
  const { theme: { utilColors, screenTurtleOutput }, font } = React.useContext(ThemeContext);
  const style = getStyles(screenTurtleOutput, utilColors, font);
  const { turtleOutput } = useSharedTurtleWebView();
  const { submitTurtle } = useTurtleValidation();
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

  const handleMessage = (msg) => {
    try {
      console.log(msg.nativeEvent.data);
      const message = JSON.parse(msg.nativeEvent.data);
      const { action, data } = message;

      switch (action) {
        case 'validated':
          console.log(data);
          console.log(Object.keys(turtleContext.tqState));
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
        // scalesPageToFit={false}
        startInLoadingState={true}
        // injectedJavaScript={jsScript}
        onMessage={handleMessage}
      />
      <View style={style.btnContainer}>
        <TouchableOpacity
          style={{
            ...style.outputBtn,
            ...style.shareBtn,
          }}
          onPress={() => console.log('share btn')}
        >
          <Text
            style={{
              ...style.btnText,
              ...style.shareBtnText,
            }}
          >
            <FormattedMessage
              defaultMessage={'Share'}
              description={'Turtle Output Share Button'}
            />
          </Text>
          <View>
            <Svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Path d="M12.75 7.24998C12.9312 7.24998 13.1063 7.31562 13.2429 7.43474C13.3795 7.55387 13.4684 7.71842 13.493 7.89798L13.5 7.99998V13.25C13.5 13.9503 13.2329 14.6242 12.7531 15.1343C12.2733 15.6444 11.617 15.9522 10.918 15.995L10.75 16H3.25C2.54971 16 1.87579 15.7329 1.3657 15.2531C0.855612 14.7733 0.547781 14.117 0.505 13.418L0.5 13.25V7.99998C0.500058 7.80995 0.572245 7.62704 0.701973 7.48819C0.831701 7.34933 1.0093 7.2649 1.19888 7.25195C1.38846 7.239 1.57589 7.29849 1.7233 7.41841C1.87071 7.53833 1.9671 7.70973 1.993 7.89798L2 7.99998V13.25C2 13.897 2.492 14.43 3.122 14.494L3.25 14.5H10.75C11.0593 14.4999 11.3576 14.3851 11.5871 14.1779C11.8167 13.9706 11.9613 13.6856 11.993 13.378L12 13.25V7.99998C12 7.80106 12.079 7.6103 12.2197 7.46965C12.3603 7.32899 12.5511 7.24998 12.75 7.24998ZM2.227 4.46198L6.47 0.219977C6.59699 0.0929589 6.76534 0.0157307 6.94445 0.00233427C7.12356 -0.0110622 7.30153 0.0402627 7.446 0.146977L7.53 0.219977L11.773 4.46198C11.9089 4.59542 11.989 4.77557 11.9969 4.96588C12.0048 5.15618 11.9401 5.34238 11.8158 5.48668C11.6914 5.63098 11.5169 5.72257 11.3275 5.74287C11.1381 5.76317 10.9481 5.71065 10.796 5.59598L10.712 5.52298L7.75 2.55998V10.25C7.74999 10.4312 7.68436 10.6063 7.56523 10.7429C7.44611 10.8795 7.28155 10.9683 7.102 10.993L7 11C6.81876 11 6.64366 10.9343 6.50707 10.8152C6.37048 10.6961 6.28165 10.5315 6.257 10.352L6.25 10.25V2.55998L3.288 5.52298C3.16095 5.65026 2.9924 5.72765 2.81307 5.74105C2.63373 5.75445 2.45555 5.70296 2.311 5.59598L2.227 5.52298C2.09972 5.39593 2.02233 5.22738 2.00893 5.04804C1.99553 4.86871 2.04701 4.69053 2.154 4.54598L2.227 4.46198L6.47 0.219977L2.227 4.46198Z" fill="#212527"/>
            </Svg>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...style.outputBtn,
            ...style.playBtn,
          }}
          onPress={() => {
            console.log('Play btn');
            submitTurtle();
          }}
        >
          <Text
            style={{
              ...style.btnText,
              ...style.playBtnText,
            }}
          >
            <FormattedMessage
              defaultMessage={'Play'}
              description={'Turtle Play Button'}
            />
          </Text>
          <View>
            {/* <Svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Path d="M12.75 7.24998C12.9312 7.24998 13.1063 7.31562 13.2429 7.43474C13.3795 7.55387 13.4684 7.71842 13.493 7.89798L13.5 7.99998V13.25C13.5 13.9503 13.2329 14.6242 12.7531 15.1343C12.2733 15.6444 11.617 15.9522 10.918 15.995L10.75 16H3.25C2.54971 16 1.87579 15.7329 1.3657 15.2531C0.855612 14.7733 0.547781 14.117 0.505 13.418L0.5 13.25V7.99998C0.500058 7.80995 0.572245 7.62704 0.701973 7.48819C0.831701 7.34933 1.0093 7.2649 1.19888 7.25195C1.38846 7.239 1.57589 7.29849 1.7233 7.41841C1.87071 7.53833 1.9671 7.70973 1.993 7.89798L2 7.99998V13.25C2 13.897 2.492 14.43 3.122 14.494L3.25 14.5H10.75C11.0593 14.4999 11.3576 14.3851 11.5871 14.1779C11.8167 13.9706 11.9613 13.6856 11.993 13.378L12 13.25V7.99998C12 7.80106 12.079 7.6103 12.2197 7.46965C12.3603 7.32899 12.5511 7.24998 12.75 7.24998ZM2.227 4.46198L6.47 0.219977C6.59699 0.0929589 6.76534 0.0157307 6.94445 0.00233427C7.12356 -0.0110622 7.30153 0.0402627 7.446 0.146977L7.53 0.219977L11.773 4.46198C11.9089 4.59542 11.989 4.77557 11.9969 4.96588C12.0048 5.15618 11.9401 5.34238 11.8158 5.48668C11.6914 5.63098 11.5169 5.72257 11.3275 5.74287C11.1381 5.76317 10.9481 5.71065 10.796 5.59598L10.712 5.52298L7.75 2.55998V10.25C7.74999 10.4312 7.68436 10.6063 7.56523 10.7429C7.44611 10.8795 7.28155 10.9683 7.102 10.993L7 11C6.81876 11 6.64366 10.9343 6.50707 10.8152C6.37048 10.6961 6.28165 10.5315 6.257 10.352L6.25 10.25V2.55998L3.288 5.52298C3.16095 5.65026 2.9924 5.72765 2.81307 5.74105C2.63373 5.75445 2.45555 5.70296 2.311 5.59598L2.227 5.52298C2.09972 5.39593 2.02233 5.22738 2.00893 5.04804C1.99553 4.86871 2.04701 4.69053 2.154 4.54598L2.227 4.46198L6.47 0.219977L2.227 4.46198Z" fill="#212527"/>
            </Svg> */}
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
  </>;
};

export default TurtleOutput;
