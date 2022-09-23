import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, {
  useRef, useContext, useState,
} from 'react';
import {
  Text, TextInput, View, TouchableOpacity, StyleSheet, ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FormattedMessage } from 'react-intl';
import WebView from 'react-native-webview';
import DropDownPicker from 'react-native-dropdown-picker';
import ThemeContext from '../components/theme';
import CodeEditorIcon from '../../images/ide/code-icon.svg';
import ConsoleIcon from '../../images/ide/console-icon.svg';
import RunCodeIcon from '../../images/ide/run-icon.svg';
import ConsoleLineIndicatorArrowIcon from '../../images/ide/console-line-indicator-arrow.svg';
import Icon from '../common/Icons';
import { getSession, setSession } from '../../hooks/common/framework';
import {
  getBoilerPlateCodeFromValue, getCompilerIdFromValue, getModeFromValue,
  getValueToLanguageDisplayNameMap,
} from '../../web/javascripts/common/Functions/ide';
import Recaptchav3 from '../components/Recaptchav3';
import { useIde } from '../../hooks/pages/ide';
import API from '../../../env';
import webViewElement from '../components/WebView';
import KeepCodeChangesModal from '../components/Modals/KeepCodeChangesModal';

// constants
const valueToLanguageDisplayNameMap = getValueToLanguageDisplayNameMap();
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
const LanguageSelector = ({
  style, valueToLanguageNameMap, localState, setLocalState, onChangeValue,
}) => {
  const [items, setItems] = useState(() => Object.keys(valueToLanguageNameMap).map((key) => ({
    label: valueToLanguageNameMap[key],
    value: key,
  })));

  const setOpen = () => {
    setLocalState((prev) => (
      prev.inputDrawerOpen
        ? { ...prev, inputDrawerOpen: false, languageSelectorOpen: !prev.languageSelectorOpen }
        : { ...prev, languageSelectorOpen: !prev.languageSelectorOpen }));
  };

  const setValue = (getValueFn) => {
    const value = getValueFn();
    setLocalState((prev) => ({
      ...prev,
      selectedLanguageValue: value,
    }));
  };

  return (
    <DropDownPicker
      open={localState.languageSelectorOpen}
      setOpen={setOpen}
      setValue={setValue}
      onChangeValue={onChangeValue}
      value={localState.selectedLanguageValue}
      items={items}
      setItems={setItems}
      style={style.languageSelector}
      dropDownContainerStyle={style.languageSelectorDropdown}
      selectedItemContainerStyle={style.languageSelectorActiveItem}
      textStyle={style.languageSelectorItemText}
      autoScroll={true}
      showTickIcon={false}
      searchable={false}
    />
  );
};

const LanguageSelectorWidthBackBtn = ({
  style, onBackBtnPress, languageSelectorProps,
}) => (
  <View style={style.languageSelectorWithBackBtn}>
  <View style={style.backBtnWithPageTitle}>
    <TouchableOpacity style={style.backBtn} onPress={onBackBtnPress}>
      <Icon
      name={'arrow-left'}
      type='FontAwesome'
      size={15}
      color={style.textColor3.color}
    />
    </TouchableOpacity>
    <Text style={[style.pageTitle, style.textColor3]}>
      <FormattedMessage defaultMessage={'IDE'} description='page title'/>
    </Text>
    </View>
    <View style={style.languageSelectorContainer}>
      <LanguageSelector
        {...languageSelectorProps}
        style={style}
      />
    </View>
  </View>
);

const CodeEditor = ({
  style,
  id = 'editor',
  theme = 'monokai',
  onload,
  onCodeEditorChanged,
  onCodeEditorClicked,
  onCodeEditorUpdateFinish,
  codeEditorWebViewRef,
  hideLoadingSpinner,
}) => {
  const BodyComponent = () => <div id={id}></div>;

  const ScriptComponent = () => <>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossOrigin="anonymous"></script>
    <script src="https://unpkg.com/ace-builds@1.4.8/src-min-noconflict/ace.js" type="text/javascript"></script>
  </>;

  const styleString = `
  * {
    padding:0;
    margin:0;
    box-sizing: border-box;
  }

  #editor {
    position:relative;
    width:100vw;
    height:100vh;
    background-color: ${style.bg1.backgroundColor};
    color: ${style.textColor1.color};
  }

  .ace-monokai .ace_gutter {
    background: ${style.bg2.backgroundColor};
    color: ${style.textColor1.color};
  }`;

  const webViewHTML = webViewElement({
    BodyComponent,
    ScriptComponent,
    styleString,
  });

  const getInitialScript = () => `
  try{
    const editor = ace.edit('${id}');

    editor.setOptions({
      theme: 'ace/theme/${theme}',
      fontSize: 16,
      showPrintMargin: false,
      scrollPastEnd: true,
      wrap: true,
      enableLiveAutocompletion: true,
    });

    editor.on('change', (e)=>{
      const obj = {
        action:'codeEditorChanged',
        data: {
          code: editor.getValue(),
        }
      };

      window.ReactNativeWebView.postMessage(JSON.stringify(obj));
    });

    editor.on('click', (e)=>{
      const obj={
        action: 'codeEditorClicked'
      };

      window.ReactNativeWebView.postMessage(JSON.stringify(obj));
    })

    function updateCodeEditor(mode, code) {
      if(mode) {
        editor.setOption('mode', 'ace/mode/'+mode);
      }

      if(code) {
        editor.setValue(code);
      }

      const obj={
        action:'codeEditorUpdateFinish'
      };

      window.ReactNativeWebView.postMessage(JSON.stringify(obj));
    }

    window.execute = function(payload){
        switch (payload.action) {
          case 'updateCodeEditor':
            const {data} = payload;

            updateCodeEditor(data.mode, data.code);
            break;
          default: break;
        }
      }
    }catch(err){
      const errmsg = {
          action: 'error',
          data: {
            cause: 'initial script',
            error: err.message,
          },
        };

      window.ReactNativeWebView.postMessage(JSON.stringify(errmsg));
    };`;

  // handle message from CodeEditorWebView
  const handleMessageFromWebView = (msg) => {
    try {
      const message = JSON.parse(msg.nativeEvent.data);
      const { action, data } = message;
      switch (action) {
        case 'codeEditorClicked': {
          onCodeEditorClicked();
          break;
        }
        case 'codeEditorChanged': {
          onCodeEditorChanged(data.code);

          break;
        }
        case 'codeEditorUpdateFinish': {
          onCodeEditorUpdateFinish();
          break;
        }
        case 'error': {
          console.error(message);
          break;
        }
        default: break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={style.codeEditorWebViewContainer}>
      <WebView
        ref={codeEditorWebViewRef}
        originWhitelist={['*']}
        javaScriptEnabledAndroid={true}
        source={{ html: webViewHTML }}
        injectedJavaScript={getInitialScript()}
        onMessage={handleMessageFromWebView}
        onLoad={() => {
          onload();
          hideLoadingSpinner();
        }}
      />
    </View>
  );
};

const InputDrawer = ({
  style, localState, setLocalState,
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
        <TextInput style={[style.inputBox, style.bg2]} multiline={true} textAlignVertical={'top'} placeholder='Enter inputs if any'
          value={localState.input} onChangeText={(value) => {
            setLocalState((prev) => ({ ...prev, input: value }));
          }} />
      </View>
    </View>
  </View>
  );
};

const Console = ({ style, localState }) => (
  <View style={[style.outputBoxContainer, style.bg1]}>
    <View style={[style.outputBox, style.bg2]}>
      {
        localState.output && <>
          {
            localState.output.map((line, idx) => <View key={idx} style={style.outputBlock}>
            <ConsoleLineIndicatorArrowIcon />
            <Text style={[style.outputBoxText, style.textColor2]}>
              <FormattedMessage defaultMessage={'{line}'} description='console line' values={{ line }}/>
            </Text>
            </View>)
          }
        </>
      }
      {
        !localState.output
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
                      <FormattedMessage defaultMessage={'{name}'} description='name' values={{ name: route.name }}/>
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
              <FormattedMessage defaultMessage={'Run'} description='name'/>
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
  const codeEditorWebViewRef = useRef(null);
  const recaptchav3Ref = useRef(null);
  const runCodeRequest = useIde();
  const [localState, setLocalState] = useState({
    isLoading: true,
    inputDrawerOpen: false,
    languageSelectorOpen: false,
    keepCodeChangesModalOpen: false,
    input: '',
    selectedLanguageValue: defaultLanguageValue,
    output: false,
    executionTime: false,
    memory: false,
    writtenCode: false,
  });

  // styles
  const { font, theme } = useContext(ThemeContext);
  const screenTheme = theme.screenIde;
  const style = getStyles(screenTheme, theme.utilColors, font);

  // methods - event handlers
  const showLoadingSpinner = () => {
    setLocalState((prev) => ({
      ...prev,
      isLoading: true,
    }));
  };

  const hideLoadingSpinner = () => {
    setLocalState((prev) => ({
      ...prev,
      isLoading: false,
    }));
  };

  const onCodeEditorLoad = () => {
    const promisesArr = [getSession('previousLanguageValue'), getSession('previousSourceCode')];

    Promise.all(promisesArr).then((values) => {
      const [previousLanguageValue, previousSourceCode] = values;

      let mode;
      let code;
      let selectedLanguageValue;

      if (previousLanguageValue && previousSourceCode) {
        selectedLanguageValue = previousLanguageValue;
        mode = getModeFromValue(previousLanguageValue);
        code = previousSourceCode;
      } else {
        mode = getModeFromValue(defaultLanguageValue);
        code = getBoilerPlateCodeFromValue(defaultLanguageValue);
        selectedLanguageValue = defaultLanguageValue;
      }

      // update codeEditor
      codeEditorWebViewRef.current.injectJavaScript(updateCodeEditorJSString(mode, code));
      // update language selector
      setLocalState((prev) => ({ ...prev, selectedLanguageValue }));
      setLocalState((prev) => ({ ...prev, keepCodeChangesModalOpen: false }));
    });
  };

  const onRunCodePress = (innerTabNavigation) => {
    const code = localState.writtenCode;

    setLocalState((prev) => ({
      ...prev,
      output: ['Compiling your code...'],
    }));

    setSession('previousLanguageValue', localState.selectedLanguageValue);
    setSession('previousSourceCode', code);

    innerTabNavigation.navigate('Console');

    recaptchav3Ref.current.generateNewToken();
    recaptchav3Ref.current.setOnTokenFn(() => (token, recaptchaVersion) => {
      const sourceCode = code;
      const { input, selectedLanguageValue } = localState;
      const compilerId = getCompilerIdFromValue(selectedLanguageValue);

      runCodeRequest(sourceCode, input, compilerId, token, recaptchaVersion)
        .then((response) => {
          const parsedData = JSON.parse(response);
          const { compilationDetails } = parsedData;

          if (parsedData.status === 'success') {
            setLocalState((prev) => ({
              ...prev,
              output: [...prev.output, (compilationDetails.output ? compilationDetails.output.trim() : 'Nil')],
            }));
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

  const onLanguageSelectorChange = async (value) => {
    const mode = getModeFromValue(value);
    codeEditorWebViewRef.current.injectJavaScript(updateCodeEditorJSString(mode, false));

    // reset input and output box on every language change
    setLocalState((prev) => ({
      ...prev, input: '', output: false, executionTime: false, memory: false,
    }));

    if (ideInteracted) {
      setLocalState((prev) => ({ ...prev, keepCodeChangesModalOpen: true }));
    } else {
      const code = getBoilerPlateCodeFromValue(value);
      codeEditorWebViewRef.current.injectJavaScript(updateCodeEditorJSString(false, code));
    }
  };

  // on code reply from webview after invoking in onRunCodePress
  const onCodeEditorClicked = () => {
    setLocalState((prev) => ({ ...prev, languageSelectorOpen: false, inputDrawerOpen: false }));
  };

  const onCodeEditorChanged = (code) => {
    setLocalState((prev) => ({ ...prev, writtenCode: code }));
    // set 'ideInteracted' to true if user has changed something inside the code editor
    ideInteracted = true;
  };

  const onCodeEditorUpdateFinish = () => {
    // set 'ideInteracted' to false,
    // if something was changed inside
    // code editor internally(programatically)
    ideInteracted = false;
  };

  const onKeepCodeChanges = () => {
    setLocalState((prev) => ({ ...prev, keepCodeChangesModalOpen: false }));
  };

  const onDoNotKeepCodeChanges = () => {
    setLocalState((prev) => ({ ...prev, keepCodeChangesModalOpen: false }));

    const code = getBoilerPlateCodeFromValue(localState.selectedLanguageValue);
    codeEditorWebViewRef.current.injectJavaScript(updateCodeEditorJSString(false, code));
  };

  // common props;
  const commonProps = {
    style,
    localState,
    setLocalState,
    showLoadingSpinner,
    hideLoadingSpinner,
  };

  return (
    <View style={style.container}>
      {
        localState.isLoading && <ActivityIndicator
        // visibility of Overlay Loading Spinner
        visible={localState.isLoading}
        // Text with the Spinner
        textContent={'Loading...'}
        // Text style of the Spinner Text
        textStyle={{ color: 'black' }}
        size={'large'}
        color={style.textColor2.color}
        style={style.loader}
      />
    }
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
              ({ navigation: innerTabNavigation }) => <>
                <LanguageSelectorWidthBackBtn
                  {...commonProps}
                  onBackBtnPress = {() => navigation.goBack()}
                  languageSelectorProps={{
                    localState,
                    setLocalState,
                    valueToLanguageNameMap: valueToLanguageDisplayNameMap,
                    onChangeValue: onLanguageSelectorChange,
                  }}
                />
                <CodeEditor {...commonProps}
                  navigation={innerTabNavigation}
                  codeEditorWebViewRef={codeEditorWebViewRef}
                  onload={onCodeEditorLoad}
                  onCodeEditorChanged={onCodeEditorChanged}
                  onCodeEditorClicked={onCodeEditorClicked}
                  onCodeEditorUpdateFinish={onCodeEditorUpdateFinish}
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
