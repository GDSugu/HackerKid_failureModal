import React from 'react';
import '../../../../stylesheets/common/sass/components/_achievement-card.scss';

const AwardCard = ({
  // award,
  awardImage,
  className = '',
  interactable = false,
}) => <div className={`achievement-card award-card ${className}`} tabIndex={interactable ? 0 : undefined}>
    <img src={awardImage} alt='award-icon' className='award-card-icon' />
  </div>;

export default AwardCard;
