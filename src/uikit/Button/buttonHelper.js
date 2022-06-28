import { isEmpty } from "../UikitUtils/validators";
import { buttonStyles } from "./buttonStyles";

export const isButtonHeightKey = (str) => str !== undefined;

export const buttonHelper = ({ flex, styleArray, height, types, disabled ,normal}) => {
  if (!isEmpty(flex)) {
    styleArray.push({ flex });
  }

  if (isButtonHeightKey(height)) {
    if (height === "small") {
      styleArray.push(buttonStyles.smallHeight);
    } else if (height === "medium") {
      styleArray.push(buttonStyles.mediumHeight);
    } else if (height === "large") {
      styleArray.push(buttonStyles.largeHeight);
    }
  }

  if (types === "primary") {
    styleArray.push(buttonStyles.primaryBtn);
  } else if (types === "secondary") {
    styleArray.push(buttonStyles.secondaryBtn);
  }

  if(normal){
    styleArray.push(buttonStyles.normal);

  }
  if (disabled) {
    styleArray.push(buttonStyles.disabled);
  }
};
