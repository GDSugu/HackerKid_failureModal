import React from 'react';
import { FormattedMessage } from 'react-intl';
import AwardInfo from '../AwardsInfo';

const AwardsMobileList = ({
  awards,
  isDesktop,
  onAwardsInfoClick = () => { },
  limit,
  totalAwards,
  showSeeMoreBtn = false,
  onSeeMoreCardClick = () => { },
  defaultStructure = false,
}) => <div className='mobile-award-cards-container'>
    {
      awards && awards.map((award, idx) => <AwardInfo
        key={idx}
        isDesktop={isDesktop}
        currentAwardDetails={defaultStructure ? award.currentAward : award}
        repeatingAwards={award.repeatingAwards ? award.repeatingAwards : false}
        onClick={onAwardsInfoClick}
      />)
    }
    {
      awards && showSeeMoreBtn && (limit === 15 && totalAwards > limit) && <button className='see-more-less-btn btn-block caption-bold' onClick={() => onSeeMoreCardClick(0)}>
        <span>
          <FormattedMessage defaultMessage={'See All Awards'} description='see all awards btn text' />
        </span>
        <i className="fa fa-chevron-down"></i>
      </button>
    }
    {
      awards && showSeeMoreBtn && limit === 0 && <button className='see-more-less-btn btn-block caption-bold' onClick={() => onSeeMoreCardClick(15)}>
        <span>
          <FormattedMessage defaultMessage={'See Less Awards'} description='see all awards btn text' />
        </span>
        <i className="fa fa-chevron-up"></i>
      </button>
    }
  </div>;

export default AwardsMobileList;
