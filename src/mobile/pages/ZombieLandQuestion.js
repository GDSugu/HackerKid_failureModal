import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { ZombieLandContext } from '../../hooks/pages/zombieLand';
import ThemeContext from '../components/theme';
import { getGameFunctions } from '../../shared/zombieLand/gameFunctions';
import { getBlockly } from '../../shared/turtle/turtleBlocks';

const getStyles = (theme, font, utilColors) => StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  titleText: {
    ...font.subtitle1,
    color: utilColors.white,
  },
  card: {
    borderRadius: 12,
    paddingVertical: 16,
    marginVertical: 4,
    backgroundColor: utilColors.white,
    // backgroundColor: 'white',
  },
  outputCard: {
    flex: 1,
    paddingLeft: 4,
    paddingTop: 4,
    paddingRight: 10,
    paddingBottom: 10,
    borderRadius: 12,
    backgroundColor: utilColors.white,
    marginVertical: 4,
    marginBottom: 8,
  },
  collapseCard: {
    flex: 1,
    padding: 16,
  },
  collapseCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  collapseCardHeaderContent: {
    ...font.subtitleBold,
    color: utilColors.black,
  },
  cardProblemBg: {
    backgroundColor: '#ffffffee',
    paddingVertical: 8,
    paddingHorizontal: 16,
    height: '25%',
  },
  cardContent: {
    ...font.subtitleBold,
    color: utilColors.dark,
    lineHeight: 24,
    marginBottom: 8,
  },
  mb1: {
    marginBottom: 16,
  },
  problemStatement: {
    ...font.subtitle2,
    color: utilColors.dark,
    lineHeight: 24,
    // marginLeft: 16,
  },
  tryNowBtn: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: theme.btnBg,
    marginTop: 8,
    padding: 16,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const ZombieLandQuestion = ({ navigation }) => {
  const { font, theme } = React.useContext(ThemeContext);
  const { utilColors } = theme;
  const zlContext = React.useContext(ZombieLandContext);
  const webViewRef = React.useRef(null);
  const style = getStyles(theme.screenZombieLandQuestion, font, utilColors);

  return <>
  <ScrollView>
    {/* {
      Object.keys(gameFunctions)
        .map((key, idx) => <Text
        key={idx}
        style={{ color: 'white' }}>
          {gameFunctions[key]?.toString()}
        </Text>)
    } */}
    <Text
    style={{ color: 'white' }}>
      { getGameFunctions.toString() }
    </Text>
  </ScrollView>
  </>;
};

export default ZombieLandQuestion;
