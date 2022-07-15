import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { CommonActions } from '@react-navigation/native';
import ThemeContext from '../components/theme';
import Icon from '../common/Icons';
import ForgotPasswordFirstSvg from '../../images/forgot-password/forgot-password-form-svg.svg';
import ForgotPasswordThirdSvg from '../../images/forgot-password/forgot-password-step-3-svg.svg';
import ForgotPasswordFourthSvg from '../../images/forgot-password/forgot-password-step-4-svg.svg';
import useOtp from '../../hooks/pages/otp';
import VerifyOtpFormStep from '../components/VerifyOtpFormStep';
import { closeFormError, validate } from '../common/framework';
import getCommonStyles from '../components/commonStyles';
import useForgotPassword from '../../hooks/pages/forgot-password';
import useBackBtn from '../../hooks/pages/back-btn';

const getStyles = (theme, utilColors, font) => StyleSheet.create({
  ...getCommonStyles(theme, utilColors, font),
  secondaryActionButtons: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const TakeActionButtons = ({ children, style, navigation }) => (
  <View style={ style.takeActionButtons}>
    {
      (children) || false
    }
    <View>
      <TouchableOpacity
        style={style.btnOutlinePrimary}
        title="Login into existing account"
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: 'ForgotPassword' },
                { name: 'Login' },
              ],
            }),
          );
        }}>
          <Text style={style.btnOutlinePrimaryText}>
            <FormattedMessage defaultMessage='Login into existing account' description='Login into existing account button' />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={style.btnOutlinePrimary}
        title="Create a New Account"
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: 'ForgotPassword' },
                { name: 'Register' },
              ],
            }),
          );
        }}>
          <Text style={style.btnOutlinePrimaryText}>
            <FormattedMessage defaultMessage='Create a New Account' description='create a new account button' />
          </Text>
        </TouchableOpacity>
    </View>
  </View>
);

const ForgotPasswordStepOne = ({
  style, font, stateObj, setStateObj, setBackBtnStateObj, handleStateChange,
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

  const sendOtpClickHandler = () => {
    const phoneNumber = validate('tel', stateObj.phoneNumber, 'Phone Number', setError, 'phoneNumber');

    if (phoneNumber) {
      const countryCode = `+${phoneInput.current.getCallingCode()}`;
      const countryAbbrevation = phoneInput.current.getCountryCode();

      sendOtpRequest(stateObj.phoneNumber, countryCode, 'send-otp-for-pwd-change').then((response) => {
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
        } else if (data.status === 'error' && data.message === 'ACCOUNT_NOT_EXIST') {
          setError((prevObj) => ({ ...prevObj, phoneNumber: true }));
          setFormErrorObj((prevObj) => ({ ...prevObj, formError: "Account doesn't exists!, try signing up", formErrorType: 'ACCOUNT_NOT_EXIST' }));
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
          closeFormError(formErrorStateObj, 'ACCOUNT_NOT_EXIST,ERROR', setFormErrorObj);
        }}
      />
    </View>
    <View>
        {formErrorStateObj.formError
        && <Text style={[style.errorText, style.formError]}>
        {formErrorStateObj.formError}
        </Text>}
        <TakeActionButtons style={style} navigation={ navigation }>
        <TouchableOpacity
            style={style.btnPrimary}
            title="Send OTP"
            onPress={sendOtpClickHandler}>
          <Text style={[style.btnPrimaryText, style.nextBtnText]}>
            <FormattedMessage defaultMessage='Send OTP' description='Send OTP button' />
          </Text>
        </TouchableOpacity>
      </TakeActionButtons>
    </View>
    </KeyboardAvoidingView>
</View>
  );
};

const ForgotPassword = ({ navigation }) => {
  const { stateObj, setStateObj, changePasswordRequest } = useForgotPassword();

  const { stateObj: backBtnStateObj, setStateObj: setBackBtnStateObj } = useBackBtn();
  const [errorStateObj, setError] = useState({
    phoneNumber: false,
    password: false,
    retypedPassword: false,
  });

  const [formErrorStateObj, setFormErrorObj] = useState({
    formError: false,
    formErrorType: false,
  });

  const { font, theme } = React.useContext(ThemeContext);
  const screenTheme = theme.screenForgotPassword;
  const style = getStyles(screenTheme, theme.utilColors, font);

  const backBtnStyle = backBtnStateObj.showBackBtn ? style.show : style.hide;

  const handleStateChange = (key, value) => {
    setStateObj((prevObj) => ({
      ...prevObj,
      [key]: value,
    }));
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View style={style.formHeadingAndBackBtn}>
        <View style={{ flexBasis: '5%' }}>
          <TouchableOpacity style={backBtnStyle} onPress={backBtnStateObj.backFn}>
            <Icon name={'arrow-left'} type='FontAwesome' size={font.heading6.fontSize} color={ theme.utilColors.dark }/>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={style.formHeading}>
            <FormattedMessage defaultMessage={'Forgot Password'} description='Forgot Password Heading'/>
          </Text>
        </View>
        </View>
        <View style={style.formSvgContainer}>
          {
          (stateObj.formStep === 3 && <ForgotPasswordThirdSvg />)
          || (stateObj.formStep === 4 && <ForgotPasswordFourthSvg />)
          || <ForgotPasswordFirstSvg/>
          }
        </View>
      {
        ((stateObj.formStep === 1)
          && <ForgotPasswordStepOne
          style={style}
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
          secondaryActionButtons={<TakeActionButtons style={style} navigation={navigation} />} />)
        // || ((stateObj.formStep === 3)
        //   && <RegisterFormStepThree
        // style={style}
        // theme={theme}
        // font={font}
        // stateObj={stateObj}
        // setStateObj={setStateObj}
        // handleStateChange = {handleStateChange}
        // formErrorStateObj={formErrorStateObj}
        // setFormErrorObj={setFormErrorObj}
        // errorStateObj={errorStateObj}
        // setError={setError}
        // setBackBtnStateObj={setBackBtnStateObj}
        // createAccountRequest={createAccountRequest}
        // navigation={ navigation}
        //   />)
      }
      </ScrollView>
  );
};

export default ForgotPassword;
