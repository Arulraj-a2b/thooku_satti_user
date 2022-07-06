import React, {forwardRef} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import FoodCard from './FoodCard';
import FiterSection from './FiterSection';
import {BORDER_COLOR, WHITE} from '../../uikit/UikitUtils/colors';

const styles = StyleSheet.create({
  overAll: {
    // paddingHorizontal: 20,
  },
  ListHeaderComponentStyle: {
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
    backgroundColor: WHITE,
    paddingHorizontal: 20,
  },
});

const ViewListScreen = ({data, handleOpen, handleAddCart}, ref) => {
  return (
    <FlatList
      ref={ref}
      stickyHeaderIndices={[0]}
      onEndReachedThreshold={0.1}
      style={styles.overAll}
      ListHeaderComponentStyle={styles.ListHeaderComponentStyle}
      ListHeaderComponent={<FiterSection handleOpen={handleOpen} />}
      data={data}
      keyExtractor={(item, index) =>
        item.CategoryID.toString() + index.toString()
      }
      renderItem={({item, index}) => (
        <FoodCard
          handleAddCart={handleAddCart}
          index={index}
          totalLength={data.length}
          item={item}
        />
      )}
    />
  );
};

export default forwardRef(ViewListScreen);
