import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import SvgClose from '../../icons/SvgClose';
import SvgDecrement from '../../icons/SvgDecrement';
import SvgIncrement from '../../icons/SvgIncrement';
import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {INDIAN_RUPEE} from '../../uikit/UikitUtils/constants';
import {isFinancial} from '../../uikit/UikitUtils/helpers';
import {CART_DATA} from '../../utils/localStoreConstants';
import {updateCartData} from './store/myCartReducer';

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
  textStyle: {
    paddingHorizontal: 8,
  },
});

const CartList = ({item, handleAddCart}) => {
  const [isCount, setCount] = useState(item.qty);

  useEffect(() => {
    setCount(item.qty);
  }, [item.qty]);

  const [isUpdateLoader, setUpdateLoader] = useState(false);
  const dispacth = useDispatch();

  const handleDelete = () => {
    AsyncStorage.removeItem(CART_DATA);
    dispacth(updateCartData());
  };


  const handleIncrement = () => {
    handleAddCart(item, isCount + 1);
    setCount(pre => pre + 1);
  };

  const handleIDecrement = () => {
    handleAddCart(item, isCount - 1);
    setCount(pre => pre - 1);
  };

  return (
    <Card overrideStyle={[styles.overAll, {marginTop: 12}]}>
      <Flex row>
        {/* <Card> */}
        <Image style={styles.imgStyle} source={{uri: item.FoodImage}} />
        {/* </Card> */}
        <Flex flex={1} overrideStyle={styles.rowContainer} between>
          <Flex row center between>
            <Text bold>{item.FoodName}</Text>
            <TouchableOpacity onPress={handleDelete}>
              <SvgClose height={14} width={14} />
            </TouchableOpacity>
          </Flex>
          <Flex between row center overrideStyle={styles.stepperContainer}>
            <Text bold color="theme">
              {INDIAN_RUPEE}
              {isFinancial(item.Price * item.qty)}
            </Text>
            <Flex overrideStyle={{position: 'relative'}}>
              <Flex row center>
                <Pressable onPress={handleIDecrement} disabled={isCount === 0}>
                  <SvgDecrement />
                </Pressable>
                <Text bold overrideStyle={styles.textStyle}>
                  {isCount}
                </Text>
                <Pressable onPress={handleIncrement}>
                  <SvgIncrement />
                </Pressable>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};
export default CartList;
