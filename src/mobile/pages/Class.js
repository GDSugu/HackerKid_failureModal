import React, { useContext, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { FormattedMessage } from 'react-intl';
import ThemeContext from '../components/theme';
import ScreenLoader from '../components/Loader';

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.bodyBg,
  },
});

const Class = () => {
  const { theme, font } = useContext(ThemeContext);
  const pageTheme = theme.screenClass;
  const style = getStyles(pageTheme);
  const loaderRef = React.useRef(null);

  useEffect(() => {
    loaderRef?.current?.show();
  }, []);

  return (
    <>
      <View style={style.container}>
        <Text style={{
          textAlign: 'center',
          ...font.heading1,
        }}>
          <FormattedMessage
            defaultMessage="Coming Soon..."
            description="Class Page"
          />
        </Text>
      </View>
      <ScreenLoader route={'Class'} ref={loaderRef} text={'text new text'} />
    </>
  );
};

export default Class;
