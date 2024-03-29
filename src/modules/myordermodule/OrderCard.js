import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import Button from '../../uikit/Button/Button';
import Text from '../../uikit/Text/Text';
import {GRAY_5} from '../../uikit/UikitUtils/colors';
import {useNavigation} from '@react-navigation/native';
import {routesPath} from '../../routes/routesPath';
import {isEmpty} from '../../uikit/UikitUtils/validators';

const styles = StyleSheet.create({
  imgStyle: {
    backgroundColor: GRAY_5,
    borderRadius: 8,
    height: 70,
    width: 70,
  },
  cardFlex: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  itemFlex: {
    marginLeft: 16,
    marginTop: 2,
  },
  overAll: {
    marginVertical: 8,
    marginHorizontal: 1,
  },
  statusFlex: {
    marginTop: 8,
  },
  cancelBtn: {
    marginRight: 16,
  },
  btnContainer: {
    marginTop: 16,
  },
});

const OrderCard = ({item, isTrack}) => {
  const navigation = useNavigation();

  const handleViewDetails = orderId => {
    navigation.navigate(routesPath.ORDER_DETAILS_SCREEN, {
      orderId,
    });
  };
  return (
    <Card overrideStyle={styles.overAll}>
      <Flex overrideStyle={styles.cardFlex}>
        <Flex row>
          <Image style={styles.imgStyle} source={{uri: item.HotelImage}} />
          <Flex flex={1}>
            <Flex overrideStyle={styles.itemFlex}>
              <Text bold size={16} numberOfLines={1}>
                {item.HotelName}
              </Text>
              <Text size={12} color="theme" overrideStyle={{marginTop: 4}}>
                #{item.OrderID}
              </Text>
              <Text size={12} color="gray">
                {item.OrderedDate}
              </Text>
              <TouchableOpacity onPress={() => handleViewDetails(item.OrderID)}>
                <Text bold color="link">
                  View Bill Details
                </Text>
              </TouchableOpacity>
            </Flex>
          </Flex>
        </Flex>
        <Flex row overrideStyle={styles.statusFlex}>
          <Text>Status: </Text>
          <Text color="gray" overrideStyle={{width: '85%'}}>
            {item.LiveStatus}
          </Text>
        </Flex>
        {isTrack && (
          <Flex center overrideStyle={styles.btnContainer}>
            <Button onClick={() => handleViewDetails(item.OrderID)}>
              Track Order
            </Button>
          </Flex>
        )}
      </Flex>
    </Card>
  );
};

export default OrderCard;
