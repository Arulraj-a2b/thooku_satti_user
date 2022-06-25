import React from 'react';
import {StyleSheet, View} from 'react-native';
import SvgFav from '../../icons/SvgFav';
import SvgStar from '../../icons/SvgStar';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {PRIMARY, WHITE} from '../../uikit/UikitUtils/colors';

const styles = StyleSheet.create({
  overAll: {
    borderRadius: 8,
    borderWidth: 1,
    width: '100%',
  },
  imageStyle: {
    backgroundColor: 'red',
    height: 136,
    borderTopEndRadius: 8,
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
});

const HotalCard = () => {
  return (
    <Flex overrideStyle={styles.overAll}>
      <Flex overrideStyle={styles.imageContainer}>
        <View style={styles.imageStyle} />
        <View style={styles.ratingContainer}>
          <Flex row center between>
            <Flex row center middle overrideStyle={styles.ratingBox}>
              <Text size={12} bold overrideStyle={{marginRight: 8}}>
                5.66
              </Text>
              <SvgStar />
              <Text color="gray" size={8} overrideStyle={styles.countStyle}>
                {'(25+)'}
              </Text>
            </Flex>
            <View style={styles.svgFavStye}>
              <SvgFav fill={WHITE} />
            </View>
          </Flex>
        </View>
      </Flex>
    </Flex>
  );
};

export default HotalCard;
