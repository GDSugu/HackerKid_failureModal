import React, { useContext, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
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
// import RouteChallenges from './Challenges';
import RouteMore from './More';
import RouteProfile from './EditProfile';
import RouteLogin from './Login';
import RouteRegister from './Register';
import RouteForgotPassword from './ForgotPassword';
import RouteLeaderboard from './Leaderboard';
import RouteAchievements from './Achievements';
import RouteAwardsCollectibles from './AwardsCollectibles';
import RouteCertificates from './Certificates';
import RouteIde from './Ide';
import RouteHelp from './Help';
import RouteTurtleHome from './TurtleHome';
import RouteTurtleMain from './TurtleMain';
import RouteAllChallenges from './AllChallenges';
import RouteYourChallenges from './YourChallenges';
import RouteDraftChallenges from './YourDraftChallenges';

import RouteZombieLandHome from './ZombieLandHome';
import RouteZombieLandMain from './ZombieLandMain';

import RouteGameLeaderBoard from './GameLeaderBoard';

import RouteCodekata from './Codekata';
import RouteCodekataMain from './CodekataMain';
import RouteWebkataHome from './WebkataHome';
import RouteWebkataMain from './WebkataMain';
import RouteClub from './Clubs';

import RoutePremium from './Premium';
import BottomSheet from '../components/BottomSheet';
import YourChallengesActions from '../components/YourChallengesActions';

import IconGame from '../../images/navbar/iconGame.svg';
import IconHome from '../../images/navbar/iconHome.svg';
import IconMore from '../../images/navbar/iconMore.svg';
// import IconStar from '../../images/navbar/iconStar.svg';
import IconVideo from '../../images/navbar/iconVideo.svg';
import { AuthContext } from '../../hooks/pages/root';
import CheckNetwork from '../components/CheckNetwork';
import { useTimeTrack } from '../../hooks/pages/timeTrack';

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
    id: 'dashboard',
  },
  {
    name: 'Games',
    component: RouteGames,
    Icon: IconGame,
    id: 'games',
  },
  {
    name: 'Video',
    component: RouteVideo,
    Icon: IconVideo,
    id: 'courses',
  },
  // {
  //   name: 'Challenges',
  //   component: RouteChallenges,
  //   Icon: IconStar,
  //   id: 'challenges',
  // },
  {
    name: 'More',
    component: RouteMore,
    Icon: IconMore,
    id: 'more',
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
    authContext,
  } = props;

  const isFullScreen = () => authContext.authState.isFullScreen;

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

        return (
          !isFullScreen()
          && route.name !== 'Home'
        )
        && (
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
              <Icon color={isFocused ? '#ffffff' : '#212527'} />
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
    navigation,
    authContext,
  } = prop;
  const { static: { startTimeTrack, stopTimeTrack } } = useTimeTrack({ navigation });

  return (
    <>
      {
        // authContext.authState.isFullScreen
        // &&
        <>
          <Tab.Navigator
            initialRouteName='Home'
            tabBar={
              (props) => <TabBar
                {...props}
                utilColors={theme.utilColors}
                screenTheme={screenTheme}
                style={style}
                authContext={authContext}
              />
            }
            screenOptions={{
              lazy: true,
              lazyPlaceholder: () => <Loader route={routeName} />,
              // swipeEnabled: routeName !== 'Home',
              swipeEnabled: false,
            }}
          >
            {TabArray.map((item, index) => (
              <Tab.Screen
                key={index}
                name={item.name}
                component={item.component}
                listeners={{
                  focus: () => {
                    startTimeTrack(item?.id);
                  },
                  blur: () => {
                    stopTimeTrack(item?.id);
                  },
                }}
              />
            ))}
          </Tab.Navigator>
        </>
      }
    </>
  );
};

const App = () => {
  const { theme } = useContext(ThemeContext);
  const navigationRef = useNavigationContainerRef();
  const [routeName, setRoutName] = useState('Home');
  const screenTheme = theme[`screen${routeName}`];
  const style = getStyles(screenTheme, theme.utilColors);

  const authContext = useContext(AuthContext);

  const isFullScreen = () => authContext.authState.isFullScreen || false;

  return (
    <SafeAreaProvider>
        <>
          <StatusBar
            backgroundColor={screenTheme.notificationBg}
            hidden={isFullScreen()}
          />
        </>
      <View style={style.container}>
        {
          !isFullScreen()
          && <>
            <Header route={routeName} navigation={navigationRef} />
          </>
        }
        <CheckNetwork route={routeName} />
        <NavigationContainer
          ref={navigationRef}
          onReady={() => { setRoutName(navigationRef.getCurrentRoute().name); }}
          onStateChange={() => { setRoutName(navigationRef.getCurrentRoute().name); }}
        >
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_bottom',
            }} initialRouteName={'Login'}>
            <Stack.Group>
              {
                authContext.authState.isLoggedIn
                  ? <>
                    <Stack.Screen name='Start'>
                      {({ navigation }) => TabNavigators({
                        routeName,
                        screenTheme,
                        style,
                        theme,
                        navigation,
                        authContext,
                      })}
                    </Stack.Screen>
                    <Stack.Screen name='Class' component={RouteClass} />
                    {/* <Stack.Screen name='Codekata' component={RouteCodekata} /> */}
                    <Stack.Screen name='EditProfile' component={RouteProfile} />
                    <Stack.Screen name='Leaderboard' component={RouteLeaderboard} />
                    <Stack.Screen name='Ide' component={RouteIde} />
                    <Stack.Screen name='AwardsCollectibles' component={RouteAwardsCollectibles} />
                    <Stack.Screen name='Certificates' component={RouteCertificates} />
                    <Stack.Screen name='WebkataHome' component={RouteWebkataHome} />
                    <Stack.Screen name='WebkataMain' component={RouteWebkataMain} />
                    <Stack.Screen name='AllChallenges' component={RouteAllChallenges} />
                    <Stack.Screen name='YourChallenges' component={RouteYourChallenges} />
                    <Stack.Screen name='YourDraftChallenges' component={RouteDraftChallenges} />

                    <Stack.Screen name='TurtleHome'>
                      {(props) => <RouteTurtleHome {...props} routeName={routeName} />}
                    </Stack.Screen>
                    <Stack.Group
                      screenOptions={{
                        animation: 'slide_from_right',
                      }}
                    >
                      <Stack.Screen name='TurtleMain' component={RouteTurtleMain} />
                    </Stack.Group>
                    <Stack.Screen name='ZombieLandHome'>
                      {(props) => <RouteZombieLandHome {...props} routeName={routeName} />}
                    </Stack.Screen>
                    <Stack.Group
                      screenOptions={{
                        animation: 'slide_from_right',
                      }}
                    >
                      <Stack.Screen name='ZombieLandMain' component={RouteZombieLandMain} />
                    </Stack.Group>

                    <Stack.Screen name='Codekata'>
                      {(props) => <RouteCodekata {...props} routeName={routeName} /> }
                    </Stack.Screen>
                    <Stack.Group
                      screenOptions={{
                        animation: 'slide_from_right',
                      }}
                    >
                    <Stack.Screen name='CodekataMain' component={RouteCodekataMain} />
                    </Stack.Group>
                    <Stack.Screen name='GameLeaderBoard' component={RouteGameLeaderBoard} />
                    <Stack.Screen name='Club' component={RouteClub}></Stack.Screen>
                  </>
                  : <>
                    <Stack.Screen name='Login' component={RouteLogin} />
                    <Stack.Screen name='Register' component={RouteRegister} />
                    <Stack.Screen name='ForgotPassword' component={RouteForgotPassword} />
                  </>
              }
            </Stack.Group>
            <Stack.Screen name='Premium' component={RoutePremium} />
            <Stack.Screen name='Help' component={RouteHelp} />
            <Stack.Screen name='Achievements' component={RouteAchievements} />
            <Stack.Screen name='YourChallengesActions' component={YourChallengesActions} />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen name='BottomSheet' component={BottomSheet} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
};

export default App;
