import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FormattedMessage } from 'react-intl';
import { launchImageLibrary } from 'react-native-image-picker';
import ThemeContext from '../components/theme';
import { useProfileInfo } from '../../hooks/pages/profile';
import defaultUser from '../../images/profile/default_user.png';
import profileEdit from '../../images/profile/profile-edit.png';
import { AuthContext } from '../../hooks/pages/root';
import { useTimeTrack } from '../../hooks/pages/timeTrack';
import Loader from '../components/Loader';

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
  profileImgContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  profileImg: {
    borderRadius: 50,
    width: 96,
    height: 96,
  },
  profileEditImg: {
    borderRadius: 50,
    width: 28,
    height: 28,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  inputTextBox: {
    borderWidth: 1,
    borderColor: theme.inputBorderColor,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: utils.white,
    ...font.bodyBold,
    color: utils.dark,
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
  errorText: {
    ...font.captionBold,
    color: utils.danger,
    marginVertical: 10,
  },
  errorDpText: {
    textAlign: 'center',
  },
  overlay: {
    backgroundColor: utils.transparent,
    flex: 1,
    justifyContent: 'center',
  },
  modalCard: {
    backgroundColor: utils.white,
    borderRadius: 12,
    alignItems: 'center',
    // paddingVertical: 24,
    // paddingHorizontal: 16,
    margin: Dimensions.get('window').width * 0.05,
    overflow: 'hidden',
  },
  successHeadingContainer: {
    backgroundColor: theme.bodyBg,
    width: '100%',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successHeadingText: {
    ...font.heading6,
    color: utils.dark,
  },
  successContentContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successContentText: {
    ...font.subtitle2,
    color: utils.dark,
  },
  successCloseBtn: {
    backgroundColor: theme.btnBg,
    borderRadius: 12,
    padding: 12,
    paddingHorizontal: 24,
    marginTop: 24,
  },
  successCloseBtnText: {
    ...font.subtitle2,
    color: utils.white,
  },
});

const validate = (key, value) => {
  let result = false;
  try {
    switch (key) {
      case 'name': {
        if (value.length > 100 || value.length < 2) {
          throw new Error('Name should be between 2 and 100 characters');
        }
        break;
      }
      case 'about': {
        if (value.length < 10) {
          throw new Error('Looks very short. Tell us more!');
        }
        break;
      }
      case 'grade': {
        if (!Number(value) || value < 1 || value > 12) {
          throw new Error('Grade must be number between 1 to 12');
        }
        break;
      }
      case 'school': {
        if (value.length < 3 || value.length > 100) {
          throw new Error('School Name must be of length 3 to 100 characters');
        }
        break;
      }
      case 'parentEmail': {
        if (!(/^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i.test(value))) {
          throw new Error('Invalid email');
        }
        break;
      }
      case 'parentPhone': {
        if (!(/[0-9 -()+]{8}$/.test(value))) {
          throw new Error('Invalid phone number');
        }
        break;
      }
      default: break;
    }
    result = {
      status: true,
    };
  } catch (error) {
    result = {
      status: false,
      error: error.message,
    };
  }
  return result;
};

const ErrorMessage = ({ message, style }) => <>
  {message && <Text style={style}>
      <FormattedMessage
        defaultMessage={'{message}'}
        description={'error message'}
        values={{
          message,
        }}

      />
    </Text>}
</>;

const SuccessSaveModal = ({ closeModal = () => {}, modalVisible = false, style }) => <>
  <Modal
    visible={modalVisible}
    transparent
    onRequestClose={closeModal}
  >
    <View style={style.overlay}>
      <View style={style.modalCard}>
        <View style={style.successHeadingContainer}>
          <Text style={style.successHeadingText}>
            <FormattedMessage
              defaultMessage={'Save Successful'}
              description={'successfull message'}
            />
          </Text>
        </View>
        <View style={style.successContentContainer}>
          <Text style={style.successContentText}>
            <FormattedMessage
              defaultMessage={'Your changes have been saved successfully.'}
              description={'successfull mussage'}
            />
          </Text>
          <TouchableOpacity onPress={closeModal} style={style.successCloseBtn}>
            <Text style={style.successCloseBtnText}>
              <FormattedMessage
                defaultMessage={'close'}
                description={'close button text'}
              />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
</>;

const EditProfile = ({ navigation }) => {
  const { static: { startTimeTrack, stopTimeTrack } } = useTimeTrack({ navigation });
  const { font, theme } = useContext(ThemeContext);
  const pageTheme = theme.screenEditProfile;
  const style = getStyles(pageTheme, theme.utilColors, font);
  const [avatar, setAvatar] = useState(defaultUser);
  const [modalVisible, setModalVisibility] = useState({
    profileSuccessModalVisible: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    name: false,
    about: false,
    grade: false,
    school: false,
    email: false,
    phone: false,
    profileImg: false,
    parentEmail: false,
    parentPhone: false,
  });
  const hasEdited = React.useRef(false);
  const isPageMounted = React.useRef(true);
  const loaderRef = useRef(false);
  const authContext = React.useContext(AuthContext);

  const { saveProfile, state, setState } = useProfileInfo({ isPageMounted });

  if (!state.status) {
    Alert.alert('Error', 'Profile not found', [{ text: 'Go to Home', onPress: () => navigation.navigate('Home') }]);
  }

  const {
    status,
    about,
    grade,
    name,
    profileImage,
    school,
    parentEmail,
    parentPhone,
    // uniqueUrl,
  } = state;

  const showLoader = () => {
    if (loaderRef.current) {
      loaderRef.current.show();
    }
  };

  const hideLoader = () => {
    if (loaderRef.current) {
      loaderRef.current.hide();
    }
  };

  const showSuccessModal = () => {
    // if (isPageMounted.current) {
    // }
    setModalVisibility({
      profileSuccessModalVisible: true,
    });
  };

  const closeSuccessModal = () => {
    // if (isPageMounted) {
    //   authContext.setAuthState((prevState) => ({
    //     ...prevState,
    //     appData: {
    //       ...prevState.appData,
    //       profileSuccessModalVisible: false,
    //     },
    //   }));
    // }
    setModalVisibility({
      profileSuccessModalVisible: false,
    });
    navigation.goBack();
  };

  const handleImage = () => {
    let result;
    try {
      launchImageLibrary({
        mediaType: 'photo',
      }, async (response) => {
        if (response.assets) {
          const asset = response.assets[0];
          const twoMBInKB = 2097152;
          if (asset.fileSize > twoMBInKB) {
            setErrorMessage((prevState) => ({
              ...prevState,
              profileImg: 'Image size should be less than 2MB',
            }));
          } else {
            setAvatar({
              uri: asset.uri,
            });
            setErrorMessage((prevState) => ({
              ...prevState,
              profileImg: false,
            }));
            let uriPath = asset.uri;
            if (Platform.OS === 'ios') {
              uriPath = uriPath.replace('file://', '');
            }
            const resp = await fetch(uriPath);
            const blob = await resp.blob();
            setState({
              profileImage: blob,
            });
            hasEdited.current = true;
          }
        }
      });
      result = {
        status: true,
      };
    } catch (error) {
      result = {
        status: false,
        error: error.message,
      };
    }
    return result;
  };

  const handleStateChange = (key, value) => {
    setErrorMessage((prevState) => ({
      ...prevState,
      profileImg: false,
    }));
    const validatedResponse = validate(key, value);
    if (validatedResponse.status) {
      setErrorMessage((prevState) => ({
        ...prevState,
        [key]: false,
      }));
    } else {
      setErrorMessage((prevState) => ({
        ...prevState,
        [key]: validatedResponse.error,
      }));
    }
    setState({
      [key]: value,
    });
    hasEdited.current = true;
  };

  const handleSubmission = () => {
    const validated = Object.entries(errorMessage).filter(([key, value]) => key !== 'profileImg' && value !== false).length;
    if (!validated) {
      hasEdited.current = false;
      showLoader();
      saveProfile()
        .then(() => {
          hideLoader();
          if (status === 'access_denied') {
            Alert.alert('Error', 'Access denied. Please try again', [{ text: 'Go Back', onPress: () => navigation.goBack() }]);
          } else {
            // Alert.alert(
            //   'Success',
            //   'Profile updated successfully',
            //   [{ text: 'OK', onPress: () => { } }],
            // );
            showSuccessModal();
            authContext.setAuthState((prevState) => ({
              ...prevState,
              appData: {
                isRefresh: true,
              },
            }));
          }
        });
    }
  };

  useEffect(() => {
    startTimeTrack('profile-edit');

    return () => {
      isPageMounted.current = false;
      stopTimeTrack('profile-edit');
      hideLoader();
    };
  }, []);

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      if (hasEdited.current) {
        e.preventDefault();
        Alert.alert('Warning', 'You have unsaved changes. Are you sure you want to leave?', [
          { text: 'Cancel', style: 'cancel', onPress: () => { } },
          { text: 'Leave', style: 'destructive', onPress: () => navigation.dispatch(e.data.action) },
        ]);
      }
    });
  }, [navigation, hasEdited]);

  useEffect(() => {
    if (profileImage) {
      if (typeof profileImage === 'string') {
        setAvatar({
          uri: profileImage,
        });
      } else {
        setAvatar(profileImage);
      }
    }
  }, Object.keys(state).filter((key) => key !== 'profileImage' && key !== 'profileImageName' && key !== 'response'));

  return <>
    <View style={style.container}>
      <ScrollView>
        <View style={style.formContainer}>
          <View style={style.formGroup}>
            <View style={style.profileImgContainer}>
              <Image
                style={style.profileImg}
                source={avatar}
              />
              <TouchableOpacity
                onPress={handleImage}
              >
                <Image
                  style={style.profileEditImg}
                  source={profileEdit}
                />
              </TouchableOpacity>
            </View>
            <ErrorMessage
              style={{ ...style.errorText, ...style.errorDpText }}
              message={errorMessage.profileImg} />
          </View>
          <View style={style.formGroup}>
            <Text style={style.inputLabel}>
              <FormattedMessage
                defaultMessage="Name"
              />
            </Text>
            <TextInput
              style={style.inputTextBox}
              multiline={false}
              placeholder="Student Name"
              value={name || ''}
              onChangeText={(value) => { handleStateChange('name', value); }}
            />
            <ErrorMessage style={style.errorText} message={errorMessage.name} />
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
              placeholder='Write something interesting about you'
              value={about || ''}
              onChangeText={(value) => { handleStateChange('about', value); }}
            />
            <ErrorMessage style={style.errorText} message={errorMessage.about} />
          </View>
          {/* <View style={style.formGroup}>
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
          </View> */}
          {/* <View style={style.formGroup}>
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
          </View> */}
          <View style={style.formGroup}>
            <Text style={style.inputLabel}>
              <FormattedMessage
                defaultMessage="Grade"
              />
            </Text>
            <TextInput
              style={style.inputTextBox}
              multiline={false}
              placeholder="Student Grade"
              keyboardType='numeric'
              value={grade ? grade.toString() : ''}
              onChangeText={(value) => { handleStateChange('grade', Number(value)); }}
            />
            <ErrorMessage style={style.errorText} message={errorMessage.grade} />
          </View>
          <View style={style.formGroup}>
            <Text style={style.inputLabel}>
              <FormattedMessage
                defaultMessage="School"
              />
            </Text>
            <TextInput
              style={style.inputTextBox}
              multiline={false}
              placeholder="School Name"
              value={school || ''}
              onChangeText={(value) => { handleStateChange('school', value); }}
            />
            <ErrorMessage style={style.errorText} message={errorMessage.school} />
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
              value={parentEmail || ''}
              placeholder="Parent Email address"
              onChangeText={(value) => { handleStateChange('parentEmail', value); }}
            />
            <ErrorMessage style={style.errorText} message={errorMessage.parentEmail} />
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
              value={parentPhone ? parentPhone.toString() : ''}
              onChangeText={(value) => { handleStateChange('parentPhone', Number(value)); }}
            />
            <ErrorMessage style={style.errorText} message={errorMessage.parentPhone} />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={style.saveBtn}
        onPress={handleSubmission}
      >
        <Text style={style.btnText}>
          <FormattedMessage
            defaultMessage='Save & Exit'
            description='Profile save button'
          />
        </Text>
      </TouchableOpacity>
    </View>
    <SuccessSaveModal
      style={style}
      modalVisible={modalVisible.profileSuccessModalVisible}
      closeModal={closeSuccessModal}
    />
    <Loader
      route={'EditProfile'}
      ref={loaderRef}
    />
  </>;
};

export default EditProfile;
