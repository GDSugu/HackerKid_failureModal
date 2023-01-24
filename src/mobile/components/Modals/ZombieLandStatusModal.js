import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Image, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { utilColors, Yellow } from '../../../colors/_colors';
import { ZombieLandContext } from '../../../hooks/pages/zombieLand';
import SuccessHero from '../../../images/games/turtle-success.png';
import Icon from '../../common/Icons';
import { font } from '../config';
import StatusModal from './StatusModal';

const getStyles = () => StyleSheet.create({
  modalCardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  heroImage: {
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  modalTitle: {
    ...font.heading5,
    textAlign: 'center',
    marginVertical: 12,
  },
  captionText: {
    ...font.subtitleBold,
    textAlign: 'center',
    marginVertical: 4,
    marginHorizontal: 4,
  },
  distanceBtwn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  failureImage: {
    transform: [
      {
        rotate: '90deg',
      },
    ],
  },
  primaryBtn: {
    backgroundColor: Yellow.color700,
    borderRadius: 12,
    padding: 8,
    paddingHorizontal: 16,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: utilColors.white,
    ...font.subtitleBold,
  },
  mr8: {
    marginRight: 12,
  },
});

const ZombieLandStatusModal = ({
  visible,
  handleCloseBtn = () => {},
  handleCTA = () => {},
  type = 'status',
}) => {
  const zlContext = React.useContext(ZombieLandContext);
  const {
    ctxState: zlState,
    // zlSetState,
  } = zlContext;

  const style = getStyles();
  // console.log('zlstate ', zlState);

  // const handleCloseBtn = () => {
  //   zlSetState((prevState) => ({
  //     ...prevState,
  //     responseObject: {
  //       ...prevState.responseObject,
  //       passed: false,
  //     },
  //   }));
  // };

  return <>
    <StatusModal
      visible={Boolean(visible)}
      handleCloseBtn={handleCloseBtn}
    >
      {
        type === 'status'
        && <>
          <View style={style.modalCardContent}>
            {
              zlState?.responseObject?.passed
              && <>
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
                      message: zlState?.responseObject?.successMessage || 'Congratulations, you have cleared this level',
                    }}
                  />
                </Text>
                <TouchableOpacity onPress={() => handleCTA('passed')} style={style.primaryBtn}>
                  <View style={style.distanceBtwn}>
                    <Text style={[style.primaryBtnText, style.mr8]}>
                      <FormattedMessage
                        defaultMessage={'Play next'}
                        description={'Play next'}
                      />
                    </Text>
                    <Icon
                      name='angle-right'
                      type='FontAwesome5'
                      color={utilColors.white}
                      size={20}
                    />
                  </View>
                </TouchableOpacity>
              </>
            }
            {
              !zlState?.responseObject?.passed
              && <>
                <Image
                  source={SuccessHero}
                  style={{
                    ...style.heroImage,
                    ...style.failureImage,
                  }}
                  resizeMode={'contain'}
                />
                <Text style={style.modalTitle}>
                  <FormattedMessage
                    defaultMessage={'Oh ho ho.. failed'}
                    description={'modal title'}
                  />
                </Text>
                <Text style={style.captionText}>
                  <FormattedMessage
                    defaultMessage={'{message}'}
                    description={'modal caption'}
                    values={{
                      message: zlState?.responseObject?.successMessage || 'Oops!! Check your result',
                    }}
                  />
                </Text>
                <TouchableOpacity onPress={() => handleCTA('failed')} style={style.primaryBtn}>
                  <Text style={style.primaryBtnText}>
                    <FormattedMessage
                      defaultMessage={'Close'}
                      description={'close'}
                    />
                  </Text>
                </TouchableOpacity>
              </>
            }
          </View>
        </>
      }
      {
        type === 'message'
        && <>
          <View style={style.modalCardContent}>
            {
              !zlState?.responseObject?.passed
              && <>
                <Image
                  source={SuccessHero}
                  style={{
                    ...style.heroImage,
                    ...style.failureImage,
                  }}
                  resizeMode={'contain'}
                />
                <Text style={style.modalTitle}>
                  <FormattedMessage
                    defaultMessage={'Oh ho ho.. Requirement not satisfied'}
                    description={'modal title'}
                  />
                </Text>
                <Text style={style.captionText}>
                  <FormattedMessage
                    defaultMessage={'{message}'}
                    description={'modal caption'}
                    values={{
                      message: zlState.uiData.zlErrorMsg || 'Oops!! Check your result',
                    }}
                  />
                </Text>
              </>
            }
            <TouchableOpacity onPress={() => handleCTA('failed')} style={style.primaryBtn}>
              <Text style={style.primaryBtnText}>
                <FormattedMessage
                  defaultMessage={'Close'}
                  description={'close'}
                />
              </Text>
            </TouchableOpacity>
          </View>
        </>
      }
    </StatusModal>
  </>;
};

export default ZombieLandStatusModal;
