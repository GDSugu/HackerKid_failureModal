import React, {
  useContext, useState, useRef,
} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { FormattedMessage } from 'react-intl';
import Icon from '../common/Icons';
import ThemeContext from '../components/theme';
import codekataBg from '../../images/codekata/codekatabg-mob.png';
import { Yellow } from '../../colors/_colors';
import GameLevelComponent from '../components/GameLevelComponent';
import CodeEditor from '../components/CodeEditor';
import useCodekata, { CodekataContext } from '../../hooks/pages/codekata';
import LanguageSelector from '../components/LanguageSelector';
import {
  getBoilerPlateCodeFromValue,
  getModeFromValue,
  getValueToLanguageDisplayNameMap,
} from '../../web/javascripts/common/Functions/ide';
import PlayBtn from '../../images/games/playBtn.svg';
import GameNavBar from '../components/GameNavBar';

const getStyles = (theme, font, utilColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  hintContainer: {
    position: 'absolute',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 12,
    backgroundColor: utilColors.white,
    padding: 16,
  },
  flexBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintText: {
    ...font.subtitle1,
    width: '90%',
  },
  registerBtn: {
    backgroundColor: Yellow.color700,
    borderRadius: 12,
    borderColor: Yellow.color700,
    borderWidth: 1,
    flex: 1,
  },
  registerBtnText: {
    color: utilColors.white,
    ...font.subtitle1,
  },
  laterBtn: {
    backgroundColor: utilColors.white,
    borderRadius: 12,
    borderColor: Yellow.color700,
    borderWidth: 1,
    flex: 1,
  },
  laterBtnText: {
    color: utilColors.dark,
    ...font.subtitle1,
  },
  navigationBtn: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Yellow.color700,
    padding: 2,
    paddingHorizontal: 10,
  },
  mt16: {
    marginTop: 16,
  },
  questionCollapse: {
    backgroundColor: '#fff',
    width: '100%',
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  problemStatement: {
    color: '#212527',
  },
  collapseIcon: {
    color: '#212527',
  },
  collapsable: {
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  questionText: {
    color: '#000',
  },
  questionCont: {
    marginTop: 16,
  },
  languageSelector: {
    borderRadius: 0,
    backgroundColor: '#000',
    marginTop: 50,
  },
  languageSelectorItemText: {
    color: '#fff',
  },
  languageSelectorDropdown: {
    borderRadius: 0,
    backgroundColor: '#000',
    marginTop: 50,
  },
  codeEditorWebViewContainer: {
    width: '100%',
    height: '100%',
  },
  slideBtn: {
    position: 'absolute',
    width: 40,
    height: 100,
    right: 0,
    bottom: '50%',
    zIndex: 5,
    backgroundColor: '#505659',
    borderBottomLeftRadius: 12,
    borderTopLeftRadius: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statementCont: {
    position: 'absolute',
    zIndex: 5001,
    width: '100%',
  },
  outputCont: {
    marginTop: 50,
    position: 'absolute',
    zIndex: 5002,
    color: '#fff',
    height: Dimensions.get('window').height - 170,
    width: Dimensions.get('window').width - 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  outputHeadCont: {
    backgroundColor: '#000',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopLeftRadius: 12,
  },
  outputHead: {
    color: '#fff',
  },
  refreshIcon: {
    color: '#fff',
  },
  outputTextCont: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
    borderBottomLeftRadius: 12,
  },
  outputText: {
    color: '#000',
  },
  outputTextDefault: {
    textAlign: 'center',
  },
  slideCloseBnt: {
    width: 40,
    height: 100,
    backgroundColor: '#505659',
    borderBottomLeftRadius: 12,
    borderTopLeftRadius: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
  },
  collapsedBtnCont: {
    height: '100%',
    backgroundColor: '#212527BF',
  },
  outputCard: {
    width: '100%',
    height: '100%',
  },
  runBtn: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
  },
  tryNowBtn: {
    width: '90%',
    borderRadius: 12,
    backgroundColor: Yellow.color900,
    alignSelf: 'center',
    padding: 16,
    position: 'absolute',
    bottom: '25%',
    zIndex: 5,
  },
  submitBtn: {
    width: '95%',
    borderRadius: 12,
    backgroundColor: Yellow.color900,
    alignSelf: 'center',
    padding: 16,
    position: 'absolute',
    bottom: 48,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    ...font.subtitle1,
    color: utilColors.white,
  },
});

const defaultLanguageValue = 'python3';

const CodekataHeader = () => {
  const codekataContext = useContext(CodekataContext);
  const { font, theme } = useContext(ThemeContext);
  const { gradients, utilColors } = theme;

  return (
    <>
      <GameNavBar
        font={font}
        game={'codekata'}
        gradients={gradients}
        route={'codekataMain'}
        utilColors={utilColors}
        gameContext={codekataContext}
        hintVisibility={false}
      />
      <GameLevelComponent
        context={codekataContext}
        game={'codekata'}
        font={font}
        gradients={gradients}
        utilColors={utilColors}
        theme={theme}
        themeKey={'screenTurtleQuestion'}
        forCodekata={true}
      />
    </>
  );
};

const QuestionComponent = ({ style, data }) => {
  const [collpaseState, setCollapse] = useState(true);
  return (
    <View style={style.statementCont}>
      <TouchableHighlight onPress={() => setCollapse(!collpaseState)}>
        <View style={style.questionCollapse}>
          <Text style={style.problemStatement}>
            <FormattedMessage defaultMessage={'Problem Statement'} />
          </Text>
          <Icon
            name="chevron-down"
            type="FontAwesome"
            size={24}
            style={style.collapseIcon}
            // color={theme.utilColors.white}
          />
        </View>
      </TouchableHighlight>
      <Collapsible collapsed={collpaseState}>
        {data && <View style={style.collapsable}>
          <Text style={style.questionText}>
            <FormattedMessage
              defaultMessage={'{question}'}
              values={{
                question: data.questionDescription.replace(
                  /(\r\n|\n|\r)/gm,
                  '',
                ),
              }}
            />
          </Text>
          <View style={style.questionCont}>
            <Text style={style.questionText}>
              <FormattedMessage defaultMessage={'Input Description:'} />
            </Text>
            <Text style={style.questionText}>
              <FormattedMessage
                defaultMessage={'{input}'}
                values={{
                  input: data.inputDescription.replace(/(\r\n|\n|\r)/gm, ''),
                }}
              />
            </Text>
          </View>
          <View style={style.questionCont}>
            <Text style={style.questionText}>
              <FormattedMessage defaultMessage={'Output Description:'} />
            </Text>
            <Text style={style.questionText}>
              <FormattedMessage
                defaultMessage={'{output}'}
                values={{
                  output: data.outputDescription.replace(/(\r\n|\n|\r)/gm, ''),
                }}
              />
            </Text>
          </View>
          <View style={style.questionCont}>
            <Text style={style.questionText}>
              <FormattedMessage defaultMessage={'Sample Input:'} />
            </Text>
            {data.sampleIO.map((item, index) => (
              <Text style={style.questionText} key={index}>
                <FormattedMessage
                  defaultMessage={'{input}'}
                  values={{ input: item.input }}
                />
              </Text>
            ))}
          </View>
          <View style={style.questionCont}>
            <Text style={style.questionText}>
              <FormattedMessage defaultMessage={'Sample Output:'} />
            </Text>
            {data.sampleIO.map((item, index) => (
              <Text style={style.questionText} key={index}>
                <FormattedMessage
                  defaultMessage={'{output}'}
                  values={{ output: item.output }}
                />
              </Text>
            ))}
          </View>
        </View>}
      </Collapsible>
    </View>
  );
};

const OutputContainer = ({
  style, output = false, setOutputVisible, submitCode, setOutput,
}) => <View
style={style.outputCont}>
  <View style={style.collapsedBtnCont}>
    <TouchableHighlight style={style.slideCloseBnt} onPress={() => setOutputVisible(false)}>
      <Icon
        name="chevron-right"
        type="FontAwesome"
        size={24}
        style={style.collapseIcon}
        // color={theme.utilColors.white}
        />
    </TouchableHighlight>
  </View>
  <View style={style.outputCard}>
  <View style={style.outputHeadCont}>
    <Text style={style.outputHead}>
      <FormattedMessage
      defaultMessage={'Output'}
      description={'Output Heading'}/>
    </Text>
    <TouchableHighlight onPress={() => setOutput(false)}>
    <Icon
      name="rotate-right"
      type="FontAwesome"
      size={24}
      style={style.refreshIcon}
      // color={theme.utilColors.white}
      />
    </TouchableHighlight>
      </View>
      <View style={style.outputTextCont}>
        {output ? <><Text style={style.outputText}>
        <FormattedMessage
      defaultMessage={'{output}'}
      description={'Output'}
      values={{ output }}/>
        </Text><TouchableOpacity onPress={submitCode} style={style.submitBtn}>
          <View style={style.rowBetween}>
            <Text style={style.titleText}>
              <FormattedMessage
                defaultMessage='Submit'
                description='Submit Button'
              />
            </Text>
            <PlayBtn/>
          </View>
        </TouchableOpacity></> : <Text style={[style.outputTextDefault, style.outputText]}>
        <FormattedMessage
      defaultMessage={'Click “Run” to generate output for your code'}
      description={'Output'}/>
        </Text>}
      </View>
      </View>
  </View>;

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

const CodekataBody = () => {
  const codekataContext = useContext(CodekataContext);
  const { font, theme } = useContext(ThemeContext);
  const pageTheme = theme.screenTurtleHome;
  const style = getStyles(pageTheme, font, theme.utilColors);
  const [selectedLang, setLang] = useState('python3');
  const [langSelector, setLangSelector] = useState();
  const editorRef = useRef();
  const [outputVisible, setOutputVisible] = useState(false);
  const [outputField, setOutputField] = useState(false);
  const [codeValue, setCode] = useState(getBoilerPlateCodeFromValue(defaultLanguageValue));
  const valueToLanguageDisplayNameMap = getValueToLanguageDisplayNameMap();

  const onChangeValue = (value) => {
    const mode = getModeFromValue(value);
    const code = getBoilerPlateCodeFromValue(value);
    editorRef.current.injectJavaScript(updateCodeEditorJSString(mode, code));
    setCode(getBoilerPlateCodeFromValue(value));
  };

  const onCodeEditorLoad = () => {
    const mode = getModeFromValue(defaultLanguageValue);
    const code = getBoilerPlateCodeFromValue(defaultLanguageValue);
    editorRef.current.injectJavaScript(updateCodeEditorJSString(mode, code));
  };

  const codeRun = () => {
    const language = valueToLanguageDisplayNameMap[selectedLang];
    codekataContext.runCode({ lang: language, code: codeValue }).then((res) => {
      setOutputField(res.output);
      setOutputVisible(true);
    });
  };

  const codeSubmit = () => {
    const language = valueToLanguageDisplayNameMap[selectedLang];
    codekataContext.submitCode({
      questionId: codekataContext.ctxState.questionObject.questionId,
      code: codeValue,
      lang: language,
    }).then((res) => {
      setOutputField(res.evaluationDetails.output);
      setOutputVisible(true);
    });
  };

  return (
    <View>
      <QuestionComponent
        style={style}
        data={codekataContext.ctxState.questionObject}
      />
      <LanguageSelector
      style={style}
      value={selectedLang}
      setValue={setLang}
      open={langSelector}
      setOpen={setLangSelector}
      onChangeValue={onChangeValue}
      onload={() => {}}
      theme="DARK"
      />
      <CodeEditor
      codeEditorWebViewRef={editorRef}
      style={style}
      styleStringForDocumentInsideWebView=''
      onload={onCodeEditorLoad}
      onCodeEditorChanged={(value) => { setCode(value); }}
      onCodeEditorClicked={() => {}}
      onCodeEditorUpdateFinish={() => { }}
      showLoader={true}
      loadingFunction={() => {}}
      />
      <TouchableHighlight style={style.slideBtn} onPress={() => setOutputVisible(true)}>
      <View>
      <Icon
        name="chevron-left"
        type="FontAwesome"
        size={24}
        style={style.collapseIcon}
        />
      </View>
      </TouchableHighlight>
      <TouchableOpacity onPress={codeRun} style={style.tryNowBtn}>
          <View style={style.rowBetween}>
            <Text style={style.titleText}>
              <FormattedMessage
                defaultMessage='Run'
                description='Run Button'
              />
            </Text>
            <PlayBtn/>
          </View>
        </TouchableOpacity>
      {outputVisible && <OutputContainer
      setOutputVisible={setOutputVisible}
      style={style}
      output={outputField}
      submitCode={codeSubmit}
      setOutput={setOutputField}/>}
    </View>
  );
};

const CodekataMain = () => {
  const isPageMounted = useRef(true);
  const { font, theme } = useContext(ThemeContext);
  const pageTheme = theme.screenTurtleHome;
  const style = getStyles(pageTheme, font, theme.utilColors);
  const {
    state: codekataData,
    setState: setCodekata,
    static: {
      getCodekataQuestions,
      availableLanguages,
      getTempleteData,
      getLanguageId,
      runCode,
      submitCode,
    },
  } = useCodekata({ isPageMounted });

  return (
    <>
      <View style={style.container}>
        <ImageBackground source={codekataBg} style={style.container}>
          <View style={style.container}>
            <CodekataContext.Provider
              value={{
                ctxState: codekataData,
                ctxSetState: setCodekata,
                fetchQuestion: getCodekataQuestions,
                availableLanguages,
                getTempleteData,
                getLanguageId,
                runCode,
                submitCode,
              }}>
              <CodekataHeader />
              <CodekataBody />
            </CodekataContext.Provider>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

export default CodekataMain;
