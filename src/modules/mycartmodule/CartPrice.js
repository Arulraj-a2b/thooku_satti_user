import React, {useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {INDIAN_RUPEE} from '../../uikit/UikitUtils/constants';
import {isFinancial} from '../../uikit/UikitUtils/helpers';
import InputText from '../../uikit/InputText/InputText';
import Card from '../../uikit/Card/Card';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import {isEmpty} from '../../uikit/UikitUtils/validators';

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
  note: {
    marginTop: 6,
    marginBottom: 4,
  },
});

const CartPrice = ({
  getCartDetails,
  formik,
  getTNCData,
  getTotal,
  deliveryCost,
  grandTotal,
}) => {
  const myRef = useRef();

  useEffect(() => {
    if (!isEmpty(formik.errors.address) && myRef && myRef.current) {
      myRef.current.focus();
    }
  }, [formik]);

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
              {isFinancial(getTotal)}
            </Text>
          </Flex>
          <Flex row center between overrideStyle={styles.marginTop16}>
            <Text bold>Delivery</Text>
            <Text bold>
              {INDIAN_RUPEE}
              {isFinancial(deliveryCost)}
            </Text>
          </Flex>
          <Flex row center between overrideStyle={styles.marginTop16}>
            <Flex row center>
              <Text bold>Total</Text>
              <Text size={12} bold color="gray">
                {` (${getCartDetails.length} Item)`}
              </Text>
            </Flex>
            <Text bold>
              {INDIAN_RUPEE}
              {isFinancial(grandTotal)}
            </Text>
          </Flex>
        </Flex>
      </Card>
      <View style={{marginTop: 20}}>
        <InputText
          ref={myRef}
          placeholder={`Enter your address`}
          overrideStyle={styles.inputStyles}
          label={'Address'}
          required
          height={70}
          numberOfLines={4}
          multiline
          value={formik.values.address}
          onChange={formik.handleChange('address')}
        />
        <ErrorMessage
          touched={formik.touched}
          errors={formik.errors}
          name="address"
        />
      </View>
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
      <Text bold size={16} overrideStyle={styles.terms}>
        Terms and condition
      </Text>
      <Text size={12} color="gray">
        {getTNCData[0].TNCMsg}
      </Text>
      <Text bold size={16} overrideStyle={styles.note}>
        Note*
      </Text>
      <Text size={12} color="gray">
        {getTNCData[0].NoteMsg}
      </Text>
    </Flex>
  );
};

export default CartPrice;
