import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  // Image,
} from 'react-native';
import ThemeContext from '../theme';
import IconHome from '../../../images/navbar/iconHome.svg';
// import Icon from '../../common/Icons';

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
});

const Header = ({ route, navigation }) => {
  const { theme } = React.useContext(ThemeContext);
  const screenTheme = theme[`screen${route}`];
  const style = getStyles(screenTheme, theme.utilColors);

  return screenTheme.showHeader && (
    <View style={style.header}>
      <Text>hackekidLogo</Text>
      <View style={style.flexHorizontal}>
        { (route !== 'Class') && <TouchableOpacity
            style={style.navigationBtn}
            onPress={() => {
              navigation.current.navigate('Class');
            }}
          >
          <Text>
            <FormattedMessage
              defaultMessage='Go to Class'
              description='class navigation button'
            />
          </Text>
        </TouchableOpacity> }
        { (route !== 'Home') && <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => {
              navigation.navigate('Home');
            }}
          >
          {/* <Image
            source={iconHome}
          /> */}
          <IconHome />
          </TouchableOpacity> }
        {/* { (screenTheme.viewType === 'fragment') && <TouchableOpacity>
          <View>
            <Icon name='user' type='FontAwesome' size={24} color={theme.utilColors.white} />
          </View>
          </TouchableOpacity>} */}
      </View>
    </View>
  );
};

export default Header;
