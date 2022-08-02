import React, {useState, useEffect, forwardRef} from 'react';
import {TextInput, View} from 'react-native';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import {GARY_2} from '../UikitUtils/colors';
import {isEmpty} from '../UikitUtils/validators';
import {inptTextHelper} from './inputTextHelper';
import {inputTextStyles} from './InputTextStyles';
import LabelWrapper from './LabelWrapper';

const InputText = (
  {
    placeholder,
    overrideStyle,
    height = 40,
    actionLeft,
    actionRight,
    types = 'round',
    textAlign,
    value,
    onChange,
    keyboardType,
    maxLength,
    autoFocus,
    keyboardAppearance,
    textContentType,
    index,
    selectionColor,
    secureTextEntry,
    editable,
    onKeyPress,
    label,
    numberOfLines,
    multiline,
    onFocus,
    onBlur,
    error,
    required,
    actionLeftStyle,
    touched,
    errors,
    name,
    disabled,
  },
  ref,
) => {
  const [styleContainer, setStyleContainer] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    handleStyleContainer();
  }, [error, disabled]);

  const handleStyleContainer = () => {
    const styleContainerArray = [inputTextStyles.common];
    inptTextHelper({
      styleArray: styleContainerArray,
      height,
      actionLeft,
      types,
      textAlign,
      error,
      disabled,
    });
    if (overrideStyle) {
      styleContainerArray.push(overrideStyle);
    }
    setStyleContainer(styleContainerArray);
  };

  const handleFocus = e => {
    setIsFocused(true);
    if (typeof onFocus === 'function') {
      onFocus(e);
    }
  };

  const handleBlur = e => {
    setIsFocused(false);
    if (typeof onBlur === 'function') {
      onBlur(e);
    }
  };
  const focussedStyle = isFocused ? inputTextStyles.selected : {};

  return (
    <LabelWrapper label={label} required={required}>
      <View>
        <View style={[inputTextStyles.viewContainer]}>
          {typeof actionLeft === 'function' && (
            <View style={[inputTextStyles.actionLeftStyle, actionLeftStyle]}>
              {actionLeft()}
            </View>
          )}
          <TextInput
            key={index}
            autoFocus={autoFocus}
            ref={ref}
            value={value}
            textAlign={textAlign}
            placeholder={placeholder}
            style={[...styleContainer, focussedStyle]}
            keyboardType={keyboardType}
            maxLength={maxLength}
            keyboardAppearance={keyboardAppearance}
            textContentType={textContentType}
            selectionColor={selectionColor}
            secureTextEntry={secureTextEntry}
            editable={editable}
            placeholderTextColor={GARY_2}
            onChangeText={onChange}
            onKeyPress={onKeyPress}
            multiline={multiline}
            numberOfLines={numberOfLines}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {typeof actionRight === 'function' && (
            <View style={inputTextStyles.actionRightStyle}>
              {actionRight()}
            </View>
          )}
        </View>
        {!isEmpty(error) && (
          <ErrorMessage name={name} touched={touched} errors={errors} />
        )}
      </View>
    </LabelWrapper>
  );
};

export default forwardRef(InputText);
