import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import {
  StyleSheet, TouchableOpacity, Text, ScrollView, RefreshControl,
} from 'react-native';
import { FormattedMessage } from 'react-intl';
import { useFocusEffect } from '@react-navigation/native';
import ChallengesHeader from '../components/Header/ChallengesHeader';
import ThemeContext from '../components/theme';
import { loginCheck } from '../../hooks/common/framework';
import { useGetMyChallenges } from '../../hooks/pages/challenges';
import ChallengesList from '../components/ChallengesList/ChallengesList';
import Paginator from '../components/Paginator';
import Icon from '../common/Icons';
import { AuthContext } from '../../hooks/pages/root';
import { useTimeTrack } from '../../hooks/pages/timeTrack';

const getStyles = (theme, utilColors, font) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bodyBg,
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  primaryBtn: {
    borderRadius: 15,
    backgroundColor: theme.btnBg,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    flexDirection: 'row',
  },
  primaryBtnText: {
    ...font.subtitle1,
    color: theme.textColor2,
    justifyContent: 'center',
  },
  primaryBtnIcon: {
    color: theme.textColor2,
  },
  textColor1: {
    color: theme.textColor1,
  },
});

const YourChallenges = ({ navigation, route }) => {
  const { static: { startTimeTrack, stopTimeTrack } } = useTimeTrack({ navigation });

  const isPageMounted = useRef(true);

  // hooks
  const [localState, setLocalState] = useState({
    paginatedResults: false,
    page: 1,
    countPerPage: 12,
  });
  const {
    state: getMyChallengesState,
    static: {
      getMyChallenges,
    },
  } = useGetMyChallenges({ isPageMounted });

  const authContext = useContext(AuthContext);

  const [reloadComponent, setReloadComponent] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);

  const {
    myChallenges,
    publishedChallengesCount,
  } = getMyChallengesState;

  const {
    page,
    countPerPage,
    paginatedResults,
  } = localState;

  // styles
  const { theme, font } = useContext(ThemeContext);
  const pageTheme = theme.screenAllChallenges;
  const style = getStyles(pageTheme, theme.utilColors, font);

  // methods
  const paginate = (pageNumber) => {
    const end = pageNumber * countPerPage;
    const start = end - countPerPage;

    const filteredChallenges = myChallenges.filter((challenge) => challenge.challengeState === 'published');
    const challenges = filteredChallenges.slice(start, end);

    setLocalState((prev) => ({ ...prev, paginatedResults: challenges }));
  };

  const onPageChange = (pageNumber) => {
    setLocalState((prev) => ({ ...prev, page: pageNumber }));
  };

  const onNextBtnPress = () => {
    setLocalState((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  const onPrevBtnPress = () => {
    setLocalState((prev) => ({ ...prev, page: prev.page - 1 }));
  };

  const onChallengeCardClick = (challenge) => {
    navigation.navigate('YourChallengesActions', {
      challenge,
      routeCalling: route.name,
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    getMyChallenges({ cached: false }).then(() => {
      setReloadComponent(reloadComponent + 1);
      setRefreshing(false);
    })
      .catch(() => {
        // show snackbar of error
        setRefreshing(false);
      });
  };

  // side effects
  useEffect(() => {
    if (myChallenges) {
      paginate(page);
    }
  }, [myChallenges, page]);

  useEffect(() => {
    startTimeTrack('your-challenges');
    loginCheck();
    onRefresh();

    return () => {
      isPageMounted.current = false;
      stopTimeTrack('your-challenges');
    };
  }, []);

  // run on focus side effect
  useFocusEffect(React.useCallback(() => {
    if (authContext.authState.appData.isRefresh) {
      onRefresh();
    }
  }, [authContext.authState.appData.isRefresh]));

  return <>
    <ChallengesHeader />
      <ScrollView
        style={style.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <TouchableOpacity style={style.primaryBtn}>
          <Text style={style.primaryBtnText}>
            <FormattedMessage defaultMessage={'Create a Challenge'} />
          </Text>
          <Icon
            name="angle-right"
            size={20}
            type="FontAwesome5"
            style={style.primaryBtnIcon}
          />
        </TouchableOpacity>
        <ChallengesList
          challenges={paginatedResults}
          heading={'My Challenges'}
          navLinkText={'Drafts'}
          navLinkNavigateTo={'YourDraftChallenges'}
          emptyStateText='No Challenges published yet !'
          numberOfSkeletonCardsToShow={12}
          showChallengeAuthorName={false}
          onChallengeCardClick={onChallengeCardClick}
          />
      </ScrollView>
    {
      Boolean(Number(publishedChallengesCount))
      && Boolean(Number(countPerPage)) && <Paginator
      totalItems={Number(publishedChallengesCount)}
      countPerPage={Number(countPerPage)}
      currentPageNumber={page}
      initialWindow={3}
      onPageChange={onPageChange}
      onNextBtnPress={onNextBtnPress}
      onPrevBtnPress={onPrevBtnPress}
    />
    }
  </>;
};

export default YourChallenges;
