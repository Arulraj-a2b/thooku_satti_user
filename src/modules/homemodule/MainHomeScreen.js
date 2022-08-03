import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {routesPath} from '../../routes/routesPath';
import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import HomePlaceHolder from './HomePlaceHolder';

const styles = StyleSheet.create({
  overAll: {
    flex: 1,
    paddingVertical: 24,
  },
  flatListOverAll: {
    paddingVertical: 8,
  },
  foodList: {
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  radius: {
    borderRadius: 100,
  },
  roundImage: {
    height: 80,
    width: 80,
    borderRadius: 100,
  },
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
  orderText: {
    paddingLeft: 16,
  },
  itemFlex: {
    paddingHorizontal: 16,
    marginTop: 20,
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

const MainHomeScreen = () => {
  const navigation = useNavigation();
  const {isLoading, data} = useSelector(({getHomeDashboardReducers}) => {
    return {
      isLoading: getHomeDashboardReducers.isLoading,
      data: getHomeDashboardReducers.data,
    };
  });

  if (isLoading) {
    return <HomePlaceHolder />;
  }
  return (
    <ScrollView>
      <Flex overrideStyle={styles.overAll}>
        {data?.OrderAgainList.length !== 0 && (
          <View>
            <Text size={16} bold overrideStyle={styles.orderText}>
              Order Again !
            </Text>
            <FlatList
              style={styles.flatListOverAll}
              horizontal={true}
              onEndReachedThreshold={0.1}
              data={data?.OrderAgainList}
              keyExtractor={(item, index) =>
                item.HotelID.toString() + index.toString()
              }
              renderItem={OrderAginList}
            />
          </View>
        )}
        {data?.PromotionResponse.length !== 0 && (
          <View style={{marginTop: 20}}>
            <Text size={16} bold overrideStyle={styles.orderText}>
              Promotion !
            </Text>
            <FlatList
              style={styles.flatListOverAll}
              horizontal={true}
              onEndReachedThreshold={0.1}
              data={data?.PromotionResponse}
              keyExtractor={(_a, index) => index.toString()}
              renderItem={PromotionList}
            />
          </View>
        )}
        <Flex row wrap middle overrideStyle={styles.itemFlex}>
          {data?.menuResponse.map(list => {
            return (
              <TouchableOpacity
                key={list.MenuImage}
                onPress={() =>
                  navigation.navigate(routesPath.LIST_HOME_SCREEN)
                }>
                <Flex center overrideStyle={styles.foodList}>
                  <Card overrideStyle={styles.radius}>
                    <Image
                      style={styles.roundImage}
                      source={{uri: list.MenuImage}}
                    />
                  </Card>
                  <Text overrideStyle={{marginTop: 8}}>{list.MenuName}</Text>
                </Flex>
              </TouchableOpacity>
            );
          })}
        </Flex>
      </Flex>
    </ScrollView>
  );
};

export default MainHomeScreen;

const OrderAginList = ({item, index}) => {
  return (
    <Flex
      overrideStyle={[styles.orderList, {marginLeft: index === 0 ? 16 : 8}]}>
      <TouchableOpacity>
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

const PromotionList = ({item, index}) => {
  return (
    <Flex
      overrideStyle={[styles.orderList, {marginLeft: index === 0 ? 16 : 8}]}>
      <Card>
        <Image
          style={styles.orderImage}
          source={{uri: item.PromotionImageName}}
        />
      </Card>
    </Flex>
  );
};
