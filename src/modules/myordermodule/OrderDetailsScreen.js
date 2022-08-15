import React, {useEffect} from 'react';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getOrderDetailsMiddleWare} from './store/myOrderMiddleware';
import HomePlaceHolder from '../homemodule/HomePlaceHolder';
import {ScrollView, StyleSheet, View} from 'react-native';
import {WHITE, GRAY_1, BORDER_COLOR} from '../../uikit/UikitUtils/colors';
import SvgLocation3 from '../../icons/SvgLocation3';
import {INDIAN_RUPEE} from '../../uikit/UikitUtils/constants';
import {isFinancial} from '../../uikit/UikitUtils/helpers';
import { isEmpty } from '../../uikit/UikitUtils/validators';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: WHITE,
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  hotelName: {
    marginTop: 30,
    marginBottom: 12,
  },
  deliveryAddress: {
    marginTop: 20,
    marginBottom: 12,
  },
  listFlex: {
    marginVertical: 4,
  },
  billTitle: {
    marginBottom: 16,
    marginTop: 16,
  },
  hrLine: {
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
    width: '100%',
  },
  hrLineOne: {
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
    width: '100%',
    borderStyle: 'dashed',
  },
  priceList: {
    marginVertical: 4,
  },
  marginVertical8: {
    marginVertical: 8,
  },
  btnStyle: {
    maxWidth: 250,
    alignSelf: 'center',
    marginVertical: 24,
  },
});
const OrderDetailsScreen = () => {
  const routes = useRoute();
  const dispatch = useDispatch();

  useEffect(() => {
    if (routes && routes.params) {
      dispatch(getOrderDetailsMiddleWare({OrderID: routes.params.orderId}));
    }
  }, [routes.params]);

  const {isLoading, data} = useSelector(({getOrderDetailsReducers}) => {
    return {
      isLoading: getOrderDetailsReducers.isLoading,
      data: getOrderDetailsReducers.data,
    };
  });
  if (isLoading) {
    return <HomePlaceHolder />;
  }
  return (
    Array.isArray(data) &&
    data.length !== 0 && (
      <ScrollView style={styles.overAll}>
        <Flex>
          <Text size={16} bold>
            ORDER ID:
          </Text>
          <Text>#{routes.params && routes.params.orderId}</Text>
          <Flex overrideStyle={{position: 'relative'}}>
            <View
              style={{
                borderLeftColor: BORDER_COLOR,
                borderLeftWidth: 2,
                height: 55,
                position: 'absolute',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                top: 50,
                left: 11,
              }}
            />
            <Flex row overrideStyle={styles.hotelName}>
              <SvgLocation3 fill={GRAY_1} />
              <Flex overrideStyle={{marginLeft: 8}}>
                <Text
                  color="theme"
                  bold
                  size={16}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {data[0].HotelName}
                </Text>
                <Text
                  size={12}
                  color="gray"
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {data[0].Address}
                </Text>
              </Flex>
            </Flex>

            <Flex row overrideStyle={styles.deliveryAddress}>
              <SvgLocation3 fill={GRAY_1} />
              <Flex overrideStyle={{marginLeft: 8}}>
                <Text bold size={16}>
                  {data[0].DeliveryAddress}
                </Text>
                <Text size={12} color="gray">
                  {data[0].CustomerMobileno}
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <View style={styles.hrLine} />

          <Flex row overrideStyle={{marginVertical: 8}}>
            <Text bold overrideStyle={{width: 80}}>
              Order Date
            </Text>
            <Text overrideStyle={{width: '88%'}}>{data[0].OrderedDate}</Text>
          </Flex>
          <Flex row overrideStyle={{marginBottom: 8}}>
            <Text bold overrideStyle={{width: 80}}>
              Status
            </Text>
            <Text overrideStyle={{width: '88%'}}>{data[0].LiveStatus}</Text>
          </Flex>
          {!isEmpty(data[0].Notes) && (
            <Flex row overrideStyle={{marginBottom: 8}}>
              <Text bold overrideStyle={{width: 80}}>
                Notes
              </Text>
              <Text overrideStyle={{width: '88%'}}>{data[0].Notes}</Text>
            </Flex>
          )}
          <View style={styles.hrLine} />
          <Text color="gary" bold overrideStyle={styles.billTitle}>
            BILL DETAILS:
          </Text>
          {data[0].OrdInfo.map(list => {
            return (
              <Flex
                key={list.ItemName}
                row
                center
                between
                overrideStyle={styles.listFlex}>
                <Text>
                  {list.ItemName} {'*'} {list.ItemCount}
                </Text>
                <Text>
                  {INDIAN_RUPEE}
                  {isFinancial(list.ItemPrice * list.ItemCount)}
                </Text>
              </Flex>
            );
          })}
          <View style={styles.hrLine} />
          <Flex row center between overrideStyle={styles.priceList}>
            <Text>Item Total</Text>
            <Text>
              {INDIAN_RUPEE}
              {isFinancial(data[0].SubTotal)}
            </Text>
          </Flex>
          <Flex row center between overrideStyle={styles.priceList}>
            <Text>Dellivery partner fee</Text>
            <Text>
              {INDIAN_RUPEE}
              {isFinancial(data[0].DeliveryCharge)}
            </Text>
          </Flex>
          {data[0].Discount !== 0 && (
            <Flex row center between overrideStyle={styles.priceList}>
              <Text>Discount Applied</Text>
              <Text>
                - {INDIAN_RUPEE}
                {isFinancial(data[0].Discount)}
              </Text>
            </Flex>
          )}

          <View style={styles.hrLineOne} />
          <Flex
            row
            center
            between
            overrideStyle={[styles.priceList, styles.marginVertical8]}>
            <Text>Bill Total</Text>
            <Text>
              {INDIAN_RUPEE}
              {isFinancial(data[0].TotalPrice)}
            </Text>
          </Flex>
          <View style={styles.hrLineOne} />
          {/* <Button types={'secondary'} overrideStyle={styles.btnStyle}>
            Re-Order
          </Button> */}
        </Flex>
      </ScrollView>
    )
  );
};

export default OrderDetailsScreen;
