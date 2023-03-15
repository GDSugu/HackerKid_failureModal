import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  Icon, Overlay,
} from 'react-native-elements';
// import Slider from 'react-native-slider';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';
import * as Animatable from 'react-native-animatable';
import Orientation from 'react-native-orientation';
import { FormattedMessage } from 'react-intl';

const getStyles = () => StyleSheet.create({
  sliderLandscapeActive: {
    flex: 1,
    height: 30,
    marginHorizontal: Platform.select({
      ios: 0,
      android: -10,
    }),
  },
  sliderLandscaptLoader: {
    flex: 1,
    height: 3,
    marginHorizontal: Platform.select({
      ios: 0,
      android: -10,
    }),
  },
  sliderPortraitActive: {
    flex: 1,
    height: 30,
    marginBottom: -13.5,
    marginHorizontal: Platform.select({
      ios: 0,
      android: -10,
    }),
    borderColor: 'red',
  },
  sliderPortraitLoader: {
    flex: 1,
    height: 3,
    marginHorizontal: Platform.select({
      ios: 0,
      android: -10,
    }),
  },
  overlayBg: {
    backgroundColor: '#000000cf',
  },
});

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: this.props.paused,
      playIcon: 'play-arrow',
      controlsHidden: false,
      enabledColor: 'rgba(255,255,255,0)',
      overlay: 'rgba(0,0,0,0.3)',
      sliderPosition: 0,
      thumbColor: '#09e176',
      buffering: true,
      durationText: '00:00',
      progressText: '00:00',
      completed: false,
      fullScreenFlex: 1,
      fullscreenHeight: this.props.height,
      bufferDuration: 0,
      orientation: 'PORTRAIT',
      fullScreenOffset: 0,
      fullscreenIcon: 'fullscreen',
      moreOverlay: false,
      speedOverlay: false,
      playSpeed: 1.0,
      playSpeedText: 'Normal',
      moreOverlayHeight: 60,
      speedOverlayHeight: 390,
      viewStyle: { flex: 1 },
    };
    this.overallDuration = 0;
    this.touchDisabled = false;
    this.toggleControlsTimer = '';
    this.togglePlayTimer = '';
    this.currentTime = 0;
    this.videoRef = React.createRef();
    this.sliderRef = React.createRef();
    this.style = getStyles();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      (JSON.stringify(nextProps) !== JSON.stringify(this.props))
      || (JSON.stringify(nextState) !== JSON.stringify(this.state))
    );
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidMount() {
    Orientation.lockToPortrait();
    Orientation.addOrientationListener(this.orientationChanged);
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this.orientationChanged);
    Orientation.unlockAllOrientations();
  }

  orientationChanged = (orientation) => {
    this.setState({
      orientation,
    });
    if (orientation === 'PORTRAIT') {
      this.props.navigation.setParams({
        hidden: false,
      });
      this.setState({
        fullscreenHeight: 'auto',
        fullScreenFlex: 0.6,
      });
    } else {
      this.props.navigation.setParams({
        hidden: true,
      });
      this.setState({ fullscreenHeight: Dimensions.get('window').height, fullScreenFlex: 1 });
    }
  };

  onLoadStart = () => {
    this.setState({
      completed: false,
      buffering: true,
      paused: this.props.paused,
      playIcon: 'play-arrow',
      controlsHidden: false,
      enabledColor: 'rgba(255,255,255,0)',
      overlay: 'rgba(0,0,0,0.3)',
      sliderPosition: 0,
      thumbColor: '#09e176',
      durationText: '00:00',
      progressText: '00:00',
      bufferDuration: 0,
      playSpeed: 1.0,
      playSpeedText: 'Normal',
    });
    this.showControls();
    this.touchDisabled = false;
    this.overallDuration = 0;
    this.touchDisabled = false;
    this.toggleControlsTimer = '';
    this.togglePlayTimer = '';
    this.currentTime = 0;
  };

  onLoad = (playerObject) => {
    this.overallDuration = playerObject.duration;
    this.setState({
      paused: this.state.paused,
      playIcon: this.state.paused ? 'play-arrow' : 'pause',
      controlsHidden: false,
      enabledColor: 'rgba(255,255,255,1)',
      buffering: false,
      durationText: this.secondsToHMS(this.overallDuration),
    });
    // this.hideControls();
  };

  togglePlay = () => {
    this.setState({
      paused: !this.state.paused,
      playIcon: this.state.paused ? 'pause' : 'play-arrow',
      controlsHidden: false,
    }, () => {
      if (!this.state.paused) {
        this.togglePlayTimer = setTimeout(() => {
          this.setState({
            enabledColor: !this.state.paused ? 'rgba(255,255,255,0)' : 'rgba(255,255,255,1)',
            overlay: !this.state.paused ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.3)',
            thumbColor: !this.state.paused ? 'rgba(0,0,0,0)' : '#09e176',
            controlsHidden: !this.state.paused,
          });
        }, 3000);
      } else {
        clearTimeout(this.togglePlayTimer);
        this.setState({
          enabledColor: 'rgba(255,255,255,1)',
          overlay: 'rgba(0,0,0,0.3)',
          thumbColor: '#09e176',
          controlsHidden: false,
        });
      }
    });
  };

  toggleControls = () => {
    if (this.state.controlsHidden) {
      this.setState({
        enabledColor: 'rgba(255,255,255,1)',
        overlay: 'rgba(0,0,0,0.3)',
        thumbColor: '#09e176',
        controlsHidden: false,
      }, () => {
        this.toggleControlsTimer = setTimeout(() => {
          this.setState({
            enabledColor: !this.state.paused ? 'rgba(255,255,255,0)' : 'rgba(255,255,255,1)',
            overlay: !this.state.paused ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.3)',
            thumbColor: !this.state.paused ? 'rgba(0,0,0,0)' : '#09e176',
            controlsHidden: !this.state.paused,
          });
        }, 3000);
      });
    } else {
      clearTimeout(this.toggleControlsTimer);
      this.setState({
        enabledColor: 'rgba(255,255,255,0)',
        overlay: 'rgba(0,0,0,0)',
        thumbColor: 'rgba(0,0,0,0)',
        controlsHidden: true,
      });
    }
  };

  showControls = () => {
    this.touchDisabled = true;
    clearTimeout(this.toggleControlsTimer);
    this.setState({
      enabledColor: 'rgba(255,255,255,1)',
      overlay: 'rgba(0,0,0,0.3)',
      thumbColor: '#09e176',
      controlsHidden: false,
    });
  };

  hideControls = () => {
    this.setState({
      enabledColor: 'rgba(255,255,255,0)',
      overlay: 'rgba(0,0,0,0)',
      thumbColor: 'rgba(0,0,0,0)',
      controlsHidden: true,
    });
  };

  seekToLocation = (event) => {
    this.touchDisabled = true;
    const sliderPosition = (event.nativeEvent.locationX / (Dimensions.get('window').width - this.state.fullScreenOffset));
    this.setState({
      sliderPosition,
      buffering: true,
      overlay: 'rgba(0,0,0,0.3)',
      completed: false,
    });
    clearTimeout(this.toggleControlsTimer);
    this.videoRef.current.seek(sliderPosition * this.overallDuration);
    // console.log("RequestedSeek", sliderPosition * this.overallDuration);
    if (this.props.onSeekStart) {
      this.props.onSeekStart(this.currentTime);
    }
    this.currentTime = sliderPosition * this.overallDuration;
  };

  dragToLocation = (draggedLocation) => {
    this.touchDisabled = true;
    this.hideControls();
    this.setState({
      sliderPosition: draggedLocation,
      buffering: true,
      overlay: 'rgba(0,0,0,0.3)',
      completed: false,
    });
    this.videoRef.current.seek(draggedLocation * this.overallDuration);
    if (this.props.onSeekStart) {
      this.props.onSeekStart(this.currentTime);
    }
    this.currentTime = draggedLocation * this.overallDuration;
  };

  animateSlider = (progressInfo) => {
    const sliderPosition = (progressInfo.currentTime / progressInfo.seekableDuration);
    const bufferDuration = (progressInfo.playableDuration / progressInfo.seekableDuration);
    if (!this.touchDisabled) {
      this.currentTime = progressInfo.currentTime;
      const progressText = this.secondsToHMS(progressInfo.currentTime);
      this.setState({
        sliderPosition,
        progressText,
        bufferDuration,
      });
      if (this.props.onProgress) {
        this.props.onProgress(progressInfo);
      }
    }
  };

  onSeek = (seekObject) => {
    // console.log(seekObject);
    this.touchDisabled = false;
    this.hideControls();
    this.setState({
      progressText: this.secondsToHMS(seekObject.currentTime),
    });
    if (this.props.onSeekEnd) {
      this.props.onSeekEnd(seekObject);
    }
  };

  onSeekPoly = (event) => {
    console.log('onbuffer ', event);
    if (!event.isBuffering) {
      this.touchDisabled = false;
      if (!this.state.paused) {
        this.hideControls();
      }
      this.setState({
        buffering: false,
        overlay: this.state.paused ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0)',
      });
    } else {
      this.setState({
        buffering: true,
        overlay: 'rgba(0,0,0,0.3)',
      });
    }
  };

  // eslint-disable-next-line class-methods-use-this
  secondsToHMS = (remainingTimeInSeconds) => {
    const remainingTime = parseInt(remainingTimeInSeconds, 10);
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = Math.floor((remainingTime % 3600) % 60);
    const hourSlice = (`0${hours}`).slice(-2);
    return `${((hourSlice === '00') ? '' : (`${hourSlice}:`)) + (`0${minutes}`).slice(-2)}:${(`0${seconds}`).slice(-2)}`;
  };

  replay = () => {
    // this.setState({completed : false, paused : true}, () => {
    // });
    this.touchDisabled = true;
    this.setState({
      sliderPosition: 0,
      overlay: 'rgba(0,0,0,0.3)',
      completed: false,
      paused: false,
    }, () => {
      // clearTimeout(this.toggleControlsTimer);
      this.currentTime = 0;
      this.videoRef.current.seek(0);
    });
  };

  enterFullScreen = () => {
    Orientation.getOrientation((error, orientation) => {
      if (orientation === 'PORTRAIT') {
        const offset = Dimensions.get('window').height * 0.17;
        this.props.navigation.setParams({
          hidden: true,
        });
        this.setState({
          fullscreenHeight: Dimensions.get('window').width, fullScreenFlex: 1, orientation: 'LANDSCAPE', fullScreenOffset: offset, fullscreenIcon: 'fullscreen-exit', moreOverlayHeight: '20%', speedOverlayHeight: '100%', viewStyle: { height: 0 },
        });
        Orientation.lockToLandscape();
      } else {
        this.props.navigation.setParams({
          hidden: false,
        });
        this.setState({
          fullscreenHeight: this.props.height, fullScreenFlex: 0.6, orientation: 'PORTRAIT', fullScreenOffset: 0, fullscreenIcon: 'fullscreen', moreOverlayHeight: 60, speedOverlayHeight: 390, viewStyle: { flex: 1 },
        });
        Orientation.lockToPortrait();
      }
    });
  };

  showReplay = () => {
    this.setState({
      completed: true,
      sliderPosition: 1,
      buffering: false,
    });
    this.showControls();
    if (this.props.onEnd) {
      this.props.onEnd();
    }
  };

  handleBack = () => {
    // console.log("ok");
    Orientation.getOrientation((error, orientation) => {
      if (orientation === 'PORTRAIT') {
        this.props.navigation.goBack();
      } else {
        this.enterFullScreen();
      }
    });
  };

  quickSeek = (type) => {
    try {
      let newTime = type === 'forward' ? (this.currentTime + 10) : (this.currentTime - 10);
      newTime = (newTime < 0) ? 0 : newTime;
      newTime = (newTime > this.overallDuration) ? this.overallDuration : newTime;
      if (newTime !== this.overallDuration) {
        this.touchDisabled = true;
        this.setState({
          sliderPosition: (newTime / this.overallDuration),
          overlay: 'rgba(0,0,0,0.3)',
          completed: false,
        });
        this.videoRef.current.seek(newTime);
        this.currentTime = newTime;
        if (this.props.onSeekStart) {
          this.props.onSeekStart(this.currentTime);
        }
      } else {
        this.videoRef.current.seek(this.overallDuration);
        this.showReplay();
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const decideIcon = this.state.completed ? (<Icon
      name="replay"
      iconStyle={{ color: this.state.enabledColor, padding: 5 }}
      size={55}
      underlayColor="rgba(0,0,0,0)"
      onPress={() => this.replay()}
      disabled = {this.state.controlsHidden}
      disabledStyle = {{ backgroundColor: 'rgba(0,0,0,0)' }}
    />) : <Icon
      name={this.state.playIcon}
      iconStyle={{ color: this.state.enabledColor, padding: 5 }}
      size={55}
      underlayColor="rgba(0,0,0,0)"
      onPress={() => this.togglePlay()}
      disabled = {this.state.controlsHidden}
      disabledStyle = {{ backgroundColor: 'rgba(0,0,0,0)' }}
    />;
    let playMarkup = <Animatable.View
      transition="backgroundColor"
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: this.state.overlay,
      }}>
        <Icon
          name="replay-10"
          iconStyle={{ color: this.state.enabledColor }}
          size={40}
          underlayColor="rgba(0,0,0,0)"
          onPress={() => this.quickSeek('backward')}
          disabled = {this.state.controlsHidden}
          disabledStyle = {{ backgroundColor: 'rgba(0,0,0,0)' }}
        />
        {decideIcon}
        <Icon
          name="forward-10"
          iconStyle={{ color: this.state.enabledColor }}
          size={40}
          underlayColor="rgba(0,0,0,0)"
          onPress={() => this.quickSeek('forward')}
          disabled = {this.state.controlsHidden}
          disabledStyle = {{ backgroundColor: 'rgba(0,0,0,0)' }}
        />
      </Animatable.View>;
    let sliderMarkup = <View
      style = {{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '100%',
      }}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
        <View style={{ justifyContent: 'flex-start' }}>
          <Text style={{
            color: this.state.enabledColor, paddingBottom: 18, paddingLeft: 5, fontSize: 12,
          }}>
            {this.state.progressText}
          </Text>
        </View>
        <View ref={this.sliderRef} style={{ flex: 1, paddingBottom: 10, paddingHorizontal: 10 }}>
      <View style={{ width: '100%', marginBottom: -16.3 }}>
        <Slider
          value = {this.state.bufferDuration}
          style={this.style.sliderLandscaptLoader}
          thumbStyle = {{ height: 0, width: 0 }}
          minimumTrackTintColor = {(this.state.thumbColor !== '#09e176') ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.7)'}
          maximumTrackTintColor = "rgba(0,0,0,0)"
          thumbTintColor={'rgba(0,0,0,0)'}
        />
        </View>
      <TouchableWithoutFeedback style={{ width: '100%' }} onPressIn={this.seekToLocation} disabled={this.touchDisabled}>
        <Slider
          value = {this.state.sliderPosition}
          style={this.style.sliderLandscapeActive}
          thumbStyle = {{ height: 15, width: 15 }}
          thumbTintColor={this.state.thumbColor}
          minimumTrackTintColor = {this.state.thumbColor}
          maximumTrackTintColor = {(this.state.thumbColor !== '#09e176') ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.2)'}
          onSlidingStart = {this.showControls}
          onSlidingComplete = {this.dragToLocation}
          thumbTouchSize = {{ width: 15, height: 15 }}
          tapToSeek={true}
        />
        </TouchableWithoutFeedback>
      </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Text style={{
            color: this.state.enabledColor, paddingBottom: 18, fontSize: 12, alignSelf: 'flex-end',
          }}>
            {this.state.durationText}
          </Text>
          <Icon
          name={this.state.fullscreenIcon}
          iconStyle={{ color: this.state.enabledColor, padding: 10 }}
          size={30}
          underlayColor="rgba(0,0,0,0)"
          onPress={() => this.enterFullScreen()}
          disabled = {this.state.controlsHidden}
          disabledStyle = {{ backgroundColor: 'rgba(0,0,0,0)' }}
          />
        </View>
      </View>
    </View>;
    if (this.state.orientation === 'PORTRAIT') {
      sliderMarkup = <View style={{ flex: 1 }}>
        <View style = {{
          position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%',
        }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <Text style={{
                color: this.state.enabledColor, paddingBottom: 18, paddingLeft: 5, fontSize: 12,
              }}>
                {this.state.progressText}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Text style={{
                color: this.state.enabledColor, paddingBottom: 18, fontSize: 12, alignSelf: 'flex-end',
              }}>
                {this.state.durationText}
              </Text>
              <Icon
              name="fullscreen"
              iconStyle={{ color: this.state.enabledColor, padding: 10 }}
              size={30}
              underlayColor="rgba(0,0,0,0)"
              onPress={() => this.enterFullScreen()}
              disabled = {this.state.controlsHidden}
              disabledStyle = {{ backgroundColor: 'rgba(0,0,0,0)' }}
              />
            </View>
          </View>
        </View>
        <View style = {{
          position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%',
        }}>
          <View ref={this.sliderRef} style={{
            flex: 1, flexDirection: 'row', alignItems: 'flex-end', width: '100%',
          }}>
            <View style={{ width: '100%', position: 'absolute' }}>
              <Slider
                value = {this.state.bufferDuration}
                style={this.style.sliderPortraitLoader}
                thumbStyle = {{ height: 0, width: 0 }}
                minimumTrackTintColor = "rgba(255,255,255,0.7)"
                maximumTrackTintColor = "rgba(0,0,0,0)"
                thumbTintColor={'rgba(0,0,0,0)'}
              />
            </View>
            <TouchableWithoutFeedback style={{ width: '100%', backgroundColor: 'blue' }} onPressIn={this.seekToLocation} disabled={this.touchDisabled}>
              <Slider
                value = {this.state.sliderPosition}
                style={this.style.sliderPortraitActive}
                thumbStyle = {{ height: 15, width: 15 }}
                thumbTintColor={this.state.thumbColor}
                minimumTrackTintColor = "#09e176"
                maximumTrackTintColor = "rgba(255,255,255,0.2)"
                onSlidingStart = {this.showControls}
                onSlidingComplete = {this.dragToLocation}
                thumbTouchSize = {{ width: 15, height: 15 }}
                onValueChange={this.onSliderValueChange}
                // tapToSeek={true}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>;
    }
    if (this.state.buffering) {
      playMarkup = <Animatable.View
        transition = "backgroundColor"
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: this.state.overlay,
        }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={55} color="rgba(255,255,255,1)" />
          </View>
        </Animatable.View>;
    }
    return (
      <View style={{ backgroundColor: '#f6f6f9', height: this.state.fullscreenHeight, zIndex: 1 }}>
        <Overlay
          animationType="slide"
          isVisible={this.state.moreOverlay}
          height={this.state.moreOverlayHeight}
          overlayStyle={{ position: 'absolute', bottom: 0, width: '100%' }}
          backdropStyle={this.style.overlayBg}
          onBackdropPress={() => this.setState({ moreOverlay: false, speedOverlay: false })}>
            <TouchableOpacity style={{
              flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',
            }} onPress = {() => this.setState({ moreOverlay: false, speedOverlay: true })}>
              <Icon
                name = "play-speed"
                type = "material-community"
                iconStyle = {{ marginLeft: 5, marginRight: 30, color: '#4c5a74' }}
                size = {25}
              />
              <Text style={{ fontSize: 16, color: '#4c5a74' }}>
                <FormattedMessage
                  defaultMessage={'Playback speed'}
                  description={'playback speed text'}
                />
              </Text>
              <Text style={{
                fontSize: 16, marginHorizontal: 20, marginBottom: 5, fontWeight: 'bold', color: '#4c5a74',
              }}>.</Text>
              <Text style={{ fontSize: 16, color: '#4c5a74' }}>{this.state.playSpeedText}</Text>
            </TouchableOpacity>
        </Overlay>
        <Overlay
        animationType="slide"
        isVisible={this.state.speedOverlay}
        height={this.state.speedOverlayHeight}
        overlayStyle={{ position: 'absolute', bottom: 0, width: '100%' }}
        backdropStyle={this.style.overlayBg}
        onBackdropPress={() => this.setState({ moreOverlay: false, speedOverlay: false })}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
            <FlatList
              data = {[{ speed: 0.25, text: '0.25x' }, { speed: 0.5, text: '0.5x' }, { speed: 0.75, text: '0.75x' }, { speed: 1.0, text: 'Normal' }, { speed: 1.25, text: '1.25x' }, { speed: 1.5, text: '1.5x' }, { speed: 1.75, text: '1.75x' }, { speed: 2, text: '2x' }]}
              renderItem = {({ item }) => <TouchableOpacity style={{
                flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginVertical: 11.5,
              }} onPress = {() => this.setState({
                moreOverlay: false,
                speedOverlay: false,
                playSpeed: item.speed,
                playSpeedText: item.text,
              })}>
                {(this.state.playSpeed === item.speed) ? (<Icon
                  name = "done"
                  iconStyle = {{ marginLeft: 5, marginRight: 30, color: '#4c5a74' }}
                  size = {25}
                />) : <Text style={{ marginLeft: 60 }}></Text>}
                <Text style={{ fontSize: 16, color: '#4c5a74' }}>{item.text}</Text>
              </TouchableOpacity>}
              keyExtractor={(item) => item.text}
            />
          </View>
        </Overlay>
        <View style={{
          flex: 1, position: 'relative', width: '100%', height: this.state.fullscreenHeight, backgroundColor: '#000',
        }}
        >
          <Video ref={this.videoRef}
            source={this.props.source} paused={this.state.paused} resizeMode="contain" style={{
              flex: 0.5, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%',
            }}
            onLoadStart = {this.onLoadStart}
            onLoad={this.onLoad}
            onProgress = {this.animateSlider}
            onSeek = {this.onSeek}
            onEnd = {this.showReplay}
            rate = {this.state.playSpeed}
            onBuffer = {this.onSeekPoly}
            onError={this.onVideoError}
          />
          <TouchableOpacity
            activeOpacity = {1}
            style={{
              position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%',
            }}
            onPress = {() => this.toggleControls()}
          >
              {playMarkup}
          </TouchableOpacity>
          <View style = {{
            position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%',
          }}>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Icon
                name = "more-vert"
                size = {25}
                iconStyle={{ color: this.state.enabledColor, paddingTop: 10, paddingRight: 5 }}
                onPress = {() => this.setState({ moreOverlay: true })}
                underlayColor="rgba(0,0,0,0)"
                disabled = {this.state.controlsHidden}
                disabledStyle = {{ backgroundColor: 'rgba(0,0,0,0)' }}
              />
            </View>
          </View>
          <View style = {{
            position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%',
          }}>
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Icon
                name = "arrow-back"
                size = {25}
                iconStyle={{ color: this.state.enabledColor, paddingTop: 10, paddingLeft: 5 }}
                onPress = {() => this.handleBack()}
                underlayColor="rgba(0,0,0,0)"
                disabled = {this.state.controlsHidden}
                disabledStyle = {{ backgroundColor: 'rgba(0,0,0,0)' }}
              />
            </View>
          </View>
          <View style = {{
            position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%',
          }}>
            <View style={{ flex: 1, alignItems: 'flex-start', width: '95%' }}>
              <Text style={{
                fontSize: 18, fontFamily: 'MuliBold', color: this.state.enabledColor, marginLeft: 35, paddingTop: 10,
              }}>{this.props.videoTitle}</Text>
            </View>
          </View>
        {sliderMarkup}
        </View>
      </View>
    );
  }
}

export default VideoPlayer;
