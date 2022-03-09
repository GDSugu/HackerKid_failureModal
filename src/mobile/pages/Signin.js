import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
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
    borderWidth: 2,
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
  createAccountBtn: {
    backgroundColor: theme.fadedBtnBg,
    color: theme.fadedBtnTextColor,
    padding: 14,
  },
});

const Signin = ({ navigation }) => {
  const { font, theme } = React.useContext(ThemeContext);
  const screenTheme = theme.screenSignin;
  const style = getStyles(screenTheme, theme.utilColors);

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <View style={style.container}>
        <View style={{
          justifycontent: 'center', alignItems: 'center', marginBottom: 50, marginTop: 50,
        }}>
          <SigninFormSvg/>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={style.label}>Username</Text>
          <TextInput
            style={style.inputField}
            multiline={false}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={style.label}>Password</Text>
          <TextInput
            secureTextEntry={true}
            style={style.inputField}
            multiline={false} />
        </View>
        <TouchableOpacity>
          <Text style={[style.label, {
            marginBottom: 50, textAlign: 'center',
          }]}>Forgot Password?</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
              style={style.loginBtn}
              title="Login"
            onPress={() => navigation.push('Start') }>
            <Text style={{ ...font.bodyBold, color: 'white', textAlign: 'center' }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={style.createAccountBtn} title='CreateAccountBtn'>
        <Text style={{ ...font.bodyBold, color: style.createAccountBtn.color, textAlign: 'center' }}>Create a New Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signin;
