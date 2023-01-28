// import '@babel/polyfill';
import 'jquery-ui-bundle';
// import Phaser from 'phaser';
import '../../web/javascripts/vendors/jquery.ui.touch-punch.min';
import { zlGameFunctions } from './zlFunctions';

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
  zlGameFunctions,
};
