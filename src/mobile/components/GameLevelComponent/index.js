import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Dimensions, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
// import TryNowSVG from '../../../images/games/trynow.svg';
import levelCurrentImg from '../../../images/games/level_current.png';
import levelCompletedImg from '../../../images/games/level_completed.png';
import levelNotCompletedImg from '../../../images/games/level_not_completed.png';
import lockImg from '../../../images/common/feature-lock-white.png';
import PlayBtn from '../../../images/games/playBtn.svg';
import { Yellow } from '../../../colors/_colors';
import { SubscriptionContext } from '../../../hooks/pages/root';
import { isFeatureEnabled } from '../../../web/javascripts/common/framework';

const getStyle = (font, theme, utilColors, forCodekata = false) => StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    height: forCodekata ? Dimensions.get('window').height - 63 : Dimensions.get('window').height - 63 - 80,
    marginTop: 68,
    backgroundColor: 'transparent',
    zIndex: 5002,
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
    backgroundColor: forCodekata ? Yellow.color900 : theme.btnBg,
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
  closeLevel = () => { },
  currentQuestionId,
  fetchQuestion,
  game,
  isLast,
  question,
  style,
  virtualId,
  questionState,
}) => {
  let bgImg = levelNotCompletedImg;
  let handleLevel = () => { };

  if (question) {
    if (currentQuestionId === virtualId) {
      bgImg = levelCurrentImg;
    } else if (questionState === 'completed') {
      bgImg = levelCompletedImg;
    } else if (questionState === 'open' || questionState === 'locked') {
      bgImg = levelNotCompletedImg;
    }
  }

  switch (game) {
    case 'turtle':
      if (question) {
        handleLevel = (qnState) => {
          if (qnState === 'locked') return;

          fetchQuestion({ type: 'getQuestionById', questionId: question.question_id })
            .then(closeLevel);
        };
      }
      break;
    case 'zombieLand':
      if (question) {
        handleLevel = (qnState) => {
          if (qnState === 'locked') return;

          fetchQuestion({ virtualId })
            .then(closeLevel);
        };
      }
      break;
    case 'codekata':
      if (question) {
        handleLevel = (qnState) => {
          if (qnState === 'locked') return;

          fetchQuestion(question.virtualId)
            .then(closeLevel);
        };
      }
      break;
    default: break;
  }

  return <>
    {!isLast && <View style={style.verticalBar} />}
    <TouchableOpacity onPress={() => handleLevel(questionState)}>
      <ImageBackground
        source={bgImg}
        style={style.levelBtn}
        resizeMethod='resize'
        resizeMode='cover'
      >
        {
          questionState === 'locked'
            ? <Image
              style={{
                width: 50,
                height: 40,
              }}
              source={lockImg}
            />
            : <Text style={style.levelText}>
              <FormattedMessage
                defaultMessage='{level}'
                description='Level Button'
                values={{
                  level: virtualId,
                }}
              />
            </Text>
        }
      </ImageBackground>
    </TouchableOpacity>
  </>;
};

const LevelButtonComponent = React.memo(LevelButton);

const GameLevelComponent = ({
  context, font, game, gradients, theme, themeKey, utilColors,
}) => {
  const forCodekata = game === 'codekata';
  const style = getStyle(font, theme[themeKey], utilColors, forCodekata);
  const {
    ctxState: screenContext,
    fetchQuestion,
  } = context;

  const { questionList, questionObject } = screenContext;
  const { subscriptionData } = React.useContext(SubscriptionContext);

  let currentQuestionId;

  const closeLevel = () => {
    if (screenContext?.uiData?.showGameLevel) {
      context.ctxSetState((prevState) => ({
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

  const gamesLimit = (gameName) => {
    const gamesEnabled = isFeatureEnabled(subscriptionData, 'games', gameName);
    return gamesEnabled.enabled && gamesEnabled[gameName];
  };

  const questionState = (gameName, question, virtualId) => {
    if (question.state === 'completed') {
      return 'completed';
    }
    const gameLimit = gamesLimit(gameName);
    if (gameLimit && virtualId > gameLimit) {
      return 'locked';
    }
    if ((question.state === 'current') && (question.id !== questionObject?.qid)) {
      return 'open';
    }
    return (question.state || 'open');
  };

  switch (game) {
    case 'turtle':
      if (questionList) {
        currentQuestionId = questionList
          .findIndex((el) => el.question_id === screenContext.questionObject.question_id) + 1;
      }
      break;
    case 'zombieLand':
      if (questionList) {
        currentQuestionId = screenContext.questionObject.virtualId;
      }
      break;
    case 'codekata':
      if (questionList) {
        currentQuestionId = screenContext.questionList
          .findIndex((el) => el.questionId === screenContext.questionObject.questionId) + 1;
      }
      break;
    default: break;
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
                  renderItem={({ item, index }) => {
                    const state = questionState(game, item, index + 1);

                    return <>
                      <LevelButtonComponent
                        key={index}
                        currentQuestionId={currentQuestionId}
                        fetchQuestion={fetchQuestion}
                        question={item}
                        style={style}
                        virtualId={index + 1}
                        isLast={index === questionList.length - 1}
                        game={game}
                        closeLevel={closeLevel}
                        questionState={state}
                      />
                    </>;
                  }}
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
              <PlayBtn width={24} height={24} />
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </>
    }
  </>;
};

export default GameLevelComponent;
