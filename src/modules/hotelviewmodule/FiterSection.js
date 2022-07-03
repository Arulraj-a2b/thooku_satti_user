import React from 'react';
import {StyleSheet,Pressable} from 'react-native';
import SvgFilter from '../../icons/SvgFilter';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';

const styles = StyleSheet.create({
  overAll: {
    marginBottom: 20,
    marginTop: 20,
  },
});

const FiterSection = ({handleOpen}) => {
  return (
    <Flex row center between overrideStyle={styles.overAll}>
      <Text bold size={20}>
        Sort By
      </Text>
      <Pressable onPress={handleOpen}>
        <SvgFilter />
      </Pressable>
    </Flex>
  );
};

export default FiterSection;
