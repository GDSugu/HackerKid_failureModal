import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  // View,
  // TouchableOpacity,
  Image,
  TouchableOpacity,
  LogBox,
  // TextInput,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native-animatable';
import { FormattedMessage } from 'react-intl';
// import DropDownPicker from 'react-native-dropdown-picker';
// import SortIconSvg from '../../images/common/sort-icon.svg';
import ThemeContext from '../components/theme';
// import SearchIconSvg from '../../images/common/search-icon.svg';
import BottomSheet from '../components/BottomSheet';
import { useAwards } from '../../hooks/pages/awards';
import AwardsList from '../components/AwardsList';
import AwardProgressBar from '../components/AwardProgressBar';
// import collectible1 from '../../images/collectibles/collectible1.png';

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
    paddingHorizontal: 13,
  },
  awardImgContainer: {
    width: 43,
    height: 34,
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
    marginTop: 25,
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
    width: 72,
    height: 54,
    resizeMode: 'contain',
  },
  awardTitleWithSubtitleSection: {
    marginTop: 24,
  },
  nextAchievementSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentStreakContainer: {
    backgroundColor: theme.bodyBg,
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    marginTop: 25,
  },
  nextAchievementIndicator: { flexDirection: 'row', marginTop: 25 },
  bottomSheetAwardSubtitle: {
    marginTop: 5,
  },
  bottomSheetProgressBar: {
    marginTop: 25,
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
  controls: {
    flexDirection: 'row',
    marginTop: 15,
  },
  sortSelectorIcon: {
    marginRight: 5,
    marginLeft: 0,
    justifyContent: 'center',
  },
  sortSelectorContainerStyle: {
    width: '35%',
  },
  sortSelector: {
    flexDirection: 'row-reverse',
    borderColor: theme.borderDark,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  sortSelectorText: {
    flexShrink: 1,
  },
  sortSelectorDropdown: {
    width: 200,
    position: 'absolute',
    borderColor: theme.borderDark,
    borderRadius: 8,
    borderTopLeftRadius: 8,
  },
  searchIcon: {
    position: 'absolute',
    top: '50%',
    left: 15,
    transform: [{ translateY: -10 }],
  },
  searchBoxContainer: {
    flex: 1,
    position: 'relative',
  },
  searchBox: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: theme.borderDark,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    paddingLeft: 32,
    backgroundColor: utilColors.white,
    marginLeft: 5,
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

// const SortDropDown = ({
//   activeSortValue, setSort, open, setOpen, onChangeValue, style,
// }) => {
//   const [items, setItems] = useState([
//     { label: 'Newest to Oldest', value: 'posted' },
//     { label: 'Oldest to Newest', value: 'reverse-posted' },
//     { label: 'Alphabetically ', value: 'alphabetical' },
//     { label: 'Reverse Alphabetically', value: 'reverse-alphabetical' },
//     { label: 'Default', value: 'default' },
//   ]);

//   return (
//     <DropDownPicker
//       zIndex={10}
//       open={open}
//       setOpen={setOpen}
//       setValue={setSort}
//       onChangeValue={onChangeValue}
//       value={activeSortValue}
//       items={items}
//       setItems={setItems}
//       style={style.sortSelector}
//       containerStyle={style.sortSelectorContainerStyle}
//       listItemContainerStyle={{
//         paddingVertical: 10,
//         paddingHorizontal: 15,
//       }}
//       dropDownContainerStyle={style.sortSelectorDropdown}
//       selectedItemLabelStyle={[style.btnText, style.textColor3]}
//       labelProps={{ numberOfLines: 1 }}
//       textStyle={[style.text, style.textColor1]}
//       ArrowUpIconComponent={
//         ({ iconContainerStyle }) => <SortIconSvg style={iconContainerStyle} />}
//       ArrowDownIconComponent={
//         ({ iconContainerStyle }) => <SortIconSvg style={iconContainerStyle} />}
//       arrowIconContainerStyle={style.sortSelectorIcon}
//       showTickIcon={false}
//       searchable={false}
//     />
//   );
// };

const Awards = ({ navigation, style }) => {
  const isPageMounted = useRef(true);
  const bottomSheetRef = useRef(true);
  const {
    awardsState,
    getAwards,
    // setAwardsState
  } = useAwards({ isPageMounted });
  const [localState, setLocalState] = useState({
    awardInfoToView: false,
    sortDropdownOpen: false,
  });

  const {
    status,
    awards,
    sort,
    limit,
    searchQuery,
    totalAwards,
  } = awardsState;

  const {
    awardInfoToView,
    // sortDropdownOpen,
  } = localState;

  const setToViewAward = (awardObj) => {
    setLocalState((prev) => ({
      ...prev,
      awardInfoToView: awardObj,
    }));
  };

  // const onSortChange = (selectedSort) => {
  //   getAwards({
  //     cached: false,
  //     searchQuery,
  //     sort: selectedSort,
  //     limit,
  //   });
  // };

  // const onSearchBoxChange = (value) => {
  //   getAwards({
  //     cached: false,
  //     searchQuery: value,
  //     sort,
  //     limit,
  //   });
  // };

  const onSeeMoreCardPress = (requestedLimit) => {
    getAwards({
      cached: false,
      searchQuery,
      limit: requestedLimit,
      sort,
    });
  };

  const onAwardItemPress = (pressedAwardDetails) => {
    setToViewAward(pressedAwardDetails);
    bottomSheetRef.current.open();
  };

  const bottomSheetStyles = {
    draggableIcon: style.bottomSheetDragButton,
    container: {
      backgroundColor: '#00000000',
      paddingHorizontal: 12,
    },
  };

  useEffect(() => {
    navigation.setOptions({
      contentStyle: {
        backgroundColor: 'white',
      },
    });

    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    return () => {
      isPageMounted.current = false;
    };
  }, []);

  return <>
    <ScrollView style={[style.container, style.mainContainer, { backgroundColor: 'white' }]}>
      {
        ((awards && awards.length === 0) || status === 'error') && <View>
          <Text style={[style.textColor1, style.btnText]}>
            <FormattedMessage
              defaultMessage={'No Awards Found!'}
              description='error message' />
          </Text>
        </View>
      }
      <View>
        {
          awards && sort === 'default' && !searchQuery ? <>
            {
              !!awards.today.length && <View style={{ marginTop: 10 }}>
                <Text style={[style.textColor1, style.btnText]}>
                  <FormattedMessage defaultMessage={'Today'} description='today section title' />
                </Text>
                <AwardsList
                  awards={awards.today}
                  totalAwards={totalAwards}
                  style={style}
                  onAwardItemPress={onAwardItemPress}
                  limit={limit}
                  defaultStructure={true}
                />
              </View>
            }
            {
              !!awards.previous.length && <View style={{ marginTop: 10 }}>
                <Text style={[style.textColor1, style.btnText]}>
                  <FormattedMessage defaultMessage={'Previous'} description='previous section title' />
                </Text>
                <AwardsList
                  awards={awards.previous}
                  totalAwards={totalAwards}
                  style={style}
                  onAwardItemPress={onAwardItemPress}
                  limit={limit}
                  defaultStructure={true}
                  showSeeMoreBtn={true}
                  onSeeMoreBtnPress={onSeeMoreCardPress}
                />
              </View>
            }
          </>
            : <>
              {
                awards && <AwardsList
                  awards={awards}
                  totalAwards={totalAwards}
                  style={style}
                  onAwardItemPress={onAwardItemPress}
                  limit={limit}
                  showSeeMoreBtn={true}
                  onSeeMoreBtnPress={onSeeMoreCardPress}
                />
              }
            </>
        }
      </View>
    </ScrollView>
    <BottomSheet
      ref={bottomSheetRef}
      customStyles={bottomSheetStyles}
      contentPanEnabled={true}
    >
      <View style={[style.whiteBg, style.bottomSheetBody]}>
        <Image
          source={{ uri: awardInfoToView.awardImage }}
          style={style.bottomSheetAwardImage} />
        <View style={style.awardTitleWithSubtitleSection}>
          <Text style={[style.textColor1, style.text]}>
            <FormattedMessage defaultMessage={'{awardName}'} description='award name' values={{
              awardName: awardInfoToView.awardName,
            }} />
          </Text>
          <Text style={[style.textColor4, style.smallText, style.bottomSheetAwardSubtitle]}>
            <FormattedMessage defaultMessage={'{awardDescription}'} description='award description' values={{
              awardDescription: awardInfoToView.awardDescription,
            }} />
          </Text>
        </View>
        <View style={style.nextAchievementSection}>
          {
            awardInfoToView.progressDetails && !!awardInfoToView.progressDetails.progress
            && <View style={style.currentStreakContainer}>
              <Text style={[style.textColor3, style.smallText]}>
                <FormattedMessage defaultMessage={'{currentProgress} {unit}'} description='current progress' values={{
                  currentProgress: awardInfoToView.progressDetails.progress,
                  unit: awardInfoToView.progressDetails.progress > 1 ? `${awardInfoToView.progressDetails.unit}s`
                    : awardInfoToView.progressDetails.unit,
                }} />
              </Text>
            </View>
          }
          {
            awardInfoToView.progressDetails && !!awardInfoToView.progressDetails.nextAwardIn
            && <View style={style.nextAchievementIndicator}>
              <Text style={[style.textColor4, style.smallText]}>
                <FormattedMessage defaultMessage={'Next award:'} description='next award label' />
              </Text>
              <Text style={[style.textColor3, style.smallText]}>
                <FormattedMessage
                  defaultMessage={'{nextAwardIn} {unit}'}
                  description='next award in'
                  values={{
                    nextAwardIn: ` ${awardInfoToView.progressDetails.nextAwardIn}`,
                    unit: awardInfoToView.progressDetails.nextAwardIn > 1 ? `${awardInfoToView.progressDetails.unit}s`
                      : awardInfoToView.progressDetails.unit,
                  }}
                />
              </Text>
            </View>
          }
        </View>
        <AwardProgressBar
          style={style}
          contentContainerStyle={style.bottomSheetProgressBar}
          progressDetailsObj={awardInfoToView.progressableAward
            ? awardInfoToView.progressDetails
            : false}
        />
      </View>
    </BottomSheet>
  </>;
};

// const Collectibles = ({ style, collectibles }) => {
//   const CollectibleItem = ({ collectibleName, collectibleRarity, collectibleType }) => <View
//     style={style.collectibleItem}>
//     <View style={style.collectibleImageContainer}>
//       <Image source={collectible1} style={style.collectibleImage} />
//     </View>
//     <View>
//       <Text style={[style.textColor1, style.text, style.textTransformCapitalize]}>
//         <FormattedMessage
//          defaultMessage = { '{collectibleName}'} description = 'collectible name' values = {{
//           collectibleName,
//         }} />
//       </Text>
//       <View style={style.rarityIndicatorWithCollectibleType}>
//         <LinearGradient
//           style={style.rarityIndicator}
//           colors={style[`${collectibleRarity}Gradient`]}
//           useAngle={true}
//           angle={270}
//         >
//           <Text style={[style.textColor2, style.smallestText, style.textTransformCapitalize]}>
//             <FormattedMessage
//               defaultMessage = { '{collectibleRarity}'}
//               description = 'collectible rarity' values = {{
//               collectibleRarity,
//             }} />
//           </Text>
//         </LinearGradient>
//         <Text style={[style.textColor1, style.smallText, style.textTransformCapitalize]}>
//           <FormattedMessage
//              defaultMessage = { '{collectibleType}'}
//              description = 'collectible type' values = {{
//                collectibleType,
//              }} />
//         </Text>
//       </View>
//     </View>
//   </View>;

//   return <View
//     style={[style.whiteBg, style.container, style.mainContainer, style.collectiblesList]}>
//     {
//       collectibles.map((collectible, index) => <CollectibleItem
//         key={index}
//         collectibleName={collectible.collectibleName}
//         collectibleRarity={collectible.collectibleRarity}
//         collectibleType={collectible.collectibleType}
//       />)
//     }
//   </View>;
// };

const AwardsCollectibles = ({ navigation }) => {
  // styles
  const { font, theme } = useContext(ThemeContext);
  const screenTheme = theme.screenAwardsCollectibles;
  const style = getStyles(screenTheme, theme.utilColors, font, theme.gradients);

  // awards
  // const awards = [
  //   {
  //     awardTitle: 'Consecutive Sign Award(3 days)',
  //     nextAwardTitle: 'Next Achievement: 7days',
  //     img: signInAwardImg,
  //   },
  //   {
  //     awardTitle: 'Time Spent Award (2 Hours)',
  //     nextAwardTitle: 'Next Achievement: 5hours',
  //     img: timeSpentAwardImg,
  //   },
  //   {
  //     awardTitle: 'Videos Watched Award (3 Videos)',
  //     nextAwardTitle: 'Next Achievement: 5hours',
  //     img: videosWatchedAwardImg,
  //   },
  //   {
  //     awardTitle: 'Consecutive Sign Award(3 days)',
  //     nextAwardTitle: 'Next Achievement: 7days',
  //     img: signInAwardImg,
  //   },
  //   {
  //     awardTitle: 'Time Spent Award (2 Hours)',
  //     nextAwardTitle: 'Next Achievement: 5hours',
  //     img: timeSpentAwardImg,
  //   },
  //   {
  //     awardTitle: 'Videos Watched Award (3 Videos)',
  //     nextAwardTitle: 'Next Achievement: 5hours',
  //     img: videosWatchedAwardImg,
  //   },
  //   {
  //     awardTitle: 'Consecutive Sign Award(3 days)',
  //     nextAwardTitle: 'Next Achievement: 7days',
  //     img: signInAwardImg,
  //   },
  //   {
  //     awardTitle: 'Time Spent Award (2 Hours)',
  //     nextAwardTitle: 'Next Achievement: 5hours',
  //     img: timeSpentAwardImg,
  //   },
  //   {
  //     awardTitle: 'Videos Watched Award (3 Videos)',
  //     nextAwardTitle: 'Next Achievement: 5hours',
  //     img: videosWatchedAwardImg,
  //   },
  // ];

  // const collectibles = [
  //   {
  //     collectibleName: 'Creator Card Name',
  //     collectibleRarity: 'rare',
  //     collectibleType: 'Creator Card',
  //   },
  //   {
  //     collectibleName: 'Avatar Name',
  //     collectibleRarity: 'common',
  //     collectibleType: 'Avatar',
  //   },
  //   {
  //     collectibleName: 'Python turle basics video',
  //     collectibleRarity: 'epic',
  //     collectibleType: 'Video Unlocked',
  //   },
  //   {
  //     collectibleName: 'Creator Card Name',
  //     collectibleRarity: 'rare',
  //     collectibleType: 'Creator Card',
  //   },
  //   {
  //     collectibleName: 'Avatar Name',
  //     collectibleRarity: 'common',
  //     collectibleType: 'Avatar',
  //   },
  // ];

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
        {() => <Awards style={style} navigation={navigation} />}
      </Tab.Screen>
      {/* <Tab.Screen name="Collectibles" options={{ tabBarLabel: 'Collectibles' }}>
        {(props) => <Collectibles {...props} style={style} collectibles={collectibles} />}
      </Tab.Screen> */}
    </Tab.Navigator>
  </View>;
};

export default AwardsCollectibles;
