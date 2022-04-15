import { useEffect, useState } from 'react';
import post, { getSession } from '../../common/framework';
import API from '../../../../env';

const useDashboard = (dateString = new Date().toISOString()) => {
  const [dashboardData, setDashboardData] = useState({
    status: true,
    dashBoardData: false,
    userData: false,
    gameData: false,
    sessionData: false,
  });

  const result = {
    state: dashboardData,
    setState: setDashboardData,
  };

  useEffect(() => {
    const queryDate = new Date(Date.parse(dateString));
    const isoDate = queryDate.toISOString().substring(0, 10);
    const sessionPromises = [getSession('name'), getSession('pointsEarned'), getSession('profileLink'), getSession('rank')];
    Promise.all(sessionPromises).then((res) => {
      setDashboardData((prevState) => ({
        ...prevState,
        sessionData: {
          name: res[0],
          pointsEarned: res[1],
          profileLink: res[2],
          rank: res[3],
        },
      }));
    });
    post({ type: 'dashBoardData', date: isoDate, s3Prefix: API.S3PREFIX }, 'dashboard/')
      .then((res) => {
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
          } else {
            setDashboardData((prevState) => ({
              ...prevState,
              ...parsedResponse,
              status: false,
            }));
          }
        }
      });
  }, []);

  return result;
};

export default null;

export { useDashboard };
