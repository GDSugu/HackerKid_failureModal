import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { StyleSheet, Text, View } from 'react-native';
import ThemeContext from '../components/theme';
import PremiumLockSVG from '../../images/pricing/premium-lock.svg';

const getStyles = (theme, font, utilColors) => StyleSheet.create({
  premiumContainer: {
    padding: 16,
    paddingTop: 24,
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: theme.bodyBg,
  },
  premiumImage: {
    marginVertical: 48,
  },
  premiumTitleText: {
    ...font.heading3,
    color: utilColors.dark,
    textAlign: 'center',
  },
  premiumContentText: {
    color: utilColors.dark,
    ...font.subtitle2,
    textAlign: 'center',
    marginVertical: 12,
    lineHeight: 24,
  },
  premiumContentRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  textBold: {
    ...font.subtitle1,
  },
  premiumRowContainer: {
    backgroundColor: theme.leaderBoardHighlightEntryColor,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginVertical: 12,
  },
  mh4: {
    marginHorizontal: 4,
  },
});

const Premium = () => {
  const { font, theme } = useContext(ThemeContext);
  const style = getStyles(theme.screenPremium, font, theme.utilColors);

  return <>
    <View style={style.premiumContainer}>
      <View style={style.premiumImage}>
        <PremiumLockSVG />
      </View>
      <Text style={style.premiumTitleText}>
        <FormattedMessage
          defaultMessage={'Almost there!'}
          description={'Premium title tag'}
        />
      </Text>
      <View style={[style.premiumContentRow, style.premiumRowContainer]}>
        <Text style={style.premiumContentText}>
          <FormattedMessage
            defaultMessage={'Go to'}
            description={'premium content'}
          />
        </Text>
        <Text style={[style.mh4, style.premiumContentText, style.textBold]}>
          <FormattedMessage
            defaultMessage={'\r hackerkid.org \r'}
            description={'premium content'}
          />
        </Text>
        <Text style={style.premiumContentText}>
          <FormattedMessage
            defaultMessage={'& finish the sign up process.'}
            description={'premium content'}
          />
        </Text>
      </View>
      <Text style={style.premiumContentText}>
        <FormattedMessage
          defaultMessage={'As a Premium Member, you\'ll have unlimited access to gamified coding problems, video libraries, challenges, activity awards, badges, certificates and special access to clubs.'}
          description={'premium content'}
        />
      </Text>
    </View>
  </>;
};

export default Premium;
