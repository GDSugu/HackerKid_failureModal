import { useNavigation } from '@react-navigation/native';
import { Skeleton } from '@rneui/base';
import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Text, StyleSheet, View, TouchableOpacity, Image,
} from 'react-native';
import ThemeContext from '../theme';
import EmptyStateImage from '../../../images/challenges/my-challenges-empty.png';

const getStyles = (theme, utilColors, font) => StyleSheet.create({
  emptyStateContainer: {
    flex: 1,
    backgroundColor: theme.bodyBg,
    paddingTop: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateImage: {
    width: '100%',
    height: 350,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: 30,
  },
  emptyStateText: {
    marginTop: 35,
    color: theme.textColor1,
    ...font.subtitle1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 7,
  },
  pageTitle: {
    color: theme.textColor1,
    ...font.heading6,
  },
  myChallengesBtnText: {
    ...font.bodyBold,
    color: theme.textBold,
  },
  challengeCardList: {
    marginTop: 15,
  },
  challengeCardItem: {
    height: 170,
    width: '100%',
  },
  challengeCardImage: {
    borderRadius: 12,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: 'white',
  },
  challengeCardTitle: {
    ...font.subtitle1,
    marginVertical: 8,
    color: theme.textColor1,
  },
  challengeCardAuthor: {
    ...font.body,
    color: utilColors.grey,
  },
});

const ChallengesList = ({
  challenges, heading, navLinkText, navLinkNavigateTo, emptyStateText = '', numberOfSkeletonCardsToShow = 12,
  showChallengeAuthorName = true, challengeCardType = 'clickable', onChallengeCardClick,
}) => {
  // styles
  const { theme, font } = useContext(ThemeContext);
  const pageTheme = theme.screenAllChallenges;
  const style = getStyles(pageTheme, theme.utilColors, font);

  // navigation;
  const navigation = useNavigation();

  return (
    <View style={{ marginTop: 15 }}>
      <View style={style.header}>
        <Text style={style.pageTitle}>
          <FormattedMessage
            defaultMessage={'{heading}'}
            description='page title'
            values={{ heading }}
          />
        </Text>
        {
          navLinkText && navLinkNavigateTo
          && <TouchableOpacity onPress={() => navigation.navigate(navLinkNavigateTo)}>
            <Text style={style.myChallengesBtnText}>
              <FormattedMessage
                defaultMessage={'{navLinkText}'}
                description='nav link'
                values={{ navLinkText }}
              />
            </Text>
          </TouchableOpacity>
        }
      </View>
      <View style={style.challengeCardList}>
        {
          challenges
          && challenges
            .map((challenge) => {
              const onClickFn = () => {
                if (challengeCardType === 'link') {
                  navigation.navigate('Challenges', {
                    challengeId: challenge.challengeId,
                    challengeVirtualName: challenge.actionUrl.split('/').pop(),
                  });
                } else {
                  onChallengeCardClick(challenge);
                }
              };

              return <TouchableOpacity
                style={{ marginBottom: 20 }}
                key={challenge.challengeId}
                onPress={onClickFn}
                activeOpacity={0.5}
              >
                <View style={style.challengeCardItem}>
                  <Image
                    source={{
                      uri: challenge.imgPath,
                    }}
                    style={style.challengeCardImage}
                  />
                </View>
                <Text style={style.challengeCardTitle}>{challenge.challengeName}</Text>
                {
                  showChallengeAuthorName && <Text style={style.challengeCardAuthor}>{`by ${challenge.creatorName}`}</Text>
                }
              </TouchableOpacity>;
            })
        }
        {
          !challenges
          && <>
            {
              new Array(numberOfSkeletonCardsToShow).fill(1).map((item, idx) => (
                <View style={[style.challengeCardItem, { width: '100%' }]} key={idx}>
                  <Skeleton width='100%' height={170} style={{ borderRadius: 10, marginBottom: 5 }} />
                  <Skeleton width='25%' height={24} style={{ borderRadius: 10, marginBottom: 5 }} />
                  {
                    showChallengeAuthorName && <Skeleton width='25%' height={24} style={{ borderRadius: 10, marginBottom: 5 }} />
                  }
                </View>
              ))
            }
          </>
        }
        {
          challenges && challenges.length === 0 && <View style={style.emptyStateContainer}>
            <Image
              source={EmptyStateImage}
              style={style.emptyStateImage}
              resizeMode='stretch'
            />
            <Text style={style.emptyStateText}>
              <FormattedMessage
                defaultMessage={'{emptyStateText}'}
                description='empty state text'
                values={{
                  emptyStateText,
                }}
              />
            </Text>
          </View>
        }
      </View>
    </View>
  );
};

export default ChallengesList;
