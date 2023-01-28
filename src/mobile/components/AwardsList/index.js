import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { FormattedMessage } from 'react-intl';
import AwardItem from '../AwardItem';
import Icon from '../../common/Icons';

const AwardsList = ({
  style,
  awards,
  onAwardItemPress = () => { },
  limit,
  totalAwards,
  showSeeMoreBtn = false,
  onSeeMoreBtnPress = () => { },
  defaultStructure = false,
}) => <View>
    {
      awards && awards.map((award, idx) => <AwardItem
        style={style}
        key={idx}
        currentAwardDetails={defaultStructure ? award.currentAward : award}
        repeatingAwards={award.repeatingAwards ? award.repeatingAwards : false}
        onPress={onAwardItemPress}
      />)
    }
    {
      awards && showSeeMoreBtn && (limit === 15 && totalAwards > limit)
      && <TouchableOpacity
        style={style.seeAllAwardsBtn}
        onPress={() => onSeeMoreBtnPress(0)}>
        <Text style={[style.btnText, style.textColor1]}>
          <FormattedMessage defaultMessage={'See All Awards'} description='see all awards btn text' />
        </Text>
        <Icon type='FontAwesome5' name={'angle-down'} size={20} color={style.textColor1.color} />
      </TouchableOpacity>
    }
    {
      awards && limit === 0 && <TouchableOpacity
        style={style.seeAllAwardsBtn}
        onPress={() => onSeeMoreBtnPress(15)}>
        <Text style={[style.btnText, style.textColor1]}>
          <FormattedMessage defaultMessage={'See Less Awards'} description='see less awards btn text' />
        </Text>
        <Icon type='FontAwesome5' name={'angle-up'} size={20} color={style.textColor1.color} />
      </TouchableOpacity>
    }
  </View>;

export default AwardsList;
