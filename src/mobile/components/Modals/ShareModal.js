import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Dimensions, Modal, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from '../../common/Icons';
import ThemeContext from '../theme';

const getStyles = (theme, font, utilColors) => StyleSheet.create({
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
  modalCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
  },
  modalCardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  disposableIconBtn: {
    backgroundColor: utilColors.disposableIconBg,
    color: utilColors.white,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  modalTitle: {
    ...font.subtitleBold,
    textAlign: 'center',
    marginVertical: 12,
    color: utilColors.dark,
  },
  shareTitle: {
    marginVertical: 16,
    marginBottom: 32,
  },
  heroImage: {
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  textInput: {
    borderColor: theme.btnBg,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    color: utilColors.dark,
    ...font.subtitle2,
  },
  textInputContainer: {
    width: '60%',
    marginHorizontal: 2,
  },
  copyBtnContainer: {
    width: '40%',
    marginHorizontal: 2,
  },
  primaryBtn: {
    backgroundColor: theme.btnBg,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginHorizontal: 4,
  },
  secondaryBtn: {
    borderColor: theme.btnBg,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginHorizontal: 4,
  },
  btnContiner: {
    width: '50%',
    marginVertical: 8,
    paddingHorizontal: 4,
  },
  captionText: {
    ...font.subtitleBold,
    textAlign: 'center',
    marginVertical: 4,
    marginHorizontal: 4,
  },
  primaryBtnText: {
    ...font.subtitle1,
    color: utilColors.white,
  },
  secondaryBtnText: {
    ...font.subtitle1,
    color: theme.btnBg,
  },
});

const ShareModal = ({ open, setOpen, shareLink }) => {
  const { font, theme } = React.useContext(ThemeContext);
  const style = getStyles(theme.screenMore, font, theme.utilColors);

  const handleCloseBtn = () => {
    setOpen(false);
  };

  const handleCopyBtn = () => {
    Clipboard.setString(shareLink);
    ToastAndroid.show('Link copied to clipboard', ToastAndroid.SHORT);
  };

  return (
    <>
      <Modal
        visible={open}
        transparent
        onRequestClose={handleCloseBtn}
      >
        <View style={style.overlay}>
          <View style={style.modalCard}>
            <View style={style.modalCardHeader}>
              <TouchableOpacity
                style={style.disposableIconBtn}
                onPress={handleCloseBtn}
              >
                <View>
                  <Icon
                    name='close'
                    type='FontAwesome'
                    size={24}
                    color={theme.utilColors.white}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={style.modalCardContent}>
              <Text style={{
                ...style.modalTitle,
                ...style.shareTitle,
              }}>
                <FormattedMessage
                  defaultMessage='Share'
                  description='Modal Title'
                />
              </Text>
              <View style={style.rowCenter}>
                <View style={style.textInputContainer}>
                  <TextInput
                    style={style.textInput}
                    value={shareLink || 'https://www.hackerkid.org/certificate/view/'}
                    editable={false}
                    selection={{
                      start: 0,
                      end: 0,
                    }}
                  />
                </View>
                <View style={style.copyBtnContainer}>
                  <TouchableOpacity
                    style={style.secondaryBtn}
                    onPress={handleCopyBtn}>
                    <Text style={style.secondaryBtnText}>
                      <FormattedMessage
                        defaultMessage='Copy Link'
                        description='Modal Copy'
                      />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ShareModal;
