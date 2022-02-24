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

const More = ({ navigation }) => {
  const { font, theme } = useContext(ThemeContext);
  const pageTheme = theme.screenMore;
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
          defaultMessage="This is more options page"
          description="More options Page"
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

export default More;
