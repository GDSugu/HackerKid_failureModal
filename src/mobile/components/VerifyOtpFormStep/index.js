import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import useOtp from '../../../hooks/pages/otp';
import { closeFormError } from '../../common/framework';

const VerifyOtpFormStep = ({
  style, parentStateObj, setParentStateObj, setBackBtnStateObj, formErrorStateObj,
  setFormErrorObj, navigation, secondaryActionButtons = false,
}) => {
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
      sendOtpRequest(parentStateObj.phoneNumber, parentStateObj.countryCode).then((response) => {
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
    };
  }, []);

  useEffect(() => {
    if (stateObj.enteredOtpArr.join('').length === 4) {
      verifyBtnPressHandler();
      Keyboard.dismiss();
    }
  }, [stateObj]);

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
        <View>
          {
              secondaryActionButtons
              && secondaryActionButtons.map((secondaryActionBtn) => secondaryActionBtn)
          }
        </View>
      </View>
    </KeyboardAvoidingView>
  </View>
  );
};

export default VerifyOtpFormStep;
