import React from 'react';
import { FormattedMessage } from 'react-intl';
import AwardCard from '../AwardsCard';
import AwardInfo from '../AwardsInfo';

const AwardsGrid = ({
  awards,
  totalAwards,
  isDesktop,
  limit,
  showSeeMoreCard = true,
  onSeeMoreCardClick = () => { },
  defaultStructure = false,
}) => <div className='row award-cards-container mx-n2'>
    {
      awards && awards.map((award, idx) => <div className='col-3 px-1 py-1' key={idx}>
        <div className='award-card-with-awards-info'>
          <AwardCard
            // eslint-disable-next-line no-nested-ternary
            awardImage={defaultStructure
              ? (award.currentAward
                ? award.currentAward.awardImage
                : award.repeatingAwards[0].awardImage)
              : award.awardImage
            }
            interactable={true}
            className={`pointer-cursor award-card-${defaultStructure ? award.currentAward.awardId : award.awardId}`} />
          <AwardInfo
            isDesktop={isDesktop}
            className={`award-info-container-${defaultStructure ? award.currentAward.awardId : award.awardId}`}
            currentAwardDetails={defaultStructure ? award.currentAward : award}
            repeatingAwards={award.repeatingAwards ? award.repeatingAwards : false}
          />
        </div>
      </div>)
    }
    {
      awards && showSeeMoreCard && (limit === 15 && totalAwards > limit) && <div className='col-3 px-1 py-1'>
        <button className='achievement-card award-card see-more-card' onClick={() => onSeeMoreCardClick(0)}>
          <i className="fa fa-plus"></i>
          <FormattedMessage defaultMessage={'See All Awards'} description='see more card text' />
        </button>
      </div>
    }
    {
      awards && showSeeMoreCard && limit === 0 && <div className='col-3 px-1 py-1'>
        <button className='achievement-card award-card see-more-card' onClick={() => onSeeMoreCardClick(15)}>
          <i className="fa fa-minus"></i>
          <FormattedMessage defaultMessage={'See Less Awards'} description='see more card text' />
        </button>
      </div>
    }
  </div>;

export default AwardsGrid;
