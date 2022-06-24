import {Platform} from 'react-native';

export const isEmpty = value =>
  value === undefined || value === null || value === '';

export const secureImage = imageUrl => {
  if (isEmpty(imageUrl)) {
    return '';
  }
  if (Platform.OS === 'web') {
    return imageUrl.replace(/(http:\/\/)/, '//').replace(/\s/g, '%20');
  }
  return imageUrl.replace(/(http:\/\/)/, 'https://').replace(/\s/g, '%20');
};

export const isNotNumber = value => {
  if (!isEmpty(value)) {
    const parsedValue = Number(value);
    return Number.isNaN(parsedValue);
  }
  return true;
};

/**
 * Validates All countries phone number
 * @param { string | number } value phone number
 */
export const isValidPhone = value => {
  if (typeof value === 'string' || typeof value === 'number') {
    const result =
      value
        .toString()
        .match(
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
        ) !== null;
    return result && !value.toString().includes('.');
  }
  return false;
};

export const isCharacterLetter = value => {
  if (typeof value === 'string' || typeof value === 'number') {
    return value.toString().match(/[a-zA-Z]/) !== null;
  }
  return false;
};

export const isNumber = value => {
  if (typeof value === 'string' || typeof value === 'number') {
    return value.toString().match(/^\d*$/) !== null;
  }
  return false;
};

export const isValidEmail = value => {
  if (typeof value === 'string') {
    return (
      value
        .trim()
        .match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/) !==
      null
    );
  }
  return false;
};

export const isValidPassword = value => {
  if (typeof value === 'string') {
    return value.trim().match(/^(?=.*?[A-Z])(?=.*?[a-z]).{8,12}/) !== null;
  }
  return false;
};

/**
 * Returns an error object with keys error and message if
 * the given value is not an number or less than zero
 * @param { string | number } value input value
 */
export const isRequiredNumber = value => {
  if (!value) {
    return {message: 'This field is required!', error: true};
  }

  if (value && isNotNumber(value)) {
    return {message: 'Its not a valid number!!', error: true};
  }
  const formattedValue = Number(value);
  if (formattedValue <= 0) {
    return {message: 'Can not be zero or negative value!!!', error: true};
  }
  if (!isNumber(value) && value > 0) {
    return {message: 'Can not be decimal', error: true};
  }
  return {message: '', error: false};
};
