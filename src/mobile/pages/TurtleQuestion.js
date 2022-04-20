import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { StyleSheet, Text, View } from 'react-native';
import Collapse from '../components/Collapse';
import ThemeContext from '../components/theme';

const getStyles = (font, utilColors) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleText: {
    ...font.subtitle1,
    color: utilColors.white,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 4,
    backgroundColor: utilColors.white,
  },
  cardProblemBg: {
    backgroundColor: '#ffffffee',
  },
  cardContent: {
    ...font.subtitle2,
    color: utilColors.dark,
    lineHeight: 24,
  },
});

const TurtleQuestion = () => {
  const { font, theme: { utilColors } } = React.useContext(ThemeContext);
  const style = getStyles(font, utilColors);
  const intl = useIntl();

  return <>
    <View style={style.container}>
      <Text style={style.titleText}>
        <FormattedMessage
          defaultMessage='Problem Statement'
          description='Problem Statement'
        />
      </Text>
      <View style={[style.card, style.cardProblemBg]}>
        <Text style={style.cardContent}>
          {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh arcu scelerisque mi a, nibh. Morbi maecenas etiam tempus tristique hendrerit duis lectus et.'}
        </Text>
      </View>
      {/* <View style={style.card}></View> */}
      <Collapse
        style={style.card}
        title={intl.formatMessage({
          defaultMessage: 'Expected Output',
          description: 'Collapse Title - Expected Output',
        })}
      >
        <Text style={style.cardContent}>hello</Text>
      </Collapse>
    </View>
  </>;
};

export default TurtleQuestion;
