import ace from 'ace-builds';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-min-noconflict/ext-language_tools';

// functions without DOM interactions
const manager = {
  currentEditorInstances: {},
};

const getQuestionSetup = (getSetupFor) => {
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
            editorInstance: false,
          },

          '/index.css': {
            code: '',
            name: 'CSS',
            editorInstance: false,
          },
          '/index.js': {
            code: '',
            name: 'JavaScript',
            editorInstance: false,
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

const getCurrentEditorInstances = () => ({ ...manager.currentEditorInstances });

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

const evaluateTest = (expression, runTestsOnSelector) => {
  let result = '';
  try {
    const testExpression = expression.replace(/{{frameWindow}}/g, `document.querySelector('${runTestsOnSelector}').contentWindow`);
    // eslint-disable-next-line no-new-func
    result = Function('document', `return ${testExpression}`)(document);
  } catch (error) {
    console.error(error);
  }
  return result;
};

const runUnitTests = (unitTests, runTestsOnSelector) => {
  const testOutput = [];
  try {
    unitTests.map((eachTest, eachKey) => {
      const evaluatedResult = evaluateTest(eachTest.testExpression, runTestsOnSelector);
      testOutput[eachKey] = evaluatedResult;
      return true;
    });
  } catch (error) {
    console.log(error);
  }
  return testOutput;
};

const initializeCodeEditors = (editorInstances) => {
  if (!editorInstances) return;

  try {
    Object.keys(editorInstances).forEach((conceptId) => {
      const {
        editorInstance,
        code: initialCode,
        mode,
        restrictEdit,
      } = editorInstances[conceptId];

      editorInstance.setValue(initialCode);
      editorInstance.setOption('mode', `ace/mode/${mode}`);
      editorInstance.setOption('readOnly', restrictEdit);
    });
  } catch (e) {
    console.error(e);
  }
};

// functions with DOM interactions
const updateLivePreview = (livePreviewElement,
  editorInstances = manager.currentEditorInstances) => {
  try {
    const codesArr = [];

    Object.keys(editorInstances).forEach((conceptId) => {
      const { editorInstance } = editorInstances[conceptId];
      const code = editorInstance.getValue();
      const formattedCode = formatCode(conceptId, code);

      codesArr.push(formattedCode);
    });

    const docObj = livePreviewElement.contentWindow.document;
    docObj.open();
    // first reset the iFrame
    docObj.write('');
    // then add new changes
    docObj.write(codesArr.join(''));
    docObj.close();
  } catch (e) {
    console.error(e);
  }
};

const initializeWebkata = (selectedTemplate, questionSetup, livePreviewElement) => {
  try {
    let currentQuestionSetup = {};
    if (!questionSetup) {
      currentQuestionSetup = getQuestionSetup(selectedTemplate);
    } else {
      currentQuestionSetup = questionSetup;
    }

    if (selectedTemplate === 'static') {
      const { files } = currentQuestionSetup;
      const currentEditorInstances = {};
      // initialize editors
      Object.keys(files).forEach((filePath) => {
        const { name: conceptId } = files[filePath];
        const editorId = `${conceptId.toLowerCase()}-editor`;

        currentEditorInstances[conceptId] = { ...files[filePath] };
        currentEditorInstances[conceptId].filePath = filePath;
        currentEditorInstances[conceptId].mode = getModeFromConceptId(conceptId);
        currentEditorInstances[conceptId].editorInstance = ace.edit(editorId);
      });

      manager.currentEditorInstances = currentEditorInstances;

      initializeCodeEditors(manager.currentEditorInstances);
      updateLivePreview(livePreviewElement, manager.currentEditorInstances);
    }
  } catch (error) {
    console.log(error);
  }
};

const updateHistory = (response) => {
  if (!response.status) return;
  try {
    const { uniqueString, virtualId, conceptId } = response.questionObject;
    window.history.replaceState({}, '', `/webkata/${conceptId.toLowerCase()}/${virtualId}/${uniqueString}`);
  } catch (error) {
    console.log(response);
    console.log(error);
  }
};

const resizeHandler = (nav = 'nav', selector, unit = 'vh') => {
  try {
    const navHeight = document.querySelector(nav).offsetHeight;
    document.querySelector(selector).style.height = `calc(100${unit} - ${navHeight}px)`;
  } catch (e) {
    console.log(e);
  }
};

const resizeEditor = () => {
  try {
    const containerElement = document.querySelector('.webkata-game-container');
    const questionElement = document.querySelector('.question') ? document.querySelector('.question') : document.querySelector('.mobile-question-container');

    const containerStyles = getComputedStyle(containerElement);
    const padding = parseInt(containerStyles.paddingTop, 10)
      + parseInt(containerStyles.paddingBottom, 10);

    const containerHeight = containerElement.offsetHeight;
    const questionHeight = questionElement.offsetHeight;

    document.querySelector('.editor-with-live-preview').style.height = `${containerHeight - questionHeight - padding - 8}px`;
  } catch (e) {
    console.error(e);
  }
};

const hideDefaultNavBar = (device, turtleState) => {
  document.querySelector('nav:first-child').style.display = 'none';
  let componentContainer = `.webkata-${turtleState}-container`;
  if (device === 'desktop') {
    componentContainer = `.webkata-${turtleState}-container`;
  } else if (device === 'mobile') {
    componentContainer = `.webkata-mob-${turtleState}-container`;
  }
  window.addEventListener('resize', () => resizeHandler('nav.turtle-navbar', componentContainer));
  setTimeout(() => {
    resizeHandler('nav.turtle-navbar', componentContainer);
  }, 300);
};

export default null;
export {
  initializeWebkata,
  updateLivePreview,
  runUnitTests,
  getCurrentEditorInstances,
  updateHistory,
  resizeEditor,
  resizeHandler,
  hideDefaultNavBar,
  getModeFromConceptId,
  formatCode,
  getQuestionSetup,
};
