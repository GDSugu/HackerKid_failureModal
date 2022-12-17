import React, { useState, useRef, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import Ace from 'react-ace';
import '../../../stylesheets/common/pages/codekata/style.scss';
import { $, pageInit, pathNavigator } from '../framework';
import TurtleNavBar from '../components/TurtleNavBar';
import Img from '../components/Img';
import useRootPageState from '../../../../hooks/pages/root';
import useCodekata from '../../../../hooks/pages/codekata';
import GameLevelComponent from '../components/GameLevelComponent';
import Modal from '../components/Modal';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

const resizeHandler = (nav = 'nav', selector) => {
  try {
    const navHeight = document.querySelector(nav).offsetHeight;
    document.querySelector(
      selector,
    ).style.height = `calc(100vh - ${navHeight}px)`;
  } catch (e) {
    console.log(e);
  }
};

const updateHistory = (response) => {
  try {
    const { virtualId } = response.questionObject;
    window.history.replaceState({}, '', `/codekata/${virtualId}`);
  } catch (error) {
    console.log(error);
  }
};

const CodekataHomeContainer = ({ changeRoute }) => {
  pageInit('codekata-home-container', 'Codekata');

  useEffect(() => {
    window.addEventListener('resize', () => resizeHandler('nav', '.turtle-frame'));
    const resizeTimeout = setTimeout(() => {
      resizeHandler('nav', '.turtle-frame');
    }, 300);
    return () => clearTimeout(resizeTimeout);
  }, []);

  return (
    <>
      <div className="turtle-frame">
        <div className="turtle-card-container">
          <div className="turtle-card">
            <div className="card-container">
              <h1 className="gameTitle">
                <FormattedMessage
                  defaultMessage={'Codekata'}
                  description={'Codekata title'}
                />
              </h1>
              <p className="gameDesc">
                <FormattedMessage
                  defaultMessage={
                    'Learn to code while drawing, and code along to see the output right on your screens. Everyone draws to express themselves the best! Why not channelize that to learn?'
                  }
                  description={'Codekata description'}
                />
              </p>
            </div>
          </div>
          <button
            className="btn btn-block gameBtn"
            onClick={() => changeRoute('codekataGame')}>
            <p className="gameBtnDesc">
              <FormattedMessage
                defaultMessage={'Start Playing'}
                description={'Play button'}
              />
            </p>
          </button>
        </div>
        <div className="turtle-mob-card">
          <div className="turtle-title">
            <h1 className="gameTitle">
              <FormattedMessage
                defaultMessage={'Codekata'}
                description={'Turtle title'}
              />
            </h1>
          </div>
          <div className="turtle-actions">
            <div className="d-flex align-items-center">
              {/* <a href="../../"
              className="btn btn-transparent turtle-action-btn turtle-audio-btn">
              <Img src='../../../../images/games/gameAudio.png' alt='Game Audio' />
            </a> */}
              <button
                className="btn btn-transparent turtle-action-btn turtle-play-btn"
                onClick={() => changeRoute('codekataGame')}>
                <div className="play-btn-container">
                  <Img
                    src="../../../../images/games/gamePlay.png"
                    className="play-btn-img"
                    alt="Game Leaderboard"
                  />
                  <p>
                    <FormattedMessage
                      defaultMessage={'PLAY'}
                      description={'Play button'}
                    />
                  </p>
                </div>
              </button>
              {/* <a href=""
              className="btn btn-transparent turtle-action-btn turtle-leaderboard-btn">
              <Img src='../../../../images/games/gameLeaderboard.png' alt='Game Leaderboard' />
            </a> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CodekataDesktopContainer = ({
  languages,
  questionObject,
  templete,
  getLanguageId,
  codeRun,
  codeSubmit,
  device,
  questionList,
}) => {
  useEffect(() => {
    const totalHeight = $(window).height();
    if (device === 'desktop') {
      const problemCont = document.querySelector('.problem-statment-cont');
      const resizeob = new ResizeObserver((entries) => {
        const rect = entries[0].contentRect;
        const { height } = rect;
        $('.output-height').height(parseInt(totalHeight - (height + 198), 10));
      });
      resizeob.observe(problemCont);
    }
  });
  const [selectedLanguage, setLanguage] = useState('PYTHON 3');
  const [inputVal, setInput] = useState(templete('PYTHON 3'));
  const [output, setOutput] = useState('dsajdksa');
  const changeLoag = (selectedLang) => {
    setInput(templete(selectedLang));
    import(
      `ace-builds/src-noconflict/mode-${getLanguageId(selectedLang)}`
    ).then(() => {
      setLanguage(selectedLang);
    });
  };
  const editorRef = useRef();
  const inputRef = useRef();

  const runCode = () => {
    const inputValue = (device === 'desktop') && inputRef.current.value;
    $('#loader').show();
    const editorCode = editorRef.current.editor.getValue();
    const reqData = { lang: selectedLanguage, code: editorCode };
    if (inputValue && inputValue !== '') {
      reqData.input = inputValue;
    }
    setInput(editorCode);
    codeRun(reqData).then((res) => {
      if (device === 'desktop') {
        $('.collapse').collapse();
      } else {
        $('.outputModal').modal('show');
      }
      setOutput(res.output);
      $('#loader').hide();
    });
  };

  const clickRefresh = () => {
    setOutput(false);
  };

  const submitCode = () => {
    const editorCode = editorRef.current.editor.getValue();
    codeSubmit({
      code: editorCode,
      lang: selectedLanguage,
      questionId: questionObject.questionId,
    }).then((res) => {
      if (res.passedAllTestCase) {
        if (questionList.length > questionObject.virtualId) {
          pathNavigator(`codekata/${questionObject.virtualId + 1}`);
        }
      }
    });
  };

  const openSlider = () => {
    $('.outputModal').modal('show');
  };

  const closeSlider = () => {
    $('.outputModal').modal('hide');
  };

  return device === 'desktop' ? (
    <div className="container-fluid pt-3 px-3">
      <div className="row">
        <div className="col-6">
          <div>
            <div className="code-container">
              <div>
                <div className="language-cont">
                  <select
                    className="language-select"
                    onChange={(item) => changeLoag(item.target.value)}
                    defaultValue={'PYTHON 3'}>
                    {languages.map((lang, index) => (
                      <option value={lang} key={index}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                <Ace
                  ref={editorRef}
                  mode={getLanguageId(selectedLanguage)}
                  theme="monokai"
                  width="100%"
                  name="codeEditor"
                  // defaultValue={}
                  value={inputVal}
                  setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    scrollPastEnd: true,
                  }}
                />
                <button className="btn btn-primary run-btn" onClick={runCode}>
                  <FormattedMessage
                    defaultMessage={'Run'}
                    description={'Code Run button'}
                  />
                  <svg
                    className="play-icon"
                    width="16"
                    height="19"
                    viewBox="0 0 16 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15 7.76795C16.3333 8.53775 16.3333 10.4623 15 11.2321L3 18.1603C1.66667 18.9301 1.01267e-06 17.9678 1.07997e-06 16.4282L1.68565e-06 2.5718C1.75295e-06 1.0322 1.66667 0.0699456 3 0.839746L15 7.76795Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="input-container">
              <h5 className="input-head">
                <FormattedMessage defaultMessage={'Additional Inputs'} />
              </h5>
              <textarea ref={inputRef} className="input-textarea" />
            </div>
          </div>
        </div>
        <div className="col-6 right-cont">
          <div className="problem-statment-cont">
            <div
              className="d-flex justify-content-between align-items-center"
              data-toggle="collapse"
              data-target="#problem-cont"
              aria-expanded="true"
              aria-controls="collapseTwo"
              id="problem-head">
              <h5 className="mb-0 problem-statment-head">
                <FormattedMessage
                  defaultMessage={'Problem Statement:'}
                  description={'Heading of problem statement'}
                />
              </h5>
              <svg
                width="16"
                height="10"
                viewBox="0 0 16 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14 2L8 8L2 2"
                  stroke="#212527"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              className="collapse show my-2"
              id="problem-cont"
              aria-labelledby="problem-cont"
              data-parent="#problem-head">
              <h5>
                <FormattedMessage
                  defaultMessage={'{head}'}
                  description={'Heading of problem statement'}
                  values={{ head: questionObject.questionDescription }}
                />
              </h5>
              <div className="mt-3 input-description">
                <h5>
                  <FormattedMessage
                    defaultMessage={'Input Description:'}
                    description={'description of problem statement'}
                  />
                </h5>
                <h5>
                  <FormattedMessage
                    defaultMessage={'{description}'}
                    description={'description of problem statement'}
                    values={{ description: questionObject.inputDescription }}
                  />
                </h5>
              </div>
              <div className="mt-3 output-description">
                <h5>
                  <FormattedMessage
                    defaultMessage={'Output Description:'}
                    description={'description of output'}
                  />
                </h5>
                <h5>
                  <FormattedMessage
                    defaultMessage={'{description}'}
                    description={'description of output'}
                    values={{ description: questionObject.outputDescription }}
                  />
                </h5>
              </div>
              <div className="mt-3 sample-input">
                <h5>
                  <FormattedMessage
                    defaultMessage={'Sample Input:'}
                    description={'Sample Input'}
                  />
                </h5>
                {questionObject.sampleIO
                  && questionObject.sampleIO.map((item, index) => (
                    <h5 key={index}>
                      <FormattedMessage
                        defaultMessage={'{item}'}
                        description={'Sample Input'}
                        values={{ item: item.input }}
                      />
                    </h5>
                  ))}
              </div>
              <div className="mt-3 sample-output">
                <h5>
                  <FormattedMessage
                    defaultMessage={'Sample Output:'}
                    description={'Sample Output'}
                  />
                </h5>
                {questionObject.sampleIO
                  && questionObject.sampleIO.map((item, index) => (
                    <h5 key={index}>
                      <FormattedMessage
                        defaultMessage={'{item}'}
                        description={'Sample Output'}
                        values={{ item: item.output }}
                      />
                    </h5>
                  ))}
              </div>
            </div>
          </div>
          <div className="input-container output-height">
            <div className="d-flex justify-content-between input-head align-items-center">
              <h5 className="">
                <FormattedMessage defaultMessage={'Output'} />
              </h5>
              <div onClick={clickRefresh}>
                <svg
                  width="27"
                  height="24"
                  viewBox="0 0 27 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18.299 2.73816C18.6497 2.97707 18.8912 3.34552 18.9703 3.76245C19.0493 4.17938 18.9595 4.61064 18.7206 4.96136C18.4817 5.31209 18.1133 5.55354 17.6963 5.6326C17.2794 5.71167 16.8481 5.62187 16.4974 5.38296C15.0203 4.37878 13.2495 3.89783 11.4673 4.01672C9.68513 4.13561 7.99397 4.8475 6.66328 6.03899C5.3326 7.23048 4.43892 8.83303 4.12464 10.5913C3.81035 12.3496 4.09353 14.1625 4.92906 15.7412C5.76459 17.3199 7.10441 18.5736 8.73507 19.3025C10.3657 20.0314 12.1934 20.1937 13.927 19.7634C15.6606 19.3331 17.2003 18.335 18.3008 16.9282C19.4014 15.5214 19.9995 13.7867 19.9998 12.0006C19.9998 11.5762 20.1684 11.1693 20.4684 10.8692C20.7685 10.5691 21.1755 10.4006 21.5998 10.4006C22.0242 10.4006 22.4311 10.5691 22.7312 10.8692C23.0313 11.1693 23.1998 11.5762 23.1998 12.0006C23.1994 14.5013 22.3621 16.9301 20.8212 18.8997C19.2804 20.8694 17.1246 22.2668 14.6975 22.8691C12.2703 23.4714 9.71138 23.2441 7.4284 22.2234C5.14541 21.2027 3.26971 19.4473 2.10015 17.2368C0.930588 15.0264 0.534458 12.4881 0.974871 10.0264C1.41528 7.56471 2.6669 5.32122 4.53031 3.6534C6.39371 1.98557 8.7617 0.989366 11.257 0.8235C13.7523 0.657634 16.2313 1.33165 18.299 2.73816V2.73816Z"
                    fill="white"
                  />
                  <path
                    d="M17.6624 16.0104C17.4853 16.1236 17.2878 16.2009 17.0809 16.2378C16.874 16.2747 16.6619 16.2705 16.4566 16.2254C16.2513 16.1803 16.057 16.0952 15.8846 15.975C15.7122 15.8548 15.5652 15.7018 15.452 15.5248C15.3387 15.3478 15.2614 15.1502 15.2246 14.9433C15.1877 14.7364 15.1919 14.5243 15.237 14.319C15.2821 14.1138 15.3672 13.9194 15.4874 13.747C15.6076 13.5747 15.7605 13.4276 15.9376 13.3144L21.5088 9.75119C21.8662 9.53 22.2963 9.45833 22.7061 9.55168C23.1159 9.64502 23.4725 9.89588 23.6989 10.25C23.9253 10.6042 24.0032 11.0332 23.9158 11.4443C23.8284 11.8555 23.5828 12.2157 23.232 12.4472L17.6624 16.0104Z"
                    fill="white"
                  />
                  <path
                    d="M26.2445 15.8569C26.4079 16.2428 26.4133 16.6773 26.2598 17.0671C26.1062 17.4569 25.8058 17.771 25.4232 17.9417C25.0406 18.1125 24.6063 18.1264 24.2136 17.9804C23.8209 17.8344 23.5011 17.5402 23.3229 17.1609L20.9101 11.7529C20.8197 11.5604 20.7685 11.3518 20.7597 11.1392C20.7508 10.9267 20.7845 10.7145 20.8586 10.5151C20.9327 10.3157 21.0458 10.1331 21.1914 9.97799C21.3369 9.82285 21.5119 9.69828 21.7062 9.61158C21.9004 9.52488 22.11 9.47779 22.3227 9.47305C22.5354 9.46832 22.7468 9.50604 22.9448 9.58401C23.1427 9.66198 23.3231 9.77863 23.4754 9.92714C23.6276 10.0757 23.7488 10.253 23.8317 10.4489L26.2445 15.8569Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <div className="output-cont">
              {output ? (
                <>
                  <h5 className="py-4">
                    <FormattedMessage
                      defaultMessage={'{output}'}
                      description={'Output Field'}
                      values={{ output }}
                    />
                  </h5>{' '}
                  <div className="submit-btn-cont">
                    <button
                      className="btn btn-primary submit-btn"
                      onClick={submitCode}>
                      <FormattedMessage
                        defaultMessage={'Submit Code'}
                        description={'Code Submit button'}
                      />
                    </button>
                  </div>
                </>
              ) : (
                <h5 className="text-center py-4">
                  <FormattedMessage
                    defaultMessage={
                      'Click “Run” to generate output for your code'
                    }
                    description={'Output Field'}
                  />
                </h5>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>
      <div>
        <div className="problem-statment-cont-mob">
          <div
            className="d-flex justify-content-between align-items-center"
            data-toggle="collapse"
            data-target="#problem-cont"
            aria-expanded="true"
            aria-controls="collapseTwo"
            id="problem-head">
            <p className="mb-0 problem-statment-head">
              <FormattedMessage
                defaultMessage={'Problem Statement:'}
                description={'Heading of problem statement'}
              />
            </p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20 8L12 16L4 8"
                stroke="#212527"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            className="collapse my-2 question-content-mob"
            id="problem-cont"
            aria-labelledby="problem-cont"
            data-parent="#problem-head">
            <p>
              <FormattedMessage
                defaultMessage={'{head}'}
                description={'Heading of problem statement'}
                values={{ head: questionObject.questionDescription }}
              />
            </p>
            <div className="mt-3 input-description">
              <p>
                <FormattedMessage
                  defaultMessage={'Input Description:'}
                  description={'description of problem statement'}
                />
              </p>
              <p>
                <FormattedMessage
                  defaultMessage={'{description}'}
                  description={'description of problem statement'}
                  values={{ description: questionObject.inputDescription }}
                />
              </p>
            </div>
            <div className="mt-3 output-description">
              <p>
                <FormattedMessage
                  defaultMessage={'Output Description:'}
                  description={'description of output'}
                />
              </p>
              <p>
                <FormattedMessage
                  defaultMessage={'{description}'}
                  description={'description of output'}
                  values={{ description: questionObject.outputDescription }}
                />
              </p>
            </div>
            <div className="mt-3 sample-input">
              <p>
                <FormattedMessage
                  defaultMessage={'Sample Input:'}
                  description={'Sample Input'}
                />
              </p>
              {questionObject.sampleIO
                && questionObject.sampleIO.map((item, index) => (
                  <p key={index}>
                    <FormattedMessage
                      defaultMessage={'{item}'}
                      description={'Sample Input'}
                      values={{ item: item.input }}
                    />
                  </p>
                ))}
            </div>
            <div className="mt-3 sample-output">
              <p>
                <FormattedMessage
                  defaultMessage={'Sample Output:'}
                  description={'Sample Output'}
                />
              </p>
              {questionObject.sampleIO
                && questionObject.sampleIO.map((item, index) => (
                  <p key={index}>
                    <FormattedMessage
                      defaultMessage={'{item}'}
                      description={'Sample Output'}
                      values={{ item: item.output }}
                    />
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="language-select-cont-mob">
          <select
            className="language-select-mob"
            onChange={(item) => changeLoag(item.target.value)}
            defaultValue={'PYTHON 3'}>
            {languages.map((lang, index) => (
              <option value={lang} key={index}>
                {lang}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Ace
            ref={editorRef}
            mode={getLanguageId(selectedLanguage)}
            theme="monokai"
            width="100%"
            name="codeEditor"
            // defaultValue={}
            value={inputVal}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              scrollPastEnd: true,
            }}
          />
        </div>
        <div className="slide-open-btn" onClick={openSlider}>
          <svg
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 17L1 9L9 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className='run-btn-cont'>
          <button className="btn btn-primary run-btn-mob" onClick={runCode}>
                  <FormattedMessage
                    defaultMessage={'Run'}
                    description={'Code Run button'}
                  />
                  <svg
                    className="play-icon"
                    width="16"
                    height="19"
                    viewBox="0 0 16 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15 7.76795C16.3333 8.53775 16.3333 10.4623 15 11.2321L3 18.1603C1.66667 18.9301 1.01267e-06 17.9678 1.07997e-06 16.4282L1.68565e-06 2.5718C1.75295e-06 1.0322 1.66667 0.0699456 3 0.839746L15 7.76795Z"
                      fill="white"
                    />
                  </svg>
                </button>
        </div>
      </div>
      <Modal
        modalClass={'outputModal'}
        customClass={'right'}
        backdrop={false}
        modalCloseBtn={false}
        modalContainerClass={'h-100'}
        modalbodyClass={'h-100'}>
        <div className='h-100 d-flex align-items-center'>
        <div className='blur-background'></div>
        <div className="slide-close-btn" onClick={closeSlider}>
        <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1L9 9L0.999999 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

        </div>
          <div className='output-modal-cont'>
            <div className="d-flex justify-content-between input-head-mob align-items-center">
              <p className='mb-0'>
                <FormattedMessage defaultMessage={'Output'} />
              </p>
              <div onClick={clickRefresh}>
                <svg
                  width="17"
                  height="14"
                  viewBox="0 0 27 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18.299 2.73816C18.6497 2.97707 18.8912 3.34552 18.9703 3.76245C19.0493 4.17938 18.9595 4.61064 18.7206 4.96136C18.4817 5.31209 18.1133 5.55354 17.6963 5.6326C17.2794 5.71167 16.8481 5.62187 16.4974 5.38296C15.0203 4.37878 13.2495 3.89783 11.4673 4.01672C9.68513 4.13561 7.99397 4.8475 6.66328 6.03899C5.3326 7.23048 4.43892 8.83303 4.12464 10.5913C3.81035 12.3496 4.09353 14.1625 4.92906 15.7412C5.76459 17.3199 7.10441 18.5736 8.73507 19.3025C10.3657 20.0314 12.1934 20.1937 13.927 19.7634C15.6606 19.3331 17.2003 18.335 18.3008 16.9282C19.4014 15.5214 19.9995 13.7867 19.9998 12.0006C19.9998 11.5762 20.1684 11.1693 20.4684 10.8692C20.7685 10.5691 21.1755 10.4006 21.5998 10.4006C22.0242 10.4006 22.4311 10.5691 22.7312 10.8692C23.0313 11.1693 23.1998 11.5762 23.1998 12.0006C23.1994 14.5013 22.3621 16.9301 20.8212 18.8997C19.2804 20.8694 17.1246 22.2668 14.6975 22.8691C12.2703 23.4714 9.71138 23.2441 7.4284 22.2234C5.14541 21.2027 3.26971 19.4473 2.10015 17.2368C0.930588 15.0264 0.534458 12.4881 0.974871 10.0264C1.41528 7.56471 2.6669 5.32122 4.53031 3.6534C6.39371 1.98557 8.7617 0.989366 11.257 0.8235C13.7523 0.657634 16.2313 1.33165 18.299 2.73816V2.73816Z"
                    fill="white"
                  />
                  <path
                    d="M17.6624 16.0104C17.4853 16.1236 17.2878 16.2009 17.0809 16.2378C16.874 16.2747 16.6619 16.2705 16.4566 16.2254C16.2513 16.1803 16.057 16.0952 15.8846 15.975C15.7122 15.8548 15.5652 15.7018 15.452 15.5248C15.3387 15.3478 15.2614 15.1502 15.2246 14.9433C15.1877 14.7364 15.1919 14.5243 15.237 14.319C15.2821 14.1138 15.3672 13.9194 15.4874 13.747C15.6076 13.5747 15.7605 13.4276 15.9376 13.3144L21.5088 9.75119C21.8662 9.53 22.2963 9.45833 22.7061 9.55168C23.1159 9.64502 23.4725 9.89588 23.6989 10.25C23.9253 10.6042 24.0032 11.0332 23.9158 11.4443C23.8284 11.8555 23.5828 12.2157 23.232 12.4472L17.6624 16.0104Z"
                    fill="white"
                  />
                  <path
                    d="M26.2445 15.8569C26.4079 16.2428 26.4133 16.6773 26.2598 17.0671C26.1062 17.4569 25.8058 17.771 25.4232 17.9417C25.0406 18.1125 24.6063 18.1264 24.2136 17.9804C23.8209 17.8344 23.5011 17.5402 23.3229 17.1609L20.9101 11.7529C20.8197 11.5604 20.7685 11.3518 20.7597 11.1392C20.7508 10.9267 20.7845 10.7145 20.8586 10.5151C20.9327 10.3157 21.0458 10.1331 21.1914 9.97799C21.3369 9.82285 21.5119 9.69828 21.7062 9.61158C21.9004 9.52488 22.11 9.47779 22.3227 9.47305C22.5354 9.46832 22.7468 9.50604 22.9448 9.58401C23.1427 9.66198 23.3231 9.77863 23.4754 9.92714C23.6276 10.0757 23.7488 10.253 23.8317 10.4489L26.2445 15.8569Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <div className="output-cont">
              {output ? (
                <>
                  <p className="py-4">
                    <FormattedMessage
                      defaultMessage={'{output}'}
                      description={'Output Field'}
                      values={{ output }}
                    />
                  </p>{' '}
                  <div className='submit-btn-cont-mob'>
          <button className="btn btn-primary run-btn-mob" onClick={submitCode}>
                  <FormattedMessage
                    defaultMessage={'Submit'}
                    description={'Code Submit button'}
                  />
                  <svg
                    className="play-icon"
                    width="16"
                    height="19"
                    viewBox="0 0 16 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15 7.76795C16.3333 8.53775 16.3333 10.4623 15 11.2321L3 18.1603C1.66667 18.9301 1.01267e-06 17.9678 1.07997e-06 16.4282L1.68565e-06 2.5718C1.75295e-06 1.0322 1.66667 0.0699456 3 0.839746L15 7.76795Z"
                      fill="white"
                    />
                  </svg>
                </button>
        </div>
                </>
              ) : (
                <p className="text-center py-4">
                  <FormattedMessage
                    defaultMessage={
                      'Click “Run” to generate output for your code'
                    }
                    description={'Output Field'}
                  />
                </p>
              )}
            </div>
          </div>
          </div>
      </Modal>
    </>
  );
};

const CodekataGameComponent = () => {
  pageInit('codekata-main-container', 'Codekata');

  const {
    state: { device },
  } = useRootPageState();
  const levelComponentRef = useRef();
  const isPageMounted = useRef(true);
  const { id } = useParams();
  const {
    state: codekataData,
    static: {
      getCodekataQuestions,
      availableLanguages,
      getTempleteData,
      getLanguageId,
      runCode,
      submitCode,
    },
  } = useCodekata({ isPageMounted, virtualid: id });
  useEffect(() => {
    updateHistory(codekataData);
  });
  const handleFetchQuestion = (virtualId) => {
    $('#loader').show();
    getCodekataQuestions(virtualId).then(() => {
      $('#loader').hide();
    });
  };

  const showLevel = () => levelComponentRef.current.show();
  const { questionList, questionObject } = codekataData;

  return (
    <>
      <TurtleNavBar
        forCodekata={true}
        questionState={codekataData}
        levelBtnHandler={showLevel}
      />
      {questionList && questionObject && (
        <GameLevelComponent
          ref={levelComponentRef}
          gameData={codekataData}
          forCodekata={true}
          handleFetchQuestion={handleFetchQuestion}
        />
      )}
      <CodekataDesktopContainer
        languages={availableLanguages}
        questionObject={questionObject}
        templete={getTempleteData}
        getLanguageId={getLanguageId}
        codeRun={runCode}
        codeSubmit={submitCode}
        device={device}
        questionList={questionList}
      />
    </>
  );
};

const Codekata = () => {
  const [codekataRoute, setCodekataRoute] = useState('codekataHome');
  const changeRoute = (route) => setCodekataRoute(route);

  useEffect(() => {
    const locationArray = window.location.href
      .split('/')
      .filter((el) => el !== '');
    if (locationArray.length > 3) {
      changeRoute('codekataGame');
    }
  }, []);

  return (
    <>
      {codekataRoute === 'codekataHome' && (
        <CodekataHomeContainer changeRoute={changeRoute} />
      )}
      {codekataRoute === 'codekataGame' && <CodekataGameComponent />}
    </>
  );
};

export default Codekata;
