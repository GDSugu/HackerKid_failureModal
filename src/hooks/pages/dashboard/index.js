import { useEffect, useState } from 'react';
import post from '../../common/framework';
import API from '../../../../env';

const useDashboard = (dateString = new Date().toISOString()) => {
  const [dashboardData, setDashboardData] = useState({
    status: true,
    dashBoardData: false,
    userData: false,
  });

  const result = {
    state: dashboardData,
    setState: setDashboardData,
  };

  useEffect(() => {
    const queryDate = new Date(Date.parse(dateString));
    const isoDate = queryDate.toISOString().substring(0, 10);
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
            setDashboardData(() => ({
              ...parsedResponse,
            }));
          } else {
            setDashboardData(() => ({
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
