import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';
import { FormattedMessage, useIntl } from 'react-intl';
import ThemeContext from '../components/theme';
import { useTimeTrack } from '../../hooks/pages/timeTrack';

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.primary,
  },
});

const About = ({ navigation }) => {
  const { static: { startTimeTrack, stopTimeTrack } } = useTimeTrack({ navigation });
  const { theme } = useContext(ThemeContext);
  const style = getStyles(theme);

  const intl = useIntl();

  useEffect(() => {
    startTimeTrack('about');

    return () => {
      stopTimeTrack('about');
    };
  }, []);

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
