import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import {WHITE} from '../../uikit/UikitUtils/colors';
import FiterSection from './FiterSection';
import FoodDetailsPopup from './FoodDetailsPopup';
import ViewListScreen from './ViewListScreen';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: WHITE,
    flex: 1,
  },
});
const HotelListViewScreen = () => {
  const refRBSheet = useRef();

  const handleOpenDetails=()=>{
    refRBSheet.current.open()
  }
  return (
    <Flex overrideStyle={styles.overAll}>
      <FoodDetailsPopup ref={refRBSheet} />
      <ViewListScreen handleOpenDetails={handleOpenDetails}/>
    </Flex>
  );
};

export default HotelListViewScreen;
