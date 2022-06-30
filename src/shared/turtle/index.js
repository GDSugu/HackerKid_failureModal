import React from 'react';
import { getBlockly, getTurtleOutput } from './turtleBlocks';
import { getTurtleOutput as getTurtleOutput1 } from './turtleBlocks1';

const useSharedTurtleWebView = () => {
  const TurtleBodyContent = () => <>
    <div id='turtleBlock'></div>
  </>;

  const TurtleScriptContent = () => <>
    <script src="https://unpkg.com/blockly@3.20200625.2/blockly.min.js"></script>
    <script src="https://unpkg.com/blockly@3.20200625.2/python_compressed.js"></script>
    <script src="https://unpkg.com/blockly@3.20200625.2/msg/en"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossOrigin="anonymous"></script>
  </>;

  const turtleScriptToInject = `
    const manager = {
      windowType: 'desktop',
      canvasScale: 1.0,
      drawingVisible: true,
      debuggingEnabled: false,
      inDebugging: false,
      suspension: false,
    };

    try {
      window.sendMessage = (message = { type: '' }) => {
        try {
          window.ReactNativeWebView.postMessage(JSON.stringify(message));
        }
        catch (err) {
          window.ReactNativeWebView.postMessage('blockinit msg send: ' + err);
        }
      };
      // window.ReactNativeWebView.postMessage('blockinit msg send: start');
      ${getBlockly.toString()}
      // window.ReactNativeWebView.postMessage('blockinit msg send: imported');
      const { BlocklyObj, TurtleObj } = getBlockly({ blocklyObj: Blockly });
      // window.ReactNativeWebView.postMessage('blockinit msg send: success');
      Blockly = BlocklyObj;
      window.Turtle = TurtleObj;
      window.sendMessage({ type: 'blockinit', status: 'success' });
    } catch (err) {
      const msg = {
        type: 'error',
        caller: 'global',
        payload: {
          error: err,
        },
      };
      // manager.sendMessage(msg);
      window.ReactNativeWebView.postMessage('blockinit error: ' + err);
    }
    const msg = {
      type: 'initialized',
      caller: 'global',
      payload: {
        message: 'blockly initialized',
      },
    };
    window.sendMessage(msg);
    // window.ReactNativeWebView.postMessage('blockly initialized ');
    true;
  `;

  const webViewStyle = `
    #editor {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 0;
      margin: 0;
    }
  `;

  const EditorBodyContent = () => <>
    <div id="editor"></div>
  </>;

  const EditorScriptContent = () => <>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossOrigin="anonymous"></script>
    <script src="https://unpkg.com/ace-builds@1.4.8/src-min-noconflict/ace.js" type="text/javascript"></script>
  </>;

  const editorScriptToInject = `
    editor = ace.edit('editor');
    editor.setOption('wrap', true);
    editor.on('change',function(){
      window.ReactNativeWebView.postMessage(editor.getValue());
    });`;

  const TurtleOutputBodyContent = () => <>
    <div className="sectionContent outputContainer mx-2">
      <div id="userCanvas"></div>
      <div id="answerCanvas"></div>
    </div>
  </>;

  const TurtleOutputScriptContent = () => <>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossOrigin="anonymous"></script>
    <script src="https://unpkg.com/blockly@3.20200625.2/blockly.min.js"></script>
    <script src="https://unpkg.com/blockly@3.20200625.2/python_compressed.js"></script>
    <script src="https://unpkg.com/blockly@3.20200625.2/msg/en"></script>
    <script src='https://unpkg.com/skulpt-custom@1.0.3/dist/skulpt.min.js'></script>
    <script src="https://unpkg.com/skulpt-custom@1.0.4/dist/skulpt-stdlib.js"></script>
    <script src='https://unpkg.com/workerpool@6.0.3/dist/workerpool.min.js' type='text/javascript' ></script>
    {/* <script src='https://unpkg.com/crypto-js@4.0.0' type='text/javascript' ></script> */}
  </>;

  const turtleOutputStyle = `
    <style>
      .outputContainer {
        overflow: auto;
        height: 1500px;
      }

      #userCanvas {
        width: 100%;
        transform: scale(7);
        // background-color: red;
      }

      #answerCanvas {
        // margin-right: -100%;
        width: 100%;
        opacity: 0.5;
        transform: scale(7) translate(-25%, 0);
        // background-color: lightblue;
      }

      body {
        // background-color: blue;
      }
    </style>
  `;

  // const turtleOutputScriptToInject = `
  //   try {
  //     const pool = workerpool.pool();
  //     // window.ReactNativeWebView.postMessage('script inject sk');
  //     // window.ReactNativeWebView.postMessage(Object.keys(window.Sk).toString());
  //     ${getTurtleOutput.toString()}
  //     const {
  //       managerObj, poolObj,
  //     } = getTurtleOutput({
  //       blocklyObj: window.Blockly,
  //       poolObj: pool,
  //     });

  //     // Sk = SkObj;
  //     // window.SkObj = SkObj;
  //     window.Turtle = managerObj;
  //     window.SkObj = Sk;
  //     // window.ReactNativeWebView.postMessage('script inject sk');
  //     // window.ReactNativeWebView.postMessage(Object.keys(window.Sk).toString());
  //   } catch (err) {
  //     window.ReactNativeWebView.postMessage('turtleoutput error: ' + err);
  //   }
  // `;

  const turtleOutputScriptToInject = `
    try {
      const manager = {
        windowType: 'desktop',
        canvasScale: 1.0,
        drawingVisible: true,
        debuggingEnabled: false,
        inDebugging: false,
        suspension: false,
      };

      window.ReactNativeWebView.postMessage('poolobj initiating');
      const pool = workerpool.pool();
      window.ReactNativeWebView.postMessage('poolobj initiated');
  
      window.ReactNativeWebView.postMessage('script inject sk execution');

      ${getTurtleOutput.toString()}

      const { managerObj, poolObj } = getTurtleOutput({ blocklyObj: Blockly, turtleOutputObj: manager, workerPoolObj: pool });

      function executeRunCode (data) {
        try {
          window.ReactNativeWebView.postMessage(Object.entries(data).toString());
          managerObj.runCode(data.snippet, 'answerCanvas', true, 3, 0)
            .then(() => {
              const currentSelector = $('#answerCanvas')[0];
              if (currentSelector && currentSelector.turtleInstance) {
                currentSelector.turtleInstance.update();
              }
            });
        } catch (err) {
          window.ReactNativeWebView.postMessage('turtleoutput execute error: ');
          window.ReactNativeWebView.postMessage(err.message);
        }
      }

      window.execute = (payload) => {
        // window.ReactNativeWebView.postMessage('execute payload: ');
        // window.ReactNativeWebView.postMessage(Object.entries(payload).toString());
        switch (payload.action) {
          case 'runCode':
            window.ReactNativeWebView.postMessage('execute runcode: '); 
            executeRunCode(payload.data);
            break;
          default: break;
        }
      };
    } catch (err) {
      window.ReactNativeWebView.postMessage('turtleoutput error: ');
      window.ReactNativeWebView.postMessage(err.message);
    }
  `;

  return {
    blocklyWorkspace: {
      BodyContent: TurtleBodyContent,
      ScriptContent: TurtleScriptContent,
      scriptToInject: turtleScriptToInject,
      styleString: webViewStyle,
    },
    codeEditor: {
      BodyContent: EditorBodyContent,
      ScriptContent: EditorScriptContent,
      scriptToInject: editorScriptToInject,
      styleString: webViewStyle,
    },
    turtleOutput: {
      BodyContent: TurtleOutputBodyContent,
      ScriptContent: TurtleOutputScriptContent,
      scriptToInject: turtleOutputScriptToInject,
      styleString: turtleOutputStyle,
    },
  };
};

export default null;

export { useSharedTurtleWebView };
