import analytics from '@react-native-firebase/analytics';
import messaging from '@react-native-firebase/messaging';

// Firebase Analytics Functions
const mobAddAnalyticsEvent = (action, dataObject = {}) => analytics().logEvent(action, dataObject);

// TODO: add pixel credentials in android and ios
// const MobAddPixelEvent = (action, dataObject = {}) =>
// AppEventsLogger.logEvent(action, dataObject);

const mobTrackCurrentScreen = (screen) => analytics().logScreenView({
  screen_name: screen,
  screen_class: screen,
});
// Firebase Analytics Functions - end

// Firebase Messaging Functions - start
const mobCheckFCMPermission = () => messaging().hasPermission();

const mobGetFCMPermission = () => messaging().registerDeviceForRemoteMessages();

const mobGetFCMToken = () => messaging().getToken();

const mobSubscribeToFCMTopic = (topic) => messaging().subscribeToTopic(topic);
// Firebase Messaging Functions - end

module.exports = {
  mobAddAnalyticsEvent,
  mobCheckFCMPermission,
  mobGetFCMPermission,
  mobGetFCMToken,
  mobSubscribeToFCMTopic,
  mobTrackCurrentScreen,
};
