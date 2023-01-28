import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ThemeContext from '../theme';

const getStyles = (style, utilColors) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: theme.bodyBg,
  },
  fillScreen: {
    ...StyleSheet.absoluteFill,
  },
  screenLoaderBg: {
    backgroundColor: utilColors.transparent,
  },
});

const Loader = ({ text, route }) => {
  const { theme } = React.useContext(ThemeContext);
  const themeName = route ? theme[`screen${route}`] : '';
  const style = getStyles(themeName, theme.utilColors);

  return <>
    <View style={style.container}>
      <Text>Loading</Text>
      <ActivityIndicator size="large">
        {
          text && <Text>{text}</Text>
        }
      </ActivityIndicator>
    </View>
  </>;
};

const ScreenLoader = ({ text, route }) => {
  const { theme } = React.useContext(ThemeContext);
  const themeName = route ? theme[`screen${route}`] : '';
  const style = getStyles(themeName, theme.utilColors);

  return <>
    <View
      style={[
        style.container,
        style.fillScreen,
        style.screenLoaderBg,
      ]}
    >
      <ActivityIndicator size="large" color={themeName?.navBg || '#ffffff'}>
        {
          text && <Text>{text}</Text>
        }
      </ActivityIndicator>
    </View>
  </>;
};

export default Loader;

export {
  ScreenLoader,
};
