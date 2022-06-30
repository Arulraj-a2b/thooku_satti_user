import React, {useRef} from 'react';
import {Button, StyleSheet} from 'react-native';
import Flex from '../../uikit/Flex/Flex';
import {WHITE} from '../../uikit/UikitUtils/colors';
import FiterSection from './FiterSection';
import FoodCard from './FoodCard';
import FoodDetailsPopup from './FoodDetailsPopup';

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
      {/* <FoodDetailsPopup /> */}
    </Flex>
  );
};

export default HotelListViewScreen;
