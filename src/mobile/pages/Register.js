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
import ThemeContext from '../components/theme';
import RegisterFormSvg from '../../images/register/register-form-svg.svg';
import useRegister from '../../hooks/pages/register/index';
import useBackBtn from '../../hooks/pages/back-btn';
import Icon from '../common/Icons';
import { validate } from '../common/framework';
import useOtp from '../../hooks/pages/otp';
import VerifyOtpFormStep from '../components/VerifyOtpFormStep';

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
  createAccountHeading: {
    color: 'black',
    marginVertical: 10,
    ...font.heading6,
    textAlign: 'center',
    flexGrow: 1,
  },
  inputField: {
    borderWidth: 1,
    borderColor: theme.inputBorderColor,
    borderRadius: 8,
    padding: 8,
    color: 'black',
    ...font.bodyBold,
  },
  errorField: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
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
  nextBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nextBtnText: {
    textAlign: 'left',
  },
  hide: {
    display: 'none',
  },
  show: {
    display: 'flex',
  },
  formHeadingAndBackBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 18,
  },
  labelAndFormHelperContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  formError: {
    textAlign: 'center',
    marginBottom: 20,
  },
});

const RegisterFormStepOne = ({
  style, theme, font, stateObj, setStateObj, setBackBtnStateObj, handleStateChange,
  errorStateObj, setError, formErrorStateObj, setFormErrorObj,
}) => {
  const { sendOtpRequest } = useOtp();
  const phoneInput = useRef(null);

  useEffect(() => {
    setBackBtnStateObj((prevObj) => ({
      ...prevObj,
      showBackBtn: false,
    }));
  }, []);

  const nextBtnPressHandler = () => {
    const obj = {
      phoneNumber: {
        type: 'tel',
        typeName: 'Phone Number',
      },
      email: {
        type: 'email',
        typeName: 'Email',
      },
      fullName: {
        type: 'name',
        typeName: 'Name',
      },
      parentName: {
        type: 'name',
        typeName: "Parent's Name",
      },
    };

    const resultArr = [];
    Object.keys(obj).forEach((key) => {
      const result = validate(obj[key].type, stateObj[key], obj[key].typeName, setError, key);

      resultArr.push(result);
    });

    const checkAllValidations = () => resultArr.every((result) => {
      if (result) return true;
      return false;
    });

    const allValidationsPassed = checkAllValidations();
    if (allValidationsPassed) {
      const countryCode = `+${phoneInput.current.getCallingCode()}`;

      sendOtpRequest(stateObj.phoneNumber, countryCode).then((response) => {
        const data = JSON.parse(response);

        if (data.status === 'error') {
          setFormErrorObj({ formError: 'Something went wrong, Try again!', formErrorType: 'ERROR' });
        }

        if (data.status === 'success') {
          setStateObj((prevObj) => ({
            ...prevObj,
            formStep: prevObj.formStep + 1,
            countryCode,
          }));
        } else if (data.status === 'error' && data.message === 'ACCOUNT_EXIST') {
          setError((prevObj) => ({ ...prevObj, phoneNumber: true }));
          setFormErrorObj((prevObj) => ({ ...prevObj, formError: 'Account already exists!, try logging in', formErrorType: 'ACCOUNT_EXIST' }));
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  };

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

  return (
    <View style={style.container}>
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
        defaultCode='IN'
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
          if (formErrorStateObj.formError && (formErrorStateObj.formErrorType === 'ACCOUNT_EXIST' || formErrorStateObj.formErrorType === 'ERROR')) {
            setFormErrorObj({ formError: false, formErrorType: false });
            setError((prevObj) => ({ ...prevObj, phoneNumber: false }));
          }
        }}
      />
    </View>
    <View style={style.labelAndInputContainer}>
      <View style={style.labelAndFormHelperContainer}>
        <Text style={style.label}>
          <FormattedMessage
            defaultMessage='Email'
            description='Email label'
          />
        </Text>
        <Text style={style.errorText}>
          {errorStateObj.email}
        </Text>
      </View>
      <TextInput
        disableFullscreenUI = {true}
        style={getStyleArr('email')}
        multiline={false}
        value={stateObj.email}
        onChangeText={(value) => {
          handleStateChange('email', value);
          validate('email', value, 'Email', setError, 'email', 'Enter a valid Email address');
          if (formErrorStateObj.formErrorType === 'ERROR') {
            setFormErrorObj({ formError: false, formErrorType: false });
          }
        }}
      />
    </View>
    <View style={style.labelAndInputContainer}>
      <View style={style.labelAndFormHelperContainer}>
        <Text style={style.label}>
          <FormattedMessage
            defaultMessage='Name'
            description='Name label'
          />
        </Text>
        <Text style={style.errorText}>
          {errorStateObj.fullName}
        </Text>
      </View>
      <TextInput
            disableFullscreenUI={true}
            style={getStyleArr('fullName')}
            multiline={false}
            value={stateObj.fullName}
            onChangeText={(value) => {
              handleStateChange('fullName', value);
              validate('name', value, 'Name', setError, 'fullName');
              if (formErrorStateObj.formErrorType === 'ERROR') {
                setFormErrorObj({ formError: false, formErrorType: false });
              }
            }}
      />
    </View>
    <View style={style.labelAndInputContainer}>
      <View style={style.labelAndFormHelperContainer}>
        <Text style={style.label}>
          <FormattedMessage
            defaultMessage="Parent's Name"
            description="Parent's Name label"
          />
        </Text>
        <Text style={style.errorText}>
          {errorStateObj.parentName}
        </Text>
      </View>
    <TextInput
        disableFullscreenUI={true}
        style={getStyleArr('parentName')}
        multiline={false}
        value={stateObj.parentName}
            onChangeText={(value) => {
              handleStateChange('parentName', value);
              validate('name', value, "Parent's Name", setError, 'parentName');
              if (formErrorStateObj.formErrorType === 'ERROR') {
                setFormErrorObj({ formError: false, formErrorType: false });
              }
            }}
      />
  </View>
    <View>
        {formErrorStateObj.formError
        && <Text style={[style.errorText, style.formError]}>
        {formErrorStateObj.formError}
      </Text>}
      <TouchableOpacity
          style={[style.btnPrimary, style.nextBtn]}
          title="Next"
          onPress={nextBtnPressHandler}>
        <Text style={[style.btnPrimaryText, style.nextBtnText]}>
          <FormattedMessage defaultMessage='Next' description='Next Button' />
      </Text>
      <Icon
              name='chevron-right'
              type='FontAwesome'
              size={font.bodyBold.fontSize}
              color={theme.utilColors.white}
          />
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={style.loginIntoExistingAccount}>Login into Existing Account</Text>
      </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
</View>
  );
};

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
  const { stateObj, setStateObj, createAccountRequest } = useRegister();
  const { stateObj: backBtnStateObj, setStateObj: setBackBtnStateObj } = useBackBtn();
  const [errorStateObj, setError] = useState({
    phoneNumber: false,
    email: false,
    fullName: false,
    parentName: false,
  });

  const [formErrorStateObj, setFormErrorObj] = useState({
    formError: false,
    formErrorType: false,
  });

  const { font, theme } = React.useContext(ThemeContext);
  const screenTheme = theme.screenRegister;
  const style = getStyles(screenTheme, theme.utilColors, font);

  const backBtnStyle = backBtnStateObj.showBackBtn ? style.show : style.hide;

  const handleStateChange = (key, value) => {
    setStateObj((prevObj) => {
      const newObj = {
        ...prevObj,
        [key]: value,
      };

      return newObj;
    });
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={style.formHeadingAndBackBtn}>
        <View style={{ flex: 0.1 } }>
          <TouchableOpacity style={backBtnStyle} onPress={backBtnStateObj.backFn}>
            <Icon name={'arrow-left'} type='FontAwesome' size={font.heading6.fontSize} color={ theme.utilColors.dark }/>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.9 }}>
          <Text style={style.createAccountHeading}>
            <FormattedMessage defaultMessage={'Create a New Account'} description='Create Account Heading'/>
          </Text>
        </View>
        </View>
        <View style={style.registerFormSvgContainer}>
          <RegisterFormSvg/>
      </View>
      {
        ((stateObj.formStep === 1)
          && <RegisterFormStepOne
          style={style}
          theme={theme}
          font={font}
          stateObj={stateObj}
          setStateObj={setStateObj}
          setBackBtnStateObj={setBackBtnStateObj}
          handleStateChange={handleStateChange}
          errorStateObj={errorStateObj}
          setError={setError}
          formErrorStateObj={formErrorStateObj}
          setFormErrorObj={ setFormErrorObj }
          />)
        || ((stateObj.formStep === 2)
          && <VerifyOtpFormStep
        parentStateObj={stateObj}
        setParentStateObj={setStateObj}
        setBackBtnStateObj={setBackBtnStateObj}
        formErrorStateObj={formErrorStateObj}
        setFormErrorObj={setFormErrorObj}
        navigation={navigation} />)
        || ((stateObj.formStep === 3)
          && <RegisterFormStepThree
          style={style}
          theme={theme}
          font={font}
          stateObj={stateObj}
          setStateObj={setStateObj}
          setBackBtnStateObj={setBackBtnStateObj}
          createAccountRequest={ createAccountRequest }
          />)
      }
      </ScrollView>
  );
};

export default Register;
