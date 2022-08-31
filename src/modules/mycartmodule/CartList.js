import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import SvgDecrement from '../../icons/SvgDecrement';
import SvgIncrement from '../../icons/SvgIncrement';
import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {INDIAN_RUPEE} from '../../uikit/UikitUtils/constants';
import {isFinancial} from '../../uikit/UikitUtils/helpers';
import {isEmpty} from '../../uikit/UikitUtils/validators';

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

const CartList = ({item, handleAddCart, isAddLoader}) => {
  const [isCount, setCount] = useState(item.qty);

  useEffect(() => {
    setCount(item.qty);
  }, [item]);

  const handleIncrement = () => {
    handleAddCart(item, isCount + 1, 'increment');
    setCount(pre => pre + 1);
  };

  const handleDecrement = () => {
    handleAddCart(item, isCount - 1, 'decrement');
    setCount(pre => pre - 1);
  };

  const checkDecrementLoader =
    !isEmpty(isAddLoader) &&
    isAddLoader.FoodID === item.FoodID &&
    isAddLoader.check === 'decrement';

  const checkIncrementLoader =
    !isEmpty(isAddLoader) &&
    isAddLoader.FoodID === item.FoodID &&
    isAddLoader.check === 'increment';
  return (
    <Card overrideStyle={[styles.overAll, {marginTop: 12}]}>
      <Flex row>
        {/* <Card> */}
        <Image style={styles.imgStyle} source={{uri: item.FoodImage}} />
        {/* </Card> */}
        <Flex flex={1} overrideStyle={styles.rowContainer} between>
          <Flex row between>
            <Text bold>{item.FoodName}</Text>
            {/* <TouchableOpacity onPress={()=>handleDelete(item)}>
              <SvgClose height={14} width={14} />
            </TouchableOpacity> */}
          </Flex>
          <Flex between row center overrideStyle={styles.stepperContainer}>
            <Text bold color="theme">
              {INDIAN_RUPEE}
              {isFinancial(item.Price * item.qty)}
            </Text>
            <Flex overrideStyle={{position: 'relative'}}>
              <Flex row center>
                <Pressable
                  onPress={handleDecrement}
                  disabled={isCount === 0 || checkDecrementLoader}>
                  <SvgDecrement isLoader={checkDecrementLoader} />
                </Pressable>

                <Text bold overrideStyle={styles.textStyle}>
                  {isCount}
                </Text>

                <Pressable
                  onPress={handleIncrement}
                  disabled={checkIncrementLoader}>
                  <SvgIncrement isLoader={checkIncrementLoader} />
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
