import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import SvgSearch from '../../icons/SvgSearch';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';

const {height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  desTextStyle: {
    width: 200,
    marginTop: 8,
  },
  overAll: {
    height: height - 430,
  },
  titleStye:{
    marginTop: 16
  }
});
const ListEmpty = () => {
  return (
    <Flex center middle overrideStyle={styles.overAll}>
      <SvgSearch height={100} width={100} />
      <Text size={20} bold overrideStyle={styles.titleStye}>
        Item not found
      </Text>
      <Text align={'center'} overrideStyle={styles.desTextStyle} color="gray">
        Try searching the item with a different keyword.
      </Text>
    </Flex>
  );
};

export default ListEmpty;
