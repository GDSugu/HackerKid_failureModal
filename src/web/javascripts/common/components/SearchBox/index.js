import React from 'react';

const SearchBox = ({
  name = '',
  id = '',
  className = '',
  onChange = () => { },
}) => <div className='search-box-with-icon'>
    <img src='../../../../images/common/search-icon.svg' alt='search-icon' className='search-icon' />
    <input
      type={'search'}
      name={`all-challenges-search ${name}`}
      placeholder='Search'
      id={`search-box ${id}`}
      className={`search-box control ${className}`}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>;

export default SearchBox;
