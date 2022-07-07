import {isEmpty} from '../UikitUtils/validators';
import {inputTextStyles} from './InputTextStyles';

export const inptTextHelper = ({
  styleArray,
  height,
  actionLeft,
  types,
  textAlign,
  error,
  disabled
}) => {
  if (!isEmpty(height)) {
    styleArray.push({height});
  }
  if (typeof actionLeft === 'function') {
    styleArray.push(inputTextStyles.actionLeftInputStyle);
  }

  if (!isEmpty(types)) {
    if (types === 'normal') {
      styleArray.push(inputTextStyles.normal);
    } else if (types === 'round') {
      styleArray.push(inputTextStyles.round);
    }
  }
  if (error) {
    styleArray.push(inputTextStyles.error);
  } else {
    styleArray.push(inputTextStyles.commonBorder);
  }

  if (!isEmpty(textAlign)) {
    if (textAlign === 'center') {
      styleArray.push(inputTextStyles.alignCenter);
    } else if (textAlign === 'right') {
      styleArray.push(inputTextStyles.alignRight);
    }
  }

  if(disabled){
    styleArray.push(inputTextStyles.disabled);
  }
};
