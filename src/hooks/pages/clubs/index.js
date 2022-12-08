import React from 'react';
import post, { validateField } from '../../common/framework';
import API from '../../../../env';
import useRootPageState from '../root';

const useClubs = ({ isPageMounted }) => {
  const [clubDataState, setClubDataState] = React.useState({
    appData: {
      showClub: null,
      clubInfoEdited: false,
    },
    inviteLink: '',
    acceptClubInviteResponse: { status: false },
    autoCompleteResponse: { status: false, users: false },
    changeRoleResponse: { status: false },
    clubDashboardResponse: {
      status: false,
      hasClub: false,
      clubList: false,
      clubData: false,
      topMembers: false,
    },
    clubInviteResponse: { status: false, clubInvites: false },
    clubListResponse: { status: false, clubList: false },
    clubData: {
      clubName: false,
      country: false,
      state: false,
      s3Prefix: API.S3PREFIX,
      clubImageName: false,
      members: false,
    },
    clubInfoResponse: {
      status: false,
      clubData: false,
      adminList: false,
      applicantList: false,
      memberList: false,
      userData: false,
    },
    createClubResponse: {
      status: false,
      clubId: false,
      signedURL: false,
    },
    deleteClubResponse: { status: false },
    joinClubResponse: { status: false, clubId: false },
    kickOutMemberResponse: { status: false },
    leaveClubResponse: { status: false },
    memberInfoResponse: { status: false, userData: false },
    membersListResponse: {
      status: false,
      adminList: false,
      applicantList: false,
      membersList: false,
      userInfo: false,
    },
    rejectClubInviteResponse: { status: false },
    sendInviteResponse: { status: false },
    updateClubInfoResponse: { status: false },
  });

  const { state: { device } } = useRootPageState();

  const setAppData = (fieldName, value) => {
    setClubDataState((prevState) => ({
      ...prevState,
      appData: {
        ...prevState.appData,
        [fieldName]: value,
      },
    }));
  };

  const setInviteLink = ({ link }) => {
    setClubDataState((prevData) => ({
      ...prevData,
      inviteLink: link,
    }));
  };

  const editFields = ({ fieldName, value, clubAction = 'create' }) => {
    let validatedResult = false;
    if (clubAction === 'update') {
      if (
        clubDataState.clubInfoResponse.clubData[fieldName] === value
      ) {
        return validatedResult;
      }
    }
    switch (fieldName) {
      case 'clubName':
        validatedResult = validateField('name', value, { min: 4, max: 60 });
        break;
      case 'country':
        if (value !== 'false') {
          validatedResult = validateField('word', value, { min: 3, max: 60 });
        } else {
          validatedResult = false;
        }
        break;
      case 'state':
        if (value !== 'false') {
          validatedResult = validateField('word', value, { min: 3, max: 60 });
        } else {
          validatedResult = false;
        }
        break;
      default: break;
    }
    const newState = {};
    if (clubAction === 'create') {
      newState.clubData = {
        ...clubDataState.clubData,
        [fieldName]: value,
      };
    } else if (clubAction === 'update') {
      newState.clubInfoResponse = {
        ...clubDataState.clubInfoResponse,
        clubData: {
          ...clubDataState.clubInfoResponse.clubData,
          [fieldName]: value,
        },
      };
      newState.appData = {
        ...clubDataState.appData,
        clubInfoEdited: true,
      };
    }
    setClubDataState((prevData) => ({
      ...prevData,
      ...newState,
    }));
    return validatedResult;
  };

  const setClubImage = ({ clubImage, clubAction = 'create' }) => {
    const newState = {};
    const nameArry = clubImage.name.split('.');
    const ext = nameArry[nameArry.length - 1];
    if (clubAction === 'create') {
      newState.clubData = {
        ...clubDataState.clubData,
        clubImage,
        clubImageName: `${clubDataState.clubInfoResponse.clubData.clubId}.${ext}`,
      };
    } else if (clubAction === 'update') {
      newState.clubInfoResponse = {
        ...clubDataState.clubInfoResponse,
        clubData: {
          clubImage,
          clubImageName: `${clubDataState.clubInfoResponse.clubData.clubId}.${ext}`,
        },
      };
      newState.appData = {
        ...clubDataState.appData,
        clubInfoEdited: true,
      };
    }
    setClubDataState((prevData) => ({
      ...prevData,
      ...newState,
    }));
  };

  const acceptClubInvite = async ({ username }) => {
    const payload = {
      type: 'acceptClubInvite',
      clubName: clubDataState.clubInfoResponse.clubData?.clubName,
      username,
    };

    return post(payload, 'clubs/')
      .then((response) => {
        if (isPageMounted.current) {
          if (response === 'access_denied') {
            setClubDataState((prevData) => ({
              ...prevData,
              acceptClubInviteResponse: {
                status: 'access_denied',
              },
            }));
          } else {
            const parsedResponse = JSON.parse(response);
            const newState = {
              acceptClubInviteResponse: {
                status: parsedResponse.status,
              },
            };
            const member = clubDataState.clubInfoResponse.applicantList
              .find((user) => user.unique_url === username);
            const applicantArry = clubDataState.clubInfoResponse.applicantList
              .filter((user) => user.unique_url !== username);
            const memberArry = clubDataState.clubInfoResponse.memberList;
            memberArry.push(member);
            if (parsedResponse.status === 'success') {
              newState.clubInfoResponse = {
                ...clubDataState.clubInfoResponse,
                applicantList: applicantArry,
                memberList: memberArry,
              };
            }
            setClubDataState((prevData) => ({
              ...prevData,
              ...newState,
            }));
          }
        }
      });
  };

  const addMemberToClub = async ({ userName, isNotHKUser = false }) => {
    const status = { status: 'success' };
    try {
      let membersArray = clubDataState.clubData.members;
      let validatedResult = false;
      if (isNotHKUser) {
        validatedResult = validateField('email', userName);
        if (!validatedResult.status) {
          throw new Error('Invalid email');
        }
      }
      const member = clubDataState
        .autoCompleteResponse
        .users.find((user) => user.userName === userName);
      if (!membersArray) {
        membersArray = [];
      }
      const isMemberAlreadyAdded = membersArray.find((user) => user.userName === userName);
      if (!isMemberAlreadyAdded) {
        membersArray.push(member);
        setClubDataState((prevState) => ({
          ...prevState,
          clubData: {
            ...prevState.clubData,
            members: membersArray,
          },
        }));
      } else {
        status.status = 'error';
        status.message = 'Invitation already sent';
      }
    } catch (error) {
      status.status = 'error';
      status.message = error.message;
    }
    return status;
  };

  const clearMembersList = () => {
    setClubDataState((prevState) => ({
      ...prevState,
      clubData: {
        ...prevState.clubData,
        members: [],
      },
    }));
  };

  const autoCompleteUser = async ({ userName }) => {
    const payload = {
      type: 'fetchUserData',
      userName,
    };

    return post(payload, 'clubs/')
      .then((response) => {
        let status = false;
        if (isPageMounted.current) {
          if (response === 'access_denied') {
            setClubDataState((prevData) => ({
              ...prevData,
              autoCompleteResponse: {
                status: 'access_denied',
              },
            }));
          } else {
            const parsedResponse = JSON.parse(response);
            if (parsedResponse.status === 'success') {
              parsedResponse?.users?.unshift({
                userName,
                name: userName,
                email: userName,
                isNotHKUser: true,
              });
            }
            setClubDataState((prevData) => ({
              ...prevData,
              autoCompleteResponse: {
                ...parsedResponse,
              },
            }));
          }
          status = response;
        }
        return status;
      });
  };

  const changeRole = async ({ userid, role }) => {
    const payload = {
      type: 'changeRole',
      clubName: clubDataState.clubDashboardResponse.clubData.clubName,
      userid,
      role,
    };

    return post(payload, 'clubs/')
      .then((response) => {
        if (isPageMounted.current) {
          if (response === 'access_denied') {
            setClubDataState((prevData) => ({
              ...prevData,
              changeRoleResponse: {
                status: 'access_denied',
              },
            }));
          } else {
            const parsedResponse = JSON.parse(response);
            const newState = {
              changeRoleResponse: {
                ...parsedResponse,
              },
            };
            if (parsedResponse.status === 'success') {
              let member = {};
              if (role === 'admin') {
                member = clubDataState.clubInfoResponse
                  .memberList.find((user) => user.unique_url === userid);
                if (member) {
                  member.role = 'admin';
                  const membersArray = clubDataState.clubInfoResponse.memberList
                    .filter((user) => user.unique_url !== userid);
                  const adminArray = clubDataState.clubInfoResponse.adminList;
                  adminArray.push(member);
                  newState.clubInfoResponse = {
                    ...clubDataState.clubInfoResponse,
                    memberList: membersArray,
                    adminList: adminArray,
                  };
                }
              } else if (role === 'member') {
                member = clubDataState.clubInfoResponse
                  .adminList.find((user) => user.unique_url === userid);
                if (member) {
                  member.role = 'member';
                  const adminArray = clubDataState.clubInfoResponse.adminList
                    .filter((user) => user.unique_url !== userid);
                  const membersArray = clubDataState.clubInfoResponse.memberList;
                  membersArray.push(member);
                  newState.clubInfoResponse = {
                    ...clubDataState.clubInfoResponse,
                    memberList: membersArray,
                    adminList: adminArray,
                  };
                }
              }
              if (userid === clubDataState.clubInfoResponse.userData.unique_url) {
                newState.clubInfoResponse.userData = {
                  ...clubDataState.clubInfoResponse.userData,
                  role,
                };
              }
            }
            setClubDataState((prevData) => ({
              ...prevData,
              // changeRoleResponse: {
              //   ...parsedResponse,
              // },
              ...newState,
            }));
          }
        }
      });
  };

  const createClub = async ({ page }) => {
    const payload = {
      type: 'createClub',
      platform: device,
      ...clubDataState.clubData,
    };

    if (device === 'desktop') {
      payload.page = page;
    }

    return post(payload, 'clubs/')
      .then((response) => {
        if (isPageMounted.current) {
          if (response === 'access_denied') {
            setClubDataState((prevData) => ({
              ...prevData,
              createClubResponse: {
                status: 'access_denied',
              },
            }));
          } else {
            const parsedResponse = JSON.parse(response);
            setClubDataState((prevData) => ({
              ...prevData,
              createClubResponse: {
                ...parsedResponse,
              },
            }));
          }
        }
      });
  };

  const deleteClub = async () => {
    const payload = {
      type: 'deleteClub',
      clubName: clubDataState.clubData.clubName,
    };

    return post(payload, 'clubs/')
      .then((response) => {
        if (isPageMounted.current) {
          if (response === 'access_denied') {
            setClubDataState((prevData) => ({
              ...prevData,
              deleteClubResponse: {
                status: 'access_denied',
              },
            }));
          } else {
            const parsedResponse = JSON.parse(response);
            setClubDataState((prevData) => ({
              ...prevData,
              deleteClubResponse: {
                ...parsedResponse,
              },
            }));
          }
        }
      });
  };

  const fetchClubList = async () => {
    const payload = {
      type: 'getClubList',
      platform: device,
    };

    post(payload, 'clubs/')
      .then((response) => {
        if (isPageMounted.current) {
          if (response === 'access_denied') {
            setClubDataState((prevData) => ({
              ...prevData,
              clubListResponse: {
                status: 'access_denied',
              },
            }));
          } else {
            const parsedResponse = JSON.parse(response);
            setClubDataState((prevData) => ({
              ...prevData,
              clubListResponse: {
                ...parsedResponse,
              },
            }));
          }
        }
      });
  };

  const getClubInvites = async () => {
    const payload = {
      type: 'getClubInvites',
    };

    return post(payload, 'clubs/')
      .then((response) => {
        if (isPageMounted.current) {
          if (response === 'access_denied') {
            setClubDataState((prevData) => ({
              ...prevData,
              clubInviteResponse: {
                status: 'access_denied',
              },
            }));
          } else {
            const parsedResponse = JSON.parse(response);
            setClubDataState((prevData) => ({
              ...prevData,
              clubInviteResponse: {
                ...parsedResponse,
              },
            }));
          }
        }
      });
  };

  const getClubInfo = async () => {
    const payload = {
      type: 'getClubInfo',
    };

    return post(payload, 'clubs/')
      .then((response) => {
        if (isPageMounted.current) {
          if (response === 'access_denied') {
            setClubDataState((prevData) => ({
              ...prevData,
              clubInfoResponse: {
                status: 'access_denied',
              },
            }));
          } else {
            const parsedResponse = JSON.parse(response);
            setClubDataState((prevData) => ({
              ...prevData,
              clubInfoResponse: {
                ...parsedResponse,
              },
            }));
          }
        }
      });
  };

  const getClubDashboardData = async ({ isVisiting = false, clubId = '' }) => {
    const payload = {
      type: 'getClubDashboardData',
    };

    if (isVisiting) {
      payload.isVisiting = true;
      payload.clubId = clubId;
    }

    return post(payload, 'clubs/')
      .then((response) => {
        if (isPageMounted.current) {
          if (response === 'access_denied') {
            setClubDataState((prevData) => ({
              ...prevData,
              clubDashboardResponse: {
                status: 'access_denied',
              },
            }));
          } else {
            const parsedResponse = JSON.parse(response);
            setClubDataState((prevData) => ({
              ...prevData,
              clubDashboardResponse: {
                ...parsedResponse,
              },
            }));
          }
        }
      });
  };

  const getMemberInfo = async () => {
    const payload = {
      type: 'getMemberInfo',
      clubName: clubDataState.clubData.clubName,
    };

    return post(payload, 'clubs/')
      .then((response) => {
        if (isPageMounted.current) {
          if (response === 'access_denied') {
            setClubDataState((prevData) => ({
              ...prevData,
              memberInfoResponse: {
                status: 'access_denied',
              },
            }));
          } else {
            const parsedResponse = JSON.parse(response);
            setClubDataState((prevData) => ({
              ...prevData,
              memberInfoResponse: {
                ...parsedResponse,
              },
            }));
          }
        }
      });
  };

  const getMembersList = async () => {
    const payload = {
      type: 'getMembersList',
      clubName: clubDataState.clubData.clubName,
    };

    return post(payload, 'clubs/')
      .then((response) => {
        if (isPageMounted.current) {
          if (response === 'access_denied') {
            setClubDataState((prevData) => ({
              ...prevData,
              membersListResponse: {
                status: 'access_denied',
              },
            }));
          } else {
            const parsedResponse = JSON.parse(response);
            setClubDataState((prevData) => ({
              ...prevData,
              membersListResponse: {
                ...parsedResponse,
              },
            }));
          }
        }
      });
  };

  const joinClub = async ({ invitedBy, userEmail }) => {
    const payload = {
      type: 'joinClub',
      clubName: clubDataState.clubDashboardResponse.clubData.clubName,
      // dsd
    };

    if (invitedBy) {
      payload.invitedBy = invitedBy;
    }

    if (userEmail) {
      payload.userEmail = userEmail;
    }

    return post(payload, 'clubs/')
      .then((response) => {
        let result;
        if (isPageMounted.current) {
          if (response === 'access_denied') {
            setClubDataState((prevData) => ({
              ...prevData,
              joinClubResponse: {
                status: 'access_denied',
              },
            }));
            result = 'access_denied';
          } else {
            const parsedResponse = JSON.parse(response);
            setClubDataState((prevData) => ({
              ...prevData,
              joinClubResponse: {
                ...parsedResponse,
              },
            }));
            result = parsedResponse;
          }
        }
        return result;
      });
  };

  const kickOutMember = async ({ username }) => {
    const payload = {
      type: 'kickOutMember',
      clubName: clubDataState.clubInfoResponse.clubData.clubName,
      username,
    };

    return post(payload, 'clubs/')
      .then((response) => {
        if (isPageMounted.current) {
          if (response === 'access_denied') {
            setClubDataState((prevData) => ({
              ...prevData,
              kickOutMemberResponse: {
                status: 'access_denied',
              },
            }));
          } else {
            const parsedResponse = JSON.parse(response);
            const newState = {
              kickOutMemberResponse: {
                ...parsedResponse,
              },
            };
            if (parsedResponse.status === 'success') {
              // const member = clubDataState.clubInfoResponse.memberList
              //   .find((user) => user.unique_url === username);
              const membersArry = clubDataState.clubInfoResponse.memberList
                .filter((user) => user.unique_url !== username);
              newState.clubInfoResponse = {
                ...clubDataState.clubInfoResponse,
                memberList: membersArry,
              };
            }
            setClubDataState((prevData) => ({
              ...prevData,
              // kickOutMemberResponse: {
              //   ...parsedResponse,
              // },
              ...newState,
            }));
          }
        }
      });
  };

  const leaveClub = async () => {
    const payload = {
      type: 'leaveClub',
      clubName: clubDataState.clubDashboardResponse.clubData.clubName,
    };

    return post(payload, 'clubs/')
      .then((response) => {
        let res = false;
        if (isPageMounted.current) {
          if (response === 'access_denied') {
            setClubDataState((prevData) => ({
              ...prevData,
              leaveClubResponse: {
                status: 'access_denied',
              },
            }));
            res = 'access_denied';
          } else {
            const parsedResponse = JSON.parse(response);
            setClubDataState((prevData) => ({
              ...prevData,
              leaveClubResponse: {
                ...parsedResponse,
              },
            }));
            res = parsedResponse;
          }
        }
        return res;
      });
  };

  const rejectClubInvite = async ({ username }) => {
    const payload = {
      type: 'rejectClubInvite',
      clubName: clubDataState.clubInfoResponse.clubData.clubName,
      username,
    };

    return post(payload, 'clubs/')
      .then((response) => {
        let result = false;
        if (isPageMounted.current) {
          if (response === 'access_denied') {
            setClubDataState((prevData) => ({
              ...prevData,
              rejectClubInviteResponse: {
                status: 'access_denied',
              },
            }));
            result = 'access_denied';
          } else {
            const parsedResponse = JSON.parse(response);
            const newState = {
              rejectClubInviteResponse: {
                ...parsedResponse,
              },
            };
            if (parsedResponse.status === 'success') {
              const invitesArray = clubDataState.clubInfoResponse.applicantList
                .filter((user) => user.unique_url !== username);
              newState.clubInfoResponse = {
                ...clubDataState.clubInfoResponse,
                applicantList: invitesArray,
              };
            }
            setClubDataState((prevData) => ({
              ...prevData,
              // rejectClubInviteResponse: {
              //   ...parsedResponse,
              // },
              ...newState,
            }));
            result = parsedResponse;
          }
        }
        return result;
      });
  };

  const removeMember = ({ userName }) => {
    const membersArray = clubDataState.clubDashboardResponse.clubData.members;
    if (membersArray && membersArray?.length) {
      setClubDataState((prevState) => ({
        ...prevState,
        clubData: {
          ...prevState.clubData,
          members: membersArray.filter((member) => member.userName !== userName),
        },
      }));
    }
  };

  const sendInvite = async () => {
    const payload = {
      type: 'sendInvite',
      clubName: clubDataState.clubDashboardResponse.clubData.clubName,
      members: clubDataState.clubData.members,
    };

    return post(payload, 'clubs/')
      .then((response) => {
        let result = false;
        if (isPageMounted.current) {
          if (response === 'access_denied') {
            setClubDataState((prevData) => ({
              ...prevData,
              sendInviteResponse: {
                status: 'access_denied',
              },
            }));
            result = 'access_denied';
          } else {
            const parsedResponse = JSON.parse(response);
            setClubDataState((prevData) => ({
              ...prevData,
              sendInviteResponse: {
                ...parsedResponse,
              },
            }));
            result = parsedResponse;
          }
        }
        return result;
      });
  };

  const updateClubInfo = async () => {
    const payload = {
      type: 'updateClubInfo',
      clubName: clubDataState.clubInfoResponse.clubData.clubName,
      country: clubDataState.clubInfoResponse.clubData.country,
      state: clubDataState.clubInfoResponse.clubData.state,
    };

    return post(payload, 'clubs/')
      .then((response) => {
        if (isPageMounted.current) {
          if (response === 'access_denied') {
            setClubDataState((prevData) => ({
              ...prevData,
              updateClubInfoResponse: {
                status: 'access_denied',
              },
            }));
          } else {
            const parsedResponse = JSON.parse(response);
            setClubDataState((prevData) => ({
              ...prevData,
              updateClubInfoResponse: {
                ...parsedResponse,
              },
            }));
          }
        }
      });
  };

  return {
    state: clubDataState,
    setState: setClubDataState,
    static: {
      acceptClubInvite,
      addMemberToClub,
      autoCompleteUser,
      clearMembersList,
      changeRole,
      createClub,
      deleteClub,
      editFields,
      fetchClubList,
      getClubDashboardData,
      getClubInfo,
      getClubInvites,
      getMemberInfo,
      getMembersList,
      joinClub,
      kickOutMember,
      leaveClub,
      rejectClubInvite,
      removeMember,
      sendInvite,
      setAppData,
      setClubImage,
      setInviteLink,
      updateClubInfo,
    },
  };
};

const ClubContext = React.createContext();

export default null;

export {
  useClubs,
  ClubContext,
};
