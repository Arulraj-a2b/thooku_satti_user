import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Flex from '../../uikit/Flex/Flex';
import Button from '../../uikit/Button/Button';
import HotalCard from './HotalCard';
import HotelSearch from './HotelSearch';
import ListEmpty from './ListEmpty';

const styles = StyleSheet.create({
  overAll: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  ListHeaderComponentStyle: {
    marginBottom: 8,
  },
});

const HotelList = ({data, handleViewAll, isAll, handleSearch, isSearch}) => {
  return (
    <FlatList
      onEndReachedThreshold={0.1}
      ListEmptyComponent={<ListEmpty />}
      style={styles.overAll}
      ListHeaderComponentStyle={styles.ListHeaderComponentStyle}
      ListHeaderComponent={
        <HotelSearch
          isSearch={isSearch}
          handleSearch={handleSearch}
          isAll={isAll}
          handleViewAll={handleViewAll}
          totalLength={data.length}
        />
      }
      data={data}
      keyExtractor={(item, index) =>
        item.HotelName.toString() + index.toString()
      }
      renderItem={({item, index}) => (
        <HotalCard
          isAll={isAll}
          item={item}
          index={index}
          totalLength={data.length}
        />
      )}
      ListFooterComponent={() => {
        return (
          !isAll && (
            <Flex center>
              <Button
                types={'secondary'}
                overrideStyle={{marginBottom: 60, marginTop: 30}}
                onClick={handleViewAll}>
                View All
              </Button>
            </Flex>
          )
        );
      }}
    />
  );
};
export default HotelList;
