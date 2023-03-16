import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import {
  StyleSheet, View, TextInput, ScrollView, LogBox, RefreshControl,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useFocusEffect } from '@react-navigation/native';
import ChallengesHeader from '../components/Header/ChallengesHeader';
import ThemeContext from '../components/theme';
import SortIconSvg from '../../images/common/sort-icon.svg';
import SearchIconSvg from '../../images/common/search-icon-svg.svg';
import { loginCheck } from '../../hooks/common/framework';
import { useGetChallenges } from '../../hooks/pages/challenges';
import ChallengesList from '../components/ChallengesList/ChallengesList';
import Paginator from '../components/Paginator';
import { AuthContext } from '../../hooks/pages/root';
import { useTimeTrack } from '../../hooks/pages/timeTrack';
import Loader from '../components/Loader';

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

const getStyles = (theme, utilColors, font) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bodyBg,
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  controls: {
    flexDirection: 'row',
  },
  sortSelectorIcon: {
    color: theme.textColor1,
    marginRight: 5,
    marginLeft: 0,
    justifyContent: 'center',
  },
  sortSelectorContainerStyle: {
    width: '35%',
  },
  sortSelector: {
    flexDirection: 'row-reverse',
    borderColor: theme.borderColor,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 12,
  },
  sortSelectorText: {
    color: theme.textColor1,
    flexShrink: 1,
    ...font.subtitle1,
  },
  sortSelectorDropdown: {
    width: 200,
    position: 'absolute',
    borderColor: theme.borderColor,
    borderRadius: 8,
    borderTopLeftRadius: 8,
  },
  sortSelectorActiveLabel: {
    color: theme.textBold,
  },
  searchIcon: {
    position: 'absolute',
    top: '50%',
    left: 15,
    transform: [{ translateY: -9 }],
  },
  searchBoxContainer: {
    flex: 1,
    position: 'relative',
  },
  searchBox: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: theme.borderColor,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    paddingLeft: 32,
    backgroundColor: theme.bg1,
    ...font.subtitle1,
    color: theme.textColor1,
    marginLeft: 5,
  },
  textColor1: {
    color: theme.textColor1,
  },
});

const SortDropDown = ({
  activeSortValue, setSort, open, setOpen, onChangeValue, style,
}) => {
  const [items, setItems] = useState([
    { label: 'Trending ', value: 'popularity' },
    { label: 'Alphabetically ', value: 'alphabetical' },
    { label: 'Reverse Alphabetically', value: 'reverse-alphabetical' },
    { label: 'Newest to Oldest', value: 'posted' },
    { label: 'Oldest to Newest', value: 'reverse-posted' },
  ]);

  return (
    <DropDownPicker
    open={open}
    setOpen={setOpen}
    setValue={setSort}
    onChangeValue={onChangeValue}
    value={activeSortValue}
    items={items}
    setItems={setItems}
    style={style.sortSelector}
    containerStyle={style.sortSelectorContainerStyle}
    listItemContainerStyle={{
      paddingVertical: 10,
      paddingHorizontal: 15,
    }}
    dropDownContainerStyle={style.sortSelectorDropdown}
    selectedItemLabelStyle={style.sortSelectorActiveLabel}
    labelProps={{ numberOfLines: 1 }}
    textStyle={style.sortSelectorText}
    ArrowUpIconComponent={({ iconContainerStyle }) => <SortIconSvg style={iconContainerStyle} />}
    ArrowDownIconComponent={({ iconContainerStyle }) => <SortIconSvg style={iconContainerStyle} />}
    arrowIconContainerStyle={style.sortSelectorIcon}
    showTickIcon={false}
    searchable={false}
    />
  );
};

const AllChallenges = ({ navigation }) => {
  const isPageMounted = useRef(true);
  const { static: { startTimeTrack, stopTimeTrack } } = useTimeTrack({ navigation });

  // hooks
  const [localState, setLocalState] = useState({
    sortDropdownOpen: false,
    sort: 'popularity',
    search: '',
    page: 1,
    searchPage: 1,
  });

  const {
    state: getChallengesState,
    static: { getChallenges },
  } = useGetChallenges({ isPageMounted });

  const authContext = useContext(AuthContext);
  const loaderRef = useRef(null);

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
    sortDropdownOpen,
  } = localState;

  const [reloadComponent, setReloadComponent] = React.useState(0);
  // const [refreshing, setRefreshing] = React.useState(false);

  // styles
  const { theme, font } = useContext(ThemeContext);
  const pageTheme = theme.screenAllChallenges;
  const style = getStyles(pageTheme, theme.utilColors, font);

  const showLoader = () => {
    if (loaderRef.current) {
      loaderRef.current.show();
    }
  };

  const hideLoader = () => {
    if (loaderRef.current) {
      loaderRef.current.hide();
    }
  };

  // methods
  const onSearchBoxChange = (value) => {
    setLocalState((prev) => ({ ...prev, search: value }));
  };

  const onSetSort = (getValueFn) => {
    const value = getValueFn();
    setLocalState((prev) => ({
      ...prev,
      sort: value,
    }));
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

  const onNextBtnPress = () => {
    setLocalState((prev) => {
      const newState = prev.search ? { ...prev, searchPage: prev.searchPage + 1 }
        : { ...prev, page: prev.page + 1 };

      return newState;
    });
  };

  const onPrevBtnPress = () => {
    setLocalState((prev) => {
      const newState = prev.search ? { ...prev, searchPage: prev.searchPage - 1 }
        : { ...prev, page: prev.page - 1 };

      return newState;
    });
  };

  const onRefresh = () => {
    // setRefreshing(true);
    showLoader();
    const filterObj = {
      sort,
      search,
      page: search ? searchPage : page,
    };
    getChallenges({ filterObj, cached: false }).then(() => {
      setReloadComponent(reloadComponent + 1);
      // setRefreshing(false);
      hideLoader();
    })
      .catch(() => {
        // show snackbar of error
        hideLoader();
      });
  };

  useEffect(() => {
    const filterObj = {
      sort,
      search,
      page: search ? searchPage : page,
    };
    showLoader();
    getChallenges({ filterObj, cached: false })
      .then(() => {
        hideLoader();
      });
  }, [sort, search, page, searchPage]);

  useEffect(() => {
    loginCheck();
    startTimeTrack('allchallenges');
    onRefresh();

    navigation?.setOptions({
      contentStyle: {
        backgroundColor: pageTheme.bodyBg,
      },
    });

    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    return () => {
      isPageMounted.current = false;
      stopTimeTrack('allchallenges');
      hideLoader();
    };
  }, []);

  // run on focus side effect
  useFocusEffect(React.useCallback(() => {
    if (authContext.authState.appData.isRefresh) {
      onRefresh();
    }
  }, [authContext.authState.appData.isRefresh]));

  return (
    <>
      <ChallengesHeader />
      <ScrollView
        style={style.container}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={onRefresh}
          />
        }
      >
          <View style={style.controls}>
            <SortDropDown
              style={style}
              activeSortValue={sort}
              setSort={onSetSort}
              open={sortDropdownOpen}
              setOpen={() => {
                setLocalState((prev) => ({ ...prev, sortDropdownOpen: !prev.sortDropdownOpen }));
              }}
              onChangeValue={() => {}}
            />
            <View style={style.searchBoxContainer}>
              <TextInput
                multiline={false}
                placeholder={'Search'}
                style={style.searchBox}
                placeholderTextColor={style.textColor1.color}
                onChangeText={debounce(onSearchBoxChange, 800)}
              />
            <SearchIconSvg style={style.searchIcon} />
            </View>
          </View>
          <ChallengesList
            challenges={trendingChallenges}
            heading={'All Challenges'}
            navLinkText={'My Challenges'}
            navLinkNavigateTo={'YourChallenges'}
            emptyStateText='No Challenges found !'
            numberOfSkeletonCardsToShow={12}
            challengeCardType='link'
          />
      </ScrollView>
      {
        trendingChallenges
        && <Paginator
          currentPageNumber={search ? searchPage : page}
          totalItems={Number(overAllChallengesCount)}
          countPerPage={perPageCount}
          initialWindow={3}
          onPageChange={onPageChange}
          onNextBtnPress={onNextBtnPress}
          onPrevBtnPress={onPrevBtnPress}
      />
      }
      <Loader
        route={'AllChallenges'}
        ref={loaderRef}
      />
    </>
  );
};

export default AllChallenges;
