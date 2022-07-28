import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import Text from '../Text/Text';

const styles = StyleSheet.create({
  text: {
    marginLeft: 8,
    maxWidth: '91%',
    overflow: 'hidden',
  },
});
const CheckboxLabel = ({labelSize, labelColor, label}) => {
  if (!label) {
    return null;
  }
  return (
    <Text
      testID="label"
      ellipsizeMode="tail"
      size={labelSize}
      color={labelColor}
      overrideStyle={styles.text}>
      {label}
    </Text>
  );
};

export default memo(
  CheckboxLabel,
  (prevProps, nextProps) => prevProps.label === nextProps.label,
);
