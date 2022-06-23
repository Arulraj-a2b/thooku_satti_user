import React from 'react';
import Text from '../Text/Text';

const ErrorMessage = ({name, errors, touched}) => {
  if (errors && typeof errors[name] === 'string' && touched[name]) {
    return (
      <Text overrideStyle={{marginTop: 4}} color="error" size={12}>
        {errors[name]}
      </Text>
    );
  }
  return null;
};
export default ErrorMessage;
