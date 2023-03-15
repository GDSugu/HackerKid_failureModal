import { Linking, Platform } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import messaging from '@react-native-firebase/messaging';
import { validateField } from '../../hooks/common/framework';
import API from '../../../env';

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
  try {
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
      [errorKey]: false,
    }));
  } catch (e) {
    console.error(e);
  }
  return value;
};

const closeFormError = (formErrorStateObj, callingToCloseErrorType, setFormError) => {
  try {
    const currentFormErrorType = formErrorStateObj.formErrorType;

    if (!formErrorStateObj.formError) return;

    const errorTypesArr = callingToCloseErrorType.split(',');
    if (errorTypesArr.includes(currentFormErrorType)) {
      setFormError({ formError: false, formErrorType: false });
    }
  } catch (e) {
    console.error(e);
  }
};

const openDialer = (phoneNumber) => {
  let url = '';
  if (Platform.OS === 'android') {
    url = `tel:${phoneNumber}`;
  } else if (Platform.OS === 'ios') {
    url = `telprompt:${phoneNumber}`;
  }
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Can't handle url: ${url}`);
      }
    })
    .catch((err) => console.error('An error occurred', err));
};

const openMail = (email) => {
  const url = `mailto:${email}`;
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Can't handle url: ${url}`);
      }
    })
    .catch((err) => console.error('An error occurred', err));
};

const getCodePushKey = () => API.CODEPUSH_KEY;

export default null;

export {
  openDialer,
  openMail,
  mobAddAnalyticsEvent,
  mobCheckFCMPermission,
  mobGetFCMPermission,
  mobGetFCMToken,
  mobSubscribeToFCMTopic,
  mobTrackCurrentScreen,
  validate,
  closeFormError,
  getCodePushKey,
};
