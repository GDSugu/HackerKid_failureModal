import { createPopper } from '@popperjs/core';
import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import AwardsProgressBar from '../AwardsProgressBar';

const AwardInfo = ({
  isDesktop,
  currentAwardDetails = false,
  repeatingAwards = false,
  className = '',
  onClick = () => { },
}) => {
  useEffect(() => {
    if (isDesktop) {
      const awardId = currentAwardDetails
        ? currentAwardDetails.awardId : repeatingAwards[0].awardId;

      const awardCard = document.querySelector(`.award-card-${awardId}`);
      const awardInfo = document.querySelector(`.award-info-container-${awardId}`);

      createPopper(awardCard, awardInfo, {
        placement: 'bottom-start',
      });
    }
  }, []);

  return <div className={`award-info-container ${className}`}>
    {
      currentAwardDetails
      && <div className='award-info' onClick={() => onClick(currentAwardDetails)}>
        <img src={currentAwardDetails.awardImage} alt='award-logo' />
        <div className='award-details'>
          <h6 className='award-title body'>
            <FormattedMessage defaultMessage={'{title} {awardCount}'} description='award title' values={{
              title: currentAwardDetails.awardName,
              awardCount: currentAwardDetails.awardCount ? `(x${currentAwardDetails.awardCount})` : '',
            }} />
          </h6>
          {
            currentAwardDetails.progressableAward && currentAwardDetails.progressDetails.nextAwardIn
            && <small className='award-subtitle overline'>
              <FormattedMessage defaultMessage={'Next Achievement: {nextAchievementIn} {unit}'} description='award subtitle' values={{
                nextAchievementIn: currentAwardDetails.progressDetails.nextAwardIn,
                unit: currentAwardDetails.progressDetails.nextAwardIn > 1 ? `${currentAwardDetails.progressDetails.unit}s`
                  : currentAwardDetails.progressDetails.unit,
              }} />
            </small>
          }
          <AwardsProgressBar
            progressDetailsObj={currentAwardDetails.progressableAward
              ? currentAwardDetails.progressDetails
              : false}
          />
        </div>
      </div>
    }
    {
      repeatingAwards && repeatingAwards.map((award, idx) => <div className='award-info' key={idx} onClick={() => onClick(award)}>
        <img src={award.awardImage} alt='award-logo' />
        <div className='award-details'>
          <h6 className={`award-title ${!currentAwardDetails ? 'body' : ''}`}>
            <FormattedMessage defaultMessage={'{title} {awardCount}'} description='award title' values={{
              title: award.awardName,
              awardCount: award.awardCount ? `(x${award.awardCount})` : '',
            }} />
          </h6>
          <AwardsProgressBar progressDetailsObj={award.progressDetails} />
        </div>
      </div>)
    }
  </div>;
};

export default AwardInfo;
