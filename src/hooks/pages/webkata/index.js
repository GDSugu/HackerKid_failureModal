import React, { useState } from 'react';
import post from '../../common/framework';

const useWebkataFetchQuestion = ({
  isPageMounted, initializeData = true, conceptid, virtualid,
}) => {
  const [state, setState] = useState({
    status: false,
    questionList: false,
    questionObject: false,
    submissionDetails: false,
  });

  const fetchWebkataQuestion = (conceptId = conceptid, virtualId = virtualid) => {
    const payload = {
      type: 'fetchQuestion',
      conceptId: conceptId.toUpperCase(),
      virtualId: Number(virtualId),
    };
    let result = false;

    result = post(payload, 'webkata/')
      .then((res) => {
        if (isPageMounted.current) {
          if (res !== 'access_denied') {
            const data = JSON.parse(res);

            setState((prev) => ({
              ...prev,
              ...data,
            }));
            result = data;
          } else {
            result = 'access_denied';
          }
        }
        return result;
      });

    return result;
  };

  React.useEffect(() => {
    if (initializeData) {
      fetchWebkataQuestion();
    }
  }, []);

  return {
    state,
    setState,
    fetchWebkataQuestion,
  };
};

const useWebkataSubmitQuestion = ({ isPageMounted }) => {
  const [state, setState] = useState({
    status: false,
    evaluationDetails: false,
    isLoggedIn: false,
    passed: false,
    pointsDetails: false,
    profileDetails: false,
  });

  const resetWebkataSubmitState = () => {
    if (state.evaluationDetails) {
      setState({
        status: false,
        evaluationDetails: false,
        isLoggedIn: false,
        passed: false,
        pointsDetails: false,
        profileDetails: false,
      });
    }
  };

  const submitWebkataQuestion = (questionId, testResult, questionSetup, conceptId) => {
    const payload = {
      type: 'submitQuestion',
      questionId,
      testResult,
      questionSetup,
      conceptId,
    };

    let result = false;

    result = post(payload, 'webkata/')
      .then((res) => {
        if (isPageMounted.current) {
          if (res !== 'access_denied') {
            const data = JSON.parse(res);
            setState((prev) => ({
              ...prev,
              ...data,
            }));
            result = data;
          } else {
            result = 'access_denied';
          }
        }
      });
    return result;
  };

  return {
    state,
    setState,
    submitWebkataQuestion,
    resetWebkataSubmitState,
  };
};

export default null;

export {
  useWebkataFetchQuestion,
  useWebkataSubmitQuestion,
};
