import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import {
  ScrollView, Text, StyleSheet, View, TextInput,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { NavigationContext } from '@react-navigation/native';
import ChallengesHeader from '../components/Header/ChallengesHeader';
import ThemeContext from '../components/theme';
import SortIconSvg from '../../images/common/sort-icon.svg';
import { loginCheck } from '../../hooks/common/framework';
import { useGetChallenges } from '../../hooks/pages/challenges';

const getStyles = (theme, utilColors, font) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bodyBg,
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  controls: {
    flexDirection: 'row',
    padding: 15,
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
    borderColor: 'transparent',
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  sortSelectorText: {
    color: theme.textColor1,
    flexShrink: 1,
    ...font.subtitle1,
  },
  sortSelectorDropdown: {
    width: 200,
    position: 'absolute',
    borderColor: 'transparent',
    borderRadius: 8,
    borderTopLeftRadius: 8,
  },
  sortSelectorActiveLabel: {
    color: theme.textBold,
  },
  searchBox: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: theme.bg1,
    ...font.subtitle1,
    color: theme.textColor1,
    marginLeft: 10,
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
    { label: 'Reverse Alphabetically', value: 'reverse-alphabetically' },
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

  const {
    // status: challengesStatus,
    trendingChallenges,
  } = getChallengesState;

  const {
    sort,
    search,
    page,
    searchPage,
    sortDropdownOpen,
  } = localState;

  useEffect(() => {
    const filterObj = {
      sort,
      search,
      page: search ? searchPage : page,
    };
    getChallenges({ filterObj, cached: false });
  }, [sort, search, page, searchPage]);

  // styles
  const { theme, font } = useContext(ThemeContext);
  const pageTheme = theme.screenAllChallenges;
  const style = getStyles(pageTheme, theme.utilColors, font);

  useEffect(() => {
    loginCheck();

    navigation?.setOptions({
      contentStyle: {
        backgroundColor: pageTheme.bodyBg,
      },
    });
    return () => {
      isPageMounted.current = false;
    };
  }, []);

  return (
    <>
    <ChallengesHeader />
        <View style={style.controls}>
          <SortDropDown
            style={style}
            activeSortValue={sort}
            setSort={(getValueFn) => {
              const value = getValueFn();
              setLocalState((prev) => ({
                ...prev,
                sort: value,
              }));
            }}
            open={sortDropdownOpen}
            setOpen={() => {
              setLocalState((prev) => ({ ...prev, sortDropdownOpen: !prev.sortDropdownOpen }));
            }}
            onChangeValue={() => {}}
          />
          <TextInput
            multiline={false}
            placeholder={'Search'}
            style={style.searchBox}
            placeholderTextColor={style.textColor1.color}
          />
        </View>
    <ScrollView style={style.container}>
    </ScrollView>
    </>
  );
};

export default AllChallenges;
