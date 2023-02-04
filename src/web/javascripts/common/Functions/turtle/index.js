import ace from 'ace-builds';
import 'ace-builds/webpack-resolver';
import $ from 'jquery';
import md5 from 'crypto-js/md5';
import workerpool from 'workerpool';
import 'blockly/blocks';
import 'blockly/python';
import Blockly from './turtleBlocks';
import Sk from '../../../vendors/skulpt/skulpt.min';
import '../../../vendors/skulpt/skulpt-stdlib';
import { throttle } from '../../../../../hooks/common/utlis';
import {
  upsertDescription, upsertFBMeta, upsertTitle, upsertTwitterMeta,
} from '../../seo';
import allBlocksMarkup from './markup';

const manager = {
  windowType: 'desktop',
  canvasScale: {
    qnCanvas: 1.0,
    outputCanvas: 1.0,
  },
  drawingVisible: true,
  debuggingEnabled: false,
  inDebugging: false,
  suspension: false,
};

window.manager = manager;

const pool = workerpool.pool();

const initializeEditor = () => {
  try {
    if (!manager.editor) {
      const editor = ace.edit('codeBlock');
      editor.setOptions({
        fontSize: 16,
        wrap: true,
        showGutter: true,
        showLineNumbers: true,
        showPrintMargin: false,
        scrollPastEnd: true,
      });
      editor.setTheme('ace/theme/monokai');
      editor.session.setMode('ace/mode/python');
      editor.setReadOnly(true);
      manager.editor = editor;
    } else {
      manager.editor.setValue('');
    }
  } catch (error) {
    console.log(error);
  }
};

const handleBlocksChange = () => {
  try {
    if (manager.workspace && manager.editor) {
      const code = Blockly.Python.workspaceToCode(manager.workspace);
      manager.editor.setValue(code, 1); // 1 moves cursor to the end of the code
    }
  } catch (error) {
    console.log(error);
  }
};

const blockColors = (name) => {
  const mapper = {
    turtle: { category: '#0ead69', block: '#0ead69' },
    logic: { category: '#ff3333', block: '#ff3333' },
    loops: { category: '#ffbe33', block: '#ffbe33' },
    math: { category: '#ff5d00', block: '#ff5d00' },
    text: { category: '#06d6a0', block: '#06d6a0' },
    lists: { category: '#fff75e', block: '#fff75e' },
    colour: { category: '#f7f9f9', block: '#f7f9f9' },
    variables: { category: '#4cc9f0', block: '#4cc9f0' },
    functions: { category: '#8338ec', block: '#8338ec' },
    default: { category: '#0ead69', block: '#0ead69' },
  };
  return name in mapper ? mapper[name] : mapper.default;
};

const initializeBlockly = (response, page) => {
  try {
    const blocklyConfig = {
      media: '/blockly/media/',
      scrollbars: true,
      trashcan: true,
      theme: Blockly.Themes.Dark,
      grid: {
        spacing: 20,
        length: 3,
        colour: 'rgba(255, 255, 255, 0.1)',
        snap: true,
      },
    };
    let xmlWorkspace = '<xml><block type="turtle_import"></block></xml>';
    switch (page) {
      case 'turtle': {
        const xmlBlock = response.questionObject.totalBlocks;
        const maxBlocks = response.questionObject.blockLen;
        $('#turtleBlock').html(xmlBlock);
        $('#turtleBlock xml [name=Turtle]').attr('colour', blockColors('turtle').category);

        blocklyConfig.toolbox = document.querySelector('#toolbox');
        blocklyConfig.maxBlocks = maxBlocks;
        blocklyConfig.horizontalLayout = ($(window).width() < 641 && !xmlBlock.includes('category'));

        xmlWorkspace = 'submissionDetails' in response
          && response.submissionDetails.xmlWorkSpace
          && response.submissionDetails.xmlWorkSpace !== ''
          ? response.submissionDetails.xmlWorkSpace
          : '<xml><block type="turtle_import"></block></xml>';
        break;
      }
      case 'take-challenge': {
        const { xmlMarkUp } = response.challengeObject;
        $('#turtleBlock').html(xmlMarkUp);
        $('#turtleBlock xml [name=Turtle]').attr('colour', blockColors('turtle').category);
        $('#turtleBlock xml [name=Logic]').attr('colour', blockColors('logic').category);
        $('#turtleBlock xml [name=Controls]').attr('colour', blockColors('loops').category);
        $('#turtleBlock xml [name=Loops]').attr('colour', blockColors('loops').category);
        $('#turtleBlock xml [name=Math]').attr('colour', blockColors('math').category);
        $('#turtleBlock xml [name=Text]').attr('colour', blockColors('text').category);
        $('#turtleBlock xml [name=Lists]').attr('colour', blockColors('lists').category);
        $('#turtleBlock xml [name=Colour]').attr('colour', blockColors('colour').category);
        $('#turtleBlock xml [name=Variables]').attr('colour', blockColors('variables').category);
        const maxBlocks = response.challengeObject.totalBlocks;

        blocklyConfig.toolbox = document.querySelector('#toolbox');
        blocklyConfig.maxBlocks = maxBlocks;
        blocklyConfig.horizontalLayout = ($(window).width() < 641 && !xmlMarkUp.includes('category'));

        xmlWorkspace = 'submissionDetails' in response
          && response.submissionDetails.xmlWorkSpace
          && response.submissionDetails.xmlWorkSpace !== ''
          ? response.submissionDetails.xmlWorkSpace
          : '<xml><block type="turtle_import"></block></xml>';

        break;
      }
      case 'create-challenge': {
        $('#turtleBlock').html(allBlocksMarkup);
        $('#turtleBlock xml [name=Turtle]').attr('colour', blockColors('turtle').category);

        blocklyConfig.toolbox = document.querySelector('#toolbox');
        blocklyConfig.horizontalLayout = ($(window).width() < 641);

        xmlWorkspace = response
        && response.challengeDetails.answerState
        && response.challengeDetails.answerState !== ''
          ? response.challengeDetails.answerState
          : '<xml><block type="turtle_import"></block></xml>';
        break;
      }
      default: break;
    }
    const workspace = Blockly.inject('turtleBlock', blocklyConfig);
    const xmlDom = Blockly.Xml.textToDom(xmlWorkspace);
    Blockly.Xml.domToWorkspace(xmlDom, workspace);
    workspace.addChangeListener(handleBlocksChange);
    manager.workspace = workspace;
  } catch (error) {
    console.log(error);
  }
};

const repositionTurtle = (targetSelector = '#answerCanvas', parentSelector = '.outputContainer', canvas = 'output' || 'question') => {
  try {
    let target = targetSelector;
    let parentSel = parentSelector;
    if (targetSelector.indexOf('#') === -1) {
      target = `#${targetSelector}`;
    }
    if (targetSelector === 'previewCanvas') {
      parentSel = '.previewOutputContainer';
    }
    const container = $(parentSel);
    const content = $(target);
    const canvasScale = canvas === 'answer' ? manager.canvasScale.outputCanvas : manager.canvasScale.qnCanvas;
    if (content.length && container.length) {
      container.scrollLeft(
        (
          (content[0].scrollWidth * canvasScale)
          - container.width()
        ) * 0.50,
      );
      container.scrollTop(
        (
          (content[0].scrollHeight * canvasScale)
          - container.height()
        ) * 0.50,
      );
    }
  } catch (error) {
    console.log(error);
  }
};
window.reposturtle = repositionTurtle;
const updateDebugState = () => {
  try {
    const debugButton = $('#continueDebugger, .continueDebugger');
    const runButton = $('#runCode, .runCode');
    if (manager.inDebugging) {
      debugButton.show();
      runButton.hide();
    } else {
      debugButton.hide();
      runButton.show();
    }
  } catch (error) {
    console.log(error);
  }
};

const updateSeoTags = (parsedResponse, page) => {
  try {
    let title;
    let description;
    let url;
    let image;

    switch (page) {
      case 'turtle': {
        title = `${parsedResponse.questionObject.Question} - Turtle Level - Hackerkid`;
        description = `Follow the instructions: ${parsedResponse.questionObject.steps.join(', ')}`;
        url = `${window.location.origin}/turtle/${parsedResponse.questionObject.virtualId}/${parsedResponse.questionObject.uniqueString}`;
        image = parsedResponse.questionObject.img_link;
        break;
      }
      case 'take-challenge': {
        title = `${parsedResponse.challengeObject.challengeName} - Turtle Challenge - Hackerkid`;
        description = `Complete this ${parsedResponse.challengeObject.challengeName} turtle challenge to gain points and climb up the leaderboard`;
        url = `${window.location.origin}/turtle/challenges/${parsedResponse.challengeObject.challengeId}/${parsedResponse.challengeObject.uniqueString}`;
        image = parsedResponse.challengeObject.imagePath;
        break;
      }
      case 'create-challenge': {
        return;
      }
      default: break;
    }
    upsertTitle(title);
    upsertDescription(description);
    upsertFBMeta(title, description, url, image);
    upsertTwitterMeta(title, description, url, image);
  } catch (error) {
    console.log(error);
  }
};

const toggleDebugState = () => {
  try {
    const buttonEl = $('.debugToggle');
    const iconEl = $('.debugToggle i');
    if (!manager.debuggingEnabled) {
      iconEl.removeClass('fa-pause-circle').addClass('fa-play-circle');
      manager.debuggingEnabled = true;
      buttonEl.attr('title', 'Disable debugger');
    } else {
      iconEl.removeClass('fa-play-circle').addClass('fa-pause-circle');
      manager.debuggingEnabled = false;
      buttonEl.attr('title', 'Enable debugger');
    }
    updateDebugState();
  } catch (error) {
    console.log(error);
  }
};

const toggleDrawingState = () => {
  try {
    const buttonEl = $('.drawingToggle');
    const eyeEl = $('.drawingToggle i');
    const answerCanvasEl = $('#userCanvas');
    if (manager.drawingVisible) {
      answerCanvasEl.css('opacity', 0);
      eyeEl.removeClass('fa-eye').addClass('fa-eye-slash');
      manager.drawingVisible = false;
      buttonEl.attr('title', 'Show output');
    } else {
      answerCanvasEl.css('opacity', 1);
      eyeEl.removeClass('fa-eye-slash').addClass('fa-eye');
      manager.drawingVisible = true;
      buttonEl.attr('title', 'Hide output');
    }
  } catch (error) {
    console.log(error);
  }
};

const runNextStep = (data, resolve, reject) => {
  try {
    // disable continue debugging
    const stepData = data;
    $('#continueDebugger, .continueDebugger').attr('disabled', true);
    if (!manager.drawingVisible) {
      toggleDrawingState();
    }
    if (manager.windowType === 'mobile' && !$('#output-tab').hasClass('active')) {
      $('#output-tab').tab('show');
    }
    stepData.data.promise.then((x) => {
      stepData.data.result = x;
      resolve(stepData.resume());
    }, (e) => {
      stepData.data.error = e;
      resolve(stepData.resume());
    }).catch((error) => {
      reject(error);
    });
  } catch (error) {
    console.log(error);
  }
};

const runDebugger = () => {
  if (manager.suspension
    && 'resolve' in manager.suspension
    && 'reject' in manager.suspension
    && 'stepData' in manager.suspension) {
    runNextStep(
      manager.suspension.stepData,
      manager.suspension.resolve,
      manager.suspension.reject,
    );
  }
};

const attachDebugStepper = () => {
  $(document).on('click', '#continueDebugger, .continueDebugger', () => {
    runDebugger();
  });
};

const runCode = (code, target = '#answerCanvas', animate = true, frames = 1, delay = 0, respectDebugger = false, parentSelector = '.outputContainer') => {
  Sk.configure({
    read: (x) => {
      if (Sk.builtinFiles === undefined || Sk.builtinFiles.files[x] === undefined) {
        throw Error(`File not found: ${x}`);
      }
      return Sk.builtinFiles.files[x];
    },
    __future__: Sk.python3,
    killableWhile: true,
    killableFor: true,
  });
  (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = target;
  Sk.TurtleGraphics.bufferSize = 1000;
  const width = 1500;
  Sk.TurtleGraphics.width = width;
  Sk.TurtleGraphics.height = width;
  Sk.TurtleGraphics.animate = animate;
  // eslint-disable-next-line new-cap
  Sk.builtins.highlightBlock = new Sk.builtin.func((id) => {
    manager.workspace.highlightBlock(id.v);
  });
  Sk.onAfterImport = (library) => {
    if (library === 'turtle') {
      Sk.TurtleGraphics.tracer(frames, delay);
    }
  };
  console.table({
    target,
    parentSelector,
  });
  const attachDebugger = {
    'Sk.promise': (stepData) => {
      if (manager.debuggingEnabled && respectDebugger) {
        manager.inDebugging = true;
        updateDebugState();

        // allow continue debugging
        $('#continueDebugger, .continueDebugger').attr('disabled', false);
        return new Promise((resolve, reject) => {
          manager.suspension = {
            stepData,
            resolve,
            reject,
          };
        });
      }
      manager.inDebugging = false;
      updateDebugState();
      return false;
    },
  };
  setTimeout(() => {
    repositionTurtle(target, parentSelector);
  }, 500);
  return Sk.misceval.asyncToPromise(() => Sk.importMainWithBody('<stdin>', false, code, true), attachDebugger);
};

const getPixelData = (selector) => {
  const pixelData = [];
  try {
    const canvases = document.querySelectorAll(selector);
    canvases.forEach((eachCanvas) => {
      const context = eachCanvas.getContext('2d');
      pixelData.push(context.getImageData(0, 0, eachCanvas.height, eachCanvas.width).data);
    });
  } catch (error) {
    console.log(error);
  }
  return pixelData;
};

const validateCode = (answerImages, userImages) => {
  try {
    if (answerImages.length !== userImages.length) {
      return false;
    }
    const pixelErrors = answerImages.map((eachImgData, eachKey) => {
      const minLength = Math.min(eachImgData.length, userImages[eachKey].length);
      let errors = 0;
      for (let itr = 0; itr < minLength; itr += 1) {
        if (Math.abs(eachImgData[itr] - userImages[eachKey][itr]) > 64) {
          errors += 1;
        }
      }
      return errors;
    });
    /*
      for future cases,
      when pixel errors there for correct questions
      we can have some redundant checks, also
      we can show cool maching percentage -- JOHNPK
    */
    for (let itr = 0; itr < pixelErrors.length; itr += 1) {
      if (pixelErrors[itr] > 100) {
        return false;
      }
    }
  } catch (error) {
    console.log(error);
  }
  return true;
};

const resetDebugger = () => {
  // resetting suspensions
  manager.suspension = false;

  // reset ongoing debugger
  manager.inDebugging = false;

  updateDebugState();
};

const postNavigationHandle = () => {
  // resetting canvas
  $('#userCanvas, #answerCanvas #expOutCanvas').html('');

  // clearing previously loaded hints
  manager.hintResponse = false;

  // hide hint container if already open
  $('.hintContainer').animate({
    transform: 200,
  }, {
    duration: 300,
    step: (now) => {
      $('.hintContainer').css('transform', `translate(-50%, ${now}%)`);
    },
    complete: () => {
      $('.hintContainer').removeClass('shown');
    },
  });

  // hide tour if alreadyopen
  if (manager.tour) {
    manager.tour.hide();
  }

  // resetting tour data
  manager.tour = false;

  resetDebugger();
};

const updateHistory = (response, page, addData) => {
  try {
    let history = '';
    switch (page) {
      case 'turtle': {
        const { uniqueString, virtualId } = response.questionObject;
        history = `/turtle/${virtualId}/${uniqueString}`;
        break;
      }
      case 'take-challenge': {
        const { challengeId, uniqueString } = response.challengeObject;
        history = `/turtle/challenges/${challengeId}/${uniqueString}`;
        break;
      }
      case 'create-challenge': {
        if (addData?.questionId === 'new') {
          history = '/turtle/challenges/create/new';
        } else {
          const { challengeId, uniqueString } = response.challengeDetails;
          history = `/turtle/challenges/create/${challengeId}/${uniqueString}`;
        }
        break;
      }
      default: break;
    }
    window.history.replaceState({}, '', history);
  } catch (error) {
    console.log(error);
  }
};

const initiateRunCode = (page, preview = false) => {
  // highlight current running block
  Blockly.Python.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
  const code = Blockly.Python.workspaceToCode(manager.workspace);
  Blockly.Python.STATEMENT_PREFIX = '';

  let frames = manager.turtleConfig && manager.turtleConfig.frames
    ? manager.turtleConfig.frames : 1;
  let delay = manager.turtleConfig && manager.turtleConfig.delay
    ? manager.turtleConfig.delay : 0;
  if (code.includes('Screen().bgcolor')) {
    frames = 3;
    delay = 0;
  }
  let validated = false;
  let addDebugger = true;
  let target = 'userCanvas';
  let parentselector = '.outputContainer';
  if (page === 'create-challenge') {
    manager.debuggingEnabled = false;
    addDebugger = false;
  }

  if (preview) {
    target = 'previewCanvas';
    parentselector = '.previewOutputContainer';
  }

  return runCode(code, target, true, frames, delay, addDebugger, parentselector).then(() => {
    manager.workspace.highlightBlock(null);
    const selector = $(`#${target}`)[0];
    if (!selector || !selector.turtleInstance) {
      // lets say like no promise in that case but we need to save code -- JPK
      return false;
    }
    return selector.turtleInstance.update();
  }).then(() => {
    // debugging complete
    manager.inDebugging = false;
    updateDebugState();

    if (page === 'create-challenge') {
      return new Promise((resolve) => resolve(true));
    }
    const answerImages = getPixelData('#answerCanvas canvas');
    const userImages = getPixelData('#userCanvas canvas');
    return pool.exec(validateCode, [answerImages, userImages]);
  }).then((valid) => {
    validated = valid;
    const request = {
      sourceCode: manager.editor.getValue(),
    };
    switch (page) {
      case 'turtle': {
        request.type = 'validateQuestion';
        request.questionId = Number(manager.initialResponse.questionObject.question_id);
        request.xmlWorkSpace = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(manager.workspace));
        request.validated = validated;
        break;
      }
      case 'take-challenge': {
        request.type = 'validateChallenge';
        request.challengeId = Number(manager.initialResponse.challengeObject.challengeId);
        request.xmlWorkSpace = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(manager.workspace));
        request.validated = validated;

        break;
      }
      case 'create-challenge': {
        const challengeName = document.querySelector('.create-challenge-question-title').innerHTML.trim();
        const blockTypesAll = manager.workspace.getAllBlocks();
        const blockTypes = blockTypesAll.map((value) => value.type);
        request.type = 'updateChallenge';
        request.blockTypes = blockTypes;
        request.answerState = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(manager.workspace));
        request.challengeId = Number(manager.initialResponse.challengeDetails.challengeId);
        request.challengeName = challengeName;
        break;
      }
      default: break;
    }

    if (page !== 'create-challenge') {
      let requestString = '';
      Object.keys(request).forEach((index) => {
        requestString += request[index];
      });
      const requestHash = md5(requestString + md5(requestString).toString()).toString();
      request.requestHash = requestHash;
      resetDebugger();
    }
    return new Promise((resolve) => resolve(request));
  });
};

const getCreateChallengeRequest = (challengeState = 'draft') => {
  const challengeName = document.querySelector('.create-challenge-question-title').innerHTML.trim();
  const blockTypesAll = manager.workspace.getAllBlocks();
  const blockTypes = blockTypesAll.map((value) => value.type);
  const request = {
    type: 'updateChallenge',
    challengeId: Number(manager.initialResponse.challengeDetails.challengeId),
    challengeName,
    answerState: Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(manager.workspace)),
    blockTypes,
    sourceCode: manager.editor.getValue(),
    challengeState,
  };
  let requestString = '';
  Object.keys(request).forEach((index) => {
    if (index === 'blockTypes') {
      requestString += JSON.stringify(request[index]);
    } else {
      requestString += request[index];
    }
  });
  const requestHash = md5(requestString + md5(requestString).toString()).toString();
  request.requestHash = requestHash;
  return request;
};

const initializeTurtle = (response, page) => {
  let sourceCode;
  switch (page) {
    case 'turtle': {
      sourceCode = response.questionObject.snippet;
      break;
    }
    case 'take-challenge': {
      sourceCode = response.challengeObject.sourceCode;
      break;
    }
    case 'create-challenge': {
      sourceCode = response.challengeDetails.sourceCode;
      break;
    }
    default: break;
  }
  if (page !== 'create-challenge') {
    runCode(sourceCode, 'expOutCanvas', true, 3, 0, false, '.turtle-qnout-container')
      .then(() => {
        const currentSelector = document.querySelector('#expOutCanvas');
        if (currentSelector && currentSelector.turtleInstance) {
          currentSelector.turtleInstance.update();
        }
        // console.log('exptected output canvas repositioning');
        // repositionTurtle('#expOutCanvas', '.turtle-qnout-container');
      });
    runCode(sourceCode, 'answerCanvas', true, 3, 0, false, '.outputContainer')
      .then(() => {
        const currentSelector = document.querySelector('#answerCanvas');
        if (currentSelector && currentSelector.turtleInstance) {
          currentSelector.turtleInstance.update();
        }
        // console.log('output tab canvas repos');
        // repositionTurtle('#answerCanvas', '.outputContainer');
      });
  }
  // manager.initializeBlockly(turtleQuestionState);
};

const runSkulpt = (page = 'turtle', preview = false) => {
  let result = new Promise((resolve) => resolve(false));
  if (manager.editor) {
    if (!manager.drawingVisible) {
      toggleDrawingState();
    }
    if (!preview) {
      if (!$('#output-tab').hasClass('active')) {
        $('#output-tab').tab('show');
        manager.showOutput = true;
      }
    }
    result = initiateRunCode(page, preview);
  }
  return result;
};

// const attachSkulpt = () => {
//   $(document).on('click', '#runCode', () => {
//     runSkulpt();
//   });
// };

const copyHandler = (e) => {
  const copyField = $('#shareLink');
  const copyButton = $(e.target);
  copyField.select();
  document.execCommand('copy');
  copyButton.popover({
    content: 'Copied!',
  });
  copyButton.popover('show');
  setTimeout(() => {
    copyButton.popover('hide');
  }, 1000);
};

// const attachSpeedHandler = () => {
//   try {
//     $(document).on('change', '#speedControl', (event) => {
//       const target = $(event.target);
//       const speed = target.val();
//       const turtleConfig = {
//         frames: Number(speed < 4 ? 1 : speed - 3),
//         delay: Number(speed > 3 ? 0 : (6 - speed) * 10),
//       };
//       manager.turtleConfig = turtleConfig;
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

const attachFullScreenHandler = () => {
  try {
    $(document).on('click', '#toggleFullScreen', () => {
      if (!document.fullScreenElement
        && !document.mozFullScreenElement
        && !document.docmsFullscreenElement
        && !document.webkitFullscreenElement) {
        document.body.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });
    $(document).on('fullscreenchange', () => {
      if (!document.fullScreenElement
        && !document.mozFullScreenElement
        && !document.docmsFullscreenElement
        && !document.webkitFullscreenElement) {
        $('#toggleFullScreen i').removeClass('fa-compress').addClass('fa-expand');
      } else {
        $('#toggleFullScreen i').removeClass('fa-expand').addClass('fa-compress');
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// const updateZoomState = (disableZoomIn, disableZoomOut) => {
//   try {
//     const zoomInEl = $('.zoomIn');
//     const zoomOutEl = $('.zoomOut');
//     zoomInEl.attr('disabled', disableZoomIn);
//     zoomOutEl.attr('disabled', disableZoomOut);
//   } catch (error) {
//     console.log(error);
//   }
// };

const attachZoomControls = () => {
  try {
    const maxScale = 1.1;
    const minScale = 0.2;
    const scaleStep = 0.1;

    const zoomCanvas = (e, canvas = 'output' || 'question') => {
      const delta = e.originalEvent.deltaY;
      const canvasKey = canvas === 'output' ? 'outputCanvas' : 'questionCanvas';
      if (delta > 0) {
        if (manager.canvasScale[canvasKey] > minScale) {
          manager
            .canvasScale[canvasKey] = Number((manager.canvasScale[canvasKey] - scaleStep)
              .toFixed(1));
        }
      } else if (delta <= 0) {
        if (manager.canvasScale[canvasKey] < maxScale) {
          manager
            .canvasScale[canvasKey] = Number((manager.canvasScale[canvasKey] + scaleStep)
              .toFixed(1));
        }
      }
    };

    $('.outputContainer').on('wheel', (e) => {
      e.preventDefault();
      // zoomCanvas(e);
      throttle(() => { zoomCanvas(e, 'output'); }, 300);
      $('#answerCanvas, #userCanvas').css('transform', `scale(${manager.canvasScale.outputCanvas})`);
    });

    $('.turtle-qnout-container').on('wheel', (e) => {
      e.preventDefault();
      // zoomCanvas(e);
      throttle(() => { zoomCanvas(e, 'question'); }, 300);
      $('#expOutCanvas').css('transform', `scale(${manager.canvasScale.qnCanvas})`);
    });

    // $(document).on('click', '.zoom-control', (event) => {
    //   const target = $(event.currentTarget);
    //   const action = target.data('zoomaction');
    //   if (action === 'in' && manager.canvasScale < maxScale) {
    //     manager.canvasScale = Number((manager.canvasScale + scaleStep).toFixed(1));
    //   } else if (action === 'out' && manager.canvasScale > minScale) {
    //     manager.canvasScale = Number((manager.canvasScale - scaleStep).toFixed(1));
    //   }
    //   $('#answerCanvas, #userCanvas').css('transform', `scale(${manager.canvasScale})`);
    //   updateZoomState(manager.canvasScale === maxScale, manager.canvasScale === minScale);
    //   repositionTurtle();
    // });
    // initialState
    // updateZoomState(manager.canvasScale === maxScale, manager.canvasScale === minScale);
  } catch (error) {
    console.log(error);
  }
};

// const attachDrawingToggler = () => {
//   $(document).on('click', '.drawingToggle', () => {
//     toggleDrawingState();
//   });
// };

const attachDebugToggler = () => {
  // $(document).on('click', '.debugToggle', (e) => {
  //   e.stopPropagation();
  //   console.log('debug toggle');
  //   toggleDebugState();
  // });
  // initial state
  updateDebugState();
};

const attachDragHandler = (selector) => {
  const slider = $(selector)[0];
  let mouseDown = false;
  let startX;
  let startY;
  let scrollLeft;
  let scrollTop;

  const startDragging = function (e) {
    mouseDown = true;
    startX = e.pageX - slider.offsetLeft;
    startY = e.pageY - slider.offsetTop;
    scrollLeft = slider.scrollLeft;
    scrollTop = slider.scrollTop;
  };

  const stopDragging = function () {
    mouseDown = false;
  };

  slider.addEventListener('mousemove', (e) => {
    e.preventDefault();
    if (!mouseDown) { return; }
    const x = e.pageX - slider.offsetLeft;
    const y = e.pageY - slider.offsetTop;
    const scroll = x - startX;
    const scrollv = y - startY;
    slider.scrollLeft = scrollLeft - scroll;
    slider.scrollTop = scrollTop - scrollv;
  });

  // Add the event listeners
  slider.addEventListener('mousedown', startDragging, false);
  slider.addEventListener('mouseup', stopDragging, false);
  slider.addEventListener('mouseleave', stopDragging, false);
};

const attachResizeHandler = (page) => {
  $(document).on('shown.bs.tab', '#turtle-tab', () => {
    if (manager.workspace) {
      Blockly.svgResize(manager.workspace);
    }
  });

  $(document).on('shown.bs.tab', '#code-tab', () => {
    if (manager.editor) {
      manager.editor.resize();
    }
  });

  $(document).on('click', '.repositionDrawing', () => {
    if (page !== 'create-challenge') {
      repositionTurtle('#answerCanvas', '.outputContainer');
      repositionTurtle('#expOutCanvas', '.turtle-qnout-container');
    } else {
      repositionTurtle('#userCanvas', '.outputContainer');
    }
  });
};

const selectDomView = () => {
  try {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      manager.windowType = 'mobile';
    } else {
      manager.windowType = 'desktop';
    }
  } catch (error) {
    console.log(error);
  }
};

const startTurtle = ({ response, page = 'turtle', addData = {} }) => {
  manager.initialResponse = response;
  selectDomView();
  updateSeoTags(response, page);
  updateHistory(response, page, addData);
  postNavigationHandle();
  initializeTurtle(response, page);
  initializeEditor();
  initializeBlockly(response, page);
  // attachSpeedHandler();
  attachDragHandler('.outputContainer');
  if (page !== 'create-challenge') {
    attachDragHandler('.turtle-qnout-container');
  }
  attachResizeHandler(page);
  attachZoomControls();
  // attachDrawingToggler();
  if (page !== 'create-challenge') {
    attachDebugToggler();
    attachDebugStepper();
  }
  attachFullScreenHandler();
};

export default null;

export {
  attachDragHandler,
  copyHandler,
  getCreateChallengeRequest,
  toggleDrawingState,
  repositionTurtle,
  runDebugger,
  runSkulpt,
  startTurtle,
  toggleDebugState,
  updateHistory,
};
