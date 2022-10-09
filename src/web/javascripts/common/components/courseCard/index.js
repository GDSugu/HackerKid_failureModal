import React from 'react';
import '../../../../stylesheets/common/pages/courses/style.scss';

const courseCard = ({ data }) => (
  <a href={`${window.location.origin}/videos/${data.moduleId}/${data.number}`}>
    <div className='course-card'>
      <p className='video-type'>{data.type}</p>
      <img className='play-btn' src='../../../../../images/courses/play-btn.png' />
      <img className='w-100' src={data.thumbnail} />
      <div className='card-foot'>
        <p>{data.title}</p>
      </div>
    </div>
  </a>
);

export default courseCard;
