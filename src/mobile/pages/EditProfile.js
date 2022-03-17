import React, { useContext } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { FormattedMessage, useIntl } from 'react-intl';
import ThemeContext from '../components/theme';
import useProfileInfo from '../../hooks/pages/profile';

const getStyles = (theme, utils, font) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: utils.bg2,
  },
  formContainer: {
    flex: 1,
    padding: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    ...font.bodyBold,
    marginBottom: 4,
    color: utils.dark,
  },
  inputTextBox: {
    borderWidth: 1,
    borderColor: theme.inputBorderColor,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    ...font.bodyBold,
  },
  inputTextArea: {
    textAlignVertical: 'top',
  },
  saveBtn: {
    backgroundColor: theme.btnBg,
    color: utils.white,
    paddingVertical: 20,
  },
  btnText: {
    textAlign: 'center',
    color: utils.white,
    ...font.bodyBold,
  },
});

const EditProfile = () => {
  const { font, theme } = useContext(ThemeContext);
  const pageTheme = theme.screenEditProfile;
  const style = getStyles(pageTheme, theme.utilColors, font);
  // const intl = useIntl();

  useProfileEdit({
    type: 'getBasicInfo',
  })
    .then((resp) => {console.log('hook response \n', resp)})
    .catch((error) => {console.error('hook error \n', error);});

  return <>
    <View style={style.container}>
      <ScrollView>
        <View style={style.formContainer}>
          <View style={style.formGroup}>
            <Text style={style.inputLabel}>
              <FormattedMessage
                defaultMessage="Name"
              />
            </Text>
            <TextInput
              style={style.inputTextBox}
              multiline={false}
              disableFullscreenUI = {true}
              placeholder="Student Name"
            />
          </View>
          <View style={style.formGroup}>
            <Text style={style.inputLabel}>
              <FormattedMessage
                defaultMessage="Bio"
              />
            </Text>
            <TextInput
              style={{ ...style.inputTextBox, ...style.inputTextArea }}
              multiline={true}
              numberOfLines={3}
              disableFullscreenUI = {true}
              placeholder='Write something interesting about you'
            />
          </View>
          <View style={style.formGroup}>
            <Text style={style.inputLabel}>
              <FormattedMessage
                defaultMessage="Email"
              />
            </Text>
            <TextInput
              style={style.inputTextBox}
              multiline={false}
              disableFullscreenUI = {true}
              keyboardType='email-address'
              placeholder="Student Email address"
            />
          </View>
          <View style={style.formGroup}>
            <Text style={style.inputLabel}>
              <FormattedMessage
                defaultMessage="Phone"
              />
            </Text>
            <TextInput
              style={style.inputTextBox}
              multiline={false}
              keyboardType='phone-pad'
              disableFullscreenUI = {true}
              placeholder="Student phone number"
            />
          </View>
          <View style={style.formGroup}>
            <Text style={style.inputLabel}>
              <FormattedMessage
                defaultMessage="Grade"
              />
            </Text>
            <TextInput
              style={style.inputTextBox}
              multiline={false}
              disableFullscreenUI = {true}
              placeholder="Student Grade"
            />
          </View>
          <View style={style.formGroup}>
            <Text style={style.inputLabel}>
              <FormattedMessage
                defaultMessage="Parent's Email"
              />
            </Text>
            <TextInput
              style={style.inputTextBox}
              multiline={false}
              keyboardType='email-address'
              disableFullscreenUI = {true}
              placeholder="Parent Email address"
            />
          </View>
          <View style={style.formGroup}>
            <Text style={style.inputLabel}>
              <FormattedMessage
                defaultMessage="Parent Phone"
              />
            </Text>
            <TextInput
              style={style.inputTextBox}
              multiline={false}
              keyboardType='phone-pad'
              disableFullscreenUI = {true}
              placeholder="Parent phone"
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={style.saveBtn}
      >
        <Text style={style.btnText}>
          <FormattedMessage
            defaultMessage='Save & Exit'
            description='Profile save button'
          />
        </Text>
      </TouchableOpacity>
    </View>
  </>;
};

export default EditProfile;
