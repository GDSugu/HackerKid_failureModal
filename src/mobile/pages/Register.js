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
import RegisterFormSvg from '../../images/register/register-form-svg.svg';
import useRegisterFormStep from '../../hooks/pages/register/index';

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
  labelAndOtpFields: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpLabel: {
    alignSelf: 'baseline',
  },
  otpFields: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1,
    marginBottom: 30,
  },
  otpField: {
    borderRadius: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 2,
    marginRight: 10,
  },
});

const RegisterFormStepOne = ({ style, currentStep, setCurrentStep }) => (
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
            title="Next"
            onPress={() => setCurrentStep(currentStep + 1) }>
          <Text style={[style.btnPrimaryText, style.nextBtnText]}>
            <FormattedMessage defaultMessage='Next' description='Next Button'/>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={style.loginIntoExistingAccount}>Login into Existing Account</Text>
        </TouchableOpacity>
      </View>
  </View>
);

const RegisterFormStepTwo = ({ style, currentStep, setCurrentStep }) => (
  <View style={ style.container }>
    <KeyboardAvoidingView >
      <View style={style.labelAndOtpFields}>
        <Text style={[style.label, style.otpLabel]}>
          <FormattedMessage
              defaultMessage='OTP'
              description='OTP label'
          />
        </Text>
        <View style={ style.otpFields }>
          <TextInput style={ [style.inputField, style.otpField] }/>
          <TextInput style={ [style.inputField, style.otpField] }/>
          <TextInput style={ [style.inputField, style.otpField] }/>
          <TextInput style={ [style.inputField, style.otpField] }/>
          <TextInput style={ [style.inputField, style.otpField] }/>
          <TextInput style={ [style.inputField, style.otpField] }/>
        </View>
        <TouchableOpacity style={{ marginBottom: 20 }}>
          <Text style={style.loginIntoExistingAccount}>NOT 9845213459?</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
            style={style.btnPrimary}
           title="Verify OTP and proceed"
            onPress={() => setCurrentStep(currentStep + 1)}>
          <Text style={style.btnPrimaryText}>
            <FormattedMessage defaultMessage='Verify OTP and proceed' description='Verify OTP and proceed Button'/>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={style.btnOutlinePrimary}
          title="Login into existing account"
        >
          <Text style={style.btnOutlinePrimaryText}>
            <FormattedMessage defaultMessage='Login into existing account' description='Login into existing account button'/>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  </View>
);

const RegisterFormStepThree = ({ style }) => (
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
  const [currentStep, setCurrentStep] = useRegisterFormStep(1);
  const { font, theme } = React.useContext(ThemeContext);
  const screenTheme = theme.screenLogin;
  const style = getStyles(screenTheme, theme.utilColors, font);

  return (
      <ScrollView style={{ flex: 1 }}>
        <Text style={style.createAccountHeading}>Create a New Account</Text>
        <View style={style.registerFormSvgContainer}>
          <RegisterFormSvg/>
      </View>
      {
        ((currentStep === 1)
          && <RegisterFormStepOne
            style={style}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep} />)
        || ((currentStep === 2)
          && <RegisterFormStepTwo
            style={style}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep} />)
        || ((currentStep === 3)
          && <RegisterFormStepThree
              style={style}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep} />)
      }
      </ScrollView>
  );
};

export default Register;
