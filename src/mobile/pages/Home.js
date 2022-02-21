import React, { useContext } from 'react';
import {
  Text,
  Button,
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

const Index = ({ navigation }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const pageTheme = theme.screenHome;
  const style = getStyles(pageTheme);

  const intl = useIntl();

  return (
    <ScrollView style={style.container}>
      <Text style={{
        fontSize: 100,
        marginVertical: 200,
        textAlign: 'center',
      }}>
        <FormattedMessage
          description = "Page description"
          defaultMessage = "This is Home page"
        />
      </Text>
      <Button
        onPress={() => navigation.navigate('Games')}
        title={intl.formatMessage({
          defaultMessage: 'Go to Games',
          description: 'Link description',
        })}
        color={pageTheme.btnBg}
      />
      <Button
        onPress={() => toggleTheme()}
        title={intl.formatMessage({
          defaultMessage: 'Toggle Theme',
          description: 'Toggle theme Button description',
        })}
        color={pageTheme.btnBg}
      />
    </ScrollView>
  );
};

export default Index;
