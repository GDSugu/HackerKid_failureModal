import React, {
  useContext, useState, useRef, useEffect,
} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Image,
} from 'react-native';
import Video from 'react-native-video';
import { FormattedMessage } from 'react-intl';
import ThemeContext from '../components/theme';
import useVideos from '../../hooks/pages/videos';
import PlayBtnIcon from '../../images/courses/play-btn.svg';
import starSelectIcon from '../../images/courses/star.png';
import emptySelectIcon from '../../images/courses/emptyStar.png';
import HalfStar from '../../images/courses/half-star.svg';
import { ModuleContainer } from '../components/CourseComponents';
import Loader from '../components/Loader';

const getStyles = (theme) => {
  const cardWidth = Dimensions.get('window').width;
  const cardHeight = (cardWidth / 16) * 9;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bodyBg,
    },
    player: {
      width: '100%',
      height: '100%',
    },
    playerView: {
      height: cardHeight,
      width: cardWidth,
      backgroundColor: '#000',
    },
    playBtn: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    starCont: {
      flexDirection: 'row',
      marginTop: 8,
    },
    halfStar: {
      position: 'absolute',
      left: 0,
    },
    tagContainer: {
      flexDirection: 'row',
    },
    line: {
      borderBottomColor: '#E0E0E0',
      borderBottomWidth: 2,
      marginVertical: 16,
    },
    confCont: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      marginTop: 20,
    },
    watchCont: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    ratingCont: {
      marginRight: 53,
    },
    discriptionCont: {
      marginHorizontal: 18,
      marginTop: 8,
    },
    selectRating: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 56,
      marginTop: 47,
    },
    starSize: {
      width: 32,
      height: 32,
    },
    ratingModalContent: {
      borderRadius: 12,
      marginHorizontal: 16,
      width: cardWidth - 32,
      backgroundColor: '#fff',
    },
    cancelBtn: {
      color: theme.primaryBtn,
    },
    cancelBtnCont: {
      borderColor: theme.primaryBtn,
      borderWidth: 1,
      paddingVertical: 13,
      paddingHorizontal: 50,
      borderRadius: 12,
    },
    saveBtnCont: {
      backgroundColor: theme.secondaryBtn,
      paddingVertical: 13,
      paddingHorizontal: 50,
      borderRadius: 12,
    },
    saveBtn: {
      color: '#fff',
    },
    btnCont: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      marginBottom: 16,
      marginTop: 30,
    },
  });
};

const StarRating = ({ style, rating }) => {
  const decimalPoint = rating % 1;
  const integerPart = parseInt(rating, 10);
  const starData = [];
  for (let index = 0; index < 5; index += 1) {
    if (index < integerPart) {
      starData.push(
        <View>
          <Image source={starSelectIcon}/>
        </View>,
      );
    } else if (index === integerPart && decimalPoint > 0.2) {
      starData.push(
        <View>
          <View>
            <Image source={emptySelectIcon}/>
          </View>
          <View style={style.halfStar}>
            <HalfStar />
          </View>
        </View>,
      );
    } else {
      starData.push(
        <View>
          <Image source={emptySelectIcon}/>
        </View>,
      );
    }
  }
  return starData;
};

const VideoPlayerPage = ({ navigation, route }) => {
  const { number, moduleId } = route.params;
  const { font, theme } = useContext(ThemeContext);
  const pageTheme = theme.screenVideo;
  const style = getStyles(pageTheme, font);
  const isPageMounted = useRef(true);
  const ratingRef = useRef();
  const urlData = {
    moduleId,
    number,
  };

  const loaderRef = useRef(null);

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

  const [rating, setRating] = useState(1);
  const [ratingVisible, setModalVisible] = useState(false);
  const { videoData, timeActivity, submitRating } = useVideos({ isPageMounted, urlData });
  const { currentQuestion, watchNext } = videoData;
  const source = `https://d11kzy43d5zaui.cloudfront.net${currentQuestion.videoLink}`;
  const [isPaused, setIsPaused] = useState(true);
  const [handel, setHandel] = useState(false);
  const onSubmitRating = () => {
    showLoader();
    submitRating(rating)
      .then(() => {
        hideLoader();
      });
    setModalVisible(false);
  };

  const RatingModal = () => <Modal
  visible={ratingVisible}
  transparent
  ref={ratingRef}>
    <View style={style.ratingModalContent}>
    <View
    style={style.selectRating}>
      <TouchableOpacity
      onPress={() => setRating(1)}>
      <View>
        {rating > 0 ? <Image
        style={style.starSize}
        source={starSelectIcon}/> : <Image
        style={style.starSize}
        source={emptySelectIcon}/>}
      </View>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={() => setRating(2)}>
      <View>
        {rating > 1 ? <Image
        style={style.starSize}
        source={starSelectIcon}/> : <Image
        style={style.starSize}
        source={emptySelectIcon}/>}
      </View>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={() => setRating(3)}>
      <View>
        {rating > 2 ? <Image
        style={style.starSize}
        source={starSelectIcon}/> : <Image
        style={style.starSize}
        source={emptySelectIcon}/>}
      </View>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={() => setRating(4)}>
      <View>
        {rating > 3 ? <Image
        style={style.starSize}
        source={starSelectIcon}/> : <Image
        style={style.starSize}
        source={emptySelectIcon}/>}
      </View>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={() => setRating(5)}>
      <View>
        {rating > 4 ? <Image
        style={style.starSize}
        source={starSelectIcon}/> : <Image
        style={style.starSize}
        source={emptySelectIcon}/>}
      </View>
      </TouchableOpacity>
    </View>
    <View style={style.btnCont}>
      <TouchableOpacity
      onPress={() => setModalVisible(false)}>
      <View style={style.cancelBtnCont}>
        <Text style={style.cancelBtn}>
          <FormattedMessage
          defaultMessage={'Cancel'}
          description={'Cancel Button'}/>
        </Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={onSubmitRating}>
      <View style={style.saveBtnCont}>
        <Text style={style.saveBtn}>
          <FormattedMessage
          defaultMessage={'Submit'}
          description={'Submit Button'}/>
        </Text>
      </View>
      </TouchableOpacity>
    </View>
    </View>
  </Modal>;

  const videoRef = useRef();
  let presentTime = 0; let playBackTime = 0; let
    seekedTime = 0; let completeUpdated = false;
  const videoProgress = (progress) => {
    const { currentTime, seekableDuration } = progress;
    if (presentTime <= currentTime) {
      presentTime = currentTime;
      playBackTime = presentTime - seekedTime;
    }
    if (playBackTime > seekableDuration && !completeUpdated) {
      const data = {
        moduleId: currentQuestion.moduleId,
        videoId: currentQuestion.videoId,
        timeTracked: currentTime,
        completed: true,
      };
      completeUpdated = true;
      timeActivity({ videoData: data });
      setHandel(false);
    }
  };

  useEffect(
    () => {
      if (handel) {
        navigation.addListener('beforeRemove', (e) => {
          e.preventDefault();
          const data = {
            moduleId: currentQuestion.moduleId,
            videoId: currentQuestion.videoId,
            timeTracked: presentTime,
          };
          timeActivity({ videoData: data });
          Alert.alert(
            'Discard changes?',
            'You have unsaved changes. Are you sure to discard them and leave the screen?',
            [
              { text: "Don't leave", style: 'cancel', onPress: () => {} },
              {
                text: 'Discard',
                style: 'destructive',
                onPress: () => navigation.dispatch(e.data.action),
              },
            ],
          );
        });
      } else {
        navigation.removeListener('beforeRemove');
      }
    },
    [navigation, currentQuestion, presentTime, handel],
  );

  const onSeek = (value) => {
    const { seekTime } = value;
    if (presentTime < seekTime) {
      seekedTime = seekTime - presentTime + seekedTime;
    }
  };

  const onEnd = () => {
    setModalVisible(true);
  };

  const TagsContainer = ({ tags }) => (
    <View style={style.tagContainer}>
      {tags.map((tag, index) => (
        <Text
          key={index}
          style={{
            ...font.body,
            color: '#0F5837',
            marginRight: 5,
          }}>
          {index + 1 === tags.length ? (
            <FormattedMessage
              defaultMessage={'{tag}'}
              description={'Course Title'}
              values={{ tag }}
            />
          ) : (
            <FormattedMessage
              defaultMessage={'{tag}, '}
              description={'Course Title'}
              values={{ tag }}
            />
          )}
        </Text>
      ))}
    </View>
  );
  return (<>
    <View style={style.container}>
      {currentQuestion && <ScrollView>
        <View style={style.playerView}>
          <Video
            ref={videoRef}
            style={style.player}
            navigator={navigation}
            controls
            resizeMode='contain'
            onSeek={onSeek}
            onEnd={onEnd}
            onProgress={videoProgress}
            paused={isPaused}
            source={{ uri: source }}
            seek={currentQuestion.completed ? 0 : currentQuestion.timeleftAt}
          />
          {isPaused && (
            <View style={style.playBtn}>
              <TouchableOpacity onPress={() => { setIsPaused(false); setHandel(true); }}>
                <PlayBtnIcon />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={style.discriptionCont}>
          <Text
            style={{
              ...font.subtitle2,
              color: '#000',
            }}>
            <FormattedMessage
              defaultMessage={'{title}'}
              description={'Course Title'}
              values={{ title: currentQuestion.title }}
            />
          </Text>
          <Text
            style={{
              ...font.caption,
              color: '#000',
            }}>
            <FormattedMessage
              defaultMessage={'{description}'}
              description={'Course Title'}
              values={{ description: currentQuestion.discription }}
            />
          </Text>
          <View style={style.confCont}>
            <View style={style.watchCont}>
              <View>
                <Text
                  style={{
                    ...font.heading6,
                    color: '#000',
                  }}>
                  <FormattedMessage
                    defaultMessage={'{count}'}
                    description={'Watched Count'}
                    values={{ count: currentQuestion.viewCount || 0 }}
                  />
                </Text>
                <Text
                  style={{
                    ...font.caption,
                    color: '#A9ABAC',
                  }}>
                  <FormattedMessage
                    defaultMessage={'watched this'}
                    description={'watched this'}
                  />
                </Text>
              </View>
              <View style={style.ratingCont}>
                {(currentQuestion.averageRating) ? <Text
                  style={{
                    ...font.heading6,
                    color: '#000',
                  }}>
                  <FormattedMessage
                    defaultMessage={'{rating}'}
                    description={'Rating Count'}
                    values={{ rating: currentQuestion.averageRating }}
                  />
                </Text> : <Text
                  style={{
                    ...font.subtitle1,
                    color: '#000',
                  }}>
                  <FormattedMessage
                    defaultMessage={'Not rated yet'}
                    description={'Rating Count'}
                  />
                </Text>}
                <View style={style.starCont}>
                  <StarRating
                    style={style}
                    rating={currentQuestion.averageRating}
                  />
                </View>
              </View>
            </View>
            <View style={style.line} />
            <View>
              <Text
                style={{
                  ...font.caption,
                  color: '#A9ABAC',
                }}>
                <FormattedMessage
                  defaultMessage={'Tags:'}
                  description={'Course Title'}
                />
              </Text>
              <TagsContainer tags={currentQuestion.tags} />
            </View>
          </View>
        </View>
        <ModuleContainer
            data={watchNext}
            navigator={navigation}
            customModuleName={'Watch Next'}
          />
      </ScrollView>}
    </View>
      <RatingModal/>
      <Loader
        ref={loaderRef}
        route={'Video'}
      />
</>
  );
};

export default VideoPlayerPage;
