import React from 'react';
import {Pressable, ProgressBarAndroid, StyleSheet, View} from 'react-native';
import SvgDecrement from '../../icons/SvgDecrement';
import SvgIncrement from '../../icons/SvgIncrement';
import Flex from '../Flex/Flex';
import Text from '../Text/Text';
import {GRAY_6, PRIMARY, PRIMARY_TEXT} from '../UikitUtils/colors';
import {isEmpty} from '../UikitUtils/validators';

const styles = StyleSheet.create({
  textStyle: {
    paddingHorizontal: 8,
  },
  overAll: {
    opacity: 0.5,
  },
});

const Stepper = ({
  onChange,
  onSubmit,
  value = 0,
  isLoader = false,
  disabled,
  name,
}) => {
  const handleIncrement = () => {
    if (typeof onChange !== 'undefined') {
      if (typeof onSubmit !== 'undefined') {
        onSubmit(value + 1);
      }
      if (isEmpty(name)) {
        onChange(pre => pre + 1);
      } else {
        onChange(name, Number(value) + 1);
      }
    }
  };

  const handleIDecrement = () => {
    if (typeof onChange !== 'undefined') {
      if (typeof onSubmit !== 'undefined') {
        onSubmit(value - 1);
      }
      onChange(pre => pre - 1);

      if (isEmpty(name)) {
        onChange(pre => pre + 1);
      } else {
        onChange(name, Number(value) - 1);
      }
    }
  };

  return (
    <Flex overrideStyle={{position: 'relative'}}>
      <Flex row center overrideStyle={isLoader ? styles.overAll : {}}>
        <Pressable
          onPress={handleIDecrement}
          disabled={value === 0 || isLoader || disabled}>
          <SvgDecrement fill={!disabled ? PRIMARY : GRAY_6} />
        </Pressable>
        <Text
          bold
          overrideStyle={styles.textStyle}
          color={disabled ? 'gray' : 'primary'}>
          {value}
        </Text>
        <Pressable disabled={isLoader || disabled} onPress={handleIncrement}>
          <SvgIncrement fill={!disabled ? PRIMARY : GRAY_6} />
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
