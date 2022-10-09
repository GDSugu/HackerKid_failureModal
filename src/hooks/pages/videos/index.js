import { useState, useEffect } from 'react';
import post from '../../common/framework';

const getUrlData = () => {
  const url = window.location.href;
  const urlArray = url.split('/');
  const video = {};
  video.number = parseInt(urlArray[urlArray.length - 1], 10);
  video.moduleId = urlArray[urlArray.length - 2];
  return video;
};

const getVideoData = ({ isPageMounted, setVideoData }) => {
  const { number, moduleId } = getUrlData();
  post({ type: 'fetchVideoPlayer', number, moduleId }, 'videos/').then((res) => {
    if (isPageMounted.current) {
      const parsedRes = JSON.parse(res);
      setVideoData(parsedRes);
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

const useVideos = ({ isPageMounted }) => {
  const [videoData, setVideoData] = useState({
    status: true,
    currentQuestion: false,
    watchNext: [],
  });

  const submitRating = (rating) => {
    const { moduleId, number, videoId } = videoData.currentQuestion;
    return post({
      type: 'submitRating', moduleId, number, rating, videoId,
    }, 'videos/').then((res) => JSON.parse(res));
  };

  useEffect(() => {
    getVideoData({ isPageMounted, setVideoData, videoData });
  }, []);

  const result = {
    videoData,
    setVideoData,
    submitRating,
    timeActivity,
  };

  return result;
};

export default useVideos;
