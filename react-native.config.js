module.exports = {
  dependencies: {
    'react-native-video': {
      platforms: {
        android: {
          sourceDir: '../node_modules/react-native-video/android-exoplayer',
        },
      },
    },
  },
  project: {
    ios: {},
    android: {}, // grouped into "project"
  },
  assets: ['./src/fonts/'], // stays the same
};
