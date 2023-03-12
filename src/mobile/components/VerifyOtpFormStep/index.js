import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet,
} from 'react-native';
import ThemeContext from '../theme';
import useOtp from '../../../hooks/pages/otp';
import { closeFormError } from '../../common/framework';
import getCommonStyles from '../commonStyles';

const VerifyOtpFormStep = ({
  parentStateObj, setParentStateObj, setBackBtnStateObj, formErrorStateObj,
  setFormErrorObj, navigation, otpRequestType, recaptchav2Ref, recaptchav3Ref,
  secondaryActionButtons = false, additionalStyles = false,
  showLoader = () => {}, hideLoader = () => {},
}) => {
  // hooks
  const {
    sendOtpRequest, verifyOtpRequest, stateObj, setStateObj,
  } = useOtp();
  const [otpSeconds, setOtpSeconds] = useState(0);

  const firstOtpField = useRef(null);
  const secondOtpField = useRef(null);
  const thirdOtpField = useRef(null);
  const fourthOtpField = useRef(null);
  const otpFieldsArr = [firstOtpField, secondOtpField, thirdOtpField, fourthOtpField];

  let additionalStylesObj = {};

  if (additionalStyles) {
    additionalStylesObj = additionalStyles;
  }

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

  // styles
  const getStyles = (theme, utilColors, font) => StyleSheet.create({
    ...getCommonStyles(theme, utilColors, font),
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
    ...additionalStylesObj,
  });

  const { font, theme } = React.useContext(ThemeContext);
  const screenTheme = theme.screenRegister;
  const style = getStyles(screenTheme, theme.utilColors, font);
  const otpTimerSyles = [style.otpTimer];
  const resendOtpBtnStyles = [style.resendOtpBtn];

  // if timer already active hide resend btn
  if (stateObj.otpTimerId !== null) {
    resendOtpBtnStyles.push(style.hide);
  }

  if (stateObj.otpTimerId === null) {
    otpTimerSyles.push(style.hide);
  }

  let componentStillMounted = true;

  // methods
  const startOtpTimer = () => {
    setOtpSeconds(30);
    const timer = setInterval(() => {
      if (componentStillMounted) {
        setOtpSeconds((second) => second - 1);
      }
    }, 1000);
    setStateObj((prevObj) => ({
      ...prevObj,
      otpTimerId: timer,
    }));
  };

  const sendOtpRequestWithToken = (token, recaptchaVersion) => {
    showLoader();
    sendOtpRequest(parentStateObj.phoneNumber,
      parentStateObj.countryCode,
      otpRequestType, token, recaptchaVersion).then((response) => {
      hideLoader();
      const data = JSON.parse(response);

      if (data.status === 'success') {
        startOtpTimer();
      } else if (data.status === 'error' && data.message === 'UNAUTHORIZED_ACCESS') {
        recaptchav2Ref.current.showModal();
        recaptchav2Ref.current.setOnTokenFn(() => sendOtpRequestWithToken);
      } else if (data.status === 'error') {
        setFormErrorObj((prevObj) => ({ ...prevObj, formError: 'Something went wrong! Try again', formErrorType: 'ERROR' }));
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  const resendOtpPressHandler = () => {
    if (stateObj.otpTimerId === null) {
      recaptchav3Ref.current.generateNewToken();
      recaptchav3Ref.current.setOnTokenFn(() => sendOtpRequestWithToken);
    }
  };

  const keyPressHandler = (e, otpIndex) => {
    const { nativeEvent } = e;
    const { key } = nativeEvent;

    if (key.match(/\d/g)) {
      const nextOtpField = otpFieldsArr[otpIndex + 1]
        ? otpFieldsArr[otpIndex + 1].current : false;

      if (nextOtpField) {
        nextOtpField.focus();
      }
    } else if (key === 'Backspace') {
      const prevOtpField = otpFieldsArr[otpIndex - 1] ? otpFieldsArr[otpIndex - 1].current : false;

      if (prevOtpField) {
        prevOtpField.focus();
      }
    }
  };

  const onChangeHandler = (e, otpIndex) => {
    const { nativeEvent } = e;
    const { text: value } = nativeEvent;
    const regex = /\D/g;

    // replace the value if not a digit
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

  const verifyOtpRequestWithToken = (token, recaptchaVersion) => {
    showLoader();
    verifyOtpRequest(parentStateObj.phoneNumber,
      parentStateObj.countryCode, token, recaptchaVersion).then((response) => {
      hideLoader();
      const data = JSON.parse(response);
      const { status, message } = data;

      if (status === 'success') {
        setParentStateObj((prevObj) => ({
          ...prevObj,
          formStep: prevObj.formStep + 1,
        }));
      } else if (status === 'error') {
        switch (message) {
          case 'OTP_EXPIRED': {
            const err = new Error('Enter a valid OTP');
            err.cause = 'postData';
            err.errorType = 'OTP_EXPIRED';

            throw err;
          }
          case 'UNAUTHORIZED_ACCESS': {
            recaptchav2Ref.current.showModal();
            recaptchav2Ref.current.setOnTokenFn(() => verifyOtpRequestWithToken);

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
        setFormErrorObj({ formError: err.message, formErrorType: err.errorType });
      } else {
        setFormErrorObj({ formError: 'Something went wrong! Try again', formErrorType: 'ERROR' });
        console.error(err);
      }
    });
  };

  const verifyBtnPressHandler = () => {
    const { enteredOtpArr } = stateObj;

    if (enteredOtpArr.join('').length !== 4) {
      setFormErrorObj((prevObj) => ({
        ...prevObj,
        formError: 'Enter a OTP to proceed',
        formErrorType: 'OTP_EXPIRED',
      }));
    }

    recaptchav3Ref.current.generateNewToken();
    recaptchav3Ref.current.setOnTokenFn(() => verifyOtpRequestWithToken);
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
      clearInterval(stateObj.otpTimerId);
      if (e.data.action.type === 'GO_BACK') {
        e.preventDefault();
        setParentStateObj((prevObj) => ({
          ...prevObj,
          formStep: prevObj.formStep - 1,
        }));
      }
    });

    return () => {
      removeListener();
      clearInterval(stateObj.otpTimerId);
      componentStillMounted = false;
    };
  }, []);

  // side effect to move to next step if all otp fields are filled
  useEffect(() => {
    if (stateObj.enteredOtpArr.join('').length === 4) {
      verifyBtnPressHandler();
      Keyboard.dismiss();
    }
  }, [stateObj]);

  return (
  <View style={style.stepContainer}>
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
              onChange={(e) => {
                onChangeHandler(e, 0);
                closeFormError(formErrorStateObj, 'OTP_EXPIRED,ERROR', setFormErrorObj);
              }}
              onKeyPress={(e) => keyPressHandler(e, 0)} />
            <TextInput style={[style.inputField, style.otpField]}
              value={stateObj.enteredOtpArr[1]}
              keyboardType='number-pad'
              disableFullscreenUI={true}
              multiline={false}
              maxLength={1}
              ref={secondOtpField}
              onChange={(e) => {
                onChangeHandler(e, 1);
                closeFormError(formErrorStateObj, 'OTP_EXPIRED,ERROR', setFormErrorObj);
              } }
              onKeyPress={(e) => keyPressHandler(e, 1)} />
            <TextInput
              style={[style.inputField, style.otpField]}
              value={stateObj.enteredOtpArr[2]}
              keyboardType='number-pad'
              disableFullscreenUI={true}
              multiline={false}
              maxLength={1}
              ref={thirdOtpField}
              onChange={(e) => {
                onChangeHandler(e, 2);
                closeFormError(formErrorStateObj, 'OTP_EXPIRED,ERROR', setFormErrorObj);
              } }
              onKeyPress={(e) => keyPressHandler(e, 2)} />
            <TextInput style={[style.inputField, style.otpField]}
              value={stateObj.enteredOtpArr[3]}
              keyboardType='number-pad'
              disableFullscreenUI={true}
              multiline={false}
              maxLength={1} ref={fourthOtpField}
              onChange={(e) => {
                onChangeHandler(e, 3);
                closeFormError(formErrorStateObj, 'OTP_EXPIRED,ERROR', setFormErrorObj);
              } }
              onKeyPress={(e) => keyPressHandler(e, 3)} />
        </View>
      </View>
        <TouchableOpacity style={{ marginBottom: 20 }}
          onPress={
            () => setParentStateObj((prevObj) => ({ ...prevObj, formStep: prevObj.formStep - 1 }))
          }>
            <Text style={style.btnAsInteractiveText}>
            <FormattedMessage
              defaultMessage='Not {phone} ?'
              description="not button"
              values={{
                phone: `${parentStateObj.countryCode}${parentStateObj.phoneNumber}`,
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
        <View>
            {
              (Array.isArray(secondaryActionButtons))
                ? secondaryActionButtons.map((secondaryActionBtn) => secondaryActionBtn)
                : secondaryActionButtons
            }
        </View>
      </View>
    </KeyboardAvoidingView>
  </View>
  );
};

export default VerifyOtpFormStep;
