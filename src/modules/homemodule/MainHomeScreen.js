import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Pressable,
  Keyboard,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SvgSearch from '../../icons/SvgSearch';
import {routesPath} from '../../routes/routesPath';
import Card from '../../uikit/Card/Card';
import InputText from '../../uikit/InputText/InputText';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {isEmpty} from '../../uikit/UikitUtils/validators';
import HomePlaceHolder from './HomePlaceHolder';
import {
  getHomeDashboardMiddleWare,
  searchRestaurantandItemsMiddleWare,
} from './store/homeMiddleware';
import {BORDER_COLOR} from '../../uikit/UikitUtils/colors';
import SvgClose from '../../icons/SvgClose';
import {OrderAginList, PromotionList} from './homeScreenHelper';

const {height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  overAll: {
    flex: 1,
    paddingVertical: 24,
  },
  flatListOverAll: {
    paddingBottom: 8,
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
  orderText: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  itemFlex: {
    paddingHorizontal: 16,
    marginTop: 20,
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
  searchStyle: {
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: 16,
  },
});

const MainHomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [isSearch, setSearch] = useState(false);
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

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
      setValue('');
    }, []),
  );

  useEffect(() => {
    dispatch(
      getHomeDashboardMiddleWare({
        LocationID: locationID.LocationID,
      }),
    );
    dispatch(
      searchRestaurantandItemsMiddleWare({LocationID: locationID.LocationID}),
    );
  }, [locationID]);

  const handleSearch = value => {
    setValue(value);
    navigation.navigate(routesPath.LIST_HOME_SCREEN, {search: value});
    setSearch(false);
  };

  const results = value
    ? getSearchData &&
      getSearchData.filter(option =>
        option.SearchText.toLowerCase().includes(value.toLowerCase()),
      )
    : getSearchData;

  const handleMenu = id => {
    if (isEmpty(userDetails)) {
      navigation.navigate(routesPath.LOGIN_SCREEN, {
        type: id,
      });
    } else {
      if (id === 1 || id === 2) {
        navigation.navigate(routesPath.LIST_HOME_SCREEN, {
          type: id,
        });
      } else if (id === 4) {
        navigation.navigate(routesPath.BOOKING_TABLE_SCREEN);
      } else {
        navigation.navigate(routesPath.VEGETABLE_SCREEN);
      }
    }
  };

  if (isLoading) {
    return <HomePlaceHolder />;
  }

  return Array.isArray(data) && data.length !== 0 ? (
    <ScrollView>
      <Flex overrideStyle={styles.overAll}>
        <>
          <View
            style={{
              marginBottom: 20,
              position: 'relative',
            }}>
            <TouchableOpacity onPress={() => setSearch(true)}>
              <Flex row center between overrideStyle={styles.searchStyle}>
                <Text
                  color={isEmpty(value) ? 'gray' : 'black'}
                  overrideStyle={{position: 'relative', top: 2}}>
                  {isEmpty(value) ? 'Restaurant name or dish...' : value}
                </Text>
                <SvgSearch />
              </Flex>
            </TouchableOpacity>
            {isSearch && (
              <Modal
                animationInTiming={0}
                animationIn="slideInDown"
                isVisible={isSearch}>
                <Card>
                  <ScrollView scrollEnabled={false}>
                    <Flex overrideStyle={{height: height - 80}}>
                      <View
                        style={{
                          marginTop: 16,
                          marginBottom: 8,
                          paddingHorizontal: 16,
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View style={{width: '90%'}}>
                          <InputText
                            placeholder={'Restaurant name or dish...'}
                            types="normal"
                            value={value}
                            onChange={a => setValue(a)}
                            actionRight={() => <SvgSearch />}
                          />
                        </View>

                        <Pressable
                          onPress={() => setSearch(false)}
                          style={{marginRight: 16, marginLeft: 16}}>
                          <SvgClose />
                        </Pressable>
                      </View>

                      <FlatList
                        onScroll={() => {
                          Keyboard.dismiss();
                        }}
                        style={{paddingHorizontal: 16, paddingVertical: 8}}
                        onEndReachedThreshold={0.1}
                        data={results}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => (
                          <View
                            style={{
                              marginBottom:
                                index === results.length - 1 ? 40 : 8,
                            }}>
                            <SearchList
                              key={index.toString()}
                              item={item}
                              handleSearch={handleSearch}
                            />
                          </View>
                        )}
                      />
                    </Flex>
                  </ScrollView>
                </Card>
              </Modal>
            )}
          </View>

          {data[0]?.OrderAgainList.length !== 0 && (
            <View>
              <Text size={16} bold overrideStyle={styles.orderText}>
                Order again !
              </Text>
              <FlatList
                style={styles.flatListOverAll}
                horizontal={true}
                onEndReachedThreshold={0.1}
                data={data[0]?.OrderAgainList}
                keyExtractor={(item, index) =>
                  item.HotelID.toString() + index.toString()
                }
                renderItem={OrderAginList}
              />
            </View>
          )}
          {data[0]?.PromotionResponse.length !== 0 && (
            <View style={{marginTop: 20}}>
              <Text size={16} bold overrideStyle={styles.orderText}>
                Check out the greate offers !!!
              </Text>
              <FlatList
                style={styles.flatListOverAll}
                horizontal={true}
                onEndReachedThreshold={0.1}
                data={data[0]?.PromotionResponse}
                keyExtractor={(_a, index) => index.toString()}
                renderItem={({item}) => (
                  <PromotionList item={item} handleSearch={handleSearch} />
                )}
              />
            </View>
          )}

          {data[0]?.menuResponse.length !== 0 && (
            <View style={styles.itemFlex}>
              <Text size={16} bold>
                Eat what makes you fall in love with food !
              </Text>
              <Flex row wrap middle>
                {data[0].menuResponse.map(list => {
                  return (
                    <TouchableOpacity
                      key={list.MenuImage}
                      onPress={() => handleMenu(list.MenuID)}>
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
