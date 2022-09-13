import React, { useEffect } from 'react';
import ace from 'ace-builds';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import '../../../stylesheets/common/pages/ide/style.scss';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { $, pageInit } from '../framework';
import { getDevice } from '../../../../hooks/common/utlis';
import useRecapchav3 from '../../../../hooks/pages/recapchav3';
import { getSession, setSession } from '../../../../hooks/common/framework';
import {
  getValueToLanguageDisplayNameMap, getLanguageDisplayNameFromValue, getModeFromValue,
  getCompilerIdFromValue,
  getBoilerPlateCodeFromValue,
} from '../Functions/ide';
import { showInlineLoadingSpinner, showFullScreenLoadingSpinner } from '../loader';
import { useIde } from '../../../../hooks/pages/ide';

// constant
const valueToLanguageDisplayNameMap = getValueToLanguageDisplayNameMap();

// componenets used in large resolutions
const CodeEditor = ({
  id = 'editor', className = '', theme = 'monokai', otherEditorOptions = {}, onload,
}) => {
  useEffect(() => {
    const editor = ace.edit('editor');

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
    editor.on('change', () => {
      setSession('ideInteracted', 'true');
    });

    return () => {
      editor.off('change');
    };
  }, []);

  return (
    <div id={id} className={className}></div>
  );
};

const InputnOutput = ({ className = '' }) => (
  <div className={`input-output-container ${className}`}>
    <textarea id='input-box' className='input-box' placeholder='Enter inputs if any'></textarea>
    <div id='output-box' className='output-box' aria-readonly='true'>
      <FormattedMessage defaultMessage={'Output will be shown here'} description='placeholder'/>
    </div>
  </div>
);

const LanguageSelectorWithBackBtn = ({
  languagesAvailable, onBackBtnClick, onLanguageOptionClick,
}) => (
  <div className='language-selector-with-back-btn'>
  <div className='back-btn-with-title'>
    <button className='back-btn' onClick={onBackBtnClick}>
      <i className="fa fa-arrow-left"></i>
    </button>
    <span className='page-title ml-2'>
      <FormattedMessage defaultMessage={'IDE'} description='page title' />
    </span>
  </div>
  <div className='language-selector-container'>
  <div className="dropdown mr-4">
    <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
      <span className='selected-language-display-name'></span>
      <i className='fa fa-chevron-down dropdown-icon'></i>
    </button>
    <div className="dropdown-menu dropdown-menu-left" id='language-selector-dropdown'>
      {
        Object.keys(languagesAvailable)
          .map((value, index) => <button className={`dropdown-item ${value}-option-btn`} key={index} data-language-value={value} onClick={onLanguageOptionClick}>
            <FormattedMessage defaultMessage={'{languageDisplayName}'} description='language option' values={{ languageDisplayName: languagesAvailable[value] }}/>
          </button>)
      }
    </div>
  </div>
  </div>
</div>
);

// components used in mobile resolution
const MobileInputDrawer = ({ inputBoxId, className = '', onClick = () => {} }) => (
  <div className={`input-box-drawer ${className}`}>
    <button type='button' className='input-draw-btn' onClick={onClick}>
      <FormattedMessage defaultMessage={'Inputs'} description='input draw btn' />
      <i className="fa fa-chevron-up"></i>
    </button>
    <div className='input-box-container'>
      <div className='p-3'>
        <textarea id={inputBoxId} className='input-box' rows={5} placeholder='Enter inputs if any' />
      </div>
    </div>
  </div>
);

const MobileFooterTabs = ({
  className = '', tabTargetIds, tabEventHandlers, onRunCode,
}) => {
  useEffect(() => {
    $('#code-editor-tab').on('show.bs.tab', tabEventHandlers[0].onShow);
    $('#code-editor-tab').on('hide.bs.tab', tabEventHandlers[0].onHide);

    $('#console-tab').on('show.bs.tab', tabEventHandlers[1].onShow);
    $('#console-tab').on('hide.bs.tab', tabEventHandlers[1].onHide);
  }, []);

  const onRunCodeClick = () => {
    $('#console-tab').tab('show');

    onRunCode();
  };

  return (
    <ul className={`nav nav-pills nav-fill ${className}`} id="pills-tab" role="tablist">
    <li className="nav-item" role={'presentation'}>
      <button
        type='button'
        id="code-editor-tab"
        className="footer-tab nav-link active"
        data-toggle="pill"
        data-target={[tabTargetIds[0]]}
        role="tab"
        aria-controls="home"
        aria-selected="true">
        <img className='tab-icon' src='../../../../images/ide/code-icon.svg' alt='tab-icon' />
        <FormattedMessage defaultMessage={'Code'} description='code button text' />
      </button>
    </li>
    <li className="nav-item" role={'presentation'} >
      <button
        type='button'
        id="console-tab"
        className="footer-tab nav-link"
        data-toggle="pill"
        data-target={[tabTargetIds[1]]}
        role="tab"
        aria-controls="console"
        aria-selected="false">
        <img className='tab-icon' src='../../../../images/ide/console-icon.svg' alt='tab-icon' />
        <FormattedMessage defaultMessage={'Console'} description='code button text' />
      </button>
    </li>
    <li className='nav-item' role={'presentation'}>
      <button type='button' role={'button'} className='run-code-btn footer-tab nav-link' onClick={onRunCodeClick}>
        <img className='tab-icon' src='../../../../images/ide/run-icon.svg' alt='tab-icon' />
        <FormattedMessage defaultMessage={'Run'} description='run code button text' />
      </button>
    </li>
  </ul>

  );
};

// common methods for mobile and large resolutions
const updateLanguageSelector = (selectedLanguageNameDisplay, selectedLanguageOption,
  selectedLanguage) => {
  $(selectedLanguageNameDisplay).text(selectedLanguage);
  $('.dropdown-item.active').removeClass('active');
  $(selectedLanguageOption).addClass('active');
};

const updateCodeEditor = (codeEditorId, code, mode) => {
  const currentEditorInstance = ace.edit(codeEditorId);

  if (code) {
    currentEditorInstance.setValue(code);
  }

  if (mode) {
    currentEditorInstance.setOption('mode', `ace/mode/${mode}`);
  }
  setSession('ideInteracted', 'false');
};

const updateOuputBox = (outputBoxId, compilationDetails) => {
  let constructedOutput = '';
  const output = compilationDetails.output ? compilationDetails.output : 'Nil';
  const executionTime = compilationDetails.executionTime ? compilationDetails.executionTime : 'Nil';
  const memory = compilationDetails.memory ? compilationDetails.memory : 'Nil';
  constructedOutput += '<h6>Output: </h6>';
  constructedOutput += `<div><pre>${output}</pre><h6>Execution Time:</h6><pre>${executionTime}</pre><h6>Memory Used: </h6><pre>${memory}</pre></div>`;
  $(outputBoxId).html(constructedOutput);
};

const resetInputAndOutputBox = (inputBoxId, outputBoxId) => {
  $(inputBoxId).val('');
  $(outputBoxId).empty();
  $(outputBoxId).text('Output will be shown here');
};

const onCodeEditorLoad = (editorId) => {
  const previousLanguageValuePromise = getSession('previousLanguageValue');
  const previousSourceCodePromise = getSession('previousSourceCode');

  Promise.all([previousLanguageValuePromise, previousSourceCodePromise]).then((values) => {
    const [previousLanguageValue, previousSourceCode] = values;

    let languageDisplayName;
    let languageMode;
    let languageOptionSelector;

    if (previousLanguageValue && previousSourceCode) {
      languageDisplayName = getLanguageDisplayNameFromValue(previousLanguageValue);
      languageOptionSelector = `.${previousLanguageValue}-option-btn`;
      languageMode = getModeFromValue(previousLanguageValue);

      updateLanguageSelector('.selected-language-display-name', languageOptionSelector, languageDisplayName);
      updateCodeEditor(editorId, previousSourceCode, languageMode);
    } else {
      const defaultLanguageValue = 'python3';
      const boilerPlateCode = getBoilerPlateCodeFromValue(defaultLanguageValue);

      languageDisplayName = getLanguageDisplayNameFromValue(defaultLanguageValue);
      languageOptionSelector = `.${defaultLanguageValue}-option-btn`;
      languageMode = getModeFromValue(defaultLanguageValue);

      updateLanguageSelector('.selected-language-display-name', languageOptionSelector, languageDisplayName);
      updateCodeEditor(editorId, boilerPlateCode, languageMode);
    }
  });
};

const onLanguageOptionClick = async (e, editorId, inputBoxId, outputBoxId) => {
  const jTarget = $(e.target);
  const ideInteracted = await getSession('ideInteracted');

  const selectedLanguageNameDisplay = '.selected-language-display-name';
  const languageOption = jTarget;
  const languageDisplayName = jTarget.text();
  const languageValue = jTarget.attr('data-language-value');

  updateLanguageSelector(selectedLanguageNameDisplay, languageOption, languageDisplayName);
  resetInputAndOutputBox(inputBoxId, outputBoxId);

  // if ide interacted
  if (ideInteracted === 'true') {
    $('.keep-code-changes-modal').modal({
      backdrop: 'static',
      keyboard: false,
    });
  } else {
    // update code editor
    const boilerPlateCode = getBoilerPlateCodeFromValue(languageValue);
    const mode = getModeFromValue(languageValue);

    updateCodeEditor(editorId, boilerPlateCode, mode);
  }
};

const onKeepCodeChanges = (editorId) => {
  const selectedLanguageValue = $('.dropdown-item.active').attr('data-language-value');
  const languageMode = getModeFromValue(selectedLanguageValue);

  updateCodeEditor(editorId, false, languageMode);
  $('.keep-code-changes-modal').modal('hide');
};

const onDontKeepCodeChanges = (editorId) => {
  const selectedLanguageValue = $('.dropdown-item.active').attr('data-language-value');
  const boilerPlateCode = getBoilerPlateCodeFromValue(selectedLanguageValue);
  const mode = getModeFromValue(selectedLanguageValue);

  updateCodeEditor(editorId, boilerPlateCode, mode);
  $('.keep-code-changes-modal').modal('hide');
};

// ide component
const Ide = () => {
  pageInit('ide-container', 'IDE');
  // constants
  const EDITORID = 'editor';
  const INPUTBOXID = 'input-box';
  const OUTPUTBOXID = 'output-box';

  // hooks
  const runCodeRequest = useIde();
  const getRecapchaToken = useRecapchav3();
  const navigate = useNavigate();

  const device = getDevice();

  // methods
  const runCode = (sourceCode, input, compilerId) => getRecapchaToken({ action: 'runCode' }).then((token) => {
    const recaptchaVersion = 3;

    return runCodeRequest(sourceCode, input, compilerId, token, recaptchaVersion);
  });

  const mobileRunBtnClickHandler = () => {
    const hideFullScreenLoader = showFullScreenLoadingSpinner();

    const input = $(`#${INPUTBOXID}`).val();
    const sourceCode = ace.edit(EDITORID).getValue();
    const selectedLanguageValue = $('.dropdown-item.active').attr('data-language-value');
    const compilerId = getCompilerIdFromValue(selectedLanguageValue);

    setSession('previousSourceCode', sourceCode);
    setSession('previousLanguageValue', selectedLanguageValue);

    runCode(sourceCode, input, compilerId).then((response) => {
      const parsedData = JSON.parse(response);

      if (parsedData.status === 'success') {
        hideFullScreenLoader();
        updateOuputBox(`#${OUTPUTBOXID}`, parsedData.compilationDetails);
      } else if (parsedData.status === 'error') {
        const err = new Error(parsedData.message);
        err.cause = 'postData';

        throw err;
      }
    }).catch((err) => {
      hideFullScreenLoader();
      if (err.cause === 'postData') {
        console.log('Something went wrong! Please try again');
      } else {
        console.error(err);
      }
    });
  };

  const desktopRunBtnClickHandler = () => {
    const hideInLineLoadingSpinner = showInlineLoadingSpinner('.run-code-btn');

    const input = $(`#${INPUTBOXID}`).val();
    const sourceCode = ace.edit(EDITORID).getValue();
    const selectedLanguageValue = $('.dropdown-item.active').attr('data-language-value');
    const compilerId = getCompilerIdFromValue(selectedLanguageValue);

    setSession('previousSourceCode', sourceCode);
    setSession('previousLanguageValue', selectedLanguageValue);

    runCode(sourceCode, input, compilerId).then((response) => {
      const parsedData = JSON.parse(response);

      if (parsedData.status === 'success') {
        hideInLineLoadingSpinner();
        updateOuputBox(`#${OUTPUTBOXID}`, parsedData.compilationDetails);
      } else if (parsedData.status === 'error') {
        const err = new Error(parsedData.message);
        err.cause = 'postData';

        throw err;
      }
    }).catch((err) => {
      hideInLineLoadingSpinner();
      if (err.cause === 'postData') {
        console.log('Something went wrong! Please try again');
      } else {
        console.error(err);
      }
    });
  };

  return (
    <>
      {
        device === 'mobile' && <div className='mobile-container'>
          <LanguageSelectorWithBackBtn
            languagesAvailable={valueToLanguageDisplayNameMap}
            onBackBtnClick={() => navigate(-1)}
            onLanguageOptionClick={
              (e) => onLanguageOptionClick(e, EDITORID, `#${INPUTBOXID}`, `#${OUTPUTBOXID}`)
            }
          />
          <div className='container-fluid'>
          <div className="tab-content" id="pills-tabContent">
            <div className="editor-container tab-pane fade show active" id="code-editor-tabpanel" role="tabpanel" aria-labelledby="code-editor-tab">
              <CodeEditor id={EDITORID} onload={onCodeEditorLoad} />
            </div>
            <div className="output-box-container tab-pane fade" id="console-tabpanel" role="tabpanel" aria-labelledby="console-tab">
              <div className='output-box' id={OUTPUTBOXID} placeholder='output will appear here'>
                <FormattedMessage defaultMessage={'Output will appear here'} description='output placeholder'/>
              </div>
            </div>
          </div>
            <footer>
              <MobileInputDrawer
                inputBoxId={INPUTBOXID}
                onClick={() => {
                  $('.input-box-container').toggleClass('show');
                  $('.fa-chevron-up').toggleClass('rotate180');
                }}/>
              <MobileFooterTabs
                tabTargetIds={['#code-editor-tabpanel', '#console-tabpanel']}
                onRunCode={mobileRunBtnClickHandler}
                tabEventHandlers={[
                  {
                    onShow: () => {
                      $('.input-box-drawer').show();
                    },
                    onHide: () => {
                      $('.input-box-drawer').hide();
                    },
                  },
                  {
                    onShow: () => { },
                    onHide: () => { },
                  },
                ]} />
            </footer>
          </div>
        </div>
      }
      {
        device === 'desktop' && <div className='desktop-container'>
          <LanguageSelectorWithBackBtn
            languagesAvailable={valueToLanguageDisplayNameMap}
            onBackBtnClick={() => navigate(-1)}
            onLanguageOptionClick={(e) => {
              onLanguageOptionClick(e, EDITORID, `#${INPUTBOXID}`, `#${OUTPUTBOXID}`);
            }} />
          <div className='container-fluid code-editor-with-input-output'>
            <div className='editor-container'>
              <button type='button' className='toggle-full-width-editor' onClick={(e) => {
                $(e.target).children('i').toggleClass('rotate180');
                $('.editor-container').toggleClass('full-width');
                $('.input-output-container').toggleClass('hide');
              }}>
                <i className='fa fa-chevron-right'></i>
              </button>
              <CodeEditor id={EDITORID} onload={onCodeEditorLoad} />
              <button type='button' id='runCodeBtn' className='run-code-btn btn btn-primary' onClick={desktopRunBtnClickHandler}>
                <span>
                  <FormattedMessage defaultMessage='Run' description='Run code button' />
                </span>
                <i className="fa fa-play"></i>
              </button>
            </div>
            <InputnOutput />
         </div>
        </div>
      }
      <div className="modal keep-code-changes-modal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <h4 className='title text-center mb-5'>
              <FormattedMessage defaultMessage={'Keep the code changes'} description='keep the code changes modal title'/>
            </h4>
            <div className='yes-no-btn-container'>
              <button type='button' className='btn btn-outline-primary' onClick={() => onDontKeepCodeChanges(EDITORID)}>
                <FormattedMessage defaultMessage={'No'} description='no button text'/>
              </button>
              <button type='button' className='btn btn-primary' onClick={() => onKeepCodeChanges(EDITORID)}>
                <FormattedMessage defaultMessage={'Yes'} description='yes button text'/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ide;
