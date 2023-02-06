import React, {
  useContext,
} from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native-animatable';
import ThemeContext from '../components/theme';
import Awards from './Awards';
// import Collectibles from './Collectibles';

const getStyles = (theme, utilColors, font) => StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: utilColors.white,
    paddingHorizontal: 18,
  },
  mainContainer: {
    paddingHorizontal: 18,
  },
  textColor1: {
    color: utilColors.dark,
  },
  textColor2: {
    color: utilColors.white,
  },
  textColor3: {
    color: theme.textBold,
  },
  textColor4: {
    color: utilColors.lightGrey,
  },
  heading: {
    ...font.subtitleBold,
  },
  btnText: {
    ...font.subtitle1,
  },
  text: {
    ...font.subtitle2,
  },
  smallText: {
    ...font.body,
  },
  smallestText: {
    ...font.caption,
  },
  whiteBg: {
    backgroundColor: utilColors.white,
  },
});

const Tab = createMaterialTopTabNavigator();

function MyTabBar({
  state, descriptors, navigation, tabBarStyle,
}) {
  return (
    <View style={tabBarStyle}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel;

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
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              options.tabBarItemStyle,
              {
                backgroundColor: isFocused ? options.tabBarActiveBackgroundColor : 'transparent',
                borderBottomWidth: 2,
                borderBottomColor: isFocused ? options.tabBarActiveBorderBottomColor
                  : options.tabBarInactiveBorderBottomColor,
              },
            ]}
          >
            <Text style={
              [options.tabBarLabelStyle, {
                color: isFocused
                  ? options.tabBarActiveTintColor : options.tabBarInactiveTintColor,
              }]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const AwardsCollectibles = ({ navigation }) => {
  // styles
  const { font, theme } = useContext(ThemeContext);
  const screenTheme = theme.screenAwardsCollectibles;
  const style = getStyles(screenTheme, theme.utilColors, font, theme.gradients);

  return <View style={style.container}>
    <Tab.Navigator
      initialLayout={{
        width: Dimensions.get('window').width,
      }}
      tabBar={(props) => <MyTabBar {...props} tabBarStyle={style.tabBar} />}
      screenOptions={{
        swipeEnabled: false,
        tabBarLabelStyle: { ...style.btnText, textTransform: 'capitalize' },
        tabBarActiveTintColor: style.textColor3.color,
        tabBarActiveBackgroundColor: screenTheme.bodyBg,
        tabBarActiveBorderBottomColor: style.textColor3.color,
        tabBarInactiveBorderBottomColor: screenTheme.loginTabInactiveBorder,
        tabBarInactiveTintColor: style.textColor1.color,
        tabBarItemStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          width: 130,
          paddingVertical: 16,
          paddingHorizontal: 0,
        },
      }}
    >
      <Tab.Screen
        name='Awards'
        options={{ tabBarLabel: 'Awards' }}
      >
        {() => <Awards style={style} navigation={navigation} />}
      </Tab.Screen>
      {/* <Tab.Screen name="Collectibles" options={{ tabBarLabel: 'Collectibles' }}>
        {(props) => <Collectibles {...props} style={style} collectibles={collectibles} />}
      </Tab.Screen> */}
    </Tab.Navigator>
  </View>;
};

export default AwardsCollectibles;
