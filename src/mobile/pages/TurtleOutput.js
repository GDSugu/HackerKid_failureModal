import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const getStyles = () => StyleSheet.create({
  container: {
    flex: 1,
  },
});

const TurtleOutput = () => {
  const style = getStyles();

  return <>
    <View style={style.container}>
      <Text>Turtle Output</Text>
    </View>
  </>;
};

export default TurtleOutput;
