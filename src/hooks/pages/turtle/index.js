import React from 'react';
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

export default null;

export {
  useTurtleFetchQuestion,
  TurtleContext,
};
