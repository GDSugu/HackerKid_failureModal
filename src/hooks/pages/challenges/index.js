import { useContext, useEffect, useState } from 'react';
import post from '../../common/framework';
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
    authContext.setAuthState({
      appData: {
        getChallengesHook: {
          ...challenges,
          ...args,
        },
      },
    });
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

    if (cached && authContext.appData.getChallengesHook) {
      result = new Promise((resolve) => {
        const { getChallengesHook } = authContext.appData;
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
                authContext.setAuthState({
                  appData: {
                    getChallengesHook: {
                      ...parsedResponse,
                    },
                  },
                });

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
    authContext.setAuthState({
      appData: {
        myChallengesHook: {
          ...myChallenges,
          ...args,
        },
      },
    });
  };

  const getMyChallenges = ({ cached = true }) => {
    const payload = {
      type: 'getMyChallenges',
      s3Prefix: API.S3PREFIX,
    };

    let result;

    if (cached && authContext.appData.myChallengesHook) {
      result = new Promise((resolve) => {
        const { myChallengesHook } = authContext.appData;
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
                authContext.setAuthState({
                  appData: {
                    myChallengesHook: {
                      ...parsedResponse,
                      publishedChallengesCount,
                      draftChallengesCount,
                    },
                  },
                });
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
    authContext.setAuthState({
      appData: {
        attemptedChallengesHook: {
          ...attemptedChallenges,
          ...args,
        },
      },
    });
  };

  const getAttemptedChallenges = ({ cached = true }) => {
    const payload = {
      type: 'getAttemptedChallenges',
      s3Prefix: API.S3PREFIX,
    };

    let result;

    if (cached && authContext.appData.attemptedChallengesHook) {
      result = new Promise((resolve) => {
        const { attemptedChallengesHook } = authContext.appData;
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
                authContext.setAuthState({
                  appData: {
                    attemptedChallengesHook: {
                      ...parsedResponse,
                    },
                  },
                });
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
  });

  const authContext = useContext(AuthContext);

  const setState = (args) => {
    setTakeChallenge((prevState) => ({
      ...prevState,
      ...args,
    }));
    authContext.setAuthState({
      appData: {
        takeChallengeHook: {
          ...takeChallenge,
          ...args,
        },
      },
    });
  };

  const fetchChallenge = ({ challengeId, cached = true }) => {
    const payload = {
      type: 'takeChallenge',
      s3Prefix: API.S3PREFIX,
      challengeId,
    };

    let result;

    if (cached && authContext.appData.takeChallengeHook) {
      result = new Promise((resolve) => {
        const { takeChallengeHook } = authContext.appData;
        setTakeChallenge(() => ({
          ...takeChallengeHook,
        }));
        resolve(true);
      });
    } else {
      result = post(payload, 'challenges/')
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
                setTakeChallenge(() => ({
                  ...parsedResponse,
                }));
                authContext.setAuthState({
                  appData: {
                    takeChallengeHook: {
                      ...parsedResponse,
                    },
                  },
                });
              } else {
                setTakeChallenge(() => ({
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

  return {
    state: takeChallenge,
    setState,
    static: {
      fetchChallenge,
    },
  };
};

export default null;

export {
  useGetChallenges,
  useTakeChallenge,
  useGetMyChallenges,
  useGetAttemptedChallenges,
  useUpdateChallengeStateOnly,
  useDeleteChallenge,
};
