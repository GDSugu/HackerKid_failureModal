import React, { useContext, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as Animatable from 'react-native-animatable';
import Loader from '../components/Loader';
import ThemeContext from '../components/theme';
import Header from '../components/Header';

import RouteClass from './Class';
import RouteGames from './Games';
import RouteHome from './Home';
import RouteVideo from './Video';
import RouteChallenges from './Challenges';
import RouteMore from './More';

import IconGame from '../../images/navbar/iconGame.svg';
import IconHome from '../../images/navbar/iconHome.svg';
import IconMore from '../../images/navbar/iconMore.svg';
import IconStar from '../../images/navbar/iconStar.svg';
import IconVideo from '../../images/navbar/iconVideo.svg';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

// For avoiding the flashing of loader
// const delay = (promise, ms) => new Promise((resolve) => setTimeout(() => resolve(promise), ms));

// const RouteAbout = loadable(() => delay(import('./About'), 300), { fallback: <Loader /> });

/* const RouteGames = loadable(() => delay(import('./Games'), 300), { fallback: <Loader/> });
 const RouteHome = loadable(() => delay(import('./Home'), 300), { fallback: <Loader /> });
 const RouteVideo = loadable(() => delay(import('./Video'), 300), { fallback: <Loader /> });
 const RouteChallenges = loadable(() => delay(import('./Challenges'), 300), {fallback: <Loader />});
 const RouteMore = loadable(() => delay(import('./More'), 300), { fallback: <Loader /> }); */

const getStyles = (theme, utilColors) => StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    backgroundColor: theme.navBg,
  },
  navigationBtn: {
    backgroundColor: utilColors.white,
    color: utilColors.dark,
    borderRadius: 50,
    padding: 8,
    paddingHorizontal: 16,
  },
});

const TabArray = [
  {
    name: 'Home',
    component: RouteHome,
    Icon: IconHome,
  },
  {
    name: 'Games',
    component: RouteGames,
    Icon: IconGame,
  },
  {
    name: 'Video',
    component: RouteVideo,
    Icon: IconVideo,
  },
  {
    name: 'Challenges',
    component: RouteChallenges,
    Icon: IconStar,
  },
  {
    name: 'More',
    component: RouteMore,
    Icon: IconMore,
  },
];

const TabBar = (props) => {
  const {
    state,
    descriptors,
    navigation,
    style,
    screenTheme,
    utilColors,
  } = props;

  return (
    <View style={{ flexDirection: 'row', ...style.topBar }} >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const { Icon } = TabArray.filter((item) => item.name === route.name)[0];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return route.name !== 'Home' && (
          <TouchableOpacity
            key={index}
            accessibilityRole='button'
            accessibilityStates={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              marginHorizontal: 10,
              backgroundColor: isFocused ? screenTheme.navActiveBg : 'transparent',
              borderTopStartRadius: 12,
              borderTopLeftRadius: 12,
              borderTopEndRadius: 12,
              borderTopRightRadius: 12,
            }}
          >
              <Animatable.View
                duration={500}
                animation={isFocused ? 'bounceIn' : 'pulse'}
                useNativeDriver={true}
                style={{
                  height: 68,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '70%',
                }}
              >
                <View></View>
                <Icon color={isFocused ? '#ffffff' : '#212527'}/>
                <View style={{
                  height: 4,
                  width: '100%',
                  backgroundColor: isFocused ? utilColors.white : 'transparent',
                  borderRadius: 10,
                }}></View>
              </Animatable.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TabNavigators = (prop) => {
  const {
    routeName,
    screenTheme,
    style,
    theme,
  } = prop;

  return (
    <Tab.Navigator
      initialRouteName='Home'
      tabBar={
        (props) => <TabBar
          {...props}
          utilColors={theme.utilColors}
          screenTheme={screenTheme}
          style={style}
        />
      }
      screenOptions={{
        lazy: true,
        lazyPlaceholder: () => <Loader route={routeName}/>,
        // swipeEnabled: routeName !== 'Home',
      }}
    >
      {TabArray.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.name}
          component={item.component}
        />
      ))}
    </Tab.Navigator>
  );
};

const App = () => {
  const { theme } = useContext(ThemeContext);
  const navigationRef = useNavigationContainerRef();
  const [routeName, setRoutName] = useState('Home');
  const screenTheme = theme[`screen${routeName}`];
  const style = getStyles(screenTheme, theme.utilColors);

  return (
    <SafeAreaProvider>
        <View style={style.container}>
          <Header route={routeName} navigation={navigationRef}/>
          <NavigationContainer
            ref={navigationRef}
            onReady={() => { setRoutName(navigationRef.getCurrentRoute().name); }}
            onStateChange={() => { setRoutName(navigationRef.getCurrentRoute().name); }}
          >
            <Stack.Navigator
              initialRouteName='Start'
              screenOptions={{
                headerShown: false,
                animation: 'slide_from_bottom',
              }}
            >
              <Stack.Screen name='Start'>
                {() => TabNavigators({
                  routeName,
                  screenTheme,
                  style,
                  theme,
                })}
              </Stack.Screen>
              <Stack.Screen name='Class' component={RouteClass} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
    </SafeAreaProvider>
  );
};

export default App;
