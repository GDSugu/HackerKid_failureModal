import React, { useContext, useState, useRef } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FormattedMessage } from 'react-intl';
import FuzzySearch from 'fuzzy-search';
import ThemeContext from '../components/theme';
import useCourses from '../../hooks/pages/courses';
import FilterIcon from '../../images/courses/filter-icon.svg';
import SearchIcon from '../../images/courses/search.svg';
import coinIcon from '../../images/courses/Coins.png';
import xpIcon from '../../images/courses/XP.png';
import timerIcon from '../../images/courses/timer.png';
import { ModuleContainer } from '../components/CourseComponents';
import BottomSheet from '../components/BottomSheet';
import CircleGradientProgressBar from '../components/CircleGradientProgressBar';

const secToMin = (time) => ((time > 50) ? `${Math.floor(time / 60)} min` : `${time} sec`);

const getStyles = (theme, font, gradients, utilColors) => {
  const totalWidth = Dimensions.get('window').width;
  const searchBarWidth = totalWidth - 138;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bodyBg,
      justifyContent: 'flex-start',
    },
    topHeadCont: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 18,
      marginVertical: 15,
    },
    filterCont: {
      width: 90,
      padding: 16,
      borderRadius: 12,
      backgroundColor: '#fff',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    searchBar: {
      width: '100%',
    },
    searchCont: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 12,
      marginLeft: 12,
      paddingHorizontal: 18,
      width: searchBarWidth,
    },
    filterAndSearch: {
      flexDirection: 'row',
      paddingHorizontal: 18,
    },
    filteroptionCont: {
      position: 'absolute',
      zIndex: 3,
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      bottom: -100,
      left: 18,
    },
    filterOptionBtn: {
      borderWidth: 1,
      borderColor: theme.navBg,
      borderRadius: 14,
      width: 14,
      height: 14,
      marginRight: 10,
    },
    filterOption: {
      flexDirection: 'row',
      marginBottom: 8,
      alignItems: 'center',
    },
    selectedfilter: {
      backgroundColor: theme.navBg,
    },
    vidoeHead: {
      ...font.body,
      color: '#000',
    },
    moreInfo: {
      ...font.body,
      color: theme.textBold,
    },
    detailsCont: {
      backgroundColor: '#fff',
      marginHorizontal: 18,
      paddingVertical: 40,
      paddingLeft: 20,
      paddingRight: 56,
      borderRadius: 12,
    },
    svgGradient: {
      color: gradients.green,
    },
    progressBar: {
      width: '40%',
      marginTop: 10,
    },
    progressBodyText: {
      ...font.overline,
    },
    progressInnerText: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    xpEarnedText: {
      ...font.caption,
    },
    xpIcon: {
      width: 30,
      height: 30,
    },
    xpCont: {
      flexDirection: 'row',
    },
    xpTextCont: {
      marginLeft: 12,
    },
    progressBarCont: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    xpProgressCont: {
      justifyContent: 'space-around',
    },
    xpHeight: {
      marginBottom: 12,
    },
    linearProgress: {
      height: 4,
      flex: 1,
      borderRadius: 5,
    },
    linearProgressCont: {
      height: 4,
      backgroundColor: theme.bodyBg,
      marginHorizontal: 18,
      marginVertical: 16,
    },
    xpcardCont: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    xpcardIcon: {
      width: 19,
      height: 19,
    },
    xpCardText: {
      ...font.caption,
      color: '#000',
    },
    xpcardTextCont: {

    },
    progressCardText: {
      ...font.caption,
    },
    cardHead: {
      color: '#000',
      ...font.captionBold,
      marginBottom: 5,
    },
    cardModuleImg: {
      width: 80,
      height: 45,
      borderRadius: 12,
      marginRight: 8,
    },
    cardProgressCont: {
      flexDirection: 'row',
    },
    xpTimerCont: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 8,
    },
    cardwithProgress: {
      backgroundColor: utilColors.bg2,
      marginTop: 12,
    },
    moduleCard: {
      backgroundColor: '#fff',
      borderRadius: 12,
      marginHorizontal: 18,
      marginTop: 8,
      padding: 16,
    },
  });
};
const VideoHome = ({ navigation }) => {
  const { font, theme } = useContext(ThemeContext);
  const pageTheme = theme.screenVideo;
  const style = getStyles(pageTheme, font, theme.gradients, theme.utilColors);
  const isPageMounted = useRef(true);
  const { courseData } = useCourses({ isPageMounted });
  const {
    moduleData, continueWatching, overallProgress, progress,
  } = courseData;
  const [filteredData, setFilterData] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filter, setFilter] = useState(false);
  const bottomSheetRef = useRef();
  const bottomSheetStyles = {
    draggableIcon: {
      backgroundColor: theme.utilColors.white,
    },
    container: {
      backgroundColor: 'transparent',
      paddingHorizontal: 12,
    },
  };

  const onChangeFilter = (filterValue) => {
    let prevFilterValue = false;
    setFilter((prev) => {
      prevFilterValue = prev === filterValue ? false : filterValue;
      return prevFilterValue;
    });
    if (prevFilterValue) {
      setFilterData(moduleData.filter((item) => item.type === prevFilterValue));
    } else {
      setFilterData(false);
    }
  };
  const searcher = new FuzzySearch(moduleData, ['moduleName']);
  const onSearch = (keyword) => {
    if (keyword === '' || !keyword) {
      setFilterData(false);
    } else {
      const result = searcher.search(keyword);
      setFilterData(result);
    }
  };

  return (
    <View style={style.container}>
      <ScrollView>
        <View>
          <View style={style.topHeadCont}>
            <Text style={style.vidoeHead}>
              <FormattedMessage
                defaultMessage={'Videos'}
                description={'Course Name'}
              />
            </Text>
            <TouchableOpacity
            onPress={() => bottomSheetRef.current.open()}>
            <Text style={style.moreInfo}>
              <FormattedMessage defaultMessage={'More Info'} />
            </Text>
            </TouchableOpacity>
          </View>
          <View style={style.filterAndSearch}>
            <TouchableOpacity onPress={() => setFilterVisible(!filterVisible)}>
              <View style={style.filterCont}>
                <FilterIcon />
                <Text style={style.vidoeHead}>
                  <FormattedMessage
                    defaultMessage={'Filter'}
                    description={'Filter'}
                  />
                </Text>
              </View>
            </TouchableOpacity>
            <View style={style.searchCont}>
              <SearchIcon />
              <TextInput
                style={style.searchBar}
                placeholder="Search"
                placeholderTextColor={'#000'}
                onChangeText={onSearch}
              />
            </View>
            {filterVisible && (
              <View style={style.filteroptionCont}>
                <TouchableOpacity
                  onPress={() => {
                    onChangeFilter('Solution Videos');
                    setFilterVisible(!filterVisible);
                  }}>
                  <View style={style.filterOption}>
                    <View
                      style={[
                        style.filterOptionBtn,
                        filter === 'Solution Videos' && style.selectedfilter,
                      ]}
                    />
                    <Text style={style.vidoeHead}>
                      <FormattedMessage
                        defaultMessage={'Solution Videos'}
                        description={'Solution Videos Filter Option'}
                      />
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    onChangeFilter('Session Videos');
                    setFilterVisible(!filterVisible);
                  }}>
                  <View style={style.filterOption}>
                    <View
                      style={[
                        style.filterOptionBtn,
                        filter === 'Session Videos' && style.selectedfilter,
                      ]}
                    />
                    <Text style={style.vidoeHead}>
                      <FormattedMessage
                        defaultMessage={'Session Videos'}
                        description={'Session Videos Filter Option'}
                      />
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {continueWatching && !filteredData && (
          <ModuleContainer
            data={continueWatching}
            navigator={navigation}
            continueWatch={true}
          />
        )}
        {filteredData
          ? filteredData.map((item, index) => (
              <ModuleContainer key={index} data={item} navigator={navigation} />
          ))
          : moduleData
            && moduleData.map((item, index) => (
              <ModuleContainer key={index} data={item} navigator={navigation} />
            ))}
      </ScrollView>
      <BottomSheet
      ref={bottomSheetRef}
      contentPanEnabled={true}
      customStyles={bottomSheetStyles}
      >
        {overallProgress && <ScrollView><View
        style={style.detailsCont}>
          <View style={style.progressBarCont}>
          <View style={style.progressBar}>
            <CircleGradientProgressBar
              gradientColors={[[style.svgGradient.color[0], '80%'], [style.svgGradient.color[1], '10%']]}
              progressValue={ overallProgress ? overallProgress.completedCount : 0}
              totalValue={ overallProgress ? overallProgress.totalVideos : 100}
              startAnim={Boolean(overallProgress)}
              >
              <View style={style.progressInnerText}>
                <Text style={style.vidoeHead}>{overallProgress ? overallProgress.completedCount : '--' }</Text>
                <Text style={style.totalText}>/{overallProgress ? overallProgress.totalVideos : '--' }</Text>
              </View>
              <Text style={style.progressBodyText}>
                <FormattedMessage
                  defaultMessage="completed"
                  description="Game Progress card caption"
                />
              </Text>
            </CircleGradientProgressBar>
          </View>
          <View style={style.xpProgressCont}>
          <View style={[style.xpCont, style.xpHeight]}>
            <Image
            style={style.xpIcon}
            source={coinIcon}/>
            <View style={style.xpTextCont}>
            <Text style={style.xpEarnedText}>
                <FormattedMessage
                  defaultMessage="Coins Earned:"
                  description="coins earned card caption"
                />
              </Text>
              <Text style={style.vidoeHead}>
              <FormattedMessage
                  defaultMessage="{coins} coins"
                  description="coins earned"
                  values={{ coins: overallProgress.coinsEarned }}
                />
              </Text>
            </View>
          </View>
          <View style={style.xpCont}>
            <Image
            style={style.xpIcon}
            source={xpIcon}/>
            <View style={style.xpTextCont}>
            <Text style={style.xpEarnedText}>
                <FormattedMessage
                  defaultMessage="XP Earned:"
                  description="XP Earned card caption"
                />
              </Text>
              <Text style={style.vidoeHead}>
              <FormattedMessage
                  defaultMessage="{xp} xp"
                  description="XP earned"
                  values={{ xp: overallProgress.xpEarned }}
                />
              </Text>
            </View>
          </View>
          </View>
          </View>
        </View>
        {progress.map((item, index) => <View
        style={style.moduleCard}
        key={index}>
          <View style={style.cardProgressCont}>
          <Image
          style={style.cardModuleImg}
          source={{ uri: item.thumbnail }}/>
          <View>
          <Text style={style.cardHead}>
                <FormattedMessage
                  defaultMessage="{module}"
                  description="Time Spent card caption"
                  values={{ module: item.moduleName }}
                />
              </Text>
              <Text style={style.progressCardText}>
                <FormattedMessage
                  defaultMessage="{count}/{totalCount} watched"
                  description="Time Spent card caption"
                  values={{ count: item.watched, totalCount: item.totalVideos }}
                />
              </Text>
          </View>
          </View>
          <View style={style.cardwithProgress}>
          <View style={style.xpTimerCont}>
          <View style={style.xpcardCont}>
            <Image
            style={style.xpcardIcon}
            source={xpIcon}/>
            <View style={style.xpTextCont}>
              <Text style={style.xpCardText}>
              <FormattedMessage
                  defaultMessage="{count} Xp"
                  description="Time Spent card caption"
                  values={{ count: item.xpEarned }}
                />
              </Text>
            </View>
          </View>
          <View style={style.xpcardCont}>
            <Image
            style={style.xpcardIcon}
            source={timerIcon}/>
            <View style={style.xpTextCont}>
              <Text style={style.xpCardText}>
              <FormattedMessage
                  defaultMessage="{time}"
                  description="Time Spent card caption"
                  values={{ time: secToMin(item.watchTime) }}
                />
              </Text>
            </View>
          </View>
          </View>
          <View style={style.linearProgressCont}>
            <LinearGradient style={[style.linearProgress, { width: '20%' }]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            colors={[style.svgGradient.color[1], style.svgGradient.color[0]]}/>
          </View>
          </View>
          </View>)}</ScrollView>}
      </BottomSheet>
    </View>
  );
};

export default VideoHome;
