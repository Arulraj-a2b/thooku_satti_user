import React, {memo, useState, useEffect} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import Text from '../Text/Text';
import {isEmpty} from '../UikitUtils/validators';

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
  },
  required: {
    marginLeft: 4,
  },
  labelStyle: {
    marginBottom: 8,
  },
  labelStyleOne: {
    marginBottom: 0,
  },
});
const LabelWrapper = ({required, children, label}) => {
  const [style, setStyle] = useState();
  useEffect(() => {
    const styleArray = [styles.labelContainer];
    if (isEmpty(label)) {
      styleArray.push(styles.labelStyleOne);
    } else {
      styleArray.push(styles.labelStyle);
    }
    setStyle(styleArray);
  }, [label]);

  return !isEmpty(label) ? (
    <View>
      <View testID="labelStyle" style={style}>
        <Text bold testID="label" size={14} overrideStyle={styles.labelColor}>
          {label}
        </Text>
        {required && (
          <Text
            bold
            testID="required"
            size={14}
            color="theme"
            overrideStyle={styles.required}>
            *
          </Text>
        )}
      </View>
      {children}
    </View>
  ) : (
    <>{children}</>
  );
};

export default memo(
  LabelWrapper,
  (prevProps, nextProps) => prevProps.children === nextProps.children,
);
