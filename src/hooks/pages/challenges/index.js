import { useContext, useEffect, useState } from 'react';
import post, { getSession, s3Upload, setSession } from '../../common/framework';
import API from '../../../../env';
import { AuthContext } from '../root';

const useGetChallenges = ({ initializeData = true, isPageMounted }) => {
  const [challenges, setChallenges] = useState({
    status: true,
    trendingChallenges: false,
    paginationInfo: false,
  });

  const authContext = useContext(AuthContext);

  const setState = (args) => {
    setChallenges((prevState) => ({
      ...prevState,
      ...args,
    }));
    authContext.setAuthState((prevState) => ({
      ...prevState,
      getChallengesHook: {
        ...challenges,
        ...args,
      },
    }));
  };

  const getChallenges = ({ filterObj = {}, cached = true }) => {
    const { page = 1, sort = 'popularity', search = '' } = filterObj;
    const payload = {
      type: 'getChallenges',
      page,
      sort,
      s3Prefix: API.S3PREFIX,
    };

    if (search && search !== '') payload.search = search;

    let result;

    if (cached && authContext.authState.getChallengesHook) {
      result = new Promise((resolve) => {
        const { authState: { getChallengesHook } } = authContext;
        setChallenges(() => ({
          ...getChallengesHook,
        }));
        resolve(true);
      });
    } else {
      result = post(payload, 'challenge/')
        .then((res) => {
          if (isPageMounted.current) {
            if (res === 'access_denied') {
              setChallenges((prevState) => ({
                ...prevState,
                status: 'access_denied',
              }));
            } else {
              const parsedResponse = JSON.parse(res);

              if (parsedResponse.status === 'success') {
                authContext.setAuthState((prevState) => ({
                  ...prevState,
                  getChallengesHook: {
                    ...parsedResponse,
                  },
                }));

                setChallenges(() => ({
                  ...parsedResponse,
                }));
              } else {
                setChallenges(() => ({
                  ...parsedResponse,
                  status: false,
                }));
              }
            }
          }
        });
    }

    return result;
  };

  useEffect(() => {
    if (initializeData) getChallenges({});
  }, []);

  return {
    state: challenges,
    setState,
    static: {
      getChallenges,
    },
  };
};

const useGetMyChallenges = ({ initializeData = true, isPageMounted }) => {
  const [myChallenges, setMyChallenges] = useState({
    status: true,
    myChallenges: false,
    publishedChallengesCount: false,
    draftChallengesCount: false,
  });

  const authContext = useContext(AuthContext);

  const setState = (args) => {
    setMyChallenges((prevState) => ({
      ...prevState,
      ...args,
    }));
    authContext.setAuthState((prevState) => ({
      ...prevState,
      myChallengesHook: {
        ...myChallenges,
        ...args,
      },
    }));
  };

  const getMyChallenges = ({ cached = true }) => {
    const payload = {
      type: 'getMyChallenges',
      s3Prefix: API.S3PREFIX,
    };

    let result;

    if (cached && authContext.authState.myChallengesHook) {
      result = new Promise((resolve) => {
        const { authState: { myChallengesHook } } = authContext;
        setMyChallenges(() => ({
          ...myChallengesHook,
        }));
        resolve(true);
      });
    } else {
      result = post(payload, 'challenge/')
        .then((res) => {
          if (isPageMounted.current) {
            if (res === 'access_denied') {
              setMyChallenges((prevState) => ({
                ...prevState,
                status: 'access_denied',
              }));
            } else {
              const parsedResponse = JSON.parse(res);
              if (parsedResponse.status === 'success') {
                let publishedChallengesCount = 0;
                let draftChallengesCount = 0;

                parsedResponse.myChallenges.forEach((challenge) => {
                  if (challenge.challengeState === 'published') {
                    publishedChallengesCount += 1;
                  } else if (challenge.challengeState === 'draft') {
                    draftChallengesCount += 1;
                  }
                });
                setMyChallenges(() => ({
                  ...parsedResponse,
                  publishedChallengesCount,
                  draftChallengesCount,
                }));
                authContext.setAuthState((prevState) => ({
                  ...prevState,
                  myChallengesHook: {
                    ...parsedResponse,
                    publishedChallengesCount,
                    draftChallengesCount,
                  },
                }));
              } else {
                setMyChallenges(() => ({
                  ...parsedResponse,
                  status: false,
                }));
              }
            }
          }
        });
    }

    return result;
  };

  useEffect(() => {
    if (initializeData) getMyChallenges({});
  }, []);

  return {
    state: myChallenges,
    setState,
    static: {
      getMyChallenges,
    },
  };
};

const useDeleteChallenge = () => (challengeId) => {
  const payload = {
    type: 'deleteChallenge',
    challengeId,
  };

  return post(payload, 'challenge/');
};

const useUpdateChallengeStateOnly = () => (challengeId, challengeState) => {
  const payload = {
    type: 'updateChallengeStateOnly',
    challengeId,
    challengeState,
  };
  return post(payload, 'challenge/');
};

const useGetAttemptedChallenges = ({ initializeData = true, isPageMounted }) => {
  const [attemptedChallenges, setAttemptedChallenges] = useState({
    status: true,
    attemptedChallenges: false,
  });

  const authContext = useContext(AuthContext);

  const setState = (args) => {
    setAttemptedChallenges((prevState) => ({
      ...prevState,
      ...args,
    }));
    authContext.setAuthState((prevState) => ({
      ...prevState,
      attemptedChallengesHook: {
        ...attemptedChallenges,
        ...args,
      },
    }));
  };

  const getAttemptedChallenges = ({ cached = true }) => {
    const payload = {
      type: 'getAttemptedChallenges',
      s3Prefix: API.S3PREFIX,
    };

    let result;

    if (cached && authContext.authState.attemptedChallengesHook) {
      result = new Promise((resolve) => {
        const { authState: { attemptedChallengesHook } } = authContext;
        setAttemptedChallenges(() => ({
          ...attemptedChallengesHook,
        }));
        resolve(true);
      });
    } else {
      result = post(payload, 'challenge/')
        .then((res) => {
          if (isPageMounted.current) {
            if (res === 'access_denied') {
              setAttemptedChallenges((prevState) => ({
                ...prevState,
                status: 'access_denied',
              }));
            } else {
              const parsedResponse = JSON.parse(res);
              if (parsedResponse.status === 'success') {
                setAttemptedChallenges(() => ({
                  ...parsedResponse,
                }));
                authContext.setAuthState((prevState) => ({
                  ...prevState,
                  attemptedChallengesHook: {
                    ...parsedResponse,
                  },
                }));
              } else {
                setAttemptedChallenges(() => ({
                  ...parsedResponse,
                  status: false,
                }));
              }
            }
          }
        });
    }

    return result;
  };

  useEffect(() => {
    if (initializeData) getAttemptedChallenges({});
  }, []);

  return {
    state: attemptedChallenges,
    setState,
    static: {
      getAttemptedChallenges,
    },
  };
};

const useTakeChallenge = ({ isPageMounted }) => {
  const [takeChallenge, setTakeChallenge] = useState({
    status: true,
    challengeObject: false,
    submissionDetails: false,
    validated: false,
    validationDetails: false,
    questionObject: false,
  });

  const authContext = useContext(AuthContext);

  const setState = (args) => {
    setTakeChallenge((prevState) => ({
      ...prevState,
      ...args,
    }));
    authContext.setAuthState((prevState) => ({
      ...prevState,
      takeChallengeHook: {
        ...takeChallenge,
        ...args,
      },
    }));
  };

  const fetchChallenge = ({ challengeId, cached = true }) => {
    const payload = {
      type: 'takeChallenge',
      s3Prefix: API.S3PREFIX,
      challengeId,
    };

    let result;

    if (cached && authContext.authState.takeChallengeHook) {
      result = new Promise((resolve) => {
        const { authState: { takeChallengeHook } } = authContext;
        setTakeChallenge((prevState) => ({
          ...prevState,
          ...takeChallengeHook,
        }));
        resolve(true);
      });
    } else {
      result = post(payload, 'challenge/')
        .then((res) => {
          if (isPageMounted.current) {
            if (res === 'access_denied') {
              setTakeChallenge((prevState) => ({
                ...prevState,
                status: 'access_denied',
              }));
            } else {
              const parsedResponse = JSON.parse(res);
              if (parsedResponse.status === 'success') {
                setTakeChallenge((prevState) => ({
                  ...prevState,
                  ...parsedResponse,
                }));
                authContext.setAuthState((prevState) => ({
                  ...prevState,
                  takeChallengeHook: {
                    ...parsedResponse,
                  },
                }));
              } else {
                setTakeChallenge((prevState) => ({
                  ...prevState,
                  ...parsedResponse,
                  status: false,
                }));
              }
            }
          }
        });
    }

    return result;
  };

  const submitChallenge = (request) => post(request, 'challenge/', false)
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
          }
          const shareLink = `https://www.hackerkid.org/turtle/challenges/submissions/${parsedResponse.profileDetails.uniqueUrl}/${takeChallenge.challengeObject.challengeId}/${takeChallenge.challengeObject.uniqueString}`;
          const username = parsedResponse.profileDetails.name;
          const responseObject = {
            ...parsedResponse,
            successMessage: parsedResponse.pointsDetails.submissionStatus.replace('{{name}}', username),
            shareLink,
          };
          setTakeChallenge((prevState) => ({
            ...prevState,
            validationDetails: responseObject,
            modalType: 'success',
            validated: parsedResponse.passed,
          }));
        }
      } else {
        setTakeChallenge((prevState) => ({
          ...prevState,
          status: 'access_denied',
        }));
      }
      return response;
    });

  return {
    state: takeChallenge,
    setState,
    static: {
      fetchChallenge,
      submitChallenge,
    },
  };
};

const useCreateChallenge = ({ isPageMounted }) => {
  const [challengeState, setChallengeState] = useState({
    status: false,
    challengeDetails: false,
    postedChallenges: false,
    pointDetails: false,
    requestPayload: false,
  });

  const loadChallenge = async ({ challengeId }) => {
    const payload = {
      type: 'loadChallenge',
      challengeId,
      s3Prefix: API.S3PREFIX,
    };

    return post(payload, 'challenge/', false)
      .then((response) => {
        if (isPageMounted.current) {
          if (response === 'access_denied') {
            setChallengeState((prevState) => ({
              ...prevState,
              status: 'access_denied',
            }));
          } else {
            const parsedResponse = JSON.parse(response);
            if (parsedResponse.status === 'success') {
              setChallengeState((prevState) => ({
                ...prevState,
                ...parsedResponse,
              }));
            }
          }
        }
      });
  };

  const createChallenge = (request) => post(request, 'challenge/', false)
    .then((response) => {
      if (isPageMounted.current) {
        if (response === 'access_denied') {
          setChallengeState((prevState) => ({
            ...prevState,
            status: 'access_denied',
          }));
        } else {
          const parsedResponse = JSON.parse(response);
          if (parsedResponse.status === 'success') {
            setChallengeState((prevState) => ({
              ...prevState,
              ...parsedResponse,
            }));
          }
          return parsedResponse;
        }
      }
      return response;
    });

  const updateChallenge = (request) => post(request, 'challenge/', false)
    .then((response) => {
      if (isPageMounted.current) {
        if (response === 'access_denied') {
          setChallengeState((prevState) => ({
            ...prevState,
            status: 'access_denied',
          }));
        } else {
          const parsedResponse = JSON.parse(response);
          if (parsedResponse.status === 'success') {
            const shareLink = `https://www.hackerkid.org/turtle/challenges/${parsedResponse.challengeDetails.challengeId}/${parsedResponse.challengeDetails.uniqueString}`;
            const responseObject = {
              ...parsedResponse,
              successMessage: parsedResponse.pointDetails.submissionStatus,
              shareLink,
            };
            if (parsedResponse?.pointDetails?.pointAdded) {
              getSession('pointsEarned')
                .then((pointsEarned) => {
                  const availablePoints = pointsEarned ? Number(pointsEarned) : 0;
                  const newPoints = availablePoints
                  + Number(parsedResponse.pointDetails.pointsAdded);
                  setSession('pointsEarned', newPoints);
                });
            }
            setChallengeState((prevState) => ({
              ...prevState,
              status: parsedResponse.status,
              validationDetails: responseObject,
            }));
            return response;
          }
          setChallengeState((prevState) => ({
            ...prevState,
            status: parsedResponse.status,
            validationDetails: parsedResponse,
          }));
        }
      }
      return response;
    });

  const getChallengeImageSignedUrl = ({ challengeDetails }) => {
    const signedRequest = {
      type: 'getSignedURL',
      challengeId: challengeDetails.challengeId,
      s3Prefix: API.S3PREFIX,
    };
    return post(signedRequest, 'challenge/', true, false);
  };

  const uploadImageS3 = (blob, signedURL) => {
    if (blob && signedURL) {
      return s3Upload(blob, signedURL);
    }
    return false;
  };

  return {
    createChallengeState: challengeState,
    setCreateChallengeState: setChallengeState,
    static: {
      createChallenge,
      getChallengeImageSignedUrl,
      loadChallenge,
      updateChallenge,
      uploadImageS3,
    },
  };
};

export default null;

export {
  useCreateChallenge,
  useGetChallenges,
  useTakeChallenge,
  useGetMyChallenges,
  useGetAttemptedChallenges,
  useUpdateChallengeStateOnly,
  useDeleteChallenge,
};
