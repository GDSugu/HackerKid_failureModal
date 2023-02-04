import React from 'react';
import { FormattedMessage } from 'react-intl';
import '../../../../stylesheets/common/sass/components/_achievement-card.scss';

const AwardCard = ({
  // award,
  awardImage,
  awardName,
  className = '',
  interactable = false,
}) => <div
  className={`achievement-card award-card ${className}`}
  tabIndex={interactable ? 0 : undefined}
  id={'award-card'}
>
    <img src={awardImage} alt='award-icon' className='award-card-icon' />
    <h5 className='mt-1 caption award-name'>
      <FormattedMessage defaultMessage={'{awardName}'} description='award name label' values={{ awardName }} />
    </h5>
  </div>;

export default AwardCard;
