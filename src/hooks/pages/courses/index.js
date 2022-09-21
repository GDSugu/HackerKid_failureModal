import { useContext, useEffect, useState } from 'react';
import post from '../../common/framework';
import { AuthContext } from '../root';

const useCourses = ({ isPageMounted }) => {
  const [courseData, setCourseData] = useState({
    status: true,
    moduleData: false,
  });

  const authContext = useContext(AuthContext);

  const getVideosData = () => {
    post({ type: 'fetchVideoHome' }, 'videos/').then((res) => {
      if (isPageMounted.current) {
        const parsedRes = JSON.parse(res);
        setCourseData(parsedRes);
      }
    });
  };

  useEffect(() => {
    getVideosData({});
  }, []);

  const result = {
    courseData,
    setCourseData,
  };

  return result;
};

export default useCourses;
