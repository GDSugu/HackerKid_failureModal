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
  Alert,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import ThemeContext from '../components/theme';
import RegisterFormSvg from '../../images/register/register-form-svg.svg';
import useRegister from '../../hooks/pages/register/index';
import useBackBtn from '../../hooks/pages/back-btn';
import Icon from '../common/Icons';
import { closeFormError, validate } from '../common/framework';
import useOtp from '../../hooks/pages/otp';
import VerifyOtpFormStep from '../components/VerifyOtpFormStep';
import getCommonStyles from '../components/commonStyles';

const getStyles = (theme, utilColors, font) => StyleSheet.create({
  ...getCommonStyles(theme, utilColors, font),
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
  labelWithOtpTimer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  otpLabel: {
    marginBottom: 0,
  },
  otpTimer: {
    color: utilColors.lightGrey,
    ...font.bodyBold,
  },
  resendOtpBtnText: {
    ...font.bodyBold,
    color: theme.fadedBtnTextColor,
  },
  otpFields: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 'auto',
    width: '80%',
    marginVertical: 30,
  },
  otpField: {
    borderRadius: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 2,
    width: '20%',
    padding: 0,
    textAlign: 'center',
  },
});

const RegisterFormStepOne = ({
  style, theme, font, stateObj, setStateObj, setBackBtnStateObj, handleStateChange,
  errorStateObj, setError, formErrorStateObj, setFormErrorObj, navigation,
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
      const countryAbbrevation = phoneInput.current.getCountryCode();

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
            countryAbbrevation,
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
          closeFormError(formErrorStateObj, 'ACCOUNT_EXIST,ERROR', setFormErrorObj);
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
          closeFormError(formErrorStateObj, 'ERROR', setFormErrorObj);
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
              closeFormError(formErrorStateObj, 'ERROR', setFormErrorObj);
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
              closeFormError(formErrorStateObj, 'ERROR', setFormErrorObj);
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
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={style.btnAsInteractiveText}>
          <FormattedMessage description='Login into Exisiting Account button' defaultMessage='Login into Existing Account'/>
        </Text>
      </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
</View>
  );
};

const RegisterFormStepThree = ({
  style, font, theme, stateObj, setStateObj,
  handleStateChange, formErrorStateObj, setFormErrorObj, errorStateObj,
  setError, setBackBtnStateObj, createAccountRequest, navigation,
}) => {
  const [hidePasswordObj, setHidePasswordObj] = useState({
    password: true,
    retypedPassword: true,
  });

  useEffect(() => {
    setBackBtnStateObj((prevBackObj) => ({
      ...prevBackObj,
      showBackBtn: true,
      backFn: () => {
        setStateObj((prevObj) => ({
          ...prevObj,
          formStep: 1,
        }));
      },
    }));

    const removeListener = navigation.addListener('beforeRemove', (e) => {
      if (e.data.action.type === 'GO_BACK') {
        e.preventDefault();
        setStateObj((prevObj) => ({
          ...prevObj,
          formStep: 1,
        }));
      }
    });

    return removeListener;
  }, []);

  const matchValueTo = (value, matchToValue, errorKey, setErrorObj) => {
    if (value === '') return;

    if (value !== matchToValue) {
      setErrorObj((prevObj) => ({ ...prevObj, [errorKey]: 'Passwords do not match' }));
    }
  };

  const createAccountBtnPressHandler = (e) => {
    e.preventDefault();

    const enteredPassword = validate('password', stateObj.password, 'Password', setError, 'password');
    const retypedPassword = validate('password', stateObj.retypedPassword, 'Retype Password', setError, 'retypedPassword');

    if ((enteredPassword && retypedPassword) && (enteredPassword !== retypedPassword)) {
      setError((prevObj) => ({ ...prevObj, retypedPassword: 'Passwords do not match' }));
    }

    if ((enteredPassword && retypedPassword) && (enteredPassword === retypedPassword)) {
      createAccountRequest().then((response) => {
        const data = JSON.parse(response);

        if (data.status === 'success' && data.message === 'REGISTERED') {
          AsyncStorage.setItem('authtoken', data.session.auth)
            .then(() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    { name: 'Start' },
                  ],
                }),
              );
            })
            .catch((error) => {
              Alert.alert('Authtoken Error', error);
            });
        } else if (data.status === 'error') {
          setFormErrorObj({ formError: 'Something went wrong!Try again later', formErrorType: 'ERROR' });
        }
      }).catch((error) => {
        console.log(error);
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
              defaultMessage='Set Password'
              description='Password Label'
            />
          </Text>
          <Text style={style.errorText}>
            {errorStateObj.password}
          </Text>
        </View>
        <View>
          <TextInput
              style={getStyleArr('password')}
              multiline={false}
              disableFullscreenUI={true}
              secureTextEntry={hidePasswordObj.password}
              onChangeText={(value) => {
                handleStateChange('password', value);
                validate('password', value, 'Password', setError, 'password', 'Use a stronger password');
                closeFormError(formErrorStateObj, 'ERROR');
              }}
            />
          <TouchableOpacity
            style={{
              position: 'absolute', right: 0, top: 10, marginRight: 10,
            }}
              onPress={() => setHidePasswordObj((prevObj) => (
                { ...prevObj, password: !prevObj.password }
              ))}>
              <Icon
                  name={(hidePasswordObj.password) ? 'eye' : 'eye-slash'}
                  type='FontAwesome'
                  size={font.heading5.fontSize}
                  color={theme.utilColors.lightGrey}
              />
            </TouchableOpacity>
        </View>
      </View>
      <View style={style.labelAndInputContainer}>
        <View style={style.labelAndFormHelperContainer}>
          <Text style={style.label}>
            <FormattedMessage
              defaultMessage='Re-type Password'
              description='Re-type Password label'
            />
          </Text>
          <Text style={style.errorText}>
            {errorStateObj.retypedPassword}
          </Text>
        </View>
        <View>
          <TextInput
            disableFullscreenUI={true}
            secureTextEntry={hidePasswordObj.retypedPassword}
            style={getStyleArr('retypedPassword')}
            multiline={false}
            onChangeText={(value) => {
              handleStateChange('retypedPassword', value);
              validate('password', value, 'Retype Password', setError, 'retypedPassword', 'Use a stronger password');
              closeFormError(formErrorStateObj, 'ERROR');
              matchValueTo(value, stateObj.password, 'retypedPassword', setError);
            }}
            />
          <TouchableOpacity style={{
            position: 'absolute', right: 0, top: 10, marginRight: 10,
          }} onPress={() => setHidePasswordObj((prevObj) => (
            { ...prevObj, retypedPassword: !prevObj.retypedPassword }
          ))}>
            <Icon
                name={(hidePasswordObj.retypedPassword) ? 'eye' : 'eye-slash'}
                type='FontAwesome'
                size={font.heading5.fontSize}
                color={theme.utilColors.lightGrey}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={[style.btnPrimary, { marginVertical: 10 }]}
          onPress={createAccountBtnPressHandler}
          title="Create Account">
          <Text style={style.btnPrimaryText}>
            <FormattedMessage defaultMessage='Create Account' description='Create Account Button' />
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  </View>);
};

const Register = ({ navigation }) => {
  const { stateObj, setStateObj, createAccountRequest } = useRegister();
  const { stateObj: backBtnStateObj, setStateObj: setBackBtnStateObj } = useBackBtn();
  const [errorStateObj, setError] = useState({
    phoneNumber: false,
    email: false,
    fullName: false,
    parentName: false,
    password: false,
    retypedPassword: false,
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

  useEffect(() => {
    if (formErrorStateObj.formError) {
      setFormErrorObj({ formError: false, formErrorType: false });
    }
  }, [stateObj.formStep]);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={style.formHeadingAndBackBtn}>
        <View style={{ flexBasis: '5%' }}>
          <TouchableOpacity style={backBtnStyle} onPress={backBtnStateObj.backFn}>
            <Icon name={'arrow-left'} type='FontAwesome' size={font.heading6.fontSize} color={ theme.utilColors.dark }/>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={style.formHeading}>
            <FormattedMessage defaultMessage={'Create a New Account'} description='Create Account Heading'/>
          </Text>
        </View>
        </View>
        <View style={style.formSvgContainer}>
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
          setFormErrorObj={setFormErrorObj}
          navigation={navigation}
          />)
        || ((stateObj.formStep === 2)
          && <VerifyOtpFormStep
          style={style}
          parentStateObj={stateObj}
          setParentStateObj={setStateObj}
          setBackBtnStateObj={setBackBtnStateObj}
          formErrorStateObj={formErrorStateObj}
          setFormErrorObj={setFormErrorObj}
          navigation={navigation}
          secondaryActionButtons={[<TouchableOpacity
            key={ 0 }
            style={style.btnOutlinePrimary}
            title="Login into existing account"
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={style.btnOutlinePrimaryText}>
              <FormattedMessage defaultMessage='Login into existing account' description='Login into existing account button' />
            </Text>
          </TouchableOpacity>] } />)
        || ((stateObj.formStep === 3)
          && <RegisterFormStepThree
        style={style}
        theme={theme}
        font={font}
        stateObj={stateObj}
        setStateObj={setStateObj}
        handleStateChange = {handleStateChange}
        formErrorStateObj={formErrorStateObj}
        setFormErrorObj={setFormErrorObj}
        errorStateObj={errorStateObj}
        setError={setError}
        setBackBtnStateObj={setBackBtnStateObj}
        createAccountRequest={createAccountRequest}
        navigation={ navigation}
          />)
      }
      </ScrollView>
  );
};

export default Register;
