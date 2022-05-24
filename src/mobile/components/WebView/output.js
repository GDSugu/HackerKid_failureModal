const outputJS = `<html> 
<head> 
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js" type="text/javascript"></script> 
<!-- <script src="http://www.skulpt.org/js/skulpt.min.js" type="text/javascript"></script> 
<script src="http://www.skulpt.org/js/skulpt-stdlib.js" type="text/javascript"></script>  -->
<!-- <script src="./vendors/skulpt/skulpt.min.js"></script> -->
<!-- <script src="./vendors/skulpt/stdlib.js"></script> -->
<!-- <script src="./vendors/skulpt/skulpt-stdlib.js"></script> -->
<script src="https://unpkg.com/blockly@3.20200625.2/blockly.min.js"></script>
<script src="https://unpkg.com/blockly@3.20200625.2/python_compressed.js"></script>
<script src="https://unpkg.com/blockly@3.20200625.2/msg/en"></script>
<script src='https://unpkg.com/skulpt-custom@1.0.3/dist/skulpt.min.js'></script>
<script src="https://unpkg.com/skulpt-custom@1.0.4/dist/skulpt-stdlib.js"></script>
<script src='https://unpkg.com/workerpool@6.0.3/dist/workerpool.min.js' type='text/javascript' ></script>
<!-- <script src="./index.js"></script> -->
<!-- <script src="https://unpkg.com/skulpt-custom@1.0.3/dist/skulpt-stdlib.js"></script> -->
<!-- <script src='https://unpkg.com/skulpt-custom@1.0.4/dist/skulpt.min.js'></script>
<script src="https://unpkg.com/skulpt-custom@1.0.4/dist/skulpt-stdlib.js"></script> -->

<title>skulpt</title>

<style>
    .outputContainer {
        height: 25vh;
    }
</style>

</head> 

<body> 

<script type="text/javascript"> 
// output functions are configurable.  This one just appends some text
// to a pre element.
function outf(text) { 
    var mypre = document.getElementById("output"); 
    mypre.innerHTML = mypre.innerHTML + text; 
}
function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

// Here's everything you need to run a python program in skulpt
// grab the code from your textarea
// get a reference to your pre element for output
// configure the output function
// call Sk.importMainWithBody()

function repositionTurtle() {
    try {
      const container = $('.outputContainer');
      const content = $('#answerCanvas');
      container.scrollLeft(
        (
          (content[0].scrollWidth * 1.0)
          - container.width()
        ) * 0.50,
      );
      container.scrollTop(
        (
          (content[0].scrollHeight * 1.0)
          - container.height()
        ) * 0.50,
      );
      console.log('repositioned');
    } catch (error) {
      console.log(error);
    }
};

function runit() { 
    var prog = document.getElementById("yourcode").value; 
    var mypre = document.getElementById("output"); 
    mypre.innerHTML = ''; 
    Sk.pre = "output";
    Sk.configure({output:outf, read:builtinRead}); 
    (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'answerCanvas';
    Sk.TurtleGraphics.width = 1500;
    Sk.TurtleGraphics.height = 1500;
    Sk.TurtleGraphics.animate = true;
    setTimeout(() => {
      repositionTurtle();
    }, 500);
    var myPromise = Sk.misceval.asyncToPromise(function() {
       return Sk.importMainWithBody("<stdin>", false, prog, true);
    });
    myPromise
        .then(function(mod) {
            console.log('success');
        }, function(err) {
            console.log(err.toString());
        });
} 
</script> 

<h3>Try This</h3> 
<form> 
<textarea id="yourcode" cols="40" rows="10">import turtle

t = turtle.Turtle()
t.forward(100)

print "Hello World" 
</textarea><br /> 
<button type="button" onclick="runit()">Run</button>
<button type="button">Run</button> 
</form> 
<pre id="output" ></pre> 
<!-- If you want turtle graphics include a canvas -->
<div id="mycanvas"></div> 
<div class="sectionContent outputContainer mx-2">
    <div id="userCanvas"></div>
    <div id="answerCanvas"></div>
  </div>

  <script>
      const getTurtleOutput = (
  blocklyObj = {}, turtleOutputObj = {}, skulptObj = {}, workerPoolObj = {},
) => {
  const BlocklyObj = blocklyObj;
  const managerObj = turtleOutputObj;
  // const Sk = skulptObj;
  const poolObj = workerPoolObj;

  managerObj.repositionTurtle = () => {
    try {
      const container = $('.outputContainer');
      const content = $('#answerCanvas');
      container.scrollLeft(
        (
          (content[0].scrollWidth * 1.0)
          - container.width()
        ) * 0.50,
      );
      container.scrollTop(
        (
          (content[0].scrollHeight * 1.0)
          - container.height()
        ) * 0.50,
      );
    } catch (error) {
      console.log(error);
    }
  };

  managerObj.updateDebugState = () => {
    try {
      const debugButton = $('#continueDebugger');
      const runButton = $('#runCode');
      if (managerObj.inDebugging) {
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

  managerObj.toggleDebugState = () => {
    try {
      const buttonEl = $('.debugToggle');
      const iconEl = $('.debugToggle i');
      if (!managerObj.debuggingEnabled) {
        iconEl.removeClass('fa-pause-circle').addClass('fa-play-circle');
        managerObj.debuggingEnabled = true;
        buttonEl.attr('title', 'Disable debugger');
      } else {
        iconEl.removeClass('fa-play-circle').addClass('fa-pause-circle');
        managerObj.debuggingEnabled = false;
        buttonEl.attr('title', 'Enable debugger');
      }
      managerObj.updateDebugState();
    } catch (error) {
      console.log(error);
    }
  };

  managerObj.toggleDrawingState = () => {
    try {
      const buttonEl = $('.drawingToggle');
      const eyeEl = $('.drawingToggle i');
      const answerCanvasEl = $('#userCanvas');
      if (managerObj.drawingVisible) {
        answerCanvasEl.css('opacity', 0);
        eyeEl.removeClass('fa-eye').addClass('fa-eye-slash');
        managerObj.drawingVisible = false;
        buttonEl.attr('title', 'Show output');
      } else {
        answerCanvasEl.css('opacity', 1);
        eyeEl.removeClass('fa-eye-slash').addClass('fa-eye');
        managerObj.drawingVisible = true;
        buttonEl.attr('title', 'Hide output');
      }
    } catch (error) {
      console.log(error);
    }
  };

  managerObj.runNextStep = (data, resolve, reject) => {
    try {
      // disable continue debugging
      const stepData = data;
      $('#continueDebugger').attr('disabled', true);
      if (!managerObj.drawingVisible) {
        managerObj.toggleDrawingState();
      }
      if (managerObj.windowType === 'mobile' && !$('#outputTab').hasClass('active')) {
        $('#outputTab').tab('show');
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

  managerObj.attachDebugStepper = () => {
    $(document).on('click', '#continueDebugger', () => {
      if (managerObj.suspension
        && 'resolve' in managerObj.suspension
        && 'reject' in managerObj.suspension
        && 'stepData' in managerObj.suspension) {
        managerObj.runNextStep(
          managerObj.suspension.stepData,
          managerObj.suspension.resolve,
          managerObj.suspension.reject,
        );
      }
    });
  };

  managerObj.runCode = (
    code, target, animate = true, frames = 1, delay = 0, respectDebugger = false,
  ) => {

    Sk.configure({
      read: (x) => {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles.files[x] === undefined) {
          throw Error('File not found:' + x);
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
      managerObj.repositionTurtle();
    }, 500);
    // eslint-disable-next-line new-cap
    Sk.builtins.highlightBlock = new Sk.builtin.func((id) => {
      managerObj.workspace.highlightBlock(id.v);
    });
    Sk.onAfterImport = (library) => {
      if (library === 'turtle') {
        Sk.TurtleGraphics.tracer(frames, delay);
      }
    };
    const attachDebugger = {
      'Sk.promise': (stepData) => {
        if (managerObj.debuggingEnabled && respectDebugger) {
          managerObj.inDebugging = true;
          managerObj.updateDebugState();

          // allow continue debugging
          $('#continueDebugger').attr('disabled', false);
          return new Promise((resolve, reject) => {
            managerObj.suspension = {
              stepData,
              resolve,
              reject,
            };
          });
        }
        managerObj.inDebugging = false;
        managerObj.updateDebugState();
        return false;
      },
    };
    return Sk.misceval.asyncToPromise(() => Sk.importMainWithBody('<stdin>', false, code, true), attachDebugger);
  };

  managerObj.getPixelData = (selector) => {
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

  managerObj.validateCode = (answerImages, userImages) => {
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
      const msg = {
        type: 'error',
        caller: 'validateCode -> initiateRunCode',
        payload: {
          error,
        },
      };
      window.sendMessage(msg);
    }
    return true;
  };

  managerObj.resetDebugger = () => {
    // resetting suspensions
    managerObj.suspension = false;
    // reset ongoing debugger
    managerObj.inDebugging = false;
    managerObj.updateDebugState();
  };

  managerObj.initiateRunCode = () => {
    // highlight current running block
    BlocklyObj.Python.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    const code = BlocklyObj.Python.workspaceToCode(managerObj.workspace);
    BlocklyObj.Python.STATEMENT_PREFIX = '';

    let frames = managerObj.turtleConfig && managerObj.turtleConfig.frames
      ? managerObj.turtleConfig.frames : 1;
    let delay = managerObj.turtleConfig && managerObj.turtleConfig.delay
      ? managerObj.turtleConfig.delay : 0;
    if (code.includes('Screen().bgcolor')) {
      frames = 3;
      delay = 0;
    }
    let validated = false;
    managerObj.runCode(code, 'userCanvas', true, frames, delay, true).then(() => {
      managerObj.workspace.highlightBlock(null);
      const selector = $('#userCanvas')[0];
      if (!selector || !selector.turtleInstance) {
        // lets say like no promise in that case but we need to save code -- JPK
        return false;
      }
      return selector.turtleInstance.update();
    }).then(() => {
      // debugging complete
      managerObj.inDebugging = false;
      managerObj.updateDebugState();

      const answerImages = managerObj.getPixelData('#answerCanvas canvas');
      const userImages = managerObj.getPixelData('#userCanvas canvas');
      return poolObj.exec(managerObj.validateCode, [answerImages, userImages]);
    }).then((valid) => {
      validated = valid;
      const request = {
        type: 'validateQuestion',
        questionId: Number(managerObj.initialResponse.questionObject.question_id),
        sourceCode: managerObj.editor.getValue(),
        xmlWorkSpace: BlocklyObj.Xml.domToText(BlocklyObj.Xml.workspaceToDom(managerObj.workspace)),
        validated,
      };
      const msg = {
        type: 'validateQuestion',
        caller: 'initiateRunCode -> runCode',
        payload: {
          request,
        },
      };
      window.sendMessage(msg);
    })
      .catch((error) => {
        // reset debugger in case of error
        managerObj.resetDebugger();
        const msg = {
          type: 'error',
          caller: 'initiateRunCode -> runCode',
          payload: {
            error,
          },
        };
        window.sendMessage(msg);
      });
  };

  return {
    managerObj,
    // Sk,
    poolObj,
  };
};
  </script>

</body> 

</html> `;

export default outputJS;
