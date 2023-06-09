import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { CommonActions } from '@react-navigation/native';
import API from '../../../env';
import ThemeContext from '../components/theme';
import Icon from '../common/Icons';
import ForgotPasswordFirstSvg from '../../images/forgot-password/forgot-password-form-svg.svg';
import ForgotPasswordThirdSvg from '../../images/forgot-password/forgot-password-step-3-svg.svg';
import ForgotPasswordFourthSvg from '../../images/forgot-password/forgot-password-step-4-svg.svg';
import useOtp from '../../hooks/pages/otp';
import VerifyOtpFormStep from '../components/VerifyOtpFormStep';
import { closeFormError, validate } from '../common/framework';
import getCommonStyles from '../components/commonStyles';
import useForgotPassword from '../../hooks/pages/forgot-password';
import useBackBtn from '../../hooks/pages/back-btn';
import Recaptchav2Modal from '../components/Recaptchav2Modal';
import Recaptchav3 from '../components/Recaptchav3';
import { useTimeTrack } from '../../hooks/pages/timeTrack';
import Loader from '../components/Loader';

const getStyles = (theme, utilColors, font) => StyleSheet.create({
  ...getCommonStyles(theme, utilColors, font),
  secondaryActionButtons: {
    display: 'flex',
    flexDirection: 'row',
  },
  passwordChangedText: {
    ...font.heading6,
    textAlign: 'center',
    marginVertical: 30,
    color: utilColors.dark,
  },
});

const TakeActionButtons = ({ children, style, navigation }) => (
  <View style={ style.takeActionButtons}>
    {
      (children) || false
    }
    <View>
      <TouchableOpacity
        style={style.btnOutlinePrimary}
        title="Login into existing account"
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: 'Login' },
              ],
            }),
          );
        }}>
          <Text style={style.btnOutlinePrimaryText}>
            <FormattedMessage defaultMessage='Login into existing account' description='Login into existing account button' />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={style.btnOutlinePrimary}
        title="Create a New Account"
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: 'Register' },
              ],
            }),
          );
        }}>
          <Text style={style.btnOutlinePrimaryText}>
            <FormattedMessage defaultMessage='Create a New Account' description='create a new account button' />
          </Text>
        </TouchableOpacity>
    </View>
  </View>
);

const ForgotPasswordStepOne = ({
  style, getStyleArr, font, stateObj, setStateObj, setBackBtnStateObj, handleStateChange,
  errorStateObj, setError, formErrorStateObj, setFormErrorObj, navigation,
  recaptchav2Ref, recaptchav3Ref, showLoader = () => {}, hideLoader = () => {},
}) => {
  // hooks
  const phoneInput = useRef(null);
  const { sendOtpRequest } = useOtp();

  useEffect(() => {
    setBackBtnStateObj((prevObj) => ({
      ...prevObj,
      showBackBtn: false,
    }));
  }, []);

  // handlers
  const sendOtpRequestWithToken = (token, recaptchaVersion) => {
    const countryCode = `+${phoneInput.current.getCallingCode()}`;
    const countryAbbrevation = phoneInput.current.getCountryCode();
    showLoader();
    sendOtpRequest(stateObj.phoneNumber, countryCode, 'send-otp-for-pwd-change',
      token, recaptchaVersion).then((response) => {
      hideLoader();
      const data = JSON.parse(response);
      const { status, message } = data;

      if (status === 'success') {
        setStateObj((prevObj) => ({
          ...prevObj,
          formStep: prevObj.formStep + 1,
          countryCode,
          countryAbbrevation,
        }));
      } else if (status === 'error' && message === 'ACCOUNT_NOT_EXIST') {
        switch (message) {
          case 'ACCOUNT_NOT_EXIST': {
            const err = new Error("Account doesn't exists!, try signing up");
            err.errorType = message;
            err.cause = 'postData';
            err.errorFieldHighlightKey = 'phoneNumber';

            throw err;
          }
          case 'UNAUTHORIZED_ACCESS': {
            recaptchav2Ref.current.showModal();
            recaptchav2Ref.current.setOnTokenFn(() => sendOtpRequestWithToken);

            break;
          }
          default: {
            const err = new Error('Something went wrong! Try again');
            err.errorType = 'ERROR';
            err.cause = 'postData';

            throw err;
          }
        }
      }
    }).catch((err) => {
      if (err.cause === 'postData') {
        if (err.errorFieldHighlightKey) {
          setError((prevObj) => ({ ...prevObj, [err.errorFieldHighlightKey]: true }));
        }
        setFormErrorObj((prevObj) => ({
          ...prevObj,
          formError: err.message,
          formErrorType: err.errorType,
        }));
      } else {
        console.error(err);
        setFormErrorObj((prevObj) => ({
          ...prevObj,
          formError: 'Something went wrong! Try again',
          formErrorType: 'ERROR',
        }));
      }
    });
  };

  const sendOtpClickHandler = () => {
    const phoneNumber = validate('tel', stateObj.phoneNumber, 'Phone Number', setError, 'phoneNumber');

    if (phoneNumber) {
      recaptchav3Ref.current.generateNewToken();
      recaptchav3Ref.current.setOnTokenFn(() => sendOtpRequestWithToken);
    }
  };

  return (
    <View style={style.stepContainer}>
    <KeyboardAvoidingView>
    <View style={style.labelAndInputContainer}>
      <View style={style.labelAndFormHelperContainer}>
        <Text style={style.label}>
          <FormattedMessage
              defaultMessage='Phone'
              description='Phone label'
          />
        </Text>
          <Text style={style.errorText}>
              <FormattedMessage
                defaultMessage='{errorMessage}'
                description='error text'
                values={{ errorMessage: errorStateObj.phoneNumber }}
              />
        </Text>
      </View>
      <PhoneInput
        ref={phoneInput}
        defaultCode={(stateObj.countryAbbrevation) || 'IN'}
        containerStyle={getStyleArr('phoneNumber', { padding: 1.8, backgroundColor: 'transparent', width: '100%' })}
        textContainerStyle={{ height: 41, backgroundColor: 'transparent' }}
        placeholder=" "
        textInputStyle={[font.bodyBold, { height: 41 }]}
        layout='second' codeTextStyle={{ ...font.bodyBold }}
        flagButtonStyle={{ width: 60 }}
        textInputProps={{
          multiline: false, disableFullscreenUI: true, keyboardType: 'number-pad', value: stateObj.phoneNumber,
        }}
        onChangeText={(value) => {
          handleStateChange('phoneNumber', value);
          validate('tel', value, 'Phone Number', setError, 'phoneNumber');
          closeFormError(formErrorStateObj, 'ACCOUNT_NOT_EXIST,ERROR', setFormErrorObj);
        }}
      />
    </View>
    <View>
        {formErrorStateObj.formError
        && <Text style={[style.errorText, style.formError]}>
        {formErrorStateObj.formError}
        </Text>}
        <TakeActionButtons style={style} navigation={ navigation }>
        <TouchableOpacity
            style={style.btnPrimary}
            title="Send OTP"
            onPress={sendOtpClickHandler}>
          <Text style={[style.btnPrimaryText, style.nextBtnText]}>
            <FormattedMessage defaultMessage='Send OTP' description='Send OTP button' />
          </Text>
        </TouchableOpacity>
      </TakeActionButtons>
    </View>
    </KeyboardAvoidingView>
</View>
  );
};

const ForgotPasswordStepThree = ({
  style, getStyleArr, font, theme, stateObj, setStateObj,
  handleStateChange, formErrorStateObj, setFormErrorObj, errorStateObj,
  setError, setBackBtnStateObj, changePasswordRequest, navigation,
}) => {
  // hooks
  const [hidePasswordObj, setHidePasswordObj] = useState({
    password: true,
    retypedPassword: true,
  });

  useEffect(() => {
    setBackBtnStateObj((prevBackObj) => ({
      ...prevBackObj,
      showBackBtn: true,
      backFn: () => {
        setStateObj((prevObj) => ({
          ...prevObj,
          formStep: 1,
        }));
      },
    }));

    const removeListener = navigation.addListener('beforeRemove', (e) => {
      if (e.data.action.type === 'GO_BACK') {
        e.preventDefault();
        setStateObj((prevObj) => ({
          ...prevObj,
          formStep: 1,
        }));
      }
    });

    return removeListener;
  }, []);

  // handlers
  const matchValueTo = (value, matchToValue, errorKey, setErrorObj) => {
    if (value === '') return;

    if (value !== matchToValue) {
      setErrorObj((prevObj) => ({ ...prevObj, [errorKey]: 'Passwords do not match' }));
    }
  };

  const changePasswordBtnPressHandler = (e) => {
    e.preventDefault();

    const enteredPassword = validate('password', stateObj.password, 'Password', setError, 'password');
    const retypedPassword = validate('password', stateObj.retypedPassword, 'Retype Password', setError, 'retypedPassword');

    if ((enteredPassword && retypedPassword) && (enteredPassword !== retypedPassword)) {
      setError((prevObj) => ({ ...prevObj, retypedPassword: 'Passwords do not match' }));
    }

    if ((enteredPassword && retypedPassword) && (enteredPassword === retypedPassword)) {
      changePasswordRequest().then((response) => {
        const data = JSON.parse(response);

        if (data.status === 'success' && data.message === 'CHANGED') {
          setStateObj((prevObj) => ({ ...prevObj, formStep: prevObj.formStep + 1 }));
        } else if (data.status === 'error') {
          setFormErrorObj({ formError: 'Something went wrong!Try again later', formErrorType: 'ERROR' });
        }
      }).catch((error) => {
        setFormErrorObj({ formError: 'Something went wrong!Try again later', formErrorType: 'ERROR' });
        console.log(error);
      });
    }
  };

  return (
    <View style={style.stepContainer}>
    <KeyboardAvoidingView>
      <View style={style.labelAndInputContainer}>
        <View style={style.labelAndFormHelperContainer}>
          <Text style={style.label}>
            <FormattedMessage
              defaultMessage='New Password'
              description='New Password Label'
            />
          </Text>
          <Text style={style.errorText}>
            {errorStateObj.password}
          </Text>
        </View>
        <View>
          <TextInput
              style={getStyleArr('password')}
              multiline={false}
              disableFullscreenUI={true}
              secureTextEntry={hidePasswordObj.password}
              onChangeText={(value) => {
                handleStateChange('password', value);
                validate('password', value, 'Password', setError, 'password', 'Use a stronger password');
                closeFormError(formErrorStateObj, 'ERROR');
              }}
            />
          <TouchableOpacity
            style={{
              position: 'absolute', right: 0, top: 10, marginRight: 10,
            }}
              onPress={() => setHidePasswordObj((prevObj) => (
                { ...prevObj, password: !prevObj.password }
              ))}>
              <Icon
                  name={(hidePasswordObj.password) ? 'eye' : 'eye-slash'}
                  type='FontAwesome'
                  size={font.heading5.fontSize}
                  color={theme.utilColors.lightGrey}
              />
            </TouchableOpacity>
        </View>
      </View>
      <View style={style.labelAndInputContainer}>
        <View style={style.labelAndFormHelperContainer}>
          <Text style={style.label}>
            <FormattedMessage
              defaultMessage='Re-type Password'
              description='Re-type Password label'
            />
          </Text>
          <Text style={style.errorText}>
            {errorStateObj.retypedPassword}
          </Text>
        </View>
        <View>
          <TextInput
            disableFullscreenUI={true}
            secureTextEntry={hidePasswordObj.retypedPassword}
            style={getStyleArr('retypedPassword')}
            multiline={false}
            onChangeText={(value) => {
              handleStateChange('retypedPassword', value);
              validate('password', value, 'Retype Password', setError, 'retypedPassword', 'Use a stronger password');
              closeFormError(formErrorStateObj, 'ERROR');
              matchValueTo(value, stateObj.password, 'retypedPassword', setError);
            }}
            />
          <TouchableOpacity style={{
            position: 'absolute', right: 0, top: 10, marginRight: 10,
          }} onPress={() => setHidePasswordObj((prevObj) => (
            { ...prevObj, retypedPassword: !prevObj.retypedPassword }
          ))}>
            <Icon
                name={(hidePasswordObj.retypedPassword) ? 'eye' : 'eye-slash'}
                type='FontAwesome'
                size={font.heading5.fontSize}
                color={theme.utilColors.lightGrey}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={[style.btnPrimary, { marginVertical: 10 }]}
          onPress={changePasswordBtnPressHandler}
          title="Change Password">
          <Text style={style.btnPrimaryText}>
            <FormattedMessage defaultMessage='Change Password' description='Change password button text' />
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  </View>);
};

const ForgotPasswordStepFour = ({ navigation, style, setBackBtnStateObj }) => {
  // hooks
  useEffect(() => {
    setBackBtnStateObj((prevObj) => ({
      ...prevObj,
      showBackBtn: false,
    }));
  }, []);

  return (
  <View style={style.stepContainer}>
    <Text style={style.passwordChangedText}>
      Password changed successfully
    </Text>
    <TouchableOpacity style={style.btnPrimary} onPress={() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Login' },
          ],
        }),
      );
    }}>
      <Text style={style.btnPrimaryText}>
        <FormattedMessage defaultMessage={'Go to Login'} description={'Go to login button'} />
      </Text>
    </TouchableOpacity>
    </View>
  );
};

const ForgotPassword = ({ navigation }) => {
  // hooks
  const { static: { startTimeTrack, stopTimeTrack } } = useTimeTrack({ navigation });
  const { stateObj, setStateObj, changePasswordRequest } = useForgotPassword();

  const { stateObj: backBtnStateObj, setStateObj: setBackBtnStateObj } = useBackBtn();
  const [errorStateObj, setError] = useState({
    phoneNumber: false,
    password: false,
    retypedPassword: false,
  });

  const [formErrorStateObj, setFormErrorObj] = useState({
    formError: false,
    formErrorType: false,
  });

  // styles
  const { font, theme } = React.useContext(ThemeContext);
  const screenTheme = theme.screenForgotPassword;
  const style = getStyles(screenTheme, theme.utilColors, font);
  const backBtnStyle = backBtnStateObj.showBackBtn ? style.show : style.hide;
  const getStyleArr = (key, additionalStyles = false) => {
    const styleArr = [style.inputField];

    if (errorStateObj[key]) {
      styleArr.push(style.errorField);
    }
    if (additionalStyles) {
      styleArr.push(additionalStyles);
    }
    return styleArr;
  };

  const loaderRef = useRef(null);

  const showLoader = () => {
    if (loaderRef.current) {
      loaderRef.current.show();
    }
  };

  const hideLoader = () => {
    if (loaderRef.current) {
      loaderRef.current.hide();
    }
  };

  // handleState change
  const handleStateChange = (key, value) => {
    try {
      setStateObj((prevObj) => ({
        ...prevObj,
        [key]: value,
      }));
    } catch (e) {
      console.error(e);
    }
  };

  const recaptchav2Ref = useRef(null);
  const recaptchav3Ref = useRef(null);

  // common props
  const commonProps = {
    theme,
    style,
    getStyleArr,
    font,
    stateObj,
    setStateObj,
    setBackBtnStateObj,
    handleStateChange,
    errorStateObj,
    setError,
    formErrorStateObj,
    setFormErrorObj,
    navigation,
    recaptchav2Ref,
    recaptchav3Ref,
    showLoader,
    hideLoader,
  };

  useEffect(() => {
    startTimeTrack('forgot-password');

    return () => {
      stopTimeTrack('forgot-password');
    };
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={style.container}>
          <View style={style.formHeadingAndBackBtn}>
            <View style={style.backBtn}>
              <TouchableOpacity
                style={backBtnStyle} onPress={backBtnStateObj.backFn}>
                <Icon name={'arrow-left'} type='FontAwesome' size={font.heading6.fontSize} color={ theme.utilColors.dark }/>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={style.formHeading}>
                <FormattedMessage defaultMessage={'Forgot Password'} description='Forgot Password Heading'/>
              </Text>
            </View>
            </View>
            <View style={style.formSvgContainer}>
              {
              (stateObj.formStep === 3 && <ForgotPasswordThirdSvg />)
              || (stateObj.formStep === 4 && <ForgotPasswordFourthSvg />)
              || <ForgotPasswordFirstSvg/>
              }
          </View>
          <Recaptchav2Modal ref={recaptchav2Ref} siteKey={API.RECAPCHAV2SITEKEY} domainURL='https://localhost/'/>
          <Recaptchav3 ref={recaptchav3Ref} siteKey={API.RECAPCHAV3SITEKEY} domainURL='https://localhost/'/>
          {
            ((stateObj.formStep === 1)
              && <ForgotPasswordStepOne {...commonProps} />)
            || ((stateObj.formStep === 2)
              && <VerifyOtpFormStep
              {...commonProps}
              parentStateObj={stateObj}
              setParentStateObj={setStateObj}
              otpRequestType ={'send-otp-for-pwd-change'}
              secondaryActionButtons={
                <TakeActionButtons style={style} navigation={navigation} />
              } />)
            || ((stateObj.formStep === 3)
              && <ForgotPasswordStepThree
              {...commonProps}
            changePasswordRequest={changePasswordRequest}
              />)
            || ((stateObj.formStep === 4)
              && <ForgotPasswordStepFour
              style={style}
              navigation={navigation}
              setBackBtnStateObj={setBackBtnStateObj} />)
          }
        </View>
      </ScrollView>
      <Loader
        route={'ForgotPassword'}
        ref={loaderRef}
      />
    </>
  );
};

export default ForgotPassword;
