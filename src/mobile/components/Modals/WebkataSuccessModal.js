import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import Icon from '../../common/Icons';
import ThemeContext from '../theme';
import SuccessHero from '../../../images/games/turtle-success.png';

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
    ...font.heading5,
    textAlign: 'center',
    color: utilColors.dark,
    marginVertical: 12,
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
    color: utilColors.dark,
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

const WebkataSuccessModal = ({
  visible, closeModal, modalBodyText, handlePlayNext,
}) => {
  const { font, theme } = React.useContext(ThemeContext);
  const style = getStyles(theme.screenMore, font, theme.utilColors);

  const handleCloseBtn = () => {
    closeModal();
  };
  return (
    <>
      <Modal
        visible={visible}
        transparent
        onRequestClose={handleCloseBtn}
      // animationType='slide'
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
              <Image
                source={SuccessHero}
                style={{
                  ...style.heroImage,
                }}
                resizeMode={'contain'}
              />
              <Text style={style.modalTitle}>
                <FormattedMessage
                  defaultMessage={'Awesome!'}
                  description={'modal title'}
                />
              </Text>
              <Text style={style.captionText}>
                <FormattedMessage
                  defaultMessage={'{message}'}
                  description={'modal caption'}
                  values={{
                    message: modalBodyText || 'Congratulations Username, you have cleared this level',
                  }}
                />
              </Text>
              <View style={style.rowCenter}>
                <View style={style.btnContiner}>
                  <TouchableOpacity
                    style={style.primaryBtn}
                    onPress={handlePlayNext}
                  >
                    <View style={style.rowBetween}>
                      <Text style={style.primaryBtnText}>
                        <FormattedMessage
                          defaultMessage={'Play Next'}
                          description={'Play Next Button'}
                        />
                      </Text>
                      <Icon
                        name='arrow-right'
                        type='FontAwesome5'
                        size={18}
                        color={theme.utilColors.white}
                      />
                    </View>
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

export default WebkataSuccessModal;
