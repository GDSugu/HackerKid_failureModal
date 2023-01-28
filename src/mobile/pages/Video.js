import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VideoPlayerPage from './VideoPlayer';
import VideoHome from './VideoHome';
import VideoByModule from './VideoByModule';

const Stack = createNativeStackNavigator();
const Video = () => (<Stack.Navigator
  screenOptions={{
    headerShown: false,
  }} initialRouteName={'VideoHome'}>
  <Stack.Screen name='VideoHome' component={VideoHome} />
  <Stack.Screen name='VideoPlayer' component={VideoPlayerPage} />
  <Stack.Screen name='VideoByModule' component={VideoByModule} />
</Stack.Navigator>);

export default Video;
