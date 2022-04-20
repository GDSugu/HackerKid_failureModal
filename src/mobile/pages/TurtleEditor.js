import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const getStyles = () => StyleSheet.create({
  container: {
    flex: 1,
  },
});

const TurtleEditor = () => {
  const style = getStyles();
  const route = useRoute();
  console.log('Turtle editor, ', route);

  return <>
    <View style={style.container}>
      <Text>Turtle Editor</Text>
    </View>
  </>;
};

export default TurtleEditor;
