import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, {
  useRef, useContext, useState, useEffect,
} from 'react';
import {
  Text, TextInput, View, TouchableOpacity, StyleSheet, ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FormattedMessage } from 'react-intl';
import ThemeContext from '../components/theme';
import CodeEditorIcon from '../../images/ide/code-icon.svg';
import ConsoleIcon from '../../images/ide/console-icon.svg';
import RunCodeIcon from '../../images/ide/run-icon.svg';
import ConsoleLineIndicatorArrowIcon from '../../images/ide/console-line-indicator-arrow.svg';
import Icon from '../common/Icons';
import { getSession, setSession } from '../../hooks/common/framework';
import {
  getBoilerPlateCodeFromValue, getCompilerIdFromValue, getModeFromValue,
} from '../../web/javascripts/common/Functions/ide';
import Recaptchav3 from '../components/Recaptchav3';
import { useIde } from '../../hooks/pages/ide';
import API from '../../../env';
import KeepCodeChangesModal from '../components/Modals/KeepCodeChangesModal';
import LanguageSelector from '../components/LanguageSelector';
import CodeEditor from '../components/CodeEditor';

// constants
const defaultLanguageValue = 'python3';
let ideInteracted;

// get styles global function
const getStyles = (theme, utilColors, font) => StyleSheet.create({
  container: {
    height: '100%',
  },
  loader: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 9999,
    backgroundColor: utilColors.darkTransparent50,
    margin: 0,
  },
  bg1: {
    backgroundColor: utilColors.dark1,
  },
  bg2: {
    backgroundColor: utilColors.dark,
  },
  textColor1: {
    color: utilColors.lightGrey,
  },
  textColor2: {
    color: utilColors.white,
  },
  textColor3: {
    color: utilColors.dark,
  },
  bottomTabsBar: {
    flexDirection: 'row',
  },
  runBtnText: {
    color: theme.navBg,
  },
  tabBtn: {
    marginHorizontal: 10,
    flex: 1,
    alignItems: 'center',
  },
  codeEditorWebViewContainer: {
    flex: 1,
    zIndex: -1,
  },
  outputBoxContainer: {
    height: '100%',
    padding: 15,
  },
  outputBox: {
    height: '100%',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  outputBlock: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  outputBoxText: {
    marginLeft: 5,
    marginTop: -4,
    ...font.subtitle1,
  },
  inputDrawer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 15,
  },
  inputDrawBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputDrawerLabel: {
    ...font.subtitle1,
  },
  hideInputBox: {
    position: 'absolute',
    width: '100%',
    transform: [{ translateY: 200 }],
  },
  inputBoxContainer: {
    marginTop: 18,
  },
  inputBox: {
    borderRadius: 10,
    padding: 10,
    height: 150,
    ...font.subtitle1,
  },
  languageSelectorWithBackBtn: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  backBtnWithPageTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  pageTitle: {
    marginLeft: 10,
    ...font.bodyBold,
  },
  languageSelectorContainer: {
    flex: 1,
  },
  languageSelector: {
    borderRadius: 10,
    borderColor: theme.borderDark,
  },
  languageSelectorItem: {
    borderRadius: 8,
    padding: 10,
    backgroundColor: utilColors.white,
  },
  languageSelectorItemText: {
    color: utilColors.dark,
    ...font.body,
  },
  languageSelectorActiveItem: {
    backgroundColor: theme.btnBg,
  },
  languageSelectorDropdown: {
    borderWidth: 0,
    borderRadius: 8,
  },
});

// in-page componenets
const InputDrawer = ({
  style, ideState, setIdeState, localState, setLocalState,
}) => {
  const onInputDrawerPress = () => {
    setLocalState((prev) => (
      prev.languageSelectorOpen
        ? {
          ...prev,
          languageSelectorOpen: false,
          inputDrawerOpen: !prev.inputDrawerOpen,
        }
        : {
          ...prev,
          inputDrawerOpen: !prev.inputDrawerOpen,
        }));
  };

  return (
    <View style={[style.inputDrawer, style.bg1]}>
      <View style={{ position: 'relative' }}>
        <TouchableOpacity onPress={onInputDrawerPress}>
          <View style={style.inputDrawBtn}>
            <Text style={[style.inputDrawerLabel, style.textColor2]}>
              <FormattedMessage defaultMessage={'Inputs'} description={'Input drawer title'} />
            </Text>
            <TouchableOpacity onPress={onInputDrawerPress}>
              <Icon
                name={localState.inputDrawerOpen ? 'chevron-down' : 'chevron-up'}
                type='FontAwesome'
                size={20}
                color={style.textColor2.color}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <View style={localState.inputDrawerOpen ? [style.inputBoxContainer, style.bg1]
          : [style.inputBoxContainer, style.bg1, style.hideInputBox]}>
          <TextInput style={[style.inputBox, style.bg2, style.textColor1]} multiline={true} textAlignVertical={'top'} placeholder='Enter inputs if any'
            value={ideState.input} onChangeText={(value) => {
              setIdeState((prev) => ({ ...prev, input: value }));
            }} />
        </View>
      </View>
    </View>
  );
};

const Console = ({ style, ideState }) => (
  <View style={[style.outputBoxContainer, style.bg1]}>
    <View style={[style.outputBox, style.bg2]}>
      {
        ideState.output && <>
          {
            ideState.output.map((line, idx) => <View key={idx} style={style.outputBlock}>
              <ConsoleLineIndicatorArrowIcon />
              <Text style={[style.outputBoxText, style.textColor2]}>
                <FormattedMessage defaultMessage={'{line}'} description='console line' values={{ line }} />
              </Text>
            </View>)
          }
        </>
      }
      {
        !ideState.output
        && <Text style={[style.outputBoxText, style.textColor1]}>
          <FormattedMessage defaultMessage={'Output will be shown here'} description='output box placeholder text' />
        </Text>
      }
    </View>
  </View>
);

// Tab navigation customizations
const Tab = createBottomTabNavigator();

const TabArray = [
  {
    name: 'Code',
    component: CodeEditor,
    TabIcon: CodeEditorIcon,
  },
  {
    name: 'Console',
    component: Console,
    TabIcon: ConsoleIcon,
  },
];

const TabBar = (props) => {
  const {
    state,
    descriptors,
    navigation,
    font,
    style,
    utilColors,
    onRunCodePress,
  } = props;

  return (
    <View style={[style.bottomTabsBar, style.bg1]} >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const { TabIcon } = TabArray.filter((item) => item.name === route.name)[0];
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
            accessibilityRole='button'
            accessibilityStates={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[style.tabBtn, style.bg1]}
          >
            <Animatable.View
              duration={500}
              animation={isFocused ? 'bounceIn' : 'pulse'}
              useNativeDriver={true}
              style={{
                position: 'relative',
                height: 68,
                justifyContent: 'center',
                alignItems: 'center',
                width: '70%',
              }}
            >
              <View style={{
                position: 'absolute',
                top: 0,
                height: 4,
                width: '100%',
                backgroundColor: isFocused ? utilColors.white : 'transparent',
                borderRadius: 10,
              }}></View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TabIcon color={utilColors.white} />
                <View style={{ marginTop: 10 }}>
                  <Text style={{ color: utilColors.white, ...font.bodyBold }}>
                    <FormattedMessage defaultMessage={'{name}'} description='name' values={{ name: route.name }} />
                  </Text>
                </View>
              </View>
            </Animatable.View>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity style={style.tabBtn} onPress={() => onRunCodePress(navigation)}>
        <Animatable.View duration={500}
          animation={'bounce'}
          useNativeDriver={true}
          style={{
            height: 68,
            justifyContent: 'center',
            alignItems: 'center',
            width: '70%',
          }}>
          <RunCodeIcon color={utilColors.white} />
          <View style={{ marginTop: 10 }}>
            <Text style={[style.runBtnText, { ...font.bodyBold }]}>
              <FormattedMessage defaultMessage={'Run'} description='name' />
            </Text>
          </View>
        </Animatable.View>
      </TouchableOpacity>
    </View>
  );
};

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

// IDE component
const Ide = ({ navigation, route }) => {
  // hooks
  const isPageMounted = useRef(true);
  const codeEditorWebViewRef = useRef(null);
  const recaptchav3Ref = useRef(null);
  const {
    runCodeRequest,
    state: ideState,
    setState: setIdeState,
  } = useIde({ isPageMounted });
  const [localState, setLocalState] = useState({
    inputDrawerOpen: false,
    languageSelectorOpen: false,
    keepCodeChangesModalOpen: false,
  });

  // styles
  const { font, theme } = useContext(ThemeContext);
  const screenTheme = theme.screenIde;
  const style = getStyles(screenTheme, theme.utilColors, font);
  const styleStringForDocumentInsideWebView = `#editor {
    background-color: ${style.bg1.backgroundColor};
    color: ${style.textColor1.color};
  }

  .ace-monokai .ace_gutter {
    background: ${style.bg2.backgroundColor};
    color: ${style.textColor1.color};
  }`;

  // methods - event handlers
  const returnCodeEditorLoader = () => (<ActivityIndicator
    // visibility of Overlay Loading Spinner
    visible={localState.isLoading}
    // Text with the Spinner
    textContent={'Loading...'}
    // Text style of the Spinner Text
    textStyle={{ color: 'black' }}
    size={'large'}
    color={style.textColor2.color}
    style={style.loader}
  />);

  const onCodeEditorLoad = () => {
    const promisesArr = [getSession('previousLanguageValue'), getSession('previousSourceCode')];

    Promise.all(promisesArr).then((values) => {
      const [previousLanguageValue, previousSourceCode] = values;

      let mode;
      let code;

      if (previousLanguageValue && previousSourceCode) {
        mode = getModeFromValue(previousLanguageValue);
        code = previousSourceCode;
      } else {
        mode = getModeFromValue(defaultLanguageValue);
        code = getBoilerPlateCodeFromValue(defaultLanguageValue);
      }

      // update codeEditor
      codeEditorWebViewRef.current.injectJavaScript(updateCodeEditorJSString(mode, code));
    });
  };

  const onCodeEditorClicked = () => {
    setLocalState((prev) => ({ ...prev, languageSelectorOpen: false, inputDrawerOpen: false }));
  };

  const onCodeEditorChanged = (code) => {
    setIdeState((prev) => ({ ...prev, writtenCode: code }));
    // set 'ideInteracted' to true if user has changed something inside the code editor
    ideInteracted = true;
  };

  const onCodeEditorUpdateFinish = () => {
    // set 'ideInteracted' to false,
    // if something was changed inside
    // code editor internally(programatically)
    ideInteracted = false;
  };

  const onRunCodePress = (innerTabNavigation) => {
    const code = ideState.writtenCode;

    if (isPageMounted.current) {
      setIdeState((prev) => ({
        ...prev,
        output: ['Compiling your code...'],
      }));
    }

    setSession('previousLanguageValue', ideState.selectedLanguageValue);
    setSession('previousSourceCode', code);

    innerTabNavigation.navigate('Console');

    recaptchav3Ref.current.generateNewToken();
    recaptchav3Ref.current.setOnTokenFn(() => (token, recaptchaVersion) => {
      const sourceCode = code;
      const { input, selectedLanguageValue } = ideState;
      const compilerId = getCompilerIdFromValue(selectedLanguageValue);

      runCodeRequest(sourceCode, input, compilerId, token, recaptchaVersion).then((response) => {
        const parsedData = JSON.parse(response);
        const { compilationDetails } = parsedData;

        if (parsedData.status === 'success') {
          if (isPageMounted.current) {
            setIdeState((prev) => ({
              ...prev,
              output: [...prev.output, (compilationDetails.output ? compilationDetails.output.trim() : 'Nil')],
            }));
          }
        } else if (parsedData.status === 'error') {
          const err = new Error(parsedData.message);
          err.cause = 'postData';

          throw err;
        }
      }).catch((err) => {
        if (err.cause === 'postData') {
          console.log('Something went wrong! Please try again');
        } else {
          console.error(err);
        }
      });
    });
  };

  const onLanguageSelectorLoad = () => {
    getSession('previousLanguageValue').then((previousLanguageValue) => {
      let selectedLanguageValue;

      if (previousLanguageValue) {
        selectedLanguageValue = previousLanguageValue;
      } else {
        selectedLanguageValue = defaultLanguageValue;
      }

      setIdeState((prev) => ({ ...prev, selectedLanguageValue }));
    });
  };

  const onLanguageSelectorChange = (value) => {
    const mode = getModeFromValue(value);
    codeEditorWebViewRef.current.injectJavaScript(updateCodeEditorJSString(mode, false));

    // reset input and output box on every language change
    if (ideState.input || ideState.output) {
      setIdeState((prev) => ({
        ...prev, input: '', output: false,
      }));
    }

    if (ideInteracted === true) {
      setLocalState((prev) => ({ ...prev, keepCodeChangesModalOpen: true }));
    } else if (ideInteracted === false) {
      const code = getBoilerPlateCodeFromValue(value);
      codeEditorWebViewRef.current.injectJavaScript(updateCodeEditorJSString(false, code));
    }
  };

  const onKeepCodeChanges = () => {
    setLocalState((prev) => ({ ...prev, keepCodeChangesModalOpen: false }));
  };

  const onDoNotKeepCodeChanges = () => {
    setLocalState((prev) => ({ ...prev, keepCodeChangesModalOpen: false }));

    const code = getBoilerPlateCodeFromValue(ideState.selectedLanguageValue);
    codeEditorWebViewRef.current.injectJavaScript(updateCodeEditorJSString(false, code));
  };

  // common props;
  const commonProps = {
    style,
    ideState,
    setIdeState,
    localState,
    setLocalState,
  };

  useEffect(() => () => {
    ideInteracted = undefined;
    isPageMounted.current = false;
  }, []);

  return (
    <View style={style.container}>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        backBehavior={'none'}
        tabBar={(props) => <TabBar
          {...props}
          font={font}
          screenTheme={screenTheme}
          style={style}
          utilColors={theme.utilColors}
          onRunCodePress={onRunCodePress}
        />}>
        <Tab.Screen name='Code'>
          {
            () => <>
              <View style={style.languageSelectorWithBackBtn}>
                <View style={style.backBtnWithPageTitle}>
                  <TouchableOpacity style={style.backBtn} onPress={() => navigation.navigate('More')}>
                    <Icon
                      name={'arrow-left'}
                      type='FontAwesome'
                      size={15}
                      color={style.textColor3.color}
                    />
                  </TouchableOpacity>
                  <Text style={[style.pageTitle, style.textColor3]}>
                    <FormattedMessage defaultMessage={'IDE'} description='page title' />
                  </Text>
                </View>
                <View style={style.languageSelectorContainer}>
                  <LanguageSelector
                    style={style}
                    value={ideState.selectedLanguageValue}
                    setValue={(getValueFn) => {
                      const value = getValueFn();
                      setIdeState((prev) => ({
                        ...prev,
                        selectedLanguageValue: value,
                      }));
                    }}
                    open={localState.languageSelectorOpen}
                    setOpen={() => {
                      setLocalState((prev) => (
                        prev.inputDrawerOpen
                          ? {
                            ...prev,
                            inputDrawerOpen: false,
                            languageSelectorOpen: !prev.languageSelectorOpen,
                          }
                          : {
                            ...prev,
                            languageSelectorOpen: !prev.languageSelectorOpen,
                          }));
                    }}
                    onload={onLanguageSelectorLoad}
                    onChangeValue={onLanguageSelectorChange}
                  />
                </View>
              </View>
              <CodeEditor
                codeEditorWebViewRef={codeEditorWebViewRef}
                style={style}
                styleStringForDocumentInsideWebView={styleStringForDocumentInsideWebView}
                onload={onCodeEditorLoad}
                onCodeEditorChanged={onCodeEditorChanged}
                onCodeEditorClicked={onCodeEditorClicked}
                onCodeEditorUpdateFinish={onCodeEditorUpdateFinish}
                showLoader={true}
                loadingFunction={returnCodeEditorLoader}
              />
              <InputDrawer {...commonProps} />
            </>
          }
        </Tab.Screen>
        <Tab.Screen name='Console'>
          {
            () => <Console {...commonProps} />
          }
        </Tab.Screen>
      </Tab.Navigator>
      <Recaptchav3 ref={recaptchav3Ref} siteKey={API.RECAPCHAV3SITEKEY} domainURL={'https://localhost/'} />
      <KeepCodeChangesModal
        visible={localState.keepCodeChangesModalOpen}
        route={route}
        keepChangesHandler={onKeepCodeChanges}
        doNotKeepChangesHandler={onDoNotKeepCodeChanges} />
    </View>
  );
};

export default Ide;
