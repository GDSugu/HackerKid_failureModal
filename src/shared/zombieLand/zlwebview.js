import React from 'react';

const useSharedZLWebView = () => {
  const ZlEditorBodyContent = () => <>
    <div id="playground"></div>
  </>;

  const ZlOutputBodyContent = () => <>
    <div id="outputContainer" className="sectionContent outputContainer d-flex">
      <div id="userCanvas"></div>
    </div>
  </>;

  const ZlOutputScriptContent = () => <>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/3.12.0/phaser-core.min.js"></script>
  </>;

  const zlOutputStyle = `
    <style>
      body {
        margin: 0;
        padding: 0;
        border: none;
        width: 100vw;
        height: 100vh;
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
      ScriptContent: '',
      scriptToInject: '',
      styleString: '',
    },
    zlOutput: {
      BodyContent: ZlOutputBodyContent,
      ScriptContent: ZlOutputScriptContent,
      styleString: zlOutputStyle,
    },
  };
};

export default null;

export {
  useSharedZLWebView,
};
