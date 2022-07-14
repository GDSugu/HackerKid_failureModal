import React from 'react';
import md5 from 'crypto-js/md5';
import post from '../../common/framework';

const useTurtleFetchQuestion = ({ type = 'initialQuestion' || 'getQuestionById', virtualId = false, questionId = false }) => {
  const [turtleQuestionInfo, setTurtleQuestionInfo] = React.useState({
    status: true,
    questionList: false,
    questionObject: false,
    submissionDetails: false,
  });

  const result = {
    state: turtleQuestionInfo,
    setState: setTurtleQuestionInfo,
  };

  let payload = false;

  React.useEffect(() => {
    switch (type) {
      case 'initialQuestion':
        if (virtualId) {
          payload = {
            type: 'initialQuestion',
            virtualId,
          };
        }
        break;
      case 'getQuestionById':
        if (questionId) {
          payload = {
            type: 'getQuestionById',
            questionId,
          };
        }
        break;
      default: break;
    }

    if (payload) {
      post(payload, 'turtle/')
        .then((response) => {
          if (response === 'access_denied') {
            setTurtleQuestionInfo((prevState) => ({
              status: 'access_denied',
              ...prevState,
              response,
            }));
          } else {
            const parsedResponse = JSON.parse(response);
            if (parsedResponse.status === 'success') {
              setTurtleQuestionInfo(parsedResponse);
            } else {
              setTurtleQuestionInfo((prevState) => ({
                ...prevState,
                status: 'error',
                response: parsedResponse,
              }));
            }
          }
        });
    }
  }, []);

  return result;
};

const TurtleContext = React.createContext();

const useTurtleValidation = () => {
  const submitTurtle = (request) => {
    console.log('submitTurtle');
    let requestString = '';
    Object.keys(request).forEach((index) => {
      requestString += request[index];
    });
    const requestHash = md5(requestString + md5(requestString).toString()).toString();
    request.requestHash = requestHash;
    console.log(request);
    // if (TurtleContext.current)
    // let requestString = TurtleContext;
    // Object.keys(turtleValidationState).forEach((key) => {
    //   if (key !== 'status') {
    //     requestString += turtleValidationState[key];
    //   }
    // });

    // const requestHash = md5(requestString + md5(requestString).toString()).toString();
    // const payload = {
    //   type: 'validateQuestion',
    //   // questionId: turtleValidationState.questionId,
    //   // sourceCode: turtleValidationState.sourceCode,
    //   // xmlWorkSpace: turtleValidationState.xmlWorkSpace,
    //   // validated: turtleValidationState.validated,

    //   requestHash,
    // };

    // return post(payload, 'turtle/', false);
  };

  return {
    // state: turtleValidationState,
    // setState: setTurtleValidationState,
    submitTurtle,
  };
};

export default null;

export {
  useTurtleFetchQuestion,
  useTurtleValidation,
  TurtleContext,
};
