import React from 'react';
import md5 from 'crypto-js/md5';
import post, { getSession, setSession } from '../../common/framework';

const useTurtleFetchQuestion = ({
  isPageMounted,
  virtualid = false,
}) => {
  const [turtleQuestionInfo, setTurtleQuestionInfo] = React.useState({
    status: true,
    questionList: false,
    questionObject: false,
    successObject: false,
    submissionDetails: false,
    validated: false,
    validationDetails: false,
    hintDetails: false,
  });

  const fetchTurtleQuestion = ({ type = 'initialQuestion' || 'getQuestionById', virtualId = virtualid, questionId = false }) => {
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

  const getNextQuestion = () => {
    let result = new Promise((resolve) => resolve(false));
    if (turtleQuestionInfo && turtleQuestionInfo.questionList) {
      const nextQuestionidx = turtleQuestionInfo
        .questionList
        .findIndex((el) => el.question_id === turtleQuestionInfo.questionObject.question_id) + 1;
      const nextQnId = turtleQuestionInfo.questionList[nextQuestionidx].question_id;
      result = fetchTurtleQuestion({ type: 'getQuestionById', questionId: nextQnId });
    }
    return result;
  };

  const submitTurtle = (request) => post(request, 'turtle/', false)
    .then((response) => {
      if (response !== 'access_denied') {
        const parsedResponse = JSON.parse(response);
        if (parsedResponse.status === 'success' && parsedResponse.parse) {
          if (parsedResponse.pointsDetails.addedPoints) {
            getSession('pointsEarned')
              .then((pointsEarned) => {
                const availablePoints = pointsEarned ? Number(pointsEarned) : 0;
                const newPoints = availablePoints
                  + Number(parsedResponse.pointsDetails.addedPoints);
                setSession('pointsEarned', newPoints);
              });
          }
        }
      }
      return response;
    });
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

  const loadHints = ({ blockTypes, action = false }) => {
    let request = {};
    let result = new Promise((resolve) => resolve(false));
    if (blockTypes) {
      request = {
        type: 'getHint',
        questionId: turtleQuestionInfo.questionObject.question_id,
        blockTypes,
      };
      const requiredHint = turtleQuestionInfo?.hintDetails?.currentHint;
      if (requiredHint) {
        if ((action === 'prev') && (requiredHint !== 1)) {
          request.currentHint = requiredHint - 1;
        } else if (action === 'next') {
          request.currentHint = requiredHint + 1;
        }
      }
      result = post(request, 'turtle/', false)
        .then((response) => {
          if (response === 'access_denied') {
            setTurtleQuestionInfo((prevState) => ({
              ...prevState,
              hintDetails: 'access_denied',
            }));
          } else {
            const parsedResponse = JSON.parse(response);
            setTurtleQuestionInfo((prevState) => ({
              ...prevState,
              hintDetails: parsedResponse,
            }));
          }
        });
    }
    return result;
  };

  React.useEffect(() => {
    fetchTurtleQuestion({
      type: 'initialQuestion',
      virtualId: virtualid,
    });
  }, []);

  return {
    state: turtleQuestionInfo,
    setState: setTurtleQuestionInfo,
    static: {
      fetchTurtleQuestion,
      loadHints,
      getNextQuestion,
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
