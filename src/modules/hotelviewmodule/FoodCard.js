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
import Card from '../../uikit/Card/Card';

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
    <Card
      overrideStyle={[
        styles.overAll,
        {marginBottom: index + 1 === totalLength ? 50 : 8},
      ]}>
      <Flex>
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
              <Card overrideStyle={styles.ratingBox}>
                <Flex center middle>
                  <Text size={14} bold>
                    ₹ {item.Price}
                  </Text>
                </Flex>
              </Card>

              <Card overrideStyle={styles.svgFavStye}>
                <SvgFav fill={WHITE} />
              </Card>
            </Flex>
          </View>
          <View style={styles.ratingContainer}>
            <Card overrideStyle={styles.ratingBox}>
              <Flex row center middle>
                <SvgStar />
                <Text bold overrideStyle={{marginLeft: 4}}>
                  {item.Rating}
                </Text>
              </Flex>
            </Card>
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
    </Card>
  );
};

export default memo(FoodCard);
