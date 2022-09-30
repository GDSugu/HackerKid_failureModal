import React from 'react';
import post, { getSession, setSession } from '../../common/framework';

const useZombieLand = ({
  initialize = true,
  isPageMounted,
  virtualid = false,
}) => {
  const [zombieLandState, setZombieLandState] = React.useState({
    currentQuestionSubmission: false,
    questionList: false,
    questionObject: false,
    status: false,
    passed: false,
    pointsDetails: false,
    profileDetails: false,
    route: 'zombieLandHome',
  });

  const changeRoute = (route) => setZombieLandState((prevState) => ({
    ...prevState,
    route,
  }));

  const fetchZombieLandQuestion = ({
    virtualId = virtualid,
  }) => {
    let qnResult;
    const payload = {
      type: 'fetchQuestion',
    };
    if (virtualId) {
      payload.virtualId = virtualId;
    }

    if (payload) {
      qnResult = post(payload, 'zombieLand/')
        .then((response) => {
          if (isPageMounted.current) {
            if (response === 'access_denied') {
              setZombieLandState((prevState) => ({
                status: 'access_denied',
                ...prevState,
                response,
              }));
            } else {
              const parsedResponse = JSON.parse(response);
              if (parsedResponse.status === 'success') {
                setZombieLandState({
                  ...parsedResponse,
                });
              } else {
                setZombieLandState({
                  status: 'error',
                  response: parsedResponse,
                });
              }
            }
          }
        });
    }
    return qnResult;
  };

  const submitZombieLandQuestion = (request) => post(request, 'zombieLand/', false)
    .then((response) => {
      if (response !== 'access_denied') {
        const parsedResponse = JSON.parse(response);
        if (parsedResponse.status === 'success' && parsedResponse.passed) {
          if (parsedResponse.pointsDetails.addedPoints) {
            getSession('pointsEarned')
              .then((pointsEarned) => {
                const availablePoints = pointsEarned ? Number(pointsEarned) : 0;
                const newPoints = availablePoints
                  + Number(parsedResponse.pointsDetails.addedPoints);
                setSession('pointsEarned', newPoints);
              });
            if (parsedResponse?.profileDetails?.name) {
              setZombieLandState((prevState) => ({
                ...prevState,
                responseObject: {
                  ...parsedResponse,
                  successMessage: parsedResponse.pointsDetails.submissionStatus.replace('{{name}}', parsedResponse?.profileDetails?.name),
                },
              }));
            }
          }
        }
      }

      return response;
    });

  React.useEffect(() => {
    if (initialize) {
      fetchZombieLandQuestion({
        virtualId: virtualid,
      });
    }
  }, []);

  return {
    state: zombieLandState,
    setState: setZombieLandState,
    static: {
      changeRoute,
      fetchZombieLandQuestion,
      submitZombieLandQuestion,
    },
  };
};

const ZombieLandContext = React.createContext();

export default null;

export {
  useZombieLand,
  ZombieLandContext,
};
