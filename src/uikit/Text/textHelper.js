import {isEmpty} from '../UikitUtils/validators';
import {textStyles} from './textStyle';

export const isTextColorKey = str => str !== undefined;

export const textHelper = ({
  flex,
  styleArray,
  bold,
  color,
  align,
  transform,
  size,
}) => {
  if (flex) {
    styleArray.push({flex});
  }

  if (bold) {
    styleArray.push(textStyles.bold);
  }

  if (isTextColorKey(color)) {
    if (color === 'primary') {
      styleArray.push(textStyles.primaryColor);
    } else if (color === 'white') {
      styleArray.push(textStyles.whiteColor);
    } else if (color === 'black') {
      styleArray.push(textStyles.blackColor);
    } else if (color === 'theme') {
      styleArray.push(textStyles.themColor);
    } else if (color === 'gray_1') {
      styleArray.push(textStyles.btnTextColor);
    } else if (color === 'gray') {
      styleArray.push(textStyles.gray);
    } else if (color === 'success') {
      styleArray.push(textStyles.successColor);
    } else if (color === 'link') {
      styleArray.push(textStyles.linkColor);
    } else if (color === 'error') {
      styleArray.push(textStyles.errorColor);
    }
  }
  if (!isEmpty(align)) {
    styleArray.push({textAlign: align});
  }
  if (!isEmpty(transform)) {
    styleArray.push({textTransform: transform});
  }
  if (!isEmpty(size)) {
    styleArray.push({fontSize: size});
  }
};
