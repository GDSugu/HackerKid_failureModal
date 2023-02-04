import { useEffect, useState } from 'react';

const usePagination = (totalItems, countPerPage, currentPageNumber, initialWindow) => {
  const [pageNumbersArr, setPageNumbersArr] = useState([]);

  useEffect(() => {
    if (totalItems && countPerPage) {
      const initialPageNumber = 1;
      const maximumPageNumber = Math.ceil(totalItems / countPerPage);
      const middleWindow = 3;
      const middleWindowEndsAt = maximumPageNumber - middleWindow;

      const pageNumbers = [];

      const diff = maximumPageNumber - initialWindow >= middleWindow;
      // if paginator in initial window ie page number less than initialWindow
      if (currentPageNumber < initialWindow || !diff) {
        const end = (maximumPageNumber <= initialWindow || !diff)
          ? maximumPageNumber : initialWindow;

        // eslint-disable-next-line no-plusplus
        for (let i = initialPageNumber; i <= end; i++) {
          pageNumbers.push(i);
        }

        if (maximumPageNumber > initialWindow && diff) {
          pageNumbers.push(null);
          pageNumbers.push(maximumPageNumber);
        }
      } else if (currentPageNumber >= initialWindow && currentPageNumber < middleWindowEndsAt) {
        // paginator in middle window
        // will render 1,...,currentPage - 1, currentPage, currentPage + 1,...,maximumPageNumber
        pageNumbers.push(initialPageNumber);
        pageNumbers.push(null);
        pageNumbers.push(currentPageNumber - 1);
        pageNumbers.push(currentPageNumber);
        pageNumbers.push(currentPageNumber + 1);
        pageNumbers.push(null);
        pageNumbers.push(maximumPageNumber);
      } else if (currentPageNumber >= middleWindowEndsAt) {
        // paginator in last window
        // will render 1,...,maximumPage-3, maximumPage-2, maximumPage-1, maximumPage
        pageNumbers.push(initialPageNumber);
        pageNumbers.push(null);

        // eslint-disable-next-line no-plusplus
        for (let i = maximumPageNumber - middleWindow; i <= maximumPageNumber; i++) {
          pageNumbers.push(i);
        }
      }

      setPageNumbersArr(pageNumbers);
    }
  }, [totalItems, countPerPage, currentPageNumber, initialWindow]);

  return pageNumbersArr;
};

export default null;

export { usePagination };
