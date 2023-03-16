import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { AuthContext } from '../../../hooks/pages/root';
import ThemeContext from '../theme';

const getStyles = (theme, utilColors, font) => StyleSheet.create({
  overlay: {
    backgroundColor: utilColors.transparent,
    flex: 1,
    justifyContent: 'center',
  },
  modalCard: {
    backgroundColor: utilColors.white,
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    margin: Dimensions.get('window').width * 0.05,
  },
  logoutText: {
    ...font.heading6,
    textAlign: 'center',
    marginVertical: 8,
    color: utilColors.dark,
  },
  btnContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    margin: 'auto',
  },
  primaryBtn: {
    borderRadius: 12,
    backgroundColor: theme.btnBg,
    padding: 10,
    width: '45%',
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: theme.btnBg,
  },
  primaryBtnText: {
    color: utilColors.white,
    ...font.subtitle1,
    textAlign: 'center',
  },
  secondaryBtn: {
    borderRadius: 12,
    padding: 10,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.btnBg,
    width: '45%',
    marginHorizontal: 4,
  },
  secondaryBtnText: {
    color: theme.btnBg,
    ...font.subtitle1,
    textAlign: 'center',
  },
});

const LogoutModal = ({ logoutAction = () => { } }) => {
  const { font, theme } = React.useContext(ThemeContext);
  const { utilColors } = theme;
  const style = getStyles(theme.screenMore, utilColors, font);
  const authContext = React.useContext(AuthContext);

  const closeModal = () => authContext.setAuthState((prevState) => ({
    ...prevState,
    appData: {
      logoutModalVisibility: false,
    },
  }));

  return <>
    <Modal
      visible={authContext.authState.appData.logoutModalVisibility || false}
      transparent
      onRequestClose={closeModal}
    //  animationType='fade'
    >
      <View style={style.overlay}>
        <View style={style.modalCard}>
          <Text style={style.logoutText}>
            <FormattedMessage
              defaultMessage='Are you sure you want to logout?'
              description='Logout prompt message'
            />
          </Text>
          <View style={style.btnContainer}>
            <TouchableOpacity onPress={logoutAction} style={style.primaryBtn}>
              <Text style={style.primaryBtnText}>
                <FormattedMessage
                  defaultMessage='Yes'
                  description='logout'
                />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal} style={style.secondaryBtn}>
              <Text style={style.secondaryBtnText}>
                <FormattedMessage
                  defaultMessage='No'
                  description='cancel logout'
                />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  </>;
};

export default LogoutModal;
