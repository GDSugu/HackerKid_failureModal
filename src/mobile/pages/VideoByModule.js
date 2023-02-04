import React, { useContext, useState, useRef } from 'react';
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

const getStyles = (theme, font) => {
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
      ...font.body,
      color: '#000',
    },
    pageBtn: {
      color: theme.btnBg,
    },
  });
};

const VideoHome = ({ navigation, route }) => {
  const { moduleId } = route.params;
  const { font, theme } = useContext(ThemeContext);
  const pageTheme = theme.screenVideo;
  const style = getStyles(pageTheme, font);
  const isPageMounted = useRef(true);
  const { invidualModuleData } = useVideos({ isPageMounted, urlData: { moduleId } });
  const { moduleData } = invidualModuleData;
  const [page, selectPage] = useState(1);
  const [filteredData, setFilterData] = useState(false);
  const searcher = new FuzzySearch(moduleData.videos, ['title']);
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
        <View style={style.topHeadCont}>
          <Text style={style.videoHead}>
            <FormattedMessage
              defaultMessage={'Videos'}
              description={'Course Name'}
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
            ? filteredData.map((item, index) => index < page * 10
            && index > page * 10 - 10 && (
                <CourseCard
                  key={index}
                  item={item}
                  index={index}
                  font={font}
                  theme={theme}
                  navigator={navigation}
                  customVideo={true}
                  customCardStyle={style.videoCard}
                />
            ))
            : moduleData
              && moduleData.videos.map((item, index) => index < page * 10
              && index > page * 10 - 11 && (
                <CourseCard
                  key={index}
                  item={item}
                  index={index}
                  font={font}
                  theme={theme}
                  navigator={navigation}
                  customVideo={true}
                  customCardStyle={style.videoCard}
                />
              ))}
        </View>
      </ScrollView>
      {moduleData && <Paginator
      totalItems={
        filteredData ? filteredData.length : moduleData.videos.length
      }
      countPerPage={10}
      currentPageNumber={page}
      onPageChange={(value) => selectPage(value)}
      onNextBtnPress={() => selectPage(page + 1)}
      onPrevBtnPress={() => selectPage(page - 1)}
      pageTheme={pageTheme}
      styleNextBtn={style.pageBtn}
      stylePrevBtn={style.pageBtn}
      styleActiveBtn={style.pageBtn}/>}
    </View>
  );
};

export default VideoHome;
