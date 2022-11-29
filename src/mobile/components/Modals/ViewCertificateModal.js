import React, { useContext } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import { FormattedMessage } from 'react-intl';
import ThemeContext from '../theme';
import Icon from '../../common/Icons';
// import CertificateImageComponent from '../CertificateImageComponent';

const getStyles = (theme, utilColors, font) => StyleSheet.create({
  overlay: {
    backgroundColor: utilColors.transparent,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  modalCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
    marginBottom: 16,
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
  btnContainer: {
    marginTop: 10,
  },
  primaryBtn: {
    backgroundColor: theme.btnBg,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginHorizontal: 4,
    marginBottom: 10,
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
    backgroundColor: utilColors.white,
  },
  primaryBtnText: {
    ...font.subtitle1,
    color: utilColors.white,
  },
  secondaryBtnText: {
    ...font.subtitle1,
    color: theme.btnBg,
  },
  certificateImageContainer: {
    width: 320,
    height: 229,
    alignSelf: 'center',
  },
  certificateImage: {
    flex: 1,
    borderRadius: 12,
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

const ViewCertificateModal = ({
  open,
  setOpen,
  viewCertificateImageUri,
  onShareBtnPress,
  onDownloadBtnPress,
}) => {
  // styles
  const { theme, font } = useContext(ThemeContext);
  const screenTheme = theme.screenCertificates;
  const style = getStyles(screenTheme, theme.utilColors, font, theme.gradients);

  // methods
  const handleCloseBtn = () => {
    setOpen(false);
  };

  return <Modal
    visible={open}
    transparent
    onRequestClose={handleCloseBtn}>
    <View style={style.overlay}>
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
      <View style={style.certificateImageContainer}>
        <Image
          style={style.certificateImage}
          source={{ uri: viewCertificateImageUri }} />
      </View>
      <View style={style.btnContainer}>
        <TouchableOpacity style={style.primaryBtn} onPress={onShareBtnPress}>
          <Text style={style.primaryBtnText}>
            <FormattedMessage defaultMessage={'Share'} description='share btn text' />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.secondaryBtn} onPress={onDownloadBtnPress}>
          <Text style={style.secondaryBtnText}>
            <FormattedMessage defaultMessage={'Download'} description='download btn text' />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>;
};

export default ViewCertificateModal;
