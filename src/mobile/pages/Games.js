import React, { useContext, useRef } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { FormattedMessage } from 'react-intl';
import { Skeleton } from '@rneui/base';
import ThemeContext from '../components/theme';
import turtleGameImage from '../../images/games/turtle-game-bg.png';
import LevelIcon from '../../images/games/level-icon.svg';
import PlayBtnIcon from '../../images/games/play-game-icon.svg';
import { useDashboard } from '../../hooks/pages/dashboard';

const getStyles = (theme, utilColors, font) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bodyBg,
    paddingHorizontal: 12,
  },
  pageHeading: {
    color: utilColors.dark,
    ...font.bodyBold,
    marginVertical: 20,
  },
  gameCard: {
    width: '50%',
  },
  imageWithLevelIndicator: {
    width: '100%',
  },
  gameBg: {
    width: '100%',
    height: 100,
    alignSelf: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: 'contain',
  },
  levelIndicatorBtn: {
    backgroundColor: utilColors.dark,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
    top: 8,
    right: 10,
  },
  levelNumberText: {
    marginLeft: 2,
    color: utilColors.white,
    ...font.body,
  },
  cardBody: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: theme.gameCardBg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  gameTitleText: {
    ...font.bodyBold,
    color: utilColors.white,
  },
  playGameBtn: {
    backgroundColor: utilColors.white,
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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
        dashBoardData ? <View style={style.gameCard}>
        <View style={style.imageWithLevelIndicator}>
          <Image
            style={style.gameBg}
            source={turtleGameImage} resizeMode="stretch" />
          <TouchableOpacity style={style.levelIndicatorBtn}>
            <LevelIcon />
            <Text style={style.levelNumberText}>
              <FormattedMessage defaultMessage={'Level {levelNumber}'} values={{ levelNumber: dashBoardData.turtle.currentQuestionDetails.virtualId }} />
            </Text>
          </TouchableOpacity>
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
          : <Skeleton width='50%' height={100} style={{ borderRadius: 8 }} />
      }

    </ScrollView>
  );
};

export default Games;
