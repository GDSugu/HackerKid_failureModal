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

const Games = ({ navigation }) => {
  const { theme, font } = useContext(ThemeContext);
  const pageTheme = theme.screenGames;
  const style = getStyles(pageTheme);
  const intl = useIntl();

  return (
    <ScrollView style={style.container}>
      <Text style={{
        fontSize: 24,
        marginVertical: 250,
        textAlign: 'center',
        ...font.heading1,
      }}>
        <FormattedMessage
          defaultMessage="This is games page"
          description="Games Page"
        />
      </Text>
      <Button
        onPress={() => navigation.navigate('Home')}
        title={intl.formatMessage({
          defaultMessage: 'Go to Home',
          description: 'Home Navigation Button',
        })}
        color={pageTheme.btnBg}
      />
    </ScrollView>
  );
};

export default Games;
