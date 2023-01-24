import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { getValueToLanguageDisplayNameMap } from '../../../web/javascripts/common/Functions/ide';

const valueToLanguageDisplayNameMap = getValueToLanguageDisplayNameMap();

const LanguageSelector = ({
  style,
  value,
  setValue,
  open,
  setOpen,
  onload,
  onChangeValue,
}) => {
  const [items, setItems] = React.useState(() => Object.keys(
    valueToLanguageDisplayNameMap,
  ).map((key) => ({
    label: valueToLanguageDisplayNameMap[key],
    value: key,
  })));

  React.useEffect(() => {
    onload();
  }, []);

  return (
    <DropDownPicker
      open={open}
      setOpen={setOpen}
      setValue={setValue}
      onChangeValue={onChangeValue}
      value={value}
      items={items}
      setItems={setItems}
      style={style.languageSelector}
      dropDownContainerStyle={style.languageSelectorDropdown}
      selectedItemContainerStyle={style.languageSelectorActiveItem}
      textStyle={style.languageSelectorItemText}
      autoScroll={true}
      showTickIcon={false}
      searchable={false}
    />
  );
};

export default LanguageSelector;
