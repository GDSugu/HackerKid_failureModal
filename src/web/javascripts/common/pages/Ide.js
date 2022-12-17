import React, { useEffect } from 'react';
import '../../../stylesheets/common/pages/ide/style.scss';
import ace from 'ace-builds';
import { FormattedMessage } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import { $, pageInit } from '../framework';
import { getDevice } from '../../../../hooks/common/utlis';
import useRecapchav3 from '../../../../hooks/pages/recapchav3';
import { getSession, setSession } from '../../../../hooks/common/framework';
import {
  getModeFromValue,
  getCompilerIdFromValue,
  getBoilerPlateCodeFromValue,
} from '../Functions/ide';
import { useIde } from '../../../../hooks/pages/ide';
import LanguageSelector from '../components/LanguageSelector';
import CodeEditor from '../components/Ide';

// constant
const defaultLanguageValue = 'python3';
let ideInteracted;
// componenets used in large resolutions
const InputnOutput = ({
  className = '', onInputBoxChange, input, output,
}) => (
  <div className={`input-output-container ${className}`}>
    <textarea
      className='input-box'
      placeholder='Enter inputs if any'
      value={input}
      onChange={onInputBoxChange}
    ></textarea>
    <div className='output-box' aria-readonly='true'>
    {
      !output && <FormattedMessage defaultMessage={'Output will appear here'} description='output placeholder'/>
    }
    {
      output && output.map((line, idx) => <pre key={idx} className='console-line'>
        <img
          src='../../../../images/ide/console-line-indicator-arrow.svg'
          alt='console-line-arrow' />
        <span className='console-line-text-content'>
        <FormattedMessage
          defaultMessage={'{line}'}
          description={'console line'}
          values={{ line }}
        />
        </span>
      </pre>)
      }
    </div>
  </div>
);

// components used in mobile resolution
const MobileInputDrawer = ({
  className = '', onClick = () => {}, onInputBoxChange, input,
}) => (
  <div className={`input-box-drawer ${className}`}>
    <button type='button' className='input-draw-btn' onClick={onClick}>
      <FormattedMessage defaultMessage={'Inputs'} description='input draw btn' />
      <i className="fa fa-chevron-up"></i>
    </button>
    <div className='input-box-container'>
      <div className='p-3'>
        <textarea
          className='input-box'
          rows={5}
          placeholder='Enter inputs if any'
          value={input}
          onChange={onInputBoxChange}
        />
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

const closeInputDrawer = () => {
  if ($('.input-box-container').hasClass('show')) {
    $('.input-box-container').removeClass('show');
    $('.input-draw-btn i').removeClass('rotate180');
  }
};

const closeLanguageSelector = () => {
  if ($('#language-selector-dropdown').hasClass('show')) {
    $('#language-selector-dropdown').dropdown('hide');
  }
};

// ide component
const Ide = () => {
  // constants
  const EDITORID = 'editor';
  const device = getDevice();

  pageInit(device === 'mobile' ? 'ide-container mobile-container' : 'ide-container desktop-container', 'IDE');
  // hooks
  const { runCodeRequest, state, setState } = useIde();
  const getRecapchaToken = useRecapchav3();
  const navigate = useNavigate();

  // methods - event handlers
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

  const onCodeEditorClick = () => {
    closeInputDrawer();
    closeLanguageSelector();
  };

  const onCodeEditorChange = () => {
    ideInteracted = true;

    setState((prev) => {
      const editor = ace.edit(EDITORID);

      return {
        ...prev,
        writtenCode: editor.getValue(),
      };
    });
  };

  const onLanguageSelectorOpen = () => {
    closeInputDrawer();
  };

  const onLanguageSelectorLoad = () => {
    const previousLanguageValuePromise = getSession('previousLanguageValue');

    previousLanguageValuePromise.then((previousLanguageValue) => {
      let selectedLanguageValue;

      if (previousLanguageValue) {
        selectedLanguageValue = previousLanguageValue;
      } else {
        selectedLanguageValue = defaultLanguageValue;
      }

      setState((prev) => ({ ...prev, selectedLanguageValue }));
    });
  };

  const onLanguageOptionClick = (e) => {
    const jTarget = $(e.target);

    const languageValue = jTarget.attr('data-language-value');

    setState((prev) => ({ ...prev, selectedLanguageValue: languageValue }));

    if (state.input || state.output) {
      setState((prev) => ({ ...prev, input: '', output: '' }));
    }
    // if ide interacted
    if (ideInteracted === true) {
      $('.keep-code-changes-modal').modal({
        backdrop: 'static',
        keyboard: false,
      });
    } else if (ideInteracted === false) {
    // update code editor
      const boilerPlateCode = getBoilerPlateCodeFromValue(languageValue);
      const mode = getModeFromValue(languageValue);

      updateCodeEditor(EDITORID, boilerPlateCode, mode);
    }
  };

  const onInputDrawerToggleBtnClick = () => {
    $('.input-box-container').toggleClass('show');
    $('.input-draw-btn .fa-chevron-up').toggleClass('rotate180');
    closeLanguageSelector();
  };

  const onInputBoxChange = (e) => {
    const newValue = e.target.value;

    setState((prev) => ({ ...prev, input: newValue }));
  };

  const onKeepCodeChanges = (editorId) => {
    const languageMode = getModeFromValue(state.selectedLanguageValue);

    updateCodeEditor(editorId, false, languageMode);
    $('.keep-code-changes-modal').modal('hide');
  };

  const onDontKeepCodeChanges = (editorId) => {
    const boilerPlateCode = getBoilerPlateCodeFromValue(state.selectedLanguageValue);
    const mode = getModeFromValue(state.selectedLanguageValue);

    updateCodeEditor(editorId, boilerPlateCode, mode);
    $('.keep-code-changes-modal').modal('hide');
  };

  const runCode = (sourceCode, input, compilerId) => getRecapchaToken({ action: 'runCode' }).then((token) => runCodeRequest(sourceCode, input, compilerId, token));

  const runCodeBtnClickHandler = (e) => {
    $(e.target).attr('disabled', 'true');

    setState((prev) => ({ ...prev, output: ['Compiling your code...'] }));

    const { input } = state;
    const sourceCode = state.writtenCode;
    const { selectedLanguageValue } = state;
    const compilerId = getCompilerIdFromValue(selectedLanguageValue);

    setSession('previousSourceCode', sourceCode);
    setSession('previousLanguageValue', selectedLanguageValue);

    runCode(sourceCode, input, compilerId).then((response) => {
      const parsedData = JSON.parse(response);

      $(e.target).removeAttr('disabled');
      if (parsedData.status === 'success') {
        setState((prev) => ({
          ...prev,
          output: [...prev.output, parsedData.compilationDetails.output.trim()],
        }));
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
                selectedLanguageValue={state.selectedLanguageValue}
                onLoad = {onLanguageSelectorLoad}
                onDropDownOpen={onLanguageSelectorOpen}
                onLanguageOptionClick={(e) => onLanguageOptionClick(e)}
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
              <div className='output-box'>
                {
                  !state.output.length && <FormattedMessage defaultMessage={'Output will appear here'} description='output placeholder'/>
                }
                {
                  state.output.length && state.output.map((line, idx) => <pre key={idx} className='console-line'>
                      <img
                        src='../../../../images/ide/console-line-indicator-arrow.svg'
                        alt='console-line-arrow' />
                      <span className='console-line-text-content'>
                      <FormattedMessage
                        defaultMessage={'{line}'}
                        description={'console line'}
                        values={{ line }}
                      />
                      </span>
                  </pre>)
                }
              </div>
            </div>
          </div>
            <footer>
              <MobileInputDrawer
                input={state.input}
                setState={setState}
                onClick={onInputDrawerToggleBtnClick}
                onInputBoxChange={onInputBoxChange}
              />
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
                selectedLanguageValue={state.selectedLanguageValue}
                onLoad={onLanguageSelectorLoad}
                onDropDownOpen={onLanguageSelectorOpen}
                onLanguageOptionClick={(e) => onLanguageOptionClick(e)}
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
            <InputnOutput
              input={state.input}
              onInputBoxChange={onInputBoxChange}
              output={state.output} />
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
