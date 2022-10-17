import React, { useState } from 'react';
import '../../../../stylesheets/common/pages/courses/style.scss';

const courseCard = ({ data }) => (
  <a href={`${window.location.origin}/videos/${data.moduleId}/${data.number}`}>
    <div className='course-card'>
      <p className='video-type'>{data.type}</p>
      <img className='play-btn' src='../../../../../images/courses/play-btn.png' />
      <img className='w-100 thumbnail-img' src={data.thumbnail} />
      <div className='card-foot'>
        <p>{data.title}</p>
      </div>
    </div>
  </a>
);

const TopContainer = ({
  pressMoreInfo, searchOnChange, onChangeFilter, filterSet,
}) => <div><div className='top-session'>
<p>Videos</p>
<p className='more-info' onClick={pressMoreInfo}>More Info</p></div><SearchAndFilter
searchOnChange={searchOnChange}
onChangeFilter={onChangeFilter}
filterSet={filterSet}/></div>;

const SearchAndFilter = ({ searchOnChange, onChangeFilter, filterSet }) => {
  const [filterVisible, setFilterVisibility] = useState(false);
  return (<div><div className='filter-n-search'>
  <div className='filter-cont'
  onClick={() => setFilterVisibility(!filterVisible)}>
  <img className='filter-icon' src='../../../../images/courses/filter-icon.svg'/>
  <p className='mb-0'>Filter</p>
  </div>
  <div className='form-control search-cont'>
<img className='search-icon' src='../../../../images/courses/search.svg'/>
<input onChange={(value) => searchOnChange(value)} className='search-input' placeholder='Search'/>
</div></div>
{filterVisible && <div className='filter-cat-cont'>
<div className='filter-cat mb-3' onClick={() => { onChangeFilter('Solution Videos'); setFilterVisibility(!filterVisible); }}><div className={`selection-circle ${(filterSet === 'Solution Videos') && 'selected'}`}></div><p className='mb-0'>Solution Videos</p></div>
<div className='filter-cat' onClick={() => { onChangeFilter('Session Videos'); setFilterVisibility(!filterVisible); }}><div className={`selection-circle ${(filterSet === 'Session Videos') && 'selected'}`}></div><p className='mb-0'>Session Videos</p></div>
</div>}
</div>);
};

export default courseCard;

export { TopContainer };
