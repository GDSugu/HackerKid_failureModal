import { useEffect, useState } from 'react';
import post from '../../common/framework';
import API from '../../../../env';

const useGetChallenges = (initializeData = true) => {
  const [challenges, setChallenges] = useState({
    status: true,
    trendingChallenges: false,
    paginationInfo: false,
  });

  const getChallenges = (filterObj = {}) => {
    const { page = 1, sort = 'popularity', search = '' } = filterObj;
    const payload = {
      type: 'getChallenges',
      page,
      sort,
      s3Prefix: API.S3PREFIX,
    };

    if (search && search !== '') payload.search = search;

    return post(payload, 'challenge/')
      .then((res) => {
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
          } else {
            setChallenges(() => ({
              ...parsedResponse,
              status: false,
            }));
          }
        }
      });
  };

  useEffect(() => {
    if (initializeData) getChallenges();
  }, []);

  return {
    state: challenges,
    setState: setChallenges,
    getChallenges,
  };
};

const useTakeChallenge = () => {
  const [takeChallenge, setTakeChallenge] = useState({
    status: true,
    challengeObject: false,
    submissionDetails: false,
  });

  const fetchChallenge = (challengeId) => {
    const payload = {
      type: 'takeChallenge',
      s3Prefix: API.S3PREFIX,
      challengeId,
    };

    return post(payload, 'challenges/')
      .then((res) => {
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
          } else {
            setTakeChallenge(() => ({
              ...parsedResponse,
              status: false,
            }));
          }
        }
      });
  };

  return {
    state: takeChallenge,
    setState: setTakeChallenge,
    fetchChallenge,
  };
};

export default null;

export {
  useGetChallenges,
  useTakeChallenge,
};
