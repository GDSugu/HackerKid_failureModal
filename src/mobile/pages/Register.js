import React, { useEffect, useState } from 'react';
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
import useRegister from '../../hooks/pages/register/index';
import useBackBtn from '../../hooks/pages/back-btn';
import Icon from '../common/Icons';
import { validate } from '../common/framework';

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
  errorLabel: {
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
});

const RegisterFormStepOne = ({
  style, theme, font, stateObj, setStateObj, setBackBtnStateObj, handleStateChange,
  errorStateObj, setError,
}) => {
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

    if (resultArr.every((result) => {
      if (result) return true;
      return false;
    })) {
      setStateObj((prevObj) => ({
        ...prevObj,
        formStep: prevObj.formStep + 1,
      }));
    }
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
        <Text style={style.errorLabel}>
          {errorStateObj.phoneNumber}
        </Text>
      </View>
      <TextInput
            style={(!errorStateObj.phoneNumber)
              ? style.inputField : { ...style.inputField, ...style.errorField }}
            multiline={false}
            disableFullscreenUI={true}
            value={stateObj.phoneNumber}
            keyboardType={'number-pad'}
            onChangeText={(value) => {
              handleStateChange('phoneNumber', value);
              validate('tel', value, 'Phone Number', setError, 'phoneNumber');
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
        <Text style={style.errorLabel}>
          {errorStateObj.email}
        </Text>
      </View>
      <TextInput
        disableFullscreenUI = {true}
        style={(!errorStateObj.email)
          ? style.inputField : { ...style.inputField, ...style.errorField }}
        multiline={false}
        value={stateObj.email}
        onChangeText={(value) => {
          handleStateChange('email', value);
          validate('email', value, 'Email', setError, 'email', 'Enter a valid Email address');
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
        <Text style={style.errorLabel}>
          {errorStateObj.fullName}
        </Text>
      </View>
      <TextInput
            disableFullscreenUI={true}
            style={!(errorStateObj.fullName)
              ? style.inputField : { ...style.inputField, ...style.errorField }}
            multiline={false}
            value={stateObj.fullName}
            onChangeText={(value) => {
              handleStateChange('fullName', value);
              validate('name', value, 'Name', setError, 'fullName');
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
        <Text style={style.errorLabel}>
          {errorStateObj.parentName}
        </Text>
      </View>
    <TextInput
        disableFullscreenUI={true}
        style={!(errorStateObj.parentName)
          ? style.inputField : { ...style.inputField, ...style.errorField }}
        multiline={false}
        value={stateObj.parentName}
            onChangeText={(value) => {
              handleStateChange('parentName', value);
              validate('name', value, "Parent's Name", setError, 'parentName');
            }}
      />
  </View>
    </KeyboardAvoidingView>
    <View>
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
</View>
  );
};

const RegisterFormStepTwo = ({
  style, stateObj, setStateObj, setBackBtnStateObj, navigation,
}) => {
  useEffect(() => {
    setBackBtnStateObj((prevBackObj) => ({
      ...prevBackObj,
      showBackBtn: true,
      backFn: () => {
        setStateObj((prevObj) => ({
          ...prevObj,
          formStep: prevObj.formStep - 1,
        }));
      },
    }));

    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      setStateObj((prevObj) => ({
        ...prevObj,
        formStep: prevObj.formStep - 1,
      }));
    });
  }, []);

  return (
  <View style={style.container}>
    <KeyboardAvoidingView >
      <View style={style.labelAndOtpFields}>
        <Text style={[style.label, style.otpLabel]}>
          <FormattedMessage
            defaultMessage='OTP'
            description='OTP label'
          />
        </Text>
        <View style={style.otpFields}>
          <TextInput style={[style.inputField, style.otpField]} />
          <TextInput style={[style.inputField, style.otpField]} />
          <TextInput style={[style.inputField, style.otpField]} />
          <TextInput style={[style.inputField, style.otpField]} />
        </View>
        <TouchableOpacity style={{ marginBottom: 20 }}>
            <Text style={style.loginIntoExistingAccount}>
              <FormattedMessage
                defaultMessage='Not {phone} ?'
                description="not button"
                values={{
                  phone: stateObj.phoneNumber,
                }}
              />
            </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={style.btnPrimary}
          title="Verify OTP and proceed"
            onPress={
              () => setStateObj((prevObj) => ({ ...prevObj, formStep: prevObj.formStep + 1 }))
            }>
          <Text style={style.btnPrimaryText}>
            <FormattedMessage defaultMessage='Verify OTP and proceed' description='Verify OTP and proceed Button' />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.btnOutlinePrimary}
          title="Login into existing account"
        >
          <Text style={style.btnOutlinePrimaryText}>
            <FormattedMessage defaultMessage='Login into existing account' description='Login into existing account button' />
          </Text>
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
    phoneNumber: '',
    email: '',
    fullName: '',
    parentName: '',
  });

  const { font, theme } = React.useContext(ThemeContext);
  const screenTheme = theme.screenLogin;
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
          setError = {setError}
          />)
        || ((stateObj.formStep === 2)
          && <RegisterFormStepTwo
          s style={style}
          theme={theme}
          font={font}
          stateObj={stateObj}
          setStateObj={setStateObj}
          setBackBtnStateObj={setBackBtnStateObj}
          navigation={ navigation } />)
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
