import React from 'react';
import {StyleSheet, View} from 'react-native';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {INDIAN_RUPEE} from '../../uikit/UikitUtils/constants';
import {isFinancial} from '../../uikit/UikitUtils/helpers';
import InputText from '../../uikit/InputText/InputText';
import Card from '../../uikit/Card/Card';

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
    marginHorizontal: 1,
  },
  billTitle: {
    marginBottom: 12,
  },
  inputStyles: {
    textAlignVertical: 'top',
    borderRadius: 4,
  },
  terms: {
    marginTop: 16,
    marginBottom: 4,
  },
});

const CartPrice = ({getCartDetails, formik, getTNCData}) => {
  console.log('getCartDetails', getCartDetails);
  return (
    <Flex>
      <Text
        transform={'uppercase'}
        bold
        color="gray"
        overrideStyle={styles.billTitle}>
        Bill Details
      </Text>
      <Card overrideStyle={styles.overAll}>
        <Flex>
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
              {isFinancial(getCartDetails.DelliveryCharge)}
            </Text>
          </Flex> */}
          <Flex row center between overrideStyle={styles.marginTop16}>
            <Text bold>Delivery</Text>
            <Text bold>
              {INDIAN_RUPEE}
              {isFinancial(getCartDetails.DelliveryCharge)}
            </Text>
          </Flex>
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
      </Card>
      <View style={{marginTop: 20}}>
        <InputText
          placeholder={`Add your rquest`}
          overrideStyle={styles.inputStyles}
          label={'Notes'}
          height={70}
          numberOfLines={4}
          multiline
          value={formik.values.notes}
          onChange={formik.handleChange('notes')}
        />
      </View>
      <Text bold size={20} overrideStyle={styles.terms}>
        Terms and condition
      </Text>
      <Text size={12} color="gray">
        {getTNCData[0].TNCMsg}
      </Text>
      <Text bold size={20} overrideStyle={styles.terms}>
        Note*
      </Text>
      <Text size={12} color="gray">
        {getTNCData[0].NoteMsg}
      </Text>
    </Flex>
  );
};

export default CartPrice;
