import React, { useContext, useRef, useState } from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  // View,
  // TouchableOpacity,
  Image,
  TouchableOpacity,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native-animatable';
import { FormattedMessage } from 'react-intl';
import LinearGradient from 'react-native-linear-gradient';
import ThemeContext from '../components/theme';
import signInAwardImg from '../../images/achievements/award1.png';
import timeSpentAwardImg from '../../images/achievements/award3.png';
import videosWatchedAwardImg from '../../images/achievements/award2.png';
import BottomSheet from '../components/BottomSheet';
import Icon from '../common/Icons';
import collectible1 from '../../images/collectibles/collectible1.png';

const getStyles = (theme, utilColors, font, gradients) => StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: utilColors.white,
    paddingHorizontal: 18,
  },
  mainContainer: {
    backgroundColor: utilColors.white,
    paddingHorizontal: 18,
  },
  textColor1: {
    color: utilColors.dark,
  },
  textColor2: {
    color: utilColors.white,
  },
  textColor3: {
    color: theme.textBold,
  },
  textColor4: {
    color: utilColors.lightGrey,
  },
  heading: {
    ...font.subtitleBold,
  },
  btnText: {
    ...font.subtitle1,
  },
  text: {
    ...font.subtitle2,
  },
  smallText: {
    ...font.body,
  },
  smallestText: {
    ...font.caption,
  },
  whiteBg: {
    backgroundColor: utilColors.white,
  },
  awardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 10,
  },
  awardImgContainer: {
    width: 33,
    height: 24,
    marginRight: 20,
  },
  awardImg: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  awardSubtitle: {
    marginTop: 5,
  },
  awardProgressBar: {
    width: '100%',
    height: 5,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: theme.loginTabInactiveBorder,
  },
  awardProgressGradient: gradients.redYellow,
  awardGradient: {
    height: '100%',
    borderRadius: 30,
  },
  bottomSheetDragButton: {
    backgroundColor: theme.loginTabInactiveBorder,
  },
  bottomSheetComponent: {
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
  },
  bottomSheetBody: {
    paddingHorizontal: 35,
    borderRadius: 18,
    paddingBottom: 16,
  },
  bottomSheetAwardImage: {
    marginTop: 30,
    alignSelf: 'center',
  },
  awardTitleWithSubtitleSection: {
    marginTop: 24,
  },
  nextAchievementSection: {
    marginVertical: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentStreakContainer: {
    backgroundColor: theme.bodyBg,
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  bottomSheetAwardSubtitle: {
    marginTop: 5,
  },
  bottomSheetProgressBar: {
    marginTop: 0,
  },
  seeAllAwardsBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.borderLight,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  collectiblesList: {
    paddingTop: 17,
  },
  collectibleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
  },
  collectibleImageContainer: {
    width: 72,
    height: 72,
    borderWidth: 1,
    borderColor: theme.borderLight,
    borderRadius: 12,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  collectibleImage: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  rarityIndicatorWithCollectibleType: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  rarityIndicator: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  rareGradient: gradients.purple,
  commonGradient: gradients.redYellow,
  epicGradient: gradients.green,
  textTransformCapitalize: {
    textTransform: 'capitalize',
  },
});

const Tab = createMaterialTopTabNavigator();

function MyTabBar({
  state, descriptors, navigation, tabBarStyle,
}) {
  return (
    <View style={tabBarStyle}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              options.tabBarItemStyle,
              {
                backgroundColor: isFocused ? options.tabBarActiveBackgroundColor : 'transparent',
                borderBottomWidth: 2,
                borderBottomColor: isFocused ? options.tabBarActiveBorderBottomColor
                  : options.tabBarInactiveBorderBottomColor,
              },
            ]}
          >
            <Text style={
              [options.tabBarLabelStyle, {
                color: isFocused
                  ? options.tabBarActiveTintColor : options.tabBarInactiveTintColor,
              }]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Awards = ({ style, awards }) => {
  const bottomSheetRef = useRef(true);
  const [localState, setLocalState] = useState({
    toViewAward: false,
    showAllAwards: false,
  });

  const {
    toViewAward, showAllAwards,
  } = localState;

  const setToViewAward = (awardObj) => {
    setLocalState((prev) => ({
      ...prev,
      toViewAward: awardObj,
    }));
  };

  const toggleShowAllAwards = () => {
    setLocalState((prev) => ({
      ...prev,
      showAllAwards: !prev.showAllAwards,
    }));
  };

  const AwardProgressBar = ({ contentContainerStyle = {}, total, current }) => <View
    style={[style.awardProgressBar, contentContainerStyle]}>
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={style.awardProgressGradient}
      style={[style.awardGradient, { width: `${(current / total) * total}%` }]}
      useAngle={true}
      angle={270}
    >
    </LinearGradient>
  </View>;

  const AwardItem = ({
    awardTitle,
    awardSubtitle,
    awardImg,
  }) => <TouchableOpacity onPress={() => {
    setToViewAward({ awardTitle, awardSubtitle, awardImg });
    bottomSheetRef.current.open();
  }}>
      <View style={style.awardItem}>
        <View style={style.awardImgContainer}>
          <Image
            source={awardImg}
            style={style.awardImg}
          />
        </View>
        <View style={style.container}>
          <Text style={[style.textColor1, style.text]}>
            <FormattedMessage defaultMessage={'{awardTitle}'} description='award title'
              values={{
                awardTitle,
              }} />
          </Text>
          <Text style={[style.textColor4, style.smallText, style.awardSubtitle]}>
            <FormattedMessage defaultMessage={'{awardSubtitle}'} description='award subtitle'
              values={{
                awardSubtitle,
              }} />
          </Text>
          <AwardProgressBar total={100} current={50} />
        </View>
      </View>
    </TouchableOpacity>;

  const bottomSheetStyles = {
    draggableIcon: style.bottomSheetDragButton,
    container: {
      backgroundColor: '#00000000',
      paddingHorizontal: 12,
    },
  };

  return <>
    <ScrollView style={[style.container, style.whiteBg, style.mainContainer]}>
      {
        !showAllAwards && awards.slice(0, 6).map((award, idx) => <AwardItem
          key={idx}
          awardImg={award.img}
          awardTitle={award.awardTitle}
          awardSubtitle={award.nextAwardTitle}
        />)
      }
      {
        showAllAwards && awards.map((award, idx) => <AwardItem
          key={idx}
          awardImg={award.img}
          awardTitle={award.awardTitle}
          awardSubtitle={award.nextAwardTitle}
        />)
      }
      <TouchableOpacity style={style.seeAllAwardsBtn} onPress={() => toggleShowAllAwards()}>
        <Text style={[style.btnText, style.textColor1]}>
          {
            showAllAwards && <>
              <FormattedMessage defaultMessage={'See Less Awards'} description='see Less awards btn text' />
            </>
          }
          {
            !showAllAwards && <>
              <FormattedMessage defaultMessage={'See All Awards'} description='see all awards btn text' />
            </>
          }
        </Text>
        {
          showAllAwards
          && <Icon type='FontAwesome5' name={'angle-up'} size={20} color={style.textColor1.color} />
        }
        {
          !showAllAwards
          && <Icon type='FontAwesome5' name={'angle-down'} size={20} color={style.textColor1.color} />
        }
      </TouchableOpacity>
    </ScrollView>
    <BottomSheet
      ref={bottomSheetRef}
      customStyles={bottomSheetStyles}
      contentPanEnabled={true}
    >
      <View style={[style.whiteBg, style.bottomSheetBody]}>
        <Image
          source={toViewAward.awardImg}
          style={style.bottomSheetAwardImage} />
        <View style={style.awardTitleWithSubtitleSection}>
          <Text style={[style.textColor1, style.text]}>
            <FormattedMessage defaultMessage={'{awardTitle}'} description='award title' values={{
              awardTitle: toViewAward.awardTitle,
            }} />
          </Text>
          <Text style={[style.textColor4, style.smallText, style.bottomSheetAwardSubtitle]}>
            <FormattedMessage defaultMessage={'{awardSubtitle}'} description='award title' values={{
              awardSubtitle: toViewAward.awardSubtitle,
            }} />
          </Text>
        </View>
        <View style={style.nextAchievementSection}>
          <View style={style.currentStreakContainer}>
            <Text style={[style.textColor3, style.smallText]}>
              <FormattedMessage defaultMessage={'{currentStreakCount} days'} description='current streak' values={{
                currentStreakCount: 3,
              }} />
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[style.textColor4, style.smallText]}>
              <FormattedMessage defaultMessage={'Next award:'} description='next award label' />
            </Text>
            <Text style={[style.textColor3, style.smallText]}>
              <FormattedMessage defaultMessage={'{nextStreakCount} days'} description='next streak count' values={{
                nextStreakCount: 7,
              }} />
            </Text>
          </View>
        </View>
        <AwardProgressBar
          contentContainerStyle={style.bottomSheetProgressBar}
          total={100}
          current={50} />
      </View>
    </BottomSheet>
  </>;
};

const Collectibles = ({ style, collectibles }) => {
  const CollectibleItem = ({ collectibleName, collectibleRarity, collectibleType }) => <View
    style={style.collectibleItem}>
    <View style={style.collectibleImageContainer}>
      <Image source={collectible1} style={style.collectibleImage} />
    </View>
    <View>
      <Text style={[style.textColor1, style.text, style.textTransformCapitalize]}>
        <FormattedMessage defaultMessage={'{collectibleName}'} description='collectible name' values={{
          collectibleName,
        }} />
      </Text>
      <View style={style.rarityIndicatorWithCollectibleType}>
        <LinearGradient
          style={style.rarityIndicator}
          colors={style[`${collectibleRarity}Gradient`]}
          useAngle={true}
          angle={270}
        >
          <Text style={[style.textColor2, style.smallestText, style.textTransformCapitalize]}>
            <FormattedMessage defaultMessage={'{collectibleRarity}'} description='collectible rarity' values={{
              collectibleRarity,
            }} />
          </Text>
        </LinearGradient>
        <Text style={[style.textColor1, style.smallText, style.textTransformCapitalize]}>
          <FormattedMessage defaultMessage={'{collectibleType}'} description='collectible type' values={{
            collectibleType,
          }} />
        </Text>
      </View>
    </View>
  </View>;

  return <View
    style={[style.whiteBg, style.container, style.mainContainer, style.collectiblesList]}>
    {
      collectibles.map((collectible, index) => <CollectibleItem
        key={index}
        collectibleName={collectible.collectibleName}
        collectibleRarity={collectible.collectibleRarity}
        collectibleType={collectible.collectibleType}
      />)
    }
  </View>;
};

const AwardsCollectibles = () => {
  // styles
  const { font, theme } = useContext(ThemeContext);
  const screenTheme = theme.screenAwardsCollectibles;
  const style = getStyles(screenTheme, theme.utilColors, font, theme.gradients);

  // awards
  const awards = [
    {
      awardTitle: 'Consecutive Sign Award(3 days)',
      nextAwardTitle: 'Next Achievement: 7days',
      img: signInAwardImg,
    },
    {
      awardTitle: 'Time Spent Award (2 Hours)',
      nextAwardTitle: 'Next Achievement: 5hours',
      img: timeSpentAwardImg,
    },
    {
      awardTitle: 'Videos Watched Award (3 Videos)',
      nextAwardTitle: 'Next Achievement: 5hours',
      img: videosWatchedAwardImg,
    },
    {
      awardTitle: 'Consecutive Sign Award(3 days)',
      nextAwardTitle: 'Next Achievement: 7days',
      img: signInAwardImg,
    },
    {
      awardTitle: 'Time Spent Award (2 Hours)',
      nextAwardTitle: 'Next Achievement: 5hours',
      img: timeSpentAwardImg,
    },
    {
      awardTitle: 'Videos Watched Award (3 Videos)',
      nextAwardTitle: 'Next Achievement: 5hours',
      img: videosWatchedAwardImg,
    },
    {
      awardTitle: 'Consecutive Sign Award(3 days)',
      nextAwardTitle: 'Next Achievement: 7days',
      img: signInAwardImg,
    },
    {
      awardTitle: 'Time Spent Award (2 Hours)',
      nextAwardTitle: 'Next Achievement: 5hours',
      img: timeSpentAwardImg,
    },
    {
      awardTitle: 'Videos Watched Award (3 Videos)',
      nextAwardTitle: 'Next Achievement: 5hours',
      img: videosWatchedAwardImg,
    },
  ];

  const collectibles = [
    {
      collectibleName: 'Creator Card Name',
      collectibleRarity: 'rare',
      collectibleType: 'Creator Card',
    },
    {
      collectibleName: 'Avatar Name',
      collectibleRarity: 'common',
      collectibleType: 'Avatar',
    },
    {
      collectibleName: 'Python turle basics video',
      collectibleRarity: 'epic',
      collectibleType: 'Video Unlocked',
    },
    {
      collectibleName: 'Creator Card Name',
      collectibleRarity: 'rare',
      collectibleType: 'Creator Card',
    },
    {
      collectibleName: 'Avatar Name',
      collectibleRarity: 'common',
      collectibleType: 'Avatar',
    },
  ];

  return <View style={style.container}>
    <Tab.Navigator
      initialLayout={{
        width: Dimensions.get('window').width,
      }}
      tabBar={(props) => <MyTabBar {...props} tabBarStyle={style.tabBar} />}
      screenOptions={{
        swipeEnabled: false,
        tabBarLabelStyle: { ...style.btnText, textTransform: 'capitalize' },
        tabBarActiveTintColor: style.textColor3.color,
        tabBarActiveBackgroundColor: screenTheme.bodyBg,
        tabBarActiveBorderBottomColor: style.textColor3.color,
        tabBarInactiveBorderBottomColor: screenTheme.loginTabInactiveBorder,
        tabBarInactiveTintColor: style.textColor1.color,
        tabBarItemStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          width: 130,
          paddingVertical: 16,
          paddingHorizontal: 0,
        },
      }}
    >
      <Tab.Screen
        name='Awards'
        options={{ tabBarLabel: 'Awards' }}
      >
        {() => <Awards style={style} awards={awards} />}
      </Tab.Screen>
      <Tab.Screen name="Collectibles" options={{ tabBarLabel: 'Collectibles' }}>
        {(props) => <Collectibles {...props} style={style} collectibles={collectibles} />}
      </Tab.Screen>
    </Tab.Navigator>
  </View>;
};

export default AwardsCollectibles;
