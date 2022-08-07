import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {BORDER_COLOR, GARY_2} from '../../uikit/UikitUtils/colors';
import LabelWrapper from '../InputText/LabelWrapper';

const styles = StyleSheet.create({
  overAll: {
    borderColor: BORDER_COLOR,
  },
  searchTextInputStyle: {borderColor: BORDER_COLOR},
  dropDownContainerStyle: {borderColor: BORDER_COLOR},
  searchContainerStyle: {borderBottomColor: BORDER_COLOR},
});

const DropDown = ({
  value,
  setValue,
  setData,
  data,
  label,
  required,
  placeholder,
  valueKey = 'value',
  labelKey = 'label',
  ArrowUpIconComponent,
  ArrowDownIconComponent,
  searchPlaceholder,
  itemSeparator,
  renderListItem,
  showArrowIcon
}) => {
  const [open, setOpen] = useState(false);

  return (
    <LabelWrapper label={label} required={required}>
      <DropDownPicker
        searchPlaceholder={searchPlaceholder}
        listMode="MODAL"
        placeholderStyle={{color: GARY_2}}
        schema={{label: labelKey, value: valueKey}}
        placeholder={placeholder}
        style={styles.overAll}
        open={open}
        value={value}
        items={data}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setData}
        searchable
        ArrowDownIconComponent={ArrowDownIconComponent}
        ArrowUpIconComponent={ArrowUpIconComponent}
        searchTextInputStyle={styles.searchTextInputStyle}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        searchContainerStyle={styles.searchContainerStyle}
        itemSeparator={itemSeparator}
        renderListItem={renderListItem}
        itemSeparatorStyle={{backgroundColor: BORDER_COLOR}}
        showArrowIcon={showArrowIcon}
      />
    </LabelWrapper>
  );
};

export default DropDown;
