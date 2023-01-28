import React from 'react';
import {
  View, TouchableOpacity, StyleSheet, Text, Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { FormattedMessage } from 'react-intl';
import { AuthContext } from '../../../hooks/pages/root';
import ThemeContext from '../theme';
import IconHomeGame from '../../../images/navbar/iconHomeGame.svg';
import IconLeaderboard from '../../../images/games/Leaderboard.svg';
import profileImg from '../../../images/common/profile.png';
import levelIcon from '../../../images/games/levelStar.png';
import ImgComponent from '../ImgComponent';
import { font } from '../config';

const getStyles = (utilColors) => StyleSheet.create({
  webkataHeader: {
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
  flexWidth: {
    flex: 1,
  },
  flexEnd: {
    justifyContent: 'flex-end',
  },
  alignCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImg: {
    width: 38,
    height: 38,
    borderRadius: 100,
    marginLeft: 12,
  },
  levelIcon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  levelIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelIndicatorText: {
    ...font.subtitleBold,
    color: utilColors.white,
  },
});

const WebkataHeader = ({
  showLevelIndicator = true, webkataQuestionState, setShowLevels,
}) => {
  const navigation = useNavigation();
  const { theme: { utilColors } } = React.useContext(ThemeContext);
  const authContext = React.useContext(AuthContext);
  const style = getStyles(utilColors);

  return <>
    <View style={style.webkataHeader}>
      <Animatable.View
        animation='fadeInLeft'
        style={style.flexWidth}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
        >
          <IconHomeGame />
        </TouchableOpacity>
      </Animatable.View>
      {
        showLevelIndicator
        && <Animatable.View style={[style.flexWidth, style.alignCenter]} animation={'fadeInDown'}>
          <TouchableOpacity
            style={style.levelIndicator}
            onPress={() => setShowLevels((prev) => ({ ...prev, showLevels: !prev.showLevels }))}>
            <Image
              source={levelIcon}
              style={style.levelIcon}
            />
            <Text style={style.levelIndicatorText}>
              <FormattedMessage
                defaultMessage={'{level}'}
                description={'Question Level'}
                values={{ level: webkataQuestionState?.questionObject?.virtualId }}
              />
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      }
      <Animatable.View
        animation='fadeInRight'
        style={[style.flexWidth, style.flexHorizontal, style.flexEnd]}
      >
        <TouchableOpacity onPress={() => { }}>
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

export default WebkataHeader;
