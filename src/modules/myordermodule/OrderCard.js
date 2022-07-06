import React from 'react';
import {Image, StyleSheet} from 'react-native';
import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import Button from '../../uikit/Button/Button';
import Text from '../../uikit/Text/Text';
import {GRAY_5} from '../../uikit/UikitUtils/colors';

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
  },
  statusFlex: {
    marginTop: 8,
  },
  cancelBtn: {
    marginRight: 16,
  },
  btnContainer: {
    marginTop: 20,
  },
});

const OrderCard = ({item}) => {
  return (
    <Card overrideStyle={styles.overAll}>
      <Flex overrideStyle={styles.cardFlex}>
        <Flex row>
          <Image style={styles.imgStyle} source={{uri: item.HotelImage}} />
          <Flex flex={1}>
            <Text align={'right'} color="theme">
              #{item.OrderID}
            </Text>
            <Flex overrideStyle={styles.itemFlex}>
              <Text color="gray">2 Item</Text>
              <Text bold size={16} numberOfLines={1}>
                {item.HotelName}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex row center overrideStyle={styles.statusFlex}>
          <Text>Status: </Text>
          <Text color="gray">Food on the way</Text>
        </Flex>
        <Flex row overrideStyle={styles.btnContainer}>
          <Button flex={6} types="secondary" overrideStyle={styles.cancelBtn}>
            Cancel
          </Button>
          <Button flex={6}>Track Order</Button>
        </Flex>
      </Flex>
    </Card>
  );
};

export default OrderCard;
