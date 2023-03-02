import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Dimensions, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import levelCurrentImg from '../../../images/games/level_current.png';
import levelCompletedImg from '../../../images/games/level_completed.png';
import levelNotCompletedImg from '../../../images/games/level_not_completed.png';
import Icon from '../../common/Icons';

const getStyle = (font, theme, utilColors) => StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    height: Dimensions.get('window').height - 68,
    marginTop: 68,
    backgroundColor: 'transparent',
  },
  levelContainer: {
    backgroundColor: utilColors.overlay1,
    height: '100%',
  },
  levelContainerContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 68,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    ...font.subtitle1,
    color: utilColors.white,
  },
  levelBtn: {
    borderRadius: 100,
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    ...font.heading2,
    color: utilColors.white,
  },
  verticalBar: {
    width: 10,
    height: '100%',
    justifyContent: 'center',
    backgroundColor: `${utilColors.white}30`,
    position: 'absolute',
    left: 5,
    top: '50%',
    transform: [{ translateX: 50 }],
  },
  continuePlayingBtn: {
    position: 'absolute',
    paddingVertical: 16,
    paddingHorizontal: 10,
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#FE6A07',
    borderRadius: 10,
    width: '95%',
  },
  continuePlayingBtnText: {
    ...font.subtitleBold,
    color: utilColors.white,
  },
});

const LevelButton = ({
  currentQuestionId, onLevelButtonPress, isLast, question, style, virtualId, closeLevels,
}) => {
  let bgImg = levelNotCompletedImg;

  if (question) {
    if (currentQuestionId === virtualId) {
      bgImg = levelCurrentImg;
    } else if (question.state === 'completed') {
      bgImg = levelCompletedImg;
    } else if (question.state === 'open') {
      bgImg = levelNotCompletedImg;
    }
  }

  const handleLevel = () => {
    if (question) {
      onLevelButtonPress(virtualId);
      closeLevels();
    }
  };

  return <>
    {!isLast && <View style={style.verticalBar} />}
    <TouchableOpacity onPress={handleLevel}>
      <ImageBackground
        source={bgImg}
        style={style.levelBtn}
        resizeMethod='resize'
        resizeMode='cover'
      >
        <Text style={style.levelText}>
          <FormattedMessage
            defaultMessage='{level}'
            description='Level Button'
            values={{
              level: virtualId,
            }}
          />
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  </>;
};

const LevelButtonComponent = React.memo(LevelButton);

const WebkataGameLevelComponent = ({
  showLevels,
  closeLevels,
  webkataState,
  onLevelButtonPress,
  font,
  gradients,
  theme,
  themeKey,
  utilColors,
}) => {
  const style = getStyle(font, theme[themeKey], utilColors);
  let currentQuestionId;

  const { questionList } = webkataState;

  if (questionList) {
    currentQuestionId = questionList
      .findIndex((el) => el.questionId === webkataState.questionObject.questionId) + 1;
  }

  return <>
    {
      showLevels
      && <>
        <LinearGradient
          key={0}
          colors={gradients.darkTransparent1}
          style={style.container}>
          <Animatable.View
            animation={showLevels ? 'slideInDown' : 'slideOutUp'}
            duration={300}>
            {
              questionList
              && <>
                <FlatList
                  data={questionList}
                  initialScrollIndex={currentQuestionId - 1}
                  style={style.levelContainer}
                  contentContainerStyle={style.levelContainerContent}
                  getItemLayout={(data, index) => ({
                    length: 120,
                    offset: 120 * index,
                    index,
                  })}
                  renderItem={({ item, index }) => (<>
                    <LevelButtonComponent
                      key={index}
                      closeLevels={closeLevels}
                      currentQuestionId={currentQuestionId}
                      onLevelButtonPress={onLevelButtonPress}
                      question={item}
                      style={style}
                      virtualId={index + 1}
                      isLast={index === questionList.length - 1}
                    />
                  </>)}
                />
              </>
            }
          </Animatable.View>
          <TouchableOpacity style={style.continuePlayingBtn} onPress={closeLevels}>
            <Text style={[style.continuePlayingBtnText]}>
              <FormattedMessage defaultMessage={'Continue Playing'} description='run button text' />
            </Text>
            <Icon
              name='play'
              type='FontAwesome'
              size={18}
              color={style.continuePlayingBtnText.color}
            />
          </TouchableOpacity>
        </LinearGradient>
      </>
    }
  </>;
};

export default WebkataGameLevelComponent;
