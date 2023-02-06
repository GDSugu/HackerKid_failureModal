import post from '../../common/framework';

const postTimeTrack = (data) => {
  const postData = { type: 'trackTimeSpent', ...data };
  return post(postData, 'timeTrack/');
};
export default postTimeTrack;
