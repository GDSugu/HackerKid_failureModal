import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  // Image,
} from 'react-native';
import ThemeContext from '../components/theme';

const getStyles = (theme, utilColors) => StyleSheet.create({
  inputField: {
    borderWidth: 2,
    borderColor: theme.inputBorderColor,
    borderRadius: 8,
  },
});

const Signin = ({ navigation }) => {
  const { theme } = React.useContext(ThemeContext);
  const screenTheme = theme.screenSignin;
  const style = getStyles(screenTheme, theme.utilColors);

  return (
    <View>
      <Text>Testing</Text>
    </View>
  );
};

export default Signin;
