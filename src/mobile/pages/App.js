import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from './Index';
import About from './About';

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name = "Index" component = {Index} />
      <Stack.Screen name = "About" component = {About} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
