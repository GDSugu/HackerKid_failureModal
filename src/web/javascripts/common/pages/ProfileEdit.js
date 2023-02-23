import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  $, pageInit, timeTrack, validate,
} from '../framework';
import { useProfileInfo } from '../../../../hooks/pages/profile';
import '../../../stylesheets/common/pages/profile/style.scss';
import Modal from '../components/Modal';

const validateField = (key, target) => {
  let result = false;
  const { value } = target;
  try {
    if (value && value !== '') {
      switch (key) {
        case 'name': {
          const val = validate(target, 'name', 1);
          if (!val || value.length > 100 || value.length < 2) {
            $(`#${key}~small`).html('Name must be of length between 2 to 100 characters and should contain only alphabets');
            throw new Error('FIELDS_CHECK_FAILED');
          }
          break;
        }
        case 'grade': {
          if (!Number(value) || value > 12 || value < 1) {
            $(`#${key}~small`).html('Grade must be number between 1 to 12');
            throw new Error('FIELDS_CHECK_FAILED');
          }
          break;
        }
        case 'school': {
          if (value.length > 100 || value.length < 3) {
            $(`#${key}~small`).html('School Name must be of length 3 to 100 characters');
            throw new Error('FIELDS_CHECK_FAILED');
          }
          break;
        }
        case 'about': {
          if (value.length < 10) {
            $(`#${key}~small`).html('Looks very short. Tell us more!');
            throw new Error('FIELDS_CHECK_FAILED');
          }
          break;
        }
        case 'profileImage': {
          const twoMBInKB = 2097152;
          const { files } = target;
          if (files[0] && (!['image/jpeg', 'image/png'].includes(files[0].type || files[0].size > twoMBInKB))) {
            $(`#${key}~small`).html('Image format should be one of JPG or PNG with size less than 2MB');
            throw new Error('FIELDS_CHECK_FAILED');
          }
          break;
        }
        case 'parentEmail': {
          const val = validate(target, 'email', 1);
          if (!val) {
            $(`#${key}~small`).html('Email is not valid');
            throw new Error('FIELDS_CHECK_FAILED');
          }
          if (value.length > 100) {
            $(`#${key}~small`).html('Email must be of length less than 100 characters');
            throw new Error('FIELDS_CHECK_FAILED');
          }
          break;
        }
        case 'parentPhone': {
          const val = validate(target, 'tel', 1);
          if (!val) {
            $(`#${key}~small`).html('Phone number is not valid');
            throw new Error('FIELDS_CHECK_FAILED');
          }
          if (value.length > 15) {
            $(`#${key}~small`).html('Phone number must be of length less than 15 characters');
            throw new Error('FIELDS_CHECK_FAILED');
          }
          break;
        }
        default: break;
      }
    }
    result = {
      status: true,
      value,
    };
  } catch (error) {
    result = {
      status: false,
      value,
      error,
    };
  }
  return result;
};

const Profile = () => {
  if (window.location.href.includes('profile')) {
    pageInit('profile-container', 'Profile - Settings');
  }

  timeTrack('profile');

  const isPageMounted = React.useRef(true);
  const { state, setState, saveProfile } = useProfileInfo({ isPageMounted });
  const [showUpdatedModal, setShowUpdatedModal] = useState(false);

  const modalVisible = state.status === 'error' || state.status === 'access_denied' || state.response === 'access_denied';

  const {
    about,
    grade,
    name,
    profileImage,
    school,
    parentEmail,
    parentPhone,
  } = state;

  const handleStateChange = (key, target) => {
    const { status, value } = validateField(key, target);
    if (status) {
      $(`#${key}~small`).html('');
      $(`#${key}`).removeClass('is-invalid');
    }
    setState({ [key]: value });
  };

  const handleSubmission = () => {
    const fieldStatus = ['about', 'grade', 'name', 'school', 'parentEmail', 'parentPhone'].map((key) => validateField(key, $(`#${key}`)[0]).status);
    if (!fieldStatus.includes(false)) {
      saveProfile()
        .then(() => {
          if (state.status === 'access_denied') {
            setShowUpdatedModal(false);
          } else {
            setShowUpdatedModal(true);
          }
        })
        .catch(() => {
          setShowUpdatedModal(false);
        });
    }
  };

  const setImage = (e) => {
    try {
      $('.profile-img-box small').html('');
      const profileImg = e.target.files[0];
      const twoMBInKB = 2097152;
      if (profileImg && (!['image/jpeg', 'image/png'].includes(profileImg.type) || profileImg.size > twoMBInKB)) {
        $('.profile-img-box small').html('Image format should be one of JPG or PNG with size less than 2MB');
        throw new Error('FIELDS_CHECK_FAILED');
      }
      setState({
        profileImage: profileImg,
        profileImageName: profileImg.name,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onProfileUpdated = () => {
    $('.profileSuccessModal').modal('hide');
    window.location.reload();
  };

  // useEffect(() => {
  //   if (uniqueUrl) {
  //     window.history.replaceState({}, '', `/profile/edit/${uniqueUrl}`);
  //   }
  // }, [uniqueUrl]);

  useEffect(() => () => {
    isPageMounted.current = false;
  }, []);

  return <>
    <div className="profile-cntnr col-md-6 col-lg-5 col-xxl-4 mx-auto">
      <div className="profile-edit-form">
        <div className="profile-img-box">
          <div className="profile-img-container">
            <div className="profile-img">
              <img src={ (profileImage && typeof profileImage !== 'string' ? URL.createObjectURL(profileImage) : profileImage) || '../../../../images/profile/default_user.png'} alt="Profile image" />
            </div>
            <div className="profile-edit-btn">
              <label htmlFor="upload-btn">
                <img src="../../../../images/profile/profile-edit.png" alt="Edit Profile" />
                <input type="file" accept='image/*' name="upload-btn" id="upload-btn" onChange={setImage} />
              </label>
            </div>
          </div>
          <small className='form-text text-danger'></small>
        </div>
        <div className="profile-data-container">
          <div className="form-group">
            <label htmlFor="name">
              <FormattedMessage
                defaultMessage='Name'
                description='Profile name label'
              />
            </label>
            <input type="text" className="form-control" name="name" id="name" value={name || ''} aria-describedby="name input Field" placeholder="Student name" onChange={(e) => handleStateChange('name', e.target) } />
            <small className="form-text text-danger"></small>
          </div>
          <div className="form-group">
            <label htmlFor="about">
              <FormattedMessage
                defaultMessage='Bio'
                description='Profile bio label'
              />
            </label>
            <textarea className="form-control" name="about" id="about" value={about || ''} rows="3" placeholder="Write something interesting about yourself" onChange={(e) => handleStateChange('about', e.target)}></textarea>
            <small className='form-text text-danger'></small>
          </div>
          {/* <div className="form-group">
            <label htmlFor="email">
              <FormattedMessage
                defaultMessage='Email'
                description='Profile email label'
              />
            </label>
            <input type="email" className="form-control" name="email" id="email"
            aria-describedby="email input Field" placeholder="Student email"
            onChange={(e) => handleStateChange('email', e.target)} />
            <small className="form-text text-danger"></small>
          </div> */}
          {/* <div className="form-group">
            <label htmlFor="mobile">
              <FormattedMessage
                defaultMessage='Phone'
                description='Profile phone label'
              />
            </label>
            <input type="number" className="form-control" name="mobile" id="mobile"
            aria-describedby="mobile input Field" placeholder="Student phone number"
            onChange={(e) => handleStateChange('mobile', e.target)} />
            <small className="form-text text-danger"></small>
          </div> */}
          <div className="form-group">
            <label htmlFor="grade">
              <FormattedMessage
                defaultMessage='Grade'
                description='Profile grade label'
              />
            </label>
            <input type="number" className="form-control" name="grade" id="grade" value={grade || ''} aria-describedby="grade input Field" placeholder="Student grade (1 - 12)" onChange={(e) => handleStateChange('grade', e.target)} />
            <small className="form-text text-danger"></small>
          </div>
          <div className="form-group">
            <label htmlFor="school">
              <FormattedMessage
                defaultMessage='School'
                description='Profile school label'
              />
            </label>
            <input type="text" className="form-control" name="school" id="school" value={school || ''} aria-describedby="school input Field" placeholder="School name" onChange={(e) => handleStateChange('school', e.target) } />
            <small className="form-text text-danger"></small>
          </div>
          <div className="form-group">
            <label htmlFor="parentEmail">
              <FormattedMessage
                defaultMessage="Parent's Email"
                description='Profile email label'
              />
            </label>
            <input type="email" className="form-control" name="parentEmail" id="parentEmail" value={parentEmail || ''}
            aria-describedby="Parent email input Field" placeholder="Parent email address"
            onChange={(e) => handleStateChange('parentEmail', e.target)} />
            <small className="form-text text-danger"></small>
          </div>
          <div className="form-group">
            <label htmlFor="parentPhone">
              <FormattedMessage
                defaultMessage="Parent's Phone Number"
                description='Profile phone label'
              />
            </label>
            <input type="number" className="form-control" name="parentPhone" id="parentPhone" value={parentPhone || ''}
            aria-describedby="parent phone input Field" placeholder="Parent phone number" onChange={(e) => handleStateChange('parentPhone', e.target) } />
            <small className="form-text text-danger"></small>
          </div>
          {/* <div className="form-group">
            <label htmlFor="password">
              <FormattedMessage
                defaultMessage='Password'
                description='Profile password label'
              />
            </label>
            <input type="password" name="password" id="password" className="form-control"
            aria-describedby="password" placeholder="********" />
            <small className="form-text text-danger"></small>
          </div> */}
          <button type="button" className="btn btn-block btn-primary form-submit-button" onClick={handleSubmission} >
            <FormattedMessage
              defaultMessage='Save'
              description='Profile save button'
            />
          </button>
        </div>
      </div>
    </div>
    { modalVisible
     && <Modal
      modalClass='errorModal'
      customClass={'curved'}
      modalVisible={modalVisible}
      options={{
        keyboard: false,
        backdrop: 'static',
      }} >
      <div className="container">
        <p className='text-center my-5'>
          <FormattedMessage
            defaultMessage='Something went wrong. Please try again'
            description='error modal'
          />
        </p>
      </div>
      <button
        className='btn btn-block btn-primary'
        onClick={() => { window.location.reload(); }} >
        <FormattedMessage
          defaultMessage='Try again'
          description='try again btn'
        />
      </button>
    </Modal>
    }
    { showUpdatedModal && <Modal modalClass={'profileSuccessModal'} customClass={'curved'} modalVisible={showUpdatedModal} onHidden={() => setShowUpdatedModal(false)}>
      <div className="container">
        <p className='text-center my-5'>
          <FormattedMessage
            defaultMessage='Profile updated successfully'
            description='success modal'
          />
        </p>
      </div>
      <button
        className='btn btn-block btn-primary'
        onClick={onProfileUpdated}
        >
        <FormattedMessage
          defaultMessage='Ok'
          description='confirm btn'
        />
      </button>
    </Modal>}
  </>;
};

export default Profile;
