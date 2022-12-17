import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ThemeContext from '../theme';

const getStyles = () => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: theme.bodyBg,
  },
});

const Loader = ({ text, route }) => {
  const { theme } = React.useContext(ThemeContext);
  const themeName = route ? theme[`screen${route}`] : '';
  const style = getStyles(themeName);

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

export default Loader;
