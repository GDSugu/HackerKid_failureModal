import React from 'react';
import {
  View, TouchableOpacity, StyleSheet, Image, Text,
} from 'react-native';
import { FormattedMessage } from 'react-intl';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../../../hooks/pages/root';
import ThemeContext from '../theme';
import IconHomeGame from '../../../images/navbar/iconHomeGame.svg';
import IconLeaderboard from '../../../images/games/Leaderboard.svg';
import profileImg from '../../../images/common/profile.png';
import ImgComponent from '../ImgComponent';
import levelIcon from '../../../images/games/levelStar.png';

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

const TurtleHeader = ({ forCodekata, level, onpressLevel }) => {
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
      {forCodekata && <TouchableOpacity
      onPress={onpressLevel}
      >
       <View style={{
         flex: 1,
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'center',
         marginLeft: 30,
       }}>
          <Image
            source={levelIcon}
            style={{
              width: 28,
              height: 28,
            }}
          />
          <Text style={{
            color: '#fff',
            marginLeft: 5,
          }}>
            <FormattedMessage
              defaultMessage={'{level}'}
              description={'Question Level'}
              values={{ level }}
            />
          </Text>
        </View>
      </TouchableOpacity>}
      <Animatable.View
        animation='fadeInRight'
        style={style.flexHorizontal}
      >
        <TouchableOpacity onPress={() => {}}>
          <IconLeaderboard />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <ImgComponent
            style={style.profileImg}
            url={authContext?.sessionData?.profileLink || authContext?.sessionData?.profileImage}
            fallback={profileImg}
          />
        </TouchableOpacity>
      </Animatable.View>
    </View>
  </>;
};

export default TurtleHeader;
