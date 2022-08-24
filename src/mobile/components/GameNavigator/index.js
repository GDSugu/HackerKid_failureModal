import React, { useContext } from 'react';
import {
  Image,
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import TurtleHeader from '../Header/TurtleHeader';
import ThemeContext from '../theme';
import levelIcon from '../../../images/games/levelStar.png';
import hintIcon from '../../../images/games/hint.png';
// import gameMenuIcon from '../../../images/games/gameMenu.png';
import { TurtleContext } from '../../../hooks/pages/turtle';

enableScreens();

const getStyle = (font, utilColors = {}) => StyleSheet.create({
  tabBar: {
    backgroundColor: utilColors.darkTransparent50,
  },
  tabBarContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabBarActiveHead: {
    height: 3,
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  tabBarItemContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  tabBarItemText: {
    ...font.bodyBold,
    marginTop: 4,
  },
  tabHeader: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mh4: {
    marginHorizontal: 4,
  },
  mr12: {
    marginRight: 12,
  },
  tabHeaderIcon: {
    width: 28,
    height: 28,
  },
  tabHeaderLevelText: {
    ...font.heading6R,
    color: utilColors.white,
    marginLeft: 8,
  },
});

const GameBottomTabBar = (props) => {
  const {
    descriptors,
    font,
    navigation,
    setCurrentScreen,
    state,
    TabArray,
    utilColors,
  } = props;

  const style = getStyle(font, utilColors);

  return (
    <View style={style.tabBar}>
      <View style={style.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const { Icon, tabTitle } = TabArray.filter((item) => item.name === route.name)[0];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
            setCurrentScreen((prevState) => ({
              ...prevState,
              currentGameScreen: route.name,
            }));
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={style.tabBarItem}
          >
            <View style={[style.tabBarActiveHead, { backgroundColor: isFocused ? '#00D0FF' : 'transparent' }]}></View>
            <Animatable.View
              duration={500}
              animation={isFocused ? 'bounceIn' : 'pulse'}
              useNativeDriver={true}
              style={style.tabBarItemContainer}
            >
              <Icon color={isFocused ? '#00D0FF' : '#A9ABAC'} />
              <Text
                style={[style.tabBarItemText, { color: isFocused ? '#00D0FF' : '#A9ABAC' }]}
              >
                {/* <FormattedMessage
                  defaultMessage={tabTitle}
                  description='Game Nafontvigator Text'
                /> */}
                { tabTitle }
              </Text>
            </Animatable.View>
          </TouchableOpacity>
        );
      })}
      </View>
    </View>
  );
};

const GameHeader = ({
  // currentScreen,
  font, gradients, utilColors,
}) => {
  const style = getStyle(font, utilColors);
  const turtleContext = useContext(TurtleContext);

  return <>
    <TurtleHeader />
    <LinearGradient colors={gradients.darkTransparent1} style={style.tabHeader}>
      <View style={style.row}>
        <Image
          source={levelIcon}
          style={style.tabHeaderIcon}
        />
        <Text style={[style.tabHeaderLevelText]}>{'Level 2'}</Text>
      </View>
      <View style={style.row}>
        {/* { currentScreen !== 'TurtleOutput' */}
          <Animatable.View
              // animation={currentScreen !== 'TurtleOutput' ? 'fadeInUp' : 'fadeOutDown'}
              // duration={currentScreen !== 'TurtleOutput' ? 500 : 1250}
              animation='fadeInRight'
            >
              <TouchableOpacity
                style={style.mr12}
                onPress={() => { turtleContext.handleHintVisibility(true); }}
              >
                <Image
                  source={hintIcon}
                  resizeMode='contain'
                  style={style.tabHeaderIcon}
                />
              </TouchableOpacity>
            </Animatable.View>
          {/* : <></> */}
        {/* <TouchableOpacity style={style.mh4}>
          <Image
            source={gameMenuIcon}
            resizeMode='contain'
            style={style.tabHeaderIcon}
          />
        </TouchableOpacity> */}
      </View>
    </LinearGradient>
  </>;
};

const GameNavigator = ({ currentScreen, ScreenArray }) => {
  const BottomTab = createBottomTabNavigator();
  const { font, theme: { gradients, utilColors } } = useContext(ThemeContext);

  return (
    <>
    <GameHeader
          currentScreen={currentScreen.currentGameScreen}
          font={font}
          gradients={gradients}
          utilColors={utilColors}
        />
        <BottomTab.Navigator
      initialRouteName='TurtleQuestion'
      detachInactiveScreens={false}
      tabBar={
        (props) => <GameBottomTabBar
          {...props}
          TabArray={ScreenArray}
          font={font}
          utilColors={utilColors}
          setCurrentScreen={currentScreen.setCurrentGameScreen}
        />
      }
      screenOptions={{
        animationEnabled: true,
        swipeEnabled: false,
        headerShown: false,
        // lazy: false,
        // header: (props) => <GameHeader
        //   {...props}
        //   currentScreen={currentScreen.currentGameScreen}
        //   font={font}
        //   utilColors={utilColors}
        // />,
      }}
      sceneContainerStyle={{
        backgroundColor: 'transparent',
      }}
    >
      {ScreenArray.map((item, index) => (
        <BottomTab.Screen
          key={index}
          name={item.name}
          component={item.component}
        />
      ))}
    </BottomTab.Navigator>
    </>
  );
};

export default GameNavigator;
