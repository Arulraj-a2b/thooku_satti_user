import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import Text from "../Text/Text";
import { buttonHelper } from "./buttonHelper";
import { buttonStyles } from "./buttonStyles";

const defaultProps = {
  height: "medium",
  types: "primary",
};


const Button = ({
  children,
  flex,
  overrideStyle,
  height,
  types,
  onClick,
  disabled,
}) => {
  const [styleContainer, setStyleContainer] = useState([]);
  let textColor = "white";

  if (types === "secondary") {
    textColor = "theme";
  }
  useEffect(() => {
    handleStyleContainer();
  }, [disabled]);

  const handleStyleContainer = () => {
    const styleContainerArray = [buttonStyles.common];
    buttonHelper({
      flex,
      styleArray: styleContainerArray,
      height,
      types,
      disabled,
    });
    setStyleContainer(styleContainerArray);
  };

  return (
    <TouchableOpacity
      style={[styleContainer, overrideStyle]}
      onPress={onClick}
      disabled={disabled}
    >
      {typeof children === "string" || typeof children === "number" ? (
        <Text bold size={16} color={textColor}>
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

Button.defaultProps = defaultProps;

export default Button;