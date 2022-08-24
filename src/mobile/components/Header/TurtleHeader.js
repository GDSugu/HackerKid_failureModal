import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../../../hooks/pages/root';
import ThemeContext from '../theme';
import IconHomeGame from '../../../images/navbar/iconHomeGame.svg';
// import IconLeaderboard from '../../../images/games/Leaderboard.svg';
import profileImg from '../../../images/common/profile.png';
import ImgComponent from '../ImgComponent';

const getStyles = (utilColors) => StyleSheet.create({
  turtleHeader: {
    flexDirection: 'row',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: utilColors.overlay1,
  },
  flexHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImg: {
    width: 38,
    height: 38,
    borderRadius: 100,
    marginLeft: 12,
  },
});

const TurtleHeader = () => {
  const navigation = useNavigation();
  const { theme: { utilColors } } = React.useContext(ThemeContext);
  const authContext = React.useContext(AuthContext);
  const style = getStyles(utilColors);

  return <>
    <View style={style.turtleHeader}>
      <Animatable.View
        animation='fadeInLeft'
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
        >
          <IconHomeGame />
        </TouchableOpacity>
      </Animatable.View>
      <Animatable.View
        animation='fadeInRight'
        style={style.flexHorizontal}
      >
        {/* <TouchableOpacity onPress={() => {}}>
          <IconLeaderboard />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <ImgComponent
            style={style.profileImg}
            url={authContext.sessionData.profileLink}
            fallback={profileImg}
          />
        </TouchableOpacity>
      </Animatable.View>
    </View>
  </>;
};

export default TurtleHeader;
