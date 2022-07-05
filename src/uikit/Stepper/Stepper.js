import React from 'react';
import {Pressable, ProgressBarAndroid, StyleSheet, View} from 'react-native';
import SvgDecrement from '../../icons/SvgDecrement';
import SvgIncrement from '../../icons/SvgIncrement';
import Flex from '../Flex/Flex';
import Text from '../Text/Text';
import {PRIMARY} from '../UikitUtils/colors';

const styles = StyleSheet.create({
  textStyle: {
    paddingHorizontal: 8,
  },
  overAll: {
    opacity: 0.5,
  },
});

const Stepper = ({onChange, onSubmit, value, isLoader = false}) => {
  const handleIncrement = () => {
    if (typeof onChange !== 'undefined') {
      if (typeof onSubmit !== 'undefined') {
        onSubmit(value + 1);
      }
      onChange(pre => pre + 1);
    }
  };

  const handleIDecrement = () => {
    if (typeof onChange !== 'undefined') {
      if (typeof onSubmit !== 'undefined') {
        onSubmit(value - 1);
      }
      onChange(pre => pre - 1);
    }
  };

  return (
    <Flex overrideStyle={{position: 'relative'}}>
      <Flex row center overrideStyle={isLoader ? styles.overAll : {}}>
        <Pressable
          onPress={handleIDecrement}
          disabled={(value === 0 || isLoader)}>
          <SvgDecrement />
        </Pressable>
        <Text bold overrideStyle={styles.textStyle}>
          {value}
        </Text>
        <Pressable disabled={isLoader} onPress={handleIncrement}>
          <SvgIncrement />
        </Pressable>
      </Flex>
      {isLoader && (
        <View style={{position: 'absolute', bottom: -14, width: '100%'}}>
          <ProgressBarAndroid styleAttr="Horizontal" color={PRIMARY} />
        </View>
      )}
    </Flex>
  );
};

export default Stepper;
