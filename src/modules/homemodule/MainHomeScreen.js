import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SvgSearch from '../../icons/SvgSearch';
import {routesPath} from '../../routes/routesPath';
import Card from '../../uikit/Card/Card';
import DropDown from '../../uikit/DropDown/DropDown';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {isEmpty} from '../../uikit/UikitUtils/validators';
import HomePlaceHolder from './HomePlaceHolder';
import {
  searchRestaurantandItemsMiddleWare,
} from './store/homeMiddleware';

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
  promoImage: {
    height: 80,
    width: 150,
    borderRadius: 8,
  },
  orderText: {
    paddingHorizontal: 16,
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
  imgStyle: {
    height: 30,
    width: 30,
    borderRadius: 8,
  },
  listStyle: {
    paddingHorizontal: 20,
    marginTop: 12,
  },
});

const MainHomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);

  const {isLoading, data, locationID, getSearchData} = useSelector(
    ({
      getHomeDashboardReducers,
      calculateLocationDistanceReducers,
      searchRestaurantandItemsReducers,
    }) => {
      return {
        isLoading: getHomeDashboardReducers.isLoading,
        data: getHomeDashboardReducers.data,
        locationID: calculateLocationDistanceReducers.data[0],
        getSearchData: searchRestaurantandItemsReducers.data,
      };
    },
  );

  useFocusEffect(
    useCallback(() => {
      setValue(null);
    }, []),
  );
  useEffect(() => {
    dispatch(
      searchRestaurantandItemsMiddleWare({LocationID: locationID.LocationID}),
    );
  }, [locationID]);

  const getSearch = useMemo(() => {
    const result = getSearchData.map(list => {
      return !isEmpty(list.Imagename)
        ? {
            value: list.SearchText.toLowerCase(),
            label: list.SearchText,
            icon: () => (
              <Card>
                <Image style={styles.imgStyle} source={{uri: list.Imagename}} />
              </Card>
            ),
          }
        : {
            value: list.SearchText.toLowerCase(),
            label: list.SearchText,
          };
    });
    return result;
  }, [getSearchData]);

  const handleSearch = () => {
    navigation.navigate(routesPath.LIST_HOME_SCREEN, {search: value});
  };
  const checkEmpty =
    data?.menuResponse.length === 0 &&
    data?.OrderAgainList.length === 0 &&
    data?.PromotionResponse.length === 0;

  if (isLoading) {
    return <HomePlaceHolder />;
  }
  return !checkEmpty ? (
    <ScrollView>
      <Flex overrideStyle={styles.overAll}>
        <>
          <View style={{paddingHorizontal: 16, marginBottom: 20}}>
            <DropDown
              placeholder={'Restaurant name or dish...'}
              required
              value={value}
              setValue={setValue}
              data={getSearch}
              ArrowDownIconComponent={() => (
                <Pressable onPress={handleSearch}>
                  <SvgSearch />
                </Pressable>
              )}
              ArrowUpIconComponent={() => (
                <Pressable onPress={handleSearch}>
                  <SvgSearch />
                </Pressable>
              )}
              searchPlaceholder={'Restaurant name or dish...'}
              showArrowIcon={!isEmpty(value)}
            />
          </View>

          {data?.OrderAgainList.length !== 0 && (
            <View>
              <Text size={16} bold overrideStyle={styles.orderText}>
                Order again !
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
                Check out the greate offers !!!
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
          {data?.menuResponse.length !== 0 && (
            <View style={styles.itemFlex}>
              <Text size={16} bold>
                Eat what makes you fall in love with food !
              </Text>
              <Flex row wrap middle>
                {data?.menuResponse.map(list => {
                  return (
                    <TouchableOpacity
                      key={list.MenuImage}
                      onPress={() =>
                        navigation.navigate(routesPath.LIST_HOME_SCREEN, {
                          type: list.MenuID,
                        })
                      }>
                      <Flex center overrideStyle={styles.foodList}>
                        <Card overrideStyle={styles.radius}>
                          <Image
                            style={styles.roundImage}
                            source={{uri: list.MenuImage}}
                          />
                        </Card>
                        <Text
                          overrideStyle={{
                            marginTop: 8,
                            textTransform: 'capitalize',
                          }}>
                          {list.MenuName}
                        </Text>
                      </Flex>
                    </TouchableOpacity>
                  );
                })}
              </Flex>
            </View>
          )}
        </>
      </Flex>
    </ScrollView>
  ) : (
    <Flex flex={1} center middle>
      <Text
        align={'center'}
        bold
        size={16}
        color="gray"
        overrideStyle={styles.emptyText}>
        Sorry! Restaurants are unavailable at the moment. Please revisit after a
        while.
      </Text>
    </Flex>
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
          style={styles.promoImage}
          source={{uri: item.PromotionImageName}}
        />
      </Card>
    </Flex>
  );
};
