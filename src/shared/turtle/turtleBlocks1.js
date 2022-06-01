// const getTurtleOutput = ({
//   blocklyObj = {},
//   turtleOutputObj = {},
//   skulptObj = {},
//   workerPoolObj = {},
// }) => {

// };

const getTurtleOutput = `
const manager = {
  windowType: 'mobile',
  canvasScale: 1.0,
  drawingVisible: true,
  debuggingEnabled: false,
  inDebugging: false,
  suspension: false,
};

 const repositionTurtle = () => {
  try {
    const container = $('.outputContainer');
    const content = $('#answerCanvas');
    container.scrollLeft(
      (
        (content[0].scrollWidth * manager.canvasScale)
        - container.width()
      ) * 0.50,
    );
    container.scrollTop(
      (
        (content[0].scrollHeight * manager.canvasScale)
        - container.height()
      ) * 0.50,
    );
  } catch (error) {
    console.log(error);
  }
};

const runCode = (code, target, animate = true, frames = 1, delay = 0, respectDebugger = false) => {
  let attachDebugger = false;
  window.ReactNativeWebView.postMessage('execution started: runCode');
  window.ReactNativeWebView.postMessage(Object.keys(Sk).toString());
  try {
    Sk.configure({
      read: (x) => {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles.files[x] === undefined) {
          throw Error("File not found: " + x);
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
      repositionTurtle();
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
    attachDebugger = {
      'Sk.promise': (stepData) => {
        if (manager.debuggingEnabled && respectDebugger) {
          manager.inDebugging = true;
          // updateDebugState();
  
          // allow continue debugging
          $('#continueDebugger').attr('disabled', false);
          return new Promise((resolve, reject) => {
            manager.suspension = {
              stepData,
              resolve,
              reject,
            };
          });
        }
        manager.inDebugging = false;
        // updateDebugState();
        return false;
      },
    };
  } catch (error) {
    window.ReactNativeWebView.postMessage('runCode error: ');
    window.ReactNativeWebView.postMessage(error.message);
  }
  return Sk.misceval.asyncToPromise(() => Sk.importMainWithBody('<stdin>', false, code, true), attachDebugger);
};
`;

export default null;

export {
  getTurtleOutput,
};
