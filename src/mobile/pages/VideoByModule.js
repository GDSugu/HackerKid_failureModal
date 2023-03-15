/* eslint-disable no-nested-ternary */
import React, {
  useContext, useState, useRef, useEffect,
} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native';
import { FormattedMessage } from 'react-intl';
import FuzzySearch from 'fuzzy-search';
import ThemeContext from '../components/theme';
import useVideos from '../../hooks/pages/videos';
import SearchIcon from '../../images/courses/search.svg';
import { CourseCard } from '../components/CourseComponents';
import Paginator from '../components/Paginator';
import { isFeatureEnabled } from '../../web/javascripts/common/framework';
import { SubscriptionContext } from '../../hooks/pages/root';

const getStyles = (theme, font, utilColors) => {
  const totalWidth = Dimensions.get('window').width;
  const searchBarWidth = totalWidth - 36;
  const cardWidth = totalWidth - 36;
  const cardHeight = (cardWidth / 16) * 9;
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
    searchBar: {
      width: '100%',
      color: utilColors.dark,
      ...font.subtitle2,
    },
    searchCont: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 12,
      marginHorizontal: 18,
      paddingHorizontal: 18,
      width: searchBarWidth,
    },
    videoCard: {
      width: cardWidth,
      height: cardHeight,
      borderRadius: 12,
      marginHorizontal: 18,
      marginTop: 8,
    },
    videoHead: {
      ...font.subtitleBold,
      color: '#000',
    },
    pageBtn: {
      color: theme.btnBg,
    },
    noVideoFoundText: {
      color: utilColors.dark,
      ...font.subtitle2,
      marginTop: 30,
      textAlign: 'center',
    },
  });
};

const VideoHome = ({ navigation, route }) => {
  const { moduleId } = route.params;
  const { font, theme } = useContext(ThemeContext);
  const { screenVideo: pageTheme, utilColors } = theme;
  const style = getStyles(pageTheme, font, utilColors);
  const isPageMounted = useRef(true);
  const { invidualModuleData } = useVideos({ isPageMounted, urlData: { moduleId } });
  const { moduleData } = invidualModuleData;
  const [page, selectPage] = useState(1);
  const [filteredData, setFilterData] = useState(false);
  const [lockedData, setLockedData] = useState(false);

  const { subscriptionData } = React.useContext(SubscriptionContext);

  const coursesLimit = (category) => {
    const coursesEnabled = isFeatureEnabled(subscriptionData, 'courses', category);
    return coursesEnabled.enabled && coursesEnabled[category];
  };

  useEffect(() => {
    if (moduleData) {
      const moduleLimit = coursesLimit(moduleData.moduleId);
      if (moduleLimit) {
        moduleData.videos.forEach((video, videoIndex) => {
          if (videoIndex >= moduleLimit) {
            moduleData.videos[videoIndex].locked = true;
          }
        });
      }
      setLockedData(moduleData);
    }
  }, [moduleData]);

  const searcher = new FuzzySearch(lockedData.videos, ['title'], { sort: true });
  const onSearch = (keyword) => {
    if (keyword === '' || !keyword) {
      setFilterData(false);
    } else {
      const result = searcher.search(keyword);
      setFilterData(result);
    }
  };

  const itemsPerPage = 10;
  const pageStartIndex = (page - 1) * itemsPerPage;
  const pageEndIndex = page * itemsPerPage;

  return (
    <View style={style.container}>
      <ScrollView>
        <View style={style.topHeadCont}>
          <Text style={style.videoHead}>
            <FormattedMessage
              defaultMessage={'Videos'}
              description={'Page heading'}
            />
          </Text>
        </View>
        <View style={style.searchCont}>
          <SearchIcon />
          <TextInput
            style={style.searchBar}
            placeholder="Search"
            placeholderTextColor={'#000'}
            onChangeText={onSearch}
          />
        </View>
        <View>
          {filteredData
            ? filteredData.length === 0 ? <Text style={style.noVideoFoundText}>
              <FormattedMessage defaultMessage={'No Videos Found'} description='no video found' />
            </Text>
              : filteredData.slice(pageStartIndex, pageEndIndex).map((item, index) => <CourseCard
                key={index}
                item={item}
                index={index}
                font={font}
                theme={theme}
                navigator={navigation}
                customVideo={true}
                customCardStyle={style.videoCard}
              />)
            : lockedData && lockedData && lockedData.videos
              .slice(pageStartIndex, pageEndIndex).map((item, index) => <CourseCard
                key={index}
                item={item}
                index={index}
                font={font}
                theme={theme}
                navigator={navigation}
                customVideo={true}
                customCardStyle={style.videoCard}
              />)}
        </View>
      </ScrollView>
      {lockedData && <Paginator
        totalItems={
          filteredData ? filteredData.length : lockedData.videos.length
        }
        countPerPage={10}
        currentPageNumber={page}
        onPageChange={(pageNumber) => selectPage(pageNumber)}
        onNextBtnPress={() => selectPage(page + 1)}
        onPrevBtnPress={() => selectPage(page - 1)}
        pageTheme={pageTheme}
        styleNextBtn={style.pageBtn}
        stylePrevBtn={style.pageBtn}
        styleActiveBtn={style.pageBtn} />}
    </View>
  );
};

export default VideoHome;
