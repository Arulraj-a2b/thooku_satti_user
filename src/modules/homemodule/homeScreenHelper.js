import React from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {isEmpty} from '../../uikit/UikitUtils/validators';

const styles = StyleSheet.create({
  orderList: {
    marginHorizontal: 8,
    marginVertical: 2,
    position: 'relative',
  },
  orderImage: {
    height: 100,
    width: 130,
    borderRadius: 8,
  },
  promoImage: {
    height: 140,
    width: Dimensions.get('screen').width - 80,
    borderRadius: 8,
  },

  orderName: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.50)',
    width: '100%',
    bottom: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    height: 30,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
});

export const OrderAginList = ({item, index, handleOrderAgainNavigate}) => {
  return (
    <Flex
      overrideStyle={[styles.orderList, {marginLeft: index === 0 ? 16 : 8}]}>
      <TouchableOpacity onPress={() => handleOrderAgainNavigate(item.HotelID)}>
        <Card>
          <Image style={styles.orderImage} source={{uri: item.HotelImage}} />
          <Flex overrideStyle={styles.orderName}>
            <Text
              color="white"
              size={12}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.HotelName}
            </Text>
          </Flex>
        </Card>
      </TouchableOpacity>
    </Flex>
  );
};

export const PromotionList = ({item, index}) => {
  return (
    <Flex
      overrideStyle={[styles.orderList, {marginLeft: index === 0 ? 16 : 8}]}>
      <Card>
        <Image
          resizeMode="contain"
          style={styles.promoImage}
          source={{uri: item.PromotionImageName}}
        />
      </Card>
    </Flex>
  );
};

export const SearchList = ({item, handleSearch}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        handleSearch(item.SearchText);
      }}>
      <Flex row center overrideStyle={{marginVertical: 4}}>
        {!isEmpty(item.Imagename) && (
          <Card overrideStyle={{marginRight: 10}}>
            <Image
              resizeMode="contain"
              style={{height: 30, width: 30, borderRadius: 8}}
              source={{uri: item.Imagename}}
            />
          </Card>
        )}
        <Text>{item?.SearchText}</Text>
      </Flex>
    </TouchableOpacity>
  );
};
