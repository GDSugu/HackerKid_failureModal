import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Image, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import levelIcon from '../../../images/games/levelStar.png';
import hintIcon from '../../../images/games/hint.png';
import GameHeader from '../Header/GameHeader';

const getStyle = (font, utilColors = {}) => StyleSheet.create({
  tabHeader: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabHeaderIcon: {
    width: 28,
    height: 28,
  },
  tabHeaderLevelText: {
    ...font.heading6R,
    color: utilColors.white,
    marginLeft: 8,
  },
  mr12: {
    marginRight: 12,
  },
});

const GameNavBar = ({
  // currentScreen,
  gameContext, font, game, gradients, hintVisibility = true, utilColors, route,
}) => {
  const style = getStyle(font, utilColors);
  // let context = false;

  // switch (game) {
  //   case 'turtle':
  //     context = useContext(gameContext);
  //     break;
  //   case 'zombieLand':
  //     context = useContext(gameContext);
  //     break;
  //   case 'codekata':
  //     context = useContext(gameContext);
  //     break;
  //   default: break;
  // }

  const handleShowLevel = () => {
    // switch (game) {
    //   case 'turtle':

    //     break;
    //   case 'zombieLand':
    //     break;
    //   default: break;
    // }
    gameContext.ctxSetState((prevState) => ({
      ...prevState,
      uiData: {
        ...prevState.uiData,
        showGameLevel: true,
      },
    }));
  };

  const levelId = () => {
    let level = 0;
    switch (game) {
      case 'turtle':
        level = gameContext?.ctxState?.questionObject?.virtualId;
        break;
      case 'zombieLand':
        level = gameContext?.ctxState?.questionObject?.virtualId;
        break;
      case 'codekata':
        level = gameContext?.ctxState?.questionObject?.virtualId;
        break;
      default: break;
    }
    return level;
  };

  return <>
    <GameHeader route={route} game={game} />
    <LinearGradient colors={gradients.darkTransparent1} style={style.tabHeader}>
      <TouchableOpacity
        // onPress={() => gameContext.ctxSetState((prevState) => ({
        //   ...prevState,
        //   uiData: {
        //     ...prevState.uiData,
        //     showGameLevel: true,
        //   },
        // })) }
        onPress={handleShowLevel}
      >
        <View style={style.row}>
          <Image
            source={levelIcon}
            style={style.tabHeaderIcon}
          />
          <Text style={[style.tabHeaderLevelText]}>
            <FormattedMessage
              defaultMessage={'Level {level}'}
              description={'Question Level'}
              // values={{ level: gameContext?.ctxState?.questionObject?.virtualId }}
              values={{ level: levelId() }}
            />
          </Text>
        </View>
      </TouchableOpacity>
      <View style={style.row}>
        {/* { currentScreen !== 'TurtleOutput' */}
        {
          hintVisibility
          && <>
            <Animatable.View
                // animation={currentScreen !== 'TurtleOutput' ? 'fadeInUp' : 'fadeOutDown'}
                // duration={currentScreen !== 'TurtleOutput' ? 500 : 1250}
                animation='fadeInRight'
              >
                <TouchableOpacity
                  style={style.mr12}
                  onPress={() => { gameContext.handleHintVisibility(true); }}
                >
                  <Image
                    source={hintIcon}
                    resizeMode='contain'
                    style={style.tabHeaderIcon}
                  />
                </TouchableOpacity>
              </Animatable.View>
          </>
        }
          {/* : <></> */}
        {/* <TouchableOpacity style={style.mh4}>
          <Image
            source={gameMenuIcon}
            resizeMode='contain'
            style={style.tabHeaderIcon}
          />
        </TouchableOpacity> */}
      </View>
    </LinearGradient>
  </>;
};

export default GameNavBar;
