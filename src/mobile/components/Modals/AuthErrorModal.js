import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
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

const AuthErrorModal = ({ route, navigation }) => {
  const { font, theme } = React.useContext(ThemeContext);
  const screenTheme = theme[`screen${route.name}`];
  const style = getStyles(screenTheme, theme.utilColors, font);

  const [modalVisibility, setModalVisibility] = useState(true);
  return <>
    <Modal visible={modalVisibility} transparent animationType='slide' >
      <View style={style.errorComponent}>
        <View style={style.errorCard}>
          <Text style={style.errorCardMessageText}>
            <FormattedMessage
              defaultMessage='You are not authorized to access this page.'
              description='Not authorized message'
            />
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('More');
              setModalVisibility(false);
            }} // change to Signup after signup integrated
            style={style.errorCardPrimaryBtn}
          >
            <Text style={style.errorCardPrimaryBtnText}>
              <FormattedMessage
                defaultMessage='Login'
                description='Login button'
              />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </>;
};

export default AuthErrorModal;
