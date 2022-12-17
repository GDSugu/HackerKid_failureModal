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

const initializeBlockly = (response) => {
  try {
    const xmlBlock = response.questionObject.totalBlocks;
    const maxBlocks = response.questionObject.blockLen;
    $('#turtleBlock').html(xmlBlock);
    $('#turtleBlock xml [name=Turtle]').attr('colour', blockColors('turtle').category);
    const workspace = Blockly.inject('turtleBlock', {
      media: '/blockly/media/',
      toolbox: $('#toolbox')[0],
      scrollbars: true,
      trashcan: true,
      theme: Blockly.Themes.Dark,
      grid: {
        spacing: 20,
        length: 3,
        colour: 'rgba(255, 255, 255, 0.1)',
        snap: true,
      },
      horizontalLayout: ($(window).width() < 641 && !xmlBlock.includes('category')),
      maxBlocks,
    });
    const xmlDom = Blockly.Xml.textToDom(
      'submissionDetails' in response
      && response.submissionDetails.xmlWorkSpace
      && response.submissionDetails.xmlWorkSpace !== ''
        ? response.submissionDetails.xmlWorkSpace
        : '<xml><block type="turtle_import"></block></xml>',
    );
    Blockly.Xml.domToWorkspace(xmlDom, workspace);
    workspace.addChangeListener(handleBlocksChange);
    manager.workspace = workspace;
  } catch (error) {
    console.log(error);
  }
};

const repositionTurtle = (targetSelector = '#answerCanvas', parentSelector = '.outputContainer', canvas = 'output' || 'question') => {
  try {
    const container = $(parentSelector);
    const content = $(targetSelector);
    const canvasScale = canvas === 'answer' ? manager.canvasScale.outputCanvas : manager.canvasScale.qnCanvas;
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
  } catch (error) {
    console.log(error);
  }
};

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

const updateSeoTags = (parsedResponse) => {
  try {
    const title = `${parsedResponse.questionObject.Question} - Turtle Level - Hackerkid`;
    const description = `Follow the instructions: ${parsedResponse.questionObject.steps.join(', ')}`;
    const url = `${window.location.origin}/turtle/${parsedResponse.questionObject.virtualId}/${parsedResponse.questionObject.uniqueString}`;
    const image = parsedResponse.questionObject.img_link;
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
  setTimeout(() => {
    repositionTurtle(target, parentSelector);
  }, 500);
  // eslint-disable-next-line new-cap
  Sk.builtins.highlightBlock = new Sk.builtin.func((id) => {
    manager.workspace.highlightBlock(id.v);
  });
  Sk.onAfterImport = (library) => {
    if (library === 'turtle') {
      Sk.TurtleGraphics.tracer(frames, delay);
    }
  };
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

const updateHistory = (response) => {
  try {
    const { uniqueString, virtualId } = response.questionObject;
    window.history.replaceState({}, '', `/turtle/${virtualId}/${uniqueString}`);
  } catch (error) {
    console.log(error);
  }
};

const initiateRunCode = () => {
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
  return runCode(code, 'userCanvas', true, frames, delay, true).then(() => {
    manager.workspace.highlightBlock(null);
    const selector = $('#userCanvas')[0];
    if (!selector || !selector.turtleInstance) {
      // lets say like no promise in that case but we need to save code -- JPK
      return false;
    }
    return selector.turtleInstance.update();
  }).then(() => {
    // debugging complete
    manager.inDebugging = false;
    updateDebugState();

    const answerImages = getPixelData('#answerCanvas canvas');
    const userImages = getPixelData('#userCanvas canvas');
    return pool.exec(validateCode, [answerImages, userImages]);
  }).then((valid) => {
    validated = valid;
    const request = {
      type: 'validateQuestion',
      questionId: Number(manager.initialResponse.questionObject.question_id),
      sourceCode: manager.editor.getValue(),
      xmlWorkSpace: Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(manager.workspace)),
      validated,
    };
    let requestString = '';
    Object.keys(request).forEach((index) => {
      requestString += request[index];
    });
    const requestHash = md5(requestString + md5(requestString).toString()).toString();
    request.requestHash = requestHash;
    resetDebugger();
    return new Promise((resolve) => resolve(request));
  });
};

const initializeTurtle = (questionObject) => {
  runCode(questionObject.snippet, 'expOutCanvas', true, 3, 0, false, '.turtle-qnout-container')
    .then(() => {
      const currentSelector = document.querySelector('#expOutCanvas');
      if (currentSelector && currentSelector.turtleInstance) {
        currentSelector.turtleInstance.update();
      }
      repositionTurtle('#expOutCanvas', '.turtle-qnout-container');
    });
  runCode(questionObject.snippet, 'answerCanvas', true, 3, 0, false, '.turtle-qnout-container')
    .then(() => {
      const currentSelector = document.querySelector('#answerCanvas');
      if (currentSelector && currentSelector.turtleInstance) {
        currentSelector.turtleInstance.update();
      }
      repositionTurtle('#answerCanvas', '.outputContainer');
    });
  // manager.initializeBlockly(turtleQuestionState);
};

const runSkulpt = () => {
  let result = new Promise((resolve) => resolve(false));
  if (manager.editor) {
    if (!manager.drawingVisible) {
      toggleDrawingState();
    }
    if (!$('#output-tab').hasClass('active')) {
      $('#output-tab').tab('show');
      manager.showOutput = true;
    }
    result = initiateRunCode();
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

const attachSpeedHandler = () => {
  try {
    $(document).on('change', '#speedControl', (event) => {
      const target = $(event.target);
      const speed = target.val();
      const turtleConfig = {
        frames: Number(speed < 4 ? 1 : speed - 3),
        delay: Number(speed > 3 ? 0 : (6 - speed) * 10),
      };
      manager.turtleConfig = turtleConfig;
    });
  } catch (error) {
    console.log(error);
  }
};

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

const attachResizeHandler = () => {
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
    repositionTurtle('#answerCanvas', '.outputContainer');
    repositionTurtle('#expOutCanvas', '.turtle-qnout-container');
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

const startTurtle = ({ response }) => {
  manager.initialResponse = response;
  selectDomView();
  updateSeoTags(response);
  updateHistory(response);
  postNavigationHandle();
  initializeTurtle(response.questionObject);
  initializeEditor();
  initializeBlockly(response);
  attachSpeedHandler();
  attachDragHandler('.outputContainer');
  attachDragHandler('.turtle-qnout-container');
  attachResizeHandler();
  attachZoomControls();
  // attachDrawingToggler();
  attachDebugToggler();
  attachDebugStepper();
  attachFullScreenHandler();
};

export default null;

export {
  attachDragHandler,
  copyHandler,
  toggleDrawingState,
  repositionTurtle,
  runDebugger,
  runSkulpt,
  startTurtle,
  toggleDebugState,
  updateHistory,
};