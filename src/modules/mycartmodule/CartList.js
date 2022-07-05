import React, {memo, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import SvgClose from '../../icons/SvgClose';
import Flex from '../../uikit/Flex/Flex';
import Stepper from '../../uikit/Stepper/Stepper';
import Text from '../../uikit/Text/Text';
import {BLACK, BORDER_COLOR, ERROR, WHITE} from '../../uikit/UikitUtils/colors';
import {INDIAN_RUPEE} from '../../uikit/UikitUtils/constants';
import {
  addCartMiddleWare,
  getCartDetailsMiddleWare,
} from '../hotelviewmodule/store/hotelListViewMiddleware';

const styles = StyleSheet.create({
  overAll: {marginVertical: 12},
  imgStyle: {
    height: 80,
    width: 80,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: BORDER_COLOR,
    borderRadius: 8,
    backgroundColor: WHITE,
  },
  stepperContainer: {
    marginTop: 16,
  },
  des: {
    marginTop: 4,
  },
  rowContainer: {
    marginLeft: 16,
  },
  imgContainer: {
    borderRadius: 8,
    elevation: 2,
    shadowColor: BLACK,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
});

const CartList = ({item, userDetails}) => {
  const [isCount, setCount] = useState(item.ItemCount);
  const dispacth = useDispatch();

  const handleAddCart = (value) => {
    console.log('isCount',value);
    dispacth(
      addCartMiddleWare({
        HotelID: item.HotelID,
        ItemID: item.ItemID,
        Qty: value,
        UserID: userDetails?.UserID,
      }),
    ).then(() => {
      dispacth(getCartDetailsMiddleWare({UserID: userDetails?.UserID}));
    });
  };

  return (
    <Flex overrideStyle={styles.overAll} row>
      <View style={styles.imgContainer}>
        <Image style={styles.imgStyle} source={{uri: item.ItemImage}} />
      </View>
      <Flex flex={1} overrideStyle={styles.rowContainer} between>
        <Flex row center between>
          <Text bold>{item.ItemName}</Text>
          <SvgClose fill={ERROR} height={14} width={14} />
        </Flex>
        <Flex between row center overrideStyle={styles.stepperContainer}>
          <Text bold color="theme">
            {INDIAN_RUPEE}
            {item.TotalPrice}
          </Text>
          <Stepper
            onSubmit={handleAddCart}
            onChange={setCount}
            value={isCount}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
export default memo(CartList);
