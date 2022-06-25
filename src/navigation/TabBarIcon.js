import React from 'react';
import {StyleSheet} from 'react-native';
import Flex from '../uikit/Flex/Flex';

export const styles = StyleSheet.create({
  overAll: {
    marginTop: 16,
  },
});

const TabBarIcon = ({icon}) => {
  return (
    <Flex center middle overrideStyle={styles.overAll}>
      {icon}
    </Flex>
  );
};

export default TabBarIcon;
