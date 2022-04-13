import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeContext from '../components/theme';
import LoginFormSvg from '../../images/login/login-form-svg.svg';
import useLoginMethod from '../../hooks/pages/login';

const getStyles = (theme, utilColors, font) => StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 18,
    paddingRight: 18,
    justifyContent: 'center',
  },
  label: {
    color: 'black',
    marginBottom: 5,
    ...font.bodyBold,
  },
  inputField: {
    borderWidth: 1,
    borderColor: theme.inputBorderColor,
    borderRadius: 8,
    padding: 8,
    color: 'black',
    ...font.bodyBold,
  },
  btnPrimary: {
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: theme.btnBg,
    padding: 14,
  },
  btnPrimaryText: {
    ...font.bodyBold,
    color: 'white',
    textAlign: 'center',
  },
  btnOutlinePrimary: {
    padding: 14,
    borderWidth: 1,
    marginBottom: 8,
    borderColor: theme.inputBorderColor,
    borderRadius: 8,
  },
  btnOutlinePrimaryText: {
    ...font.bodyBold,
    textAlign: 'center',
    color: 'black',
  },
  loginFormSvgContainer: {
    justifycontent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 50,
  },
  labelAndInputContainer: {
    marginBottom: 10,
  },
  forgotPassword: {
    color: theme.fadedBtnTextColor,
    ...font.bodyBold,
    marginTop: 16,
    marginBottom: 25,
    textAlign: 'center',
  },
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
  const { state, setState, loginWithPhone } = useLoginMethod();
  const screenTheme = theme.screenLogin;
  const style = getStyles(screenTheme, theme.utilColors, font);

  const loginWithPhoneTabStyle = [style.loginMethodTab];
  const loginWithPhoneTextStyle = [style.loginMethodTabText];

  if (state.loginMethod === 'loginWithPhone') {
    loginWithPhoneTabStyle.push(style.loginMethodTabActive);
    loginWithPhoneTextStyle.push(style.loginMethodTabTextActive);
  }

  const loginWithEmailTabStyle = [style.loginMethodTab];
  const loginWithEmailTextStyle = [style.loginMethodTabText];

  if (state.loginMethod === 'loginWithEmail') {
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
    console.log(state);
    loginWithPhone(state.phoneNumber, '+91', state.password).then((response) => {
      const data = JSON.parse(response);
      console.log(data);
      if (data.status === 'success') {
        navigation.navigate('EditProfile');
        AsyncStorage.setItem('authtoken', data.auth)
          .then((storageResponse) => {
            console.log('response ', storageResponse);
          })
          .catch((error) => {
            Alert.alert('Authtoken Error', error);
          });
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View style={style.container}>
        <KeyboardAvoidingView>
        <View style={style.loginFormSvgContainer}>
          <LoginFormSvg/>
        </View>
          <View style={ style.loginMethodTabsContainer}>
            <TouchableOpacity style={loginWithPhoneTabStyle} onPress={() => setState((prevState) => ({ ...prevState, loginMethod: 'loginWithPhone' }))}>
              <Text style={loginWithPhoneTextStyle}>
                Login with Phone
              </Text>
            </TouchableOpacity>
          <TouchableOpacity style={loginWithEmailTabStyle} onPress={() => setState((prevState) => ({ ...prevState, loginMethod: 'loginWithEmail' }))}>
            <Text style={loginWithEmailTextStyle}>
              Login with Email
            </Text>
          </TouchableOpacity>
          </View>
          {
            (state.loginMethod === 'loginWithPhone')
              ? <View style={style.labelAndInputContainer}>
                <Text style={style.label}>
              <FormattedMessage
                  defaultMessage='Phone'
                  description='Phone label'
              />
            </Text>
            <TextInput
                style={style.inputField}
                 multiline={false}
                  disableFullscreenUI={true}
                  onChangeText={(value) => { handleStateChange('phoneNumber', value); }}
            />
              </View>
              : <View style={style.labelAndInputContainer}>
              <Text style={style.label}>
                <FormattedMessage
                    defaultMessage='Email'
                    description='Email label'
                />
              </Text>
              <TextInput
                style={style.inputField}
                  multiline={false}
                  disableFullscreenUI={true}
                  onChangeText={(value) => { handleStateChange('email', value); }}
              />
            </View>
        }
          <View style={style.labelAndInputContainer}>
            <Text style={style.label}>
              <FormattedMessage
                defaultMessage='Password'
                description='Password label'
              />
            </Text>
            <TextInput
              disableFullscreenUI={true}
              secureTextEntry={true}
              style={style.inputField}
              multiline={false}
              onChangeText={(value) => { handleStateChange('password', value); }} />
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity>
          <Text style={style.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
              style={style.btnPrimary}
              title="Login"
            onPress={loginBtnClickHandler}>
            <Text style={style.btnPrimaryText}>
              <FormattedMessage defaultMessage='Login' description='Login Button'/>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.btnOutlinePrimary} title='Login with OTP button'>
            <Text style={style.btnOutlinePrimaryText}>
              <FormattedMessage defaultMessage='Login with OTP' description='Login with OTP button' />
            </Text>
          </TouchableOpacity>
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
