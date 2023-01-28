import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss';
import '../../../../stylesheets/common/pages/courses/style.scss';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import Img from '../Img';

const courseCard = ({ data }) => (
  <a href={`${window.location.origin}/videos/${data.moduleId}/${data.number}`}>
    <div className='course-card'>
      <p className='video-type'><FormattedMessage
          defaultMessage={'{type}'}
          description={'video type'}
          values={{ type: data.type }}/></p>
      <img className='play-btn' src='../../../images/courses/play-btn.png' />
      <img className='w-100 thumbnail-img' src={data.thumbnail} />
      <div className='card-foot'>
        <p><FormattedMessage
          defaultMessage={'{title}'}
          description={'video title'}
          values={{ title: data.title }}/></p>
      </div>
    </div>
  </a>
);

const TopContainer = ({
  pressMoreInfo, searchOnChange, onChangeFilter, filterSet,
}) => <div><div className='top-session'>
<p><FormattedMessage
          defaultMessage={'Videos'}
          description={'course Heading'}/></p>
<p className='more-info' onClick={pressMoreInfo}><FormattedMessage
          defaultMessage={'More Info'}
          description={'More Info title'}/></p></div><SearchAndFilter
searchOnChange={searchOnChange}
onChangeFilter={onChangeFilter}
filterSet={filterSet}/></div>;

const SearchAndFilter = ({ searchOnChange, onChangeFilter, filterSet }) => {
  const [filterVisible, setFilterVisibility] = useState(false);
  return (<div><div className='filter-n-search'>
  <div className='filter-cont'
  onClick={() => setFilterVisibility(!filterVisible)}>
  <img className='filter-icon' src='../../../images/courses/filter-icon.svg'/>
  <p className='mb-0'><FormattedMessage
          defaultMessage={'Filter'}
          description={'Filter Button'}/></p>
  </div>
  <div className='form-control search-cont'>
<img className='search-icon' src='../../../images/courses/search.svg'/>
<input onChange={(value) => searchOnChange(value)} className='search-input' placeholder='Search'/>
</div></div>
{filterVisible && <div className='filter-cat-cont'>
<div className='filter-cat mb-3' onClick={() => { onChangeFilter('Solution Videos'); setFilterVisibility(!filterVisible); }}><div className={`selection-circle ${(filterSet === 'Solution Videos') && 'selected'}`}></div><p className='mb-0'><FormattedMessage
          defaultMessage={'Solution Videos'}
          description={'Solution Videos Button'}/></p></div>
<div className='filter-cat' onClick={() => { onChangeFilter('Session Videos'); setFilterVisibility(!filterVisible); }}><div className={`selection-circle ${(filterSet === 'Session Videos') && 'selected'}`}></div><p className='mb-0'><FormattedMessage
          defaultMessage={'Session Videos'}
          description={'Session Videos Button'}/></p></div>
</div>}
</div>);
};

const MobileOnlyComponent = ({ data }) => (
  <a href={`${window.location.origin}/videos/${data.moduleId}`}>
    <div className="course-card mobile-only-card">
      <div className="text-center mt-4">
        <p className="mb-0"><FormattedMessage
          defaultMessage={'View all {data}'}
          description={'Module Name'}
          values={{ data: data.moduleName }}/></p>
        <p className="mb-0"><FormattedMessage
          defaultMessage={'{type}'}
          description={'Module type'}
          values={{ type: data.type }}/>?</p>
      </div>
      <img
        className="mobile-play-btn"
        src="../../../images/courses/play-btn.png"
      />
    </div>
  </a>
);

const CustomSwiperComponent = ({
  data,
  SlideComponent,
  swiperModules,
  swiperProps,
  isDesktop,
  module,
}) => {
  const modulesList = [];

  if (swiperModules.navigation) modulesList.push(Navigation);

  return (
    <>
      <Swiper {...swiperProps} modules={modulesList}>
        {data.length < 3 || isDesktop
          ? data.map((item, index) => (
              <SwiperSlide key={index}>
                <SlideComponent data={item} />
              </SwiperSlide>
          ))
          : data.map(
            (item, index) => index < 3 && (
                  <SwiperSlide key={index}>
                    <SlideComponent data={item} />
                  </SwiperSlide>
            ),
          )}
        {data.length > 3 && !isDesktop && (
          <SwiperSlide key={4}>
            <MobileOnlyComponent data={module} />
          </SwiperSlide>
        )}
      </Swiper>
    </>
  );
};

export default courseCard;

export { TopContainer, CustomSwiperComponent };
