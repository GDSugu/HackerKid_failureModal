import React from 'react';
import {
  View, TouchableOpacity, StyleSheet, Text,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { FormattedMessage } from 'react-intl';
import ThemeContext from '../theme';
import IconHome from '../../../images/navbar/iconHome.svg';
import Icon from '../../common/Icons';

const getStyles = (theme, utilColors, font) => StyleSheet.create({
  challengesHeader: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: theme.navBg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: {
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: theme.bg1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  backBtnText: {
    ...font.bodyBold,
    color: theme.textColor1,
  },
  backBtnIcon: {
    color: theme.textColor1,
    marginRight: 5,
  },
});

const ChallengesHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme, font } = React.useContext(ThemeContext);
  const screenTheme = theme[`screen${route.name}`];
  const style = getStyles(screenTheme, theme.utilColors, font);

  const getBackFn = (routeName) => {
    let backFn;
    if (routeName === 'AllChallenges' || routeName === 'YourChallenges') {
      backFn = () => navigation.navigate('Challenges');
    } else if (routeName === 'YourDraftChallenges') {
      backFn = () => navigation.navigate('YourChallenges');
    }

    return backFn;
  };

  const getBackBtnText = (routeName) => {
    let backBtnText;
    if (routeName === 'AllChallenges' || routeName === 'YourChallenges') {
      backBtnText = 'Challenges';
    } else if (routeName === 'YourDraftChallenges') {
      backBtnText = 'My Challenges';
    }

    return backBtnText;
  };

  return <>
    <View style={style.challengesHeader}>
      <Animatable.View
        animation='fadeInLeft'
        style={style.flexHorizontal}
      >
        <TouchableOpacity style={style.backBtn} onPress={getBackFn(route.name)}>
        <Icon
          name="angle-left"
          size={20}
          type="FontAwesome5"
          style={style.backBtnIcon}
          />
          <Text style={style.backBtnText}>
            <FormattedMessage defaultMessage={'{backBtnText}'} description='back button text' values={{
              backBtnText: getBackBtnText(route.name),
            }}/>
          </Text>
        </TouchableOpacity>
      </Animatable.View>
      <Animatable.View
        animation='fadeInRight'
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
        >
          <IconHome />
        </TouchableOpacity>
      </Animatable.View>
    </View>
  </>;
};

export default ChallengesHeader;
