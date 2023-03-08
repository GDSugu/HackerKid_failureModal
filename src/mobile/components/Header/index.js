import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import ThemeContext from '../theme';
import IconHome from '../../../images/navbar/iconHome.svg';
import Icon from '../../common/Icons';
import favicon from '../../../images/common/favicon.png';

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
  headerLogo: {
    width: 36,
    height: 36,
  },
  disposableIconBtn: {
    backgroundColor: utilColors.disposableIconBg,
    color: utilColors.white,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
});

const Header = ({ route, navigation }) => {
  const { font, theme } = React.useContext(ThemeContext);
  const screenTheme = theme[`screen${route}`];
  const style = getStyles(screenTheme, theme.utilColors);

  const classNavRoutes = ['Home', 'Games', 'Video', 'Challenges', 'More'];
  const homeNavRoutes = ['Class', 'Games', 'Video', 'Challenges', 'More', 'Ide', 'Code', 'Console'];

  return <>
    {
      screenTheme.showHeader
      && <View style={style.header}>
      {/* <Text>hackekidLogo</Text> */}
      <Image
        source={favicon}
        style={style.headerLogo}
      />
      <View style={style.flexHorizontal}>
        {(classNavRoutes.includes(route)) && <TouchableOpacity
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
          animation={homeNavRoutes.includes(route) ? 'fadeInRight' : 'fadeOutRight'}
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
                defaultMessage='Close'
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
                name='close'
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
