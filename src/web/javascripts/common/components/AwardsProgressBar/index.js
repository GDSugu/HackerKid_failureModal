import React from 'react';
import { FormattedMessage } from 'react-intl';

const AwardsProgressBar = ({
  progressDetailsObj,
}) => {
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

  return <div className='progress-bar'>
    <div className='progress' style={{ width: progressDetailsObj ? `${(progressDetailsObj.progress / progressDetailsObj.total) * 100}%` : '100%' }
    }>
      {
        progressDetailsObj && progressDetailsObj.progress
        && <div className='progress-textual-indicator'>
          <span className='progress-as-text'>
            <FormattedMessage
              defaultMessage={'{progress}{progressSuffix} {unit}'}
              description='progress textual representation'
              values={{
                progress: Math.ceil(progressDetailsObj.progress),
                progressSuffix: getProgressSuffix(Math.ceil(progressDetailsObj.progress),
                  progressDetailsObj.unit),
                unit: getFormattedUnit(progressDetailsObj.progress, progressDetailsObj.unit),
              }}
            />
          </span>
          <i className="fa fa-caret-down arrow"></i>
        </div>
      }
    </div>
  </div>;
};

export default AwardsProgressBar;
