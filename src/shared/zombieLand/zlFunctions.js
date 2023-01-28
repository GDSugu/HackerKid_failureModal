import { $ } from '../../web/javascripts/common/framework';
import {
  initGame, resetGame, getGameStageID, executeCode, setEndGame,
  // setGameStageID,
} from './gameFunctions';

const zlGameFunctions = (zlObj = {}, jq = $) => {
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
    // GameZlObj.manager.stageDataID = `Scene_${questionObject.stageDataID}`;
    // setGameStageID(`Scene_${questionObject.qid}`);
    GameZlObj.manager.windowType = device;
    GameZlObj.manager.popupBox = popupBox;
  };

  GameZlObj.renderPreBlocks = (zombielandQuestion) => {
    try {
      const elements = {
        'moveDown()': ' <div  class="object ml-3 move" draggable="true" data-id="moveDown()"><p><span class="expression functions">moveDown</span>()</p></div>',
        'moveLeft()': '<div  class="object ml-3 move" draggable="true"  data-id="moveLeft()"><p><span class="expression functions">moveLeft</span>()</p></div>',
        'moveRight()': '<div  class="object ml-3 move" draggable="true"  data-id="moveRight()"><p><span class="expression functions">moveRight</span>()</p></div>',
        'moveUp()': '<div  class="object ml-3 move" draggable="true"  data-id="moveUp()"><p><span class="expression functions">moveUp</span>()</p></div>',
        'sleep()': '<div  class="object ml-3 move" draggable="true"  data-id="sleep()"><p><span class="expression functions">sleep</span>()</p></div>',
        for_loop: '<div  class="popup ml-3" draggable="true" data-id="for_loop"><p  class="toolbar loop"><span class="tokens">for</span> <span class="expression">i</span> <span class="tokens">in</span> <span class="expression">range</span>(<input class="blockInput" placeholder="int" id="for_loop" value="">):</p></div>',
        while: '<div  class="popup ml-3" draggable="true" data-id="while"><p  class="toolbar loop">while <input class="blockInput" placeholder="expression"> :</p></div>',
        if: '<div  class="popup ml-3" draggable="true" data-id="if"><p  class="toolbar condition">if <select class="blockInput whileExp" aria-placeholder="exp"><option value=1>True</option><option value=\'nearWall()\'>nearWall</option><option value=\'nearObstacles()\'>nearObstacles</option></select>:</p></div>',
        else: '<div  class="popup ml-3" draggable="true" data-id="else"><p  class="toolbar condition">else:</p></div>',
        elif: '<div  class="popup ml-3" draggable="true" data-id="elif"><p  class="toolbar condition">elif <select class="blockInput elifExp" aria-placeholder="exp"><option value=1>True</option><option value=\'nearWall()\'>nearWall</option><option value=\'nearObstacles()\'>nearObstacles</option></select>:</p></div>',
      };
      jq('#playground').empty();
      if (GameZlObj.manager.lineCount < 18) {
        if (zombielandQuestion.questionObject.preBlocks) {
          zombielandQuestion.questionObject.preBlocks.forEach((key) => {
            jq('#playground').append(elements[key]);
            GameZlObj.manager.lineCount += 1;
          });
        }

        // jq('.blockInput').on('click', (e) => {
        //   if (GameZlObj.manager.windowType === 'mobile') {
        //     const text = prompt('Home many times should I Do it ?', '');
        //     jq(e.target).val(text);
        //   }
        // });
      } else {
        GameZlObj.manager.popupBox('uh oh tooo much blocks');
      }
    } catch (error) {
      console.error('no preblocks configured', error);
    }
  };

  GameZlObj.updateBlocks = () => {
    jq('#playground .object').draggable({
      helper: 'clone',
      containment: 'document',
      revert: 'invalid',
      // revert: true,
      // revertDuration: 0,
    });

    jq('#playground .popup').draggable({
      helper: 'clone',
      containment: 'document',
      revert: 'invalid',
      // revert: true,
      // revertDuration: 0,
    });

    jq('.nest').draggable({
      helper: 'clone',
      containment: 'document',
      revert: 'invalid',
      // revert: true,
      // revertDuration: 0,
    });

    jq('#playground .nest').droppable({
      // activeClass: 'ui-state-default',
      // hoverClass: 'ui-state-hover',
      helper: 'clone',
      accept: '.popup',
      greedy: true,
      drop(event, ui) {
        jq(ui.draggable).addClass('insidePopup');
        ui.draggable.appendTo(jq(this));
        // refillBlocks();
      },
    });

    jq('#playground .popup').droppable({
      activeClass: 'ui-state-default',
      // hoverClass: 'ui-state-hover',
      helper: 'clone',
      accept: '.object',
      greedy: true,
      drop(event, ui) {
        jq(ui.draggable).addClass('insidePopup');
        ui.draggable.appendTo(jq(this));
        // refillBlocks();
      },
    });

    jq('#playground').droppable({
      helper: 'clone',
      // activeClass: 'ui-state-default',
      greedy: true,
      drop(event, ui) {
        ui.draggable.appendTo(jq(this));
        jq(ui.draggable).removeClass('insidePopup');
        // refillBlocks();
      },
    });

    jq('.dustbin').droppable({
      helper: 'clone',
      // activeClass: 'ui-state-default',
      greedy: true,
      drop(event, ui) {
        ui.draggable[0].remove();
        // jq(ui.draggable).removeClass('insidePopup');
        // refillBlocks();
      },
    });
  };

  GameZlObj.removeBlock = (e) => {
    GameZlObj.manager.par = jq(e.currentTarget).parent().parent().parent();
    // jq(e.currentTarget)
    //   .parent()
    //   .parent()
    //   .parent()
    //   .remove();
    jq(e.currentTarget).parents('.code-blk').first().remove();
    if (GameZlObj.manager.lineCount > 0) {
      GameZlObj.manager.lineCount -= 1;
    }
  };

  GameZlObj.parseCode = (code) => {
    const funData = ['moveRight()', 'moveLeft()', 'moveUp()', 'moveDown()', 'moveRight();', 'moveLeft();', 'moveUp();', 'moveDown();', 'sleep()'];
    const str = code.split('\n');
    let finalData = '';
    str.forEach((key) => {
      if (jq.inArray(key, funData) >= 0) {
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
      jq('#modal.errorZLModal').modal('show');
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
          const innerBlock = jq(`.${GameZlObj.manager.classIDs[popCount]}`).children('div');
          let i = 0;
          while (i < innerBlock.length) {
            blocks.push(innerBlock[i].dataset.id);
            i += 1;
          }
          const loopIterations = jq(`.${GameZlObj.manager.classIDs[popCount]}`).find('select');
          data[count] = { iterations: loopIterations.val(), block: blocks, block_id: key };
          popCount += 1;
        } else if (key === 'elif') {
          const innerBlock = jq(`.${GameZlObj.manager.classIDs[popCount]}`).children('div');
          let i = 0;
          while (i < innerBlock.length) {
            blocks.push(innerBlock[i].dataset.id);
            i += 1;
          }
          const loopIterations = jq(`.${GameZlObj.manager.classIDs[popCount]}`).find('select');
          data[count] = { iterations: loopIterations.val(), block: blocks, block_id: key };
          popCount += 1;
        } else if (key === 'while') {
          const innerBlock = jq(`.${GameZlObj.manager.classIDs[popCount]}`).children('div');
          let i = 0;
          while (i < innerBlock.length) {
            blocks.push(innerBlock[i].dataset.id);
            i += 1;
          }
          const loopIterations = jq(`.${GameZlObj.manager.classIDs[popCount]}`).find('select');
          data[count] = { iterations: loopIterations.val(), block: blocks, block_id: key };
          popCount += 1;
        } else if (key === 'takeTube()') {
          const parameterArr = jq(`.${GameZlObj.manager.classIDs[popCount]}`).find('input').val();
          data[count] = { iterations: parameterArr, block_id: key };
          popCount += 1;
        } else if (key === 'placeTube()') {
          const parameterArr = jq(`.${GameZlObj.manager.classIDs[popCount]}`).find('input').val();
          data[count] = { iterations: parameterArr, block_id: key };
          popCount += 1;
        } else {
          const innerBlock = jq(`.${GameZlObj.manager.classIDs[popCount]}`).children('div');
          let i = 0;
          while (i < innerBlock.length) {
            if (innerBlock[i].dataset.id === 'placeTube()' || innerBlock[i].dataset.id === 'takeTube()') {
              let block = innerBlock[i].dataset.id;
              innerBlock[i].className = `tube${i}${count}`;
              const parameterArr = jq(`.${innerBlock[i].className}`).find('input');
              block = block.substring(0, block.length - 1);
              blocks.push(`${block + parameterArr.val()})`);
              i += 1;
            } else if (innerBlock[i].dataset.id === 'assign') {
              const loopIterations = jq(`.${GameZlObj.manager.classIDs[popCount]}`).find('input');
              const dataVar = loopIterations[0].value;
              if ((dataVar.includes('beaker') || dataVar.includes('injection')) && (getGameStageID() === 'Scene_11' || getGameStageID() === 'Scene_14' || getGameStageID() === 'Scene_15')) {
                const str = `window.${loopIterations[0].value}=window.${loopIterations[1].value}`;
                blocks.push(str);
                i += 1;
              }
            } else if (innerBlock[i].dataset.id === 'append') {
              const loopIterations = jq(`.${GameZlObj.manager.classIDs[popCount]}`).find('input');
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
          const loopIterations = jq(`.${GameZlObj.manager.classIDs[popCount]}`).find('input');
          data[count] = { iterations: loopIterations.val(), block: blocks, block_id: key };
          popCount += 1;
        }
      }
      if (baseBlock.indexOf(key) >= 0) {
        if (key === 'assign') {
          const loopIterations = jq(`.${GameZlObj.manager.classIDs[popCount]}`).find('input');
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
          const loopIterations = jq(`.${GameZlObj.manager.classIDs[popCount]}`).find('input');
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
          const loopIterations = jq(`.${GameZlObj.manager.classIDs[popCount]}`).find('input');
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
          const loopIterations = jq(`.${GameZlObj.manager.classIDs[popCount]}`).find('input');
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
    // let elstr = '';
    // blockElements.forEach((el) => { elstr += el.outerHTML; });
    // GameZlObj.manager.popupBox({
    //   title: 'Save Code',
    //   code: GameZlObj.manager.sourceCodeData,
    //   classIDs: GameZlObj.manager.classIDs,
    //   outIDs: GameZlObj.manager.outIDs,
    //   // data_code: GameZlObj.manager.data_code,
    //   blkEl: elstr,
    // });
    GameZlObj.parseData();
  };

  GameZlObj.handleBlockClick = (e) => {
    if (GameZlObj.manager.lineCount < 13) {
      const elem = e.currentTarget.outerHTML;
      jq('#playground').append(elem);
      GameZlObj.updateBlocks();
      GameZlObj.manager.lineCount += 1;
      jq('#playground .edit-span .edit').on('click', GameZlObj.removeBlock);
    } else {
      GameZlObj.manager.popupBox('You have reached maximum bock limit !');
    }
  };

  GameZlObj.handleLoopBlocks = (e) => {
    GameZlObj.handleBlockClick(e);

    // jq('.blockInput').on('click', (elem) => {
    //   if (GameZlObj.manager.windowType === 'mobile') {
    //     const text = prompt('How many times should I Do it ?', '');
    //     jq(elem.target).val(text);
    //   }
    // });
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
    jq('.object').off('click');
    jq('.popup').off('click');
    jq('.nest').off('click');
    jq('.dustbin').off('click');
    // jq('.blockInput').off('click');
  };

  GameZlObj.handleRunCode = () => {
    jq('#runCode').prop('disabled', true);
    jq('#resetBtn').prop('disabled', true);
    resetGame();
    GameZlObj.fetchData();
  };

  GameZlObj.attachListeners = () => {
    GameZlObj.detachListeners();
    jq('.commandBlocks .object').on('click', GameZlObj.handleBlockClick);
    jq('.commandBlocks .popup').on('click', GameZlObj.handleLoopBlocks);
    jq('#zl-toolbox').on('shown.bs.collapse', () => {
      const toolboxCollapseHeight = jq('.toolboxCollapse').height();
      const toolheight = jq('#zl-toolbox').height();
      jq('#playground').css('height', `calc(100% - ${toolboxCollapseHeight + toolheight}px)`);
    });
    jq('#zl-toolbox').on('hidden.bs.collapse', () => {
      const toolboxCollapseHeight = jq('.toolboxCollapse').height();
      jq('#playground').css('height', `calc(100% - ${toolboxCollapseHeight}px)`);
    });
  };

  GameZlObj.startGame = (
    zombieLandState, device, phaser, parentElement, canvasElement,
    imagePreviewElement, endGame = () => {}, popupBox = () => {},
    isMobile = false, width, height, canvasContext,
  ) => {
    GameZlObj.setGameState(zombieLandState.questionObject, device, popupBox);
    GameZlObj.updateHistory(zombieLandState.questionObject);
    GameZlObj.renderPreBlocks(zombieLandState);
    const gameObj = initGame(
      phaser, parentElement, canvasElement, imagePreviewElement,
      zombieLandState, popupBox, isMobile, width, height, canvasContext,
    );
    GameZlObj.attachListeners();
    setEndGame(endGame, GameZlObj.manager);
    GameZlObj.updateBlocks();
    return gameObj;
  };

  return {
    GameZlObj,
  };
};

export default null;

export {
  zlGameFunctions,
};
