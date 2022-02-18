import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import loadable from '@loadable/component';
import Loader from '../components/Loader';
import ThemeContext from '../components/theme';

// const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

// For avoiding the flashing of loader
const delay = (promise, ms) => new Promise((resolve) => setTimeout(() => resolve(promise), ms));

const RouteIndex = loadable(() => delay(import('./Index'), 300), { fallback: <Loader /> });

const RouteAbout = loadable(() => delay(import('./About'), 300), { fallback: <Loader /> });

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: theme.primary,
  },
  topBar: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.secondary,
    padding: 20,
    // height: 72,
  },
});

const App = () => {
  const { theme } = useContext(ThemeContext);
  const style = getStyles(theme);
  return (
  <View style={style.container}>
    <View style={style.topBar}>
      <Text>hackekidLogo</Text>
      <Text>Logo</Text>
    </View>
    <NavigationContainer>
    {/* <Stack.Navigator>
      <Stack.Screen name = "Index" component = {RouteIndex} />
      <Stack.Screen name = "About" component = {RouteAbout} />
    </Stack.Navigator> */}
      <Tab.Navigator>
        <Tab.Screen name = "Index" component = {RouteIndex} />
        <Tab.Screen name = "About" component = {RouteAbout} />
      </Tab.Navigator>
    </NavigationContainer>
  </View>
  );
};

export default App;
