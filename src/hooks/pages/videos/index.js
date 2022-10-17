import { useState, useEffect } from 'react';
import post from '../../common/framework';

const getVideoData = ({
  isPageMounted, setVideoData, moduleId, number,
}) => {
  post({ type: 'fetchVideoPlayer', number, moduleId }, 'videos/').then((res) => {
    if (isPageMounted.current) {
      const parsedRes = JSON.parse(res);
      setVideoData(parsedRes);
    }
  });
};

const getInvidualModuleData = ({ isPageMounted, setInvidualModuleData, moduleId }) => {
  post({ type: 'fetchModuleVideos', moduleId }, 'videos/').then((res) => {
    if (isPageMounted.current) {
      const parsedRes = JSON.parse(res);
      setInvidualModuleData(parsedRes);
    }
  });
};

const timeActivity = ({ videoData }) => post({
  type: 'videoPlayerUpdate',
  moduleId: videoData.moduleId,
  videoId: videoData.videoId,
  completed: videoData.completed ? videoData.completed : false,
  timeTracked: parseInt(videoData.timeTracked, 10),
}, 'videos/').then((res) => JSON.parse(res));

const useVideos = ({ isPageMounted, urlData }) => {
  const [videoData, setVideoData] = useState({
    status: true,
    currentQuestion: false,
    watchNext: [],
  });

  const [invidualModuleData, setInvidualModuleData] = useState({
    status: true,
    moduleData: false,
  });

  const submitRating = (rating) => {
    const { moduleId, number, videoId } = videoData.currentQuestion;
    return post({
      type: 'submitRating', moduleId, number, rating, videoId,
    }, 'videos/').then((res) => JSON.parse(res));
  };
  const { moduleId, number } = urlData;
  useEffect(() => {
    if (number) {
      getVideoData({
        isPageMounted, setVideoData, moduleId, number,
      });
    } else {
      getInvidualModuleData({
        isPageMounted, setInvidualModuleData, moduleId,
      });
    }
  }, []);

  const result = {
    videoData,
    setVideoData,
    submitRating,
    timeActivity,
    invidualModuleData,
    setInvidualModuleData,
  };

  return result;
};

export default useVideos;
