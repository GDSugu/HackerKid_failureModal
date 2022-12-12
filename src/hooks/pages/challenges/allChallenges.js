import { useState } from 'react';

const useAllChallenges = () => {
  const [state, setState] = useState({
    sort: 'popularity',
    search: '',
    page: 1,
    searchPage: 1,
  });

  const setSort = (sort) => {
    setState((prev) => ({
      ...prev,
      sort,
    }));
  };

  const setSearch = (query) => {
    setState((prev) => ({
      ...prev,
      search: query,
    }));
  };

  const setPage = (page) => {
    setState((prev) => ({
      ...prev,
      page,
    }));
  };

  const setSearchPage = (searchPage) => {
    setState((prev) => ({
      ...prev,
      searchPage,
    }));
  };

  return {
    state,
    setState,
    setSearch,
    setSort,
    setPage,
    setSearchPage,
  };
};

export default null;

export {
  useAllChallenges,
};
