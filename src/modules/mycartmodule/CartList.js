import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import SvgClose from '../../icons/SvgClose';
import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import Stepper from '../../uikit/Stepper/Stepper';
import Text from '../../uikit/Text/Text';
import {INDIAN_RUPEE} from '../../uikit/UikitUtils/constants';
import {isFinancial} from '../../uikit/UikitUtils/helpers';
import {
  addCartMiddleWare,
  getCartDetailsMiddleWare,
} from '../hotelviewmodule/store/hotelListViewMiddleware';
import {deleteCartListMiddleWare} from './store/myCartMiddleware';

const styles = StyleSheet.create({
  overAll: {
    marginVertical: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 1,
  },
  imgStyle: {
    height: 80,
    width: 80,
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
});

const CartList = ({item, index}) => {
  const [isCount, setCount] = useState(item.ItemCount);

  useEffect(() => {
    setCount(item.ItemCount);
  }, [item.ItemCount]);

  const [isUpdateLoader, setUpdateLoader] = useState(false);
  const dispacth = useDispatch();

  const handleDelete = () => {
    dispacth(
      deleteCartListMiddleWare({HotelID: item.HotelID, ItemID: item.ItemID}),
    ).then(() => {
      dispacth(getCartDetailsMiddleWare());
    });
  };

  const handleAddCart = value => {
    setUpdateLoader(true);
    dispacth(
      addCartMiddleWare({
        HotelID: item.HotelID,
        ItemID: item.ItemID,
        Qty: value,
      }),
    ).then(() => {
      setUpdateLoader(false);
      dispacth(getCartDetailsMiddleWare());
    });
  };

  return (
    <Card overrideStyle={[styles.overAll, {marginTop: index === 0 ? 30 : 12}]}>
      <Flex row>
        {/* <Card> */}
        <Image style={styles.imgStyle} source={{uri: item.ItemImage}} />
        {/* </Card> */}
        <Flex flex={1} overrideStyle={styles.rowContainer} between>
          <Flex row center between>
            <Text bold>{item.ItemName}</Text>
            <TouchableOpacity onPress={handleDelete}>
              <SvgClose height={14} width={14} />
            </TouchableOpacity>
          </Flex>
          <Flex between row center overrideStyle={styles.stepperContainer}>
            <Text bold color="theme">
              {INDIAN_RUPEE}
              {isFinancial(item.TotalPrice)}
            </Text>
            <Stepper
              isLoader={isUpdateLoader}
              onSubmit={handleAddCart}
              onChange={setCount}
              value={isCount}
            />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};
export default CartList;
