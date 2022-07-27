import React, { useContext } from 'react';
import {
  Button,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { FormattedMessage, useIntl } from 'react-intl';
import ThemeContext from '../components/theme';

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bodyBg,
  },
});

const Challenges = ({ navigation }) => {
  const { theme, font } = useContext(ThemeContext);
  const pageTheme = theme.screenChallenges;
  const style = getStyles(pageTheme);
  const intl = useIntl();

  return (
    <ScrollView style={style.container}>
      <Text style={{
        marginVertical: 250,
        textAlign: 'center',
        ...font.heading1,
      }}>
        <FormattedMessage
          defaultMessage="This is challenges page"
          description="Challenges Page"
        />
      </Text>
      <Button
        onPress={() => navigation.navigate('Home')}
        title={intl.formatMessage({
          defaultMessage: 'Go to More',
          description: 'Home Navigation Button',
        })}
        color={pageTheme.btnBg}
      />
    </ScrollView>
  );
};

export default Challenges;
