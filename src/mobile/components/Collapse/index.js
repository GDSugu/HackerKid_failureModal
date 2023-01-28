import React from 'react';
import {
  Animated, Easing, Pressable, StyleSheet, Text, View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import ArrowUpIcon from '../../../images/common/arrow-up.svg';
import ArrowDownIcon from '../../../images/common/arrow-down.svg';
import ThemeContext from '../theme';
import Collapsible from './collapse';

const getStyles = (font, utilColors) => StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: utilColors.white,
    backgroundColor: 'red',
  },
  headerText: {
    ...font.subtitle1,
    color: utilColors.dark,
  },
});

const CollapseHeader = ({ isCollapsed, title }) => {
  const { font, theme: { utilColors } } = React.useContext(ThemeContext);
  const styles = getStyles(font, utilColors);
  return <>
    <Text>color</Text>
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
      { isCollapsed && <ArrowDownIcon/> }
      { !isCollapsed && <ArrowUpIcon/> }
    </View>
  </>;
};

const Collapse = ({
  CustomHeader = null, children, style, title,
}) => {
  const [collapseState, setCollapseState] = React.useState({
    isExpanded: false,
    animatedValue: new Animated.Value(0),
    collapseStyle: [style],
  });

  // const CollapseRef = React.createRef();
  // const { font, theme: { utilColors } } = React.useContext(ThemeContext);
  // const currentStyle = getStyles(font, utilColors);

  // const setMaxHeight = (event) => {
  //   setCollapseState({
  //     ...collapseState,
  //     maxheight: event.nativeEvent.layout.height,
  //   });
  // };

  const setMinHeight = (event) => {
    setCollapseState({
      ...collapseState,
      collapseStyle: [...collapseState.collapseStyle, {
        minHeight: event.nativeEvent.layout.height,
        // maxHeight: collapseState.maxheight,
      }],
      // animatedValue.setValue(event.nativeEvent.layout.height),
    });
    collapseState.animatedValue.setValue(100);

    // const maxHeight = collapseState.animatedValue.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [collapseState.minheight, 2000],
    // });
  };

  // const maxHeight = collapseState.animatedValue.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [collapseState.minheight, 2000],
  // });

  const toggle = () => {
    // const initialValue = collapseState.isExpanded
    //   ? collapseState.maxheight + collapseState.minheight
    //   : collapseState.minheight;
    // const finalValue = collapseState.isExpanded
    //   ? collapseState.minheight
    //   : collapseState.maxheight + collapseState.minheight;

    // console.log('initialValue', initialValue);
    // console.log('finalValue', finalValue);
    // console.log('collapseState.animatedHeight', collapseState);

    // console.log('endstate : ', CollapseRef.current);
    // if (collapseState.isExpanded) {
    //   // CollapseRef.current.props.onAnimationEnd((props) => {
    //   //   console.log('animation ended ', props);
    //   // });
    //   CollapseRef.current.slideOutUp(300)
    //     .then(({ finished }) => {
    //       console.log('finished up', finished);
    //       if (finished) {
    //         // CollapseRef.current.setNativeProps({
    //         //   style: {
    //         //     display: 'none',
    //         //   },
    //         // });
    //       }
    //     });
    // } else {
    //   // CollapseRef.current.fadeIn();
    //   CollapseRef.current.slideInDown(300)
    //     .then(({ finished }) => {
    //       console.log('finished down', finished);
    //       if (finished) {
    //         // CollapseRef.current.setNativeProps({
    //         //   style: {
    //         //     display: 'flex',
    //         //   },
    //         // });
    //       }
    //     });
    // }
    // collapseState.animatedHeight.setValue(initialValue);
    // Animated.spring(collapseState.animatedHeight, {
    //   toValue: finalValue,
    //   useNativeDriver: false,
    // }).start();
    console.log('collapseState.animatedValue bf', collapseState.isExpanded);
    setCollapseState((prevState) => ({
      ...prevState,
      // isExpanded: !prevState.isExpanded,
      isExpanded: !prevState.isExpanded,
    }));
    // Animated.timing(collapseState.animatedValue, {
    //   toValue: collapseState.isExpanded ? 0 : 2000,
    //   duration: 300,
    //   easing: Easing.linear,
    //   useNativeDriver: false,
    // }).start(({ finished }) => {
    //   if (finished) {
    //     // setCollapseState({
    //     //   ...collapseState,
    //     //   isExpanded: !collapseState.isExpanded,
    //     // });
    //   }
    // });
  };

  return <>
    {/* <Animated.View style={[style]}>
      <Pressable
        onLayout={setMinHeight}
        onPress={toggle}
      >
        { CustomHeader || <CollapseHeader title={title} isCollapsed={!collapseState.isExpanded} /> }
      </Pressable>
      <Animated.View
        onLayout={setMaxHeight}
        style={[{ height: collapseState.animatedHeight }]}
      >
        {children}
      </Animated.View>
    </Animated.View> */}
    <Animated.View style={[collapseState.collapseStyle, {
      maxHeight: collapseState.animatedValue,
    }]}>
    <Pressable
        style={{ backgroundColor: 'green', flex: 1 }}
        onPress={toggle}
        hitSlop={{
          top: 10, bottom: 10, left: 10, right: 10,
        }}
      >
        { !CustomHeader && <CollapseHeader title={title} isCollapsed={collapseState.isExpanded} /> }
      </Pressable>
      <Text>new</Text>
      <Collapsible customStyle={style} collapsed={collapseState.isExpanded} >
        { children }
        <Text>sdcsd</Text>
      </Collapsible>
    </Animated.View>
  </>;
};

export default Collapse;
