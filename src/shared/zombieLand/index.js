// import '@babel/polyfill';
import 'jquery-ui-bundle';
// import Phaser from 'phaser';
import '../../web/javascripts/vendors/jquery.ui.touch-punch.min';
import { $ } from '../../web/javascripts/common/framework';
import {
  initGame, resetGame, getGameStageID, executeCode, setEndGame,
} from './gameFunctions';

const zlGameFunctions = (zlObj = {}) => {
  const GameZlObj = zlObj;

  GameZlObj.manager = {
    // score: 0,
    lineCount: 0,
    questionID: false,
    stageDataID: false,
    windowType: 'desktop',
    classIDs: false,
    outIDs: false,
    data_code: false,
    sourceCodeData: false,
    popupBox: () => {},
  };

  window.manager = GameZlObj.manager;

  GameZlObj.setGameState = (questionObject, device, popupBox) => {
    // manager.score = 0;
    GameZlObj.manager.lineCount = 0;
    GameZlObj.manager.questionID = questionObject.qid;
    // manager.stageDataID = `Scene_${questionObject.stageDataID}`;
    GameZlObj.manager.windowType = device;
    GameZlObj.manager.popupBox = popupBox;
  };

  GameZlObj.renderPreBlocks = (zombielandQuestion) => {
    const elements = {
      'moveDown()': ' <div  class="object ml-3 move" draggable="true" data-id="moveDown()"><p><span class="expression functions">moveDown</span>()</p></div>',
      'moveLeft()': '<div  class="object ml-3 move" draggable="true"  data-id="moveLeft()"><p><span class="expression functions">moveLeft</span>()</p></div>',
      'moveRight()': '<div  class="object ml-3 move" draggable="true"  data-id="moveRight()"><p><span class="expression functions">moveRight</span>()</p></div>',
      'moveUp()': '<div  class="object ml-3 move" draggable="true"  data-id="moveUp()"><p><span class="expression functions">moveUp</span>()</p></div>',
      'sleep()': '<div  class="object ml-3 move" draggable="true"  data-id="sleep()"><p><span class="expression functions">sleep</span>()</p></div>',
      for_loop: '<div  class="popup ml-3" draggable="true" data-id="for_loop"><p  class="toolbar loop"><span class="tokens">for</span> <span class="expression">i</span> <span class="tokens">in</span> <span class="expression">range</span>(<input class="blockInput" placeholder="int" value="">):</p></div>',
      while: '<div  class="popup ml-3" draggable="true" data-id="while"><p  class="toolbar loop">while <input class="blockInput" placeholder="expression"> :</p></div>',
      if: '<div  class="popup ml-3" draggable="true" data-id="if"><p  class="toolbar condition">if <select class="blockInput whileExp" aria-placeholder="exp"><option value=1>True</option><option value=\'nearWall()\'>nearWall</option><option value=\'nearObstacles()\'>nearObstacles</option></select>:</p></div>',
      else: '<div  class="popup ml-3" draggable="true" data-id="else"><p  class="toolbar condition">else:</p></div>',
      elif: '<div  class="popup ml-3" draggable="true" data-id="elif"><p  class="toolbar condition">elif <select class="blockInput elifExp" aria-placeholder="exp"><option value=1>True</option><option value=\'nearWall()\'>nearWall</option><option value=\'nearObstacles()\'>nearObstacles</option></select>:</p></div>',
    };
    $('#playground').empty();
    try {
      if (GameZlObj.manager.lineCount < 18) {
        if (zombielandQuestion.questionObject.preBlocks) {
          zombielandQuestion.questionObject.preBlocks.forEach((key) => {
            $('#playground').append(elements[key]);
            GameZlObj.manager.lineCount += 1;
          });
        }

        $('.blockInput').on('click', (e) => {
          if (GameZlObj.manager.windowType === 'mobile') {
            const text = prompt('Home many times should I Do it ?', '');
            $(e.target).val(text);
          }
        });
      } else {
        GameZlObj.manager.popupBox('uh oh tooo much blocks');
      }
    } catch (error) {
      console.error('no preblocks configured', error);
    }
  };

  GameZlObj.updateBlocks = () => {
    $('#playground .object').draggable({
      helper: 'clone',
      containment: 'document',
      revert: 'invalid',
      // revert: true,
      // revertDuration: 0,
    });

    $('#playground .popup').draggable({
      helper: 'clone',
      containment: 'document',
      revert: 'invalid',
      // revert: true,
      // revertDuration: 0,
    });

    $('.nest').draggable({
      helper: 'clone',
      containment: 'document',
      revert: 'invalid',
      // revert: true,
      // revertDuration: 0,
    });

    $('#playground .nest').droppable({
      // activeClass: 'ui-state-default',
      // hoverClass: 'ui-state-hover',
      helper: 'clone',
      accept: '.popup',
      greedy: true,
      drop(event, ui) {
        $(ui.draggable).addClass('insidePopup');
        ui.draggable.appendTo($(this));
        // refillBlocks();
      },
    });

    $('#playground .popup').droppable({
      activeClass: 'ui-state-default',
      // hoverClass: 'ui-state-hover',
      helper: 'clone',
      accept: '.object',
      greedy: true,
      drop(event, ui) {
        $(ui.draggable).addClass('insidePopup');
        ui.draggable.appendTo($(this));
        // refillBlocks();
      },
    });

    $('#playground').droppable({
      helper: 'clone',
      // activeClass: 'ui-state-default',
      greedy: true,
      drop(event, ui) {
        ui.draggable.appendTo($(this));
        $(ui.draggable).removeClass('insidePopup');
        // refillBlocks();
      },
    });

    $('.dustbin').droppable({
      helper: 'clone',
      // activeClass: 'ui-state-default',
      greedy: true,
      drop(event, ui) {
        ui.draggable[0].remove();
        // $(ui.draggable).removeClass('insidePopup');
        // refillBlocks();
      },
    });
  };

  GameZlObj.removeBlock = (e) => {
    GameZlObj.manager.par = $(e.currentTarget).parent().parent().parent();
    // $(e.currentTarget)
    //   .parent()
    //   .parent()
    //   .parent()
    //   .remove();
    $(e.currentTarget).parents('.code-blk').first().remove();
    if (GameZlObj.manager.lineCount > 0) {
      GameZlObj.manager.lineCount -= 1;
    }
  };

  GameZlObj.parseCode = (code) => {
    const funData = ['moveRight()', 'moveLeft()', 'moveUp()', 'moveDown()', 'moveRight();', 'moveLeft();', 'moveUp();', 'moveDown();', 'sleep()'];
    const str = code.split('\n');
    let finalData = '';
    str.forEach((key) => {
      if ($.inArray(key, funData) >= 0) {
        finalData += `${key}\n`;
        finalData += 'await gameDelay(300);\n';
      } else {
        finalData += `${key}\n`;
      }
    });
    try {
      executeCode(finalData);
    } catch (error) {
      console.error(error);
      $('#modal.errorZLModal').modal('show');
    }
  };

  GameZlObj.convertCode = (code) => {
    try {
      let finalCode = '';
      const treeBlocks = ['for_loop'];
      const conditionalTreeBlocks = ['while'];
      Object.keys(code).forEach((key) => {
        if (treeBlocks.includes(code[key].block_id)) {
          const loopIterations = code[key].iterations;
          const blocks = code[key].block;
          finalCode += `for(var i=0;i<${loopIterations};i++){\n`;
          blocks.map((block) => {
            finalCode += `${block};\nawait gameDelay(200);\n`;
            return null;
          });
          finalCode += '}\n';
        } else if (conditionalTreeBlocks.includes(code[key].block_id)) {
          const loopConditions = code[key].iterations;
          const blocks = code[key].block;
          finalCode += `while(${loopConditions}){\n`;
          blocks.map((block) => {
            finalCode += `${block};\nawait gameDelay(200);\n`;
            return null;
          });
          finalCode += '}\n';
        } else if (code[key].block_id === 'if') {
          const loopIterations = code[key].iterations;
          const blocks = code[key].block;
          finalCode += `if(${loopIterations}){\n`;
          blocks.map((block) => {
            finalCode += `${block};\n`;
            return null;
          });
          finalCode += '}\n';
        } else if (code[key].block_id === 'else') {
          const blocks = code[key].block;
          finalCode += 'else {\n';
          blocks.map((block) => {
            finalCode += `${block};\n`;
            return null;
          });
          finalCode += '}\n';
        } else if (code[key].block_id === 'elif') {
          const loopIterations = code[key].iterations;
          const blocks = code[key].block;
          finalCode += `else if(${loopIterations}){\n`;
          blocks.map((block) => {
            finalCode += `${block};\n`;
            return null;
          });
          finalCode += '}\n';
        } else if (code[key].block_id === 'placeTube()') {
          const loopIterations = code[key].iterations;
          finalCode += `placeTube(window.${loopIterations});\n`;
        } else if (code[key].block_id === 'placeTube()') {
          const loopIterations = code[key].iterations;
          finalCode += `placeTube(window.${loopIterations});\n`;
        } else {
          const blocks = code[key].block_id;
          if (blocks === 'sleep()') {
            finalCode += 'await gameDelay(200);\n';
          } else {
            finalCode += `${blocks};\n`;
          }
        }
      });
      finalCode += '\nawait gameDelay(500);\nend();\n';
      GameZlObj.manager.sourceCodeData = finalCode;
      GameZlObj.parseCode(GameZlObj.manager.sourceCodeData);
    } catch (e) {
      console.error(e);
    }
  };

  GameZlObj.parseData = () => {
    const data = {};
    const treeBlocks = ['for_loop', 'while', 'if', 'else', 'elif', 'takeTube()', 'placeTube()'];
    const baseBlock = ['moveUp()', 'moveDown()', 'moveLeft()', 'moveRight()', 'detect_obstacles()', 'sleep()', 'assign', 'append', 'index', 'remove', 'pop', 'clear'];
    let count = 0;
    let popCount = 0;

    GameZlObj.manager.outIDs.forEach((key) => {
      const blocks = [];
      if (treeBlocks.indexOf(key) >= 0) {
        if (key === 'if') {
          const innerBlock = $(`.${GameZlObj.manager.classIDs[popCount]}`).children('div');
          let i = 0;
          while (i < innerBlock.length) {
            blocks.push(innerBlock[i].dataset.id);
            i += 1;
          }
          const loopIterations = $(`.${GameZlObj.manager.classIDs[popCount]}`).find('select');
          data[count] = { iterations: loopIterations.val(), block: blocks, block_id: key };
          popCount += 1;
        } else if (key === 'elif') {
          const innerBlock = $(`.${GameZlObj.manager.classIDs[popCount]}`).children('div');
          let i = 0;
          while (i < innerBlock.length) {
            blocks.push(innerBlock[i].dataset.id);
            i += 1;
          }
          const loopIterations = $(`.${GameZlObj.manager.classIDs[popCount]}`).find('select');
          data[count] = { iterations: loopIterations.val(), block: blocks, block_id: key };
          popCount += 1;
        } else if (key === 'while') {
          const innerBlock = $(`.${GameZlObj.manager.classIDs[popCount]}`).children('div');
          let i = 0;
          while (i < innerBlock.length) {
            blocks.push(innerBlock[i].dataset.id);
            i += 1;
          }
          const loopIterations = $(`.${GameZlObj.manager.classIDs[popCount]}`).find('select');
          data[count] = { iterations: loopIterations.val(), block: blocks, block_id: key };
          popCount += 1;
        } else if (key === 'takeTube()') {
          const parameterArr = $(`.${GameZlObj.manager.classIDs[popCount]}`).find('input').val();
          data[count] = { iterations: parameterArr, block_id: key };
          popCount += 1;
        } else if (key === 'placeTube()') {
          const parameterArr = $(`.${GameZlObj.manager.classIDs[popCount]}`).find('input').val();
          data[count] = { iterations: parameterArr, block_id: key };
          popCount += 1;
        } else {
          const innerBlock = $(`.${GameZlObj.manager.classIDs[popCount]}`).children('div');
          let i = 0;
          while (i < innerBlock.length) {
            if (innerBlock[i].dataset.id === 'placeTube()' || innerBlock[i].dataset.id === 'takeTube()') {
              let block = innerBlock[i].dataset.id;
              innerBlock[i].className = `tube${i}${count}`;
              const parameterArr = $(`.${innerBlock[i].className}`).find('input');
              block = block.substring(0, block.length - 1);
              blocks.push(`${block + parameterArr.val()})`);
              i += 1;
            } else if (innerBlock[i].dataset.id === 'assign') {
              const loopIterations = $(`.${GameZlObj.manager.classIDs[popCount]}`).find('input');
              const dataVar = loopIterations[0].value;
              if ((dataVar.includes('beaker') || dataVar.includes('injection')) && (getGameStageID() === 'Scene_11' || getGameStageID() === 'Scene_14' || getGameStageID() === 'Scene_15')) {
                const str = `window.${loopIterations[0].value}=window.${loopIterations[1].value}`;
                blocks.push(str);
                i += 1;
              }
            } else if (innerBlock[i].dataset.id === 'append') {
              const loopIterations = $(`.${GameZlObj.manager.classIDs[popCount]}`).find('input');
              const dataVar = loopIterations[1].value;
              if ((dataVar.includes('pocket') && getGameStageID() === 'Scene_12') || (dataVar.includes('zombie') && getGameStageID() === 'Scene_15')) {
                const str = `window.${dataVar}.push(window.${loopIterations[2].value})`;
                blocks.push(str);
                i += 1;
              } else {
                const str = `${loopIterations[1].value}.push(${loopIterations[2].value})`;
                blocks.push(str);
                i += 1;
              }
            } else {
              blocks.push(innerBlock[i].dataset.id);
              i += 1;
            }
          }
          const loopIterations = $(`.${GameZlObj.manager.classIDs[popCount]}`).find('input');
          data[count] = { iterations: loopIterations.val(), block: blocks, block_id: key };
          popCount += 1;
        }
      }
      if (baseBlock.indexOf(key) >= 0) {
        if (key === 'assign') {
          const loopIterations = $(`.${GameZlObj.manager.classIDs[popCount]}`).find('input');
          const dataVar = loopIterations[0].value;
          if ((dataVar.includes('beaker') || dataVar.includes('injection')) && (getGameStageID() === 'Scene_11' || getGameStageID() === 'Scene_14')) {
            const str = `window.${loopIterations[0].value}=window.${loopIterations[1].value}`;
            data[count] = { block_id: str };
          } else if (getGameStageID() === 'Scene_15') {
            const str = `let ${loopIterations[0].value}=window.${loopIterations[1].value}`;
            data[count] = { block_id: str };
          } else {
            const str = `let ${loopIterations[0].value}=${loopIterations[1].value}`;
            data[count] = { block_id: str };
          }

          popCount += 1;
        } else if (key === 'append') {
          const loopIterations = $(`.${GameZlObj.manager.classIDs[popCount]}`).find('input');
          const dataVar = loopIterations[0].value;
          if ((dataVar.includes('pocket') && getGameStageID() === 'Scene_12') || (dataVar.includes('zombie') && getGameStageID() === 'Scene_15')) {
            const str = `window.${dataVar}.push(window.${loopIterations[1].value})`;
            data[count] = { block_id: str };
          } else {
            const str = `${loopIterations[0].value}.push(${loopIterations[1].value})`;
            data[count] = { block_id: str };
          }
          popCount += 1;
        } else if (key === 'index') {
          const loopIterations = $(`.${GameZlObj.manager.classIDs[popCount]}`).find('input');
          const dataVar = loopIterations[0].value;
          if (getGameStageID() === 'Scene_13') {
            const str = `let target = window.${dataVar}.indexOf(${loopIterations[1].value})`;
            data[count] = { block_id: str };
          } else {
            const str = `let target = ${loopIterations[0].value}.indexOf(${loopIterations[1].value})`;
            data[count] = { block_id: str };
          }
          popCount += 1;
        } else if (key === 'remove') {
          const loopIterations = $(`.${GameZlObj.manager.classIDs[popCount]}`).find('input');
          const dataVar = loopIterations[0].value;
          if (getGameStageID() === 'Scene_16') {
            const str = `window.${dataVar}.indexOf(${loopIterations[1].value})`;
            const str1 = `window.${dataVar}.splice(${str},1)`;
            data[count] = { block_id: str1 };
          } else {
            const str = `${dataVar}.indexOf(${loopIterations[1].value})`;
            const str1 = `${dataVar}.splice(${str},1)`;
            data[count] = { block_id: str1 };
          }
          popCount += 1;
        } else {
          data[count] = { block_id: key };
          popCount += 1;
        }
      }
      count += 1;
    });

    GameZlObj.manager.data_code = data;
    GameZlObj.convertCode(data);
  };

  GameZlObj.fetchData = () => {
    const elements = [];
    GameZlObj.manager.classIDs = [];
    const blockElements = document.querySelectorAll('#playground > div');
    let i = 0;
    while (i < blockElements.length) {
      elements.push(blockElements[i].dataset.id);
      if (blockElements[i].className.indexOf('block') === -1) {
        const temp = blockElements[i].className;
        blockElements[i].className = `${temp} block${i}`;
        GameZlObj.manager.classIDs.push(`block${i}`);
      } else {
        let string = [];
        string = blockElements[i].className.split(' ');
        const lastElement = string[string.length - 1];
        GameZlObj.manager.classIDs.push(lastElement);
      }
      i += 1;
    }
    GameZlObj.manager.outIDs = elements;
    GameZlObj.parseData();
  };

  GameZlObj.handleBlockClick = (e) => {
    if (GameZlObj.manager.lineCount < 13) {
      const elem = e.currentTarget.outerHTML;
      $('#playground').append(elem);
      GameZlObj.updateBlocks();
      GameZlObj.manager.lineCount += 1;
      $('#playground .edit-span .edit').on('click', GameZlObj.removeBlock);
    } else {
      GameZlObj.manager.popupBox('You have reached maximum bock limit !');
    }
  };

  GameZlObj.handleLoopBlocks = (e) => {
    GameZlObj.handleBlockClick(e);

    $('.blockInput').on('click', (elem) => {
      if (GameZlObj.manager.windowType === 'mobile') {
        const text = prompt('How any times should I Do it ?', '');
        $(elem.target).val(text);
      }
    });
  };

  GameZlObj.updateHistory = (questionObject) => {
    try {
      const { uniqueString, virtualId } = questionObject;
      window.history.replaceState({}, '', `/zombieland/${virtualId}/${uniqueString}`);
    } catch (error) {
      console.error('error');
    }
  };

  GameZlObj.detachListeners = () => {
    $('.object').off('click');
    $('.popup').off('click');
    $('.nest').off('click');
    $('.dustbin').off('click');
    // $('.blockInput').off('click');
  };

  GameZlObj.handleRunCode = () => {
    $('#runCode').prop('disabled', true);
    $('#resetBtn').prop('disabled', true);
    resetGame();
    GameZlObj.fetchData();
  };

  GameZlObj.attachListeners = () => {
    GameZlObj.detachListeners();
    $('.commandBlocks .object').on('click', GameZlObj.handleBlockClick);
    $('.commandBlocks .popup').on('click', GameZlObj.handleLoopBlocks);
  };

  GameZlObj.startGame = (
    zombieLandState, device, phaser, parentElement, canvasElement,
    endGame = () => {}, popupBox = () => {},
  ) => {
    GameZlObj.setGameState(zombieLandState.questionObject, device, popupBox);
    GameZlObj.updateHistory(zombieLandState.questionObject);
    GameZlObj.renderPreBlocks(zombieLandState);
    const gameObj = initGame(phaser, parentElement, canvasElement, zombieLandState, popupBox);
    GameZlObj.attachListeners();
    setEndGame(endGame, GameZlObj.manager);
    GameZlObj.updateBlocks();
    return gameObj;
  };

  return {
    GameZlObj,
  };
};

const { GameZlObj } = zlGameFunctions({});

const {
  manager,
  attachListeners,
  convertCode,
  detachListeners,
  fetchData,
  handleBlockClick,
  handleLoopBlocks,
  handleRunCode,
  parseCode,
  parseData,
  removeBlock,
  renderPreBlocks,
  setGameState,
  startGame,
  updateBlocks,
  updateHistory,
} = GameZlObj;

export default null;

export {
  manager,
  attachListeners,
  convertCode,
  detachListeners,
  fetchData,
  handleBlockClick,
  handleLoopBlocks,
  handleRunCode,
  parseCode,
  parseData,
  removeBlock,
  renderPreBlocks,
  setGameState,
  startGame,
  updateBlocks,
  updateHistory,
};
