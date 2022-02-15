import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { FormattedMessage, useIntl } from 'react-intl';
import ThemeContext from '../components/theme';

const About = ({ navigation }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

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
        onPress = {() => navigation.navigate('Index')}
        title={intl.formatMessage({
          defaultMessage: 'Go to Index',
          description: 'Link description',
        })}
      />
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.primary,
  }
});

export default About;
