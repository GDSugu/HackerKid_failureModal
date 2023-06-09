import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import API from '../../../../env';
import post from '../../common/framework';
import { AuthContext } from '../root';

const useAwardsByGame = ({ isPageMounted, initializeData = true, game }) => {
  const [awardsByGameState, setAwardsByGameState] = useState({
    awards: false,
    status: false,
  });
  const authContext = useContext(AuthContext);

  const setState = (args) => {
    setAwardsByGameState((prevState) => ({
      ...prevState,
      ...args,
    }));
    authContext.setAuthState((prevState) => ({
      ...prevState,
      // appData: {
      awardsByGameHook: {
        ...awardsByGameState,
        ...args,
      },
      // },
    }));
  };

  const getAwardsByGame = ({
    cached = true,
  }) => {
    let result;
    if (cached && authContext.authState.awardsByGame) {
      const { authState: { awardsByGameHook } } = authContext;
      setAwardsByGameState({
        ...awardsByGameHook,
        status: 'success',
      });
    } else {
      const payload = {
        type: 'getAwardsByGame',
        s3Prefix: API.S3PREFIX,
        game,
      };
      result = post(payload, 'awards/').then((res) => {
        if (isPageMounted.current) {
          const parsedResponse = JSON.parse(res);
          if (parsedResponse.status === 'success') {
            const { awards: allAwardsByGame } = parsedResponse;
            const newState = {
              status: 'success',
              awards: allAwardsByGame,
            };
            setAwardsByGameState(newState);
            authContext.setAuthState((prevState) => ({
              ...prevState,
              // appData: {
              awardsByGameHook: {
                ...newState,
                status: 'success',
              },
              // },
            }));
          } else {
            setAwardsByGameState((prevState) => ({
              ...prevState,
              status: 'error',
              response: parsedResponse,
            }));
          }
        }
      }).catch((err) => {
        console.error(err);
      });
    }
    return result;
  };

  useEffect(() => {
    if (initializeData) {
      getAwardsByGame({ cached: false });
    }
  }, []);
  return {
    awardsByGameState,
    setState,
    getAwardsByGame,
    setAwardsByGameState,
  };
};

const useAwards = ({ isPageMounted, initializeData = true }) => {
  const [awardsState, setAwardsState] = useState({
    status: false,
    awards: false,
    sort: 'default',
    searchQuery: '',
    limit: 15,
  });

  const authContext = useContext(AuthContext);

  const setState = (args) => {
    setAwardsState((prevState) => ({
      ...prevState,
      ...args,
    }));
    authContext.setAuthState((prevState) => ({
      ...prevState,
      awardsHook: {
        ...awardsState,
        ...args,
      },
    }));
  };

  const separateAwardsToTodayAndPrevious = (toSeparateAwards) => {
    const result = {
      today: [],
      previous: [],
    };

    try {
      toSeparateAwards.forEach((award) => {
        const today = [];
        const previous = [];

        const newObj = { ...award };
        const { repeatingAwards } = newObj;

        if (repeatingAwards) {
          repeatingAwards.forEach((repeatingAward) => {
            const timeStampDMY = moment.unix(repeatingAward.lastAwardedAt).format('DD/MM/YYYY');
            const nowDMY = moment().format('DD/MM/YYYY');

            if (nowDMY === timeStampDMY && newObj.current) {
              today.push({ currentAward: newObj.currentAward, repeatingAwards: [] });

              newObj.currentAward = false;
            }
          });
        }

        previous.push(newObj);

        result.today = [...result.today, ...today];
        result.previous = [...result.previous, ...previous];
      });

      return result;
    } catch (e) {
      console.error(e);
    }

    return result;
  };

  const getAwards = ({
    cached = true, searchQuery = '', sort = 'default', limit = 15,
  }) => {
    let result;
    if (cached && authContext.authState.awards) {
      const { authState: { awardsHook } } = authContext;
      setAwardsState({
        ...awardsHook,
        status: 'success',
      });
    } else {
      const payload = {
        type: 'getAwardsForUser',
        s3Prefix: API.S3PREFIX,
        searchQuery,
        sort,
        limit,
      };
      result = post(payload, 'awards/').then((res) => {
        if (isPageMounted.current) {
          const parsedResponse = JSON.parse(res);

          if (parsedResponse.status === 'success') {
            const { awards: allAwardsForUser, totalAwards } = parsedResponse;
            const newState = {
              status: 'success',
              awards: allAwardsForUser,
              sort,
              searchQuery,
              limit,
              totalAwards,
            };

            if (sort === 'default' && !searchQuery) {
              newState.awards = separateAwardsToTodayAndPrevious(allAwardsForUser);
            }

            setAwardsState(newState);
            authContext.setAuthState((prevState) => ({
              ...prevState,
              awardsHook: {
                ...newState,
                status: 'success',
              },
            }));
          } else {
            setAwardsState((prevState) => ({
              ...prevState,
              status: 'error',
              response: parsedResponse,
            }));
          }
        }
      }).catch((err) => {
        console.error(err);
      });
    }
    return result;
  };

  useEffect(() => {
    if (initializeData) {
      getAwards({ cached: false });
    }
  }, []);

  return {
    awardsState,
    setState,
    setAwardsState,
    getAwards,
  };
};

export default null;

export {
  useAwards,
  useAwardsByGame,
};
