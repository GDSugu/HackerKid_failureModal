import React, { useContext } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';
import { FormattedMessage, useIntl } from 'react-intl';
import ThemeContext from '../components/theme';

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.primary,
  },
});

const About = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);

  const style = getStyles(theme);

  const intl = useIntl();

  return (
    <View style = {style.container}>
      <Text>
        <FormattedMessage
          description = "Page description"
          defaultMessage = "This is about page"
        />
      </Text>
      <Button
        onPress = {() => navigation.navigate('Home')}
        title={intl.formatMessage({
          defaultMessage: 'Go to Home',
          description: 'Link description',
        })}
      />
    </View>
  );
};

export default About;
