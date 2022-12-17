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
import { CommonActions } from '@react-navigation/native';
import API from '../../../env';
import ThemeContext from '../components/theme';
import RegisterFormSvg from '../../images/register/register-form-svg.svg';
import useRegister from '../../hooks/pages/register/index';
import useBackBtn from '../../hooks/pages/back-btn';
import Icon from '../common/Icons';
import { closeFormError, validate } from '../common/framework';
import useOtp from '../../hooks/pages/otp';
import VerifyOtpFormStep from '../components/VerifyOtpFormStep';
import getCommonStyles from '../components/commonStyles';
import Recaptchav3 from '../components/Recaptchav3';
import Recaptchav2Modal from '../components/Recaptchav2Modal';

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
});

const RegisterFormStepOne = ({
  style, getStyleArr, theme, font, stateObj, setStateObj, setBackBtnStateObj, handleStateChange,
  errorStateObj, setError, formErrorStateObj, setFormErrorObj, navigation,
  recaptchav2Ref, recaptchav3Ref,
}) => {
  // hooks
  const phoneInput = useRef(null);
  const { sendOtpRequest } = useOtp();

  useEffect(() => {
    setBackBtnStateObj((prevObj) => ({
      ...prevObj,
      showBackBtn: false,
    }));
  }, []);

  // handlers
  const sendOtpRequestWithToken = (token, recaptchaVersion) => {
    const countryCode = `+${phoneInput.current.getCallingCode()}`;
    const countryAbbrevation = phoneInput.current.getCountryCode();

    sendOtpRequest(stateObj.phoneNumber, countryCode, 'send-otp', token, recaptchaVersion).then((response) => {
      const data = JSON.parse(response);
      const { status, message } = data;

      if (status === 'success') {
        setStateObj((prevObj) => ({
          ...prevObj,
          formStep: prevObj.formStep + 1,
          countryCode,
          countryAbbrevation,
        }));
      } else if (status === 'error') {
        switch (message) {
          case 'ACCOUNT_EXIST': {
            const err = new Error('Account already exists!, try logging in');
            err.cause = 'postData';
            err.errorType = 'ACCOUNT_EXIST';
            err.errorFieldHighlightKey = 'phoneNumber';

            throw err;
          }
          case 'UNAUTHORIZED_ACCESS': {
            recaptchav2Ref.current.showModal();
            recaptchav2Ref.current.setOnTokenFn(() => sendOtpRequestWithToken);

            break;
          }
          default: {
            const err = new Error('Something went wrong! Try again');
            err.cause = 'postData';
            err.errorType = 'ERROR';

            throw err;
          }
        }
      }
    }).catch((err) => {
      if (err.cause === 'postData') {
        if (err.errorFieldHighlightKey) {
          setError((prevObj) => ({ ...prevObj, [err.errorFieldHighlightKey]: true }));
        }
        setFormErrorObj((prevObj) => ({
          ...prevObj,
          formError: err.message,
          formErrorType: err.errorType,
        }));
      } else {
        console.error(err);
        setFormErrorObj((prevObj) => ({
          ...prevObj,
          formError: 'Something went wrong! Try again',
          formErrorType: 'ERROR',
        }));
      }
    });
  };

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
      recaptchav3Ref.current.generateNewToken();
      recaptchav3Ref.current.setOnTokenFn(() => sendOtpRequestWithToken);
    }
  };

  return (
    <View style={style.styleContainer}>
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
  style, getStyleArr, font, theme, stateObj, setStateObj,
  handleStateChange, formErrorStateObj, setFormErrorObj, errorStateObj,
  setError, setBackBtnStateObj, createAccountRequest, navigation,
  recaptchav2Ref, recaptchav3Ref,
}) => {
  // hooks
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

  // handlers
  const matchValueTo = (value, matchToValue, errorKey, setErrorObj) => {
    if (value === '') return;

    if (value !== matchToValue) {
      setErrorObj((prevObj) => ({ ...prevObj, [errorKey]: 'Passwords do not match' }));
    }
  };

  const createAccountRequestWithToken = (token, recaptchaVersion) => {
    createAccountRequest(token, recaptchaVersion).then((response) => {
      const data = JSON.parse(response);
      const { status, message } = data;

      if (status === 'error') {
        switch (message) {
          case 'UNAUTHORIZED_ACCESS': {
            recaptchav2Ref.current.showModal();
            recaptchav2Ref.current.setOnTokenFn(() => createAccountRequestWithToken);

            break;
          }
          default: {
            const err = new Error('Something went wrong! Try again later');
            err.errorType = 'ERROR';
            err.cause = 'postData';

            throw err;
          }
        }
      }
    }).catch((err) => {
      if (err.cause === 'postData') {
        setFormErrorObj({ formError: err.message, formErrorType: err.errorType });
      } else {
        console.error(err);
        setFormErrorObj({ formError: 'Something went wrong! Try again', formErrorType: 'ERROR' });
      }
    });
  };

  const createAccountBtnPressHandler = (e) => {
    e.preventDefault();

    const enteredPassword = validate('password', stateObj.password, 'Password', setError, 'password');
    const retypedPassword = validate('password', stateObj.retypedPassword, 'Retype Password', setError, 'retypedPassword');

    if ((enteredPassword && retypedPassword) && (enteredPassword !== retypedPassword)) {
      setError((prevObj) => ({ ...prevObj, retypedPassword: 'Passwords do not match' }));
    }

    if ((enteredPassword && retypedPassword) && (enteredPassword === retypedPassword)) {
      recaptchav3Ref.current.generateNewToken();
      recaptchav3Ref.current.setOnTokenFn(() => createAccountRequestWithToken);
    }
  };

  return (
    <View style={style.styleContainer}>
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
  // hooks
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

  useEffect(() => {
    if (formErrorStateObj.formError) {
      setFormErrorObj({ formError: false, formErrorType: false });
    }
  }, [stateObj.formStep]);

  // styles
  const { font, theme } = React.useContext(ThemeContext);
  const screenTheme = theme.screenRegister;
  const style = getStyles(screenTheme, theme.utilColors, font);
  const backBtnStyle = backBtnStateObj.showBackBtn ? style.show : style.hide;
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

  // handleStateChange
  const handleStateChange = (key, value) => {
    try {
      setStateObj((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    } catch (e) {
      console.error(e);
    }
  };

  const recaptchav2Ref = useRef(null);
  const recaptchav3Ref = useRef(null);

  // common props
  const commonProps = {
    style,
    getStyleArr,
    theme,
    font,
    stateObj,
    setStateObj,
    handleStateChange,
    errorStateObj,
    setError,
    setBackBtnStateObj,
    formErrorStateObj,
    setFormErrorObj,
    navigation,
    recaptchav3Ref,
    recaptchav2Ref,
  };

  // elements
  const loginIntoExistingAccBtn = <TouchableOpacity
  key={ 0 }
  style={style.btnOutlinePrimary}
  title="Login into existing account"
  onPress={() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Login' },
        ],
      }),
    );
  }}>
  <Text style={style.btnOutlinePrimaryText}>
    <FormattedMessage defaultMessage='Login into existing account' description='Login into existing account button' />
  </Text>
  </TouchableOpacity>;

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={style.container}>
        <View style={style.formHeadingAndBackBtn}>
          <View style={style.backBtn}>
            <TouchableOpacity style={backBtnStyle} onPress={backBtnStateObj.backFn}>
              <Icon name={'arrow-left'} type='FontAwesome' size={font.heading6.fontSize} color={ theme.utilColors.dark }/>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={style.formHeading}>
              <FormattedMessage defaultMessage={'Create a New Account'} description='Create Account Heading'/>
            </Text>
          </View>
          </View>
          <View style={style.formSvgContainer}>
            <RegisterFormSvg/>
          </View>
        <Recaptchav3 ref={recaptchav3Ref} siteKey={API.RECAPCHAV3SITEKEY} domainURL={'https://localhost/'} />
        <Recaptchav2Modal ref={recaptchav2Ref} siteKey={API.RECAPCHAV2SITEKEY} domainURL={'https://localhost/'} />
        {
          ((stateObj.formStep === 1)
            && <RegisterFormStepOne {...commonProps} />)
          || ((stateObj.formStep === 2)
            && <VerifyOtpFormStep
            {...commonProps}
            parentStateObj={stateObj}
            setParentStateObj={setStateObj}
            otpRequestType={'send-otp'}
            secondaryActionButtons={[loginIntoExistingAccBtn]} />)
          || ((stateObj.formStep === 3)
          && <RegisterFormStepThree
          {...commonProps}
          createAccountRequest={createAccountRequest}
            />)
        }
        </View>
      </ScrollView>
  );
};

export default Register;
