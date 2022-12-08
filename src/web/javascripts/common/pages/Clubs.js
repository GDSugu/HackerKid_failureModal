import React, { memo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import '../../../stylesheets/common/pages/clubs/style.scss';
import {
  $, debounce, pageInit, pathNavigator,
} from '../framework';
import useRootPageState, { useGetSession } from '../../../../hooks/pages/root';
import { ClubContext, useClubs } from '../../../../hooks/pages/clubs';
import { useCountryStateCity } from '../../../../hooks/common/CountryStateCity';
import Img from '../components/Img';
import Modal from '../components/Modal';
import FragmentNavBar from '../components/FragmentNavBar';
import AutoCompleteInputBox from '../components/AutoCompleteInputBox';
import { ClubDashboardComponent } from '../components/ClubDashboardComponents';

const clubManagerData = {
  isFieldValidated: false,
  validatedResult: {
    clubName: false,
    country: false,
    state: false,
    members: true,
  },
};

const HeroContainer = ({
  clubLeaderBoard, isDesktop, session, onClubClick = () => {},
}) => {
  const [profileImg, setProfileImg] = React.useState('../../../../images/profile/default_user.png');

  if (Object.keys(session).length) {
    const profileImage = (session?.profileImage)
      ?.toString()
      ?.replace(/(updatedAt=(\d+))/g, `updatedAt=${Date.now() / 1000}`);

    fetch(profileImage)
      .then((response) => {
        if (response.status === 200) {
          setProfileImg(profileImage);
        }
      });
  }

  const handleCreateClub = () => {
    let elem = false;
    if (isDesktop) {
      elem = $('.create-club-modal');
    } else {
      window.history.pushState({}, '', window.location.pathname);
      elem = $('.create-club-mob-modal');
    }
    elem.modal('show');
  };

  const handleJoinClub = () => {
    let elem = false;
    if (isDesktop) {
      elem = $('.join-club-modal');
    } else {
      window.history.pushState({}, '', window.location.pathname);
      elem = $('.join-club-mob-modal');
    }
    elem.modal('show');
  };

  const onBackButtonEvent = () => {
    if (!isDesktop) {
      $('.join-club-mob-modal').modal('hide');
      $('.create-club-mob-modal').modal('hide');
    }
  };

  React.useEffect(() => {
    window.addEventListener('popstate', onBackButtonEvent);

    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);
    };
  }, [isDesktop]);

  return <>
    {
      (Object.keys(session).length)
      && <>
      {
        isDesktop
        && <>
          <div className="hero-card">
            <div className="hero-card-data col-6 col-sm-4">
              <div className="hero-card-img"
                style={(session?.profileImage)
                  ? { backgroundImage: `url(${profileImg})` }
                  : {}
              }></div>
              <div className="hero-card-data-content">
                <div className="hero-data">
                  <Img src='common/hkcoin.png' />
                  <p className='mb-0'>{`${session?.pointsEarned || 0} coins`}</p>
                </div>
                {/* <div className="hero-data">
                  <Img src='common/xp.svg' />
                  <p className='mb-0'>
                    <FormattedMessage
                      defaultMessage={`${12345 || 0} XP`}
                      description={'hk XP'}
                    />
                  </p>
                </div> */}
              </div>
            </div>
          <div className='hero-card-data col'>
            <div className="club-leaderboard-container">
              <div className="club-leaderboard-content">
                {
                  clubLeaderBoard.map((club, index) => <div key={index} className="club-leaderboard-row" onClick={() => onClubClick(club)}>
                  <div className="club-lb-rank">
                    <p className='mb-0'>
                      <FormattedMessage
                        defaultMessage={'#{rank}'}
                        description={'club leaderboard rank'}
                        values={{ rank: club.rank }}
                      />
                    </p>
                  </div>
                  <div className="club-lb-name">
                    <a href="#">
                      <div className="d-flex align-items-center">
                        {/* <picture>
                          <img src={club.clubImage} alt='Club Display Picture' />
                        </picture> */}
                        <Img
                          src={club.clubImage}
                          fallback={'clubs/club.png'}
                          alt='Club Display Picture'
                          local={false}
                        />
                        <p className='mb-0'>
                          <FormattedMessage
                            defaultMessage={'{name}'}
                            description={'club leaderboard name'}
                            values={{ name: club.clubName }}
                          />
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="club-lb-members">
                    <div className="d-flex align-items-center">
                      <picture>
                        <img src={'../../../../images/clubs/members.svg'} alt='Club members' />
                      </picture>
                      <p className='mb-0'>
                        <FormattedMessage
                          defaultMessage={'{membersCount}'}
                          description={'club members count'}
                          values={{ membersCount: club.membersCount }}
                        />
                      </p>
                    </div>
                  </div>
                </div>)
                }
              </div>
              <div className="btn-container d-flex align-items-center">
                <button className="btn btn-block btn-primary" onClick={handleJoinClub}>
                  <p className="mb-0">
                    <FormattedMessage
                      defaultMessage={'Join a club'}
                      description={'Join a club button'}
                    />
                  </p>
                </button>
                <button className="btn btn-block btn-primary" onClick={handleCreateClub}>
                  <div className="d-flex align-items-center justify-content-center">
                    <p className="mb-0">
                      <FormattedMessage
                        defaultMessage={'Create club'}
                        description={'Create a club button'}
                      />
                    </p>
                    <i className="fas fa-angle-right"></i>
                  </div>
                </button>
              </div>
            </div>
          </div>
          </div>
        </>
      }
      {
        !isDesktop
        && <>
          <div className="hero-no-club-card">
            <div className="hero-no-club-card-data">
              <p>
                <FormattedMessage
                  defaultMessage={'You are not a part of any club right now!'}
                  description={'Non club member text'}
                />
              </p>
            </div>
            <div className="hero-no-club-img">
              <picture>
                <img src={'../../../../images/clubs/no-club.svg'} alt={'You are not a part of any club'} />
              </picture>
            </div>
            <div className="btn-container d-flex align-items-center">
              <button className="btn btn-block btn-primary" onClick={handleJoinClub}>
                <p className="mb-0">
                  <FormattedMessage
                    defaultMessage={'Join a club'}
                    description={'Join a club button'}
                  />
                </p>
              </button>
              <button className="btn btn-block btn-primary" onClick={handleCreateClub}>
                <div className="d-flex align-items-center justify-content-center">
                  <p className="mb-0">
                    <FormattedMessage
                      defaultMessage={'Create club'}
                      description={'Create a club button'}
                    />
                  </p>
                  <i className="fas fa-angle-right"></i>
                </div>
              </button>
            </div>
          </div>
        </>
      }
      </>
    }
  </>;
};

const ClubListContainer = ({ clubList, isDesktop, onClubClick = () => {} }) => <>
  {
    isDesktop
    && <>
      <div className="no-club-message-card">
        <p className="mb-0">
          <FormattedMessage
            defaultMessage={'You are not a part of any club right now!'}
            description={'Non club member text'}
          />
        </p>
      </div>
    </>
  }
  <div className="browse-club-heading">
    <p>
      <FormattedMessage
        defaultMessage={'Browse clubs:'}
        description={'Browse clubs heading'}
      />
    </p>
    <div className="input-group">
      <div className="input-group-prepend">
        <i className="fas fa-search"></i>
      </div>
      <input type="text" className="form-control" placeholder="Search" />
    </div>
  </div>
  <div className="club-list">
    {
      clubList.map((club, index) => <div key={index}>
        <div className="club-card" onClick={() => onClubClick(club)}>
          <div className="club-card-img">
            <Img
              src={club.clubImage}
              fallback={'clubs/club.png'}
              alt='Club Display Picture'
              local={false}
            />
          </div>
          <div className="club-card-data">
            <div className="d-flex align-items-start justify-content-between">
              <div className="club-card-name">
                <p className='mb-0'>
                  <FormattedMessage
                    defaultMessage={'{name}'}
                    description={'club name'}
                    values={{ name: club.clubName }}
                  />
                </p>
              </div>
              <div className="club-card-rank">
                <p className='mb-0'>
                  <FormattedMessage
                    defaultMessage={'#{rank} rank'}
                    description={'club rank'}
                    values={{ rank: club.rank }}
                  />
                </p>
              </div>
            </div>
            <div className="d-flex align-items-end">
              <div className="col">
                <div className="d-flex align-items-center">
                  <Img
                    className='club-coin-img'
                    src={'common/hkcoin.png'}
                    fallback={'common/hkcoin.png'}
                    alt='HK Coin'
                  />
                  <p className='mb-0'>
                    <FormattedMessage
                      defaultMessage={'{coins}'}
                      description={'club coins'}
                      values={{ coins: club.clubPoints }}
                    />
                  </p>
                </div>
              </div>
              <div className="col">
                <div className="d-flex align-items-center">
                  <picture className='club-members-img'>
                    <img src={'../../../../images/clubs/members.svg'} alt='Club members' />
                  </picture>
                  <p className='mb-0'>
                    <FormattedMessage
                      defaultMessage={'{membersCount}'}
                      description={'club members count'}
                      values={{ membersCount: club.membersCount }}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>)
    }
  </div>
</>;

// const clubLeaderBoard = [{
//   clubName: 'Club 1',
//   rank: 1,
//   membersCount: 10,
//   clubImage: '../../../../images/clubs/club.png',
//   clubId: 'club-1',
//   clubPoints: 1234,
// }, {
//   clubName: 'Club 2',
//   rank: 2,
//   membersCount: 9,
//   clubImage: '../../../../images/clubs/club.png',
//   clubId: 'club-2',
//   clubPoints: 456,
// }, {
//   clubName: 'Club 3',
//   rank: 3,
//   membersCount: 1003,
//   clubImage: '../../../../images/clubs/club.png',
//   clubId: 'club-3',
//   clubPoints: 23,
// }];

// const clubList = JSON.parse(JSON.stringify(clubLeaderBoard));
// clubLeaderBoard.forEach((club, index) => {
//   clubList.push({
//     ...club,
//     rank: index + 4,
//   });
// });

const CreateClubStepContainer = () => {
  const [clubImageState, setClubImageState] = React.useState({
    profileImage: '../../../../images/clubs/club.svg',
    profileImageName: false,
  });

  // const isPageMounted = React.useRef(true);
  const membersAutoCompleteRef = React.useRef(null);
  const clubStep1Ref = React.useRef(false);
  const clubStep2Ref = React.useRef(false);
  const clubStep3Ref = React.useRef(false);

  const clubStepRef = [clubStep1Ref, clubStep2Ref, clubStep3Ref];
  const nextBtnRef = React.useRef(false);
  const prevBtnRef = React.useRef(false);
  const footerBtnRef = React.useRef(false);
  let currentStep = 0;

  // const {
  //   state: locationState, static: { fetchLocation },
  // } = useCountryStateCity({ isPageMounted });

  // const {
  //   state: { clubData, autoCompleteResponse },
  //   static: {
  //     addMemberToClub, autoCompleteUser, createClub, editFields, removeMember,
  //   },
  // } = useClubs({ isPageMounted });

  const clubContext = React.useContext(ClubContext);

  const {
    clubState: { clubData, autoCompleteResponse, inviteLink },
    clubStatic: {
      addMemberToClub, autoCompleteUser, createClub, editFields, removeMember,
    },
    locationState,
    locationStatic: { fetchLocation },
  } = clubContext;

  const {
    clubName, country, state, fileName, members,
  } = clubData;

  const checkFields = () => {
    let resStatus = false;
    clubManagerData.isFieldValidated = true;
    Object.keys(clubManagerData.validatedResult)
      .forEach((key) => {
        if (typeof clubManagerData.validatedResult[key] === 'object') {
          resStatus = clubManagerData.validatedResult[key].status;
        } else {
          resStatus = clubManagerData.validatedResult[key];
        }
        if (
          key === 'state'
          && locationState.stateResponse.states?.length === 0) {
          clubManagerData.validatedResult.state = true;
          resStatus = true;
        }
        clubManagerData.isFieldValidated &&= resStatus;
        if (!resStatus && key !== 'members') {
          $(`#${key}`).addClass('is-invalid');
        } else {
          $(`#${key}`).removeClass('is-invalid');
        }
      });
    if (!clubManagerData.isFieldValidated) {
      nextBtnRef.current.disabled = true;
      footerBtnRef.current.disabled = true;
    } else {
      nextBtnRef.current.disabled = false;
      footerBtnRef.current.disabled = false;
    }
  };

  const handleInput = ({ fieldName, value, type = 'clubInput' }) => {
    let result = false;
    const clubAction = 'create';
    if (type === 'locationInput') {
      fetchLocation({ locationType: 'state', country: value });
      result = editFields({ fieldName, value, clubAction });
    } else if (type === 'memberInput') {
      membersAutoCompleteRef.current.setLoadingState(true);
      debounce(() => {
        if (value?.length) {
          autoCompleteUser({ userName: value });
        } else {
          membersAutoCompleteRef.current.setLoadingState(false);
        }
      }, 1000);
      result = true;
    } else {
      result = editFields({ fieldName, value, clubAction });
    }
    clubManagerData.validatedResult[fieldName] = result;
    checkFields();
  };

  const handleSuggestionClick = (item) => {
    try {
      addMemberToClub({ userName: item.userName, isNotHKUser: item?.isNotHKUser })
        .then((res) => {
          if (res.status === 'error') {
            membersAutoCompleteRef.current.toggleErrorMsg('show', res.message);
            clubManagerData.validatedResult.members = false;
          } else {
            membersAutoCompleteRef.current.toggleErrorMsg('hide');
            clubManagerData.validatedResult.members = true;
          }
        });
    } catch (error) {
      console.log('suggestion error', error);
    }
  };

  const hideStep = (ref) => {
    const elemRef = ref;
    elemRef.current.style.display = 'none';
  };

  const showStep = (ref) => {
    const elemRef = ref;
    elemRef.current.style.display = 'block';
  };

  const handlePreviousClick = () => {
    if (currentStep !== 0) {
      prevBtnRef.current.style.visibility = 'visible';
      $(`.progress-bar.progress-${currentStep + 1}`).removeClass('completed');
      hideStep(clubStepRef[currentStep]);
      currentStep -= 1;
      showStep(clubStepRef[currentStep]);
      nextBtnRef.current.style.visibility = 'visible';
    }
    if (currentStep === 0) {
      prevBtnRef.current.style.visibility = 'hidden';
    }
  };

  const handleNextClick = () => {
    checkFields();
    if (clubManagerData.isFieldValidated) {
      if (currentStep !== 2) {
        nextBtnRef.current.style.visibility = 'visible';
        hideStep(clubStepRef[currentStep]);
        currentStep += 1;
        showStep(clubStepRef[currentStep]);
        prevBtnRef.current.style.visibility = 'visible';
        $(`.progress-bar.progress-${currentStep + 1}`).addClass('completed');
      }
      if (currentStep === 2) {
        nextBtnRef.current.style.visibility = 'hidden';
      }
    }
  };

  const handleFooterBtnClick = () => {
    checkFields();
    if (clubManagerData.isFieldValidated) {
      switch (currentStep) {
        case 0:
          handleNextClick();
          // store data in db
          // createClub({ page: 1 });
          footerBtnRef.current.innerHTML = 'Create Club';
          break;
        case 1:
          handleNextClick();
          // create club
          // createClub({ page: 2 });
          footerBtnRef.current.innerHTML = 'Visit Club';
          break;
        case 2:
          // close modal
          // refresh the page to get the club details
          break;
        default: break;
      }
    }
  };

  const setImage = (e) => {
    try {
      $('.club-image-upload small').html('');
      const profileImg = e.target.files[0];
      const twoMBInKB = 2097152;
      if (profileImg && (!['image/jpeg', 'image/png'].includes(profileImg.type) || profileImg.size > twoMBInKB)) {
        $('.club-image-upload small').html('Image format should be one of JPG or PNG with size less than 2MB');
        throw new Error('FIELDS_CHECK_FAILED');
      }
      setClubImageState({
        profileImage: profileImg,
        profileImageName: profileImg.name,
      });
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    hideStep(clubStepRef[1]);
    hideStep(clubStepRef[2]);
    fetchLocation({ locationType: 'country' });
  }, []);

  React.useEffect(() => {
    if (locationState.stateResponse.states) {
      clubManagerData.validatedResult.state = false;
      checkFields();
    }
  }, [locationState.stateResponse.states]);

  return <>
    <div className="create-club-container">
      <div className="club-step-container">
        {
          <>
            <div className="create-club-step-container step-container-1" ref={clubStepRef[0]}>
              <div className="form-group">
                <label htmlFor="clubName">
                  <FormattedMessage
                    defaultMessage={'Club Name'}
                    description={'club name label'}
                  />
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="clubName"
                  id="clubName"
                  aria-describedby="clubName"
                  placeholder="Club Name"
                  value={clubName || ''}
                  onChange={(e) => { handleInput({ fieldName: 'clubName', value: e.target.value }); }}
                  />
              </div>
              <div className="form-group">
                <label htmlFor="country">
                  <FormattedMessage
                    defaultMessage={'Country'}
                    description={'country label'}
                  />
                </label>
                <select
                  className="form-control"
                  name="country"
                  id="country"
                  value={country || ''}
                  onChange={(e) => {
                    handleInput({ fieldName: 'country', value: e.target.value, type: 'locationInput' });
                  }} >
                    <FormattedMessage
                      defaultMessage={'{countryName}'}
                      values={{ countryName: 'Select Country' }}
                      >
                      {(message) => <option value={false}>{message}</option>}
                    </FormattedMessage>
                  {
                    locationState.countryResponse.status === 'success'
                    && locationState.countryResponse.countries.map(
                      (countryName, idx) => <FormattedMessage
                        key={idx}
                        defaultMessage={'{countryName}'}
                        values={{ countryName }}
                        >
                        {(message) => <option value={countryName}>{message}</option>}
                      </FormattedMessage>,
                    )
                  }
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="state">
                  <FormattedMessage
                    defaultMessage={'State'}
                    description={'state label'}
                  />
                </label>
                <select
                  className="form-control"
                  name="state"
                  id="state"
                  value={state}
                  onChange={(e) => { handleInput({ fieldName: 'state', value: e.target.value }); }}
                  >
                  <FormattedMessage
                    defaultMessage={'{stateName}'}
                    values={{ stateName: 'Select State' }}
                    >
                    {(message) => <option value={false}>{message}</option>}
                  </FormattedMessage>
                  {
                    locationState.stateResponse.status === 'success'
                    && locationState.stateResponse.states.map(
                      (stateName, idx) => <FormattedMessage
                        key={idx}
                        defaultMessage={'{stateName}'}
                        values={{ stateName }}
                        >
                        {(message) => <option value={stateName}>{message}</option>}
                      </FormattedMessage>,
                    )
                  }
                </select>
              </div>
              <AutoCompleteInputBox
                ref={membersAutoCompleteRef}
                name="members"
                id="members"
                label={'Members'}
                placeholder={'Search members using their name, username or email'}
                list={autoCompleteResponse?.users}
                onInputChange={(e) => { handleInput({ fieldName: 'members', value: e.target.value, type: 'memberInput' }); }}
                onSuggestionClick={handleSuggestionClick}
                SuggesstionItem={({ item }) => <>
                  <div className={`d-flex align-items-center suggestion-card ${item?.isNotHKUser ? 'user-input' : ''}`} data-username={item?.userName?.toString()}>
                    {
                      !(item?.isNotHKUser)
                      && <div className="user-image">
                        <Img
                          src={item?.profileImage?.toString()}
                          alt={`${item?.name?.toString()} profile image`}
                          className="autocomplete-profileImage"
                          fallback='/profile/default_user.png'
                          local={false}
                        />
                      </div>
                    }
                    <div className="user-name">
                      <p className="mb-0">
                        <FormattedMessage
                          defaultMessage={'{name}'}
                          description={'user name'}
                          values={{
                            name: item?.name?.toString(),
                          }}
                        />
                      </p>
                    </div>
                  </div>
                </>}
              />
              {
                members
                && <>
                  <div className="members-container">
                    <ul className="list-unstyled mb-0">
                      {
                        members?.map((member, index) => <li key={index}>
                          <div className='member-card'>
                            <div className="d-flex align-items-center">
                              {
                                member
                                && !member.isNotHKUser
                                && member.userName
                                && <>
                                  <Img
                                    className='member-profile-image'
                                    src={member.profileImage}
                                    alt={'member profile image'}
                                    local={false}
                                    fallback={'../../../../images/profile/default_user.png'}
                                  />
                                </>
                              }
                              <p className="mb-0">
                                <FormattedMessage
                                  defaultMessage={'{memberName}'}
                                  description={'member name'}
                                  values={{
                                    memberName: member.name,
                                  }}
                                />
                              </p>
                            </div>
                            <button className="btn btn-transparent" onClick={() => { removeMember({ userName: member.userName }); }}>
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                        </li>)
                      }
                    </ul>
                  </div>
                </>
              }
            </div>
          </>
        }
        {
          <>
            <div className="create-club-step-container step-container-2" ref={clubStepRef[1]}>
              <p>
                <FormattedMessage
                  defaultMessage={'Choose a club display image'}
                  description={'club image label'}
                />
              </p>
              <div className="club-image-upload">
                <div className="club-image-container">
                  <div
                    className="club-display-picture"
                    style={{
                      backgroundImage: (
                        (clubImageState.profileImage
                        && typeof clubImageState.profileImage !== 'string')
                          ? `url(${URL.createObjectURL(clubImageState.profileImage)})`
                          : `url(${clubImageState.profileImage})`
                      ),
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                    }}
                  ></div>
                  <div className="image-edit-btn">
                    <label htmlFor="upload-btn">
                      <Img
                        src='profile/profile-edit.png'
                        alt='image edit icon'
                        local={true}
                        useSource={true}
                        className={'image-edit-icon'}
                      />
                      <input type="file" accept='image/*' name="upload-btn" id="upload-btn" onChange={setImage} />
                    </label>
                  </div>
                </div>
                <small className='form-text text-danger mt-2'></small>
              </div>
            </div>
          </>
        }
        {
          <>
            <div className="create-club-step-container step-container-3" ref={clubStepRef[2]}>
              <p>
                <FormattedMessage
                  defaultMessage={'All set!'}
                  description={'club created'}
                />
              </p>
              <div className="club-created-image">
                <Img
                  className='club-created-img'
                  src='clubs/club-created.svg'
                  alt='Club created image'
                />
              </div>
              <div className="form-group">
                <label htmlFor="clubLink">
                  <FormattedMessage
                    defaultMessage={'Invite Members with this link (Optional)'}
                    description={'club link input field'}
                  />
                </label>
                <div className="input-group">
                  <input type="text" className="form-control" readOnly name="clubLink" id="clubLink" aria-describedby="clubLink" placeholder="club link" value={inviteLink}/>
                  <div className="input-group-append">
                    {/* <Img
                      src='clubs/copy.svg'
                      className='copy-icon'
                      alt='copy icon'
                    /> */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#212527" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 4V16C8 16.5304 8.21071 17.0391 8.58579 17.4142C8.96086 17.7893 9.46957 18 10 18H18C18.5304 18 19.0391 17.7893 19.4142 17.4142C19.7893 17.0391 20 16.5304 20 16V7.242C20 6.97556 19.9467 6.71181 19.8433 6.46624C19.7399 6.22068 19.5885 5.99824 19.398 5.812L16.083 2.57C15.7094 2.20466 15.2076 2.00007 14.685 2H10C9.46957 2 8.96086 2.21071 8.58579 2.58579C8.21071 2.96086 8 3.46957 8 4V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 18V20C16 20.5304 15.7893 21.0391 15.4142 21.4142C15.0391 21.7893 14.5304 22 14 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V9C4 8.46957 4.21071 7.96086 4.58579 7.58579C4.96086 7.21071 5.46957 7 6 7H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      </div>
      <div className="club-step-footer">
        <button
          className="btn btn-transparent create-club-step-btn"
          onClick={handlePreviousClick}
          ref={prevBtnRef}
          style={{
            visibility: currentStep === 0 ? 'hidden' : 'visible',
          }}
          >
          <div className="d-flex align-items-center">
            <i className="fas fa-arrow-left mr-2"></i>
            <p className="mb-0">
              <FormattedMessage
                defaultMessage={'Previous'}
                description={'Previous btn'}
              />
            </p>
          </div>
        </button>
        <div className="progress-bar-container">
          <div className="progress-bar progress-1 completed"></div>
          <div className="progress-bar progress-2"></div>
          <div className="progress-bar progress-3"></div>
        </div>
        <button
          className="btn btn-transparent create-club-step-btn"
          onClick={handleNextClick}
          ref={nextBtnRef}
          style={{
            visibility: currentStep === 2 ? 'hidden' : 'visible',
          }}
          >
          <div className="d-flex align-items-center">
            <p className="mb-0">
              <FormattedMessage
                defaultMessage={'Next'}
                description={'Next btn'}
              />
            </p>
            <i className="fas fa-arrow-right ml-2"></i>
          </div>
        </button>
      </div>
    </div>
    <button className="btn btn-primary btn-block club-footer-btn" ref={footerBtnRef} onClick={handleFooterBtnClick}>
      <FormattedMessage
        defaultMessage={'Save & Proceed'}
        description={'save button'}
      />
    </button>
  </>;
};

const CreateClubContainer = () => {
  console.log();

  return <>
    <Modal
      modalClass='create-club-modal'
      customClass='curved'
      modalTitle='Create Club'
      options={{
        keyboard: false,
        backdrop: 'static',
      }}
      header = {
        <div>
          <h5 className="modal-title">
            <FormattedMessage
              defaultMessage={'Create Club'}
              description={'Create club modal title'}
            />
            </h5>
        </div>
      }>
        <CreateClubStepContainer />
    </Modal>
  </>;
};

const CreateClubMobContent = () => {
  const [clubImageState, setClubImageState] = React.useState({
    profileImage: '../../../../images/clubs/club.svg',
    profileImageName: false,
  });

  const setImage = (e) => {
    try {
      $('.club-image-upload small').html('');
      const profileImg = e.target.files[0];
      const twoMBInKB = 2097152;
      if (profileImg && (!['image/jpeg', 'image/png'].includes(profileImg.type) || profileImg.size > twoMBInKB)) {
        $('.club-image-upload small').html('Image format should be one of JPG or PNG with size less than 2MB');
        throw new Error('FIELDS_CHECK_FAILED');
      }
      setClubImageState({
        profileImage: profileImg,
        profileImageName: profileImg.name,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return <>
    <div className="club-image-upload">
      <div className="club-image-container">
        <div
          className="club-display-picture"
          style={{
            backgroundImage: (
              (clubImageState.profileImage
              && typeof clubImageState.profileImage !== 'string')
                ? `url(${URL.createObjectURL(clubImageState.profileImage)})`
                : `url(${clubImageState.profileImage})`
            ),
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="image-edit-btn">
          <label htmlFor="upload-btn">
            <Img
              src='profile/profile-edit.png'
              alt='image edit icon'
              local={true}
              useSource={true}
              className={'image-edit-icon'}
            />
            <input type="file" accept='image/*' name="upload-btn" id="upload-btn" onChange={setImage} />
          </label>
        </div>
      </div>
      <small className='form-text text-danger mt-2'></small>
    </div>
    <div className="form-group">
      <label htmlFor="clubName">
        <FormattedMessage
          defaultMessage={'Club Name'}
          description={'club name label'}
        />
      </label>
      <input type="text" className="form-control" name="clubName" id="clubName" aria-describedby="club Name" placeholder="Club Name"/>
    </div>
    <div className="form-group">
      <label htmlFor="country">
        <FormattedMessage
          defaultMessage={'Country'}
          description={'Country label'}
        />
      </label>
      <select className="form-control" name="country" id="country">
        <option>India</option>
        <option>US</option>
        <option>UK</option>
      </select>
    </div>
    <div className="form-group">
      <label htmlFor="state">
        <FormattedMessage
          defaultMessage={'State'}
          description={'State label'}
        />
      </label>
      <select className="form-control" name="state" id="state">
        <option>Tamil Nadu</option>
        <option>Kerala</option>
        <option>Karnataka</option>
      </select>
    </div>
    <div className="form-group">
      <label htmlFor="members">
        <FormattedMessage
          defaultMessage={'Members'}
          description={'Members label'}
        />
      </label>
      <input type="text" className="form-control" name="members" id="members" aria-describedby="Members" placeholder="Members"/>
    </div>
  </>;
};

const CreateClubMobContainer = () => {
  console.log();

  return <>
    <Modal
      modalClass={'create-club-mob-modal'}
      modalTitle={'Create Club'}
      options={{
        keyboard: false,
        backdrop: 'static',
      }}
      onHidden={() => { window.history.back(); }}
      header={
        <>
          <Link to='/'>
            <img className='logo-img' src='../../../../images/login/logo_H1.svg' alt='hackerkid logo' />
          </Link>
        </>
      }
    >
      <div className="create-club-modal-body-mob">
        <CreateClubMobContent />
      </div>
      <button type='text' className="btn btn-block btn-primary create-club-mob-btn">
        <FormattedMessage
          defaultMessage={'Create Club'}
          description={'create club button'}
        />
      </button>
    </Modal>
  </>;
};

const JoinClubContent = () => {
  const handleJoinClubBtn = () => {};

  return <>
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <a className="nav-link active" href="#linkBlock" data-toggle="tab" role="tab" aria-controls="linkBlock" aria-selected="true">
          <FormattedMessage
            defaultMessage={'Join with link'}
            description={'join tab'}
          />
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#inviteBlock" data-toggle="tab" role="tab" aria-controls='inviteBlock' aria-selected="false">
          <FormattedMessage
            defaultMessage={'Invites'}
            description={'invites tab'}
          />
        </a>
      </li>
    </ul>
    <div className="tab-content" id='#join-club-tabs'>
      <div className="tab-pane fade show active" id="linkBlock" role="tabpanel" aria-labelledby="linkBlock-tab">
        <div className="form-group mb-2">
          <label htmlFor="link">
            <FormattedMessage
              defaultMessage={'Link'}
              description={'description'}
            />
          </label>
          <input type="text" className="form-control" name="link" id="link" aria-describedby="clubLink" placeholder="Paste the invite link here" />
        </div>
        <button type="button" name="joinBtn" id="joinBtn" className="btn btn-primary btn-lg btn-block" onClick={handleJoinClubBtn}>
          <div className="d-flex align-items-center justify-content-between">
            <p className="mb-0">
              <FormattedMessage
                defaultMessage={'Join'}
                description={'join button'}
              />
            </p>
            <i className="fas fa-angle-right"></i>
          </div>
        </button>
      </div>
      <div className="tab-pane fade fade" id="inviteBlock" role="tabpanel" aria-labelledby="inviteBlock-tab">
        <div className="invites-list">
          {/* {
            clubList && clubList.length
            && clubList.map((club, index) => (
            <div key={index} className="invite-card">
              <div key={index} className="club-card">
                <div className="club-card-img">
                  <Img
                    src={club.clubImage}
                    fallback={'clubs/club.png'}
                    alt='Club Display Picture'
                    local={false}
                  />
                </div>
                <div className="club-card-data">
                  <div className="d-flex align-items-start justify-content-between">
                    <div className="club-card-name">
                      <p className='mb-0'>
                        <FormattedMessage
                          defaultMessage={'{name}'}
                          description={'club name'}
                          values={{ name: club.clubName }}
                        />
                      </p>
                    </div>
                    <div className="club-card-rank">
                      <p className='mb-0'>
                        <FormattedMessage
                          defaultMessage={'#{rank} rank'}
                          description={'club rank'}
                          values={{ rank: club.rank }}
                        />
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-end">
                    <div className="col">
                      <div className="d-flex align-items-center">
                        <Img
                          className='club-coin-img'
                          src={'common/hkcoin.png'}
                          fallback={'common/hkcoin.png'}
                          alt='HK Coin'
                        />
                        <p className='mb-0'>
                          <FormattedMessage
                            defaultMessage={'{coins}'}
                            description={'club coins'}
                            values={{ coins: club.clubPoints }}
                          />
                        </p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="d-flex align-items-center">
                        <picture className='club-members-img'>
                          <img src={'../../../../images/clubs/members.svg'} alt='Club members' />
                        </picture>
                        <p className='mb-0'>
                          <FormattedMessage
                            defaultMessage={'{membersCount}'}
                            description={'club members count'}
                            values={{ membersCount: club.membersCount }}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="invitee-details">
                <p className='mb-1'>
                  <FormattedMessage
                    defaultMessage={'Invited by {studentName}'}
                    description={'invitee name'}
                    values={{
                      studentName: 'student Name',
                    }}
                  />
                </p>
                <div className="d-flex align-items-center">
                  <button className="btn btn-transparent col">
                    <div className="d-flex align-items-center justify-content-center">
                      <i className="fas fa-xmark"></i>
                      <p className='mb-0'>
                        <FormattedMessage
                          defaultMessage={'Remove'}
                          description={'remove button'}
                        />
                      </p>
                    </div>
                  </button>
                  <button className="btn btn-transparent col">
                    <div className="d-flex align-items-center justify-content-center">
                      <i className="fas fa-check"></i>
                      <p className='mb-0'>
                        <FormattedMessage
                          defaultMessage={'Accept'}
                          description={'accept button'}
                        />
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            ))
          } */}
        </div>
      </div>
    </div>
  </>;
};

const JoinClubContainer = () => {
  console.log();

  return <>
    <Modal
      modalClass={'join-club-modal'}
      customClass={'curved'}
      modalTitle={'Join Club'}
      options={{
        keyboard: false,
        backdrop: 'static',
      }}
      header={
        <div>
          <h5 className='modal-title'>
            <FormattedMessage
              defaultMessage={'Join Club'}
              description={'join club modal title'}
            />
          </h5>
        </div>
      }
    >
      <div className="join-club-modal-body">
        <JoinClubContent />
      </div>
    </Modal>
  </>;
};

const JoinClubMobContainer = () => {
  console.log();
  return <>
    <Modal
      modalClass={'join-club-mob-modal'}
      modalTitle={'Join Club'}
      onHidden={() => { window.history.back(); }}
      options={{
        keyboard: false,
        backdrop: 'static',
      }}
      header={
        <>
          <Link to='/'>
            <img className='logo-img' src='../../../../images/login/logo_H1.svg' alt='hackerkid logo' />
          </Link>
        </>
      }
    >
      <div className="join-club-modal-body-mob">
        <JoinClubContent />
      </div>
    </Modal>
  </>;
};

const HeroComponent = memo(HeroContainer);
const ClubListComponent = memo(ClubListContainer);

const CreateClubComponent = ({ isDesktop }) => {
  console.log();
  return <>
    {
      isDesktop
      && <>
        <CreateClubContainer />
      </>
    }
    {
      !isDesktop
      && <>
        <CreateClubMobContainer />
      </>
    }
  </>;
};

const JoinClubComponent = ({ isDesktop }) => {
  console.log();
  return <>
    {
      isDesktop
      && <>
        <JoinClubContainer />
      </>
    }
    {
      !isDesktop
      && <>
        <JoinClubMobContainer />
      </>
    }
  </>;
};

const ClubHomeComponent = ({ clubList }) => {
  const isPageMounted = React.useRef(true);
  const { state: rootPageState } = useRootPageState();
  const clubContext = React.useContext(ClubContext);
  const { sessionState } = clubContext;

  const handleClubAction = (club) => {
    pathNavigator(`clubs/${club.clubId}/`);
  };

  React.useEffect(() => {
    console.log();

    return () => {
      isPageMounted.current = false;
    };
  }, []);

  return <>
    <HeroComponent
      clubLeaderBoard={clubList.slice(0, 3)}
      session={sessionState}
      isDesktop={rootPageState.device === 'desktop'}
      onClubClick={handleClubAction}
    />
    <ClubListComponent
      clubList={clubList}
      isDesktop={rootPageState.device === 'desktop'}
      onClubClick={handleClubAction}
    />
    <CreateClubComponent
      isDesktop={rootPageState.device === 'desktop'}
    />
    <JoinClubComponent
      isDesktop={rootPageState.device === 'desktop'}
    />
  </>;
};

const Clubs = () => {
  pageInit('clubs-container', 'Clubs');

  const isPageMounted = React.useRef(true);
  const {
    state: clubState,
    static: clubStatic,
  } = useClubs({ isPageMounted });
  const {
    state: locationState,
    static: locationStatic,
  } = useCountryStateCity({ isPageMounted });
  const { state: rootPageState } = useRootPageState();
  const { session: sessionState } = useGetSession({ isPageMounted });
  const params = new URLSearchParams(window.location.search);

  console.log('params', params);

  const { appData, clubDashboardResponse } = clubState;
  const { showClub } = appData;
  const {
    getClubDashboardData, joinClub, leaveClub, setAppData, setInviteLink,
  } = clubStatic;

  const {
    hasClub,
    clubData,
    clubList,
    status: clubDashboardStatus,
  } = clubDashboardResponse;

  let clubId = '';
  const urlData = {
    clubId: false,
    action: params.get('action'),
    invitedByUserName: params.get('invitedBy'),
    userEmail: params.get('userEmail'),
  };

  const toggleMobNavBar = () => {
    if (rootPageState.device === 'mobile') {
      $('nav:not(.fragment-nav-bar)').css('display', 'none');
    } else if (rootPageState.device === 'desktop') {
      $('nav.fragment-nav-bar').css('display', 'none');
    }
  };

  React.useEffect(() => {
    toggleMobNavBar();
    const locationArray = window.location.href.split('/').filter((el) => el !== '');
    if (locationArray.length > 3) {
      [, , , clubId] = locationArray;

      // setHasClub(true);
      urlData.clubId = clubId;
      getClubDashboardData({ clubId, isVisiting: true });
      setAppData('showClub', true);
    } else {
      getClubDashboardData({});
    }
    return () => {
      isPageMounted.current = false;
    };
  }, []);

  React.useEffect(() => {
    if (sessionState) {
      const link = `${window.location.origin}/clubs/?action=join&invitedBy=${sessionState?.unique_url}/`;
      setInviteLink({ link });
    }
  }, [sessionState]);

  React.useEffect(() => {
    if (clubDashboardStatus) {
      // if (hasClub || clubDashboardResponse?.isVisitor) {
      //   setAppData('showClub', true);
      // }
      // if (!clubDashboardResponse?.isVisitor) {
      //   setAppData('showClub', false);
      // }
      if (clubData) {
        setAppData('showClub', true);
        if (window.location.pathname === '/clubs/' || window.location.pathname === '/clubs') {
          window.history.replaceState({}, '', `/clubs/${clubData?.clubId}/`);
        }

        if (urlData.action === 'join' && urlData.invitedByUserName && urlData.userEmail) {
          joinClub({
            invitedBy: urlData.invitedByUserName,
            userEmail: urlData.userEmail,
          })
            .then((resp) => {
              if (resp !== 'access_denied') {
                if (resp.status === 'error') {
                  alert(resp.message);
                } else if (resp.status === 'success') {
                  getClubDashboardData({});
                }
              }
              window.history.replaceState({}, '', `/clubs/${clubData?.clubId}/`);
            });
        }
      }

      if (clubList) {
        setAppData('showClub', false);
        window.history.replaceState({}, '', '/clubs/');
      }
    }
  }, [clubDashboardResponse]);

  return <>
  <ClubContext.Provider
    value={{
      clubState,
      sessionState,
      clubStatic,
      locationState,
      locationStatic,
    }}
  >
    <FragmentNavBar />
    <div className='club-block col-12 col-md-11 col-xl-10 mx-auto'>
      {
        clubDashboardStatus && <>
        {
          showClub !== null
          && <>
            { !showClub
              && <>
              <ClubHomeComponent clubList={clubList}/>
            </>}
            { showClub
              && <>
              <ClubDashboardComponent
                // clubDashboardData={clubDashboardResponse}
                // getClubDashboardData={getClubDashboardData}
                // joinClub={joinClub}
                // leaveClub={leaveClub}
                />
            </> }
          </>
        }
        </>
      }
    </div>
  </ClubContext.Provider>
  </>;
};

export default Clubs;
