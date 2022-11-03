import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FormattedMessage } from 'react-intl';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from '../common/Icons';
import webkataHtmlBg from '../../images/webkata/webkataHtmlBgWeb.png';
import webkataCssBg from '../../images/webkata/webkataCssBgWeb.png';
import webkataJsBg from '../../images/webkata/webkataJsBgWeb.png';
import WebkataHeader from '../components/Header/WebkataHeader';
import { useWebkataFetchQuestion } from '../../hooks/pages/webkata';
import WebkataGameLevelComponent from '../components/WebkataGameLevelComponent';
import ThemeContext from '../components/theme';
import CodeEditor from '../components/CodeEditor';
import { getModeFromConceptId, getQuestionSetup } from '../../web/javascripts/common/Functions/webkata';

const getStyles = (theme, utilColors, font) => StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    ...font.bodyBold,
  },
  textColor1: {
    color: utilColors.dark,
  },
  textColor2: {
    color: utilColors.white,
  },
  textColor3: {
    color: utilColors.lightGrey,
  },
  bg1: {
    backgroundColor: utilColors.black,
  },
  bg2: {
    backgroundColor: utilColors.dark,
  },
  bg3: {
    backgroundColor: '#282D2F',
  },
  problemStatementContainer: {
    position: 'relative',
  },
  problemStatementRevealerBtn: {
    paddingHorizontal: 15,
    paddingVertical: 18,
    backgroundColor: utilColors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  problemStatementRevealerBtnText: {
    ...font.bodyBold,
    color: utilColors.dark,
    lineHeight: 25,
  },
  problemStatement: {
    position: 'absolute',
    top: '100%',
    width: '100%',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingTop: 5,
    zIndex: 1,
    elevation: 1,
  },
  codeEditorWebViewContainer: {
    flex: 1,
  },
});
// methods for CodeEditorWebView JavaScript injection
const updateCodeEditorJSString = (mode, code) => {
  const obj = {
    action: 'updateCodeEditor',
    data: {
      code,
      mode,
    },
  };

  return `
    try {
      if (window.execute) {
        window.execute(${JSON.stringify(obj)});
      }
    } catch (err) {
      const errmsg = {
        action: 'error',
        data: err.message,
        caller: 'onload codeEditorUpdate',
      };
      window.ReactNativeWebView.postMessage(JSON.stringify(errmsg));
    }
  `;
};
// tab navigators
const CodeEditorsTab = createMaterialTopTabNavigator();
const LivePreviewWithValidatedResultTab = createMaterialTopTabNavigator();

// custom tab bar
function TabBar({
  state, descriptors, navigation, position,
}) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        // eslint-disable-next-line no-nested-ternary
        const label = options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <Text>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// in-page components
const ProblemStatement = ({
  toggleProblemStatement,
  problemStatementOpen,
  question,
  style,
}) => <View style={style.problemStatementContainer}>
    <View>
      <TouchableOpacity
        style={style.problemStatementRevealerBtn}
        onPress={toggleProblemStatement}>
        <Text style={style.problemStatementRevealerBtnText}>
          <FormattedMessage defaultMessage={'Problem Statement'} description='button text' />
        </Text>
        <Icon
          name={problemStatementOpen ? 'chevron-up' : 'chevron-down'}
          type='FontAwesome'
          size={style.text.fontSize}
          color={style.textColor1.color}
        />
      </TouchableOpacity>
    </View>
    {
      problemStatementOpen
      && <View
        style={[style.problemStatement, style.problemStatementRevealerBtn]}>
        <Text style={style.problemStatementRevealerBtnText} selectable={true}>
          <FormattedMessage defaultMessage={'{question}'} description='problem statement' values={{ question }} />
        </Text>
      </View>
    }
  </View>;

const WebkataMain = ({ route }) => {
  const isPageMounted = useRef(true);
  const codeEditorsRefs = useRef({});
  const { conceptId, id } = route.params;

  // styles
  const { font, theme } = useContext(ThemeContext);
  const screenTheme = theme.screenWebkataHome;
  const style = getStyles(screenTheme, theme.utilColors, font);
  const styleStringForDocumentInsideWebView = `#editor {
    background-color: ${style.bg2.backgroundColor};
    color: ${style.textColor2.color};
  }

  .ace-monokai .ace_gutter {
    background: #282D2F;
    color: ${style.textColor2.color};
  }`;

  let gameBg;

  // hooks
  const [localState, setLocalState] = useState({
    showLevels: false,
    problemStatementOpen: false,
  });
  const [codeState, setCodeState] = useState({});

  const {
    state: webkataState,
    fetchWebkataQuestion,
  } = useWebkataFetchQuestion({
    isPageMounted, initializeData: true, conceptid: conceptId, virtualid: id,
  });

  const {
    status,
    questionList,
    questionObject,
    submissionDetails,
  } = webkataState;

  const memorizedWebkataQuestionState = React.useMemo(() => webkataState,
    [webkataState]);

  if (conceptId === 'HTML') {
    gameBg = webkataHtmlBg;
  } else if (conceptId === 'CSS') {
    gameBg = webkataCssBg;
  } else if (conceptId === 'JS') {
    gameBg = webkataJsBg;
  }

  // methods
  const updateCodeEditor = (setup) => {
    Object.keys(setup.files).forEach((filePath) => {
      const { name, code } = setup.files[filePath];
      const mode = getModeFromConceptId(name);

      codeEditorsRefs.current[name].injectJavaScript(
        updateCodeEditorJSString(mode, code),
      );
    });
  };

  // on code editor change
  const onCodeEditorChange = (changedConceptId, code) => {
    setCodeState((prev) => ({ ...prev, changedConceptId: code }));
  };

  const onLevelBtnPress = (virtualIdPressed) => {
    fetchWebkataQuestion(conceptId, virtualIdPressed);
    setLocalState((prev) => ({ ...prev, showLevels: false }));
  };

  const toggleProblemStatement = () => {
    setLocalState((prev) => ({ ...prev, problemStatementOpen: !prev.problemStatementOpen }));
  };

  // sideEffects
  useEffect(() => {
    if (questionObject) {
      let questionSetup = memorizedWebkataQuestionState.submissionDetails.isSubmitted
        ? memorizedWebkataQuestionState.submissionDetails.submissionSetup
        : memorizedWebkataQuestionState.questionObject.questionSetup;

      if (!questionSetup) {
        questionSetup = getQuestionSetup(['HTML, CSS, JS'].includes(conceptId.toUpperCase()) ? 'static' : conceptId);
      }

      updateCodeEditor(questionSetup);

      // deelte refs which are not needed
      Object.keys(codeEditorsRefs.current).forEach((concept) => {
        const currentFiles = memorizedWebkataQuestionState.questionObject.questionSetup.files;

        if (!(concept in currentFiles)) {
          delete codeEditorsRefs[concept];
        }
      });
    }
  }, [questionObject]);

  return <>
    <View style={style.container}>
      <ImageBackground
        source={gameBg}
        style={style.container}
      >
        <LinearGradient colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.5)']} style={style.container}>
          <WebkataHeader
            webkataQuestionState={memorizedWebkataQuestionState}
            setShowLevels={setLocalState}
          />
          <ProblemStatement
            problemStatementOpen={localState.problemStatementOpen}
            toggleProblemStatement={toggleProblemStatement}
            question={questionObject?.question}
            style={style} />
          {/* <CodeEditor
            codeEditorWebViewRef={codeEditorWebViewRef}
            style={style}
          /> */}
          {
            questionObject
            && <CodeEditorsTab.Navigator
              initialLayout={{
                width: Dimensions.get('window').width,
              }}
              screenOptions={{
                swipeEnabled: false,
                tabBarStyle: {
                  ...style.bg1,
                },
                tabBarLabelStyle: { ...style.text },
                tabBarActiveTintColor: style.textColor2.color,
                tabBarIndicatorStyle: {
                  backgroundColor: style.textColor2.color,
                },
                tabBarInactiveTintColor: style.textColor3.color,
                tabBarItemStyle: {
                  width: 80,
                },
              }}
            >
              {
                Object.keys(questionObject.questionSetup.files)
                  .map((filePath, idx) => {
                    const { files } = memorizedWebkataQuestionState.questionObject.questionSetup;
                    const { name } = files[filePath];
                    return <CodeEditorsTab.Screen name={`${name}Tab`} key={idx} options={{ tabBarLabel: name }}>
                      {(props) => <CodeEditor {...props}
                        codeEditorWebViewRef={(el) => {
                          codeEditorsRefs.current[name] = el;
                        }}
                        style={style}
                        styleStringForDocumentInsideWebView={styleStringForDocumentInsideWebView}
                        onload={updateCodeEditor}
                        onCodeEditorChanged={(code) => onCodeEditorChange(name, code)}
                      />}
                    </CodeEditorsTab.Screen>;
                  })
              }
            </CodeEditorsTab.Navigator>
          }
        </LinearGradient>
      </ImageBackground>
    </View>
    <WebkataGameLevelComponent
      showLevels={localState.showLevels}
      webkataState={memorizedWebkataQuestionState}
      onLevelButtonPress={onLevelBtnPress}
      font={font}
      theme={theme}
      themeKey={'screenWebkataMain'}
      utilColors={theme.utilColors}
      gradients={theme.gradients}
    />
  </>;
};

export default WebkataMain;
