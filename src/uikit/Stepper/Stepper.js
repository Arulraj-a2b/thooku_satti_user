import React, {useState} from 'react';
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
  // const [isValue, setValue] = useState(0);

  const handleIncrement = () => {
    // setValue(pre => pre + 1);
    if (typeof onChange !== 'undefined') {
      onChange(pre => pre + 1);
    }
    if (typeof onSubmit !== 'undefined') {
      onSubmit();
    }
  };

  const handleIDecrement = () => {
    // setValue(pre => pre - 1);
    if (typeof onChange !== 'undefined') {
      onChange(pre => pre - 1);
    }
    if (typeof onSubmit !== 'undefined') {
      onSubmit();
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
