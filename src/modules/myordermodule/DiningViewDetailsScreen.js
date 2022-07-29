import {useFocusEffect, useRoute} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Linking, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {WHITE} from '../../uikit/UikitUtils/colors';
import {INDIAN_RUPEE} from '../../uikit/UikitUtils/constants';
import {isFinancial} from '../../uikit/UikitUtils/helpers';
import {isEmpty} from '../../uikit/UikitUtils/validators';
import HomePlaceHolder from '../homemodule/HomePlaceHolder';
import {ListText} from './DiningCard';
import DiningUpload from './DiningUpload';
import {getDiningDetailsMiddleWare} from './store/myOrderMiddleware';

const styles = StyleSheet.create({
  overAll: {
    paddingHorizontal: 30,
    paddingVertical: 24,
    backgroundColor: WHITE,
  },
  nameStyle: {
    width: 140,
  },
  valueStyle: {
    width: '60%',
  },
});
const DiningViewDetailsScreen = () => {
  const routes = useRoute();
  const dispatch = useDispatch();
  const [isUpload, setUpload] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (routes && routes.params) {
        dispatch(
          getDiningDetailsMiddleWare({DiningBookingID: routes.params.orderId}),
        );
      }
    }, [routes.params]),
  );

  const {isLoading, data} = useSelector(({getDiningDetailsReducers}) => {
    return {
      isLoading: getDiningDetailsReducers.isLoading,
      data: getDiningDetailsReducers.data,
    };
  });

  const bookingStatus =
    data.length !== 0 && data[0].BookingStatus.toLowerCase() === 'accepted'
      ? true
      : false;

  if (isLoading) {
    return <HomePlaceHolder />;
  }

  return data.length !== 0 ? (
    <>
      <DiningUpload
        isBookingId={data[0].BookingID}
        open={isUpload}
        close={() => setUpload(false)}
      />
      <Flex flex={1} overrideStyle={styles.overAll}>
        <ListText name="Customer Name" value={data[0].Name} />
        <ListText name="Customer Phone" value={data[0].Contactno} />
        {!isEmpty(data[0].Hotelname) && (
          <ListText name="Hotel Name" value={data[0].Hotelname} />
        )}
        <ListText name="Booking Date" value={data[0].BookingDate} />
        <ListText name="Booking ID" value={data[0].BookingID} />
        {!isEmpty(data[0].NoofAdult) && data[0].NoofAdult !== 0 && (
          <ListText name="Number of Adult" value={data[0].NoofAdult} />
        )}
        {!isEmpty(data[0].NoofChild) && data[0].NoofChild !== 0 && (
          <ListText name="Number of Child" value={data[0].NoofChild} />
        )}
        {!isEmpty(data[0].BookingStatus) && (
          <ListText name="Booking Status" value={data[0].BookingStatus} />
        )}
        <ListText name="Booking Time" value={data[0].BookingTime} />
        {!isEmpty(data[0].GooglepayNo) && (
          <ListText name="GooglePay Number" value={data[0].GooglepayNo} />
        )}
        {!isEmpty(data[0].PhoePayNo) && (
          <ListText name="Phonepe Number" value={data[0].PhoePayNo} />
        )}
        {!isEmpty(data[0].Notes) && (
          <ListText name="Notes" value={data[0].Notes} />
        )}
        {bookingStatus && !isEmpty(data[0].BilluploadStatus) && (
          <ListText name="Bill Status" value={data[0].BilluploadStatus} />
        )}
        {!isEmpty(data[0].BillRefno) && (
          <ListText name="Bill Number" value={data[0].BillRefno} />
        )}
        {!isEmpty(data[0].Billamount) && data[0].Billamount !== 0 && (
          <ListText
            name="Total Bill"
            value={INDIAN_RUPEE + isFinancial(data[0].Billamount)}
          />
        )}
        {bookingStatus && !isEmpty(data[0].BillImagePath) && (
          <Flex row overrideStyle={{marginBottom: 16}}>
            <Text bold overrideStyle={styles.nameStyle}>
              Download Bill
            </Text>
            <TouchableOpacity
              style={{width: '57%'}}
              onPress={() => Linking.openURL(data[0].BillImagePath)}>
              <Text color="link" ellipsizeMode={'tail'} numberOfLines={1}>
                {data[0].BillImagePath}
              </Text>
            </TouchableOpacity>
          </Flex>
        )}
        {data[0].BilluploadStatus !== 'Uploaded' && (
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}
            onPress={() => {
              setUpload(true);
            }}>
            <Text bold color="link">
              Upload Bill
            </Text>
          </TouchableOpacity>
        )}
      </Flex>
    </>
  ) : (
    <></>
  );
};

export default DiningViewDetailsScreen;
