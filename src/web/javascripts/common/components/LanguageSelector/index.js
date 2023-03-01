import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { SubscriptionContext } from '../../../../../hooks/pages/root';
import { $, isFeatureEnabled } from '../../framework';
import { getValueToLanguageDisplayNameMap, getLanguageDisplayNameFromValue } from '../../Functions/ide';
import Img from '../Img';

const valueToLanguageDisplayNameMap = getValueToLanguageDisplayNameMap();

const LanguageSelector = ({
  className = '', selectedLanguageValue, onLanguageOptionClick, onDropDownOpen = () => {}, onLoad,
}) => {
  const scrollToSelectedLanguage = () => {
    const questionElement = document.querySelector('.language-selector-container .dropdown-item.active');
    if (questionElement) {
      setTimeout(() => {
        questionElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'start',
        });
      }, 50);
    }
  };

  const onShowDropDown = () => {
    scrollToSelectedLanguage();
    onDropDownOpen();
  };

  React.useEffect(() => {
    onLoad();

    $('.dropdown').on('show.bs.dropdown', onShowDropDown);

    return () => {
      $('.dropdown').off('show.bs.dropdown');
    };
  }, []);

  const { subscriptionData } = React.useContext(SubscriptionContext);

  const ideAllowedLanguages = isFeatureEnabled(subscriptionData, 'ide', 'languages');

  const [unlockedLanguages, setUnlockedLanguages] = React.useState([]);

  const isIdeLocked = () => ideAllowedLanguages && ideAllowedLanguages.enabled
  && ideAllowedLanguages.isPartial;

  useEffect(() => {
    if (ideAllowedLanguages && ideAllowedLanguages.enabled && ideAllowedLanguages.isPartial) {
      setUnlockedLanguages(ideAllowedLanguages.languages);
    }
  }, [ideAllowedLanguages]);

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
      { isIdeLocked() ? (
        Object.keys(valueToLanguageDisplayNameMap)
          .map((value, index) => <button className={`dropdown-item overline ${selectedLanguageValue === value ? 'active' : ''} ${unlockedLanguages && unlockedLanguages.includes(value) ? '' : 'disabled'}`} key={index} data-language-value={value} onClick={unlockedLanguages && unlockedLanguages.includes(value) ? onLanguageOptionClick : null}>
            <FormattedMessage defaultMessage={'{languageDisplayName}'} disabled={!(unlockedLanguages && unlockedLanguages.includes(value)) } description='language option' values={{ languageDisplayName: valueToLanguageDisplayNameMap[value] }}/>
            {unlockedLanguages && unlockedLanguages.includes(value) ? '' : <Img src="/common/feature-lock-gray.png" className="feature-lock" />}
          </button>)
      ) : (
        Object.keys(valueToLanguageDisplayNameMap)
          .map((value, index) => <button className={`dropdown-item overline ${selectedLanguageValue === value ? 'active' : ''}`} key={index} data-language-value={value} onClick={onLanguageOptionClick}>
            <FormattedMessage defaultMessage={'{languageDisplayName}'} description='language option' values={{ languageDisplayName: valueToLanguageDisplayNameMap[value] }}/>
          </button>)
      )
      }
    </div>
  </div>
  </div>
  );
};

export default LanguageSelector;
