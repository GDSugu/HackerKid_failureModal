import React from 'react';
import { FormattedMessage } from 'react-intl';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../../common/Icons';

const AwardProgressBar = ({
  style,
  contentContainerStyle = {},
  progressDetailsObj,
}) => {
  const width = progressDetailsObj ? `${(progressDetailsObj.progress / progressDetailsObj.total) * 100}%` : '100%';

  const ordinalSuffixOf = (i) => {
    const j = i % 10;
    const k = i % 100;
    if (j === 1 && k !== 11) {
      return 'st';
    }
    if (j === 2 && k !== 12) {
      return 'nd';
    }
    if (j === 3 && k !== 13) {
      return 'rd';
    }
    return 'th';
  };

  const getFormattedUnit = (progress, unit) => {
    let formattedUnit = '';
    switch (unit) {
      case 'day': {
        formattedUnit = unit;
        break;
      }
      case 'time': {
        formattedUnit = 'time';
        break;
      }
      default: {
        if (progress > 1) {
          formattedUnit = `${unit}s`;
        } else {
          formattedUnit = unit;
        }
        break;
      }
    }

    return formattedUnit;
  };

  const getProgressSuffix = (progress, unit) => {
    let suffix = '';
    if (unit === 'day' || unit === 'time') {
      suffix = ordinalSuffixOf(progress);
    }

    return suffix;
  };

  return <View
    style={[style.awardProgressBar, contentContainerStyle]}>
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={style.awardProgressGradient}
      style={[style.awardGradient, { width, position: 'relative' }]}
      useAngle={true}
      angle={270}
    >
      {
        progressDetailsObj && !!progressDetailsObj.progress && <View style={[style.progressTextualFormContainer, { position: 'absolute', right: 0, bottom: 2 }]}>
          <View style={{
            position: 'absolute', right: '50%', width: 100, transform: [{ translateX: 80 }], bottom: 8,
          }}>
            <Text style={[style.smallestText, {
              color: 'black',
              flex: 1,
            }]}>
              <FormattedMessage
                defaultMessage={'{progress}{progressSuffix} {unit}'}
                description='progress textual representation'
                values={{
                  progress: progressDetailsObj.progress,
                  progressSuffix: getProgressSuffix(progressDetailsObj.progress,
                    progressDetailsObj.unit),
                  unit: getFormattedUnit(progressDetailsObj.progress, progressDetailsObj.unit),
                }}
              />
            </Text>
          </View>
          <Icon
            type='FontAwesome5'
            name={'caret-down'}
            size={12}
            color={'black'} />
        </View>
      }
    </LinearGradient>
  </View>;
};

export default AwardProgressBar;
