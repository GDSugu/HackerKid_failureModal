import analytics from '@react-native-firebase/analytics';
import messaging from '@react-native-firebase/messaging';
import { validateField } from '../../hooks/common/framework';

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
const validate = (type, value, typename, setError, errorKey,
  errorMessage = '', required = 1, skipValueCheck = false) => {
  if (value === '' && !required) return true;

  const validationResponse = validateField(type, value, typename, null, skipValueCheck);

  if (value === '' && required) {
    setError((prevObj) => ({
      ...prevObj,
      [errorKey]: `${typename} is required`,
    }));
    return false;
  } if (!skipValueCheck && !validationResponse.status) {
    const currentErrorMessage = (errorMessage) || `Enter a valid ${typename}`;
    setError((prevObj) => ({
      ...prevObj,
      [errorKey]: currentErrorMessage,
    }));
    return false;
  }
  setError((prevObj) => ({
    ...prevObj,
    [errorKey]: '',
  }));
  return validationResponse.value;
};

export {
  mobAddAnalyticsEvent,
  mobCheckFCMPermission,
  mobGetFCMPermission,
  mobGetFCMToken,
  mobSubscribeToFCMTopic,
  mobTrackCurrentScreen,
  validate,
};
