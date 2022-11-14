import React from 'react';
import '../../../../stylesheets/common/sass/components/_achievement-card.scss';

const AwardCard = ({
  // award,
  className = '',
  interactable = false,
}) => <div className={`achievement-card award-card ${className}`} tabIndex={interactable ? 0 : undefined}>
    <img src='../../../../../images/achievements/award1.png' alt='award-icon' />
  </div>;

export default AwardCard;
