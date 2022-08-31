import React, {memo, useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import SvgStar from '../../icons/SvgStar';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {BORDER_COLOR, PRIMARY, WHITE} from '../../uikit/UikitUtils/colors';
import Stepper from '../../uikit/Stepper/Stepper';
import Card from '../../uikit/Card/Card';
import {isFinancial} from '../../uikit/UikitUtils/helpers';
import SvgDecrement from '../../icons/SvgDecrement';
import SvgIncrement from '../../icons/SvgIncrement';

const styles = StyleSheet.create({
  overAll: {
    marginVertical: 8,
    marginHorizontal: 20,
  },
  imageStyle: {
    height: 136,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  imageContainer: {
    position: 'relative',
  },
  priceContainer: {
    position: 'absolute',
    paddingHorizontal: 16,
    top: 10,
    display: 'flex',
    width: '100%',
  },
  ratingContainer: {
    position: 'absolute',
    paddingHorizontal: 16,
    bottom: -14,
    display: 'flex',
    width: '100%',
    zIndex: 11,
    left: 0,
    alignItems: 'flex-start',
  },
  ratingBox: {
    backgroundColor: WHITE,
    borderRadius: 15,
    paddingHorizontal: 12,
    height: 30,
    justifyContent: 'center',
  },
  countStyle: {
    marginLeft: 2,
  },
  svgFavStye: {
    backgroundColor: PRIMARY,
    borderRadius: 100,
    height: 36,
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgSuccess: {
    marginLeft: 4,
  },
  nameListContainer: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    paddingTop: 24,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
  },
  textStyle: {
    paddingHorizontal: 8,
  },
  stpperOverAll: {
    opacity: 0.5,
  },
});

const FoodCard = ({
  index,
  totalLength,
  item,
  handleAddCart,
  isCartDataDetails,
}) => {
  const [isCount, setCount] = useState(0);
  const checkQty = (arr, val) => {
    return arr.some(function (arrVal) {
      if (val.HotelID === arrVal.HotelID && val.FoodID === arrVal.FoodID) {
        return setCount(arrVal.qty);
      }
    });
  };
  useEffect(() => {
    if (Array.isArray(isCartDataDetails) && isCartDataDetails.length !== 0) {
      checkQty(isCartDataDetails, item);
    }
  }, []);

  const checkImage = item.IsRecommand === 'N' ? false : true;
  const handleIncrement = () => {
    handleAddCart(item, isCount + 1);
    setCount(pre => pre + 1);
  };

  const handleIDecrement = () => {
    handleAddCart(item, isCount - 1);
    setCount(pre => pre - 1);
  };

  return (
    <Card
      overrideStyle={[
        styles.overAll,
        {marginBottom: index + 1 === totalLength ? 50 : 8},
      ]}>
      <Flex>
        <Flex overrideStyle={styles.imageContainer}>
          {checkImage && (
            <Image
              resizeMode="contain"
              source={{uri: item.FoodImage}}
              style={styles.imageStyle}
            />
          )}
        </Flex>

        <Flex
          middle
          overrideStyle={[
            styles.nameListContainer,
            checkImage ? styles.borderTop : {},
          ]}>
          {item.IsRecommand !== 'N' && (
            <Flex row center overrideStyle={{marginLeft: 4}}>
              <SvgStar fill={PRIMARY} />
              <Text
                bold
                size={12}
                color="theme"
                overrideStyle={{marginLeft: 4, marginBottom: 2}}>
                Bestseller
              </Text>
            </Flex>
          )}
          <Flex row center between>
            <Flex flex={9}>
              <Text bold size={14}>
                {item.FoodName}
              </Text>
            </Flex>
            <Flex flex={3} center>
              <Text size={14} bold>
                ₹ {isFinancial(item.Price)}
              </Text>
            </Flex>
          </Flex>
          <Flex row center between overrideStyle={{marginTop: 8}}>
            <Flex row center flex={9}>
              <Text
                transform={'capitalize'}
                color="gray"
                overrideStyle={{marginTop: 2, marginRight: 4}}>
                {item.CategoryName}
              </Text>
            </Flex>
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

export default memo(FoodCard);
