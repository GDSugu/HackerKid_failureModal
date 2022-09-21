import React, { useEffect } from 'react';
import ace from 'ace-builds';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import '../../../stylesheets/common/pages/ide/style.scss';
import { FormattedMessage } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import { $, pageInit } from '../framework';
import { getDevice } from '../../../../hooks/common/utlis';
import useRecapchav3 from '../../../../hooks/pages/recapchav3';
import { getSession, setSession } from '../../../../hooks/common/framework';
import {
  getValueToLanguageDisplayNameMap, getLanguageDisplayNameFromValue, getModeFromValue,
  getCompilerIdFromValue,
  getBoilerPlateCodeFromValue,
} from '../Functions/ide';
import { showFullScreenLoadingSpinner } from '../loader';
import { useIde } from '../../../../hooks/pages/ide';

// constant
const valueToLanguageDisplayNameMap = getValueToLanguageDisplayNameMap();
const defaultLanguageValue = 'python3';
let ideInteracted;

// componenets used in large resolutions
const CodeEditor = ({
  id = 'editor', className = '', theme = 'monokai', otherEditorOptions = {}, onload, onChange, onClick,
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

const InputnOutput = ({ className = '', inputBoxId, outputBoxId }) => (
  <div className={`input-output-container ${className}`}>
    <textarea id={inputBoxId} className='input-box' placeholder='Enter inputs if any'></textarea>
    <div id={outputBoxId} className='output-box' aria-readonly='true'>
      <FormattedMessage defaultMessage={'Output will be shown here'} description='placeholder'/>
    </div>
  </div>
);

const LanguageSelector = ({
  className = '', dropdownId, selectedLanguageDisplayId, onLanguageOptionClick, onDropDownToggleBtnClick = () => {},
  languagesAvailable, onLoad,
}) => {
  useEffect(() => {
    onLoad(selectedLanguageDisplayId);
  }, []);

  return (
  <div className={`language-selector-container ${className}`}>
  <div className='dropdown mr-4'>
    <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false" onClick={onDropDownToggleBtnClick}>
      <span className='overline' id={selectedLanguageDisplayId}></span>
      <i className='fa fa-chevron-down dropdown-icon'></i>
    </button>
      <div className="dropdown-menu dropdown-menu-left" id={dropdownId}>
      {
        Object.keys(languagesAvailable)
          .map((value, index) => <button className={`dropdown-item ${value}-option-btn overline`} key={index} data-language-value={value} onClick={onLanguageOptionClick}>
            <FormattedMessage defaultMessage={'{languageDisplayName}'} description='language option' values={{ languageDisplayName: languagesAvailable[value] }}/>
          </button>)
      }
    </div>
  </div>
  </div>
  );
};

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

  const onRunCodeClick = (e) => {
    $('#console-tab').tab('show');

    onRunCode(e);
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
const updateLanguageSelector = (selectedLangugeDisplayId, selectedLanguageOption,
  selectedLanguage) => {
  $(selectedLangugeDisplayId).text(selectedLanguage);
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
  ideInteracted = false;
};

const insertConsoleLine = (outputBoxId, lineTextContent) => {
  const preTag = document.createElement('pre');
  preTag.className = 'console-line';
  const img = document.createElement('img');

  img.alt = 'console line indicator';
  img.src = '../../../../images/ide/console-line-indicator-arrow.svg';

  const lineTextContentSpan = document.createElement('span');
  lineTextContentSpan.innerText = lineTextContent;
  lineTextContentSpan.className = 'console-line-text-content';

  $(preTag).append($(img));
  $(preTag).append($(lineTextContentSpan));

  $(outputBoxId).append($(preTag));
};

const resetInputAndOutputBox = (inputBoxId, outputBoxId) => {
  $(inputBoxId).val('');
  $(outputBoxId).empty();
  $(outputBoxId).text('Output will be shown here');
};

const closeInputDrawer = () => {
  if ($('.input-box-container').hasClass('show')) {
    $('.input-box-container').removeClass('show');
  }
};

const closeLanguageSelector = () => {
  if ($('#language-selector-dropdown').hasClass('show')) {
    $('#language-selector-dropdown').dropdown('hide');
  }
};

// methods - event handlers
const onCodeEditorChange = () => {
  ideInteracted = true;
};

const onCodeEditorClick = () => {
  closeInputDrawer();
  closeLanguageSelector();
};

const onCodeEditorLoad = (editorId) => {
  const previousLanguageValuePromise = getSession('previousLanguageValue');
  const previousSourceCodePromise = getSession('previousSourceCode');

  Promise.all([previousLanguageValuePromise, previousSourceCodePromise]).then((values) => {
    const [previousLanguageValue, previousSourceCode] = values;

    let languageMode;
    let code;

    if (previousLanguageValue && previousSourceCode) {
      languageMode = getModeFromValue(previousLanguageValue);
      code = previousSourceCode;
    } else {
      languageMode = getModeFromValue(defaultLanguageValue);
      code = getBoilerPlateCodeFromValue(defaultLanguageValue);
    }
    updateCodeEditor(editorId, code, languageMode);
  });
};

const onInputDrawerToggleBtnClick = () => {
  $('.input-box-container').toggleClass('show');
  $('.input-draw-btn .fa-chevron-up').toggleClass('rotate180');
  closeLanguageSelector();
};

const onLanguageSelectorLoad = (selectedLanguageDisplayId) => {
  const previousLanguageValuePromise = getSession('previousLanguageValue');

  previousLanguageValuePromise.then((previousLanguageValue) => {
    let languageDisplayName;
    let languageOptionToSelectSelector;
    if (previousLanguageValue) {
      languageDisplayName = getLanguageDisplayNameFromValue(previousLanguageValue);
      languageOptionToSelectSelector = `.${previousLanguageValue}-option-btn`;
    } else {
      languageDisplayName = getLanguageDisplayNameFromValue(defaultLanguageValue);
      languageOptionToSelectSelector = `.${defaultLanguageValue}-option-btn`;
    }

    updateLanguageSelector(
      `#${selectedLanguageDisplayId}`,
      languageOptionToSelectSelector,
      languageDisplayName,
    );
  });
};

const onLanguageOptionClick = async (e, editorId, inputBoxId, outputBoxId,
  selectedLanguageDisplayId) => {
  const jTarget = $(e.target);

  const languageOption = jTarget;
  const languageDisplayName = jTarget.text();
  const languageValue = jTarget.attr('data-language-value');

  updateLanguageSelector(selectedLanguageDisplayId, languageOption, languageDisplayName);
  resetInputAndOutputBox(inputBoxId, outputBoxId);

  // if ide interacted
  if (ideInteracted) {
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
  // constants
  const EDITORID = 'editor';
  const INPUTBOXID = 'input-box';
  const OUTPUTBOXID = 'output-box';
  const SELECTEDLANGUAGEDISPLAYID = 'selected-language-display-name';
  const LANGUAGESELECTORDROPDOWNID = 'language-selector-dropdown';
  const device = getDevice();

  pageInit(device === 'mobile' ? 'ide-container mobile-container' : 'ide-container desktop-container', 'IDE');
  // hooks
  const runCodeRequest = useIde();
  const getRecapchaToken = useRecapchav3();
  const navigate = useNavigate();

  // methods
  const runCode = (sourceCode, input, compilerId) => getRecapchaToken({ action: 'runCode' }).then((token) => runCodeRequest(sourceCode, input, compilerId, token));

  const runCodeBtnClickHandler = (e) => {
    $(`#${OUTPUTBOXID}`).html('');
    insertConsoleLine(`#${OUTPUTBOXID}`, 'Compiling your code...');
    $(e.target).attr('disabled', 'true');

    const input = $(`#${INPUTBOXID}`).val();
    const sourceCode = ace.edit(EDITORID).getValue();
    const selectedLanguageValue = $('.dropdown-item.active').attr('data-language-value');
    const compilerId = getCompilerIdFromValue(selectedLanguageValue);

    setSession('previousSourceCode', sourceCode);
    setSession('previousLanguageValue', selectedLanguageValue);

    runCode(sourceCode, input, compilerId).then((response) => {
      const parsedData = JSON.parse(response);

      $(e.target).removeAttr('disabled');
      if (parsedData.status === 'success') {
        insertConsoleLine(`#${OUTPUTBOXID}`, parsedData.compilationDetails.output.trim());
      } else if (parsedData.status === 'error') {
        const err = new Error(parsedData.message);
        err.cause = 'postData';

        throw err;
      }
    }).catch((err) => {
      $(e.target).removeAttr('disabled');
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
        device === 'mobile' && <div className='main-content to-show-loading-container'>
          <nav id='mobile-nav'>
            <div className='row justify-content-between align-items-center no-gutters'>
              <div className='logo'>
                hackerkid logo
              </div>
              <Link to={'/dashboard'} className={'dashboard-link'}>
              <div className="nav-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke='#212427' xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="nav-bar"></div>
            </Link>
            </div>
          </nav>
          <div className='container-fluid'>
          <div className='language-selector-with-back-btn'>
            <div className='back-btn-with-title overline-bold'>
              <button className='back-btn' onClick={() => navigate(-1)}>
                <i className="fa fa-arrow-left"></i>
              </button>
              <span className='page-title ml-2 overline-bold'>
                <FormattedMessage defaultMessage={'IDE'} description='page title' />
              </span>
            </div>
              <LanguageSelector
                onLoad = {onLanguageSelectorLoad}
                dropdownId={LANGUAGESELECTORDROPDOWNID}
                selectedLanguageDisplayId={SELECTEDLANGUAGEDISPLAYID}
                languagesAvailable={valueToLanguageDisplayNameMap}
                onDropDownToggleBtnClick={closeInputDrawer}
                onLanguageOptionClick={(e) => onLanguageOptionClick(e, `#${EDITORID}`, `#${INPUTBOXID}`, `#${OUTPUTBOXID}`)}
              />
          </div>
          <div className="tab-content" id="pills-tabContent">
            <div className="editor-container tab-pane fade show active" id="code-editor-tabpanel" role="tabpanel" aria-labelledby="code-editor-tab">
              <CodeEditor
                id={EDITORID}
                onload={onCodeEditorLoad}
                onChange={onCodeEditorChange}
                onClick={onCodeEditorClick} />
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
                onClick={onInputDrawerToggleBtnClick}/>
              <MobileFooterTabs
                tabTargetIds={['#code-editor-tabpanel', '#console-tabpanel']}
                onRunCode={runCodeBtnClickHandler}
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
        device === 'desktop' && <div className='main-content to-show-loading-container'>
          <div className='language-selector-with-back-btn'>
            <div className='back-btn-with-title overline-bold'>
              <button className='back-btn' onClick={() => navigate(-1)}>
                <i className="fa fa-arrow-left"></i>
              </button>
              <span className='page-title ml-2 overline-bold'>
                <FormattedMessage defaultMessage={'IDE'} description='page title' />
              </span>
            </div>
            <LanguageSelector
                onLoad={onLanguageSelectorLoad}
                dropdownId={LANGUAGESELECTORDROPDOWNID}
                selectedLanguageDisplayId={SELECTEDLANGUAGEDISPLAYID}
                languagesAvailable={valueToLanguageDisplayNameMap}
                onLanguageOptionClick={(e) => onLanguageOptionClick(e, `#${EDITORID}`, `#${INPUTBOXID}`, `#${OUTPUTBOXID}`)}
              />
          </div>
          <div className='container-fluid code-editor-with-input-output'>
            <div className='editor-container'>
              <button type='button' className='toggle-full-width-editor' onClick={(e) => {
                $(e.target).children('i').toggleClass('rotate180');
                $('.editor-container').toggleClass('full-width');
                $('.input-output-container').toggleClass('hide');
              }}>
                <i className='fa fa-chevron-right'></i>
              </button>
              <CodeEditor
                id={EDITORID}
                onload={onCodeEditorLoad}
                onChange={onCodeEditorChange}
                onClick={onCodeEditorClick}/>
              <button type='button' id='runCodeBtn' className='run-code-btn btn btn-primary' onClick={runCodeBtnClickHandler}>
                <span>
                  <FormattedMessage defaultMessage='Run' description='Run code button' />
                </span>
                <i className="fa fa-play"></i>
              </button>
            </div>
            <InputnOutput inputBoxId={INPUTBOXID} outputBoxId={OUTPUTBOXID} />
         </div>
        </div>
      }
      <div className="modal keep-code-changes-modal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <h4 className='title text-center mb-5'>
              <FormattedMessage defaultMessage={'Keep the code changes?'} description='keep the code changes modal title'/>
            </h4>
            <div className='yes-no-btn-container'>
              <button type='button' className='btn btn-outline-primary overline' onClick={() => onDontKeepCodeChanges(EDITORID)}>
                <FormattedMessage defaultMessage={'No'} description='no button text'/>
              </button>
              <button type='button' className='btn btn-primary overline' onClick={() => onKeepCodeChanges(EDITORID)}>
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
