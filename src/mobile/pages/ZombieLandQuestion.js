import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { ZombieLandContext } from '../../hooks/pages/zombieLand';
import ThemeContext from '../components/theme';
import TryNowSVG from '../../images/games/trynow.svg';

const getStyles = (theme, font, utilColors) => StyleSheet.create({
  flexContainer: {
    flex: 1,
    paddingVertical: 8,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  titleText: {
    ...font.subtitle1,
    color: utilColors.white,
    marginBottom: 8,
  },
  btnText: {
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
    maxHeight: '35%',
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
    width: '90%',
    alignSelf: 'center',
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
  // const webViewRef = React.useRef(null);
  const style = getStyles(theme.screenZombieLandQuestion, font, utilColors);

  return <>
    <View style={style.flexContainer} >
      <View style={style.container}>
        <Text style={style.titleText}>
          <FormattedMessage
            defaultMessage='{question}'
            description='Question'
            values={{
              question: zlContext.ctxState.questionObject.qname,
            }}
          />
        </Text>
        <View style={[style.card, style.cardProblemBg]}>
          <ScrollView>
            { zlContext.ctxState.questionObject.q_instruction
              && zlContext.ctxState.questionObject.q_instruction.map(
                (step, index) => <Text key={index} style={style.problemStatement}>
                  <FormattedMessage
                    defaultMessage={'{idx} {step}'}
                    description='Steps'
                    values={{
                      step: (step[step.length - 1] === '.') ? step.slice(0, -1) : step,
                      idx: `${index + 1}. `,
                    }}
                  />
                </Text>,
              ) }
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => { navigation.navigate('ZombieLandOutput'); }}
        style={style.tryNowBtn}
      >
        <View style={style.rowBetween}>
          <Text style={style.btnText}>
            <FormattedMessage
              defaultMessage='Try Now'
              description='Try Now Button'
            />
          </Text>
          <TryNowSVG />
        </View>
      </TouchableOpacity>
    </View>
  </>;
};

export default ZombieLandQuestion;
