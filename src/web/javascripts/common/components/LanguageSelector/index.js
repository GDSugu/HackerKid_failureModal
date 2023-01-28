import React from 'react';
import { FormattedMessage } from 'react-intl';
import { $ } from '../../framework';
import { getValueToLanguageDisplayNameMap, getLanguageDisplayNameFromValue } from '../../Functions/ide';

const valueToLanguageDisplayNameMap = getValueToLanguageDisplayNameMap();

const LanguageSelector = ({
  className = '', selectedLanguageValue, onLanguageOptionClick, onDropDownOpen = () => {}, onLoad,
}) => {
  React.useEffect(() => {
    onLoad();

    $('.dropdown').on('show.bs.dropdown', onDropDownOpen);

    return () => {
      $('.dropdown').off('show.bs.dropdown');
    };
  }, []);

  return (
  <div className={`language-selector-container ${className}`}>
  <div className='dropdown mr-md-4'>
    <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
      <span className='overline' id='selected-language-display'>
        <FormattedMessage
          defaultMessage={'{selectedLanguageDisplayName}'}
          description='selected language display name'
          values={{
            selectedLanguageDisplayName: getLanguageDisplayNameFromValue(selectedLanguageValue),
          }}
            />
      </span>
      <i className='fa fa-chevron-down dropdown-icon'></i>
    </button>
      <div className="dropdown-menu dropdown-menu-left" id='language-selector-dropdown'>
      {
        Object.keys(valueToLanguageDisplayNameMap)
          .map((value, index) => <button className={`dropdown-item overline ${selectedLanguageValue === value ? 'active' : ''}`} key={index} data-language-value={value} onClick={onLanguageOptionClick}>
            <FormattedMessage defaultMessage={'{languageDisplayName}'} description='language option' values={{ languageDisplayName: valueToLanguageDisplayNameMap[value] }}/>
          </button>)
      }
    </div>
  </div>
  </div>
  );
};

export default LanguageSelector;
