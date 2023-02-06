import ace from 'ace-builds';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import React from 'react';

const CodeEditor = ({
  id = 'editor',
  className = '',
  theme = 'monokai',
  otherEditorOptions = {},
  onload,
  onChange,
  onClick,
}) => {
  React.useEffect(() => {
    const editor = ace.edit(id);

    // set code editor options
    editor.setOptions({
      theme: `ace/theme/${theme}`,
      fontSize: 16,
      showPrintMargin: false,
      scrollPastEnd: true,
      wrap: true,
      enableLiveAutocompletion: true,
      ...otherEditorOptions,
    });

    onload(id);

    // listen for change event
    editor.on('change', onChange);
    editor.on('click', onClick);

    return () => {
      editor.off('change');
      editor.off('click');
    };
  }, []);

  return (
    <div id={id} className={className}></div>
  );
};

export default CodeEditor;
