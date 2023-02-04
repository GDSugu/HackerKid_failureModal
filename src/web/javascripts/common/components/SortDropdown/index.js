import React from 'react';
import { FormattedMessage } from 'react-intl';

const SortDropdown = ({
  isDesktop, sort = 'posted', onSortOptionClick = () => { },
}) => {
  const getSortDisplayName = (activeSort) => {
    const SORTNAMEMAP = {
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
      <button className="sort-dropdown-toggle dropdown-toggle control" type="button" data-toggle="dropdown">
        <img src='../../../../images/common/sort-icon.svg' alt='sort-icon' className='sort-icon' />
        <span className='sort-display-name'>
          <FormattedMessage defaultMessage={'{activeSortName}'} description='sort button text' values={{ activeSortName: getSortDisplayName(sort) }} />
        </span>
      </button>
      <ul className='sort-dropdown-menu dropdown-menu'>
        {
          isDesktop && <>
            <li className='dropdown-item-container'>
              <button
                type='button'
                className={`dropdown-item ${(sort === 'posted' || sort === 'reverse-posted') ? 'active' : ''}`}
                onClick={() => onSortOptionClick('posted')}>
                <FormattedMessage defaultMessage={'Date'} description='sort dropdown button text' />
              </button>
              <div className='ascending-descending-selectors'>
                <ArrowUpButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onSortOptionClick('reverse-posted');
                  }}
                  className={`${sort === 'reverse-posted' ? 'active' : ''}`} />
                <ArrowDownButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onSortOptionClick('posted');
                  }}
                  className={`${sort === 'posted' ? 'active' : ''}`} />
              </div>
            </li>
            <li className='dropdown-item-container'>
              <button
                type='button'
                className={`dropdown-item ${(sort === 'alphabetical' || sort === 'reverse-alphabetical') ? 'active' : ''}`}
                tabIndex={0}
                onClick={() => onSortOptionClick('alphabetical')} >
                <span style={{ marginRight: '5rem' }}>
                  <FormattedMessage defaultMessage={'Alphabetical'} description='sort dropdown button text' />
                </span>
              </button>
              <div className='ascending-descending-selectors'>
                <ArrowUpButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onSortOptionClick('alphabetical');
                  }}
                  className={`${sort === 'alphabetical' ? 'active' : ''}`}
                />
                <ArrowDownButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onSortOptionClick('reverse-alphabetical');
                  }}
                  className={`${sort === 'reverse-alphabetical' ? 'active' : ''}`} />
              </div>
            </li>
          </>
        }
        {
          !isDesktop && <>
            <li>
              <button
                type='button'
                className={`dropdown-item ${(sort === 'alphabetical') ? 'active' : ''}`}
                onClick={() => onSortOptionClick('alphabetical')}>
                <FormattedMessage defaultMessage={'Alphabetical'} description='sort dropdown button text' />
              </button>
            </li>
            <li>
              <button
                type='button'
                className={`dropdown-item ${(sort === 'reverse-alphabetical') ? 'active' : ''}`}
                onClick={() => onSortOptionClick('reverse-alphabetical')}>
                <FormattedMessage defaultMessage={'Reverse Alphabetical'} description='sort dropdown button text' />
              </button>
            </li>
            <li>
              <button
                type='button'
                className={`dropdown-item ${(sort === 'posted') ? 'active' : ''}`}
                onClick={() => onSortOptionClick('posted')}>
                <FormattedMessage defaultMessage={'Newest to Oldest'} description='sort dropdown button text' />
              </button>
            </li>
            <li>
              <button
                type='button'
                className={`dropdown-item ${(sort === 'reverse-posted') ? 'active' : ''}`}
                onClick={() => onSortOptionClick('reverse-posted')}>
                <FormattedMessage defaultMessage={'Oldest to Newest'} description='sort dropdown button text' />
              </button>
            </li>
          </>
        }
      </ul>
    </div>
  );
};

export default SortDropdown;
