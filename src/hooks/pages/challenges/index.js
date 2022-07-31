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
                setChallenges(() => ({
                  ...parsedResponse,
                }));
                authContext.setAuthState({
                  appData: {
                    getChallengesHook: {
                      ...parsedResponse,
                    },
                  },
                });
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
};
