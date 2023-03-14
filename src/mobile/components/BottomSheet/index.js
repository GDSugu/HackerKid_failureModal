import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  PanResponder,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const SUPPORTED_ORIENTATIONS = [
  'portrait',
  'portrait-upside-down',
  'landscape',
  'landscape-left',
  'landscape-right',
];

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  mask: {
    flex: 1,
    backgroundColor: 'transparent',
    overflow: 'scroll',
  },
  container: {
    backgroundColor: '#fff',
    width: '100%',
    maxHeight: '100%',
    overflow: 'hidden',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  draggableContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  draggableIcon: {
    width: 48,
    height: 8,
    borderRadius: 5,
    margin: 10,
    backgroundColor: '#ccc',
  },
});

class BottomSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalShown: false,
      pan: new Animated.ValueXY(),
      modalBg: '#00000000',
      overlayHeight: 0,
    };

    this.createPanResponder(props);
  }

  setModalVisible(visible, props) {
    const {
      onClose, onOpen,
    } = this.props;
    const { pan } = this.state;
    if (visible) {
      this.setState({ modalVisible: visible });
      if (typeof onOpen === 'function') onOpen(props);
      this.setState({ overlayHeight: SCREEN_HEIGHT });
      this.setState({ modalBg: '#00000050' });
    } else {
      this.setState({ modalBg: '#00000000' });
      pan.setValue({ x: 0, y: 0 });
      this.setState({
        modalVisible: visible,
        modalShown: false,
      });
      this.setState({ overlayHeight: 0 });

      if (typeof onClose === 'function') onClose(props);
    }
  }

  createPanResponder(props) {
    const { height, panEnabled } = props;
    const { pan } = this.state;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => panEnabled,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0) {
          Animated.event([null, { dy: pan.y }], { useNativeDriver: false })(e, gestureState);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if ((height / 4) - gestureState.dy < 0) {
          this.setModalVisible(false);
        } else {
          Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
        }
      },
    });
  }

  open(props) {
    this.setModalVisible(true, props);
  }

  close(props) {
    this.setModalVisible(false, props);
  }

  render() {
    const {
      animationType,
      contentPanEnabled,
      closeOnPressMask,
      closeOnPressBack,
      children,
      customStyles,
      keyboardAvoidingViewEnabled,
    } = this.props;
    const { pan, modalVisible } = this.state;
    const panStyle = {
      transform: pan.getTranslateTransform(),
    };

    return (
      <View
        style={{
          ...StyleSheet.absoluteFill,
          backgroundColor: this.state.modalBg,
          height: this.state.overlayHeight,
        }}
      >
        <Modal
          transparent
          animationType={animationType}
          visible={modalVisible}
          supportedOrientations={SUPPORTED_ORIENTATIONS}
          onRequestClose={() => {
            if (closeOnPressBack) this.setModalVisible(false);
          }}
          onShow={() => { this.setState({ modalShown: true }); } }
        >
          <KeyboardAvoidingView
            enabled={keyboardAvoidingViewEnabled}
            behavior="padding"
            style={[styles.wrapper, customStyles.wrapper]}
          >
            <TouchableOpacity
              style={styles.mask}
              activeOpacity={1}
              onPress={() => (closeOnPressMask ? this.close() : null)}
            />
              <Animated.View
                {...(contentPanEnabled && this.panResponder.panHandlers)}
                style={[panStyle, styles.container, customStyles.container]}
              >
                <Animated.View
                  {...(!contentPanEnabled && this.panResponder.panHandlers)}
                  style={styles.draggableContainer}
                >
                  <Animated.View style={[styles.draggableIcon, customStyles.draggableIcon]} />
                </Animated.View>
                  <View>
                    {children}
                  </View>
              </Animated.View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    );
  }
}

BottomSheet.defaultProps = {
  animationType: 'slide',
  height: SCREEN_HEIGHT,
  panEnabled: true,
  contentPanEnabled: false,
  dragFromTopOnly: false,
  closeOnPressMask: true,
  closeOnPressBack: true,
  keyboardAvoidingViewEnabled: Platform.OS === 'ios',
  customStyles: {},
  onClose: null,
  onOpen: null,
  children: <View />,
};

export default BottomSheet;
