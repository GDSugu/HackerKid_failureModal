import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  // TextInput,
  ScrollView,
  // KeyboardAvoidingView,
  Image,
} from 'react-native';
import { FormattedMessage } from 'react-intl';
import { Skeleton } from '@rneui/base';
import getCommonStyles from '../components/commonStyles';
import defaultUser from '../../images/profile/default_user.png';
// import FilterBtnIcon from '../../images/leaderboard/filter-icon-svg.svg';
// import SearchBoxIcon from '../../images/leaderboard/search-icon-svg.svg';
import ThemeContext from '../components/theme';
import { useLeaderBoard } from '../../hooks/pages/leaderboard';

const getStyles = (theme, utilColors, font) => StyleSheet.create({
  ...getCommonStyles(theme, utilColors, font),
  disabledPrimaryBtn: {
    backgroundColor: theme.disabledBtnColor,
  },
  heading: {
    color: utilColors.dark,
    ...font.heading6,
    marginVertical: 20,
  },
  controls: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 20,
  },
  control: {
    paddingLeft: 33,
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    marginLeft: 8,
    marginTop: -10,
  },
  filterBtnIconContainer: {
    marginTop: -6,
  },
  filterBtnWithIcon: {
    marginRight: 10,
  },
  searchBoxWithIcon: {
    flexGrow: 1,
  },
  tableRow: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 8,
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
  loggedInUserHighlight: {
    borderRadius: 10,
    backgroundColor: theme.leaderBoardHighlightEntryColor,
  },
  tableHeaderCellText: {
    ...font.bodyBold,
    color: utilColors.lightGrey,
  },
  tableCellText: {
    ...font.bodyBold,
    color: utilColors.dark,
  },
  rankCell: {
    flex: 1,
    marginRight: 5,
    justifyContent: 'center',
  },
  studentNameCell: {
    flex: 4,
    justifyContent: 'center',
  },
  studentNameWithPicture: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    marginRight: 5,
  },
  coinsCell: {
    flex: 1,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  paginator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
});

const Table = ({ children }) => (
    <View style={{ flexGrow: 1 }}>
      {children}
    </View>
);

const Row = ({ style, children }) => (
  <View style={style}>
    {children}
  </View>
);

const Leaderboard = () => {
  const isPageMounted = useRef(true);
  // hooks
  const { state, setLeaderBoardData, getLeaderBoardData } = useLeaderBoard({ isPageMounted });
  const { leaderboardData, userData, paginationDetails } = state;
  // styles
  const { font, theme } = React.useContext(ThemeContext);
  const screenTheme = theme.screenLeaderboard;
  const style = getStyles(screenTheme, theme.utilColors, font);
  const scrollViewRef = useRef(null);

  const disablePrevBtn = paginationDetails.page <= 1;
  const disableNextBtn = Math.ceil(paginationDetails.overallCount
    / paginationDetails.countPerPage) === paginationDetails.page;

  // methods
  const nextBtnPressHandler = () => {
    getLeaderBoardData({ pageNumber: paginationDetails.page + 1 }).then(() => {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    });
  };

  const previousBtnPressHandler = () => {
    getLeaderBoardData({ pageNumber: paginationDetails.page - 1 }).then(() => {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    });
  };

  const loggedInUserInCurrentPage = (currentPage, userUniqueUrl) => {
    const loggedInUserFound = currentPage.find((obj) => obj.uniqueUrl === userUniqueUrl);

    return !!loggedInUserFound;
  };

  // side effect
  useEffect(() => {
    // if no userData OR user doesnt have points or rank, do nothing!
    if (!userData || (userData.points === 0 && userData.rank === '--')) return;

    const loggedInUserFound = loggedInUserInCurrentPage(leaderboardData, userData.uniqueUrl);

    if (!loggedInUserFound) {
      leaderboardData.push(userData);
      setLeaderBoardData((prev) => ({
        ...prev,
        leaderboardData: [...leaderboardData],
      }));
    }
  }, [state]);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingHorizontal: 20 }}
      ref={scrollViewRef}>
      <Text style={style.heading}>
        <FormattedMessage defaultMessage={'Leaderboard'} description={'Leaderboard page heading'} />
      </Text>
      {/* <KeyboardAvoidingView>
      <View style={style.controls}>
        <View style={[style.controlWithIconContainer, style.filterBtnWithIcon]}>
          <View style={[style.iconContainer, style.filterBtnIconContainer]}>
            <FilterBtnIcon />
          </View>
          <TouchableOpacity style={[style.btnOutlinePrimary, style.control]}>
            <Text style={style.btnOutlinePrimaryText}>
              Filter
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[style.controlWithIconContainer, style.searchBoxWithIcon]}>
          <View style={style.iconContainer}>
            <SearchBoxIcon />
          </View>
          <TextInput
            style={[style.inputField, style.control, style.searchBox]}
            placeholder={'Search'}
            placeholderTextColor={ theme.utilColors.dark} />
        </View>
        </View>
        </KeyboardAvoidingView> */}
      <Table>
        <Row style={style.tableRow}>
          <View style={style.rankCell}>
            <Text style={style.tableHeaderCellText}>Rank</Text>
          </View>
          <View style={style.studentNameCell}>
            <Text style={style.tableHeaderCellText}>Student Name</Text>
          </View>
          <View style={style.coinsCell}>
            <Text style={style.tableHeaderCellText}>Coins</Text>
          </View>
        </Row>
        {
          !leaderboardData && new Array(10).fill().map((val, index) => <Row
            style={style.tableRow} key={index}>
          <View style={style.rankCell}>
            <Skeleton width='40%' height={20} style={{ borderRadius: 4 }}/>
          </View>
          <View style={style.studentNameCell}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Skeleton width={36} height={36} style={{ borderRadius: 36 / 2, marginRight: 5 }}/>
              <Skeleton width='50%' height={20} style={{ borderRadius: 4 }}/>
            </View>
          </View>
          <View style={style.coinsCell}>
            <Skeleton width='40%' height={20} style={{ borderRadius: 4, margin: 'auto' }}/>
          </View>
        </Row>)
        }
        {
          leaderboardData && leaderboardData.map((profileObj, index) => <Row
            style={(profileObj.uniqueUrl === userData.uniqueUrl)
              ? [style.tableRow, style.loggedInUserHighlight]
              : style.tableRow}
            key={index}>
          <View style={style.rankCell}>
            <Text style={style.tableCellText}>
                <FormattedMessage
                  defaultMessage={'{rank}'}
                  description={'rank'}
                  values={{ rank: !Number.isNaN(Number(profileObj.rank)) ? `#${profileObj.rank}` : '--' }} />
            </Text>
          </View>
          <View style={style.studentNameCell}>
            <View style={style.studentNameWithPicture}>
              <Image
                source={profileObj.profileImage ? {
                  uri: profileObj.profileImage,
                } : defaultUser }
                style={style.profilePicture}
                />
                <Text style={style.tableCellText}>
                  <FormattedMessage defaultMessage={'{studentName}'} description={'student name'} values={{ studentName: profileObj.name }} />
                </Text>
            </View>
          </View>
          <View style={style.coinsCell}>
            <Text style={style.tableCellText}>
              <FormattedMessage defaultMessage={'{coins}'} description={'coins'} values={{ coins: profileObj.points || '--' }} />
            </Text>
          </View>
          </Row>)
        }
      </Table>
      <View style={style.paginator}>
        <TouchableOpacity style={disablePrevBtn
          ? [style.btnPrimary, style.disabledPrimaryBtn]
          : style.btnPrimary}
          disabled={disablePrevBtn}
          onPress={previousBtnPressHandler}>
            <Text style={style.btnPrimaryText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={disableNextBtn
          ? [style.btnPrimary, style.disabledPrimaryBtn]
          : style.btnPrimary}
          disabled={disableNextBtn}
          onPress={nextBtnPressHandler}>
            <Text style={style.btnPrimaryText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Leaderboard;
