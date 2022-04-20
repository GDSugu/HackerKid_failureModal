import React from 'react';
import {
  Animated, Pressable, StyleSheet, Text, View,
} from 'react-native';
import ArrowUpIcon from '../../../images/common/arrow-up.svg';
import ArrowDownIcon from '../../../images/common/arrow-down.svg';
import ThemeContext from '../theme';

const getStyles = (font, utilColors) => StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: utilColors.white,

  },
  headerText: {
    ...font.subtitle1,
  },
});

const CollapseHeader = ({ isCollapsed, title }) => {
  const { font, theme: { utilColors } } = React.useContext(ThemeContext);
  const styles = getStyles(font, utilColors);

  return <>
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
      { isCollapsed && <ArrowDownIcon/> }
      { !isCollapsed && <ArrowUpIcon/> }
    </View>
  </>;
};

const Collapse = ({
  CustomHeader, children, style, title,
}) => {
  const [collapseState, setCollapseState] = React.useState({
    isExpanded: false,
    // minheight: 0,
    // maxheight: 0,
    animatedHeight: new Animated.Value(0),
  });

  const setMaxHeight = (event) => {
    setCollapseState({
      ...collapseState,
      maxheight: event.nativeEvent.layout.height,
    });
  };

  const setMinHeight = (event) => {
    setCollapseState({
      ...collapseState,
      minheight: event.nativeEvent.layout.height,
    });
  };

  const toggle = () => {
    const initialValue = collapseState.isExpanded
      ? collapseState.maxheight + collapseState.minheight
      : collapseState.minheight;
    const finalValue = collapseState.isExpanded
      ? collapseState.minheight
      : collapseState.maxheight + collapseState.minheight;

    console.log('initialValue', initialValue);
    console.log('finalValue', finalValue);
    console.log('collapseState.animatedHeight', collapseState);

    setCollapseState({
      ...collapseState,
      isExpanded: !collapseState.isExpanded,
    });
    collapseState.animatedHeight.setValue(initialValue);
    Animated.spring(collapseState.animatedHeight, {
      toValue: finalValue,
      useNativeDriver: false,
    }).start();
  };

  return <>
    <Animated.View style={[style]}>
      <Pressable
        // onLayout={setMinHeight}
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
    </Animated.View>
  </>;
};

export default Collapse;
