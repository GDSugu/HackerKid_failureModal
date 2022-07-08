import React from 'react';
import { getBlockly, getTurtleOutput } from './turtleBlocks';

const useSharedTurtleWebView = () => {
  const TurtleBodyContent = () => <>
    <div id='turtleBlock'></div>
  </>;

  const TurtleScriptContent = () => <>
    {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossOrigin="anonymous"></link> */}
    {/* <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.min.js" integrity="sha384-VHvPCCyXqtD5DqJeNxl2dtTyhF78xXNXdkwX1CZeRusQfRKp+tA7hAShOK/B/fQ2" crossOrigin="anonymous"></script> */}
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
      ${getBlockly.toString()}
      const { BlocklyObj, TurtleObj } = getBlockly({ blocklyObj: Blockly });
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
  <div id="outputSection">
    <div className="flex-column drawing-controls align-items-end mr-3">
      <button className="btn btn-light mt-1 zoom-control zoomIn font-weight-bold" data-zoomaction="in" title="Zoom In" disabled>+</button>
      <button className="btn btn-light mt-1 zoom-control zoomOut font-weight-bold" data-zoomaction="out" title="Zoom Out" disabled>-</button>
      <button className="btn btn-light mt-1 repositionDrawing" title="Center">
        <i className="fa fa-crosshairs"></i>
      </button>
      <button className="btn btn-light mt-1 drawingToggle" title="Hide output">
        <i className="fas fa-eye"></i>
      </button>
      <button className="btn btn-light mt-1 debugToggle" title="Enable debugger">
        <i className="fas fa-pause-circle"></i>
      </button>
    </div>
    <div className="sectionContent outputContainer mx-2">
      <div id="userCanvas"></div>
      <div id="answerCanvas"></div>
    </div>
  </div>
  </>;

  const TurtleOutputScriptContent = () => <>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/solid.css" integrity="sha384-Tv5i09RULyHKMwX0E8wJUqSOaXlyu3SQxORObAI08iUwIalMmN5L6AvlPX2LMoSE" crossOrigin="anonymous"/>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/fontawesome.css" integrity="sha384-jLKHWM3JRmfMU0A5x5AkjWkw/EYfGUAGagvnfryNV3F9VqM98XiIH7VBGVoxVSc7" crossOrigin="anonymous"/>
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
        background-color: transparent;
        display: flex;
      }

      #userCanvas {
        width: 100%;
        // transform: scale(4) translate(-25%, 0);
        background-color: transparent;
        position: absolute;
      }

      #answerCanvas {
        position: absolute;
        width: 100%;
        opacity: 0.5;
        // transform: scale(4) translate(-25%, 0);
      }

      .drawing-controls {
        display: flex;
        position: absolute;
        left: 100%;
        z-index: 100;
      }

      #outputSection {
        position: relative;
      }

      #outputSection {
        background-color: green;
      }

      .drawing-controls button {
        width: 40px;
      }

      .btn {
        display: inline-block;
        font-weight: 400;
        color: #212529;
        text-align: center;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-color: transparent;
        border: 1px solid transparent;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        line-height: 1.5;
        border-radius: 0.25rem;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
      }

      .btn-light {
        color: #212529;
        background-color: #f8f9fa;
        border-color: #f8f9fa;
      }

      .mt-1, .my-1 {
        margin-top: 0.25rem!important;
      }

      .mr-1, .mx-1 {
        margin-right: 0.25rem!important;
      }

      .btn-light.disabled, .btn-light:disabled {
        color: #212529;
        background-color: #f8f9fa;
        border-color: #f8f9fa;
      }
      .btn.disabled, .btn:disabled {
          opacity: .65;
      }
      .font-weight-bold {
          font-weight: 700!important;
      }

      body {
        transform: scale(7) translate(-25%, 0);
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

      const pool = workerpool.pool();
  
      ${getTurtleOutput.toString()}

      const { managerObj, poolObj } = getTurtleOutput({ blocklyObj: Blockly, turtleOutputObj: manager, workerPoolObj: pool });

      function executeRunCode(payload) {
        try {
          const { action, data } = payload;
          if (action === 'renderTurtle') {
            managerObj.runCode(data.snippet, data.canvas, true, 3, 0)
            .then(() => {
              const currentSelector = $('#' + data.canvas)[0];
              if (currentSelector && currentSelector.turtleInstance) {
                currentSelector.turtleInstance.update();
              }
            });
          } else if (action === 'runCode') {
            managerObj.runCode(data.snippet, data.canvas, true, 3, 0)
            .then(() => {
              const currentSelector = $('#' + data.canvas)[0];
              if (!currentSelector || !currentSelector.turtleInstance) {
                return false;
              }
              return currentSelector.turtleInstance.update();
            })
            .then(() => {
              const answerImages = managerObj.getPixelData('#answerCanvas canvas');
              const userImages = managerObj.getPixelData('#userCanvas canvas');
              return pool.exec(managerObj.validateCode, [answerImages, userImages]);
            })
            .then((valid) => {
              validated = valid;
              const request = {
                action: 'validated',
                // questionId: Number(managerObj.initialResponse.questionObject.question_id),
                // sourceCode: data.snippet,
                // xmlWorkSpace: data.workspace,
                data: {
                  validated,
                },
              };
              // let requestString = '';
              // Object.keys(request).forEach((index) => {
              //   requestString += request[index];
              // });
              // const requestHash = md5(requestString + md5(requestString).toString()).toString();
              // request.requestHash = requestString;
              // return post(request, 'turtle/', false);
              window.ReactNativeWebView.postMessage(JSON.stringify(request));
            })
            .catch((err) => {
              window.ReactNativeWebView.postMessage('turtlevalidation error: ');
              window.ReactNativeWebView.postMessage(err.message);
              throw err;
            })
          }
        } catch (err) {
          window.ReactNativeWebView.postMessage('turtleoutput execute error: ');
          window.ReactNativeWebView.postMessage(err.message);
        }
      }

      window.execute = function (payload) {
        switch (payload.action) {
          case 'renderTurtle':
            payload.data.canvas = 'answerCanvas';
            executeRunCode(payload);
            break;
          case 'runCode':
            payload.data.canvas = 'userCanvas';
            executeRunCode(payload);
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
