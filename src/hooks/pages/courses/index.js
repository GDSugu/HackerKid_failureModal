import { useEffect, useState } from 'react';
import post from '../../common/framework';

const useCourses = ({ isPageMounted }) => {
  const [courseData, setCourseData] = useState({
    status: true,
    moduleData: false,
  });

  const getVideosData = () => {
    post({ type: 'fetchVideoHome' }, 'videos/').then((res) => {
      if (isPageMounted.current) {
        if (res !== 'access_denied') {
          const parsedRes = JSON.parse(res);
          parsedRes.overallProgress.watchTime = parsedRes?.progress
            ?.reduce((acc, val) => acc + val.watchTime, 0);
          setCourseData(parsedRes);
        }
      }
    });
  };

  useEffect(() => {
    getVideosData();
  }, []);

  const result = {
    courseData,
    setCourseData,
    static: {
      getVideosData,
    },
  };

  return result;
};

export default useCourses;
