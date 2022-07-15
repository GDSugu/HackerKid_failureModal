import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { CommonActions } from '@react-navigation/native';
import Icon from '../common/Icons';
import { closeFormError, validate } from '../common/framework';
import ThemeContext from '../components/theme';
import LoginFormSvg from '../../images/login/login-form-svg.svg';
import useLoginMethod from '../../hooks/pages/login';
import getCommonStyles from '../components/commonStyles';
import { loginCheck, setUserSession } from '../../hooks/common/framework';

const getStyles = (theme, utilColors, font) => StyleSheet.create({
  ...getCommonStyles(theme, utilColors, font),
  loginMethodTabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  loginMethodTab: {
    padding: 14,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: theme.loginTabInactiveBorder,
  },
  loginMethodTabActive: {
    borderColor: theme.fadedBtnTextColor,
  },
  loginMethodTabText: {
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    ...font.bodyBold,
  },
  loginMethodTabTextActive: {
    color: theme.fadedBtnTextColor,
  },
});

const Login = ({ navigation }) => {
  const { font, theme } = React.useContext(ThemeContext);
  const { stateObj, setState, loginWithPhone } = useLoginMethod();
  const [errorStateObj, setError] = useState({
    phoneNumber: false,
    password: false,
  });
  const [formErrorStateObj, setFormErrorObj] = useState({
    formError: false,
    formErrorType: false,
  });
  const [hidePassword, setHidePassword] = useState(true);

  const phoneInput = useRef(null);

  const screenTheme = theme.screenLogin;
  const style = getStyles(screenTheme, theme.utilColors, font);

  const loginWithPhoneTabStyle = [style.loginMethodTab];
  const loginWithPhoneTextStyle = [style.loginMethodTabText];

  if (stateObj.loginMethod === 'loginWithPhone') {
    loginWithPhoneTabStyle.push(style.loginMethodTabActive);
    loginWithPhoneTextStyle.push(style.loginMethodTabTextActive);
  }

  const loginWithEmailTabStyle = [style.loginMethodTab];
  const loginWithEmailTextStyle = [style.loginMethodTabText];

  if (stateObj.loginMethod === 'loginWithEmail') {
    loginWithEmailTabStyle.push(style.loginMethodTabActive);
    loginWithEmailTextStyle.push(style.loginMethodTabTextActive);
  }

  const handleStateChange = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const loginBtnClickHandler = () => {
    const primaryFieldKey = stateObj.loginMethod === 'loginWithPhone' ? 'phoneNumber' : 'email';
    const primaryFieldTypeName = stateObj.loginMethod === 'loginWithPhone' ? 'Phone Number' : 'Email';
    const primaryFieldType = stateObj.loginMethod === 'loginWithPhone' ? 'tel' : 'email';

    const primaryField = validate(primaryFieldType, stateObj[primaryFieldKey],
      primaryFieldTypeName, setError, primaryFieldKey);
    const password = validate('password', stateObj.password, 'Password', setError, 'password', null, 1, true);

    if (primaryField && password) {
      const countryCode = stateObj.loginMethod === 'loginWithPhone' ? `+${phoneInput.current.getCallingCode()}` : '';
      loginWithPhone(countryCode).then((response) => {
        const data = JSON.parse(response);
        if (data.status === 'success') {
          setUserSession(data).then(() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  { name: 'Start' },
                ],
              }),
            );
          }).catch((err) => console.log(err));
        } else if (data.status === 'not-exists') {
          setFormErrorObj({ formError: 'You are not registered user', formErrorType: 'NOT_REGISTERED' });
          setError((prevObj) => ({ ...prevObj, phoneNumber: true }));
        } else if (data.status === 'not-valid') {
          const currentPrimaryField = stateObj.loginMethod === 'loginWithEmail' ? 'Email address' : 'Phone Number';
          setFormErrorObj({ formError: `Incorrect ${currentPrimaryField} or Password`, formErrorType: 'INCORRECT' });
        } else if (data.status === 'error' && data.message === 'EMAIL_LOGIN_RESTRICTED') {
          setFormErrorObj({ formError: 'You are not allowed to login using email. Try mobile login.', formErrorType: 'EMAIL_LOGIN_RESTRICTED' });
        } else if (data.status === 'error') {
          setFormErrorObj({ formError: 'Something went wrong! Try again later', formErrorType: 'ERROR' });
        }
      });
    }
  };

  useEffect(() => {
    setError({ phoneNumber: false, email: false, password: false });
    setFormErrorObj({ formError: false, formErrorType: false });
    setState((prevObj) => ({
      ...prevObj, phoneNumber: '', password: '', email: '',
    }));
  }, [stateObj.loginMethod]);

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

  useEffect(() => {
    loginCheck().then((response) => {
      const data = JSON.parse(response);

      if (data.status === 'success') {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: 'Start' },
            ],
          }),
        );
      }
    }).catch((err) => {
      console.log('err', err);
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View style={style.container}>
        <KeyboardAvoidingView>
        <View style={style.formSvgContainer}>
          <LoginFormSvg/>
        </View>
          <View style={ style.loginMethodTabsContainer}>
            <TouchableOpacity style={loginWithPhoneTabStyle} onPress={() => setState((prevState) => ({ ...prevState, loginMethod: 'loginWithPhone' }))}>
              <Text style={loginWithPhoneTextStyle}>
                <FormattedMessage defaultMessage='Login with Phone' description='Login with Phone tab'/>
              </Text>
            </TouchableOpacity>
          <TouchableOpacity style={loginWithEmailTabStyle} onPress={() => setState((prevState) => ({ ...prevState, loginMethod: 'loginWithEmail' }))}>
            <Text style={loginWithEmailTextStyle}>
              <FormattedMessage defaultMessage='Login with Email' description='Login with Email tab' />
            </Text>
          </TouchableOpacity>
          </View>
          {
            (stateObj.loginMethod === 'loginWithPhone')
              ? <View style={style.labelAndInputContainer}>
                <View style={style.labelAndFormHelperContainer}>
                  <Text style={style.label}>
                    <FormattedMessage
                        defaultMessage='Phone'
                        description='Phone label'
                    />
                  </Text>
                  <Text style={style.errorText}>
                    <FormattedMessage defaultMessage='{errorMessage}' description='phoneNumber form helper' values={{
                      errorMessage: errorStateObj.phoneNumber,
                    }} />
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
                    closeFormError(formErrorStateObj, 'INCORRECT,NOT_REGISTERED,ERROR', setFormErrorObj);
                  }}
                />
              </View>
              : <View style={style.labelAndInputContainer}>
                <View style={style.labelAndFormHelperContainer}>
                  <Text style={style.label}>
                    <FormattedMessage
                        defaultMessage='Email'
                        description='Email label'
                    />
                  </Text>
                  <Text style={style.errorText}>
                    <FormattedMessage defaultMessage='{errorMessage}' description='email form helper'
                      values={{ errorMessage: errorStateObj.email }} />
                  </Text>
                </View>
              <TextInput
                  style={getStyleArr('email')}
                  multiline={false}
                  disableFullscreenUI={true}
                  onChangeText={(value) => {
                    handleStateChange('email', value);
                    validate('email', value, 'Email', setError, 'email');
                    closeFormError(formErrorStateObj, 'INCORRECT,EMAIL_LOGIN_RESTRICTED,ERROR', setFormErrorObj);
                  }}
              />
            </View>
        }
          <View style={style.labelAndInputContainer}>
            <View style={style.labelAndFormHelperContainer}>
              <Text style={style.label}>
                <FormattedMessage
                  defaultMessage='Password'
                  description='Password label'
                />
              </Text>
              <Text style={style.errorText}>
                <FormattedMessage defaultMessage='{errorMessage}' description='password form helper'
                values={{
                  errorMessage: errorStateObj.password,
                }}/>
              </Text>
            </View>
            <View>
              <TextInput
                disableFullscreenUI={true}
                secureTextEntry={hidePassword}
                style={getStyleArr('password')}
                multiline={false}
                value={stateObj.password}
                onChangeText={(value) => {
                  handleStateChange('password', value);
                  validate('password', value, 'Password', setError, 'password', null, 1, true);
                  closeFormError(formErrorStateObj, 'INCORRECT,ERROR', setFormErrorObj);
                }} />
              <TouchableOpacity style={{
                position: 'absolute', right: 0, top: 10, marginRight: 10,
              }} onPress={() => {
                setHidePassword((prev) => !prev);
              }}>
              <Icon
                  name={(hidePassword) ? 'eye' : 'eye-slash'}
                  type='FontAwesome'
                  size={font.heading5.fontSize}
                  color={theme.utilColors.lightGrey}
              />
            </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={style.btnAsInteractiveText}>
            <FormattedMessage defaultMessage='Forgot Password?' description='Forgot password link' />
          </Text>
        </TouchableOpacity>
        {formErrorStateObj.formError
        && <Text style={[style.errorText, style.formError]}>
        <FormattedMessage defaultMessage='{formError}' description='form error' values={{
          formError: formErrorStateObj.formError,
        }}/>
      </Text>}
        <View>
          <TouchableOpacity
              style={style.btnPrimary}
              title="Login"
            onPress={loginBtnClickHandler}>
            <Text style={style.btnPrimaryText}>
              <FormattedMessage defaultMessage='Login' description='Login Button'/>
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={style.btnOutlinePrimary} title='Login with OTP button'>
            <Text style={style.btnOutlinePrimaryText}>
              <FormattedMessage
              defaultMessage='Login with OTP'
              description='Login with OTP button' />
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={style.btnOutlinePrimary}
            title='CreateAccountBtn'
            onPress={() => navigation.navigate('Register')}>
            <Text style={style.btnOutlinePrimaryText}>
              <FormattedMessage defaultMessage='Create a New Account' description='Create Account Button' />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
