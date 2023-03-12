import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  TouchableOpacity, View, Text,
} from 'react-native';
import { SvgUri } from 'react-native-svg';
import AwardProgressBar from '../AwardProgressBar';

const AwardItem = ({
  style,
  currentAwardDetails = false,
  repeatingAwards = false,
  onPress,
}) => <>
    {
      currentAwardDetails && <TouchableOpacity onPress={() => onPress(currentAwardDetails)}>
        <View style={style.awardItem}>
          <View style={style.awardImgContainer}>
            {/* <Image
              source={{ uri: currentAwardDetails.awardImage }}
              style={style.awardImg}
            /> */}
            <View style={style.awardImg}>
              <SvgUri
                uri={currentAwardDetails.awardImage}
                width={'100%'}
                height={'100%'}
              />
            </View>
          </View>
          <View style={style.container}>
            <Text style={[style.textColor1, style.text]}>
              <FormattedMessage defaultMessage={'{awardTitle}'} description='award title'
                values={{
                  awardTitle: currentAwardDetails.awardName,
                }} />
            </Text>
            {
              currentAwardDetails.progressableAward
              && currentAwardDetails.progressDetails.nextAwardIn
              && <Text style={[style.textColor4, style.smallText, style.awardSubtitle]}>
                <FormattedMessage defaultMessage={'Next Achievement: {nextAchievementIn} {unit}'} description='award subtitle'
                  values={{
                    nextAchievementIn: currentAwardDetails.progressDetails.nextAwardIn,
                    unit: currentAwardDetails.progressDetails.nextAwardIn > 1 ? `${currentAwardDetails.progressDetails.unit}s`
                      : currentAwardDetails.progressDetails.unit,
                  }} />
              </Text>
            }
            <AwardProgressBar
              style={style}
              progressDetailsObj={currentAwardDetails.progressDetails} />
          </View>
        </View>
      </TouchableOpacity>
    }
    {
      repeatingAwards && repeatingAwards.map((award, idx) => <TouchableOpacity
        onPress={() => onPress(award)}
        key={idx}>
        <View style={style.awardItem}>
          <View style={style.awardImgContainer}>
            {/* <Image
              source={{ uri: award.awardImage }}
              style={style.awardImg}
            /> */}
            <SvgUri
              uri={award.awardImage}
              width={'100%'}
              height={'100%'}
            />
          </View>
          <View style={style.container}>
            <Text style={[style.textColor1, style.text]}>
              <FormattedMessage defaultMessage={'{awardTitle}'} description='award title'
                values={{
                  awardTitle: award.awardName,
                }} />
            </Text>
            <AwardProgressBar
              style={style}
              progressDetailsObj={award.progressDetails}
            />
          </View>
        </View>
      </TouchableOpacity>)
    }
  </>;

export default AwardItem;
