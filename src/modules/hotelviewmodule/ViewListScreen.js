import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Flex from '../../uikit/Flex/Flex';
import {data} from './mock';
import FoodCard from './FoodCard';
import FiterSection from './FiterSection';
import {BORDER_COLOR, WHITE} from '../../uikit/UikitUtils/colors';

const styles = StyleSheet.create({
  overAll: {
    paddingHorizontal: 20,
  },
  ListHeaderComponentStyle: {
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
    backgroundColor: WHITE,
  },
});

const ViewListScreen = ({handleOpenDetails}) => {
  return (
    <Flex>
      <FlatList
        stickyHeaderIndices={[0]}
        onEndReachedThreshold={0.1}
        style={styles.overAll}
        ListHeaderComponentStyle={styles.ListHeaderComponentStyle}
        ListHeaderComponent={<FiterSection />}
        data={data}
        keyExtractor={(item, index) => item.name.toString() + index.toString()}
        renderItem={({item, index}) => (
          <FoodCard index={index} totalLength={data.length} handleOpenDetails={handleOpenDetails}/>
        )}
      />
    </Flex>
  );
};

export default ViewListScreen;
