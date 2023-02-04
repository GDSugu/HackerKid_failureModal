import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  loginCheck, pageInit, $, timeTrack,
} from '../framework';
import '../../../stylesheets/common/pages/awards/style.scss';
import MoreAccountNavBar from '../components/MoreAccountNavBar';
import SortDropdown from '../components/SortDropdown_new';
import SearchBox from '../components/SearchBox';
import { useAwards } from '../../../../hooks/pages/awards';
// import MobileAwardsNavBar from '../components/MobileAwardsNavBar';
import BottomSheet from '../components/BottomSheet';
import AwardsGrid from '../components/AwardsGrid';
import AwardsMobileList from '../components/AwardsMobileList';
import AwardsProgressBar from '../components/AwardsProgressBar';

const BottomSheetBody = ({ awardInfoToView }) => <>
  {
    awardInfoToView
    && <div className='award-info'>
      <img src={awardInfoToView.awardImage} alt='award-logo' />
      <div className='award-details'>
        <h6 className='award-title body'>
          <FormattedMessage defaultMessage={'{title} {awardCount}'} description='award title' values={{
            title: awardInfoToView.awardName,
            awardCount: awardInfoToView.awardCount ? `(x${awardInfoToView.awardCount})` : '',
          }} />
        </h6>
        <small className='award-subtitle overline'>
          <FormattedMessage defaultMessage={'{awardDescription}'} description='award subtitle' values={{
            awardDescription: awardInfoToView.awardDescription,
          }} />
        </small>
        {
          <div className='progress-details'>
            {
              awardInfoToView.progressDetails && !!awardInfoToView.progressDetails.progress
              && <div className='current-progress'>
                <small>
                  <FormattedMessage defaultMessage={'{currentProgress} {unit}'} description='current progress' values={{
                    currentProgress: awardInfoToView.progressDetails.progress,
                    unit: awardInfoToView.progressDetails.progress > 1 ? `${awardInfoToView.progressDetails.unit}s`
                      : awardInfoToView.progressDetails.unit,
                  }} />
                </small>
              </div>
            }
            {
              awardInfoToView.progressDetails && !!awardInfoToView.progressDetails.nextAwardIn
              && <div className='next-award'>
                <small>
                  <span className='next-award-label'>
                    <FormattedMessage defaultMessage={'Next award:'} description='next award label' />
                  </span>
                  <span className='next-award-in-with-unit'>
                    <FormattedMessage
                      defaultMessage={'{nextAwardIn} {unit}'}
                      description='next award in'
                      values={{
                        nextAwardIn: ` ${awardInfoToView.progressDetails.nextAwardIn}`,
                        unit: awardInfoToView.progressDetails.nextAwardIn > 1 ? `${awardInfoToView.progressDetails.unit}s`
                          : awardInfoToView.progressDetails.unit,
                      }}
                    />
                  </span>
                </small>
              </div>
            }
          </div>
        }
        <AwardsProgressBar
          progressDetailsObj={awardInfoToView.progressDetails}
        />
      </div>
    </div>
  }
</>;

const Awards = () => {
  const isPageMounted = React.useRef(true);

  pageInit('awards-container', 'Awards');

  timeTrack('awards');

  const [isDesktop, setIsDesktop] = React.useState(window.matchMedia('(min-width: 576px)').matches);

  const { awardsState, getAwards } = useAwards({ isPageMounted });
  const [localState, setLocalState] = useState({
    awardInfoToView: false,
  });

  const {
    status,
    awards,
    sort,
    limit,
    searchQuery,
    totalAwards,
  } = awardsState;

  const {
    awardInfoToView,
  } = localState;

  const setAwardInfoToView = (awardObj) => {
    setLocalState((prev) => ({
      ...prev,
      awardInfoToView: awardObj,
    }));
  };

  // event listeners
  const onSortBtnClick = (clickedSort) => {
    getAwards({
      cached: false,
      searchQuery,
      sort: clickedSort,
      limit,
    });
  };

  const onSearchBoxChange = (value) => {
    getAwards({
      cached: false,
      searchQuery: value,
      sort,
      limit,
    });
  };

  const onSeeMoreCardClick = (requestedLimit) => {
    getAwards({
      cached: false,
      searchQuery,
      limit: requestedLimit,
      sort,
    });
  };

  const onMobileAwardInfoClick = (awardDetails) => {
    $('#mobile-detailed-awards-info').modal('show');
    setAwardInfoToView(awardDetails);
  };

  React.useEffect(() => {
    loginCheck();
    window.addEventListener('resize', () => {
      setIsDesktop(window.matchMedia('(min-width: 576px)').matches);
    });

    return () => {
      isPageMounted.current = false;
    };
  }, []);

  // for testing purpose only
  // const awards = [
  //   {
  //     currentAward: {
  //       awardId: 1,
  //       awardName: 'Testing',
  //       awardImage: '../../../../images/achievements/award1.png',
  //       awardDescription: 'just testing bro',
  //       progressableAward: true,
  //       progressDetails: {
  //         progress: 1,
  //         total: 2,
  //         unit: 'day',
  //         nextAwardIn: 10,
  //       },
  //     },
  //     repeatingAwards: [
  //       {
  //         awardName: 'Testing',
  //         awardImage: '../../../../images/achievements/award1.png',
  //         awardDescription: 'just testing bro',
  //         progressableAward: true,
  //         awardCount: 2,
  //         progressDetails: {
  //           progress: 1,
  //           total: 2,
  //           unit: 'day',
  //           nextAwardIn: 10,
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     currentAward: {
  //       awardId: 2,
  //       awardName: 'Testing',
  //       awardImage: '../../../../images/achievements/award1.png',
  //       awardDescription: 'just testing bro',
  //       progressableAward: true,
  //       progressDetails: {
  //         progress: 1,
  //         total: 2,
  //         unit: 'day',
  //         nextAwardIn: 10,
  //       },
  //     },
  //     repeatingAwards: [
  //       {
  //         awardName: 'Testing',
  //         awardImage: '../../../../images/achievements/award1.png',
  //         awardDescription: 'just testing bro',
  //         progressableAward: true,
  //         awardCount: 2,
  //         progressDetails: {
  //           progress: 1,
  //           total: 2,
  //           unit: 'day',
  //           nextAwardIn: 10,
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     currentAward: {
  //       awardId: 3,
  //       awardName: 'Testing',
  //       awardImage: '../../../../images/achievements/award1.png',
  //       awardDescription: 'just testing bro',
  //       progressableAward: true,
  //       progressDetails: {
  //         progress: 1,
  //         total: 2,
  //         unit: 'day',
  //         nextAwardIn: 10,
  //       },
  //     },
  //     repeatingAwards: [
  //       {
  //         awardName: 'Testing',
  //         awardImage: '../../../../images/achievements/award1.png',
  //         awardDescription: 'just testing bro',
  //         progressableAward: true,
  //         awardCount: 2,
  //         progressDetails: {
  //           progress: 1,
  //           total: 2,
  //           unit: 'day',
  //           nextAwardIn: 10,
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     currentAward: {
  //       awardId: 4,
  //       awardName: 'Testing',
  //       awardImage: '../../../../images/achievements/award1.png',
  //       awardDescription: 'just testing bro',
  //       progressableAward: true,
  //       progressDetails: {
  //         progress: 1,
  //         total: 2,
  //         unit: 'day',
  //         nextAwardIn: 10,
  //       },
  //     },
  //     repeatingAwards: [
  //       {
  //         awardName: 'Testing',
  //         awardImage: '../../../../images/achievements/award1.png',
  //         awardDescription: 'just testing bro',
  //         progressableAward: true,
  //         awardCount: 2,
  //         progressDetails: {
  //           progress: 1,
  //           total: 2,
  //           unit: 'day',
  //           nextAwardIn: 10,
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     currentAward: {
  //       awardId: 5,
  //       awardName: 'Testing',
  //       awardImage: '../../../../images/achievements/award1.png',
  //       awardDescription: 'just testing bro',
  //       progressableAward: true,
  //       progressDetails: {
  //         progress: 1,
  //         total: 2,
  //         unit: 'day',
  //         nextAwardIn: 10,
  //       },
  //     },
  //     repeatingAwards: [
  //       {
  //         awardName: 'Testing',
  //         awardImage: '../../../../images/achievements/award1.png',
  //         awardDescription: 'just testing bro',
  //         progressableAward: true,
  //         awardCount: 2,
  //         progressDetails: {
  //           progress: 1,
  //           total: 2,
  //           unit: 'day',
  //           nextAwardIn: 10,
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     currentAward: {
  //       awardId: 5,
  //       awardName: 'Testing',
  //       awardImage: '../../../../images/achievements/award1.png',
  //       awardDescription: 'just testing bro',
  //       awardCount: 2,
  //       progressableAward: false,
  //       progressDetails: {
  //         progress: 1,
  //         total: 2,
  //         unit: 'day',
  //         nextAwardIn: 10,
  //       },
  //     },
  //   },
  //   {
  //     currentAward: {
  //       awardId: 5,
  //       awardName: 'Testing',
  //       awardImage: '../../../../images/achievements/award1.png',
  //       awardDescription: 'just testing bro',
  //       awardCount: 2,
  //       progressableAward: false,
  //       progressDetails: {
  //         progress: 1,
  //         total: 2,
  //         unit: 'day',
  //         nextAwardIn: 10,
  //       },
  //     },
  //   },
  //   {
  //     currentAward: {
  //       awardId: 5,
  //       awardName: 'Testing',
  //       awardImage: '../../../../images/achievements/award1.png',
  //       awardCount: 2,
  //       awardDescription: 'just testing bro',
  //       progressableAward: false,
  //       progressDetails: {
  //         progress: 1,
  //         total: 2,
  //         unit: 'day',
  //         nextAwardIn: 10,
  //       },
  //     },
  //   },
  // ];

  return <>
    <MoreAccountNavBar />
    {/* <MobileAwardsNavBar className='mx-3' /> */}
    <main className='col-12 col-sm-10 col-md-8 col-xl-6 mx-auto mt-3'>
      {
        (status === 'success') && <div className='controls'>
          <SortDropdown
            isDesktop={isDesktop}
            sort={sort}
            onSortOptionClick={onSortBtnClick}
            extraSortOptions={[{
              default: {
                keyName: 'default',
                desktopName: 'Default',
                mobileName: 'Default',
              },
              reverse: false,
            }]}
          />
          <SearchBox
            name='awards-search-box'
            id='awards-search-box'
            className='awards-search-box'
            onChange={onSearchBoxChange}
          />
        </div>
      }
      {
        status === 'error' && <div className='error-indicator'>
          <h4>
            <FormattedMessage defaultMessage={'No Awards Found!'} description='error message' />
          </h4>
        </div>
      }
      {
        <>
          {
            awards && sort === 'default' && !searchQuery ? <>
              {
                !!awards.today.length && <div className='today mt-3'>
                  <h5>
                    <FormattedMessage defaultMessage={'Today'} description='section heading' />
                  </h5>
                  {
                    isDesktop && <AwardsGrid
                      awards={awards.today}
                      isDesktop={isDesktop}
                      showSeeMoreCard={false}
                      limit={limit}
                      totalAwards={totalAwards}
                      defaultStructure={true}
                    />
                  }
                  {
                    !isDesktop && <AwardsMobileList
                      isDesktop={isDesktop}
                      awards={awards.today}
                      limit={limit}
                      totalAwards={totalAwards}
                      showSeeMoreBtn={false}
                      onAwardsInfoClick={onMobileAwardInfoClick}
                      defaultStructure={true}
                    />
                  }
                </div>
              }
              {
                !!awards.previous.length && <div className='previous-awards mt-3'>
                  <h5>
                    <FormattedMessage defaultMessage={'Previous Awards'} description='section heading' />
                  </h5>
                  {
                    isDesktop && <AwardsGrid
                      awards={awards.previous}
                      isDesktop={isDesktop}
                      sort={sort}
                      showSeeMoreCard={true}
                      limit={limit}
                      totalAwards={totalAwards}
                      onSeeMoreCardClick={onSeeMoreCardClick}
                      defaultStructure={true}
                    />
                  }
                  {
                    !isDesktop && <AwardsMobileList
                      isDesktop={isDesktop}
                      awards={awards.previous}
                      limit={limit}
                      totalAwards={totalAwards}
                      showSeeMoreBtn={true}
                      onSeeMoreCardClick={onSeeMoreCardClick}
                      onAwardsInfoClick={onMobileAwardInfoClick}
                      defaultStructure={true}
                    />
                  }
                </div>
              }
            </>
              : <>
                {
                  isDesktop && <AwardsGrid
                    awards={awards}
                    isDesktop={isDesktop}
                    sort={sort}
                    showSeeMoreCard={true}
                    limit={limit}
                    totalAwards={totalAwards}
                    onSeeMoreCardClick={onSeeMoreCardClick}
                  />
                }
                {
                  !isDesktop && <AwardsMobileList
                    isDesktop={isDesktop}
                    awards={awards}
                    limit={limit}
                    totalAwards={totalAwards}
                    showSeeMoreBtn={true}
                    onSeeMoreCardClick={onSeeMoreCardClick}
                    onAwardsInfoClick={onMobileAwardInfoClick}
                  />
                }
              </>
          }
          <BottomSheet id={'mobile-detailed-awards-info'}>
            <BottomSheetBody awardInfoToView={awardInfoToView} />
          </BottomSheet>
        </>
      }
    </main>
  </>;
};

export default Awards;
