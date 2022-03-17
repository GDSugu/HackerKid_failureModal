import React from 'react';
import { FormattedMessage } from 'react-intl';
import { $, pageInit, validate } from '../framework';
import { useProfileInfo } from '../../../../hooks/pages/profile';
import '../../../stylesheets/common/pages/profile/style.scss';
import ErrorModal from '../components/ErrorModal';

const setImage = (e) => {
  const profileImg = e.target.files[0];
  const profileImgPath = URL.createObjectURL(profileImg);
  document.querySelector('.profile-img img').src = profileImgPath;
};

const validateField = (key, target) => {
  let result = false;
  const { value } = target;
  try {
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
      default: break;
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
  pageInit('profile-container', 'Profile');

  const { state, setState } = useProfileInfo();

  if (state.status === 'error') {
    return <ErrorModal />;
  }

  const handleStateChange = (key, target) => {
    // const val = validate(target, 'name', 1, `#${key}~small`, warnmsg);
    // if (!val) return;
    const { status, value } = validateField(key, target);
    // const { value } = target;
    if (status) {
      $(`#${key}~small`).html('');
      $(`#${key}`).removeClass('is-invalid');
    }
    setState((prevState) => ({ ...prevState, [key]: value }));
  };

  const {
    about,
    grade,
    name,
    profileImage,
    // school,
    // uniqueUrl,
  } = state;

  return <>
    <div className="profile-cntnr col-md-6 col-lg-5 col-xxl-4 mx-auto">
      <div className="profile-edit-form">
        <div className="profile-img-container">
          <div className="profile-img">
            <img src={profileImage || '../../../../images/profile/default_user.png'} alt="Profile image" />
          </div>
          <div className="profile-edit-btn">
            <label htmlFor="upload-btn">
              <img src="../../../../images/profile/profile-edit.png" alt="Edit Profile" />
              <input type="file" accept='image/*' name="upload-btn" id="upload-btn" onChange={setImage} />
            </label>
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
          {/* <div className="form-group">
            <label htmlFor="parentEmail">
              <FormattedMessage
                defaultMessage="Parent's Email"
                description='Profile email label'
              />
            </label>
            <input type="email" className="form-control" name="parentEmail" id="parentEmail"
            aria-describedby="Parent email input Field" placeholder="Parent email address"
            onChange={(e) => handleStateChange('parentEmail', e.target)} />
            <small className="form-text text-danger"></small>
          </div> */}
          {/* <div className="form-group">
            <label htmlFor="parentPhone">
              <FormattedMessage
                defaultMessage='Phone'
                description='Profile phone label'
              />
            </label>
            <input type="number" className="form-control" name="parentPhone" id="parentPhone"
            aria-describedby="parent phone input Field" placeholder="Parent phone number" />
            <small className="form-text text-danger"></small>
          </div> */}
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
          <button type="button" className="btn btn-block btn-primary form-submit-button">
            <FormattedMessage
              defaultMessage='Save'
              description='Profile save button'
            />
          </button>
        </div>
      </div>
    </div>
  </>;
};

export default Profile;
