import React from 'react';
import { usePagination } from '../../../../../hooks/pages/pagination';

const Paginator = ({
  currentPageNumber, totalItems, countPerPage, initialWindow = 5,
  onPageChange, onNextBtnClick, onPrevBtnClick,
}) => {
  const pageNumbersArr = usePagination(totalItems, countPerPage, currentPageNumber, initialWindow);

  return <footer className='pagination-footer'>
    <nav className='pagination-nav'>
    <ul className="pagination">
        <li
          className={`page-item ${currentPageNumber === 1 ? 'disabled' : ''}`}
          onClick={onPrevBtnClick}
        >
        <button type='button' className="page-link">
          <svg width="22" height="23" viewBox="0 0 22 23" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M11 2.5C15.9706 2.5 20 6.52944 20 11.5C20 16.4706 15.9706 20.5 11 20.5C6.02944 20.5 2 16.4706 2 11.5C2 6.52944 6.02944 2.5 11 2.5ZM22 11.5C22 5.42487 17.0751 0.5 11 0.5C4.92487 0.5 0 5.42487 0 11.5C0 17.5751 4.92487 22.5 11 22.5C17.0751 22.5 22 17.5751 22 11.5Z" />
            <path fillRule="evenodd" clipRule="evenodd" d="M13.2071 6.79289C12.8166 6.40237 12.1834 6.40237 11.7929 6.79289L7.79289 10.7929C7.40237 11.1834 7.40237 11.8166 7.79289 12.2071L11.7929 16.2071C12.1834 16.5976 12.8166 16.5976 13.2071 16.2071C13.5976 15.8166 13.5976 15.1834 13.2071 14.7929L9.91421 11.5L13.2071 8.20711C13.5976 7.81658 13.5976 7.18342 13.2071 6.79289Z" />
          </svg>
        </button>
      </li>
      {
          pageNumbersArr && pageNumbersArr.map((pageNumber, idx) => <li className={`page-item ${currentPageNumber === pageNumber ? 'active' : ''}`} key={idx}>
          {
            pageNumber && <button type='button' className='page-link' onClick={() => onPageChange(pageNumber)}>
              {pageNumber}
            </button>
          }
          {
            !pageNumber && <button type='button' className='page-link disabled' disabled={true}>
              ...
            </button>
          }
        </li>)
      }
      <li
        className={`page-item ${currentPageNumber === Math.ceil(totalItems / countPerPage) ? 'disabled' : ''}`}
        onClick={onNextBtnClick}
        >
        <button type='button' className="page-link">
          <svg width="22" height="23" viewBox="0 0 22 23" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M11 2.5C6.02944 2.5 2 6.52944 2 11.5C2 16.4706 6.02944 20.5 11 20.5C15.9706 20.5 20 16.4706 20 11.5C20 6.52944 15.9706 2.5 11 2.5ZM0 11.5C0 5.42487 4.92487 0.5 11 0.5C17.0751 0.5 22 5.42487 22 11.5C22 17.5751 17.0751 22.5 11 22.5C4.92487 22.5 0 17.5751 0 11.5Z" />
            <path fillRule="evenodd" clipRule="evenodd" d="M8.79289 6.79289C9.18342 6.40237 9.81658 6.40237 10.2071 6.79289L14.2071 10.7929C14.5976 11.1834 14.5976 11.8166 14.2071 12.2071L10.2071 16.2071C9.81658 16.5976 9.18342 16.5976 8.79289 16.2071C8.40237 15.8166 8.40237 15.1834 8.79289 14.7929L12.0858 11.5L8.79289 8.20711C8.40237 7.81658 8.40237 7.18342 8.79289 6.79289Z" />
          </svg>
        </button>
      </li>
    </ul>
  </nav>
  </footer>;
};

export default Paginator;
