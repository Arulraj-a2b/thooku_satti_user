import React, {useState} from 'react';
import {Image, StyleSheet, Pressable, View} from 'react-native';
import SvgFav from '../../icons/SvgFav';
import SvgStar from '../../icons/SvgStar';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {
  BLACK,
  BORDER_COLOR,
  GARY_1,
  PRIMARY,
  WHITE,
} from '../../uikit/UikitUtils/colors';
import SvgSuccess from '../../icons/SvgSccess';
import {routesPath} from '../../routes/routesPath';
import Stepper from '../../uikit/Stepper/Stepper';

const styles = StyleSheet.create({
  overAll: {
    borderRadius: 8,
    width: '99%',
    marginVertical: 8,
    elevation: 2,
    shadowColor: BLACK,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.06,
    shadowRadius: 3,
    backgroundColor: WHITE,
    marginHorizontal: 1,
  },
  imageStyle: {
    height: 136,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    backgroundColor: GARY_1,
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
  choiceStyle: {
    position: 'absolute',
    bottom: -20,
  },
});

const FoodCard = ({index, totalLength, handleOpenDetails}) => {
  const [isCount, setCount] = useState(0);

  return (
    <Pressable onPress={handleOpenDetails}>
      <Flex
        overrideStyle={[
          styles.overAll,
          {marginBottom: index + 1 === totalLength ? 50 : 8},
        ]}>
        <Flex overrideStyle={styles.imageContainer}>
          <Image
            resizeMode="contain"
            source={{uri: 'https://i.ibb.co/WPzKrZ7/Concept-and-Ideas.jpg'}}
            style={styles.imageStyle}
          />
          <View style={styles.priceContainer}>
            <Flex row center between>
              <Flex center middle overrideStyle={styles.ratingBox}>
                <Text size={14} bold>
                  ₹ 40
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
              <Text size={10} color="gray" bold>
                {' (45+)'}
              </Text>
            </Flex>
          </View>
        </Flex>

        <Flex overrideStyle={styles.nameListContainer}>
          <Flex row center between>
            <Flex row center>
              <Text bold size={14}>
                {'Chicken Hawaiian'}
              </Text>
              <View style={styles.svgSuccess}>
                <SvgSuccess height={10} width={10} />
              </View>
            </Flex>
            <Flex center overrideStyle={{position: 'relative'}}>
              <Stepper onChange={setCount} />
              <Text size={12} color="gray" overrideStyle={styles.choiceStyle}>
                {'(choice)'}
              </Text>
            </Flex>
          </Flex>
          <Text color="gray" overrideStyle={{marginTop: 2}}>
            Chicken, Cheese and pineapple
          </Text>
        </Flex>
      </Flex>
    </Pressable>
  );
};

export default FoodCard;
