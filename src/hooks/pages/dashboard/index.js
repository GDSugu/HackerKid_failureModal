import { useContext, useEffect, useState } from 'react';
import post, { getSession } from '../../common/framework';
import API from '../../../../env';
import { AuthContext } from '../root';

const useDashboard = ({ dateString = new Date().toISOString(), isPageMounted }) => {
  const [dashboardData, setDashboardData] = useState({
    status: true,
    dashBoardData: false,
    userData: false,
    gameData: false,
    sessionData: false,
  });

  const authContext = useContext(AuthContext);

  const getSessionData = ({ cached = true }) => {
    let result;
    if (cached && authContext.sessionData.authtoken) {
      const { sessionData } = authContext;
      setDashboardData((prevState) => ({
        ...prevState,
        sessionData: {
          name: sessionData.name,
          pointsEarned: sessionData.pointsEarned,
          profileLink: sessionData.profileLink,
          rank: sessionData.rank,
        },
      }));
      result = new Promise((resolve) => {
        resolve(true);
      });
    } else {
      const sessionPromises = [getSession('name'), getSession('pointsEarned'), getSession('profileLink'), getSession('rank')];
      Promise.all(sessionPromises).then((res) => {
        if (isPageMounted.current) {
          setDashboardData((prevState) => ({
            ...prevState,
            sessionData: {
              name: res[0],
              pointsEarned: res[1],
              profileLink: res[2],
              rank: res[3],
            },
          }));
        }
        result = new Promise((resolve) => {
          resolve(true);
        });
      });
    }
    return result;
  };

  const getDashboardData = ({ cached = true }) => {
    const queryDate = new Date(Date.parse(dateString));
    const isoDate = queryDate.toISOString().substring(0, 10);
    let result;
    if (cached && authContext.appData.dashBoardHook) {
      const { dashBoardHook } = authContext.appData;
      setDashboardData((prevState) => ({
        ...prevState,
        ...dashBoardHook,
      }));
      result = new Promise((resolve) => {
        resolve(true);
      });
    } else {
      result = post({ type: 'dashBoardData', date: isoDate, s3Prefix: API.S3PREFIX }, 'dashboard/')
        .then((res) => {
          if (isPageMounted.current) {
            if (res === 'access_denied') {
              setDashboardData((prevState) => ({
                ...prevState,
                status: 'access_denied',
              }));
            } else {
              const parsedResponse = JSON.parse(res);
              if (parsedResponse.status === 'success') {
                const { dashBoardData } = parsedResponse;
                let totalGames = 0;
                let gameProgress = 0;
                let totalPointsEarned = 0;
                Object.keys(dashBoardData).forEach((key) => {
                  totalGames += dashBoardData[key].overAllQuestionCount;
                  gameProgress += dashBoardData[key].validSubmissionCount;
                  totalPointsEarned += dashBoardData[key].totalPointsEarned;
                });
                setDashboardData((prevState) => ({
                  ...prevState,
                  ...parsedResponse,
                  gameData: {
                    totalGames,
                    gameProgress,
                    totalPointsEarned,
                  },
                }));
                authContext.setAuthState({
                  appData: {
                    dashBoardHook: {
                      ...parsedResponse,
                      gameData: {
                        totalGames,
                        gameProgress,
                        totalPointsEarned,
                      },
                    },
                  },
                });
              } else {
                setDashboardData((prevState) => ({
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

  useEffect(() => {
    getSessionData({});
    getDashboardData({});
  }, []);

  const result = {
    state: dashboardData,
    setState: setDashboardData,
    static: {
      getSessionData,
      getDashboardData,
    },
  };

  return result;
};

export default null;

export { useDashboard };
