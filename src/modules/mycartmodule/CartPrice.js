import React from 'react';
import {StyleSheet, View} from 'react-native';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {BLACK, WHITE} from '../../uikit/UikitUtils/colors';
import {INDIAN_RUPEE} from '../../uikit/UikitUtils/constants';
import {isFinancial} from '../../uikit/UikitUtils/helpers';
import InputText from '../../uikit/InputText/InputText';

const styles = StyleSheet.create({
  marginTop16: {
    marginTop: 12,
  },
  btn: {
    marginTop: 30,
    width: 250,
    alignSelf: 'center',
  },
  overAll: {
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: WHITE,
    elevation: 2,
    shadowColor: BLACK,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.06,
    shadowRadius: 3,
    marginHorizontal: 1,
  },
  billTitle: {
    marginBottom: 12,
  },
  inputStyles: {
    textAlignVertical: 'top',
    borderRadius: 4,
  },
});

const CartPrice = ({getCartDetails, formik}) => {
  return (
    <Flex>
      <Text
        transform={'uppercase'}
        bold
        color="gray"
        overrideStyle={styles.billTitle}>
        Bill Details
      </Text>
      <Flex overrideStyle={styles.overAll}>
        <Flex row center between overrideStyle={styles.marginTop16}>
          <Text bold>Subtotal</Text>
          <Text bold>
            {INDIAN_RUPEE}
            {isFinancial(getCartDetails.GrandTotal)}
          </Text>
        </Flex>
        {/* <Flex row center between overrideStyle={styles.marginTop16}>
        <Text bold>Tax and Fees</Text>
        <Text bold>
          {INDIAN_RUPEE}
          {isFinancial(26)}
        </Text>
      </Flex> */}
        {/* <Flex row center between overrideStyle={styles.marginTop16}>
        <Text bold>Delivery</Text>
        <Text bold>
          {INDIAN_RUPEE}
          {isFinancial(26)}
        </Text>
      </Flex> */}
        <Flex row center between overrideStyle={styles.marginTop16}>
          <Flex row center>
            <Text bold>Total</Text>
            <Text size={12} bold color="gray">
              {` (${getCartDetails.CartCount} Item)`}
            </Text>
          </Flex>
          <Text bold>
            {INDIAN_RUPEE}
            {isFinancial(getCartDetails.GrandTotal)}
          </Text>
        </Flex>
      </Flex>
      <View style={{marginTop: 20}}>
        <InputText
          placeholder={`Enter your note's`}
          overrideStyle={styles.inputStyles}
          label={'Notes'}
          height={70}
          numberOfLines={4}
          multiline
          value={formik.values.notes}
          onChange={formik.handleChange('notes')}
        />
      </View>
    </Flex>
  );
};

export default CartPrice;
