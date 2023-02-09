import React, { useRef, useEffect, useState } from 'react';
import Plyr from 'plyr-react';
import Hls from 'hls.js';
import FuzzySearch from 'fuzzy-search';
import { FormattedMessage } from 'react-intl';
import {
  pageInit, $, pathNavigator, timeTrack, isFeatureEnabled,
} from '../framework';
import '../../../../../node_modules/plyr-react/plyr.css';
import '../../../stylesheets/common/sass/components/_paginator.scss';
import '../../../stylesheets/common/pages/courses/style.scss';
import useVideos from '../../../../hooks/pages/videos';
import CourseCard, { CustomSwiperComponent } from '../components/courseCard';
import PageNator from '../components/Paginator';
import SuccessModalComponent from '../modal/VideoAwardModal';
import Img from '../components/Img';
import {
  upsertDescription, upsertFBMeta, upsertTitle, upsertTwitterMeta,
} from '../seo';
import { SubscriptionContext } from '../../../../hooks/pages/root';

const WatchNextComponent = ({ items, isDesktop }) => (
  <>
    <div className="w-100 mt-4">
      <div className="course-card-container">
        <h5>Watch Next</h5>
        <CustomSwiperComponent
          data={items.videos}
          SlideComponent={CourseCard}
          swiperModules={{
            navigation: true,
          }}
          module={items}
          isDesktop={isDesktop}
          swiperProps={{
            spaceBetween: 16,
            slidesPerView: 'auto',
            className: 'course-swiper',
            grabCursor: true,
            lazy: true,
            navigation: true,
          }}
        />
      </div>
    </div>
  </>
);

const updateSeoTags = (parsedResponse) => {
  try {
    if (parsedResponse) {
      const title = `${parsedResponse.title} - Courses Level - Hackerkid`;
      const { description } = parsedResponse;
      const url = `${window.location.origin}/turtle/${parsedResponse.number}/${parsedResponse.uniqueString}`;
      const image = parsedResponse.thumbnail;
      upsertTitle(title);
      upsertDescription(description);
      upsertFBMeta(title, description, url, image);
      upsertTwitterMeta(title, description, url, image);
    }
  } catch (error) {
    console.log(error);
  }
};

const updateHistory = (response) => {
  try {
    if (response) {
      const { uniqueString, number, moduleId } = response;
      window.history.replaceState({}, '', `/courses/${moduleId}/${number}/${uniqueString}`);
    }
  } catch (error) {
    console.log(error);
  }
};

const StarRating = ({ rating }) => {
  const decimalPoint = rating % 1;
  const integerPart = parseInt(rating, 10);
  const starData = [];
  for (let index = 0; index < 5; index += 1) {
    if (index < integerPart) {
      starData.push(<i key={index} className="fas fa-star rated-star"></i>);
    } else if (index === integerPart && decimalPoint > 0.2) {
      starData.push(
        <span key={index}>
          <i className="fas fa-star-half rated-star"></i>
          <i className="fas fa-star background-star"></i>
        </span>,
      );
    } else {
      starData.push(<i key={index} className="fas fa-star empty-star"></i>);
    }
  }
  return starData;
};

const RatingAndWatchedComponent = ({ prop }) => (
  <div className="video-discription-container">
    <div className="d-flex flex-column flex-md-row justify-content-between">
      <div>
        <h4>{prop.title}</h4>
        <p>{prop.description}</p>
      </div>
      <div className="rating-tags-container">
        <div className="rating-container">
          <div>
            <h4>{prop.viewCount || 0}</h4>
            <p className="color-sub">watched this</p>
          </div>
          <div className="pr-5">
            {prop.averageRating === 0 ? (
              <p>Not rated yet</p>
            ) : (
              <h4>{prop.averageRating}</h4>
            )}
            <div>
              <StarRating rating={prop.averageRating} />
            </div>
          </div>
        </div>
        <hr />
        <div className="tag-container">
          <p className="color-sub">Tags:</p>
          <p className="video-tags">
            {prop.tags.map((t, i) => (i + 1 === prop.tags.length ? (
                <span key={i}>{t}</span>
            ) : (
                <span key={i}>{t}, </span>
            )))}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const RatingModal = ({ submitRating, showModal, afterSubmit }) => {
  const parentRef = React.createRef();
  const closeRef = React.createRef();
  const [checkedItem, setCheckedItem] = useState(false);
  const [modalState, setModalState] = useState(1);
  const username = localStorage.getItem('name');
  if (showModal.showModal === true) {
    $('.rating-modal').modal('show');
  }

  const onPressSubmit = () => {
    submitRating(checkedItem).then((res) => {
      if (res.status === 'success') {
        setModalState(2);
      }
    });
  };

  const onPressSkip = () => {
    setModalState(2);
  };

  const onPressContinue = () => {
    afterSubmit();
    closeRef.current.click();
  };

  return (
    <div
      className="modal fade rating-modal"
      id="modal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="errorModal"
      aria-hidden="true">
      {(modalState === 1) && <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body">
          <div className="d-flex flex-column justify-content-between">
               <div className="modal-container">
                <div className='text-center rating-head'>
                  <h5> <FormattedMessage
          defaultMessage={'Awesome! You are Rocking!'}
          description={'Award Modal Heading'}/></h5>
                  <p><FormattedMessage
          defaultMessage={'Please share your feedback on how you enjoyed the course!'}
          description={'Award Modal Desciption'}/></p>
                </div>
                <div className="rating-star-container text-center">
                  <div className="rating-group unchecked" ref={parentRef}>
                    <input
                      className="rating__input"
                      name="rating3"
                      id="rating3-0"
                      value="0"
                      type="radio"
                      onChange={() => {
                        setCheckedItem(0);
                      }}
                      onClick={() => parentRef.current.classList.remove('unchecked')
                      }
                    />
                    <label
                      aria-label="1 star"
                      className="rating__label"
                      htmlFor="rating3-1">
                      <i className="rating__icon rating__icon--star fa fa-star"></i>
                    </label>
                    <input
                      className="rating__input"
                      name="rating3"
                      id="rating3-1"
                      value="1"
                      type="radio"
                      onChange={() => {
                        setCheckedItem(1);
                      }}
                      onClick={() => parentRef.current.classList.remove('unchecked')
                      }
                    />
                    <label
                      aria-label="2 stars"
                      className="rating__label"
                      htmlFor="rating3-2">
                      <i className="rating__icon rating__icon--star fa fa-star"></i>
                    </label>
                    <input
                      className="rating__input"
                      name="rating3"
                      id="rating3-2"
                      value="2"
                      type="radio"
                      onChange={() => {
                        setCheckedItem(2);
                      }}
                      onClick={() => parentRef.current.classList.remove('unchecked')
                      }
                    />
                    <label
                      aria-label="3 stars"
                      className="rating__label"
                      htmlFor="rating3-3">
                      <i className="rating__icon rating__icon--star fa fa-star"></i>
                    </label>
                    <input
                      className="rating__input"
                      name="rating3"
                      id="rating3-3"
                      value="3"
                      type="radio"
                      onChange={() => {
                        setCheckedItem(3);
                      }}
                      onClick={() => parentRef.current.classList.remove('unchecked')
                      }
                    />
                    <label
                      aria-label="4 stars"
                      className="rating__label"
                      htmlFor="rating3-4">
                      <i className="rating__icon rating__icon--star fa fa-star"></i>
                    </label>
                    <input
                      className="rating__input"
                      name="rating3"
                      id="rating3-4"
                      value="4"
                      type="radio"
                      onChange={() => {
                        setCheckedItem(4);
                      }}
                      onClick={() => parentRef.current.classList.remove('unchecked')
                      }
                    />
                    <label
                      aria-label="5 stars"
                      className="rating__label"
                      htmlFor="rating3-5">
                      <i className="rating__icon rating__icon--star fa fa-star"></i>
                    </label>
                    <input
                      className="rating__input"
                      name="rating3"
                      id="rating3-5"
                      value="5"
                      type="radio"
                      onChange={() => {
                        setCheckedItem(5);
                      }}
                      onClick={() => parentRef.current.classList.remove('unchecked')
                      }
                    />
                  </div>
                </div>
                <div className='d-flex flex-column'>
                  <button
                    type="button"
                    className="btn btn-primary text-white"
                    onClick={() => onPressSubmit()}>
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn mt-3 color-primary"
                    onClick={() => onPressSkip()}>
                    <FormattedMessage
                      defaultMessage={'Skip'}
                      description={'skip button'}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
      {(modalState === 2) && <div className="modal-dialog custom-modal-rating modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body">
          <div className="d-flex flex-column justify-content-between align-items-center">
           {(showModal.awardsGiven && showModal.awardsGiven.length > 0) && <div className='award-container'>
            {showModal.awardsGiven.map((award, index) => (<img key={index} className='award-icon' src={award.awardImage}></img>))}

</div>}
            <div className={(showModal.awardsGiven && showModal.awardsGiven.length > 0) ? 'modal-icon-container' : 'no-award-modal-container'}>
              <div className='coin-img-cont'>
              <Img
        className='coin-icon'
        src='../../../images/courses/XP-big.png'/>
        <p className='m-0'>+{showModal.xp} xp</p>
                </div>
                <div className='coin-img-cont'>
                <Img
        className='coin-icon'
        src='../../../images/courses/Coins-big.png'/>
        <p className='m-0'>+{showModal.points} coins</p>
                </div>

            </div>
          <div className='text-center award-des-head'>
                  <h5> <FormattedMessage
                        defaultMessage={'Congratulations! '}
                        description={'Award Modal Heading'}/></h5>
                 {(showModal.awardsGiven && showModal.awardsGiven.length > 0) ? <p><FormattedMessage
                        defaultMessage={'Congratulations {user}, you have earned the {award} for your excellent record.'}
                        description={'Award Modal Desciption'}
                        values={{
                          award: `${showModal.awardsGiven.length === 1 ? showModal.awardsGiven[0].awardName : showModal.awardsGiven.map((each) => `${each.awardName}`).join(' & ')}`,
                          user: username,
                        }}/></p> : <p><FormattedMessage
                        defaultMessage={'Congratulations {user}, you have earned {coins} coins for completing the video.'}
                        description={'Award Modal Desciption'}
                        values={{
                          coins: showModal.points,
                          user: username,
                        }}/></p>}
                         <button
                    type="button"
                    className="btn btn-primary text-white continue-btn"
                    onClick={() => onPressContinue()}>
                    Continue
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
};

const videoPlayerProcess = ({
  currentQuestion,
  ref,
  timeActivity,
  setRatingModal,
}) => {
  let currentTime = 0;
  let playBackTime = 0;
  let seekedTime = 0;
  let completeUpdated = false;
  let timeAdded = false;
  let awardRes = false;
  // const [ended, setEnded] = useState(false);
  const source = `${currentQuestion.videoLink}`;
  useEffect(() => {
    const player = ref.current.plyr;
    const { media } = player;
    if (!currentQuestion.completed && currentQuestion.timeleftAt) {
      $(media).on('canplay', () => {
        $('.plyr__control--forward').eq(1).hide();
        if (!timeAdded) {
          player.currentTime = currentQuestion.timeleftAt - 2;
          timeAdded = true;
        }
        if (media.paused) {
          $('.video-player-container').on('click', '.plyr--paused', () => {
            player.play();
          });
        }
      });
    }

    $(media).on('play', () => {
      window.addEventListener('beforeunload', () => {
        const videoData = {
          moduleId: currentQuestion.moduleId,
          videoId: currentQuestion.videoId,
          timeTracked: player.currentTime,
        };
        localStorage.setItem('videoData', JSON.stringify(videoData));
      }, true);
    });

    $(media).on('timeupdate', () => {
      const videoDuration = media.duration * 0.9;
      if (!player.seeking && currentTime <= player.currentTime) {
        currentTime = player.currentTime;
        playBackTime = currentTime - seekedTime;
      }
      if (playBackTime > videoDuration && !completeUpdated) {
        const videoData = {
          moduleId: currentQuestion.moduleId,
          videoId: currentQuestion.videoId,
          timeTracked: player.currentTime,
          completed: true,
        };
        completeUpdated = true;
        timeActivity({ videoData }).then((res) => {
          if (res.awardDetails.points) {
            awardRes = res.awardDetails;
            awardRes.showModal = true;
            // setRatingModal(res.awardDetails);
          }
        });
      }
      // console.log((parseInt(currentTime, 10) + 1) === parseInt(media.duration, 10),
      //   parseInt(currentTime, 10) + 1, parseInt(media.duration, 10));
      if ((parseInt(currentTime, 10) + 1) === parseInt(media.duration, 10)) {
        if (awardRes) {
          setRatingModal(awardRes);
        }
      }
    });

    $(media).on('seeking seeked', () => {
      const seekedTo = player.currentTime;
      if (currentTime < seekedTo) {
        seekedTime = seekedTo - currentTime + seekedTime;
      }
    });

    $(media).on('pause', () => {
      const videoData = {
        moduleId: currentQuestion.moduleId,
        videoId: currentQuestion.videoId,
        timeTracked: player.currentTime,
      };
      timeActivity({ videoData });
      window.removeEventListener('beforeunload', () => {}, true);
    });

    $(media).on('ended', () => {
      window.removeEventListener('beforeunload', () => {}, true);
      // console.log(setEnded(true));
      // if (showRatingModal.points) {
      //   const modalData = showRatingModal;
      //   modalData.showModal = true;
      //   setRatingModal(modalData);
      // }
    });

    const hls = new Hls();
    hls.loadSource(source);
    hls.attachMedia(media);
  });
};

const getUrlData = () => {
  const url = window.location.href;
  const urlArray = url.split('/');
  const index = urlArray.indexOf('courses');
  const video = {};
  video.number = parseInt(urlArray[index + 2], 10);
  video.moduleId = urlArray[index + 1];
  return video;
};

const Videos = () => {
  if (window.location.href.includes('courses')) {
    pageInit('courses-container', 'Courses');
  }

  timeTrack('videos');

  const isPageMounted = React.useRef(true);
  const urlData = getUrlData();

  const {
    videoData, submitRating, timeActivity, invidualModuleData,
  } = useVideos(
    { isPageMounted, urlData },
  );
  const [showRatingModal, setRatingModal] = useState({ showModal: false });

  const { currentQuestion, watchNext } = videoData;
  const ref = useRef();
  const [earnedInfo, setEarned] = useState({
    show: false,
    coins: 0,
    xp: 0,
  });
  const { subscriptionData } = React.useContext(SubscriptionContext);

  const coursesLimit = (category) => {
    const coursesEnabled = isFeatureEnabled(subscriptionData, 'courses', category);
    return coursesEnabled.enabled && coursesEnabled[category];
  };

  if (urlData.number) {
    if (urlData.number > coursesLimit(urlData.moduleId)) {
      pathNavigator('courses');
    }
    videoPlayerProcess({
      currentQuestion,
      ref,
      timeActivity,
      setRatingModal,
      setEarned,
    });
    updateSeoTags(currentQuestion);
    updateHistory(currentQuestion);
  }
  const { moduleData } = invidualModuleData;
  const [lockedData, setLockedData] = useState(false);
  const [lockedWatchNext, setLockedWatchNext] = useState(false);
  const [filteredData, setFilterData] = useState(false);
  const [page, selectPage] = useState(1);
  const searcher = new FuzzySearch(lockedData.videos, ['title']);
  const onSearch = (e) => {
    const keyword = e.target.value;
    const result = searcher.search(keyword);
    setFilterData(result);
  };
  const isDesktop = window.matchMedia('(min-width: 576px)').matches;

  useEffect(() => {
    if (moduleData) {
      const moduleLimit = coursesLimit(moduleData.moduleId);
      if (moduleLimit) {
        moduleData.videos.forEach((video, videoIndex) => {
          if (videoIndex >= moduleLimit) {
            moduleData.videos[videoIndex].locked = true;
          }
        });
      }
      setLockedData(moduleData);
    }
  }, [moduleData]);

  useEffect(() => {
    if (watchNext) {
      const moduleLimit = coursesLimit(watchNext.moduleId);
      if (moduleLimit) {
        watchNext.videos.forEach((video, videoIndex) => {
          if (video.number > moduleLimit) {
            watchNext.videos[videoIndex].locked = true;
          }
        });
      }
      setLockedWatchNext(watchNext);
    }
  }, [watchNext]);

  useEffect(() => {
    if (urlData.number) {
      if (urlData.number > coursesLimit(urlData.moduleId)) {
        console.log('here');
        window.location.href = '/courses';
      }
    }
  }, [urlData]);

  return <>
    <div className="col-12 col-md-11 col-xl-10 mx-auto video-body-container">
      {
        !urlData.number ? (
          <>
            {!isDesktop && (
              <div>
                <div className="top-session">
                  <p>Videos</p>
                </div>
                <div className="filter-n-search">
                  <div className="form-control search-cont">
                    <img
                      className="search-icon"
                      src="../../../../images/courses/search.svg"
                    />
                    <input
                      onChange={(value) => onSearch(value)}
                      className="search-input"
                      placeholder="Search"
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="course-videos-container">
              <h5 className="m-3">
                {`${lockedData.moduleName} ${lockedData.type ? ` - ${lockedData.type}` : ''}`}
              </h5>
              <div className="text-center">
                {filteredData
                  ? filteredData.map(
                    (items, index) => index < page * 10
                        && index > page * 10 - 10 && (
                          <div className="mb-2 video-card-cont" key={index}>
                            <CourseCard data={items} />{' '}
                          </div>
                    ),
                  )
                  : lockedData
                    && lockedData.videos.map(
                      (items, index) => index < page * 10
                        && index > page * 10 - 11 && (
                          <div
                            className="mb-2 video-card-cont"
                            data-key={index}
                            key={index}>
                            <CourseCard data={items} />{' '}
                          </div>
                      ),
                    )}
              </div>
            </div>
            <div>
              {lockedData && lockedData.videos.length > 10 && (
                <PageNator
                  totalItems={
                    filteredData ? filteredData.length : lockedData.videos.length
                  }
                  countPerPage={10}
                  currentPageNumber={page}
                  onPageChange={(value) => selectPage(value)}
                  onNextBtnClick={() => selectPage(page + 1)}
                  onPrevBtnClick={() => selectPage(page - 1)}
                />
              )}
            </div>
          </>
        ) : (
          <div className="video-page-container">
            <div className="video-player-container">
              <Plyr id="video-player" ref={ref}/>
            </div>
            {currentQuestion && <RatingAndWatchedComponent prop={currentQuestion} />}
            <RatingModal
              submitRating={submitRating}
              showModal={showRatingModal}
              afterSubmit={
                lockedWatchNext.videos && lockedWatchNext.videos.length > 0
                  ? () => {
                    pathNavigator(
                      `courses/${lockedWatchNext.videos[0].moduleId}/${lockedWatchNext.videos[0].number}`,
                    );
                  }
                  : () => {
                    pathNavigator(
                      `courses/${lockedWatchNext.videos[0].moduleId}/1`,
                    );
                  }
              }
            />
            <SuccessModalComponent
            showModal={earnedInfo.show}
            xpEarned = {earnedInfo.xp}
            coinsEarned = {earnedInfo.coins}
            playNext = {
              lockedWatchNext.videos && lockedWatchNext.videos.length > 0
                ? () => {
                  pathNavigator(
                    `courses/${lockedWatchNext.videos[0].moduleId}/${lockedWatchNext.videos[0].number}`,
                  );
                }
                : () => {
                  pathNavigator(
                    `courses/${lockedWatchNext.videos[0].moduleId}/1`,
                  );
                }
            }
            />
            {(lockedWatchNext && lockedWatchNext.videos.length > 0) && <WatchNextComponent
              isDesktop={isDesktop}
              items={lockedWatchNext} />}
          </div>
        )
      }
    </div>
  </>;
};

export default Videos;
