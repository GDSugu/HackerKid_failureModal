import { useEffect, useState } from 'react';
import post from '../../common/framework';

const useLeaderBoard = (initializeData = true) => {
  const [leaderBoardData, setLeaderBoardData] = useState({
    status: true,
    leaderboardData: false,
    userData: false,
    paginationDetails: false,
  });

  const getLeaderBoardData = (pageNumber = 1) => post({ type: 'getLeaderBoard', page: pageNumber }, 'turtle/')
    .then((res) => {
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
    });

  useEffect(() => {
    if (initializeData) getLeaderBoardData();
  }, []);

  return {
    state: leaderBoardData,
    getLeaderBoardData,
  };
};

export default null;

export { useLeaderBoard };
