import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import ThemeContext from '../theme';

const getStyles = (theme, utilColors, font) => StyleSheet.create({
  modalTitle: {
    ...font.heading6,
    color: utilColors.dark,
    textAlign: 'center',
  },
  centeredView: {
    backgroundColor: '#00000050',
    flex: 1,
    justifyContent: 'center',
  },
  modalCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    margin: Dimensions.get('window').width * 0.05,
  },
  btn: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryBtn: {
    backgroundColor: theme.btnBg,
  },
  secondaryBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.btnBg,
    color: utilColors.dark,
  },
  primaryBtnText: {
    color: utilColors.white,
    ...font.subtitle1,
  },
  secondaryBtnText: {
    color: utilColors.dark,
    ...font.subtitle1,
  },
  footerBtnGroup: {
    marginTop: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

const KeepCodeChangesModal = ({
  route, keepChangesHandler, doNotKeepChangesHandler, visible,
}) => {
  const { font, theme } = React.useContext(ThemeContext);
  const screenTheme = theme[`screen${route.name}`];
  const style = getStyles(screenTheme, theme.utilColors, font);

  return <>
    <Modal visible={visible} transparent>
      <View style={style.centeredView}>
        <View style={style.modalCard}>
          <Text style={style.modalTitle}>
            <FormattedMessage
              defaultMessage='Keep the code changes?'
              description='warning message'
            />
          </Text>
          <View style={style.footerBtnGroup}>
            <TouchableOpacity
                onPress={doNotKeepChangesHandler}
                style={[style.btn, style.secondaryBtn]}
              >
                <Text style={style.secondaryBtnText}>
                  <FormattedMessage
                    defaultMessage='No'
                    description='Do not keep changes'
                  />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={keepChangesHandler}
                style={[style.btn, style.primaryBtn]}
              >
                <Text style={style.primaryBtnText}>
                  <FormattedMessage
                    defaultMessage='Yes'
                    description='Keep Changes button text'
                  />
                </Text>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  </>;
};

export default KeepCodeChangesModal;
