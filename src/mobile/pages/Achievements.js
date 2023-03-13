import React, { useContext, useRef, useState } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Skeleton } from '@rneui/base';
import { FormattedMessage } from 'react-intl';
// import LinearGradient from 'react-native-linear-gradient';
import { SvgUri } from 'react-native-svg';
import ThemeContext from '../components/theme';
import LeaderboardSvg from '../../images/more/leaderboard.svg';
import GameIcon from '../../images/common/black-joystick.svg';
import AwardInfoSvg from '../../images/achievements/awardInfo.svg';
// import ShareIcon from '../../images/common/black-share-icon.svg';
import ShareIcon from '../../images/common/share.svg';
import Icon from '../common/Icons';
import { useGetSession } from '../../hooks/pages/root';
import { useProfileInfo } from '../../hooks/pages/profile';
// import Award1Icon from '../../images/achievements/award1.png';
import hkcoin from '../../images/common/hkcoin.png';
// import collectible1 from '../../images/collectibles/collectible1.png';
import ShareModal from '../components/Modals/ShareModal';
import { useAwards } from '../../hooks/pages/awards';
import { useTimeTrack } from '../../hooks/pages/timeTrack';
import Loader from '../components/Loader';

const getStyles = (theme, utilColors, font, gradients) => StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    backgroundColor: utilColors.white,
  },
  section: {
    marginTop: 16,
  },
  textColor1: {
    color: utilColors.dark,
  },
  textColor2: {
    color: utilColors.white,
  },
  textColor3: {
    color: theme.textBold,
  },
  heading: {
    ...font.subtitleBold,
  },
  btnText: {
    ...font.subtitle1,
  },
  text: {
    ...font.subtitle2,
  },
  smallText: {
    ...font.body,
  },
  smallestText: {
    ...font.caption,
  },
  borderRadius12: {
    borderRadius: 12,
  },
  statsContainerBg: {
    backgroundColor: utilColors.bg2,
  },
  awardsCardBg: {
    borderWidth: 2,
    borderColor: theme.borderLight,
  },
  collectiblesBorder: {
    borderColor: theme.borderLight,
  },
  statsContainer: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    height: 50,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: theme.btnBg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leaderboardBtnContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  certificateList: {
    marginTop: 20,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  certificate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: utilColors.bg2,
  },
  gameIconContainer: {
    marginRight: 10,
  },
  awardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    marginBottom: 7,
    alignContent: 'center',
    // justifyContent: 'center',
    marginHorizontal: 'auto',
  },
  awardIcon: {
    width: 64,
    height: 64,
  },
  awardCard: {
    width: '100%',
    height: 98,
    // paddingVertical: 20,
    // paddingHorizontal: 15,
    // padding: 2,
    marginRight: 6,
    marginBottom: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  awardIconContainer: {
    height: 84,
    width: 84,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  awardNameText: {
    ...font.subtitle1,
    color: utilColors.dark,
    alignItems: 'center',
    textAlign: 'center',
  },
  awardInfoIcon: {
    margin: 16,
  },
  rowFlexCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIcon: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  collectibleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 16,
  },
  collectibleCard: {
    position: 'relative',
    width: 156,
    height: 156,
    borderColor: theme.borderLight,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  collectibleCardImg: {
    width: 71,
    height: 71,
  },
  rarityIndicator: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    position: 'absolute',
    top: 5,
    right: 0,
    borderRadius: 12,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  rareGradient: gradients.purple,
  commonGradient: gradients.redYellow,
  seeMoreText: {
    marginTop: 10,
  },
});

const CertificateList = ({ style, certificates, onShareBtnPress }) => {
  const getCertificateStyle = (index) => {
    if (index === 0) {
      return [style.certificate, { paddingTop: 0 }];
    }

    if (index === 2) {
      return [style.certificate, { borderBottomWidth: 0 }];
    }

    return style.certificate;
  };

  return <>
    {
      !certificates && <Skeleton width={'100%'} height={165} style={[style.certificateList, style.borderRadius12]} />
    }
    {
      certificates
      && Boolean(certificates.length)
      && <View style={[style.certificateList, style.borderRadius12]}>
        {
          certificates.slice(0, 3).map((certificate,
            idx) => <View style={getCertificateStyle(idx)} key={idx}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <GameIcon style={{ marginRight: 10 }} />
                <Text style={[style.textColor1, style.text]}>
                  <FormattedMessage defaultMessage={'{certificateName}'} description='certificate name' values={{ certificateName: certificate.certificateName }} />
                </Text>
              </View>
              <TouchableOpacity
                style={style.shareBtn}
                onPress={() => onShareBtnPress(certificate.certificateId)}>
                <ShareIcon style={{ flex: 1, marginLeft: 'auto' }} />
              </TouchableOpacity>
            </View>)
        }
      </View>
    }
    {
      certificates
      && !certificates.length
      && <View style={[style.certificateList, style.borderRadius12]}>
        <Text style={[style.heading, style.textColor1, { textAlign: 'center' }]}>
          <FormattedMessage defaultMessage={'No Certificates Found'} />
        </Text>
      </View>
    }
  </>;
};

const AwardsGrid = ({
  style,
  awards,
}) => <View style={style.awardsContainer}>
    {
      awards && awards.map((award, idx) => <View
        key={idx}
        style={[style.awardCard, style.awardsCardBg, style.borderRadius12]}>
        {/* <Image
          style={style.awardIcon}
          source={{ uri: award.awardImage }}
        /> */}
        <View style={[style.rowFlexCenter, { height: '100%' }]}>
          <View style={style.awardIconContainer}>
            <SvgUri
              uri={award.awardImage}
              width={'100%'}
              height={'60%'}
            />
          </View>
          <Text style={style.awardNameText}>
            <FormattedMessage
              defaultMessage={'{awardName}'}
              description={'award name'}
              values={{
                awardName: award.awardName,
              }}
            />
          </Text>
        </View>
        <AwardInfoSvg style={style.awardInfoIcon}/>
      </View>)
    }
    {
      (awards && awards.length === 0) && <Text style={[style.heading, style.textColor1]}>
        <FormattedMessage defaultMessage={'No Awards Found'} description='error text' />
      </Text>
    }
    {
      !awards
      && [1, 2, 3, 4, 5].map((_, idx) => <Skeleton
        key={idx}
        style={[style.awardCard, style.borderRadius12]} />)
    }
  </View>;

// const CollectibleCard = ({ style, rarity, contentContainerStyle = {} }) => <View
//   style={[style.collectibleCard, style.borderRadius12, contentContainerStyle]}>
//   <LinearGradient
//     start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//     colors={style[`${rarity}Gradient`]}
//     style={style.rarityIndicator}
//     useAngle={true}
//     angle={270}
//   >
//     <Text style={[style.textColor2, style.smallestText, { textTransform: 'capitalize' }]}>
//       <FormattedMessage
//         defaultMessage={'{rarity}'}
//         description='rarity indicator'
//         values={{
//           rarity,
//         }}
//       />
//     </Text>
//   </LinearGradient>
//   <Image
//     style={style.collectibleCardImg}
//     source={collectible1} />
// </View>;

// const CollectiblesGrid = ({
//   style,
//   navigation,
//   // collectibles,
// }) => {
//   // const getCollectibleCardStyle = (index) => {
//   //   if (index % 2 === 0) {
//   //     return [style.collectibleCard, style.borderRadius12];
//   //   }

//   //   return [style.collectibleCard, style.borderRadius12, { marginRight: 5, marginBottom: 5 }];
//   // };
//   const rarity = 'rare';

//   return <View style={style.collectibleGrid}>
//     <CollectibleCard
//       style={style}
//       rarity={rarity}
//       contentContainerStyle={{ marginRight: 10, marginBottom: 10 }} />
//     <CollectibleCard
//       style={style}
//       rarity={rarity}
//       contentContainerStyle={{ marginBottom: 10 }}
//     />
//     <CollectibleCard
//       style={style}
//       rarity={rarity}
//       contentContainerStyle={{ marginBottom: 10, marginRight: 10 }}
//     />
//     <TouchableOpacity onPress={() => navigation.navigate('AwardsCollectibles')}>
//       <View style={[style.collectibleCard, style.borderRadius12]}>
//         <Icon
//          type = 'FontAwesome5'
//          name = { 'plus'} size = { style.btnText.fontSize } color = { style.textColor3.color } />
//         <Text style={[style.textColor3, style.btnText, style.seeMoreText]}>
//           <FormattedMessage defaultMessage={'See More'} description='see more text' />
//         </Text>
//       </View>
//     </TouchableOpacity>
//   </View>;
// };

const Button = ({
  style, onPress, text,
}) => <TouchableOpacity style={
  text === 'Leaderboard'
    ? [style.btn, style.borderRadius12, { flex: 1 }]
    : [style.btn, style.borderRadius12]
} onPress={onPress}>
    <Text style={[style.textColor2, style.btnText]}>
      <FormattedMessage defaultMessage={'{text}'} description='button text' values={{ text }} />
    </Text>
    <Icon type='FontAwesome5' name={'angle-right'} size={style.btnText.fontSize} color={style.textColor2.color} />
  </TouchableOpacity>;

const Achievements = ({ navigation }) => {
  const { static: { startTimeTrack, stopTimeTrack } } = useTimeTrack({ navigation });

  const isPageMounted = useRef(true);
  const loaderRef = useRef(null);
  // hooks
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [toShareCertificateId, setToShareCertificateId] = useState(false);
  const { session } = useGetSession({ sessionAttr: ['name', 'pointsEarned', 'profileLink'], isPageMounted });
  const {
    state: {
      uniqueUrl,
    },
  } = useProfileInfo({ isPageMounted });
  const {
    state: {
      status: gameDetailsStatus,
      gameDetails,
    },
    getProfileData,
  } = useProfileInfo({ isPageMounted, action: 'getProfileData', uniqueurl: uniqueUrl });

  const { awardsState, getAwards } = useAwards({ isPageMounted, initializeData: false });
  const { pointsEarned } = session;

  const {
    awards,
  } = awardsState;

  // styles
  const { font, theme } = useContext(ThemeContext);
  const screenTheme = theme.screenAchievements;
  const style = getStyles(screenTheme, theme.utilColors, font, theme.gradients);

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

  // side effects
  React.useEffect(() => {
    if (uniqueUrl) {
      showLoader();
      getProfileData({ cached: false })
        .then(() => {
          hideLoader();
        });
    }
  }, [uniqueUrl]);

  React.useEffect(() => {
    showLoader();
    getAwards({ cached: false, limit: 5, sort: 'posted' })
      .then(() => {
        hideLoader();
      });
    // timeTrack('achievements');
    startTimeTrack('achievements');

    return () => {
      isPageMounted.current = false;
      stopTimeTrack('achievements');
      hideLoader();
    };
  }, []);

  return (<>
    <ScrollView style={[style.container, style.mainContainer]}>
      <View style={[style.statsContainer, style.statsContainerBg, style.borderRadius12]}>
        <View style={style.rowFlexCenter}>
          <Image
            style={style.statIcon}
            source={hkcoin}
          />
          <Text style={[style.textColor1, style.smallText]}>
            <FormattedMessage
              defaultMessage={'{pointsEarned}'}
              description='coins'
              values={{
                pointsEarned: pointsEarned || 0,
              }}
            />
          </Text>
        </View>
      </View>
      <View style={style.leaderboardBtnContainer}>
        <LeaderboardSvg />
        <Button
          text={'Leaderboard'}
          style={style}
          onPress={() => navigation.navigate('Leaderboard')}
        />
      </View>
      <View style={style.section}>
        <Text style={[style.heading, style.textColor1]}>
          <FormattedMessage defaultMessage={'Certificates'} description='certificate heading' />
        </Text>
        {
          (gameDetailsStatus === 'error') ? <Text style={[style.heading, style.textColor1]}>
            <FormattedMessage defaultMessage={'No Certificates Found'} description='error text' />
          </Text> : <CertificateList
            style={style}
            certificates={gameDetails
              ? Object.values(gameDetails[0].certificateData) : undefined}
            onShareBtnPress={(certificateId) => {
              setToShareCertificateId(certificateId);
              setShareModalOpen(true);
            }}
          />
        }
        {
          gameDetails
          && !!gameDetails[0]
          && <Button
            text={'View Certificates'}
            style={style}
            onPress={() => navigation.navigate('Certificates')}
          />
        }
      </View>
      <View style={[style.section, { marginBottom: 25 }]}>
        <Text style={[style.heading, style.textColor1]}>
          <FormattedMessage defaultMessage={'Awards'} description='Awards heading' />
        </Text>
        <AwardsGrid style={style} awards={awards} />
        <Button
          text={'View Awards'}
          style={style}
          onPress={() => navigation.navigate('AwardsCollectibles')}
        />
      </View>
      {/* <View style={style.section}>
        <Text style={[style.heading, style.textColor1]}>
          <FormattedMessage defaultMessage={'Collectibles'} description='Awards heading' />
        </Text>
        <CollectiblesGrid style={style} navigation={navigation} />
      </View> */}
    </ScrollView>
    <ShareModal open={shareModalOpen} setOpen={setShareModalOpen} shareLink={`www.hackerkid.org/certificate/view/${toShareCertificateId}`} />
    <Loader
      route={'Achievements'}
      ref={loaderRef}
    />
  </>
  );
};

export default Achievements;
