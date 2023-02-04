import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import WebkataHeader from '../components/Header/WebkataHeader';
import webkataHtmlBg from '../../images/webkata/webkataHtmlBgWeb.png';
import webkataCssBg from '../../images/webkata/webkataCssBgWeb.png';
import webkataJsBg from '../../images/webkata/webkataJsBgWeb.png';
import ThemeContext from '../components/theme';
import playBtnImg from '../../images/games/gamePlay.png';

const getStyles = (theme, utilColors, font) => StyleSheet.create({
  container: {
    flex: 1,
  },
  gameContainer: {
    height: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gameTitle: {
    ...font.heading1,
    color: utilColors.white,
  },
  gameOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOptions: {
    marginHorizontal: 24,
  },
  gameOptionBtnImg: {
    width: 28,
    height: 28,
  },
  gamePlayBtnImg: {
    transform: [{
      scale: 0.75,
    }],
  },
  gamePlayBtn: {
    backgroundColor: utilColors.white,
    borderRadius: 200,
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: utilColors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 0.25,
    transform: [{
      scale: 0.85,
    }],
  },
  gamePlayBtnText: {
    ...font.subtitle2,
    color: theme.textBold,
    letterSpacing: 1.5,
  },
});

const WebkataHome = ({ navigation, route }) => {
  // route params
  const { params, name: routeName } = route;
  const { conceptId } = params;

  // styles
  const { font, theme } = useContext(ThemeContext);
  const screenTheme = theme.screenWebkataHome;
  const style = getStyles(screenTheme, theme.utilColors, font);
  let gameBg;

  if (conceptId === 'HTML') {
    gameBg = webkataHtmlBg;
  } else if (conceptId === 'CSS') {
    gameBg = webkataCssBg;
  } else if (conceptId === 'JS') {
    gameBg = webkataJsBg;
  }

  return <>
    <View style={style.container}>
      <ImageBackground
        source={gameBg}
        style={style.container}
      >
        <LinearGradient colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.5)']} style={style.container}>
          <View
            style={style.gameContainer}
          >
            <WebkataHeader showLevelIndicator={false} />
            <View>
              <Text style={style.gameTitle}>
                <FormattedMessage
                  defaultMessage='Webkata - {concept}'
                  description='Game Title'
                  values={{
                    concept: conceptId.toUpperCase(),
                  }}
                />
              </Text>
            </View>
            <View style={style.gameOptionsContainer}>
              {/* <Animatable.View
            useNativeDriver={true}
            animation={routeName === 'TurtleHome' ? 'fadeInLeft' : 'fadeOutLeft'}
            delay={500}
            duration={300}
          >
            <TouchableOpacity>
              <View style={style.gameOptions}>
                <Image
                  source={toggleAudio}
                  style={style.gameOptionBtnImg}
                />
              </View>
            </TouchableOpacity>
          </Animatable.View> */}
              <Animatable.View
                useNativeDriver={true}
                animation={routeName === 'WebkataHome' ? 'fadeInDown' : 'fadeOutUp'}
                delay={500}
                duration={300}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('WebkataMain', {
                      conceptId,
                    });
                  }}
                >
                  <View
                    style={[style.gameOptions, style.gamePlayBtn]}
                  >
                    <Image
                      source={playBtnImg}
                      style={style.gamePlayBtnImg}
                      resizeMode='contain'
                    />
                    <Text style={style.gamePlayBtnText}>
                      <FormattedMessage
                        defaultMessage='PLAY'
                        description='Play Button'
                      />
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animatable.View>
              {/* <Animatable.View
            useNativeDriver={true}
            animation={routeName === 'TurtleHome' ? 'fadeInRight' : 'fadeOutRight'}
            delay={500}
            duration={300}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('TurtleLeaderBoard');
              }}
            >
              <View style={style.gameOptions}>
                <Image
                  source={leaderboardImg}
                  style={style.gameOptionBtnImg}
                />
              </View>
            </TouchableOpacity>
          </Animatable.View> */}
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  </>;
};

export default WebkataHome;
