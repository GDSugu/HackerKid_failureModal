import React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import webViewElement from '../WebView';

const CodeEditor = ({
  codeEditorWebViewRef,
  style,
  styleStringForDocumentInsideWebView,
  id = 'editor',
  theme = 'monokai',
  onload,
  onCodeEditorChanged,
  onCodeEditorClicked,
  onCodeEditorUpdateFinish,
  showLoader = false,
  loadingFunction = () => {},
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
  }

  ${styleStringForDocumentInsideWebView}
  `;

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

      window.ReactNativeWebView.postMessage(JSON.stringify({mode, code}));
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
        onLoad={onload}
        startInLoadingState={showLoader}
        renderLoading={loadingFunction}
      />
    </View>
  );
};

export default CodeEditor;
