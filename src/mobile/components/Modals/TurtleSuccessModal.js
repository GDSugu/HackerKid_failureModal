import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Dimensions, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from '../../common/Icons';
import ThemeContext from '../theme';
import SuccessHero from '../../../images/games/turtle-success.png';
import { TurtleContext } from '../../../hooks/pages/turtle';
import { ToastAndroid } from 'react-native';

const getStyles = (theme, font, utilColors) => StyleSheet.create({
  overlay: {
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
    marginVertical: 12,
  },
  shareTitle: {
    marginVertical: 16,
    marginBottom: 32,
  },
  heroImage: {
    width: '80%',
    textAlign: 'center',
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

const TurtleSuccessModal = () => {
  const { font, theme } = React.useContext(ThemeContext);
  const turtleContext = React.useContext(TurtleContext);
  const style = getStyles(theme.screenMore, font, theme.utilColors);

  const [modalProps, setModalProps] = React.useState({
    modalType: 'success',
  });

  const handleShareBtn = () => setModalProps((prevState) => ({
    ...prevState,
    modalType: 'share',
  }));

  const handleCloseBtn = () => {
    turtleContext.tqSetState((prevState) => ({
      ...prevState,
      validated: false,
    }));
    setModalProps((prevState) => ({
      ...prevState,
      modalType: 'success',
    }));
  };

  const handleCopyBtn = () => {
    Clipboard.setString(turtleContext.tqState?.responseObject?.shareLink);
    ToastAndroid.show('Link copied to clipboard', ToastAndroid.SHORT);
  };

  return (
    <>
    <Modal
      visible={turtleContext.tqState.validated}
      transparent
      animationType='slide'>
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
          {
            modalProps.modalType === 'success'
            && <>
              <View style={style.modalCardContent}>
                {/* <View> */}
                  <Image
                    source={SuccessHero}
                    style={style.heroImage}
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
                        message: turtleContext.tqState?.responseObject?.successMessage || 'Congratulations Username, you have cleared this level',
                      }}
                    />
                  </Text>
                {/* </View> */}
                <View style={style.rowCenter}>
                  <View style={style.btnContiner}>
                    <TouchableOpacity
                      style={style.secondaryBtn}
                      onPress={handleShareBtn}
                      >
                      <Text style={style.secondaryBtnText}>
                        <FormattedMessage
                          defaultMessage={'Share'}
                          description={'Share Button'}
                        />
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={style.btnContiner}>
                    <TouchableOpacity
                      style={style.primaryBtn}
                      onPress={() => { turtleContext.getNextQuestion(); }}
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
            </>
          }
          {
            modalProps.modalType === 'share'
            && <>
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
                      value={turtleContext.tqState?.responseObject?.shareLink || 'https://www.hackerkid.org/turtle/submissions/'}
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
            </>
          }
        </View>
      </View>
    </Modal>
    </>
  );
};

export default TurtleSuccessModal;
