import React from 'react';
import {StyleSheet} from 'react-native';
import Flex from '../../uikit/Flex/Flex';
import {WHITE} from '../../uikit/UikitUtils/colors';
import FiterSection from './FiterSection';
import FoodCard from './FoodCard';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: WHITE,
    flex: 1,
  },
});
const HotelListViewScreen = () => {
  return (
    <Flex overrideStyle={styles.overAll}>
      <FiterSection />
      <FoodCard />
    </Flex>
  );
};

export default HotelListViewScreen;
