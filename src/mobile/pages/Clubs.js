import React, { memo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  // FlatList,
  Image,
  ImageBackground,
  ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useCountryStateCity } from '../../hooks/common/CountryStateCity';
import { ClubContext, useClubs } from '../../hooks/pages/clubs';
import { useGetSession } from '../../hooks/pages/root';
import { font as fonts } from '../components/config';
import { Red, utilColors as utColors, Yellow } from '../../colors/_colors';
import Tab from '../components/TabComponent';
import Icon from '../common/Icons';
import ThemeContext from '../components/theme';
import dashboardHero from '../../images/dashboard/dashboard-hero-bg-mobile.png';
import hkcoin from '../../images/common/hkcoin.png';
import xpPoints from '../../images/common/xp.png';
import RankUpwards from '../../images/clubs/rank-upwards.svg';
import defaultClubImage from '../../images/clubs/club.png';
import defaultUser from '../../images/profile/default_user.png';
import FeedAchievementSVG from '../../images/clubs/feed-achievement-icon.svg';
import CrossMarkSVG from '../../images/common/cross-mark.svg';
import CheckMarkSVG from '../../images/common/check-mark.svg';
import StarSVG from '../../images/clubs/star.svg';

const getStyles = (theme, font, utilColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bodyBg,
  },
  skeletonCard: {
    width: '95%',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 16,
  },
  bodyCard: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  heroCard: {
    borderRadius: 12,
    shadowColor: `${utilColors.shadowColor1}25`,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 16,
    shadowOpacity: 0,
    overflow: 'hidden',
    backgroundColor: utilColors.white,
    height: 160,
  },
  heroCardImageBg: {
    height: '100%',
    width: '100%',
    backgroundColor: utilColors.white,
  },
  heroCardContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  heroCardBlock1: {
    width: '60%',
    height: '100%',
    justifyContent: 'center',
  },
  heroCardBlock2: {
    width: '40%',
    height: '100%',
    justifyContent: 'center',
  },
  heroBlockDataContainer: {
    width: 110,
    height: '100%',
    justifyContent: 'center',
  },
  heroCardImage: {
    width: 84,
    height: 84,
    left: '-15%',
    bottom: '-15%',
    alignSelf: 'center',
    borderRadius: 100,
  },
  heroCardText: {
    ...font.body,
    color: utilColors.dark,
    marginLeft: 8,
  },
  heroCardDataIcon: {
    width: 32,
    height: 32,
  },
  heroCardDataBlock: {
    marginVertical: 4,
  },
  bodyCardContentTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  clubTitleText: {
    ...font.heading5,
    color: utilColors.dark,
    // marginVertical: 4,
    marginTop: 2,
  },
  tabButton: {
    padding: 16,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: theme.loginTabInactiveBorder,
  },
  tabButtonActive: {
    padding: 16,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: theme.fadedBtnTextColor,
  },
  tabButtonText: {
    ...font.subtitleBold,
    color: utilColors.dark,
  },
  tabButtonActiveText: {
    ...font.subtitleBold,
    color: theme.fadedBtnTextColor,
  },
  feedCard: {
    backgroundColor: utilColors.white,
    borderRadius: 12,
    marginVertical: 6,
  },
  feedTitleCardImage: {
    width: 42,
    height: 42,
    alignSelf: 'center',
    borderRadius: 100,
  },
  feedTitleCardText: {
    ...font.subtitle2,
    color: utilColors.dark,
  },
  feedCardHeader: {
    backgroundColor: utilColors.bg3,
  },
  feedContentImage: {
    width: 48,
    height: 48,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 12,
  },
  feedContentText: {
    ...font.subtitle2,
    color: utilColors.dark,
    alignSelf: 'center',
    padding: 8,
  },
  leaderBoardSortBtn: {
    backgroundColor: utilColors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Yellow.color400,
  },
  leaderBoardSortBtnText: {
    ...font.subtitle2,
    color: utilColors.lightGrey,
  },
  leaderBoardMemberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    borderRadius: 12,
  },
  leaderBoardCurrentMemberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    borderRadius: 12,
    backgroundColor: theme.leaderBoardHighlightEntryColor,
  },
  leaderBoardMemberImage: {
    width: 52,
    height: 52,
    borderRadius: 100,
    alignSelf: 'center',
  },
  formGroup: {
    marginBottom: 4,
  },
  inputTextBox: {
    borderWidth: 1,
    borderColor: theme.inputBorderColor,
    backgroundColor: utilColors.white,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    ...font.bodyBold,
  },
  inputLabel: {
    ...font.bodyBold,
    marginBottom: 4,
    color: utilColors.dark,
  },
});

const utilStyles = StyleSheet.create({
  scale15: {
    transform: [
      {
        scale: 1.5,
      },
    ],
  },
  marginL4: {
    marginLeft: 4,
  },
  marginL8: {
    marginLeft: 8,
  },
  marginT8: {
    marginTop: 8,
  },
  marginL12: {
    marginLeft: 12,
  },
  marginL16: {
    marginLeft: 16,
  },
  marginL20: {
    marginLeft: 20,
  },
  marginR10: {
    marginRight: 10,
  },
  marginV16: {
    marginVertical: 16,
  },
  marginV4: {
    marginVertical: 4,
  },
  marginB100: {
    marginBottom: 90,
  },
  paddingV4: {
    paddingVertical: 4,
  },
  paddingH4: {
    paddingHorizontal: 4,
  },
  paddingV8: {
    paddingVertical: 8,
  },
  paddingH8: {
    paddingHorizontal: 8,
  },
  paddingH12: {
    paddingHorizontal: 12,
  },
  paddingV12: {
    paddingVertical: 12,
  },
  padding20: {
    padding: 20,
  },
  br12: {
    borderRadius: 12,
  },
  hide: {
    visibility: 'hidden',
  },
  show: {
    visibility: 'visible',
  },
  flex1: {
    flexGrow: 1,
    flexShrink: 1,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  adminWarningBanner: {
    backgroundColor: Red.color50,
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminWarningInfoCircle: {
    borderRadius: 100,
    backgroundColor: Red.color500,
    paddingHorizontal: 2,
    paddingVertical: 12,
  },
  adminWarningInfoText: {
    ...fonts.subtitle1,
    color: utColors.white,
  },
  adminWarningText: {
    ...fonts.subtitle2,
    color: utColors.dark,
  },
  errorText: {
    ...fonts.captionBold,
    color: utColors.danger,
    marginVertical: 10,
  },
  errorDpText: {
    textAlign: 'center',
  },
  emptyText: {
    ...fonts.subtitleBold,
    color: utColors.bg3,
    alignSelf: 'center',
    marginVertical: 8,
  },
});

// const clubDashboardManager = {
//   validatedResult: {},
//   isFieldValidated: false,
//   isPagePopped: false,
// };

const EmptyComponent = ({ message }) => <>
  <Text style={utilStyles.emptyText}>
    <FormattedMessage
      defaultMessage={'{message}'}
      description={'empty message'}
      values={{
        message,
      }}
    />
  </Text>
</>;

const ClubAdminWarningBannerComponent = ({
  message = 'Only admins can accept invites',
}) => <>
  <View style={utilStyles.adminWarningBanner}>
    <View style={utilStyles.adminWarningInfoCircle}>
      <Text style={utilStyles.adminWarningInfoText}>i</Text>
    </View>
    <Text style={utilStyles.adminWarningText}>
      <FormattedMessage
        defaultMessage={'{message}'}
        description={'Admin Warning'}
        values={{ message }}
      />
    </Text>
  </View>
</>;

const ErrorMessage = ({ message = '', style }) => <>
  { (message !== null
    || message !== '')
    && <Text style={style}>
        <FormattedMessage
          defaultMessage={'{message}'}
          description={'error message'}
          values={{
            message,
          }}
        />
      </Text>
  }
</>;

const ClubHeroBlock = ({
  clubData, style,
}) => <>
  <View style={style.bodyCard}>
    <View style={style.heroCard}>
        <View style={style.heroCardContent}>
          <View style={style.heroCardBlock1}>
            <ImageBackground
              style={style.heroCardImageBg}
              source={dashboardHero}
              resizeMode='stretch'
              resizeMethod='scale'
            >
              <Image
                source={
                  clubData
                  && clubData.clubImage
                    ? { uri: clubData.clubImage.toString().replace(/(updatedAt=(\d+))/g, `updatedAt=${Date.now() / 1000}`) }
                    : defaultClubImage
                  }
                style={style.heroCardImage}
                defaultSource={defaultClubImage}
              />
            </ImageBackground>
          </View>
          <View style={style.heroCardBlock2}>
            <View style={style.heroBlockDataContainer}>
              <View style={[style.bodyCardContentTitle, style.heroCardDataBlock]}>
                <Image source={hkcoin} style={style.heroCardDataIcon} />
                <Text
                  style={style.heroCardText}>
                    <FormattedMessage
                      defaultMessage={'{points} coins'}
                      description={'club points'}
                      values={{
                        points: clubData ? clubData.clubPoints : 0,
                      }}
                    />
                </Text>
              </View>
              <View style={[style.bodyCardContentTitle, style.heroCardDataBlock]}>
                <Image source={xpPoints} style={style.heroCardDataIcon} />
                <Text style={style.heroCardText}>
                  <FormattedMessage
                    defaultMessage={'{xp} xp'}
                    description={'club xp'}
                    values={{
                      xp: clubData ? clubData.xp : 0,
                    }}
                  />
                </Text>
              </View>
              <View style={[style.bodyCardContentTitle, style.heroCardDataBlock]}>
                {/* <Icon type={'SVGFile'} name={RankUpwards}
                style={[style.bodyCardContentTitle, style.heroCardDataBlock]} /> */}
                <RankUpwards style={[
                  utilStyles.scale15,
                  utilStyles.marginL4,
                  utilStyles.marginR10,
                  utilStyles.marginV4,
                ]}/>
                <Text style={style.heroCardText}>
                  <FormattedMessage
                    defaultMessage={'#{rank}'}
                    description={'club xp'}
                    values={{
                      rank: clubData ? clubData.rank : 0,
                    }}
                  />
                </Text>
              </View>
            </View>
          </View>
        </View>
    </View>
  </View>
</>;

const ClubTabButtonBlock = ({
  title, btnStyle, btnActiveStyle, btnTextStyle, btnTextActiveStyle, isActive,
}) => <>
  <View style={isActive ? btnActiveStyle : btnStyle}>
    <Text style={isActive ? btnTextActiveStyle : btnTextStyle}>
      <FormattedMessage
        defaultMessage={'{title}'}
        description={'club feed title'}
        values={{
          title,
        }}
      />
    </Text>
  </View>
</>;

const ClubBasicInfoComponent = ({
  appData = {}, clubData = {}, isAdmin = false, locationState,
  editFields = () => {}, setClubImage = () => {}, setAppData = () => {},
  style = {},
}) => {
  const {
    clubName,
    // clubId,
    clubImage,
    country, state,
  } = clubData;

  const {
    basicInfoErrors,
  } = appData;

  // const clubImageInputRef = React.useRef(null);
  const clubNameInputRef = React.useRef(null);
  const clubCountryInputRef = React.useRef(null);
  const clubStateInputRef = React.useRef(null);

  const intl = useIntl();

  const inputRefMap = {
    clubName: clubNameInputRef,
    country: clubCountryInputRef,
    state: clubStateInputRef,
  };

  // const checkFields = () => {
  //   let resStatus = false;
  //   clubDashboardManager.isFieldValidated = true;
  //   Object.keys(clubDashboardManager.validatedResult)
  //     .forEach((key) => {
  //       if (typeof clubDashboardManager.validatedResult[key] === 'object') {
  //         resStatus = clubDashboardManager.validatedResult[key].status;
  //       } else {
  //         resStatus = clubDashboardManager.validatedResult[key];
  //       }
  //       if (
  //         key === 'state'
  //         && locationState.stateResponse.states?.length === 0) {
  //         clubDashboardManager.validatedResult.state = true;
  //         resStatus = true;
  //       }
  //       clubDashboardManager.isFieldValidated &&= resStatus;
  //     });
  // };

  // const validate = (key, value) => {
  //   let result = false;
  //   try {
  //     switch (key) {
  //       case 'clubName': {
  //         if (value.length > 60 || value.length < 4) {
  //           throw new Error('Club Name should be between 4 and 60 characters');
  //         }
  //         break;
  //       }
  //       case 'country': {
  //         if (value.length < 3 || value.length > 60) {
  //           throw new Error('Country name must be of length 3 to 60 characters');
  //         }
  //         break;
  //       }
  //       case 'state': {
  //         if (value.length < 3 || value.length > 60) {
  //           throw new Error('State name must be of length 3 to 60 characters');
  //         }
  //         break;
  //       }
  //       default: break;
  //     }
  //     result = {
  //       status: true,
  //     };
  //   } catch (error) {
  //     result = {
  //       status: false,
  //       error: error.message,
  //     };
  //   }
  //   return result;
  // };

  const setErrorMessage = (key, value) => {
    const eKey = `basicInfoErrors.${key}`;
    setAppData(eKey, value);
  };

  const handleInput = (fieldName, value) => {
    setErrorMessage('clubImage', false);
    const clubAction = 'update';
    let errorMessage = false;
    if (
      fieldName === 'state'
      && locationState.stateResponse.states?.length === 0
    ) {
      setErrorMessage('state', false);
    }

    const validatedResponse = editFields({ fieldName, value, clubAction });

    if (typeof validatedResponse === 'object') {
      if (!validatedResponse.status) {
        errorMessage = validatedResponse.error;
      }
    } else if (!validatedResponse) {
      errorMessage = 'Invalid value provided';
    }

    setErrorMessage(fieldName, errorMessage);
  };

  return <>
    {
      Object.keys(clubData).length > 0
      && <>
        <View style={utilStyles.marginT8}>
          <View style={style.formGroup} ref={clubNameInputRef}>
            <Text style={style.inputLabel}>
              <FormattedMessage
                defaultMessage={'Club Name'}
                description={'Club name label'}
              />
            </Text>
            <TextInput
              style={[style.inputTextBox]}
              multiline={false}
              placeholder='Club Name'
              value={ clubData?.clubName || ''}
              onChangeText={(value) => { handleInput('clubName', value); }}
            />
            <ErrorMessage style={utilStyles.errorText} message={basicInfoErrors?.clubName || ''} />
          </View>
          {/* <View style={style.formGroup}>
            <Text style={style.inputLabel}>
              <FormattedMessage
                defaultMessage={'Country'}
                description={'country name label'}
              />
            </Text>
            <TextInput
              style={[style.inputTextBox]}
              multiline={false}
              placeholder='Country'
              value={ clubData?.country || ''}
              onChangeText={(value) => { handleInput('country', value); }}
            />
            <ErrorMessage style={utilStyles.errorText} message={basicInfoErrors?.country || ''} />
          </View> */}
          <View style={style.formGroup}>
            <Picker
              style={style.inputTextBox}
              selectedValue={clubData?.country || false}
            >
              <FormattedMessage
                defaultMessage={'{countryName}'}
                values={{ countryName: 'Select Country' }}
                >
                {(message) => <Picker.Item label={intl.formatMessage(message)} value={false} />}
              </FormattedMessage>
              {/* <FormattedMessage
                defaultMessage={'{countryName}'}
                values={{ countryName: 'Select Country' }}
                >
                {(message) => <Picker.Item label={message} value={false} />}
              </FormattedMessage>
              {
                locationState.countryResponse.status === 'success'
                && locationState.countryResponse.countries.map(
                  (countryName, idx) => <FormattedMessage
                    key={idx}
                    defaultMessage={'{countryName}'}
                    values={{ countryName }}
                    >
                    {(message) => <Picker.Item label={message} value={countryName}/>}
                  </FormattedMessage>,
                )
              } */}
              {
                locationState.countryResponse.status === 'success'
                  && locationState.countryResponse.countries.map(
                    (countryName, idx) => <Picker.Item
                      key={idx}
                      label={intl.formatMessage({
                        defaultMessage: '{countryName}',
                        description: 'country name',
                        values: { countryName },
                      })} />,
                  )
              }
            </Picker>
          </View>
        </View>
      </>
    }
  </>;
};

const ClubFeedCardComponent = ({ clubFeed = {}, clubData = {}, style }) => {
  const feedData = {
    type: 'user',
    image: 'profile/default_user.png',
    name: 'Anonymous',
    uniquUrl: '',
    message: '',
  };

  const {
    // category,
    feedInfo,
    postedBy,
  } = clubFeed || {};

  const { message = '', data = {} } = feedInfo || {};

  let msg = message;

  if (postedBy?.type === 'user') {
    feedData.image = postedBy.image;
    feedData.name = postedBy.name;
    feedData.uniquUrl = postedBy.unique_url;
  } else if (postedBy?.type === 'club') {
    feedData.image = clubData?.clubImage;
    feedData.name = clubData?.clubName;
    feedData.uniquUrl = clubData?.clubId;
  }

  const feedDataKeyArry = [...(message?.matchAll(/\{.*?\}/g))];
  const keyArry = feedDataKeyArry.map((item) => item[0].replace(/(\{|\})/g, ''));
  keyArry.forEach((key) => {
    msg = msg.replace(`{${key}}`, `${data[key]}`);
  });
  feedData.message = msg;

  const clubMsgKeys = ['clubName', 'clubId', 'clubPoints', 'xp', 'rank'];
  clubMsgKeys.forEach((key) => {
    msg = msg.replace(`{${key}}`, `<b>${clubData[key]}</b>`);
  });
  feedData.message = msg;

  return <>
    <View style={style.feedCard}>
      <View style={style.feedCardHeader}>
        <View style={[style.bodyCardContentTitle, utilStyles.paddingV12, utilStyles.paddingH12]}>
          <Image
            source={
              feedData?.image
                ? { uri: feedData?.image }
                : defaultUser
            }
            style={style.feedTitleCardImage}
            defaultSource={defaultUser}
          />
          <Text style={[style.feedTitleCardText, utilStyles.marginL8]}>
            <FormattedMessage
              defaultMessage={'{name}'}
              description={'member name'}
              values={{ name: feedData.name || '--' }}
            />
          </Text>
        </View>
      </View>
      <View style={style.feedCardBody}>
        <View style={[utilStyles.padding20]}>
          {/* <Image
            source={defaultUser}
            style={[style.feedContentImage]}
            defaultSource={defaultUser}
          /> */}
          <FeedAchievementSVG style={style.feedContentImage} />
          <Text style={style.feedContentText}>
            <FormattedMessage
              defaultMessage={'{message}'}
              description={'member name'}
              values={{ message: feedData.message || '--' }}
            />
          </Text>
        </View>
      </View>
    </View>
  </>;
};

const ClubMemberComponent = ({
  isAdmin = false,
  isApplicant = false,
  member = {},
  handleRole = () => {},
  handleKick = () => {},
  handleAcceptInvite = () => {},
  handleRejectInvite = () => {},
  showMemberInfo = () => {},
  isCurrentUser = false,
  isLeaderBoard = false,
  style,
}) => <>
  {
    Object.keys(member).length > 0
    && <>
      <View
        style={
          isCurrentUser
            ? style.leaderBoardCurrentMemberRow
            : style.leaderBoardMemberRow
        }
      >
        <TouchableOpacity
          onPress={() => showMemberInfo(member.unique_url)}
          activeOpacity={0.5}
        >
          <View style={utilStyles.rowSpaceBetween}>
            {
              isLeaderBoard
              && <>
                <Text style={style.feedTitleCardText}>
                  <FormattedMessage
                    defaultMessage={'#{rank}'}
                    description={'rank'}
                    values={{ rank: member.rank }}
                  />
                </Text>
              </>
            }
            <View style={[utilStyles.marginL20]}>
              <Image
                source={
                  member.profileImage
                    ? { uri: member?.profileImage || '' }
                    : defaultUser
                }
                defaultSource={defaultUser}
                style={
                  isLeaderBoard
                    ? [style.leaderBoardMemberImage]
                    : [style.feedTitleCardImage]
                }
              />
            </View>
            <View style={[utilStyles.marginL12]}>
              <Text style={[style.feedTitleCardText]}>
                <FormattedMessage
                  defaultMessage={'{name}'}
                  description={'member name'}
                  values={{ name: member.name }}
                />
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {
          isAdmin
          && !isLeaderBoard
          && <>
            <View
              style={[utilStyles.rowSpaceBetween]}
            >
              {
                !isApplicant
                && <>
                  <TouchableOpacity
                    style={
                      isCurrentUser
                        ? utilStyles.hide
                        : utilStyles.show
                    }
                    onPress={() => handleKick(member)}
                    activeOpacity={0.5}
                  >
                    <CrossMarkSVG />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={
                      isCurrentUser
                        ? utilStyles.hide
                        : utilStyles.show
                    }
                    onPress={() => handleRole(member)}
                    activeOpacity={0.5}
                  >
                    <StarSVG
                      fill={
                        member.role === 'admin'
                          ? Yellow.color900
                          : 'currentColor'
                      }
                    />
                  </TouchableOpacity>
                </>
              }
              {
                isApplicant
                && <>
                  <TouchableOpacity
                    style={
                      isCurrentUser
                        ? utilStyles.hide
                        : utilStyles.show
                    }
                    onPress={() => handleRejectInvite(member)}
                    activeOpacity={0.5}
                  >
                    <CrossMarkSVG />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={
                      isCurrentUser
                        ? utilStyles.hide
                        : utilStyles.show
                    }
                    onPress={() => handleAcceptInvite(member)}
                    activeOpacity={0.5}
                  >
                    <CheckMarkSVG />
                  </TouchableOpacity>
                </>
              }
            </View>
          </>
        }
        {
          isLeaderBoard
          && <>
            <Text style={style.feedTitleCardText}>
              <FormattedMessage
                defaultMessage={'{points}'}
                description={'Club member points'}
                values={{
                  points: member?.points || 0,
                }}
              />
            </Text>
          </>
        }
      </View>
    </>
  }
</>;

const ClubFeedTabComponent = ({ clubData, clubFeedList = [], style }) => {
  const ClubFeedCardRenderComponent = ({ item }) => <ClubFeedCardComponent
    style={style}
    clubData={clubData}
    clubFeed={item}
  />;

  return <>
    <View style={utilStyles.flex1}>
      {/* {
        clubFeedList?.length > 0
        && <>
          <FlatList
            data={clubFeedList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ClubFeedCardRenderComponent}
            numColumns={1}
            style={[utilStyles.flex1, utilStyles.marginB100]}
          />
        </>
      } */}
      {
        clubFeedList?.length
        && clubFeedList.map((item, idx) => <ClubFeedCardRenderComponent key={idx} item={item} />)
      }
      {
        clubFeedList?.length === 0
        && <>
          <View>
            <EmptyComponent
              message={'No Feed to show'}
            />
          </View>
        </>
      }
    </View>
  </>;
};

const ClubMembersTabComponent = ({
  style,
  rankedList = [],
  userData = {},
  showMemberInfo = () => {},
}) => <>
  <View>
    <View style={[utilStyles.rowSpaceBetween, utilStyles.marginV16]}>
      <Text style={[style.tabButtonText]}>
        <FormattedMessage
          defaultMessage={'Club Leaderboard'}
          description={'club leaderboard title'}
        />
      </Text>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {}}
      >
        <View style={[
          style.leaderBoardSortBtn,
          utilStyles.rowSpaceBetween,
          utilStyles.paddingV12,
          utilStyles.paddingH8,
        ]}>
          <Text style={[style.leaderBoardSortBtnText]}>
            <FormattedMessage
              defaultMessage={'Sort by: '}
              description={'sort btn title'}
            />
          </Text>
          <Text style={[style.feedTitleCardText, utilStyles.marginL4]}>
            <FormattedMessage
              defaultMessage={'{sortBy}'}
              description={'sort by option'}
              values={{
                sortBy: 'Points',
              }}
            />
          </Text>
        </View>
      </TouchableOpacity>
    </View>
    <View>
      {
        rankedList?.length > 0
        && rankedList.map((item, idx) => <ClubMemberComponent
          key={idx}
          member={{
            ...item,
            rank: idx + 1,
          }}
          isLeaderBoard={true}
          isCurrentUser={item?.unique_url === userData?.unique_url}
          showMemberInfo={showMemberInfo}
          style={style}
        />)
      }
    </View>
  </View>
</>;

const ClubMoreTabComponent = ({
  isAdmin = false,
  appData = {},
  userData = {},
  clubData = {},
  locationState = {},
  style = {},
  editFields = () => {},
  setAppData = () => {},
  setClubImage = () => {},
}) => <>
  {
    userData?.role !== 'admin'
    && <>
      <ClubAdminWarningBannerComponent
        message={'Only admins can edit club'}
      />
    </>
  }
  <ClubBasicInfoComponent
    isAdmin={isAdmin}
    appData={appData}
    clubData={clubData}
    editFields={editFields}
    locationState={locationState}
    setAppData={setAppData}
    setClubImage={setClubImage}
    style={style}
  />
</>;

const ClubFeedBlock = ({
  style,
}) => {
  const clubContext = React.useContext(ClubContext);

  const {
    clubState: {
      appData,
      clubDashboardResponse,
      clubInfoResponse,
    },
    clubStatic: {
      editFields,
      setAppData,
      setClubImage,
    },
    locationState,
    locationStatic: { fetchLocation },
  } = clubContext;

  const {
    status: clubInfoStatus,
    adminList = [],
    applicantList = [],
    clubData: clubInfoData = {},
    memberList = [],
    userData = {},
  } = clubInfoResponse || {};

  const {
    clubFeed,
    clubData,
  } = clubDashboardResponse;

  const rankedMemberList = React.useMemo(() => {
    if (!memberList || !adminList || !applicantList) return [];
    const rlist = [...memberList, ...adminList];
    rlist.sort((a, b) => b.points - a.points);
    return rlist;
  }, [memberList, adminList, applicantList]);

  const handleMemberClick = (userName) => {
    console.log('username', userName);
  };

  React.useEffect(() => {
    if (clubInfoData?.country) {
      fetchLocation({ locationType: 'state', country: clubInfoData?.country });
    }
  }, [clubInfoData?.country]);

  return <>
    <View style={[style.bodyCard, utilStyles.flex1]}>
      <Text style={style.clubTitleText}>
        <FormattedMessage
          defaultMessage={'{clubName}'}
          description={'club name'}
          values={{
            clubName: clubData?.clubName,
          }}
        />
      </Text>
      <View style={[utilStyles.marginV16, utilStyles.flex1]}>
        <Tab
          tabs={
            ['Feed', 'Members', 'More'].map((item, idx) => (function TabBtn({ isActive }) {
              if (
                !(clubInfoStatus
                && clubInfoStatus !== 'error'
                && rankedMemberList)
              ) {
                return <></>;
              }
              if (item === 'More') {
                if (
                  !(clubInfoStatus
                  && clubInfoStatus !== 'error'
                  && ((applicantList?.length === 0)
                    || (applicantList?.length > 0
                      && userData
                      && (applicantList
                        .find(
                          (applicantItem) => applicantItem.unique_url === userData?.unique_url,
                        )
                          === undefined
                      )
                    )
                  ))
                ) {
                  return <></>;
                }
              }
              return <ClubTabButtonBlock
                key={idx}
                title={item}
                btnStyle={[style.tabButton]}
                btnActiveStyle={[style.tabButtonActive]}
                btnTextStyle={[style.tabButtonText]}
                btnTextActiveStyle={style.tabButtonActiveText}
                isActive={isActive}
              />;
            }))
          }
          tabItems={[
            () => <>
              {
                clubInfoData
                && clubFeed?.length > 0
                && <ClubFeedTabComponent
                  clubData={clubInfoData}
                  clubFeedList={clubFeed}
                  style={style} />
              }
            </>,
            () => <>
              {
                 clubInfoStatus
                 && clubInfoStatus !== 'error'
                 && ((applicantList?.length === 0)
                  || (applicantList?.length > 0
                    && userData
                    && (applicantList
                      .find((item) => item.unique_url === userData?.unique_url) === undefined)))
                      && <>
                        <ClubMembersTabComponent
                          style={style}
                          rankedList={rankedMemberList}
                          userData={userData}
                          showMemberInfo={handleMemberClick}
                        />
                      </>
              }
            </>,
            () => <>
              {
                clubInfoStatus
                && clubInfoStatus !== 'error'
                && ((applicantList?.length === 0)
                 || (applicantList?.length > 0
                   && userData
                   && (applicantList
                     .find((item) => item.unique_url === userData?.unique_url) === undefined)))
                     && <>
                        <ClubMoreTabComponent
                          isAdmin={userData?.role === 'admin'}
                          appData={appData}
                          userData={userData}
                          clubData={clubInfoData}
                          locationState={locationState}
                          editFields={editFields}
                          setAppData={setAppData}
                          setClubImage={setClubImage}
                          style={style}
                        />
                      </>
              }
            </>,
          ]}
          >
        </Tab>
      </View>
    </View>
  </>;
};

const compareProps = (prev, next) => {
  let isEqual = true;
  Object.keys(prev).forEach((key) => {
    if (key === 'avatar' || key === 'navigation' || key === 'style') {
      isEqual = isEqual && true;
    } else if (typeof prev[key] === 'function') {
      // use memoized function for passing as props
      isEqual = isEqual && true;
    } else if (key.toLowerCase().includes('ref')) {
      isEqual = true;
    } else {
      isEqual = isEqual && JSON.stringify(prev[key]) === JSON.stringify(next[key]);
    }
  });
  return isEqual;
};

const ClubHeroComponent = memo(ClubHeroBlock, compareProps);
const ClubFeedComponent = memo(ClubFeedBlock, compareProps);

const ClubHomeComponent = () => {
  console.log();

  return <>
    <Text>home</Text>
  </>;
};

const ClubDashboardComponent = ({ style }) => {
  const clubContext = React.useContext(ClubContext);

  const {
    clubState: {
      // appData,
      clubDashboardResponse,
      // clubInfoResponse,
    },
    // clubStatic: {
    //   editFields,
    //   setAppData,
    //   setClubImage,
    // },
    // locationState,
    // locationStatic: { fetchLocation },
  } = clubContext;

  const {
    status: clubDashboardStatus,
    clubData,
    // clubFeed,
  } = clubDashboardResponse || {};

  return <>
    <View style={utilStyles.flex1}>
      {
        clubDashboardStatus === 'success'
        && <>
          <ClubHeroComponent
            style={style}
            clubData={clubData}
          />
          <ClubFeedComponent
            style={style}
            // appData={appData}
            // clubData={clubData}
            // clubFeedList={clubFeed}
            // clubInfoResponse={clubInfoResponse}
            // fetchLocation={fetchLocation}
            // locationState={locationState}
            // editFields={editFields}
            // setClubImage={setClubImage}
            // setAppData={setAppData}
          />
        </>
      }
    </View>
  </>;
};

const Club = () => {
  const { theme, font } = React.useContext(ThemeContext);
  const pageTheme = theme.screenClub;
  const style = getStyles(pageTheme, font, theme.utilColors);
  const isPageMounted = React.useRef(true);
  const {
    state: clubState,
    static: clubStatic,
  } = useClubs({ isPageMounted });
  const {
    state: locationState,
    static: locationStatic,
  } = useCountryStateCity({ isPageMounted });
  const { session: sessionState } = useGetSession({ isPageMounted });

  const {
    clubDashboardResponse: {
      status: clubDashboardStatus,
      clubData,
      clubList,
      // hasClub,
      // topMembers,
    },
    appData: { showClub },
  } = clubState;

  const {
    getClubDashboardData,
    getClubInfo,
    setAppData,
  } = clubStatic;

  const { fetchLocation } = locationStatic;

  React.useEffect(() => {
    if (clubData) {
      setAppData('showClub', true);
    }

    if (clubList) {
      setAppData('showClub', false);
    }
  }, [clubDashboardStatus]);

  React.useEffect(() => {
    getClubDashboardData({});
    getClubInfo({});
    fetchLocation({ locationType: 'country' });
    return () => {
      isPageMounted.current = false;
    };
  }, []);

  return (
    <ClubContext.Provider
      value={{
        clubState,
        clubStatic,
        locationState,
        locationStatic,
        sessionState,
      }}
    >
      <ScrollView style={style.container}>
        {
          showClub !== null
          && <>
            {
              showClub
              && <ClubDashboardComponent
                style={style}
              />
            }
            {
              !showClub
              && <ClubHomeComponent />
            }
          </>
        }
      </ScrollView>
    </ClubContext.Provider>
  );
};

export default Club;
