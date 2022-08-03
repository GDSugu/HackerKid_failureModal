import React from 'react';
import md5 from 'crypto-js/md5';
import post from '../../common/framework';

const useTurtleFetchQuestion = ({
  isPageMounted,
}) => {
  const [turtleQuestionInfo, setTurtleQuestionInfo] = React.useState({
    status: true,
    questionList: false,
    questionObject: false,
    validated: false,
    submissionDetails: false,
  });

  const fetchTurtleQuestion = ({ type = 'initialQuestion' || 'getQuestionById', virtualId = false, questionId = false }) => {
    let payload = false;
    let qnResult;

    switch (type) {
      case 'initialQuestion':
        payload = {
          type: 'initialQuestion',
        };
        if (virtualId) {
          payload.virtualId = virtualId;
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
      qnResult = post(payload, 'turtle/')
        .then((response) => {
          if (isPageMounted.current) {
            if (response === 'access_denied') {
              setTurtleQuestionInfo((prevState) => ({
                status: 'access_denied',
                ...prevState,
                response,
              }));
            } else {
              const parsedResponse = JSON.parse(response);
              if (parsedResponse.status === 'success') {
                setTurtleQuestionInfo({
                  ...parsedResponse,
                  validated: false,
                });
              } else {
                setTurtleQuestionInfo((prevState) => ({
                  ...prevState,
                  status: 'error',
                  response: parsedResponse,
                }));
              }
            }
          }
        });
    }
    return qnResult;
  };

  const submitTurtle = (request) => post(request, 'turtle/', false);
  // {
  // console.log('submitTurtle');
  // let requestString = '';
  // Object.keys(request).forEach((index) => {
  //   requestString += request[index];
  // });
  // const requestHash = md5(requestString + md5(requestString).toString()).toString();
  // request.requestHash = requestHash;
  // console.log(request);
  // };

  React.useEffect(() => {
    fetchTurtleQuestion({});
  }, []);

  return {
    state: turtleQuestionInfo,
    setState: setTurtleQuestionInfo,
    static: {
      fetchTurtleQuestion,
      submitTurtle,
    },
  };
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
