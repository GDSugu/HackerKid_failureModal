import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useGetChallenges } from '../../../../hooks/pages/challenges';
import '../../../stylesheets/common/pages/all-challenges/style.scss';
import ChallengesGrid from '../components/ChallengesGrid/ChallengesGrid';
import ChallengesNavBar from '../components/ChallengesNavBar';
import Paginator from '../components/Paginator';
import {
  $, loginCheck, pageInit, timeTrack,
} from '../framework';

const debounce = (fn, delay) => {
  let timerId;

  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const SortDropdown = ({
  isDesktop, sort, onSortOptionClick,
}) => {
  const getSortDisplayName = (activeSort) => {
    const SORTNAMEMAP = {
      popularity: {
        mobile: 'Trending',
        desktop: 'Trending',
      },
      posted: {
        mobile: 'Newest to Oldest',
        desktop: 'Date',
      },
      'reverse-posted': {
        mobile: 'Oldest to Newest',
        desktop: 'Date',
      },
      alphabetical: {
        mobile: 'Alhpabetical',
        desktop: 'Alhpabetical',
      },
      'reverse-alphabetical': {
        mobile: 'Reverse Alphabetical',
        desktop: 'Alhpabetical',
      },
    };

    return SORTNAMEMAP[activeSort][`${isDesktop ? 'desktop' : 'mobile'}`];
  };

  const ArrowUpButton = ({ onClick, className = '' }) => <button type='button' className={className} onClick={onClick} tabIndex={0}>
    <i className='fa fa-arrow-up' />
  </button>;

  const ArrowDownButton = ({ onClick, className = '' }) => <button type='button' className={className} onClick={onClick} tabIndex={0}>
    <i className='fa fa-arrow-down' />
  </button>;

  return (
    <div className='sort-dropdown'>
      <button className="sort-dropdown-toggle dropdown-toggle" type="button" data-toggle="dropdown">
        <img src='../../../../images/common/sort-icon.svg' alt='sort-icon' className='sort-icon' />
        <span className='sort-display-name'>
          <FormattedMessage defaultMessage={'{activeSortName}'} description='sort button text' values={{ activeSortName: getSortDisplayName(sort) }} />
        </span>
      </button>
      <ul className='sort-dropdown-menu dropdown-menu'>
        {
          isDesktop && <>
            <li>
              <button type='button'
                className={`dropdown-item ${sort === 'popularity' ? 'active' : ''}`}
                onClick={(e) => onSortOptionClick(e, 'popularity')}>
                <FormattedMessage defaultMessage={'Trending'} description='sort dropdown button text' />
              </button>
            </li>
            <li className='dropdown-item-container'>
              <button
                type='button'
                className={`dropdown-item ${(sort === 'posted' || sort === 'reverse-posted') ? 'active' : ''}`}
                onClick={(e) => onSortOptionClick(e, 'posted')}>
                <FormattedMessage defaultMessage={'Date'} description='sort dropdown button text' />
              </button>
              <div className='ascending-descending-selectors'>
                <ArrowUpButton
                  onClick={(e) => onSortOptionClick(e, 'reverse-posted')}
                  className={`${sort === 'reverse-posted' ? 'active' : ''}`} />
                <ArrowDownButton
                  onClick={(e) => onSortOptionClick(e, 'posted')}
                  className={`${sort === 'posted' ? 'active' : ''}`} />
              </div>
            </li>
            <li className='dropdown-item-container'>
              <button
                type='button'
                className={`dropdown-item ${(sort === 'alphabetical' || sort === 'reverse-alphabetical') ? 'active' : ''}`}
                tabIndex={0}
                onClick={(e) => onSortOptionClick(e, 'alphabetical')} >
                <span style={{ marginRight: '5rem' }}>
                  <FormattedMessage defaultMessage={'Alphabetical'} description='sort dropdown button text' />
                </span>
              </button>
              <div className='ascending-descending-selectors'>
                <ArrowUpButton
                  onClick={(e) => onSortOptionClick(e, 'alphabetical')}
                  className={`${sort === 'alphabetical' ? 'active' : ''}`}
                />
                <ArrowDownButton
                  onClick={(e) => onSortOptionClick(e, 'reverse-alphabetical')}
                  className={`${sort === 'reverse-alphabetical' ? 'active' : ''}`} />
              </div>
            </li>
          </>
        }
        {
          !isDesktop && <>
            <li>
              <button type='button'
                className={`dropdown-item ${sort === 'popularity' ? 'active' : ''}`}
                onClick={(e) => onSortOptionClick(e, 'popularity')}>
                <FormattedMessage defaultMessage={'Trending'} description='sort dropdown button text' />
              </button>
            </li>
            <li>
              <button
                type='button'
                className={`dropdown-item ${(sort === 'alphabetical') ? 'active' : ''}`}
                onClick={(e) => onSortOptionClick(e, 'alphabetical')}>
                <FormattedMessage defaultMessage={'Alphabetical'} description='sort dropdown button text' />
              </button>
            </li>
            <li>
              <button
                type='button'
                className={`dropdown-item ${(sort === 'reverse-alphabetical') ? 'active' : ''}`}
                onClick={(e) => onSortOptionClick(e, 'reverse-alphabetical')}>
                <FormattedMessage defaultMessage={'Reverse Alphabetical'} description='sort dropdown button text' />
              </button>
            </li>
            <li>
              <button
                type='button'
                className={`dropdown-item ${(sort === 'posted') ? 'active' : ''}`}
                onClick={(e) => onSortOptionClick(e, 'posted')}>
                <FormattedMessage defaultMessage={'Newest to Oldest'} description='sort dropdown button text' />
              </button>
            </li>
            <li>
              <button
                type='button'
                className={`dropdown-item ${(sort === 'reverse-posted') ? 'active' : ''}`}
                onClick={(e) => onSortOptionClick(e, 'reverse-posted')}>
                <FormattedMessage defaultMessage={'Oldest to Newest'} description='sort dropdown button text' />
              </button>
            </li>
          </>
        }
      </ul>
    </div>
  );
};

const SearchBox = ({ onChange }) => <div className='search-box-with-icon'>
  <img src='../../../../images/common/search-icon-svg.svg' alt='search-icon' className='search-icon' />
  <input
    type={'search'}
    name='all-challenges-search'
    placeholder='Search'
    id='all-challenges-search-box'
    className='all-challenges-search-box'
    onChange={onChange}
  />
</div>;

const AllChallenges = () => {
  pageInit('all-challenges-container', 'All Challenges');
  const isPageMounted = useRef(true);

  timeTrack('allchallenges');
  const [localState, setLocalState] = useState({
    sort: 'popularity',
    search: '',
    page: 1,
    searchPage: 1,
  });

  const [isDesktop, setIsDesktop] = useState(window.matchMedia('(min-width: 576px)').matches);

  const {
    state: getChallengesState,
    static: { getChallenges },
  } = useGetChallenges({ isPageMounted });

  const {
    // status: challengesStatus,
    trendingChallenges,
    paginationInfo: {
      perPageCount,
      overAllChallengesCount,
    },
  } = getChallengesState;

  const {
    sort,
    search,
    page,
    searchPage,
  } = localState;

  // methods
  const onSortOptionClick = (e, sortValue) => {
    setLocalState((prev) => ({ ...prev, sort: sortValue }));
  };

  const onSearchBoxChange = (e) => {
    const { value } = e.target;

    setLocalState((prev) => ({ ...prev, search: value }));
  };

  const onPageChange = (pageNumber) => {
    setLocalState((prev) => {
      const newState = prev.search ? {
        ...prev,
        searchPage: pageNumber,
      } : {
        ...prev,
        page: pageNumber,
      };

      return newState;
    });
  };

  const onNextBtnClick = () => {
    setLocalState((prev) => {
      const newState = prev.search ? { ...prev, searchPage: prev.searchPage + 1 }
        : { ...prev, page: prev.page + 1 };

      return newState;
    });
  };

  const onPrevBtnClick = () => {
    setLocalState((prev) => {
      const newState = prev.search ? { ...prev, searchPage: prev.searchPage - 1 }
        : { ...prev, page: prev.page - 1 };

      return newState;
    });
  };

  useEffect(() => {
    const filterObj = {
      sort,
      search,
      page: search ? searchPage : page,
    };
    getChallenges({ filterObj, cached: false });
  }, [sort, search, page, searchPage]);

  useEffect(() => {
    $('nav:first-child').css('display', 'none');
    loginCheck();

    window.addEventListener('resize', () => {
      setIsDesktop(window.matchMedia('(min-width: 576px)').matches);
    });

    return () => {
      $('nav:first-child').css('display', 'block');
      isPageMounted.current = false;
    };
  }, []);

  return <>
    <ChallengesNavBar isDesktop={isDesktop} />
    <main className="col-12 col-md-11 col-xl-10 mx-auto">
      <div className='controls mt-3'>
        <SortDropdown isDesktop={isDesktop} sort={sort} onSortOptionClick={onSortOptionClick} />
        <SearchBox onChange={debounce(onSearchBoxChange, 800)} />
      </div>
      <ChallengesGrid
        challenges={trendingChallenges}
        heading={'All Challenges'}
        contentContainerClassName='all-challenges-section'
        navLinkText='My Challenges'
        navLinkTo={'/your-challenges'}
        showEmptyState={true}
        showCreateChallengeButtonInEmptyState={false}
        emptyStateText={'No Challenges found!'}
        numberOfSkeletonCards={12}
        challengeCardType='link'
      />
    </main>
    {
      Boolean(Number(overAllChallengesCount))
      && Boolean(Number(perPageCount)) && <Paginator
        totalItems={Number(overAllChallengesCount)}
        countPerPage={Number(perPageCount)}
        currentPageNumber={search ? searchPage : page}
        initialWindow={isDesktop ? 5 : 3}
        onPageChange={onPageChange}
        onNextBtnClick={onNextBtnClick}
        onPrevBtnClick={onPrevBtnClick}
      />
    }
  </>;
};

export default AllChallenges;
