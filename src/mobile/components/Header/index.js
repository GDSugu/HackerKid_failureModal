import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  // Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import ThemeContext from '../theme';
import IconHome from '../../../images/navbar/iconHome.svg';
import Icon from '../../common/Icons';

const getStyles = (theme, utilColors) => StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.navBg,
    padding: 15,
  },
  navigationBtn: {
    backgroundColor: utilColors.white,
    color: utilColors.dark,
    borderRadius: 50,
    padding: 8,
    paddingHorizontal: 16,
  },
  flexHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  disposableIconBtn: {
    backgroundColor: utilColors.disposableIconBg,
    color: utilColors.white,
  },
});

const Header = ({ route, navigation }) => {
  const { font, theme } = React.useContext(ThemeContext);
  const screenTheme = theme[`screen${route}`];
  const style = getStyles(screenTheme, theme.utilColors);

  return <>
    {
      screenTheme.showHeader
      && <View style={style.header}>
      <Text>hackekidLogo</Text>
      <View style={style.flexHorizontal}>
        {(route !== 'Class') && <TouchableOpacity
          style={style.navigationBtn}
          onPress={() => {
            navigation.navigate('Class');
          }}
        >
          <Text style={{
            ...font.captionBold,
            color: theme.utilColors.dark,
          }}>
            <FormattedMessage
              defaultMessage='Go to Class'
              description='class navigation button'
            />
          </Text>
        </TouchableOpacity>}
        {<Animatable.View
          animation={route !== 'Home' ? 'fadeInRight' : 'fadeOutRight'}
          duration={300}
        >
          {(route !== 'Home') && <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => {
              navigation.navigate('Home');
            }}
          >
            <IconHome />
          </TouchableOpacity>}
        </Animatable.View>}
        {(screenTheme.viewType === 'fragment') && <Animatable.View
          animation={route !== 'Home' ? 'fadeInRight' : 'fadeOutRight'}
          duration={300}
          style={{ marginLeft: 10 }}
        >
          {screenTheme.disposal === 'btn' && <TouchableOpacity
            style={style.navigationBtn}
            onPress={() => {
              navigation.current.goBack();
            }}
          >
            <Text style={{
              ...font.captionBold,
              color: theme.utilColors.dark,
            }}>
              <FormattedMessage
                defaultMessage='close'
                description='close button'
              />
            </Text>
          </TouchableOpacity>}
          {screenTheme.disposal === 'icon' && <TouchableOpacity
            style={style.disposableIconBtn}
            onPress={() => {
              navigation.current.goBack();
            }}
          >
            <View>
              <Icon
                name='history'
                type='FontAwesome'
                size={24}
                color={theme.utilColors.white}
              />
            </View>
          </TouchableOpacity>}
        </Animatable.View>}
      </View>
    </View>
  }
  </>;
};

export default Header;
