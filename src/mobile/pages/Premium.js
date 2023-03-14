import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { StyleSheet, Text, View } from 'react-native';
import ThemeContext from '../components/theme';

const getStyles = (font, utilColors) => StyleSheet.create({
  premiumContainer: {
    padding: 16,
    margin: 12,
  },
  premiumTitleText: {
    ...font.heading4,
    color: utilColors.dark,
    textAlign: 'center',
  },
  premiumContentText: {
    color: utilColors.dark,
    ...font.subtitle2,
    textAlign: 'center',
    marginVertical: 12,
  },
});

const Premium = () => {
  const { font, theme } = useContext(ThemeContext);
  const style = getStyles(font, theme.utilColors);

  return <>
    <View style={style.premiumContainer}>
      <Text style={style.premiumTitleText}>
        <FormattedMessage
          defaultMessage={'You\'re almost there'}
          description={'Premium title tag'}
        />
      </Text>
      <Text style={style.premiumContentText}>
        <FormattedMessage
          defaultMessage={'Go to hackerkid.org & finish the sign up process. As a Premium Member, you\'ll have unlimited access to gamified coding problems, video libraries, challenges, activity awards, badges, certificates and special access to clubs.'}
        />
      </Text>
    </View>
  </>;
};

export default Premium;
