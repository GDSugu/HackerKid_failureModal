import React, {
  forwardRef,
  useEffect, useImperativeHandle, useRef, useState,
} from 'react';
import {
  Animated,
  StyleSheet,
  View,
} from 'react-native';
import { debounce1 } from '../../../hooks/common/utlis';
import ThemeContext from '../theme';

const getStyles = (theme, utilColors) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fillScreen: {
    ...StyleSheet.absoluteFill,
  },
  screenLoaderBg: {
    backgroundColor: utilColors.transparent1,
  },
  gridCenter: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderComponent: {
    position: 'relative',
    borderRadius: 12,
    backgroundColor: theme.loaderBg,
    width: 84,
    height: 84,
    padding: 8,
  },
  loaderBlock: {
    position: 'absolute',
    borderRadius: 6,
    width: 30,
    height: 30,
    margin: 8,
  },
  loaderBlock1: {
    // top: 0,
    // left: 0,
    transform: [{
      translateX: 0,
    }, {
      translateY: 0,
    }],
  },
  loaderBlock2: {
    // top: 0,
    // left: 38,
    transform: [{
      translateX: 0,
    }, {
      translateY: 38,
    }],
  },
  loaderBlock3: {
    // top: 38,
    // left: 0,
    transform: [{
      translateX: 38,
    }, {
      translateY: 38,
    }],
  },
});

// const Loader = ({ text, route }) => {
//   const { theme } = React.useContext(ThemeContext);
//   const themeName = route ? theme[`screen${route}`] : '';
//   const style = getStyles(themeName, theme.utilColors);

//   return <>
//     <View style={style.container}>
//       <Text>Loading</Text>
//       <ActivityIndicator size="large">
//         {
//           text && <Text>{text}</Text>
//         }
//       </ActivityIndicator>
//     </View>
//   </>;
// };

const ScreenLoader = ({ route, duration = 250 }, ref) => {
  const { theme } = React.useContext(ThemeContext);
  const themeName = route ? theme[`screen${route}`] : '';
  const style = getStyles(themeName, theme.utilColors);

  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const loaderBlock1Ref = useRef(null);
  const loaderBlock2Ref = useRef(null);
  const loaderBlock3Ref = useRef(null);
  const isAnimationRunning = useRef(false);
  const animationRef = useRef(null);
  const isPageMounted = useRef(true);

  const block1XYValue = new Animated.ValueXY({
    x: 0,
    y: 0,
  });
  const block2XYValue = new Animated.ValueXY({
    x: 0,
    y: 38,
  });
  const block3XYValue = new Animated.ValueXY({
    x: 38,
    y: 38,
  });

  const posMap = {
    0: {
      x: 0,
      y: 0,
    },
    1: {
      x: 38,
      y: 0,
    },
    2: {
      x: 38,
      y: 38,
    },
    3: {
      x: 0,
      y: 38,
    },
  };

  const loaderBlockArry = [
    {
      blockRef: loaderBlock1Ref,
      animatedValue: block1XYValue,
      posIdx: 0,
    },
    {
      blockRef: loaderBlock2Ref,
      animatedValue: block2XYValue,
      posIdx: 3,
    },
    {
      blockRef: loaderBlock3Ref,
      animatedValue: block3XYValue,
      posIdx: 2,
    },
  ];

  const changeBlockPos = () => {
    const animationArry = [];
    loaderBlockArry.forEach((blockEl, idx) => {
      const nextPosIdx = (blockEl.posIdx + 1) % Object.keys(posMap).length;
      const nextPos = posMap[nextPosIdx];
      animationArry.push(
        Animated.timing(
          blockEl.animatedValue,
          {
            toValue: nextPos,
            duration,
            useNativeDriver: true,
          },
        ),
      );
      loaderBlockArry[idx].posIdx = nextPosIdx;
    });
    animationRef.current = Animated.sequence(
      animationArry,
    ).start(({ finished }) => {
      if (finished) {
        if (isAnimationRunning.current) {
          changeBlockPos();
        }
      }
    });
  };

  const attachListeners = () => {
    loaderBlockArry.forEach((el) => {
      el.animatedValue.addListener((props) => {
        const { blockRef } = el;
        if (blockRef.current) {
          blockRef.current.setNativeProps({
            transform: [
              {
                translateX: props.x,
              },
              {
                translateY: props.y,
              },
            ],
          });
        }
      });
    });
  };

  const removeListeners = () => {
    loaderBlockArry.forEach((arEl) => {
      arEl?.animatedValue?.removeAllListeners();
    });
    if (animationRef.current) {
      animationRef.current.stop();
    }
  };

  const showLoader = () => {
    if (isPageMounted.current) {
      isAnimationRunning.current = true;
      removeListeners();
      setIsLoaderVisible(true);
      attachListeners();
      changeBlockPos();
    }
  };

  const closeLoader = () => {
    if (isPageMounted.current) {
      removeListeners();
      setIsLoaderVisible(false);
    }
  };

  const debouncedShowLoader = debounce1(showLoader, 500);
  const debouncedCloseLoader = debounce1(closeLoader, 500);

  useImperativeHandle(ref, () => ({
    show: debouncedShowLoader,
    hide: debouncedCloseLoader,
    // show: showLoader,
    // hide: closeLoader,
  }));

  useEffect(() => () => {
    isPageMounted.current = false;
    isAnimationRunning.current = false;
    removeListeners();
  }, []);

  useEffect(() => {
    isAnimationRunning.current = isLoaderVisible;
  }, [isLoaderVisible]);

  return <>
  {
    isLoaderVisible
    && <>
      <View style={[style.fillScreen, style.screenLoaderBg, style.gridCenter]}>
        <View style={style.loaderComponent}>
          <Animated.View
            ref={loaderBlock1Ref}
            style={[
              style.loaderBlock,
              style.loaderBlock1,
              {
                backgroundColor: themeName.loaderBlock1,
              },
            ]}
          />
          <Animated.View
            ref={loaderBlock2Ref}
            style={[
              style.loaderBlock,
              style.loaderBlock2,
              {
                backgroundColor: themeName.loaderBlock2,
              },
            ]}
          />
          <Animated.View
            ref={loaderBlock3Ref}
            style={[
              style.loaderBlock,
              style.loaderBlock3,
              {
                backgroundColor: themeName.loaderBlock3,
              },
            ]}
          />
        </View>
      </View>
    </>
  }
  </>;
};

// const ScreenLoader = React.forwardRef(ScreenLoaderComponent);

// export default Loader;

// export {
//   ScreenLoader,
// };

export default forwardRef(ScreenLoader);
