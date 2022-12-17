import React, { useContext } from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { FormattedMessage } from 'react-intl';
import ThemeContext from '../components/theme';

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.bodyBg,
  },
});

const Video = () => {
  const { font, theme } = useContext(ThemeContext);
  const pageTheme = theme.screenVideo;
  const style = getStyles(pageTheme);

  return (
    <View style={style.container}>
      <Text style={{
        textAlign: 'center',
        ...font.heading1,
      }}>
        <FormattedMessage
          defaultMessage="Coming Soon..."
          description="More options Page"
        />
      </Text>
    </View>
  );
};

export default Video;
