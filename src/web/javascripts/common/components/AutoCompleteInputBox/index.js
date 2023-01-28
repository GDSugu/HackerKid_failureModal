import React from 'react';
import { FormattedMessage } from 'react-intl';
import '../../../../stylesheets/common/sass/components/_autoCompleteList.scss';

const AutoCompleteInputBox = ({
  className,
  id,
  label,
  list = [],
  name,
  onSuggestionClick = () => {},
  onInputChange = () => {},
  placeholder,
  value,
  SuggesstionItem = () => <></>,
}, ref) => {
  const autoCompleteRef = React.useRef(null);
  const autoCompleteListRef = React.useRef(null);
  const autoCompleteLoadingRef = React.useRef(null);
  const autoCompleteData = {
    activeSuggestion: 0,
    showSuggestions: false,
    isLoading: false,
  };

  const clearInput = () => {
    autoCompleteRef.current.querySelector('input').value = '';
  };

  const toggleSuggestion = (suggestionState = false) => {
    if (suggestionState) {
      autoCompleteListRef.current.style.display = 'block';
    } else {
      autoCompleteListRef.current.style.display = 'none';
    }
    autoCompleteData.showSuggestions = suggestionState;
  };

  const changeSuggestionSelection = (e) => {
    if (autoCompleteData.showSuggestions) {
      if (e.keyCode === 40) {
        e.preventDefault();
        autoCompleteData.activeSuggestion += 1;
        if (autoCompleteData.activeSuggestion > list.length - 1) {
          autoCompleteData.activeSuggestion = 0;
        }
      } else if (e.keyCode === 38) {
        e.preventDefault();
        autoCompleteData.activeSuggestion -= 1;
        if (autoCompleteData.activeSuggestion < 0) {
          autoCompleteData.activeSuggestion = list.length - 1;
        }
      } else if (e.keyCode === 13) {
        if (list.length) {
          onSuggestionClick(list[autoCompleteData.activeSuggestion]);
        }
        toggleSuggestion(false);
        clearInput();
      }
      const currentActiveElement = autoCompleteListRef.current.querySelector('li.active');
      const nextActiveElement = autoCompleteListRef.current.querySelectorAll('li')[autoCompleteData.activeSuggestion];
      currentActiveElement.classList.remove('active');
      nextActiveElement.classList.add('active');
      autoCompleteListRef.current.scroll(0, nextActiveElement.offsetTop);
    }
  };

  const attachHandler = () => {
    document.addEventListener('keydown', changeSuggestionSelection);
  };

  const detachHandler = () => {
    document.removeEventListener('keydown', changeSuggestionSelection);
  };

  const hideAutoCompleteList = () => {
    detachHandler();
    toggleSuggestion(false);
    autoCompleteData.activeSuggestion = 0;
  };

  const onInput = (e) => {
    hideAutoCompleteList();
    onInputChange(e);
  };

  const onItemClick = (item) => {
    onSuggestionClick(item);
    hideAutoCompleteList();
  };

  const setLoadingState = (loadingState) => {
    autoCompleteData.isLoading = loadingState;
    if (loadingState) {
      autoCompleteLoadingRef.current.style.display = 'block';
    } else {
      autoCompleteLoadingRef.current.style.display = 'none';
    }
  };

  const showAutoCompleteList = () => {
    detachHandler();
    toggleSuggestion(true);
    attachHandler();
  };

  const toggleDisbledState = (disabledStatus) => {
    const elem = autoCompleteRef.current.querySelector('input');
    if (disabledStatus) {
      elem.setAttribute('disabled', 'disabled');
      elem.setAttribute('readonly', 'readonly');
    } else {
      elem.removeAttribute('disabled');
      elem.removeAttribute('readonly');
    }
  };

  const toggleErrorMsg = (showError, errorMessage) => {
    const errorText = autoCompleteRef.current.querySelector('.autocomplete-error-text');
    const inputField = autoCompleteRef.current.querySelector('input');
    if (errorText) {
      if (showError === 'show') {
        errorText.innerHTML = errorMessage;
        inputField.classList.add('is-invalid');
        errorText.style.visibility = 'visible';
      } else if (showError === 'hide') {
        errorText.innerHTML = '';
        inputField.classList.remove('is-invalid');
        errorText.style.visibility = 'hidden';
      }
    }
  };

  React.useImperativeHandle(ref, () => ({
    clearInput,
    hideAutoCompleteList,
    setLoadingState,
    showAutoCompleteList,
    toggleDisbledState,
    toggleErrorMsg,
  }));

  React.useEffect(() => {
    autoCompleteListRef.current.style.display = 'none';
    autoCompleteLoadingRef.current.style.display = 'none';
  }, []);

  React.useEffect(() => {
    if (list?.length) {
      showAutoCompleteList();
    } else {
      hideAutoCompleteList();
    }
    toggleErrorMsg('hide');
    setLoadingState(false);
  }, [list]);

  return <>
    <div className={`form-group autocomplete-container ${name}-autocomplete-field`} ref={autoCompleteRef}>
      <label htmlFor={name}>
        <FormattedMessage
          defaultMessage={'{label}'}
          description={'Autocomplete label'}
          values={{
            label,
          }}
        />
      </label>
      <input
        type="text"
        className={`form-control ${className}`}
        name={name}
        id={id}
        aria-describedby={name}
        placeholder={placeholder}
        value={value?.toString()}
        onChange={onInput}
        autoComplete={'off'}
      />
      <small className="form-text autocomplete-error-text"></small>
      <div className="autocomplete-list"
        ref={autoCompleteListRef}
      >
        {
            <ul className="list-unstyled mb-0">
              {
                list.length
                && list.map((item, index) => <li
                  key={index}
                  className={autoCompleteData.activeSuggestion === index ? 'active' : ''}
                  onClick={() => { onItemClick(item); }}>
                  <SuggesstionItem item={item} />
                </li>)
              }
            </ul>
        }
      </div>
      {
        <div className="autocomplete-loading-container" ref={autoCompleteLoadingRef}>
          <p className="mb-0 text-secondary">
            <FormattedMessage
              defaultMessage={'Searching...'}
              description={'Autocomplete searching text'}
            />
          </p>
        </div>
      }
    </div>
  </>;
};

export default React.forwardRef(AutoCompleteInputBox);
