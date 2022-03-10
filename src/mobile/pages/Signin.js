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
} from 'react-native';
import ThemeContext from '../components/theme';
import SigninFormSvg from '../../images/signin/signin-form-svg.svg';

const getStyles = (theme, utilColors, font) => StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 18,
    paddingRight: 18,
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
    padding: 14,
    color: 'black',
    ...font.bodyBold,
  },
  loginBtn: {
    borderRadius: 12,
    backgroundColor: theme.btnBg,
    padding: 14,
  },
  loginBtnText: {
    ...font.bodyBold,
    color: 'white',
    textAlign: 'center',
  },
  createAccountBtn: {
    backgroundColor: theme.fadedBtnBg,
    padding: 14,
  },
  createAccountBtnText: {
    ...font.bodyBold,
    textAlign: 'center',
    color: theme.fadedBtnTextColor,
  },
  signInFormSvgContainer: {
    justifycontent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 50,
  },
  labelAndInputContainer: {
    marginBottom: 10,
  },
  forgotPassword: {
    color: 'black',
    ...font.bodyBold,
    marginBottom: 50,
    textAlign: 'center',
  },
});

const Signin = ({ navigation }) => {
  const { font, theme } = React.useContext(ThemeContext);
  const screenTheme = theme.screenSignin;
  const style = getStyles(screenTheme, theme.utilColors, font);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
      <View style={style.container}>
        <KeyboardAvoidingView>
        <View style={style.signInFormSvgContainer}>
          <SigninFormSvg/>
        </View>
        <View style={style.labelAndInputContainer}>
          <Text style={style.label}>
            <FormattedMessage
              defaultMessage='Username'
            />
          </Text>
          <TextInput
            style={style.inputField}
              multiline={false}
              disableFullscreenUI = {true}
          />
        </View>
          <View style={style.labelAndInputContainer}>
            <Text style={style.label}>
              <FormattedMessage
                defaultMessage='Password'
              />
            </Text>
            <TextInput
              disableFullscreenUI = {true}
              secureTextEntry={true}
              style={style.inputField}
              multiline={false} />
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity>
          <Text style={style.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
              style={style.loginBtn}
              title="Login"
            onPress={() => navigation.navigate('Start') }>
            <Text style={style.loginBtnText}>
              <FormattedMessage defaultMessage='Login' description='Login Button'/>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={style.createAccountBtn} title='CreateAccountBtn'>
        <Text style={style.createAccountBtnText}>
          <FormattedMessage defaultMessage='Create a New Account' description='Create Account Button' />
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Signin;
