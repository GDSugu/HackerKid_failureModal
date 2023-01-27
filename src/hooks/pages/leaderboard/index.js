import { useContext, useEffect, useState } from 'react';
import post from '../../common/framework';
import API from '../../../../env';
import { AuthContext } from '../root';

const useLeaderBoard = ({ initializeData = true, isPageMounted }) => {
  const [leaderBoardData, setLeaderBoardData] = useState({
    status: true,
    leaderboardData: false,
    userData: false,
    paginationDetails: false,
    gameProgress: false,
    uiData: {
      loading: false,
    },
  });

  const authContext = useContext(AuthContext);

  const getLeaderBoardData = async ({ pageNumber = 1, game = 'all' }) => {
    setLeaderBoardData((prev) => ({
      ...prev,
      uiData: {
        loading: true,
      },
    }));

    return post({
      type: 'getLeaderBoard', game, page: pageNumber, s3Prefix: API.S3PREFIX,
    }, 'leaderboard/')
      .then((res) => {
        if (isPageMounted.current) {
          if (res === 'access_denied') {
            setLeaderBoardData((prevState) => ({
              ...prevState,
              status: 'access_denied',
              uiData: {
                loading: false,
              },
            }));
          } else {
            const parsedResponse = JSON.parse(res);
            if (parsedResponse.status === 'success') {
              setLeaderBoardData(() => ({
                ...parsedResponse,
                uiData: {
                  loading: false,
                },
              }));
              authContext.setAuthState({
                appData: {
                  getLeaderBoardHook: {
                    [pageNumber]: {
                      ...parsedResponse,
                    },
                  },
                },
              });
            } else {
              setLeaderBoardData(() => ({
                ...parsedResponse,
                status: false,
                uiData: {
                  loading: false,
                },
              }));
            }
          }
        }
      });
  };

  useEffect(() => {
    if (initializeData) getLeaderBoardData({});
  }, []);

  return {
    state: leaderBoardData,
    setLeaderBoardData,
    getLeaderBoardData,
  };
};

export default null;

export { useLeaderBoard };
