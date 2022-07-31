import React, { useContext } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { FormattedMessage } from 'react-intl';
import ThemeContext from '../components/theme';
import Icon from '../common/Icons';
import collectionIllustration from '../../images/more/collectibles.png';
import ideIllustration from '../../images/more/ide.png';
// import moreFriendsIllustration from '../../images/more/moreFriends.png';
import { LightBlue } from '../../colors/_colors';
import { useLogout } from '../../hooks/pages/auth';

const getStyles = (theme, font, utils) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bodyBg,
    // paddingBottom: 12,
  },
  scrollContainer: {
    padding: 12,
  },
  moreMenuBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: utils.white,
    borderRadius: 12,
    padding: 12,
    shadowColor: `${utils.shadowColor2}`,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 16,
    shadowOpacity: 0,
    marginVertical: 4,
  },
  lastBtn: {
    marginBottom: 25,
  },
  collectionBtn: {
    borderWidth: 2,
    borderColor: theme.inputBorderColor,
  },
  moreMenuBtnText: {
    ...font.subtitle1,
    color: utils.dark,
  },
  collectionBtnText: {
    color: theme.textBold,
  },
  moreCard: {
    borderRadius: 12,
    backgroundColor: utils.white,
    marginVertical: 4,
    height: 200,
  },
  moreCardTitle: {
    ...font.heading5,
    color: utils.dark,
    lineHeight: 38,
  },
  moreCardSubtitleText: {
    ...font.subtitle1,
    color: utils.lightGrey,
  },
  moreBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  moreCardButton: {
    borderRadius: 12,
    backgroundColor: theme.btnBg,
    padding: 16,
    width: 130,
    shadowColor: `${utils.shadowColor2}`,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 0,
  },
  moreCardIdeBtn: {
    backgroundColor: LightBlue.color700,
    shadowColor: LightBlue.color100,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 0,
  },
  moreCardButtonText: {
    ...font.subtitle1,
    color: utils.white,
    textAlign: 'center',
    alignItems: 'flex-end',
  },
  moreCardBg: {
    justifyContent: 'space-between',
    padding: 16,
  },
  moreCardContainer: {
    justifyContent: 'space-between',
    height: '100%',
  },
  collectibleImgBg: {
    width: 150,
    height: 290,
  },
  ideImgBg: {
    width: 150,
    height: 310,
  },
  moreFriendsImgBg: {
    width: 150,
    height: 280,
  },
});

const More = ({ navigation }) => {
  const { font, theme } = useContext(ThemeContext);
  const pageTheme = theme.screenMore;
  const style = getStyles(pageTheme, font, theme.utilColors);

  const { logout } = useLogout();

  return (
    <View style={style.container}>
      <ScrollView style={style.scrollContainer}>
        {/* <TouchableOpacity onPress={() => {}}>
          <View style={{
            ...style.moreMenuBtn,
            ...style.collectionBtn,
          }}
            >
            <Text style={{
              ...style.moreMenuBtnText,
              ...style.collectionBtnText,
            }}>
              <FormattedMessage
                defaultMessage="Your Collections and Perks"
                description="Collections and Perks CTA"
              />
            </Text>
            <Icon type='FontAwesome5' name={'angle-right'} size={32} color={pageTheme.textBold} />
          </View>
        </TouchableOpacity> */}

        <View style={style.moreCard}>
          <ImageBackground
            source={collectionIllustration}
            resizeMethod={'scale'}
            resizeMode={'contain'}
            style={style.moreCardBg}
            imageStyle={style.collectibleImgBg}
            >
            <View style={style.moreCardContainer}>
              <Text style={style.moreCardTitle}>
                <FormattedMessage
                  defaultMessage="Get the rare collectibles with your coins now"
                  description="More card Title"
                />
              </Text>
              <View style={style.moreBtnContainer}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={{
                    ...style.moreCardButton,
                    opacity: 0.5,
                  }}
                  disabled={true}
                  >
                  <Text style={style.moreCardButtonText}>
                    <FormattedMessage
                      defaultMessage="Coming soon"
                      description="More card button text"
                    />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* <View style={style.moreCard}>
          <ImageBackground
            source={moreFriendsIllustration}
            resizeMethod={'scale'}
            resizeMode={'contain'}
            style={style.moreCardBg}
            imageStyle={style.moreFriendsImgBg}
          >
            <View style={style.moreCardContainer}>
              <View>
                <Text style={style.moreCardTitle}>
                  <FormattedMessage
                    defaultMessage="More friends = More fun"
                    description="More card Title"
                  />
                </Text>
                <Text style={style.moreCardSubtitleText}>
                  <FormattedMessage
                    defaultMessage="Join your friends in the club"
                    description="More card Subtitle"
                  />
                </Text>
              </View>
              <View style={style.moreBtnContainer}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={style.moreCardButton}
                  >
                  <Text style={style.moreCardButtonText}>
                    <FormattedMessage
                      defaultMessage="Visit Club"
                      description="More card button text"
                    />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View> */}

        <View style={style.moreCard}>
          <ImageBackground
            source={ideIllustration}
            resizeMethod={'scale'}
            resizeMode={'contain'}
            style={style.moreCardBg}
            imageStyle={style.ideImgBg}
          >
            <View style={style.moreCardContainer}>
              <View>
                <Text style={style.moreCardTitle}>
                  <FormattedMessage
                    defaultMessage="Try the new in-built IDE"
                    description="More card Title"
                  />
                </Text>
                <Text style={style.moreCardSubtitleText}>
                  <FormattedMessage
                    defaultMessage="Practise... or play with the new code editor"
                    description="More card Subtitle"
                  />
                </Text>
              </View>
              <View style={style.moreBtnContainer}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={{
                    ...style.moreCardButton,
                    ...style.moreCardIdeBtn,
                    opacity: 0.5,
                  }}
                  disabled={true}
                  >
                  <Text style={style.moreCardButtonText}>
                    <FormattedMessage
                      defaultMessage="Coming soon"
                      description="More card button text"
                    />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* <TouchableOpacity onPress={() => {}}>
          <View style={style.moreMenuBtn}>
            <Text style={style.moreMenuBtnText}>
              <FormattedMessage
                defaultMessage="Doubts"
                description="Doubts CTA"
              />
            </Text>
            <Icon
              type='FontAwesome5' name={'angle-right'} size={32} color={theme.utilColors.dark} />
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity onPress={logout}>
          <View style={style.moreMenuBtn}>
            <Text style={style.moreMenuBtnText}>
              <FormattedMessage
                defaultMessage="Logout"
                description="Logout Button"
              />
            </Text>
            <Icon type='FontAwesome5' name={'angle-right'} size={32} color={theme.utilColors.dark} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('EditProfile') }>
          <View style={style.moreMenuBtn}>
            <Text style={style.moreMenuBtnText}>
              <FormattedMessage
                defaultMessage="Account Settings"
                description="account settings CTA"
              />
            </Text>
            <Icon type='FontAwesome5' name={'angle-right'} size={32} color={theme.utilColors.dark} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Help')} style={style.lastBtn}>
          <View style={style.moreMenuBtn}>
            <Text style={style.moreMenuBtnText}>
              <FormattedMessage
                defaultMessage="Help"
                description="Help CTA"
              />
            </Text>
            <Icon type='FontAwesome5' name={'angle-right'} size={32} color={theme.utilColors.dark} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default More;
