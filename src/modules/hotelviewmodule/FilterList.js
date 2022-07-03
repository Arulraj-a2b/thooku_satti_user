import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';

const styles = StyleSheet.create({
  filterText: {
    marginVertical: 8,
  },
});

const FilterList = ({handleFilter, isFilter, item}) => {
  return (
    <TouchableOpacity onPress={() => handleFilter(item.CategoryName)}>
      <Flex row center between overrideStyle={styles.filterText}>
        <Text
          bold
          color={item.CategoryName === isFilter ? 'theme' : 'primary'}
          transform={'capitalize'}>
          {item.CategoryName}
        </Text>
        <Text bold color={item.CategoryName === isFilter ? 'theme' : 'primary'}>
          {item.Count}
        </Text>
      </Flex>
    </TouchableOpacity>
  );
};

export default FilterList;
