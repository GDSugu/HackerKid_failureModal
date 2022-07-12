import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { FormattedMessage } from 'react-intl';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import useOtp from '../../../hooks/pages/otp';
import ThemeContext from '../theme';

const getStyles = (theme, utilColors, font) => StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 18,
    paddingRight: 18,
    justifyContent: 'center',
  },
  label: {
    color: utilColors.dark,
    marginBottom: 5,
    ...font.bodyBold,
  },
  inputField: {
    borderWidth: 1,
    borderColor: theme.inputBorderColor,
    borderRadius: 8,
    padding: 8,
    color: utilColors.dark,
    ...font.bodyBold,
  },
  errorField: {
    borderColor: utilColors.red,
  },
  errorText: {
    color: utilColors.red,
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
    color: utilColors.white,
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
    color: utilColors.dark,
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
  notNumber: {
    color: theme.fadedBtnTextColor,
    ...font.bodyBold,
    marginTop: 16,
    marginBottom: 25,
    textAlign: 'center',
  },
  hide: {
    display: 'none',
  },
  show: {
    display: 'flex',
  },
  formError: {
    textAlign: 'center',
    marginBottom: 20,
  },
});

const VerifyOtpFormStep = ({
  parentStateObj, setParentStateObj, setBackBtnStateObj, formErrorStateObj,
  setFormErrorObj, navigation,
}) => {
  const { font, theme } = useContext(ThemeContext);
  const screenTheme = theme.screenRegister;
  const style = getStyles(screenTheme, theme.utilColors, font);

  const [otpSeconds, setOtpSeconds] = useState(0);

  const firstOtpField = useRef(null);
  const secondOtpField = useRef(null);
  const thirdOtpField = useRef(null);
  const fourthOtpField = useRef(null);

  const otpFieldsArr = [firstOtpField, secondOtpField, thirdOtpField, fourthOtpField];

  const {
    sendOtpRequest, verifyOtpRequest, stateObj, setStateObj,
  } = useOtp();

  const startOtpTimer = () => {
    setOtpSeconds(30);
    const timer = setInterval(() => {
      setOtpSeconds((second) => second - 1);
    }, 1000);
    setStateObj((prevObj) => ({
      ...prevObj,
      otpTimerId: timer,
    }));
  };

  // side effect for decrease in otp timer seconds
  useEffect(() => {
    if (otpSeconds <= 0) {
      setStateObj((prevObj) => ({
        ...prevObj,
        otpTimerId: null,
      }));
      clearInterval(stateObj.otpTimerId);
    }
  }, [otpSeconds]);

  const resendOtpPressHandler = () => {
    if (stateObj.otpTimerId === null) {
      sendOtpRequest(parentStateObj.phoneNumber, parentStateObj.countryCode, 'send-otp-for-pwd-change').then((response) => {
        const data = JSON.parse(response);

        if (data.status === 'error') {
          setFormErrorObj((prevObj) => ({ ...prevObj, formError: 'Something went wrong! Try again', formErrorType: 'ERROR' }));
        }
        if (data.status === 'success') {
          startOtpTimer();
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  const keyPressHandler = (e, otpIndex) => {
    const { nativeEvent } = e;
    const { key } = nativeEvent;
    const currentOtpField = otpFieldsArr[otpIndex].current;

    if (key.match(/\d/g)) {
      const nextOtpField = otpFieldsArr[otpIndex + 1]
        ? otpFieldsArr[otpIndex + 1].current : false;

      if (nextOtpField) {
        currentOtpField.blur();
        nextOtpField.focus();
      }
    } else if (key === 'Backspace' || key === 'Delete') {
      const prevOtpField = otpFieldsArr[otpIndex - 1] ? otpFieldsArr[otpIndex - 1].current : false;

      if (prevOtpField) {
        currentOtpField.blur();
        prevOtpField.focus();
      }
    }
  };

  const onChangeHandler = (e, otpIndex) => {
    const { nativeEvent } = e;
    const { text: value } = nativeEvent;
    const regex = /\D/g;

    if (regex.test(value)) {
      const replacedValue = value.replace(regex, '');

      setStateObj((prevObj) => {
        const otpArr = prevObj.enteredOtpArr;

        otpArr.splice(otpIndex, 1, replacedValue);

        return {
          ...prevObj,
          enteredOtpArr: [...otpArr],
        };
      });

      return;
    }

    // if digit is entered in the field
    if (value.length) {
      setStateObj((prevObj) => {
        const prevEnteredOtpArr = prevObj.enteredOtpArr;

        prevEnteredOtpArr.splice(otpIndex, 1, value);

        return {
          ...prevObj,
          enteredOtpArr: [...prevEnteredOtpArr],
        };
      });
    } else {
      // else if its being removed from the field
      setStateObj((prevObj) => {
        const prevEnteredOtpArr = prevObj.enteredOtpArr;

        prevEnteredOtpArr.splice(otpIndex, 1, '');

        return {
          ...prevObj,
          enteredOtpArr: [...prevEnteredOtpArr],
        };
      });
    }
  };

  const verifyBtnPressHandler = () => {
    const { enteredOtpArr } = stateObj;

    if (enteredOtpArr.join('').length !== 4) {
      setFormErrorObj((prevObj) => ({
        ...prevObj,
        formError: 'Enter a OTP to proceed',
        formErrorType: 'OTP_EXPIRED',
      }));
      return;
    }

    verifyOtpRequest(parentStateObj.phoneNumber, parentStateObj.countryCode).then((response) => {
      const data = JSON.parse(response);

      if (data.status === 'error') {
        setFormErrorObj({ formError: 'Something went wrong! Try again later', formErrorType: 'ERROR' });
      }
      if (data.status === 'success') {
        setParentStateObj((prevObj) => ({
          ...prevObj,
          formStep: prevObj.formStep + 1,
        }));
      } else if (data.status === 'error' && data.message === 'OTP_EXPIRED') {
        setFormErrorObj({ formError: 'Enter a valid OTP', formErrorType: 'OTP_EXPIRED' });
      }
    }).catch((err) => {
      const errData = JSON.parse(err);
      console.log(errData);
    });
  };

  useEffect(() => {
    startOtpTimer();

    setBackBtnStateObj((prevBackObj) => ({
      ...prevBackObj,
      showBackBtn: true,
      backFn: () => {
        setParentStateObj((prevObj) => ({
          ...prevObj,
          formStep: prevObj.formStep - 1,
        }));
      },
    }));

    const removeListener = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      setParentStateObj((prevObj) => ({
        ...prevObj,
        formStep: prevObj.formStep - 1,
      }));
    });

    return removeListener;
  }, []);

  const otpTimerSyles = [style.otpTimer];
  const resendOtpBtnStyles = [style.resendOtpBtn];

  // if timer already active hide resend btn
  if (stateObj.otpTimerId !== null) {
    resendOtpBtnStyles.push(style.hide);
  }

  if (stateObj.otpTimerId === null) {
    otpTimerSyles.push(style.hide);
  }

  return (
  <View style={style.container}>
    <KeyboardAvoidingView >
      <View style={style.labelAndOtpFields}>
        <View style={style.labelWithOtpTimer}>
          <Text style={[style.label, style.otpLabel]}>
            <FormattedMessage
              defaultMessage='OTP'
              description='OTP label'
            />
          </Text>
          <Text style={otpTimerSyles}>
            {
              `00 : ${(otpSeconds > 9) ? otpSeconds : (`0${otpSeconds.toString()}`)}`
            }
          </Text>
            <TouchableOpacity style={resendOtpBtnStyles} onPress={resendOtpPressHandler}>
            <Text style={ style.resendOtpBtnText}>
              <FormattedMessage defaultMessage='Resend' description='Resend otp button text' />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={style.otpFields}>
            <TextInput style={[style.inputField, style.otpField]}
              value={stateObj.enteredOtpArr[0]}
              keyboardType='number-pad'
              disableFullscreenUI={true}
              multiline={false}
              maxLength={1}
              ref={firstOtpField}
              onChange={(e) => onChangeHandler(e, 0)} onKeyPress={(e) => keyPressHandler(e, 0)} />
            <TextInput style={[style.inputField, style.otpField]}
              value={stateObj.enteredOtpArr[1]}
              keyboardType='number-pad'
              disableFullscreenUI={true}
              multiline={false}
              maxLength={1}
              ref={secondOtpField}
              onChange={(e) => onChangeHandler(e, 1)} onKeyPress={(e) => keyPressHandler(e, 1)} />
            <TextInput
              style={[style.inputField, style.otpField]}
              value={stateObj.enteredOtpArr[2]}
              keyboardType='number-pad'
              disableFullscreenUI={true}
              multiline={false}
              maxLength={1}
              ref={thirdOtpField}
              onChange={(e) => onChangeHandler(e, 2)} onKeyPress={(e) => keyPressHandler(e, 2)} />
            <TextInput style={[style.inputField, style.otpField]}
              value={stateObj.enteredOtpArr[3]}
              keyboardType='number-pad'
              disableFullscreenUI={true}
              multiline={false}
              maxLength={1} ref={fourthOtpField}
              onChange={(e) => onChangeHandler(e, 3)} onKeyPress={(e) => keyPressHandler(e, 3)} />
        </View>
      </View>
        <TouchableOpacity style={{ marginBottom: 20 }}>
            <Text style={style.notNumber}>
              <FormattedMessage
                defaultMessage='Not {phone} ?'
                description="not button"
                values={{
                  phone: parentStateObj.phoneNumber,
                }}
              />
            </Text>
        </TouchableOpacity>
      <View>
        {formErrorStateObj.formError
        && <Text style={[style.errorText, style.formError]}>
        {formErrorStateObj.formError}
      </Text>}
        <TouchableOpacity
          style={style.btnPrimary}
          title="Verify OTP and proceed"
            onPress={verifyBtnPressHandler}>
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

export default VerifyOtpFormStep;
