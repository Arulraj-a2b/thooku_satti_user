import React, {memo, useCallback} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import SvgCheckBox from '../../icons/SvgCheckBox';
import SvgCheckBoxOutline from '../../icons/SvgCheckBoxOutline';
import {PRIMARY} from '../UikitUtils/colors';
import CheckboxLabel from './CheckboxLabel';

const defaultProps = {
  size: 24,
  name: '',
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

const CheckBox = ({
  size = 24,
  onClick,
  checked,
  onBlur,
  label,
  labelColor,
  labelSize,
  scale,
  name = '',
  value,
  testID,
}) => {
  const handleOnClick = useCallback(
    e => {
      const isValuePresent = Array.isArray(value);
      if (typeof onClick === 'function') {
        if (!value) {
          e.target.value = [name];
        } else if (isValuePresent) {
          if (value.includes(name)) {
            const filteredValue = value.filter(v => v !== name);
            e.target.value = filteredValue;
          } else {
            e.target.value = [...value, name];
          }
        }
        onClick(e);
      }
    },
    [onClick],
  );

  return (
    <TouchableOpacity
      testID={testID}
      onPress={handleOnClick}
      onBlur={onBlur}
      activeOpacity={1}
      style={styles.container}>
      {checked ? (
        <SvgCheckBox width={size} height={size} fill={PRIMARY} scale={scale} />
      ) : (
        <SvgCheckBoxOutline scale={scale} width={size} height={size} />
      )}
      <CheckboxLabel
        label={label}
        labelColor={labelColor}
        labelSize={labelSize}
      />
    </TouchableOpacity>
  );
};

CheckBox.defaultProps = defaultProps;

export default memo(CheckBox);
