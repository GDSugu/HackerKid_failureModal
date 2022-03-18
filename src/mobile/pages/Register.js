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
  loginIntoExistingAccount: {
    color: theme.fadedBtnTextColor,
    ...font.bodyBold,
    marginTop: 16,
    marginBottom: 25,
    textAlign: 'center',
  },
});

const Register = ({ navigation }) => {
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
                defaultMessage='Phone'
                description='Phone label'
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
              defaultMessage='Email'
              description='Email label'
            />
          </Text>
          <TextInput
            disableFullscreenUI = {true}
            secureTextEntry={true}
            style={style.inputField}
            multiline={false} />
        </View>
        <View style={style.labelAndInputContainer}>
          <Text style={style.label}>
            <FormattedMessage
              defaultMessage='Name'
              description='Name label'
            />
          </Text>
          <TextInput
            disableFullscreenUI = {true}
            style={style.inputField}
            multiline={false} />
        </View>
        <View style={style.labelAndInputContainer}>
        <Text style={style.label}>
          <FormattedMessage
            defaultMessage="Parent's Name"
            description="Parent's Name label"
          />
        </Text>
        <TextInput
          disableFullscreenUI = {true}
          style={style.inputField}
          multiline={false} />
      </View>
        </KeyboardAvoidingView>
        <View>
          <TouchableOpacity
              style={style.btnPrimary}
              title="Next">
            <Text style={style.btnPrimaryText}>
              <FormattedMessage defaultMessage='Next' description='Next Button'/>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={style.loginIntoExistingAccount}>Login into Existing Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;
