import React, { useRef, useEffect, useState } from 'react';
import Plyr from 'plyr-react';
import Hls from 'hls.js';
import FuzzySearch from 'fuzzy-search';
import {
  pageInit, $, pathNavigator, timeTrack,
} from '../framework';
import '../../../../../node_modules/plyr-react/plyr.css';
import '../../../stylesheets/common/sass/components/_paginator.scss';
import '../../../stylesheets/common/pages/courses/style.scss';
import useVideos from '../../../../hooks/pages/videos';
import CourseCard, { CustomSwiperComponent } from '../components/courseCard';
import PageNator from '../components/Paginator';
import SuccessModalComponent from '../modal/VideoAwardModal';

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
            <h4>{prop.viewCount}</h4>
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
  if (showModal) {
    $('.rating-modal').modal('show');
  }

  const onPressSubmit = () => {
    submitRating(checkedItem).then((res) => {
      if (res.status === 'success') {
        closeRef.current.click();
        afterSubmit();
      }
    });
  };

  return (
    <div
      className="modal fade rating-modal"
      id="modal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="errorModal"
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <div className="d-flex flex-column justify-content-between">
              <div className="modal-container">
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
                <div className="rating-modal-footer">
                  <button
                    type="button"
                    data-dismiss="modal"
                    aria-label="Close"
                    className="btn btn-outline-primary mr-2"
                    ref={closeRef}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary text-white"
                    onClick={() => onPressSubmit()}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const doBeforeClose = (e) => {
  const message = 'Do you really wanna Close ?';
  e.returnValue = message;
  return message;
};

const videoPlayerProcess = ({
  currentQuestion,
  ref,
  timeActivity,
  setRatingModal,
  setEarned,
}) => {
  let currentTime = 0;
  let playBackTime = 0;
  let seekedTime = 0;
  let completeUpdated = false;
  let timeAdded = false;
  const source = `${currentQuestion.videoLink}`;
  useEffect(() => {
    const player = ref.current.plyr;
    const { media } = player;
    if (!currentQuestion.completed && currentQuestion.timeleftAt) {
      $(media).on('canplay', () => {
        if (!timeAdded) {
          player.currentTime = currentQuestion.timeleftAt - 2;
          timeAdded = true;
        }
      });
    }

    $(media).on('play', () => {
      window.addEventListener('beforeunload', doBeforeClose, true);
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
          if (res.addedPoints) {
            setEarned({
              show: true,
              coins: res.addedPoints,
              xp: res.addedXp,
            });
          }
        });
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
      window.removeEventListener('beforeunload', doBeforeClose, true);
    });

    $(media).on('ended', () => {
      setRatingModal(true);
      window.removeEventListener('beforeunload', doBeforeClose, true);
    });

    const hls = new Hls();
    hls.loadSource(source);
    hls.attachMedia(media);
  });
};

const getUrlData = () => {
  const url = window.location.href;
  const urlArray = url.split('/');
  const index = urlArray.indexOf('videos');
  const video = {};
  video.number = parseInt(urlArray[index + 2], 10);
  video.moduleId = urlArray[index + 1];
  return video;
};

const Videos = () => {
  if (window.location.href.includes('videos')) {
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

  const [showRatingModal, setRatingModal] = useState(false);
  const { currentQuestion, watchNext } = videoData;
  const ref = useRef();
  const [earnedInfo, setEarned] = useState({
    show: false,
    coins: 0,
    xp: 0,
  });
  if (urlData.number) {
    videoPlayerProcess({
      currentQuestion,
      ref,
      timeActivity,
      setRatingModal,
      setEarned,
    });
  }
  const { moduleData } = invidualModuleData;
  const [filteredData, setFilterData] = useState(false);
  const [page, selectPage] = useState(1);

  const searcher = new FuzzySearch(moduleData.videos, ['title']);
  const onSearch = (e) => {
    const keyword = e.target.value;
    const result = searcher.search(keyword);
    setFilterData(result);
  };
  const isDesktop = window.matchMedia('(min-width: 576px)').matches;

  return !urlData.number ? (
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
          {moduleData.moduleName} - {moduleData.type}
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
            : moduleData
              && moduleData.videos.map(
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
        {moduleData && moduleData.videos.length > 10 && (
          <PageNator
            totalItems={
              filteredData ? filteredData.length : moduleData.videos.length
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
        <Plyr id="video-player" ref={ref} />
      </div>
      {currentQuestion && <RatingAndWatchedComponent prop={currentQuestion} />}
      <RatingModal
        submitRating={submitRating}
        showModal={showRatingModal}
        afterSubmit={
          watchNext.videos && watchNext.videos.length > 0
            ? () => {
              pathNavigator(
                `videos/${watchNext[0].moduleId}/${watchNext[0].number}`,
              );
            }
            : () => {
              pathNavigator(
                `videos/${watchNext.videos[0].moduleId}/1`,
              );
            }
        }
      />
      <SuccessModalComponent
      showModal={earnedInfo.show}
      xpEarned = {earnedInfo.xp}
      coinsEarned = {earnedInfo.coins}
      playNext = {
        watchNext.videos && watchNext.videos.length > 0
          ? () => {
            pathNavigator(
              `videos/${watchNext.videos[0].moduleId}/${watchNext.videos[0].number}`,
            );
          }
          : () => {
            pathNavigator(
              `videos/${watchNext.videos[0].moduleId}/1`,
            );
          }
      }
      />
      {(watchNext && watchNext.videos.length > 0) && <WatchNextComponent
        isDesktop={isDesktop}
        items={watchNext} />}
    </div>
  );
};

export default Videos;
