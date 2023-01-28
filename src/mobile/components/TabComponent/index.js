import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const getStyle = () => StyleSheet.create({
  horizontalContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabItemContainer: {
    width: '100%',
    flexGrow: 1,
    flexShrink: 1,
  },
});

const TabComponent = ({
  tabs = [], tabItems = [], tabStyle = {}, tabItemStyle = {},
}) => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const styles = getStyle();

  return <>
    <View>
      <View style={[styles.horizontalContainer, tabStyle]}>
        {
          tabs.length > 0
          && tabs.map((Item, idx) => <TouchableOpacity
            activeOpacity={0.5}
            key={idx}
            onPress={() => setTabIndex(idx)}
          >
            <Item isActive={idx === tabIndex} />
          </TouchableOpacity>)
        }
      </View>
      <View style={[styles.horizontalContainer, tabItemStyle]}>
        {
          tabItems.length > 0
          && tabItems.map((Item, idx) => <View
            key={idx}
            style={{ display: `${tabIndex === idx ? 'flex' : 'none'}`, ...styles.tabItemContainer }}
          >
            <Item />
          </View>)
        }
      </View>
    </View>
  </>;
};

export default TabComponent;
