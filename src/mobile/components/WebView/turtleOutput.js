const turtleOutputJS = `<html>
<head>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js" type="text/javascript"></script> 
<script src="https://unpkg.com/blockly@3.20200625.2/blockly.min.js"></script>
<script src="https://unpkg.com/blockly@3.20200625.2/python_compressed.js"></script>
<script src="https://unpkg.com/blockly@3.20200625.2/msg/en"></script>
<script src='https://unpkg.com/skulpt-custom@1.0.3/dist/skulpt.min.js'></script>
<script src="https://unpkg.com/skulpt-custom@1.0.4/dist/skulpt-stdlib.js"></script>
<script src='https://unpkg.com/workerpool@6.0.3/dist/workerpool.min.js' type='text/javascript' ></script>
<title>skulpt</title>

<style>
  
</style>
<head>

<body>
  <div id="mycanvas">hello</div>
  <div class="sectionContent outputContainer mx-2">
    <div id="userCanvas"></div>
    <div id="answerCanvas"></div>
  </div>

  <script>
    document.querySelector('#mycanvas').innerHTML = 'new world';
    window.ReactNativeWebView.postMessage('execution initialized');
     window.execute = (payload) => {
      window.ReactNativeWebView.postMessage('execution started');
      console.log('native code execution');
      switch payload.action {
        case 'runCode':
          // console.log(payload.data);
          
          break;
        default: break;
      }
    }
  </script>

</body>

</html>`;

export default turtleOutputJS;
