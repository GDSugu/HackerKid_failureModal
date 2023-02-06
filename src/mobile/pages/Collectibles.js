import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Text, View, Image, StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import collectible1 from '../../images/collectibles/collectible1.png';
import ThemeContext from '../components/theme';

const getStyles = (theme, utilColors, font, gradients) => StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    paddingHorizontal: 18,
  },
  textColor1: {
    color: utilColors.dark,
  },
  textColor2: {
    color: utilColors.white,
  },
  textColor3: {
    color: theme.textBold,
  },
  textColor4: {
    color: utilColors.lightGrey,
  },
  heading: {
    ...font.subtitleBold,
  },
  btnText: {
    ...font.subtitle1,
  },
  text: {
    ...font.subtitle2,
  },
  smallText: {
    ...font.body,
  },
  smallestText: {
    ...font.caption,
  },
  whiteBg: {
    backgroundColor: utilColors.white,
  },
  collectiblesList: {
    paddingTop: 17,
  },
  collectibleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
  },
  collectibleImageContainer: {
    width: 72,
    height: 72,
    borderWidth: 1,
    borderColor: theme.borderLight,
    borderRadius: 12,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  collectibleImage: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  rarityIndicatorWithCollectibleType: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  rarityIndicator: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  rareGradient: gradients.purple,
  commonGradient: gradients.redYellow,
  epicGradient: gradients.green,
  textTransformCapitalize: {
    textTransform: 'capitalize',
  },
});

const CollectibleItem = ({
  style, collectibleName, collectibleRarity, collectibleType,
}) => <View
  style={style.collectibleItem}>
    <View style={style.collectibleImageContainer}>
      <Image source={collectible1} style={style.collectibleImage} />
    </View>
    <View>
      <Text style={[style.textColor1, style.text, style.textTransformCapitalize]}>
        <FormattedMessage
          defaultMessage={'{collectibleName}'} description='collectible name' values={{
            collectibleName,
          }} />
      </Text>
      <View style={style.rarityIndicatorWithCollectibleType}>
        <LinearGradient
          style={style.rarityIndicator}
          colors={style[`${collectibleRarity}Gradient`]}
          useAngle={true}
          angle={270}
        >
          <Text style={[style.textColor2, style.smallestText, style.textTransformCapitalize]}>
            <FormattedMessage
              defaultMessage={'{collectibleRarity}'}
              description='collectible rarity' values={{
                collectibleRarity,
              }} />
          </Text>
        </LinearGradient>
        <Text style={[style.textColor1, style.smallText, style.textTransformCapitalize]}>
          <FormattedMessage
            defaultMessage={'{collectibleType}'}
            description='collectible type' values={{
              collectibleType,
            }} />
        </Text>
      </View>
    </View>
  </View>;

const Collectibles = () => {
  // styles
  const { font, theme } = useContext(ThemeContext);
  const screenTheme = theme.screenCollectibles;
  const style = getStyles(screenTheme, theme.utilColors, font, theme.gradients);

  const collectibles = [
    {
      collectibleName: 'Creator Card Name',
      collectibleRarity: 'rare',
      collectibleType: 'Creator Card',
    },
    {
      collectibleName: 'Avatar Name',
      collectibleRarity: 'common',
      collectibleType: 'Avatar',
    },
    {
      collectibleName: 'Python turle basics video',
      collectibleRarity: 'epic',
      collectibleType: 'Video Unlocked',
    },
    {
      collectibleName: 'Creator Card Name',
      collectibleRarity: 'rare',
      collectibleType: 'Creator Card',
    },
    {
      collectibleName: 'Avatar Name',
      collectibleRarity: 'common',
      collectibleType: 'Avatar',
    },
  ];

  return <View
    style={[style.whiteBg, style.container, style.mainContainer, style.collectiblesList]}>
    {
      collectibles.map((collectible, index) => <CollectibleItem
        key={index}
        collectibleName={collectible.collectibleName}
        collectibleRarity={collectible.collectibleRarity}
        collectibleType={collectible.collectibleType}
      />)
    }
  </View>;
};

export default Collectibles;
