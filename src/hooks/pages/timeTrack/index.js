// import { useEffect } from 'react';
import TimeMe from 'timeme.js';
import post, { clearSession, getSession, setSession } from '../../common/framework';
import getPlatform from '../../common/utlis';

const postTimeTrack = (data) => {
  const postData = { type: 'trackTimeSpent', ...data };
  return post(postData, 'timeTrack/');
};

const useTimeTrack = ({ navigation = false }) => {
  const platform = getPlatform();
  // const timeTrack = (pageName) => {
  //   const platform = getPlatform();
  //   // const timeData = authorize.getSession('timeTracked');
  //   const timeData = getSession('timeTracked');
  //   if (timeData) {
  //     const { page, timeSpent } = timeData;

  //     postTimeTrack({
  //       page,
  //       timeSpent,
  //       platform,
  //     });
  //     clearSession('timeTracked');
  //   }

  //   return useEffect(() => {
  //     TimeMe.setCurrentPageName(pageName);
  //     TimeMe.startTimer(pageName, 0);
  //     console.log('platform ', platform);
  //     if (platform === 'web') {
  //       window.addEventListener('beforeunload', () => {
  //         setSession('timeTracked', JSON.stringify({
  //           page: pageName,
  //           timeSpent: TimeMe.getTimeOnPageInSeconds(pageName),
  //         }));
  //       }, true);
  //     } else if (platform === 'app') {
  //       if (navigation) {
  //         navigation?.addListener('beforeRemove', () => {
  //           setSession('timeTracked', JSON.stringify({
  //             page: pageName,
  //             timeSpent: TimeMe.getTimeOnPageInSeconds(pageName),
  //           }));
  //         });
  //       }
  //     }
  //     return () => {
  //       if (TimeMe.getTimeOnPageInSeconds(pageName) > 1) {
  //         postTimeTrack({
  //           page: pageName,
  //           timeSpent: TimeMe.getTimeOnPageInSeconds(pageName),
  //           platform,
  //         });
  //       }
  //       TimeMe.stopTimer(pageName);
  //       TimeMe.resetRecordedPageTime(pageName);
  //     };
  //   });
  // };

  const startTimeTrack = (pageName) => {
    const timeData = getSession('timeTracked');
    if (timeData) {
      const { page, timeSpent } = timeData;
      postTimeTrack({
        page,
        timeSpent,
        platform,
      });
      clearSession('timeTracked');
    }

    TimeMe.setCurrentPageName(pageName);
    TimeMe.startTimer(pageName, 0);
    if (platform === 'web') {
      window.addEventListener('beforeunload', () => {
        setSession('timeTracked', JSON.stringify({
          page: pageName,
          timeSpent: TimeMe.getTimeOnPageInSeconds(pageName),
        }));
      }, true);
    } else if (platform === 'app') {
      if (navigation) {
        navigation?.addListener('beforeRemove', () => {
          setSession('timeTracked', JSON.stringify({
            page: pageName,
            timeSpent: TimeMe.getTimeOnPageInSeconds(pageName),
          }));
        });
      }
    }
  };

  const stopTimeTrack = (pageName) => {
    if (TimeMe.getTimeOnPageInSeconds(pageName) > 1) {
      postTimeTrack({
        page: pageName,
        timeSpent: TimeMe.getTimeOnPageInSeconds(pageName),
        platform,
      });
    }
    TimeMe.stopTimer(pageName);
    TimeMe.resetRecordedPageTime(pageName);
  };

  return {
    static: {
      startTimeTrack,
      stopTimeTrack,
    },
  };
};

export default postTimeTrack;

export {
  useTimeTrack,
};
