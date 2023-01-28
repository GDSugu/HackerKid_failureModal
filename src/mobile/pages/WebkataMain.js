import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import {
  BackHandler,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FormattedMessage } from 'react-intl';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import WebView from 'react-native-webview';
import Icon from '../common/Icons';
import webkataHtmlBg from '../../images/webkata/webkataHtmlBgWeb.png';
import webkataCssBg from '../../images/webkata/webkataCssBgWeb.png';
import webkataJsBg from '../../images/webkata/webkataJsBgWeb.png';
import WebkataHeader from '../components/Header/WebkataHeader';
import { useWebkataFetchQuestion, useWebkataSubmitQuestion } from '../../hooks/pages/webkata';
import WebkataGameLevelComponent from '../components/WebkataGameLevelComponent';
import ThemeContext from '../components/theme';
import CodeEditor from '../components/CodeEditor';
import useOrientation from '../../hooks/common/orientation';
import WebkataSuccessModal from '../components/Modals/WebkataSuccessModal';
import TestCasePassedIcon from '../../images/webkata/test-case-passed-icon.svg';
import TestCaseFailedIcon from '../../images/webkata/test-case-failed-icon.svg';
import { debounce1 } from '../../hooks/common/utlis';

// tab navigators
const CodeEditorsTab = createMaterialTopTabNavigator();

// functions
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
  bg4: {
    backgroundColor: utilColors.white,
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
  secondaryTabs: {
    flexDirection: 'row',
  },
  secondaryTab: {
    paddingVertical: 18,
    paddingHorizontal: 25,
  },
  activeTabIndicator: {
    height: 2,
    backgroundColor: utilColors.white,
  },
  containerWithRevealerBtn: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
  },
  revealerContainer: {
    height: '100%',
    justifyContent: 'center',
  },
  revealerBtn: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: utilColors.grey,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  runBtn: {
    position: 'absolute',
    paddingVertical: 16,
    paddingHorizontal: 10,
    // top: Dimensions.get('window').height - 60,
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#FE6A07',
    borderRadius: 10,
    width: '95%',
  },
  runBtnText: {
    ...font.subtitleBold,
  },
  darkTransparentBg: {
    backgroundColor: utilColors.overlay1,
  },
  notValidated: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  notValidatedRunBtn: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#FE6A07',
    borderRadius: 10,
    marginTop: 10,
  },
  notValidatedRunBtnText: {
    marginRight: 16,
  },
  testCaseResults: {
    padding: 18,
  },
  testCaseResult: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  testCaseResultText: {
    marginLeft: 10,
    ...font.subtitle2,
  },
  testCasePassedFailedIcon: {
    width: font.subtitle1.fontSize,
    height: font.subtitle1.fontSize,
  },
});

const getBackupSetup = (getSetupFor) => {
  let questionSetups = {};
  try {
    questionSetups = {
      react: {
        dependencies: {
          react: '^16.8.6',
          'react-dom': '^16.8.6',
          'react-scripts': '3.0.1',
        },
        files: {
          '/src/index.js': {
            code: 'import React from "react";\nimport ReactDOM from "react-dom";\n\nimport App from "./App";\n\nconst rootElement = document.getElementById("root");\nReactDOM.render(\n    <React.StrictMode>\n    <App />\n    </React.StrictMode>,\n    rootElement\n);',
          },
          '/src/App.js': {
            code: 'import React from "react";\nimport "./styles.css";\n\nexport default function App() {\n  let greetingsBy = "GUVI";\n  return (\n    <div className="App">\n        <h1>Hello From {greetingsBy}</h1>\n        <h2>Start Editing see the changes</h2>\n    </div>\n  );\n}',
          },
          '/src/styles.css': {
            code: '.App {    font-family: sans-serif;    text-align: center;}',
          },
          '/public/index.html': {
            code: '<!DOCTYPE html>\n<html lang="en">\n\n  <head>\n    <meta charset="utf-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n    <meta name="theme-color" content="#000000">\n    <link rel="manifest" href="%PUBLIC_URL%/manifest.json">\n    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">\n    <title>React App</title>\n </head>\n\n <body>\n    <noscript>\n        You need to enable JavaScript to run this app.\n    </noscript>\n    <div id="root"></div>\n </body>\n\n</html>',
          },
        },
        entry: '/src/index.js',
      },
      static: {
        dependencies: {

        },
        files: {
          '/index.html': {
            code: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta http-equiv="X-UA-Compatible" content="ie=edge">\n    <title>Static Template</title>\n  </head>\n  <body>\n    <h1>Hello from GUVI</h1>\n  </body>\n</html>',
            name: 'HTML',
          },

          '/index.css': {
            code: '',
            name: 'CSS',
          },
          '/index.js': {
            code: '',
            name: 'JavaScript',
          },
        },
        entry: '/index.html',
      },
      angular: {
        dependencies: {
          '@angular/animations': '^9.0.0',
          '@angular/common': '^9.0.0',
          '@angular/compiler': '^9.0.0',
          '@angular/core': '^9.0.0',
          '@angular/forms': '^9.0.0',
          '@angular/platform-browser': '^9.0.0',
          '@angular/platform-browser-dynamic': '^9.0.0',
          '@angular/router': '^9.0.0',
          'core-js': '3.6.4',
          rxjs: '6.5.4',
          'zone.js': '0.10.2',
        },
        files: {
          '/.angular-cli.json': {
            code: '{\n    "apps": [{\n        "root": "src",\n        "outDir": "dist",\n        "assets": ["assets", "favicon.ico"],\n        "index": "index.html",\n        "main": "main.ts",\n        "polyfills": "polyfills.ts",\n        "prefix": "app",\n        "styles": ["styles.css"],\n        "scripts": [],\n        "environmentSource": "environments/environment.ts",\n        "environments": {\n            "dev": "environments/environment.ts",\n            "prod": "environments/environment.prod.ts"\n        }\n    }]\n}',
          },
          '/src/typings.d.ts': {
            code: '/* SystemJS module definition */\ndeclare var module: NodeModule;\ninterface NodeModule {\n    id: string;\n}',
          },
          '/src/styles.css': {
            code: '/* You can add global styles to this file, and also import other style files */\n\nhtml,\nbody {\n  font-family: sans-serif;\n}',
          },
          '/src/polyfills.ts': {
            code: '/**\n * This file includes polyfills needed by Angular and is loaded before the app.\n * You can add your own extra polyfills to this file.\n *\n * This file is divided into 2 sections:\n *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.\n *   2. Application imports. Files imported after ZoneJS that should be loaded before your main\n *      file.\n *\n * The current setup is for so-called "evergreen" browsers; the last versions of browsers that\n * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),\n * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.\n *\n * Learn more in https://angular.io/docs/ts/latest/guide/browser-support.html\n */\n\n/***************************************************************************************************\n * BROWSER POLYFILLS\n */\n\n/** IE9, IE10 and IE11 requires all of the following polyfills. **/\n// import \'core-js/es6/symbol\';\n// import \'core-js/es6/object\';\n// import \'core-js/es6/function\';\n// import \'core-js/es6/parse-int\';\n// import \'core-js/es6/parse-float\';\n// import \'core-js/es6/number\';\n// import \'core-js/es6/math\';\n// import \'core-js/es6/string\';\n// import \'core-js/es6/date\';\n// import \'core-js/es6/array\';\n// import \'core-js/es6/regexp\';\n// import \'core-js/es6/map\';\n// import \'core-js/es6/weak-map\';\n// import \'core-js/es6/set\';\n\n/** IE10 and IE11 requires the following for NgClass support on SVG elements */\n// import \'classlist.js\';  // Run `npm install --save classlist.js`.\n\n/** IE10 and IE11 requires the following for the Reflect API. */\n// import \'core-js/es6/reflect\';\n\n/** Evergreen browsers require these. **/\n// Used for reflect-metadata in JIT. If you use AOT (and only Angular decorators), you can remove.\nimport "core-js/proposals/reflect-metadata";\n\n/**\n * Required to support Web Animations `@angular/platform-browser/animations`.\n * Needed for: All but Chrome, Firefox and Opera. http://caniuse.com/#feat=web-animation\n **/\n// import \'web-animations-js\';  // Run `npm install --save web-animations-js`.\n\n/***************************************************************************************************\n * Zone JS is required by default for Angular itself.\n */\nimport "zone.js/dist/zone"; // Included with Angular CLI.\n\n/***************************************************************************************************\n * APPLICATION IMPORTS\n */',
          },
          '/src/main.ts': {
            code: 'import { enableProdMode } from "@angular/core";\nimport { platformBrowserDynamic } from "@angular/platform-browser-dynamic";\n\nimport { AppModule } from "./app/app.module";\nimport { environment } from "./environments/environment";\n\nif (environment.production) {\n  enableProdMode();\n}\n\nplatformBrowserDynamic()\n  .bootstrapModule(AppModule)\n  .catch(err => console.log(err));\n',
          },
          '/src/index.html': {
            code: '<!doctype html>\n<html lang="en">\n\n<head>\n  <meta charset="utf-8">\n  <title>Angular</title>\n  <base href="/">\n\n <meta name="viewport" content="width=device-width, initial-scale=1">\n  <link rel="icon" type="image/x-icon" href="favicon.ico">\n</head>\n\n<body>\n <app-root></app-root>\n</body>\n\n</html>',
          },
          '/src/environments/environment.prod.ts': {
            code: 'export const environment = {\n  production: true\n};\n',
          },
          '/src/environments/environment.ts': {
            code: '// The file contents for the current environment will overwrite these during build.\n// The build system defaults to the dev environment which uses `environment.ts`, but if you do\n// `ng build --env=prod` then `environment.prod.ts` will be used instead.\n// The list of which env maps to which file can be found in `.angular-cli.json`.\n\nexport const environment = {\n  production: false\n};\n',
          },
          '/src/app/app.component.css': {
            code: 'div {\n  text-align: center;\n}\n',
          },
          '/src/app/app.component.html': {
            code: '<!--The content below is only a placeholder and can be replaced.-->\n<div>\n  <h1>\n    Welcome to {{ title }}!\n  </h1>\n  <img\n    width="300"\n    alt="Angular Logo"\n    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg=="\n  />\n</div>\n',
          },
          '/src/app/app.component.ts': {
            code: 'import { Component } from "@angular/core";\n\n@Component({\n  selector: "app-root",\n  templateUrl: "./app.component.html",\n  styleUrls: ["./app.component.css"]\n})\nexport class AppComponent {\n  title = "GUVI";\n}\n',
          },
          '/src/app/app.module.ts': {
            code: 'import { BrowserModule } from "@angular/platform-browser";\nimport { NgModule } from "@angular/core";\n\nimport { AppComponent } from "./app.component";\n\n@NgModule({\n  declarations: [AppComponent],\n  imports: [BrowserModule],\n  providers: [],\n  bootstrap: [AppComponent]\n})\nexport class AppModule {}\n',
          },
        },
        entry: '/src/main.ts',
      },
      testing: {
        files: {
          '/index.html': {
            code: '',
          },
          '/index.js': {
            code: '',
          },
          '/package.json': {
            code: JSON.stringify(
              {
                name: 'static',
                version: '1.0.0',
                description: 'This is a static template with no bundling',
                main: 'index.html',
                scripts: {
                  start: 'serve',
                  build: 'echo This is a static template, there is no bundler or bundling involved!',
                },
                repository: {
                  type: 'git',
                  url: 'git+https://github.com/codesandbox-app/static-template.git',
                },
                keywords: [
                  'static',
                  'template',
                  'codesandbox',
                ],
                author: 'Ives van Hoorne',
                license: 'MIT',
                bugs: {
                  url: 'https://github.com/codesandbox-app/static-template/issues',
                },
                homepage: 'https://github.com/codesandbox-app/static-template#readme',
                devDependencies: {
                  serve: '^11.2.0',
                },
              },
              null,
              2,
            ),
          },
        },
        entry: '/index.html',
      },
    };
  } catch (error) {
    console.log(error);
  }
  return questionSetups[getSetupFor];
};

const getModeFromConceptId = (conceptId) => {
  const conceptIdToModeMap = {
    HTML: 'html',
    CSS: 'css',
    JS: 'javascript',
  };
  if (!conceptId || !(conceptId in conceptIdToModeMap)) {
    return 'text';
  }

  return conceptIdToModeMap[conceptId];
};

const formatCode = (conceptId, code) => {
  let formattedCode;
  try {
    switch (conceptId) {
      case 'HTML': {
        formattedCode = code;
        break;
      }
      case 'CSS': {
        formattedCode = `<style>${code}</style>`;
        break;
      }
      case 'JS': {
        formattedCode = `<script>${code}</script>`;
        break;
      }
      default: {
        formattedCode = '';
        break;
      }
    }
  } catch (e) {
    console.error(e);
  }
  return formattedCode;
};

const getCurrentQuestionSetup = (questionState) => {
  let setup = {};
  try {
    const { submissionDetails, questionObject: qnObject } = questionState;

    setup = submissionDetails.isSubmitted
      ? submissionDetails.submissionSetup
      : qnObject.questionSetup;
  } catch (e) {
    const { questionObject: qnObject } = questionState;

    const getSetupFor = ['HTML', 'CSS', 'JS'].includes(qnObject.conceptId.toUpperCase()) ? 'static' : qnObject.conceptId;
    setup = getBackupSetup(getSetupFor);
    console.error(e);
  }

  return setup;
};

// methods for webview JavaScript injection
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
        caller: 'codeEditorUpdate',
      };
      window.ReactNativeWebView.postMessage(JSON.stringify(errmsg));
    }
  `;
};

const updateLivePreivewJSString = (code) => {
  const obj = {
    action: 'updateDocument',
    data: {
      code,
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
        caller: 'updateLivePreview',
      };
      window.ReactNativeWebView.postMessage(JSON.stringify(errmsg));
    }
  `;
};

const invokeRunProccessJSString = (unitTests) => {
  const obj = {
    action: 'runUnitTests',
    data: {
      unitTests,
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
        caller: 'updateLivePreview',
      };
      window.ReactNativeWebView.postMessage(JSON.stringify(errmsg));
    }
  `;
};

// in-page components in the same order as they are visually in the design
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

const RevealerButton = ({ style, revealed, toggleReveal }) => <View style={revealed
  ? [style.revealerContainer, style.darkTransparentBg]
  : style.revealerContainer}>
  <TouchableOpacity
    style={style.revealerBtn}
    onPress={toggleReveal}
  >
    <Icon
      name={revealed ? 'angle-right' : 'angle-left'}
      type='FontAwesome'
      size={30}
      color={style.textColor2.color}
    />
  </TouchableOpacity>
</View>;

const SecondaryTabBar = ({
  style,
  activeTab,
  changeTab,
}) => <View style={[style.bg1, style.secondaryTabs]}>
    <View>
      <TouchableOpacity style={style.secondaryTab} onPress={() => changeTab('livePreview')}>
        <Text style={activeTab === 'livePreview' ? [style.text, style.textColor2]
          : [style.text, style.textColor3]}>
          <FormattedMessage defaultMessage={'Live Preview'} description='Live preview tab' />
        </Text>
      </TouchableOpacity>
      {
        activeTab === 'livePreview'
        && <View style={style.activeTabIndicator}></View>
      }
    </View>
    <View>
      <TouchableOpacity style={style.secondaryTab} onPress={() => changeTab('validatedResult')}>
        <Text style={activeTab === 'validatedResult' ? [style.text, style.textColor2]
          : [style.text, style.textColor3]}>
          <FormattedMessage defaultMessage={'Validated Result'} description='validated result' />
        </Text>
      </TouchableOpacity>
      {
        activeTab === 'validatedResult'
        && <View style={style.activeTabIndicator}></View>
      }
    </View>
  </View>;

const ValidatedResult = ({
  visible,
  style,
  evaluationDetails,
  onRunBtnPress,
}) => <View style={[style.container, { display: visible ? 'flex' : 'none' }, style.bg4]}>
    {
      evaluationDetails
      && <ScrollView style={[style.container, style.testCaseResults]}>
        {
          evaluationDetails.result.map((resultObj, idx) => (
            <View key={idx} style={style.testCaseResult}>
              {
                resultObj.passed
                && <TestCasePassedIcon style={style.testCasePassedFailedIcon} />
              }
              {
                !resultObj.passed
                && <TestCaseFailedIcon style={style.testCasePassedFailedIcon} />
              }
              <Text style={[style.testCaseResultText, style.textColor1]}>
                <FormattedMessage
                  defaultMessage={'Private Test Case {testCaseNumber} - {result}'}
                  description='test case result text'
                  values={{
                    testCaseNumber: idx + 1,
                    result: resultObj.passed ? 'Passed' : 'Failed',
                  }}
                />
              </Text>
            </View>
          ))
        }
      </ScrollView>
    }
    {
      !evaluationDetails
      && <View
        style={[style.container, style.notValidated]}>
        <Text style={[style.text, style.textColor1]}>
          <FormattedMessage defaultMessage={'Click "Run" to validate'} description='not validated text' />
        </Text>
        <TouchableOpacity style={style.notValidatedRunBtn} onPress={onRunBtnPress}>
          <Text style={[style.runBtnText, style.textColor2, style.notValidatedRunBtnText]}>
            <FormattedMessage defaultMessage={'Run'} description='run button text' />
          </Text>
          <Icon
            name='play'
            type='FontAwesome'
            size={style.runBtnText.fontSize}
            color={style.textColor2.color}
          />
        </TouchableOpacity>
      </View>
    }
  </View>;

const LivePreview = ({
  visible,
  livePreviewWebViewRef,
  style,
  codeState,
  onMessageFromLivePreviewWebView,
}) => {
  const getInitialScript = () => `
    try {
      var updateLivePreview = (code)=>{
        document.open();
        document.write(code);
        document.close();
      };

      const evaluateTest = (expression, runTestsOnSelector) => {
        let result = '';
        try {
          const testExpression = expression.replace(/{{frameWindow}}./g, '');
          result = eval(testExpression);
        } catch (error) {
          console.error(error);
        }
        return result;
      };

      const runUnitTests = (unitTests) => {
        const testOutput = [];
        try {
          unitTests.map((eachTest, eachKey) => {
            const evaluatedResult = evaluateTest(eachTest.testExpression);
            testOutput[eachKey] = evaluatedResult;
            return true;
          });
        } catch (error) {
          console.log(error);
        }
        return testOutput;
      };

      window.execute = function(payload) {
        const {action} = payload;

        switch(action) {
          case 'updateDocument':{
            const {data} = payload;
            const {code} = data;

            document.open();
            document.write(code);
            document.close();
            break;
          }
          case 'runUnitTests': {
            const {data} = payload;
            const {unitTests} = data;

            const result = runUnitTests(unitTests);

            const resultObj = {
              action: 'runUnitTests',
              data: result,
            };

            window.ReactNativeWebView.postMessage(JSON.stringify(resultObj));

            break;
          }
          default:break;
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
    }`;

  const updateLivePreview = () => {
    const codeArr = [];

    Object.keys(codeState).forEach((concept) => {
      codeArr.push(formatCode(concept, codeState[concept]));
    });

    const toInjectScript = updateLivePreivewJSString(codeArr.join(''));

    livePreviewWebViewRef.current.injectJavaScript(toInjectScript);
  };

  useEffect(() => {
    updateLivePreview();
  }, [codeState]);

  return <View style={[style.container, { display: visible ? 'flex' : 'none' }]}>
    <WebView
      ref={livePreviewWebViewRef}
      scalesPageToFit
      injectedJavaScript={getInitialScript()}
      onMessage={onMessageFromLivePreviewWebView}
      onLoad={updateLivePreview}
    />
  </View>;
};

const WebkataMain = ({ route }) => {
  // refs
  const isPageMounted = useRef(true);
  const codeEditorsRefs = useRef({});
  const livePreviewWebViewRef = useRef(null);

  // route params
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
    livePreviewOpen: false,
    successModalOpen: false,
  });
  const [codeState, setCodeState] = useState({});
  const [secondaryActiveTab, setSecondaryActiveTab] = useState('livePreview');
  const orientation = useOrientation();

  const {
    livePreviewOpen,
  } = localState;

  const {
    state: webkataQuestionState,
    fetchWebkataQuestion,
  } = useWebkataFetchQuestion({
    isPageMounted, initializeData: true, conceptid: conceptId, virtualid: id,
  });

  const {
    state: webkataSubmitState,
    submitWebkataQuestion,
    resetWebkataSubmitState,
  } = useWebkataSubmitQuestion({ isPageMounted });

  const {
    questionObject,
  } = webkataQuestionState;

  const {
    evaluationDetails,
    passed,
    pointsDetails,
    profileDetails,
  } = webkataSubmitState;

  const memorizedWebkataQuestionState = React.useMemo(() => webkataQuestionState,
    [webkataQuestionState]);

  if (conceptId === 'HTML') {
    gameBg = webkataHtmlBg;
  } else if (conceptId === 'CSS') {
    gameBg = webkataCssBg;
  } else if (conceptId === 'JS') {
    gameBg = webkataJsBg;
  }

  // methods
  const updateCodeEditor = (setup) => {
    try {
      const { files } = setup;
      const newCodeState = {};

      Object.keys(files).forEach((filePath) => {
        const { name, code } = setup.files[filePath];
        const mode = getModeFromConceptId(name);

        newCodeState[name] = code;

        const toInjectScript = updateCodeEditorJSString(mode, code);
        codeEditorsRefs.current[name]?.injectJavaScript(toInjectScript);
      });

      setCodeState(newCodeState);
    } catch (e) {
      console.error(e);
    }
  };

  // event handlers
  const toggleProblemStatement = () => {
    setLocalState((prev) => ({ ...prev, problemStatementOpen: !prev.problemStatementOpen }));
  };

  const onCodeEditorLoad = () => {
    try {
      const setup = getCurrentQuestionSetup(webkataQuestionState);
      updateCodeEditor(setup);
    } catch (e) {
      console.error(e);
    }
  };

  const onCodeEditorChange = (changedConceptId, code) => {
    setCodeState((prev) => ({ ...prev, [changedConceptId]: code }));
  };

  const closeLevels = () => {
    setLocalState((prev) => ({ ...prev, showLevels: false }));
  };

  const onLevelBtnPress = (virtualIdPressed) => {
    fetchWebkataQuestion(conceptId, virtualIdPressed);
  };

  const onRanUnitTests = (unitTestsResult) => {
    const { questionId } = questionObject;
    const testResult = unitTestsResult;
    const currentQuestionSetup = getCurrentQuestionSetup(webkataQuestionState);

    // format question setup for submission
    const { files } = currentQuestionSetup;
    Object.keys(files).forEach((filePath) => {
      const file = files[filePath];
      const { name } = file;

      file.code = codeState[name];
    });

    submitWebkataQuestion(questionId,
      testResult,
      currentQuestionSetup,
      questionObject.conceptId);
  };

  const onMessageFromLivePreviewWebView = (msg) => {
    try {
      const message = JSON.parse(msg.nativeEvent.data);
      const { action } = message;

      switch (action) {
        case 'runUnitTests': {
          const { data } = message;
          onRanUnitTests(data);
          break;
        }
        default: break;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onRunBtnPress = () => {
    const { testCases } = questionObject;
    const toInjectScript = invokeRunProccessJSString(testCases);

    livePreviewWebViewRef.current.injectJavaScript(toInjectScript);
  };

  // sideEffects
  useEffect(() => {
    if (questionObject) {
      // reseting every states when user moves to different level
      resetWebkataSubmitState();
      setCodeState({
        HTML: '',
        CSS: '',
        JS: '',
      });
      setLocalState({
        showLevels: false,
        problemStatementOpen: false,
        livePreviewOpen: false,
        successModalOpen: false,
      });
      setSecondaryActiveTab('livePreview');

      const questionSetup = getCurrentQuestionSetup(webkataQuestionState);
      updateCodeEditor(questionSetup);

      // delete refs which are not needed
      Object.keys(codeEditorsRefs.current).forEach((concept) => {
        const currentFiles = memorizedWebkataQuestionState.questionObject.questionSetup.files;

        if (!(concept in currentFiles)) {
          delete codeEditorsRefs[concept];
        }
      });
    }
  }, [questionObject]);

  useEffect(() => {
    if (evaluationDetails && passed) {
      setLocalState((prev) => ({ ...prev, successModalOpen: true }));
    } else if (evaluationDetails && !passed) {
      setLocalState((prev) => ({ ...prev, livePreviewOpen: true }));
      setSecondaryActiveTab('validatedResult');
    }
  }, [webkataSubmitState]);

  useEffect(() => {
    if (localState.livePreviewOpen) {
      setLocalState((prev) => ({ ...prev, problemStatementOpen: false }));
    }
  }, [localState.livePreviewOpen]);

  useEffect(() => {
    if (localState.problemStatementOpen) {
      setLocalState((prev) => ({ ...prev, livePreviewOpen: false }));
    }
  }, [localState.problemStatementOpen]);

  useEffect(() => {
    if (localState.showLevels) {
      setLocalState((prev) => ({ ...prev, livePreviewOpen: false, problemStatementOpen: false }));
    }

    const closeLevelPage = () => {
      closeLevels();
      return localState.showLevels;
    };

    BackHandler.addEventListener('hardwareBackPress', closeLevelPage);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', closeLevelPage);
    };
  }, [localState.showLevels]);

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
          <View style={{
            flex: 1,
            position: 'relative',
          }}>
            {
              questionObject
              && <CodeEditorsTab.Navigator
                initialLayout={{
                  width: Dimensions.get('window').width,
                }}
                screenOptions={{
                  lazy: false,
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
                          onload={onCodeEditorLoad}
                          styleStringForDocumentInsideWebView={styleStringForDocumentInsideWebView}
                          onCodeEditorChanged={
                            debounce1((code) => onCodeEditorChange(name, code), 500)
                          }
                        />}
                      </CodeEditorsTab.Screen>;
                    })
                }
              </CodeEditorsTab.Navigator>
            }
            <View style={[style.containerWithRevealerBtn, {
              height: orientation === 'PORTRAIT' ? Dimensions.get('window').height - 130 : Dimensions.get('window').height - 105,
              transform:
                [{ translateX: livePreviewOpen ? 0 : Dimensions.get('window').width - 50 }],
              zIndex: livePreviewOpen ? 1 : undefined,
            }]}>
              <RevealerButton
                style={style}
                revealed={livePreviewOpen}
                toggleReveal={() => {
                  setLocalState((prev) => ({
                    ...prev,
                    livePreviewOpen: !prev.livePreviewOpen,
                  }));
                }}
              />
              <View style={style.container}>
                <SecondaryTabBar
                  style={style}
                  activeTab={secondaryActiveTab}
                  changeTab={(tabToSet) => {
                    setSecondaryActiveTab(tabToSet);
                  }}
                />
                <LivePreview
                  visible={secondaryActiveTab === 'livePreview'}
                  style={style}
                  livePreviewWebViewRef={livePreviewWebViewRef}
                  codeState={codeState}
                  onMessageFromLivePreviewWebView={onMessageFromLivePreviewWebView}
                />
                <ValidatedResult
                  visible={secondaryActiveTab === 'validatedResult'}
                  style={style}
                  onRunBtnPress={onRunBtnPress}
                  evaluationDetails={evaluationDetails}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity style={style.runBtn} onPress={onRunBtnPress}>
            <Text style={[style.runBtnText, style.textColor2]}>
              <FormattedMessage defaultMessage={'Run'} description='run button text' />
            </Text>
            <Icon
              name='play'
              type='FontAwesome'
              size={font.subtitleBold.fontSize}
              color={style.textColor2.color}
            />
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </View>
    <WebkataGameLevelComponent
      showLevels={localState.showLevels}
      closeLevels={closeLevels}
      webkataState={memorizedWebkataQuestionState}
      onLevelButtonPress={onLevelBtnPress}
      font={font}
      theme={theme}
      themeKey={'screenWebkataMain'}
      utilColors={theme.utilColors}
      gradients={theme.gradients}
    />
    <WebkataSuccessModal
      visible={localState.successModalOpen}
      closeModal={() => setLocalState((prev) => ({ ...prev, successModalOpen: false }))}
      modalBodyText={pointsDetails?.submissionStatus?.replace('{{name}}', profileDetails.name)}
      getNextQuestion={() => fetchWebkataQuestion(conceptId, id + 1)}
    />
  </>;
};

export default WebkataMain;
