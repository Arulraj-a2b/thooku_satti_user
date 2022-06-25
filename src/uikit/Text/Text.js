import React, {useEffect, useState} from 'react';
import {Text as TextComponent} from 'react-native';
import {textHelper} from './textHelper';
import {textStyles} from './textStyle';

const Text = ({
  children,
  overrideStyle,
  flex,
  bold,
  ellipsizeMode,
  numberOfLines,
  size = 14,
  color = 'primary',
  align,
  transform,
}) => {
  const [styleContainer, setStyleContainer] = useState([]);

  useEffect(() => {
    handleStyleContainer();
  }, [overrideStyle, color,bold]);

  const handleStyleContainer = () => {
    const styleContainerArray = [textStyles.common];
    textHelper({
      flex,
      styleArray: styleContainerArray,
      bold,
      color,
      align,
      transform,
      size,
    });
    if (overrideStyle) {
      styleContainerArray.push(overrideStyle);
    }
    setStyleContainer(styleContainerArray);
  };

  return (
    <TextComponent
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[...styleContainer, {fontSize: size}]}>
      {children}
    </TextComponent>
  );
};

export default Text;
