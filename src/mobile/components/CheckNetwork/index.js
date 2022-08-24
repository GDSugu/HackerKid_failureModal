import React from 'react';
import {
  Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { FormattedMessage } from 'react-intl';
import ThemeContext from '../theme';

const getStyles = (theme, utilColors, font) => StyleSheet.create({
  errorComponent: {
    backgroundColor: '#00000050',
    flex: 1,
    justifyContent: 'center',
  },
  errorCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    margin: Dimensions.get('window').width * 0.05,
  },
  errorCardPrimaryBtn: {
    backgroundColor: theme.btnBg,
    marginTop: 16,
    width: '100%',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  errorCardPrimaryBtnText: {
    color: utilColors.white,
    ...font.subtitle1,
  },
  errorCardMessageText: {
    ...font.heading6,
    textAlign: 'center',
  },
});

const CheckNetwork = ({ route }) => {
  const { font, theme } = React.useContext(ThemeContext);
  // const screenTheme = theme[`screen${route.name}`];
  const screenTheme = theme[`screen${typeof route === 'object' ? route.name : route}`];
  const style = getStyles(screenTheme, theme.utilColors, font);

  // const netStatus = getNtwStatus();
  const [modalVisibility, setModalVisibility] = React.useState(true);

  React.useEffect(() => {
    NetInfo.fetch()
      .then((status) => {
        setModalVisibility(!(status.isConnected && status.isInternetReachable));
      });
  }, []);

  return <>
    { <>
      <Modal visible={modalVisibility} transparent animationType='slide'>
        <View style={style.errorComponent}>
          <View style={style.errorCard}>
            <Text style={style.errorCardMessageText}>
              <FormattedMessage
                defaultMessage='You are offline.'
                description='offline message'
              />
            </Text>
            <Text style={style.errorCardMessageText}>
              <FormattedMessage
                defaultMessage='Please connect to the internet.'
                description='offline message'
              />
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisibility(false);
              }} // change to Signup after signup integrated
              style={style.errorCardPrimaryBtn}
            >
              <Text style={style.errorCardPrimaryBtnText}>
                <FormattedMessage
                  defaultMessage='Ok'
                  description='closing modal button'
                />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>}
  </>;
};

export default CheckNetwork;
