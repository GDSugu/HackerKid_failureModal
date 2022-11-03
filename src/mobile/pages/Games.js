import React, { useContext, useRef } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { FormattedMessage } from 'react-intl';
import { Skeleton } from '@rneui/base';
import ThemeContext from '../components/theme';
import turtleGameImage from '../../images/games/turtle-game-bg.png';
// import LevelIcon from '../../images/games/level-icon.svg';
import PlayBtnIcon from '../../images/games/play-game-icon.svg';
import { useDashboard } from '../../hooks/pages/dashboard';

const getStyles = (theme, utilColors, font) => {
  const containerPaddingHorizontal = 12;
  const marginBtwCards = 5;

  // const numberOfCol = 2;
  // const gameCardWidth = Dimensions.get('window').width
  /// numberOfCol - (containerPaddingHorizontal + marginBtwCards);
  // const gameCardHeight = Dimensions.get('window').height
  /// 4.1 - (containerPaddingHorizontal + marginBtwCards);

  const numberOfCol = 1; // temporary
  const gameCardWidth = Dimensions.get('window').width / numberOfCol - (containerPaddingHorizontal + marginBtwCards); // temporary
  const gameCardHeight = Dimensions.get('window').height / 3 - (containerPaddingHorizontal + marginBtwCards); // temporary
  const gameCardBorderRadius = 10; // temporary

  const gameCardWithAndHeight = {
    width: gameCardWidth,
    height: gameCardHeight,
  };

  return StyleSheet.create({
    container: {
      paddingHorizontal: containerPaddingHorizontal,
      backgroundColor: theme.bodyBg,
      flex: 1,
    },
    allGameSection: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    pageHeading: {
      marginVertical: 15,
      color: utilColors.dark,
      ...font.subtitleBold,
    },
    skeleton: {
      ...gameCardWithAndHeight,
      borderRadius: gameCardBorderRadius,
    },
    gameCard: {
      ...gameCardWithAndHeight,
      marginRight: marginBtwCards,
      marginBottom: marginBtwCards,
      flexGrow: 1,
      width: '100%', // temporary
    },
    imageWithLevelIndicator: {
      borderTopLeftRadius: gameCardBorderRadius,
      borderTopRightRadius: gameCardBorderRadius,
      flex: 4,
      overflow: 'hidden',
    },
    gameBg: {
      width: '100%',
      height: '100%',
      alignSelf: 'center',
      resizeMode: 'contain',
    },
    levelIndicatorBtn: {
      position: 'absolute',
      top: 8,
      right: 10,
      borderRadius: 5,
      paddingHorizontal: 5,
      paddingVertical: 3,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.levelIndicatorBtnBg,
    },
    levelNumberText: {
      marginLeft: 2,
      color: utilColors.white,
      ...font.body,
    },
    cardBody: {
      borderBottomLeftRadius: gameCardBorderRadius,
      borderBottomRightRadius: gameCardBorderRadius,
      paddingHorizontal: 8,
      paddingVertical: 12,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.gameCardBg,
    },
    gameTitleText: {
      ...font.subtitleBold,
      color: utilColors.white,
    },
    playGameBtn: {
      // width: 35,
      // height: 35,
      // borderRadius: 35 / 2,
      width: 45,
      height: 45,
      borderRadius: 45 / 2,
      backgroundColor: utilColors.white,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

// const LevelIndicatorBtn = ({ style, levelNumber }) => (
//   <TouchableOpacity style={style.levelIndicatorBtn}>
//     <LevelIcon />
//     <Text style={style.levelNumberText}>
//       <FormattedMessage defaultMessage={'Level {levelNumber}'} values={{ levelNumber }} />
//     </Text>
//   </TouchableOpacity>
// );

const Games = ({ navigation }) => {
  const isPageMounted = useRef(true);
  // hooks
  const {
    state: dashBoardState,
  } = useDashboard({ isPageMounted });

  const { dashBoardData } = dashBoardState;
  // styles
  const { font, theme } = useContext(ThemeContext);
  const screenTheme = theme.screenGames;
  const style = getStyles(screenTheme, theme.utilColors, font);

  return (
    <ScrollView style={style.container}>
      <Text style={style.pageHeading}>
        <FormattedMessage
          defaultMessage="All Games"
          description="Games Page"
        />
      </Text>
      {
        dashBoardData ? <View style={style.allGameSection}>
        <TouchableOpacity onPress={() => navigation.navigate('TurtleHome')} style={{ width: '100%' }}>
          <View style={style.gameCard}>
            <View style={style.imageWithLevelIndicator}>
              <Image
                style={style.gameBg}
                source={turtleGameImage} resizeMode='stretch' />
            </View>
            <View style={style.cardBody}>
              <Text style={style.gameTitleText}>
                <FormattedMessage defaultMessage={'Turtle'} description={'Turtle Game Title'} />
              </Text>
              <TouchableOpacity style={style.playGameBtn} onPress={() => navigation.navigate('TurtleHome')}>
                <PlayBtnIcon />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        </View>
          : <Skeleton style={style.skeleton} />
      }
      <TouchableOpacity onPress={() => navigation.navigate('WebkataHome', {
        conceptId: 'HTML',
      })}>
        <Text>Webkata-HTML</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('WebkataHome', {
        conceptId: 'CSS',
      })}>
        <Text>Webkata-CSS</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('WebkataHome', {
        conceptId: 'JS',
      })}>
        <Text>Webkata-JS</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Games;
