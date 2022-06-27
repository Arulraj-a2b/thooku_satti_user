import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import HotalCard from './HotalCard';
import HotelSearch from './HotelSearch';

const styles = StyleSheet.create({
  overAll: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    // marginBottom: 20
  },
  ListHeaderComponentStyle: {
    marginBottom: 20,
  },
});

const HotelList = ({data}) => {
  return (
    <FlatList
      style={styles.overAll}
      ListHeaderComponentStyle={styles.ListHeaderComponentStyle}
      ListHeaderComponent={<HotelSearch />}
      data={data}
      keyExtractor={(item, index) =>
        item.HotelName.toString() + index.toString()
      }
      renderItem={({item,index}) => <HotalCard item={item} index={index} totalLength={data.length}/>}
    />
  );
};
export default HotelList;
