import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import ThemeContext from '../components/theme';
import { TurtleContext } from '../../hooks/pages/turtle';
import Collapse from '../components/Collapse';

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
    paddingVertical: 16,
    marginVertical: 4,
    // backgroundColor: utilColors.white,
    backgroundColor: 'white',
  },
  cardProblemBg: {
    backgroundColor: '#ffffffee',
    padding: 16,
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
    marginLeft: 16,
  },
});

const TurtleQuestion = () => {
  const { font, theme: { utilColors } } = React.useContext(ThemeContext);
  const style = getStyles(font, utilColors);
  const intl = useIntl();
  const turtleContext = React.useContext(TurtleContext);

  return <>
    {/* <TurtleContext.Consumer>
      { (value) => <> */}
        <ScrollView style={style.container}>
          <Text style={style.titleText}>
            <FormattedMessage
              defaultMessage='Problem Statement'
              description='Problem Statement'
            />
          </Text>
          <View style={[style.card, style.cardProblemBg]}>
            <Text style={[style.cardContent, style.mb1]}>
              <FormattedMessage
                defaultMessage='{question}'
                description='Question'
                values={{
                  question: turtleContext.questionObject.Question,
                }}
              />
            </Text>
            { turtleContext.questionObject.steps
            && <Text style={style.cardContent}>
                <FormattedMessage
                  defaultMessage='Instructions'
                  description='Instructions'
                />
              </Text> }
            { turtleContext.questionObject.steps
                && turtleContext.questionObject.steps.map(
                  (step, index) => <Text key={index} style={style.problemStatement}>
                    <FormattedMessage
                      defaultMessage={'{step}'}
                      description='Steps'
                      values={{
                        step: step.trim(),
                      }}
                    />
                  </Text>,
                ) }
          </View>
        {/* <View style={style.card}></View> */}
          <Animatable.View style={style.card}>
            <Collapse
              style={style.card}
              title={intl.formatMessage({
                defaultMessage: 'Expected Output',
                description: 'Collapse Title - Expected Output',
              })}
              // CustomHeader={() => <Text style={style.cardContent} >Expected Output</Text>}
            >
              <View>
              { new Array(5)
                .fill(0, 0, 10)
                .map((elem, ind) => <Text key={ind} >hello</Text>)}
              </View>
            </Collapse>
          </Animatable.View>
        </ScrollView>
      {/* </> }
    </TurtleContext.Consumer> */}
  </>;
};

export default TurtleQuestion;
