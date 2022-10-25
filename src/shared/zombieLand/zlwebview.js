import React from 'react';
import { zlGameFunctions } from './zlFunctions';
import { getGameFunctionsMob } from './gameFunctions';

const useSharedZLWebView = () => {
  const ZlEditorBodyContent = () => <>
    <a className="toolboxCollapse collapsed" data-toggle="collapse" href="#zl-toolbox" aria-expanded="false" aria-controls="zl-toolbox">
      <div className="d-flex justify-content-between align-items-center">
        <p>Add a Block</p>
        <i className="fa fa-angle-down" aria-hidden="true"></i>
      </div>
    </a>
    <div className="collapse" id="zl-toolbox">
      <div className="zombieLand-toolbox">
        <div className="statement-container">
          <div className="commandBlocks">
            <div className="code-blk popup" draggable="true" data-id="for_loop">
              <p className="loop">
                <span className="tokens">
                  <span className="ellipsis-span">
                    <i className="fa fa-ellipsis-v"></i>
                    <i className="fa fa-ellipsis-v"></i>
                  </span>
                  for
                </span> <span className="expression">
                  i
                </span> <span className='tokens'>
                  in
                </span> <span className="expression">
                  range
                </span>
                {'('}
                <input className="blockInput" type='number' placeholder="int" />
                {'):'}
              </p>
            </div>
            <div className="code-blk object move" draggable="true" data-id="sleep()">
              <p>
                <span className="ellipsis-span">
                    <i className="fa fa-ellipsis-v"></i>
                    <i className="fa fa-ellipsis-v"></i>
                  </span>
                <span className="expression functions">
                  sleep
                </span>()
              </p>
            </div>
            <div className="d-block">
              <div className="code-blk object move" draggable="true" data-id="moveUp()">
                <p>
                  <span className="ellipsis-span">
                    <i className="fa fa-ellipsis-v"></i>
                    <i className="fa fa-ellipsis-v"></i>
                  </span>
                  <span className="expression functions">
                    moveUp
                  </span>()
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-around w-100">
              <div className="code-blk object move" draggable="true" data-id="moveLeft()">
                <p>
                  <span className="ellipsis-span">
                    <i className="fa fa-ellipsis-v"></i>
                    <i className="fa fa-ellipsis-v"></i>
                  </span>
                  <span className="expression functions">
                    moveLeft
                  </span>()
                </p>
              </div>
              <div className="code-blk object move" draggable="true" data-id="moveDown()">
                <p>
                  <span className="ellipsis-span">
                    <i className="fa fa-ellipsis-v"></i>
                    <i className="fa fa-ellipsis-v"></i>
                  </span>
                  <span className="expression functions">
                    moveDown
                  </span>()
                </p>
              </div>
              <div className="code-blk object move" draggable="true" data-id="moveRight()">
                <p>
                  <span className="ellipsis-span">
                    <i className="fa fa-ellipsis-v"></i>
                    <i className="fa fa-ellipsis-v"></i>
                  </span>
                  <span className="expression functions">
                    moveRight
                  </span>()
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="playground">
    </div>
    <div className="w-100 dustbin-mob d-flex justify-content-end pr-2 pb-2">
      <img
        src="https://raw.githubusercontent.com/ABIBV/rn-assets/main/assets/delete-24px.svg"
        className='dustbin'
        alt="Dustbin"
        width='80px'
        height='80px'/>
    </div>
  </>;

  const ZlOutputBodyContent = () => <>
    <div id="outputContainer" className="sectionContent outputContainer d-flex">
      <div id="userCanvas">
      </div>
    </div>
  </>;

  const ZLEditorScriptContent = () => <>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/css2?family=Averia+Sans+Libre:wght@400;700&display=swap" rel="stylesheet"></link>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/js/bootstrap.bundle.min.js"></script>
    {/* <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="></script> */}
    <script src="https://unpkg.com/jquery-ui.1.11.1@1.11.1/dist/jquery-ui.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js" ></script>
  </>;

  const ZlOutputScriptContent = () => <>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/3.12.0/phaser.min.js" integrity="sha512-jOq6014inFHm8j/yiw5aX4QaI8sp7crdJylw22Uj+NKFpcNbi6IL06iua0Cxa5uMEi0/T5HFKjxn3I7mbR+LHQ==" crossOrigin="anonymous" referrerPolicy="no-referrer"></script> */}
    <script src="https://unpkg.com/phaser@3.55.2/dist/phaser.min.js"></script>
    {/* <script src="https://unpkg.com/phaser@3.55.2/dist/phaser-arcade-physics.min.js"></script> */}
    {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.10.4/polyfill.min.js"></script> */}
    {/* <script src="https://cdn.jsdelivr.net/npm/regenerator-runtime@0.13.10/runtime.min.js"></script> */}
    {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/3.12.0/phaser-core.min.js"></script> */}
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </>;

  const zlEditorScriptToInject = `
   try {

    const postMsg = ({ action, data }) => {
      const msg = {
        action,
        data,
      };
      window.ReactNativeWebView.postMessage(JSON.stringify(msg));
    };

    const popupBox = (msg) => {
      postMsg({
        action: 'popupBox',
        data: {
          message: msg,
        },
      });
    };

    ${zlGameFunctions.toString()}

    const { GameZlObj } = zlGameFunctions({}, $);

    GameZlObj.handleBlockClick = (e) => {
      if (GameZlObj.manager.lineCount < 13) {
        const elem = e.currentTarget.outerHTML;
        $('#playground').append(elem);
        GameZlObj.updateBlocks();
        GameZlObj.manager.lineCount += 1;
        $('#playground .edit-span .edit').on('click', GameZlObj.removeBlock);
        setTimeout(GameZlObj.fetchData, 300);
      } else {
        GameZlObj.manager.popupBox('You have reached maximum bock limit !');
      }
    };

    GameZlObj.updateBlocks = () => {
      $('#playground .object').draggable({
        helper: 'clone',
        containment: 'document',
        revert: 'invalid',
      });
  
      $('#playground .popup').draggable({
        helper: 'clone',
        containment: 'document',
        revert: 'invalid',
      });
  
      $('.nest').draggable({
        helper: 'clone',
        containment: 'document',
        revert: 'invalid',
      });
  
      $('#playground .nest').droppable({
        helper: 'clone',
        accept: '.popup',
        greedy: true,
        drop(event, ui) {
          $(ui.draggable).addClass('insidePopup');
          ui.draggable.appendTo($(this));
        },
      });

      $('#playground .popup').droppable({
        activeClass: 'ui-state-default',
        helper: 'clone',
        accept: '.object',
        greedy: true,
        drop(event, ui) {
          $(ui.draggable).addClass('insidePopup');
          ui.draggable.appendTo($(this));
          setTimeout(GameZlObj.fetchData, 300);
        },
      });
  
      $('#playground').droppable({
        helper: 'clone',
        greedy: true,
        drop(event, ui) {
          ui.draggable.appendTo($(this));
          $(ui.draggable).removeClass('insidePopup');
          setTimeout(GameZlObj.fetchData, 300);
        },
      });
  
      $('.dustbin').droppable({
        helper: 'clone',
        greedy: true,
        drop(event, ui) {
          ui.draggable[0].remove();
          setTimeout(GameZlObj.fetchData, 300);
        },
      });
    };

    GameZlObj.handleLoopBlocks = (e) => {
      GameZlObj.handleBlockClick(e);
    };

    GameZlObj.parseCode = (code) => {
      try {
        const funData = ['moveRight()', 'moveLeft()', 'moveUp()', 'moveDown()', 'moveRight();', 'moveLeft();', 'moveUp();', 'moveDown();', 'sleep()'];
        const str = code.split('\\n');
        let finalData = '';
        str.forEach((key) => {
          if ($.inArray(key, funData) >= 0) {
            finalData += key + "\\n";
            finalData += "await gameDelay(300); \\n";
          } else {
            finalData += key + "\\n";
          }
        });
        postMsg({
          action: 'codeChanged',
          data: {
            snippet: finalData,
          },
        });
      } catch (error) {
        postMsg({
          action: 'error',
          data: {
            message: err.message,
            sourse: 'GameZlObj parsecode overwritten',
          },
        });
      }
    };

    function startGame (payload) {
      try {
        const { data } = payload;
        const {
          zlState, endGame = () => {},
        } = data;
        GameZlObj.setGameState(zlState.questionObject, 'mobile', popupBox);
        GameZlObj.renderPreBlocks(zlState);
        GameZlObj.attachListeners();
        GameZlObj.updateBlocks();
      } catch (err) {
        postMsg({
          action: 'error',
          data: {
            message: err.message,
            sourse: 'startGame editor',
          },
        });
      }
    }

    window.execute = function (payload) {
      switch (payload.action) {
        case 'startGame':
          startGame(payload);
          break;
        default: break;
      };
    };

   } catch (err) {
    const errmsg = {
      action: 'error',
      data: {
        origin: 'parent try',
        error: err,
        message: err.message,
      },
    };
    window.ReactNativeWebView.postMessage(JSON.stringify(errmsg));
   }
  `;

  const zlOutputScriptToInject = `
    try {

      let clearState = 0;
      const playerBounds = () => {};
      let stageDataID = 'Scene_1';
      let gameEngineState = false;
      let winType = false;

      const postMsg = ({ action, data }) => {
        const msg = {
          action,
          data,
        };
        window.ReactNativeWebView.postMessage(JSON.stringify(msg));
      };

      const popupBox = (msg) => {
        postMsg({
          action: 'popupBox',
          data: {
            message: msg,
          },
        });
      };

      function checkCanvas() {

        // canvasElem = document.createElement('canvas');
        canvasElem = document.querySelector('#userCanvas canvas');

        isSupported = !!canvasElem.getContext('2d');

        return isSupported;
      }

      ${getGameFunctionsMob.toString()}
      
      const { GameObj } = getGameFunctions({});

      function initGame(payload) {
        try {
          const { data } = payload;
          const {
            parentElement, canvasElement, qnObj,
          } = data;

          GameObj.initGame(Phaser, parentElement, canvasElement, qnObj, popupBox);
        } catch (err) {
          postMsg({
            action: 'error',
            data: {
              origin: 'initGame zlOutput',
              error: err,
              message: err.message,
            },
          });
        }
      }

      function executeRunCode(payload) {
        try {
          const { data } = payload;
          if (data.snippet){
            GameObj.executeCode(data.snippet);
          } else {
            postMsg({
              action: 'error',
              data: {
                origin: 'executeRunCode zlOutput',
                error: 'CODE_NOT_FOUND',
                message: 'No code snippet found',
              },
            });
          }
        } catch (err) {
          postMsg({
            action: 'error',
            data: {
              origin: 'executeRunCode zlOutput',
              error: err,
              message: err.message,
            },
          });
        }
      }

      window.execute = function (payload) {
        switch (payload.action) {
          case 'renderGame':
            initGame(payload);
            break;
          case 'runCode':
            executeRunCode(payload);
            break;
          default: break;
        }
      }

    } catch (err) {
      const errmsg = {
        action: 'error',
        data: {
          origin: 'zloutput parent try',
          error: err,
          message: err.message,
        },
      };
      window.ReactNativeWebView.postMessage(JSON.stringify(errmsg));
    }

    window.gameFunction = function () {
      try {
        const postMsg = ({ action, data }) => {
          const msg = {
            action,
            data,
          };
          window.ReactNativeWebView.postMessage(JSON.stringify(msg));
        };
        ${getGameFunctionsMob.toString()}
      } catch (err) {
        const errmsg = {
          action: 'error',
          data: {
            origin: 'zloutput gameFunction try',
            error: err,
            message: err.message,
          },
        };
        window.ReactNativeWebView.postMessage(JSON.stringify(errmsg));
      }
    }
  `;

  const zlEditorStyle = `
    <style>
      .toolboxCollapse {
        width: 100%;
        color: white;
        font-weight: bold;
        text-decoration: none;
        background-color: black;
      }

      .toolboxCollapse:hover {
        text-decoration: none;
      }

      .toolboxCollapse .d-flex {
        background-color: black;
        padding: 1rem;
        color: white;
      }

      .toolboxCollapse .d-flex p {
        margin: 0;
        font-family: 'Averia Sans Libre', cursive;
        font-weight: 700;
      }

      .toolboxCollapse .d-flex i {
        font-size: 1.75rem;
        font-weight: 700;
      }

      .toolboxCollapse.collapsed i::before {
        content: '\\f107';
      }

      #zl-toolbox .zombieLand-toolbox .statement-container .commandBlocks {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        background-color: black;
        padding: 0.75rem 0;
      }

      #zl-toolbox .zombieLand-toolbox .statement-container .commandBlocks .code-blk {
        display: inline-block;
        background-color: #0066AF;
        border-radius: 12px;
        border: 2px solid #004576;
        box-shadow: 2px 4px 0 #004576;
        padding: 0.5rem;
        text-align: center;
        margin: 0.5rem 0.25rem;
      }

      #zl-toolbox .zombieLand-toolbox .statement-container .commandBlocks .d-flex .code-blk {
        margin: 0.5rem 0;
      }

      #zl-toolbox .zombieLand-toolbox .statement-container .commandBlocks .code-blk .ellipsis-span {
        display: none;
      }

      #zl-toolbox .zombieLand-toolbox .statement-container .commandBlocks .code-blk p {
        margin-bottom: 0;
        color: white;
        font-size: 18px;
      }

      #zl-toolbox .zombieLand-toolbox .statement-container .commandBlocks .code-blk:hover {
        cursor: pointer;
        transform: translate(2px, 4px);
        box-shadow: unset;
      }

      #zl-toolbox .zombieLand-toolbox .statement-container .commandBlocks .code-blk.popup .blockInput,
      #zl-toolbox .zombieLand-toolbox .statement-container .commandBlocks .blockInput {
        width: 2rem;
        background-color: transparent;
        outline: none;
        border: none;
        color: white;
      }

      #zl-toolbox .zombieLand-toolbox .statement-container .commandBlocks .d-block {
        width: 100%;
        text-align: center;
      }

      #zl-toolbox .zombieLand-toolbox .statement-container .commandBlocks .d-block .code-blk {
        margin-top: 1.25rem;
      }

      #playground {
        height: calc(100% - 57px);
        width: 100%;
        padding: 1rem;
        background-color: #212527;
        overflow: auto;
      }

      #playground .code-blk input {
        width: 3rem;
      }

      #playground .object,
      #playground .popup {
        margin: 0 1.5rem;
        border-radius: 0.25rem;
      }

      #playground .object .ellipsis-span,
      #playground .popup .ellipsis-span {
        display: inline;
        margin-right: 0.5rem;
      }

      #playground .object p,
      #playground .popup p {
        color: white;
      }

      #playground .object p .edit-span,
      #playground .popup p .edit-span {
        display: none;
      }

      #playground .object:hover .edit-span,
      #playground .popup:hover .edit-span {
        display: inline;
      }

      #playground .object .blockInput,
      #playground .popup . blockInput {
        width: 3rem;
        background-color: transparent;
        color: white;
        position: relative;
        z-index: 10;
      }

      #playground .object.ui-state-default,
      #playground .popup.ui-state-default {
        border: 1px solid orange;
        padding: 0.5rem;
      }

      .dustbin-mob {
        position: fixed;
        bottom: 0;
      }

      .dustbin-mob .dustbin {
        border-radius: 100%;
        // background-color: lightgreen;
      }

      .dustbin-mob .dustbin:hover {
        background-color: pink;
      }

      .dustbin-mob .dustbin.ui-droppable-hover {
        border-radius: 100%;
        background-color: indianred;
      }
    </style>
  `;

  const zlOutputStyle = `
    <style>
      * {
        margin: 0 !important;
        padding: 0 !important;
        border: none;
        box-sizing: border-box;
      }

      body {
        border: none;
        width: 100vw;
        height: 100vh;
        margin: 0;
      }

      .outputContainer {
        height: 100%;
        width: 100%;
        position: relative;
        overflow: auto;
      }

      #userCanvas {
        width: 100%;
        height: 100%;
        position: absolute;
      }
    </style>
  `;

  return {
    zlEditor: {
      BodyContent: ZlEditorBodyContent,
      ScriptContent: ZLEditorScriptContent,
      scriptToInject: zlEditorScriptToInject,
      styleString: zlEditorStyle,
    },
    zlOutput: {
      BodyContent: ZlOutputBodyContent,
      ScriptContent: ZlOutputScriptContent,
      scriptToInject: zlOutputScriptToInject,
      styleString: zlOutputStyle,
    },
  };
};

export default null;

export {
  useSharedZLWebView,
};
