import React, {forwardRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {
  BORDER_COLOR,
  ERROR,
  PRIMARY,
  TRANSPARENT,
  WHITE,
} from '../UikitUtils/colors';
import {isEmpty} from '../UikitUtils/validators';

const styles = StyleSheet.create({
  countryPickerButtonStyle: {
    marginLeft: 28,
  },
  containerStyle: {
    backgroundColor: WHITE,
    borderWidth: 1,
    height: 40,
    borderRadius: 20,
    width: '100%',
  },
  textContainerStyle: {
    backgroundColor: TRANSPARENT,
  },
  textInputStyle: {
    height: 40,
    padding: 0,
    fontSize: 14,
  },
  overAll: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  actionLeft: {
    position: 'absolute',
    zIndex: 11,
    left: -4,
  },
});

const PhoneInputText = (
  {actionLeft, actionLeftStyle, error, onChange, placeholder, onChangeText},
  ref,
) => {
  const [isFocused, setIsFocused] = useState(false);
  let borderColor = BORDER_COLOR;

  if (isFocused) {
    if (!isEmpty(error)) {
      borderColor = ERROR;
    } else {
      borderColor = PRIMARY;
    }
  } else {
    if (!isEmpty(error)) {
      borderColor = ERROR;
    } else {
      borderColor = BORDER_COLOR;
    }
  }

  return (
    <View style={styles.overAll}>
      {typeof actionLeft === 'function' && (
        <View style={[actionLeftStyle, styles.actionLeft]}>{actionLeft()}</View>
      )}
      <PhoneInput
        ref={ref}
        placeholder={placeholder}
        textInputProps={{
          onFocus: () => {
            setIsFocused(true);
          },
          onBlur: () => {
            setIsFocused(false);
          },
          maxLength: 10,
        }}
        countryPickerButtonStyle={styles.countryPickerButtonStyle}
        containerStyle={[styles.containerStyle, {borderColor: borderColor}]}
        textContainerStyle={styles.textContainerStyle}
        textInputStyle={styles.textInputStyle}
        defaultCode="IN"
        layout="second"
        onChangeFormattedText={onChange}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default forwardRef(PhoneInputText);
