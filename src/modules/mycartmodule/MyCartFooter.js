import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {BORDER_COLOR, GRAY_5, SUCCESS} from '../../uikit/UikitUtils/colors';
import {INDIAN_RUPEE} from '../../uikit/UikitUtils/constants';
import {isFinancial} from '../../uikit/UikitUtils/helpers';

const styles = StyleSheet.create({
  btnContainer: {
    borderTopColor: BORDER_COLOR,
    borderTopWidth: 1,
    backgroundColor: GRAY_5,
    height: 60,
  },
  checkOut: {
    backgroundColor: SUCCESS,
    position: 'relative',
    top: -1,
  },
});
const MyCartFooter = ({getCartDetails, downButtonHandler, handleSubmit}) => {
  return (
    <Flex row between overrideStyle={styles.btnContainer}>
      <Flex middle flex={5.8} overrideStyle={{paddingLeft: 12}}>
        <Text bold color="black">
          {INDIAN_RUPEE}
          {isFinancial(getCartDetails[0].GrandTotal)}
        </Text>
        <TouchableOpacity onPress={downButtonHandler}>
          <Text bold color="link">
            VIEW DETAILED BILL
          </Text>
        </TouchableOpacity>
      </Flex>
      <Flex middle flex={6.2} overrideStyle={styles.checkOut}>
        <TouchableOpacity onPress={handleSubmit}>
          <Text align={'center'} bold color="white" size={18}>
            CheckOut
          </Text>
        </TouchableOpacity>
      </Flex>
    </Flex>
  );
};

export default MyCartFooter;
