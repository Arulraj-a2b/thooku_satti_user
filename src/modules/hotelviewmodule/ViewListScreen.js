import React, {forwardRef, useMemo, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import FoodCard from './FoodCard';
import FiterSection from './FiterSection';
import {BORDER_COLOR, WHITE} from '../../uikit/UikitUtils/colors';

const styles = StyleSheet.create({
  ListHeaderComponentStyle: {
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
    backgroundColor: WHITE,
    paddingHorizontal: 20,
  },
});

const ViewListScreen = (
  {data, handleOpen, handleAddCart, isCartDataDetails},
  ref,
) => {
  const [isValue, setValue] = useState('');
  const filterResult = useMemo(() => {
    const result =
      data &&
      data.filter(value =>
        value.FoodName.toLowerCase().includes(isValue.toLowerCase()),
      );
    return result;
  }, [isValue,data]);
  return (
    <FlatList
      ref={ref}
      stickyHeaderIndices={[0]}
      onEndReachedThreshold={0.1}
      ListHeaderComponentStyle={styles.ListHeaderComponentStyle}
      ListHeaderComponent={
        <FiterSection
          handleOpen={handleOpen}
          isValue={isValue}
          setValue={setValue}
        />
      }
      data={filterResult}
      keyExtractor={(item, index) =>
        item.CategoryID.toString() + index.toString()
      }
      renderItem={({item, index}) => (
        <FoodCard
          isCartDataDetails={isCartDataDetails}
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
