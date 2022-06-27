import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import SvgFav from '../../icons/SvgFav';
import SvgStar from '../../icons/SvgStar';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {
  BLACK,
  BORDER_COLOR,
  GRAY_5,
  PRIMARY,
  WHITE,
} from '../../uikit/UikitUtils/colors';
import SvgSuccess from '../../icons/SvgSccess';
import SvgClock from '../../icons/SvgClock';

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
  },
  imageContainer: {
    position: 'relative',
  },
  ratingContainer: {
    position: 'absolute',
    paddingHorizontal: 16,
    top: 10,
    display: 'flex',
    width: '100%',
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
  chip: {
    backgroundColor: GRAY_5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    elevation: 2,
    shadowColor: BLACK,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  nameListContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
  },
});

const HotalCard = ({item, index, totalLength}) => {
  return (
    <Flex
      overrideStyle={[
        styles.overAll,
        {marginBottom: index + 1 === totalLength ? 50 : 8},
      ]}>
      <Flex overrideStyle={styles.imageContainer}>
        <Image resizeMode='cover' source={{uri: item.HotelImage}} style={styles.imageStyle} />
        <View style={styles.ratingContainer}>
          <Flex row center between>
            <Flex row center middle overrideStyle={styles.ratingBox}>
              <SvgStar />
              <Text size={12} bold overrideStyle={{marginLeft: 4}}>
                4.0
              </Text>
            </Flex>
            <View style={styles.svgFavStye}>
              <SvgFav fill={WHITE} />
            </View>
          </Flex>
        </View>
      </Flex>

      <Flex overrideStyle={styles.nameListContainer}>
        <Flex row center>
          <Text bold size={14}>
            {item.HotelName}
          </Text>
          <View style={styles.svgSuccess}>
            <SvgSuccess height={10} width={10} />
          </View>
        </Flex>
        <Flex row center overrideStyle={{marginTop: 8}}>
          {/* <Flex row center>
            <View style={{marginRight: 4, marginBottom: 2}}>
              <SvgSuccess height={13} width={13} />
            </View>
            <Text color="gray" size={14}>
              Free delivery
            </Text>
          </Flex> */}
          <Flex row center>
            <View style={{marginRight: 4}}>
              <SvgClock fill={PRIMARY} />
            </View>
            <Text color="gray" size={14}>
              10-15 mins
            </Text>
          </Flex>
        </Flex>
        {/* <Flex overrideStyle={styles.chip}>
          <Text color="gray" size={12}>
            Burger
          </Text>
        </Flex> */}
      </Flex>
    </Flex>
  );
};

export default HotalCard;
