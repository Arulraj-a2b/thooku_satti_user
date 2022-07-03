import React from 'react';
import {StyleSheet} from 'react-native';
import Flex from '../../uikit/Flex/Flex';
import Button from '../../uikit/Button/Button';
import Text from '../../uikit/Text/Text';
import {INDIAN_RUPEE} from '../../uikit/UikitUtils/constants';
import {isFinancial} from '../../uikit/UikitUtils/helpers';

const styles = StyleSheet.create({
  overAll: {
    // paddingHorizontal: 20,
  },
  marginTop16: {
    marginTop: 12,
  },
  btn: {
    marginTop: 30,
    width: 250,
    alignSelf:'center'
  },
});

const CartPrice = () => {
  return (
    <Flex overrideStyle={styles.overAll}>
      <Flex row center between overrideStyle={styles.marginTop16}>
        <Text bold>Subtotal</Text>
        <Text bold>
          {INDIAN_RUPEE}
          {isFinancial(26)}
        </Text>
      </Flex>
      <Flex row center between overrideStyle={styles.marginTop16}>
        <Text bold>Tax and Fees</Text>
        <Text bold>
          {INDIAN_RUPEE}
          {isFinancial(26)}
        </Text>
      </Flex>
      <Flex row center between overrideStyle={styles.marginTop16}>
        <Text bold>Delivery</Text>
        <Text bold>
          {INDIAN_RUPEE}
          {isFinancial(26)}
        </Text>
      </Flex>
      <Flex row center between overrideStyle={styles.marginTop16}>
        <Flex row center>
          <Text bold>Total</Text>
        </Flex>
        <Text bold>
          {INDIAN_RUPEE}
          {isFinancial(26)}
        </Text>
      </Flex>
      <Button overrideStyle={styles.btn}>Checkout</Button>
    </Flex>
  );
};

export default CartPrice;
