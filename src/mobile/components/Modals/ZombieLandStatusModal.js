import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Image, StyleSheet, Text, View,
} from 'react-native';
import { ZombieLandContext } from '../../../hooks/pages/zombieLand';
import SuccessHero from '../../../images/games/turtle-success.png';
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
  failureImage: {
    transform: [
      {
        rotate: '90deg',
      },
    ],
  },
});

const ZombieLandStatusModal = ({
  visible,
  handleCloseBtn = () => {},
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
          </View>
        </>
      }
    </StatusModal>
  </>;
};

export default ZombieLandStatusModal;
