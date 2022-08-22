import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Dimensions,
  Pressable,
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import WebView from 'react-native-webview';
import Collapsible from 'react-native-collapsible';
import ThemeContext from '../components/theme';
import { TurtleContext } from '../../hooks/pages/turtle';
import Collapse from '../components/Collapse';
import { useSharedTurtleWebView } from '../../shared/turtle';
import webViewElement from '../components/WebView';
import Icon from '../common/Icons';

const getStyles = (font, utilColors) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleText: {
    ...font.subtitleBold,
    color: utilColors.white,
  },
  card: {
    borderRadius: 12,
    paddingVertical: 16,
    marginVertical: 8,
    backgroundColor: utilColors.white,
    // backgroundColor: 'white',
  },
  collapseCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    backgroundColor: utilColors.white,
  },
  collapseCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  collapseCardHeaderContent: {
    ...font.subtitleBold,
    color: utilColors.black,
  },
  cardProblemBg: {
    backgroundColor: '#ffffffee',
    padding: 16,
  },
  cardContent: {
    ...font.subtitleBold,
    color: utilColors.dark,
    lineHeight: 24,
    marginBottom: 8,
  },
  mb1: {
    marginBottom: 16,
  },
  problemStatement: {
    ...font.subtitle2,
    color: utilColors.dark,
    lineHeight: 24,
    // marginLeft: 16,
  },
});

const TurtleQuestion = () => {
  const { font, theme: { utilColors } } = React.useContext(ThemeContext);
  const turtleContext = React.useContext(TurtleContext);
  const webViewRef = React.useRef(null);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const memoizedCollapseValue = React.useMemo(() => isCollapsed, [isCollapsed]);
  const style = getStyles(font, utilColors);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const {
    turtleQuestion: {
      BodyContent, ScriptContent, scriptToInject, styleString,
    },
  } = useSharedTurtleWebView();

  const webViewString = webViewElement({
    BodyComponent: BodyContent,
    ScriptComponent: ScriptContent,
    styleString,
  });

  console.log('turtlequestion before jsx');

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
          window.ReactNativeWebView.postMessage('Question Script Error: ');
          window.ReactNativeWebView.postMessage(err.message);
        }
          `;
        webViewRef.current.injectJavaScript(initBlockly);
      }
    }, 1000);
  }, []);

  return <>
    {/* <TurtleContext.Consumer>
      { (value) => <> */}
        <ScrollView style={style.container}>
          <Text style={style.titleText}>
            <FormattedMessage
              defaultMessage='{question}'
              description='Question'
              values={{
                question: turtleContext.tqState.questionObject.Question,
              }}
            />
          </Text>
          <View style={[style.card, style.cardProblemBg]}>
            {/* <Text style={[style.cardContent, style.mb1]}>
              <FormattedMessage
                defaultMessage='{question}'
                description='Question'
                values={{
                  question: turtleContext.tqState.questionObject.Question,
                }}
              />
            </Text> */}
            {/* { turtleContext.tqState.questionObject.steps
            && <Text style={style.cardContent}>
                <FormattedMessage
                  defaultMessage='Instructions'
                  description='Instructions'
                />
              </Text> } */}
            { turtleContext.tqState.questionObject.steps
                && turtleContext.tqState.questionObject.steps.map(
                  (step, index) => <Text key={index} style={style.problemStatement}>
                    <FormattedMessage
                      defaultMessage={'{step}'}
                      description='Steps'
                      values={{
                        step: step.trim(),
                      }}
                    />
                  </Text>,
                ) }
          </View>
        {/* <View style={style.card}></View> */}
          {/* <Animatable.View style={style.card}>
            <Collapse
              style={{
                ...style.card,
              }}
              title={intl.formatMessage({
                defaultMessage: 'Expected Output',
                description: 'Collapse Title - Expected Output',
              })}
              // CustomHeader={() => <Text style={style.cardContent} >Expected Output</Text>}
            >
              <View>
                <WebView
                  ref={webViewRef}
                  source={{ html: webViewString }}
                  originWhitelist={['*']}
                  startInLoadingState={true}
                  injectedJavaScript={scriptToInject}
                  onMessage={(event) => {
                    console.log('turtlequestion onMessage');
                    console.log(event.nativeEvent.data);
                  }}
                />
              </View>
            </Collapse>
          </Animatable.View> */}
          <View style={style.collapseCard}>
            <Pressable
              onPress={toggleCollapse}
            >
              <View style={style.collapseCardHeader}>
                <Text style={style.collapseCardHeaderContent}>
                  <FormattedMessage
                    defaultMessage='Expected Output'
                    description='Collapse Title - Expected Output'
                  />
                </Text>
                <Icon type='FontAwesome5' name={ memoizedCollapseValue ? 'angle-down' : 'angle-up'} color={utilColors.black} size={24} />
              </View>
            </Pressable>
            <Collapsible
              collapsed={memoizedCollapseValue}
            >
            <WebView
              ref={webViewRef}
              style={{
                height: Dimensions.get('window').height * 0.3,
                width: '100%',
                borderRadius: 12,
              }}
              source={{ html: webViewString }}
              originWhitelist={['*']}
              startInLoadingState={true}
              injectedJavaScript={scriptToInject}
              onMessage={(event) => {
                console.log('turtlequestion onMessage');
                console.log(event.nativeEvent.data);
              }}
            />
          </Collapsible>
          </View>
        </ScrollView>
      {/* </> }
    </TurtleContext.Consumer> */}
  </>;
};

export default TurtleQuestion;
