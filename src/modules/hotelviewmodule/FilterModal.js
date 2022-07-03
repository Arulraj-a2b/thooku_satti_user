import React, {memo} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import SvgClose from '../../icons/SvgClose';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {BORDER_COLOR, WHITE} from '../../uikit/UikitUtils/colors';
import {isEmpty} from '../../uikit/UikitUtils/validators';
import FilterList from './FilterList';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: WHITE,
    borderRadius: 4,
    maxHeight: '80%'
  },
  flatListOverAll: {
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  filterContainer: {
    paddingHorizontal: 20,
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
    paddingVertical: 16,
  },
  allContainer: {
    marginTop: 20,
    marginBottom: 8,
  },
});

const FilterHeader = ({close}) => {
  return (
    <Flex row center between overrideStyle={styles.filterContainer}>
      <Text size={20} bold>
        Filter
      </Text>
      <TouchableOpacity onPress={close}>
        <SvgClose height={18} width={18} />
      </TouchableOpacity>
    </Flex>
  );
};

const FilterAll = ({handleFilter, isFilter, totalLength}) => {
  const color = isEmpty(isFilter) ? 'theme' : 'primary';
  return (
    <TouchableOpacity onPress={() => handleFilter('')}>
      <Flex row center between overrideStyle={styles.allContainer}>
        <Text bold color={color}>
          All
        </Text>
        <Text bold color={color}>
          {totalLength}
        </Text>
      </Flex>
    </TouchableOpacity>
  );
};

const FilterModal = ({
  categoryList,
  open,
  close,
  handleFilter,
  isFilter,
  totalLength,
}) => {
  return (
    <Modal animationInTiming={0} animationIn="slideInDown" isVisible={open}>
      <Flex overrideStyle={styles.overAll}>
        <FilterHeader close={close} />
        <FlatList
          onEndReachedThreshold={0.1}
          style={styles.flatListOverAll}
          ListHeaderComponentStyle={styles.ListHeaderComponentStyle}
          ListHeaderComponent={
            <FilterAll
              isFilter={isFilter}
              totalLength={totalLength}
              handleFilter={handleFilter}
            />
          }
          data={categoryList}
          keyExtractor={(item, index) =>
            item.Count.toString() + index.toString()
          }
          renderItem={({item}) => (
            <FilterList
              item={item}
              isFilter={isFilter}
              handleFilter={handleFilter}
            />
          )}
        />
      </Flex>
    </Modal>
  );
};

export default memo(FilterModal);
