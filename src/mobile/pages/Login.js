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
    color: theme.fadedBtnTextColor,
    ...font.bodyBold,
    marginTop: 16,
    marginBottom: 25,
    textAlign: 'center',
  },
});

const Login = ({ navigation }) => {
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
                defaultMessage='Phone or Email'
                description='Phone or Email label'
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
                description='Password label'
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
              style={style.btnPrimary}
              title="Login"
            onPress={() => navigation.navigate('Start') }>
            <Text style={style.btnPrimaryText}>
              <FormattedMessage defaultMessage='Login' description='Login Button'/>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.btnOutlinePrimary} title='Login with OTP button'>
            <Text style={style.btnOutlinePrimaryText}>
              <FormattedMessage defaultMessage='Login with OTP' description='Login with OTP button' />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.btnOutlinePrimary} title='CreateAccountBtn'>
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
