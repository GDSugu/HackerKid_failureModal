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
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ThemeContext from '../components/theme';
import RegisterFormSvg from '../../images/register/register-form-svg.svg';

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
  createAccountHeading: {
    color: 'black',
    marginVertical: 10,
    ...font.heading6,
    textAlign: 'center',
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
  registerFormSvgContainer: {
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
  nextBtnText: {
    textAlign: 'left',
  },
});

const Tab = createMaterialTopTabNavigator();

const RegisterFormStepOne = ({ style }) => (
  <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View style={style.container}>
      <KeyboardAvoidingView>
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
          <Text style={[style.btnPrimaryText, style.nextBtnText]}>
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

const RegisterFormStepTwo = ({ style }) => (
    <View style={style.container}>
    <KeyboardAvoidingView>
    <View style={style.labelAndInputContainer}>
      <Text style={style.label}>
        <FormattedMessage
            defaultMessage='Set Password'
            description='Password Label'
        />
      </Text>
      <TextInput
        style={style.inputField}
          multiline={false}
          disableFullscreenUI={true}
          secureTextEntry={true}
      />
    </View>
    <View style={style.labelAndInputContainer}>
      <Text style={style.label}>
        <FormattedMessage
          defaultMessage='Re-type Password'
          description='Re-type Password label'
        />
      </Text>
      <TextInput
        disableFullscreenUI = {true}
        secureTextEntry={true}
        style={style.inputField}
        multiline={false} />
    </View>
    </KeyboardAvoidingView>
    <View>
      <TouchableOpacity
          style={style.btnPrimary}
          title="Create Account">
        <Text style={style.btnPrimaryText}>
          <FormattedMessage defaultMessage='Create Account' description='Create Account Button'/>
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

const Register = ({ navigation }) => {
  const { font, theme } = React.useContext(ThemeContext);
  const screenTheme = theme.screenLogin;
  const style = getStyles(screenTheme, theme.utilColors, font);

  return (
    <NavigationContainer independent={true}>
      <Text style={style.createAccountHeading}>Create a New Account</Text>
      <View style={style.registerFormSvgContainer}>
        <RegisterFormSvg/>
      </View>
      <Tab.Navigator>
        <Tab.Screen options={{ tabBarStyle: { display: 'none' }, swipeEnabled: false }} name="RegisterFormStepOne" component={() => <RegisterFormStepOne style={ style }/>} />
        <Tab.Screen options={{ tabBarStyle: { display: 'none' }, swipeEnabled: false }} name="RegisterFormStepTwo" component={() => <RegisterFormStepTwo style={ style }/>} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Register;
