import { useEffect, useState } from 'react';
import post from '../../common/framework';
import API from '../../../../env';

const useLeaderBoard = ({ initializeData = true, isPageMounted }) => {
  const [leaderBoardData, setLeaderBoardData] = useState({
    status: true,
    leaderboardData: false,
    userData: false,
    paginationDetails: false,
  });

  const getLeaderBoardData = (pageNumber = 1) => post({ type: 'getLeaderBoard', page: pageNumber, s3Prefix: API.S3PREFIX }, 'turtle/')
    .then((res) => {
      if (isPageMounted.current) {
        if (res === 'access_denied') {
          setLeaderBoardData((prevState) => ({
            ...prevState,
            status: 'access_denied',
          }));
        } else {
          const parsedResponse = JSON.parse(res);
          if (parsedResponse.status === 'success') {
            setLeaderBoardData(() => ({
              ...parsedResponse,
            }));
          } else {
            setLeaderBoardData(() => ({
              ...parsedResponse,
              status: false,
            }));
          }
        }
      }
    });

  useEffect(() => {
    if (initializeData) getLeaderBoardData();
  }, []);

  return {
    state: leaderBoardData,
    setLeaderBoardData,
    getLeaderBoardData,
  };
};

export default null;

export { useLeaderBoard };
