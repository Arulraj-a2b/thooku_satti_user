import React, {forwardRef, useState} from 'react';
import {View} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {
  BORDER_COLOR,
  ERROR,
  PRIMARY,
  TRANSPARENT,
  WHITE,
} from '../UikitUtils/colors';
import {isEmpty} from '../UikitUtils/validators';

const PhoneInputText = (
  {actionLeft, actionLeftStyle, error, onChange, placeholder},
  ref,
) => {
  const [isFocused, setIsFocused] = useState(false);
  let borderColor = BORDER_COLOR;

  if (isFocused) {
    if (!isEmpty(error)) {
      borderColor = ERROR;
      console.log('error', error);
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
    <View
      style={[
        {
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
          alignItems: 'center',
          width: '100%',
          flex: 1,
        },
      ]}>
      {typeof actionLeft === 'function' && (
        <View
          style={[
            actionLeftStyle,
            {position: 'absolute', zIndex: 11, left: -4},
          ]}>
          {actionLeft()}
        </View>
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
        }}
        countryPickerButtonStyle={{marginLeft: 28}}
        containerStyle={{
          backgroundColor: WHITE,
          borderWidth: 1,
          borderColor: borderColor,
          height: 40,
          borderRadius: 20,
          width: '100%',
        }}
        textContainerStyle={{
          backgroundColor: TRANSPARENT,
        }}
        textInputStyle={{
          height: 40,
          padding: 0,
        }}
        defaultCode="IN"
        layout="second"
        onChangeFormattedText={onChange}
      />
    </View>
  );
};

export default forwardRef(PhoneInputText);
