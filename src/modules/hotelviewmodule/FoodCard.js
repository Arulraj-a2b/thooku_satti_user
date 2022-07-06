import React, {memo, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import SvgFav from '../../icons/SvgFav';
import SvgStar from '../../icons/SvgStar';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {
  BLACK,
  BORDER_COLOR,
  PRIMARY,
  WHITE,
} from '../../uikit/UikitUtils/colors';
import Stepper from '../../uikit/Stepper/Stepper';
import {isEmpty} from '../../uikit/UikitUtils/validators';

const styles = StyleSheet.create({
  overAll: {
    borderRadius: 8,
    marginVertical: 8,
    elevation: 2,
    shadowColor: BLACK,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.06,
    shadowRadius: 3,
    backgroundColor: WHITE,
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
    elevation: 2,
    shadowColor: BLACK,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.06,
    shadowRadius: 3,
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
    elevation: 2,
    shadowColor: BLACK,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.06,
    shadowRadius: 3,
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
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
  },
});

const FoodCard = ({index, totalLength, item, handleAddCart}) => {
  const [isCount, setCount] = useState(0);
  // let filterTimeout;

  const handleSubmit = value => {
    handleAddCart(item.HotelID, item.FoodID, value);
    // clearTimeout(filterTimeout);
    // filterTimeout = setTimeout(() => {
    //   handleAddCart(item.HotelID, item.FoodID, value);
    // }, 500);
  };

  return (
    <Flex
      overrideStyle={[
        styles.overAll,
        {marginBottom: index + 1 === totalLength ? 50 : 8},
      ]}>
      <Flex overrideStyle={styles.imageContainer}>
        {!isEmpty(item.FoodImage) && (
          <Image
            resizeMode="contain"
            source={{uri: item.FoodImage}}
            style={styles.imageStyle}
          />
        )}

        <View style={styles.priceContainer}>
          <Flex row center between>
            <Flex center middle overrideStyle={styles.ratingBox}>
              <Text size={14} bold>
                ₹ {item.Price}
              </Text>
            </Flex>
            <View style={styles.svgFavStye}>
              <SvgFav fill={WHITE} />
            </View>
          </Flex>
        </View>
        <View style={styles.ratingContainer}>
          <Flex row center middle overrideStyle={styles.ratingBox}>
            <SvgStar />
            <Text bold overrideStyle={{marginLeft: 4}}>
              {item.Rating}
            </Text>
          </Flex>
        </View>
      </Flex>

      <Flex middle overrideStyle={styles.nameListContainer}>
        <Flex row center between>
          <Flex row center>
            <Text bold size={14}>
              {item.FoodName}
            </Text>
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
          </Flex>
          <Stepper
            value={isCount}
            onChange={setCount}
            onSubmit={handleSubmit}
          />
        </Flex>
        <Text
          transform={'capitalize'}
          color="gray"
          overrideStyle={{marginTop: 2}}>
          {item.CategoryName}
        </Text>
      </Flex>
    </Flex>
  );
};

export default memo(FoodCard);
