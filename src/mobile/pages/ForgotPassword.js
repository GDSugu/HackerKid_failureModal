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
  const sendOtpClickHandler = () => {
    const phoneNumber = validate('tel', stateObj.phoneNumber, 'Phone Number', setError, 'phoneNumber');

    if (phoneNumber) {
      const countryCode = `+${phoneInput.current.getCallingCode()}`;
      const countryAbbrevation = phoneInput.current.getCountryCode();

      sendOtpRequest(stateObj.phoneNumber, countryCode, 'send-otp-for-pwd-change').then((response) => {
        const data = JSON.parse(response);

        if (data.status === 'error') {
          setFormErrorObj({ formError: 'Something went wrong, Try again!', formErrorType: 'ERROR' });
        }

        if (data.status === 'success') {
          setStateObj((prevObj) => ({
            ...prevObj,
            formStep: prevObj.formStep + 1,
            countryCode,
            countryAbbrevation,
          }));
        } else if (data.status === 'error' && data.message === 'ACCOUNT_NOT_EXIST') {
          setError((prevObj) => ({ ...prevObj, phoneNumber: true }));
          setFormErrorObj((prevObj) => ({ ...prevObj, formError: "Account doesn't exists!, try signing up", formErrorType: 'ACCOUNT_NOT_EXIST' }));
        }
      }).catch((err) => {
        console.log(err);
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
        Go to Login
      </Text>
    </TouchableOpacity>
    </View>
  );
};

const ForgotPassword = ({ navigation }) => {
  // hooks
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

  return (
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
        {
          ((stateObj.formStep === 1)
            && <ForgotPasswordStepOne
            style={style}
            getStyleArr={getStyleArr}
            font={font}
            stateObj={stateObj}
            setStateObj={setStateObj}
            setBackBtnStateObj={setBackBtnStateObj}
            handleStateChange={handleStateChange}
            errorStateObj={errorStateObj}
            setError={setError}
            formErrorStateObj={formErrorStateObj}
            setFormErrorObj={setFormErrorObj}
            navigation={navigation}
            />)
          || ((stateObj.formStep === 2)
            && <VerifyOtpFormStep
            style={style}
            parentStateObj={stateObj}
            setParentStateObj={setStateObj}
            setBackBtnStateObj={setBackBtnStateObj}
            formErrorStateObj={formErrorStateObj}
            setFormErrorObj={setFormErrorObj}
            otpRequesType ={'send-otp-for-pwd-change'}
            navigation={navigation}
            secondaryActionButtons={<TakeActionButtons style={style} navigation={navigation} />} />)
          || ((stateObj.formStep === 3)
            && <ForgotPasswordStepThree
          style={style}
          getStyleArr={getStyleArr}
          theme={theme}
          font={font}
          stateObj={stateObj}
          setStateObj={setStateObj}
          handleStateChange = {handleStateChange}
          formErrorStateObj={formErrorStateObj}
          setFormErrorObj={setFormErrorObj}
          errorStateObj={errorStateObj}
          setError={setError}
          setBackBtnStateObj={setBackBtnStateObj}
          changePasswordRequest={changePasswordRequest}
          navigation={ navigation}
            />)
          || ((stateObj.formStep === 4)
            && <ForgotPasswordStepFour
            style={style}
            navigation={navigation}
            setBackBtnStateObj={setBackBtnStateObj} />)
        }
      </View>
      </ScrollView>
  );
};

export default ForgotPassword;
