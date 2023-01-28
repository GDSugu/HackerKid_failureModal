import React from 'react';
import {
  Dimensions, Modal, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { utilColors } from '../../../colors/_colors';
import Icon from '../../common/Icons';

const getStyles = () => StyleSheet.create({
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
});

const StatusModal = ({
  children,
  visible,
  handleCloseBtn = () => {},
}) => {
  const style = getStyles();

  return <>
    <Modal
      visible={visible}
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
                  name={'close'}
                  type={'FontAwesome'}
                  size={24}
                  color={utilColors.white}
                />
              </View>
            </TouchableOpacity>
          </View>
          { children }
        </View>
      </View>
    </Modal>
  </>;
};

export default StatusModal;
