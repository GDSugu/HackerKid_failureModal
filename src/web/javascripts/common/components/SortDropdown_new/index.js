import React from 'react';
import { FormattedMessage } from 'react-intl';

const sortOptions = [
  {
    default: {
      keyName: 'posted',
      desktopName: 'Date',
      mobileName: 'Newest to Oldest',
    },
    reverse: {
      keyName: 'reverse-posted',
      desktopName: 'Date',
      mobileName: 'Oldest to Newest',
    },
  },
  {
    default: {
      keyName: 'alphabetical',
      desktopName: 'Alphabetical',
      mobileName: 'Alphabetical',
    },
    reverse: {
      keyName: 'reverse-alphabetical',
      desktopName: 'Alphabetical',
      mobileName: 'Reverse Alphabetical',
    },
  },
];

const getSortDisplayName = (currentSortOptions, sortKey) => {
  let result;

  currentSortOptions.forEach((obj) => {
    if (obj.default.keyName === sortKey) {
      result = obj.default;
    } else if (obj.reverse.keyName === sortKey) {
      result = obj.reverse;
    }
  });

  return result;
};

const SortDropdown = ({
  isDesktop, sort = 'posted', onSortOptionClick = () => { }, extraSortOptions = [],
}) => {
  let currentSortOptions = sortOptions;

  if (extraSortOptions) {
    currentSortOptions = [...sortOptions, ...extraSortOptions];
  }

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
          <FormattedMessage
            defaultMessage={'{activeSortName}'}
            description='sort button text'
            values={{
              activeSortName: isDesktop ? getSortDisplayName(currentSortOptions, sort).desktopName
                : getSortDisplayName(currentSortOptions, sort).mobileName,
            }} />
        </span>
      </button>
      <ul className='sort-dropdown-menu dropdown-menu'>
        {
          isDesktop && <>
            {
              currentSortOptions.map((sortOptionObj, idx) => <li className='dropdown-item-container' key={idx}>
                <button
                  type='button'
                  className={`dropdown-item ${(sort === sortOptionObj.default.keyName || sort === sortOptionObj.reverse.keyName) ? 'active' : ''}`}
                  onClick={() => onSortOptionClick(sortOptionObj.default.keyName)}>
                  <FormattedMessage
                    defaultMessage={'{sortName}'}
                    description='sort dropdown button text'
                    values={{
                      sortName: sortOptionObj.default.desktopName,
                    }}
                  />
                </button>
                {
                  sortOptionObj.reverse && <div className='ascending-descending-selectors'>
                    <ArrowUpButton
                      onClick={(e) => {
                        e.stopPropagation();
                        onSortOptionClick(sortOptionObj.reverse.keyName);
                      }}
                      className={`${sort === sortOptionObj.reverse.keyName ? 'active' : ''}`} />
                    <ArrowDownButton
                      onClick={(e) => {
                        e.stopPropagation();
                        onSortOptionClick(sortOptionObj.default.keyName);
                      }}
                      className={`${sort === sortOptionObj.default.keyName ? 'active' : ''}`} />
                  </div>
                }
              </li>)
            }
          </>
        }
        {
          !isDesktop && <>
            {
              currentSortOptions.map((sortOptionObj, idx) => <React.Fragment key={idx}>
                {
                  sortOptionObj.default && <li>
                    <button
                      type='button'
                      className={`dropdown-item ${(sort === sortOptionObj.default.keyName) ? 'active' : ''}`}
                      onClick={() => onSortOptionClick(sortOptionObj.default.keyName)}>
                      <FormattedMessage
                        defaultMessage={'{sortName}'}
                        description='sort dropdown button text'
                        values={{
                          sortName: sortOptionObj.default.mobileName,
                        }}
                      />
                    </button>
                  </li>
                }
                {
                  sortOptionObj.reverse && <li>
                    <button
                      type='button'
                      className={`dropdown-item ${(sort === sortOptionObj.reverse.keyName) ? 'active' : ''}`}
                      onClick={() => onSortOptionClick(sortOptionObj.reverse.keyName)}>
                      <FormattedMessage
                        defaultMessage={'{sortName}'}
                        description='sort dropdown button text'
                        values={{
                          sortName: sortOptionObj.reverse.mobileName,
                        }}
                      />
                    </button>
                  </li>
                }
              </React.Fragment>)
            }
          </>
        }
      </ul>
    </div>
  );
};

export default SortDropdown;
