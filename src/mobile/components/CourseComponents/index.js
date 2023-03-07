import React, { useContext, useState, useRef } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import Swiper from 'react-native-swiper';
import { FormattedMessage } from 'react-intl';
import ThemeContext from '../theme';
// import useCourses from '../../hooks/pages/courses';
import PlayBtnIcon from '../../../images/courses/play-btn.svg';
import NextBtnIcon from '../../../images/courses/next-btn.svg';
import lockedImg from '../../../images/common/feature-lock-white.png';
// import FilterIcon from '../../images/courses/filter-icon.svg';
// import SearchIcon from '../../images/courses/search.svg';

const getStyles = (theme) => {
  const totalWidth = Dimensions.get('window').width;
  const cardWidth = (totalWidth / 5) * 4;
  const cardHeight = (cardWidth / 16) * 9;
  const remainingWidth = totalWidth - (cardWidth + 10);
  const searchBarWidth = totalWidth - 138;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bodyBg,
      justifyContent: 'flex-start',
    },
    courseCard: {
      width: cardWidth,
      height: cardHeight,
      borderRadius: 12,
      marginLeft: 18,
    },
    typeContainer: {
      position: 'absolute',
      zIndex: 2,
      top: 8,
      right: 0,
      padding: 4,
      backgroundColor: '#fff',
      borderTopLeftRadius: 12,
      borderBottomLeftRadius: 12,
    },
    type: {
      color: '#000',
    },
    playBtn: {
      position: 'absolute',
      zIndex: 2,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleContainer: {
      position: 'absolute',
      zIndex: 2,
      backgroundColor: '#0F5837',
      bottom: 0,
      width: '100%',
      height: 40,
      justifyContent: 'center',
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
      paddingLeft: 12,
    },
    nextBtnCont: {
      position: 'absolute',
      zIndex: 3,
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
    },
    nextBtn: {
      marginRight: 16,
    },
    courseCardCont: {
      height: cardHeight,
      alignItems: 'center',
    },
    moduleCont: {
      backgroundColor: '#fff',
      borderRadius: 12,
      position: 'relative',
      marginRight: remainingWidth,
    },
    moduleName: {
      marginTop: 24,
      alignItems: 'center',
    },
    playBtnModule: {
      alignItems: 'center',
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
    courseCont: {
      marginTop: 18,
    },
    btnGradient: {
      height: '100%',
      width: 50,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    prevBtnCont: {
      position: 'absolute',
      zIndex: 3,
      left: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
    },
    btnGradientPrev: {
      height: '100%',
      width: 50,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    prevBtn: {
      marginLeft: 16,
      transform: [
        { rotateY: '180deg' },
      ],
    },
    lockedOverlay: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.8117647059)',
      zIndex: 9999,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: 12,
    },
    lockedImg: {
      width: 48,
      height: 48,
      marginBottom: 8,
    },
    unlockNowBtn: {
      paddingVertical: 10,
      paddingHorizontal: 12,
      marginVertical: 10,
      borderRadius: 12,
      backgroundColor: theme.navBg,
    },
  });
};

const navigateVideoPlayer = (moduleId, number, navigation) => {
  navigation.navigate('VideoPlayer', { moduleId, number });
};

const navigateModule = (moduleId, navigation) => {
  navigation.navigate('VideoByModule', { moduleId });
};

const CourseCard = ({
  item, index, font, theme, navigator, moduleData, customVideo, customCardStyle,
}) => {
  const pageTheme = theme.screenVideo;
  const style = getStyles(pageTheme);

  const onPress = (locked) => {
    // if locked navigate to pricing, for now returing
    if (locked) return;

    navigateVideoPlayer(item.moduleId, item.number, navigator);
  };
  return (index < 3 || customVideo) ? (
    <TouchableOpacity
      onPress={() => onPress(item.locked)}
    >
      <View key={index} style={customCardStyle || style.courseCard}>
        <View style={style.typeContainer}>
          <Text
            style={{
              color: '#000',
              ...font.body,
            }}>
            <FormattedMessage
              defaultMessage={'{type}'}
              description={'video Type'}
              values={{ type: item.type }}
            />
          </Text>
        </View>
        <View style={style.playBtn}>
          <PlayBtnIcon />
        </View>
        <View>
          <Image
            style={{ width: '100%', height: '100%', borderRadius: 12 }}
            source={{ uri: item.thumbnail }}
          />
        </View>
        <View style={style.titleContainer}>
          <Text
            style={{
              ...font.subtitle2,
              color: '#fff',
            }}>
            <FormattedMessage
              defaultMessage={'{title}'}
              description={'Video Title'}
              values={{ title: item.title }}
            />
          </Text>
        </View>
        {
          item.locked && <View style={style.lockedOverlay}>
            <Image source={lockedImg} style={style.lockedImg} />
            <Text
              style={{
                ...font.subtitle2,
                color: '#fff',
              }}>
              <FormattedMessage
                defaultMessage={'Upgrade to Premium to unlock this Video'}
                description={'Upgrade to Premium to unlock this Video'}
              />
            </Text>
            <TouchableOpacity style={style.unlockNowBtn} onPress={() => {
              // navigate to pricing
            }}>
              <Text
                style={{
                  ...font.subtitle2,
                  color: '#fff',
                }}>
                <FormattedMessage
                  defaultMessage={'Unlock Now'}
                  description={'unlock now button'}
                />
              </Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    </TouchableOpacity>
  ) : (
    (index === 3 && !customVideo) && (
      <TouchableOpacity
        onPress={() => navigateModule(moduleData.moduleId, navigator)}
      >
        <View style={[style.courseCard, style.moduleCont]}>
          <View style={style.moduleName}>
            <Text
              style={{
                ...font.subtitle2,
                color: '#000',
              }}>
              <FormattedMessage
                defaultMessage={'View all {title}'}
                description={'Course Title'}
                values={{ title: moduleData.moduleName }}
              />
            </Text>
            <Text
              style={{
                ...font.subtitle2,
                color: '#000',
              }}>
              <FormattedMessage
                defaultMessage={'{type}?'}
                description={'Course Type'}
                values={{ type: moduleData.type }}
              />
            </Text>
          </View>
          <View style={style.playBtnModule}>
            <PlayBtnIcon />
          </View>
        </View></TouchableOpacity>
    )
  );
};

const ModuleContainer = ({
  data, navigator, continueWatch = false, customModuleName = false,
}) => {
  const [inViewPort, setInViewPort] = useState(0);
  const faltItemRef = useRef();
  const { font, theme } = useContext(ThemeContext);
  const pageTheme = theme.screenVideo;
  const style = getStyles(pageTheme);
  const nextCard = () => {
    faltItemRef.current.scrollToIndex({ animated: true, index: inViewPort + 1 });
  };

  const prevCard = () => {
    faltItemRef.current.scrollToIndex({ animated: true, index: inViewPort - 1 });
  };

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length === 3) {
      setInViewPort(viewableItems[1].index);
    } else if (viewableItems.length === 2) {
      setInViewPort(viewableItems[0].index);
    } else if (viewableItems.length === 4) {
      setInViewPort(viewableItems[2].index);
    } else {
      setInViewPort(viewableItems[0].index);
    }
  };
  const videoData = continueWatch ? data : data.videos;
  const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }]);

  return (
    <View style={style.courseCont}>
      {continueWatch ? <Text
        style={{
          ...font.body,
          color: '#000',
          marginHorizontal: 18,
          marginBottom: 12,
        }}>
        <FormattedMessage
          defaultMessage={'Continue watching'}
          description={'Course Name'}
        />
      </Text> : <Text
        style={{
          ...font.body,
          color: '#000',
          marginHorizontal: 18,
          marginBottom: 12,
        }}>
        {customModuleName ? <FormattedMessage
          defaultMessage={'{name}'}
          description={'Course Name'}
          values={{ name: customModuleName }}
        /> : <FormattedMessage
          defaultMessage={'{title} - {type}'}
          description={'Course Name'}
          values={{ title: data.moduleName, type: data.type }}
        />}
      </Text>}
      <View>
        {!(inViewPort === 3 || (videoData.length === 3 && inViewPort > 0)) && videoData.length > 2
          && (
            <View style={style.nextBtnCont}>
              <LinearGradient colors={['rgba(229, 244, 237, 0)', 'rgba(229, 244, 237, 1)']} style={style.btnGradient}>
                <TouchableOpacity onPress={nextCard}>
                  <NextBtnIcon style={style.nextBtn} />
                </TouchableOpacity>
              </LinearGradient>
            </View>
          )}
        <FlatList
          horizontal
          ref={faltItemRef}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          data={videoData}
          renderItem={({ item, index }) => <CourseCard
            item={item}
            index={index}
            font={font}
            theme={theme}
            navigator={navigator}
            moduleData={data}
            customVideo={continueWatch}
          />}
          keyExtractor={(key) => key.videoId}
        />
        {(inViewPort > 0 && videoData.length > 2) && (
          <View style={style.prevBtnCont}>
            <LinearGradient colors={['rgba(229, 244, 237, 1)', 'rgba(229, 244, 237, 0)']} style={style.btnGradientPrev}>
              <TouchableOpacity onPress={prevCard}>
                <NextBtnIcon style={style.prevBtn} />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        )}
      </View>
    </View>
  );
};

export { ModuleContainer, CourseCard };
