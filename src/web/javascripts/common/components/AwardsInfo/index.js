import React from 'react';
import { FormattedMessage } from 'react-intl';
import useToolTipPopup from '../../../../../hooks/common/ToolTipPopup';
import AwardsProgressBar from '../AwardsProgressBar';

const AwardInfo = ({
  currentAwardDetails = false,
  repeatingAwards = false,
  className = '',
  onClick = () => { },
  showAwardDescription = true,
  showProgress = true,
}) => {
  const awardId = currentAwardDetails
    ? currentAwardDetails.awardId : repeatingAwards[0].awardId;

  const awardCard = document.querySelector(`.award-card-${awardId}`);
  const awardInfo = document.querySelector(`.award-info-container-${awardId}`);

  useToolTipPopup(awardCard, awardInfo);

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
            showAwardDescription && <small className='award-subtitle overline'>
              <FormattedMessage defaultMessage={'{awardDescription}'} description='award description' values={{
                awardDescription: currentAwardDetails.awardDescription,
              }} />
            </small>
          }
          {showProgress
          && <>
          {currentAwardDetails.progressableAward && currentAwardDetails.progressDetails.nextAwardIn
            && <small className='award-subtitle overline next-achievement-subtitle'>
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
          /></>
          }
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
          {
            showAwardDescription && <small className='award-subtitle overline'>
              <FormattedMessage defaultMessage={'{awardDescription}'} description='award description' values={{
                awardDescription: award.awardDescription,
              }} />
            </small>
          }
          <AwardsProgressBar progressDetailsObj={award.progressDetails} />
        </div>
      </div>)
    }
  </div>;
};

export default AwardInfo;
