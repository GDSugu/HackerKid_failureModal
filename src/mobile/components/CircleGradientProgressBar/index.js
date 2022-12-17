import React, { useRef } from 'react';
import {
  Animated, StyleSheet, View,
} from 'react-native';
import {
  Defs, LinearGradient, Path, Stop, Svg,
} from 'react-native-svg';

const style = StyleSheet.create({
  svgContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  svgContentContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AnimatedPath = Animated.createAnimatedComponent(Path);

const CircleGradientProgressBar = ({
  children, gradientColors, progressValue = 0, startAnim = false, totalValue = 100,
}) => {
  let progressBar = null;
  const progressBarRef = useRef();
  const animatedProgressValue = new Animated.Value(0);

  if (startAnim) {
    Animated.timing(animatedProgressValue, {
      toValue: progressValue,
      duration: 1000,
      delay: 1000,
      useNativeDriver: true,
    }).start();

    animatedProgressValue.addListener(({ value }) => {
      if (progressBarRef?.current) {
        progressBarRef.current.setNativeProps({
          strokeDasharray: [((value / totalValue) * 251.2), 251.2],
        });
      }
    });
  }

  try {
    if (!gradientColors || !gradientColors.length) {
      throw new Error('gradientColors is required');
    } else if (gradientColors.length < 1) {
      throw new Error('gradientColors must have at least 1 color');
    }
    progressBar = <View style={style.svgContainer}>
      <Svg xmlns="http://www.w3.org/2000/svg" id="yourScoreAnimated" width='175%' height='175%' viewBox="0 0 100 100">
        <Defs>
          <LinearGradient id="gradient">
            {
              gradientColors.map((gradient, index) => {
                if (gradient.length !== 2) {
                  throw new Error(`gradientColors[${index}] must an array of length 2 with the first element being the color and the second element being the offset(%)`);
                }
                return <Stop key={index} offset={gradient[1]} stopColor={gradient[0]} />;
              })
            }
          </LinearGradient>
        </Defs>
        <AnimatedPath
          ref={progressBarRef}
          id="yourScoreProgress"
          strokeLinecap="round"
          strokeWidth="6"
          strokeDasharray={'0, 251.2'}
          strokeDashoffset={2}
          stroke={'url(#gradient)'}
          className="progress-bar"
          d="M50 10 a 40 40 0 0 1 0 80 a 40 40 0 0 1 0 -80" />
      </Svg>
      <View style={style.svgContentContainer}>
        { children }
      </View>
    </View>;
  } catch (error) {
    console.error(error);
  }
  return <>{progressBar}</>;
};

export default CircleGradientProgressBar;
