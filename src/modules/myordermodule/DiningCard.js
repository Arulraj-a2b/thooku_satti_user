import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {isEmpty} from '../../uikit/UikitUtils/validators';

const styles = StyleSheet.create({
  overAll: {
    padding: 20,
    marginVertical: 12,
    marginHorizontal: 1,
  },
  nameStyle: {
    width: 140,
  },
  valueStyle: {
    width: '60%',
  },
  leftBtn: {
    marginRight: 16,
  },
  linkStyle: {
    marginTop: 8,
  },
});

export const ListText = ({name, value}) => {
  return (
    <Flex row overrideStyle={{marginBottom: 8}}>
      <Text bold overrideStyle={styles.nameStyle}>
        {name}
      </Text>
      <Text overrideStyle={styles.valueStyle}>{value}</Text>
    </Flex>
  );
};

const DiningCard = ({item, setUpload}) => {
  return (
    <Card overrideStyle={styles.overAll}>
      <ListText name="Customer Name" value={item?.Name} />
      <ListText name="Customer Phone" value={item?.Contactno} />
      <ListText name="Booking Date" value={item?.BookingDate} />
      <ListText name="Booking ID" value={item?.BookingID} />
      <ListText name="Booking Time" value={item?.BookingTime} />
      {!isEmpty(item?.GooglepayNo) && (
        <ListText name="GooglePay Number" value={item?.GooglepayNo} />
      )}
      {!isEmpty(item?.PhoePayNo) && (
        <ListText name="Phonepe Number" value={item?.PhoePayNo} />
      )}
      {!isEmpty(item?.Notes) && <ListText name="Notes" value={item?.Notes} />}
      <TouchableOpacity
        style={{justifyContent: 'center', alignItems: 'center'}}
        onPress={() => {
          setUpload(true);
        }}>
        <Text bold color="link">Upload Bill</Text>
      </TouchableOpacity>
    </Card>
  );
};

export default DiningCard;
