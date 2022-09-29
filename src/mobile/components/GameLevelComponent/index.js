import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Dimensions, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import TryNowSVG from '../../../images/games/trynow.svg';
import levelCurrentImg from '../../../images/games/level_current.png';
import levelCompletedImg from '../../../images/games/level_completed.png';
import levelNotCompletedImg from '../../../images/games/level_not_completed.png';

const getStyle = (font, theme, utilColors) => StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    height: Dimensions.get('window').height - 83 - 80,
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
  tryNowBtn: {
    width: '90%',
    borderRadius: 12,
    backgroundColor: theme.btnBg,
    alignSelf: 'center',
    padding: 16,
    position: 'absolute',
    bottom: 21,
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
});

const LevelButton = ({
  currentQuestionId, fetchQuestion, isLast, question, style, virtualId,
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
      fetchQuestion({ type: 'getQuestionById', questionId: question.question_id });
    }
  };

  return <>
    { !isLast && <View style={style.verticalBar} /> }
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

const GameLevelComponent = ({
  context, font, game, gradients, theme, themeKey, utilColors,
}) => {
  const style = getStyle(font, theme[themeKey], utilColors);
  let screenContext;
  let questionList;
  let currentQuestionId;
  let fetchQuestion = () => {};
  let closeLevel = () => {};

  if (game === 'turtle') {
    screenContext = context.tqState;
    questionList = screenContext.questionList;
    fetchQuestion = context.fetchTurtleQuestion;
    if (questionList) {
      currentQuestionId = questionList
        .findIndex((el) => el.question_id === screenContext.questionObject.question_id) + 1;
    }

    closeLevel = () => {
      if (screenContext?.uiData?.showGameLevel) {
        context.tqSetState((prevState) => ({
          ...prevState,
          uiData: {
            ...prevState.uiData,
            showGameLevel: false,
          },
        }));
        return true;
      }
      return false;
    };
  }

  return <>
  {
    screenContext?.uiData?.showGameLevel
    && <>
      <LinearGradient
        key={screenContext?.uiData?.refreshKey || 0}
        colors={gradients.darkTransparent1}
        style={style.container}>
        <Animatable.View
          animation={screenContext?.uiData?.showGameLevel ? 'slideInDown' : 'slideOutUp'}
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
                        currentQuestionId={currentQuestionId}
                        fetchQuestion={fetchQuestion}
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
        <TouchableOpacity onPress={closeLevel} style={style.tryNowBtn}>
          <View style={style.rowBetween}>
            <Text style={style.titleText}>
              <FormattedMessage
                defaultMessage='Continue Playing'
                description='Continue Playing Button'
              />
            </Text>
            <TryNowSVG />
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </>
  }
  </>;
};

export default GameLevelComponent;
