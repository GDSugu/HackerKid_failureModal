import React, { useContext } from 'react';
import {
  Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { FormattedMessage } from 'react-intl';
import * as Animatable from 'react-native-animatable';
import ThemeContext from '../components/theme';
import codekataBg from '../../images/codekata/codekatabg-mob.png';
import playBtnImg from '../../images/games/gamePlay.png';
import CodekataHeader from '../components/Header/TurtleHeader';

const getStyles = (theme, font, utilColors) => StyleSheet.create({
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

const Codekata = ({ navigation, routeName }) => {
  const { font, theme } = useContext(ThemeContext);
  const pageTheme = theme.screenTurtleHome;
  const style = getStyles(pageTheme, font, theme.utilColors);

  return <>
    <View style={style.container}>
      <ImageBackground
        source={codekataBg}
        style={style.container}
      >
        <View
          style={style.gameContainer}
        >
       <CodekataHeader />
          <View>
            <Text style={style.gameTitle}>
              <FormattedMessage
                defaultMessage='Codekata'
                description='Game Title'
              />
            </Text>
          </View>
          <View style={style.gameOptionsContainer}>
            <Animatable.View
              useNativeDriver={true}
              animation={routeName === 'Codekata' ? 'fadeInDown' : 'fadeOutUp'}
              delay={500}
              duration={300}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CodekataMain');
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
          </View>
        </View>
      </ImageBackground>
    </View>
  </>;
};

export default Codekata;
