import React, { useContext, useEffect, useRef } from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import { FormattedMessage } from 'react-intl';
import { Skeleton } from '@rneui/base';
import { useFocusEffect } from '@react-navigation/native';
import ThemeContext from '../components/theme';
import Icon from '../common/Icons';
import hkcoin from '../../images/common/hkcoin.png';
import { useGetAttemptedChallenges, useGetChallenges, useGetMyChallenges } from '../../hooks/pages/challenges';
import { loginCheck } from '../../hooks/common/framework';
import { AuthContext, useGetSession } from '../../hooks/pages/root';
import Loader from '../components/Loader';

const getStyles = (theme, utilColors, font) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bodyBg,
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  pageHeading: {
    ...font.heading6,
    marginBottom: 10,
    color: theme.textColor1,
  },
  heroCard: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: theme.bg1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heroCardIcon: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  stat: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statText: {
    ...font.subtitle1,
    color: theme.textColor1,
  },
  primaryBtn: {
    marginTop: 10,
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
  challengesSwiper: {
    marginTop: 15,
  },
  swiperHeading: {
    ...font.heading6,
    color: theme.textColor1,
  },
  challengeCardItem: {
    margin: 4,
    width: 200,
    borderRadius: 12,
  },
  challengeCardImage: {
    borderRadius: 12,
    width: '100%',
    height: 110,
    resizeMode: 'cover',
  },
  challengeCardList: {
    marginTop: 10,
  },
  challengeCardTitle: {
    ...font.subtitle1,
    marginVertical: 8,
    color: theme.textColor1,
  },
  challengeCardAuthor: {
    ...font.body,
    color: utilColors.grey,
  },
  viewAllChallengesBtn: {
    marginBottom: 20,
  },
  navigationalCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.bg1,
    height: 110,
  },
  navigationalCardText: {
    ...font.subtitle1,
    color: theme.textBold,
  },
});

const HeroComponent = ({ style, totalEarnedCoins }) => (
  <View style={style.heroCard}>
    <View style={style.stat}>
      <Image source={hkcoin} style={style.heroCardIcon} />
      <Text style={style.statText}>
        <FormattedMessage
          defaultMessage={'{totalEarnedCoins}'}
          description='total earned coins'
          values={{ totalEarnedCoins }}
        />
      </Text>
    </View>
    {/* <View style={style.stat}>
      <Image source={hkcoin} style={style.heroCardIcon} />
      <Text style={style.statText}>
        <FormattedMessage
          defaultMessage={'123'}
          description='total earned coins'
          values={{ totalEarnedCoins }}
        />
      </Text>
    </View>
    <View style={style.stat}>
      <Image source={hkcoin} style={style.heroCardIcon} />
      <Text style={style.statText}>
        <FormattedMessage
          defaultMessage={'123'}
          description='total earned coins'
          values={{ totalEarnedCoins }}
        />
      </Text>
      </View> */}
  </View>
);

const ChallengesSwiper = ({
  challenges,
  navigation,
  style,
  swiperHeading,
  showChallengeAuthorName = true,
  numberOfSlidesToShow,
  navigationCardData,
  showNavigationalCard = true,
}) => {
  const challengeCardItem = ({ item }) => <>
    {
      item.type === 'navigationalCard' && <TouchableOpacity activeOpacity={0.5}
        onPress={() => {
          navigation.navigate(item.navigateTo);
        }}
      >
        <View style={[style.challengeCardItem, style.navigationalCard]}>
          <Text style={style.navigationalCardText}>
            <FormattedMessage defaultMessage={'{navigationText}'} description='navigational text' values={{ navigationText: item.navigationText }} />
          </Text>
        </View>
      </TouchableOpacity>
    }
    {
      item.type !== 'navigationalCard' && <TouchableOpacity
        onPress={() => {
          navigation.navigate('Challenges', {
            challengeId: item.challengeId,
            challengeVirtualName: item.actionUrl.split('/').pop(),
          });
        }}
        activeOpacity={0.5}
      >
        <View style={style.challengeCardItem}>
          <Image
            source={{
              uri: item.imgPath,
            }}
            style={style.challengeCardImage}
          />
          <Text style={style.challengeCardTitle}>{item.challengeName}</Text>
          {
            showChallengeAuthorName && <Text style={style.challengeCardAuthor}>{`by ${item.creatorName}`}</Text>
          }
        </View>
      </TouchableOpacity>
    }
  </>;

  return <>
    {
      challenges
      && challenges.length > 0
      && <View style={style.challengesSwiper}>
        <Text style={style.swiperHeading}>
          <FormattedMessage
            defaultMessage="{swiperHeading}"
            description="Challenges card heading"
            values={{ swiperHeading }}
          />
        </Text>
        <View>
          {
            challenges && <>
              <FlatList
                data={showNavigationalCard
                  ? [...challenges.slice(0, numberOfSlidesToShow), navigationCardData]
                  : challenges.slice(0, numberOfSlidesToShow)
                }
                renderItem={challengeCardItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                fadingEdgeLength={50}
                initialNumToRender={3}
                snapToInterval={200}
                decelerationRate={0.001}
                snapToAlignment={'start'}
                contentInset={{ left: 20 }}
                automaticallyAdjustContentInsets={false}
                style={style.challengeCardList}
              />
            </>
          }
        </View>
      </View>
    }
    {
      !challenges && <View>
        <Text style={style.swiperHeading}>
          <FormattedMessage
            defaultMessage="{swiperHeading}"
            description="Challenges card heading"
            values={{ swiperHeading }}
          />
        </Text>
        {
          !challenges && <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {[1, 2, 3, 4].map((item) => (
              <View style={[style.challengeCardItem, { width: 200 }]} key={item}>
                <Skeleton width='100%' height={100} style={{ borderRadius: 10, margin: 4 }} />
                <Skeleton width='25%' height={24} style={{ borderRadius: 10, margin: 4 }} />
                {
                  showChallengeAuthorName && <Skeleton width='75%' height={16} style={{ borderRadius: 8, margin: 4 }} />
                }
              </View>
            ))}
          </ScrollView>
        }
      </View>
    }
  </>;
};

const Challenges = ({ navigation }) => {
  const isPageMounted = useRef(true);
  const loaderRef = useRef(null);
  const numberOfChallengesSlideToShow = 7;

  const { theme, font } = useContext(ThemeContext);
  const pageTheme = theme.screenChallenges;
  const style = getStyles(pageTheme, theme.utilColors, font);

  const {
    state: getChallengesState,
    static: { getChallenges },
  } = useGetChallenges({ initializeData: false, isPageMounted });

  const {
    state: getMyChallengesState,
    static: {
      getMyChallenges,
    },
  } = useGetMyChallenges({ isPageMounted });

  const {
    state: getAttemptedChallengesState,
    static: {
      getAttemptedChallenges,
    },
  } = useGetAttemptedChallenges({ isPageMounted });

  const { session } = useGetSession({ isPageMounted, sessionAttr: ['pointsEarned'] });

  const {
    // status: challengesStatus,
    trendingChallenges,
  } = getChallengesState;

  const {
    // status: attemptedChallengesStatus,
    attemptedChallenges,
  } = getAttemptedChallengesState;

  const {
    // status: myChallengesStatus,
    myChallenges,
  } = getMyChallengesState;

  const [reloadComponent, setReloadComponent] = React.useState(0);
  // const [refreshing, setRefreshing] = React.useState(false);

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

  const authContext = useContext(AuthContext);
  // methods
  const onRefresh = () => {
    // setRefreshing(true);
    showLoader();
    Promise.all([
      getChallenges({ cached: false }),
      getMyChallenges({ cached: false }),
      getAttemptedChallenges({ cached: false }),
    ]).then(() => {
      setReloadComponent(reloadComponent + 1);
      // setRefreshing(false);
      hideLoader();
    })
      .catch(() => {
        // show snackbar of error
        // setRefreshing(false);
        hideLoader();
      });
  };

  useEffect(() => {
    loginCheck();
    onRefresh();

    return () => {
      isPageMounted.current = false;
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
      <ScrollView
        style={style.container}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={onRefresh}
          />
        }>
        <Text style={style.pageHeading}>
          <FormattedMessage defaultMessage={'Challenges'} description='page heading' />
        </Text>
        <HeroComponent
          style={style}
          totalEarnedCoins={session.pointsEarned || 0} />
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
        <ChallengesSwiper
          swiperHeading={'My Challenges'}
          showChallengeAuthorName={false}
          challenges={myChallenges && myChallenges.filter((challenge) => challenge.challengeState === 'published')}
          navigation={navigation}
          style={style}
          numberOfSlidesToShow={numberOfChallengesSlideToShow}
          showNavigationalCard={myChallenges && myChallenges.filter((challenge) => challenge.challengeState === 'published').length > 3}
          navigationCardData={{
            type: 'navigationalCard',
            navigateTo: 'YourChallenges',
            navigationText: 'View My Challenges',
          }}
        />
        <ChallengesSwiper
          swiperHeading={'Continue'}
          challenges={attemptedChallenges}
          navigation={navigation}
          style={style}
          numberOfSlidesToShow={numberOfChallengesSlideToShow}
          navigationCardData={{
            type: 'navigationalCard',
            navigateTo: 'AllChallenges',
            navigationText: 'View All Challenges',
          }}
        />
        <ChallengesSwiper
          swiperHeading={'Trending'}
          challenges={trendingChallenges}
          navigation={navigation}
          style={style}
          numberOfSlidesToShow={numberOfChallengesSlideToShow}
          navigationCardData={{
            type: 'navigationalCard',
            navigateTo: 'AllChallenges',
            navigationText: 'View All Challenges',
          }}
        />
        <TouchableOpacity style={[style.primaryBtn, style.viewAllChallengesBtn]} onPress={() => navigation.navigate('AllChallenges')}>
          <Text style={style.primaryBtnText}>
            <FormattedMessage defaultMessage={'View all Challenges'} />
          </Text>
          <Icon
            name="angle-right"
            size={20}
            type="FontAwesome5"
            style={style.primaryBtnIcon}
          />
        </TouchableOpacity>
      </ScrollView>
      <Loader
        ref={loaderRef}
        route={'Challenges'}
      />
    </>
  );
};

export default Challenges;
