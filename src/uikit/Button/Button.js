import React, {useEffect, useState} from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import Flex from '../Flex/Flex';
import Text from '../Text/Text';
import {BLACK} from '../UikitUtils/colors';
import {buttonHelper} from './buttonHelper';
import {buttonStyles} from './buttonStyles';

const defaultProps = {
  height: 'medium',
  types: 'primary',
};

const Button = ({
  children,
  flex,
  overrideStyle,
  height,
  types,
  onClick,
  disabled,
  normal,
  round,
  isLoader,
}) => {
  const [styleContainer, setStyleContainer] = useState([]);
  let textColor = 'gray_1';

  if (types === 'secondary') {
    textColor = 'secondary';
  }

  useEffect(() => {
    handleStyleContainer();
  }, []);

  const handleStyleContainer = () => {
    const styleContainerArray = [buttonStyles.common];
    buttonHelper({
      flex,
      styleArray: styleContainerArray,
      height,
      types,
      normal,
      round,
    });
    setStyleContainer(styleContainerArray);
  };

  return (
    <TouchableOpacity
      style={[styleContainer, overrideStyle, {opacity: disabled ? 0.5 : 1}]}
      onPress={onClick}
      disabled={disabled}>
      <Flex row center middle>
        {typeof children === 'string' || typeof children === 'number' ? (
          <Text bold size={16} color={textColor}>
            {children}
          </Text>
        ) : (
          children
        )}
        {isLoader && (
          <ActivityIndicator
            color={BLACK}
            size="small"
            style={{marginLeft: 8}}
          />
        )}
      </Flex>
    </TouchableOpacity>
  );
};

Button.defaultProps = defaultProps;

export default Button;
