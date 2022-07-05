import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import SvgDecrement from '../../icons/SvgDecrement';
import SvgIncrement from '../../icons/SvgIncrement';
import Flex from '../Flex/Flex';
import Text from '../Text/Text';

const styles = StyleSheet.create({
  textStyle: {
    paddingHorizontal: 8,
  },
});

const Stepper = ({onChange, onSubmit, value}) => {
  const handleIncrement = () => {
    if (typeof onChange !== 'undefined') {
      if (typeof onSubmit !== 'undefined') {
        onSubmit(value+1);
      }
      onChange(pre => pre + 1);
    }
  };

  const handleIDecrement = () => {
    if (typeof onChange !== 'undefined') {
      if (typeof onSubmit !== 'undefined') {
        onSubmit(value-1);
      }
      onChange(pre => pre - 1);
    }
  };

  return (
    <Flex row center>
      <Pressable onPress={handleIDecrement} disabled={value === 0}>
        <SvgDecrement />
      </Pressable>
      <Text bold overrideStyle={styles.textStyle}>
        {value}
      </Text>
      <Pressable onPress={handleIncrement}>
        <SvgIncrement />
      </Pressable>
    </Flex>
  );
};

export default Stepper;
