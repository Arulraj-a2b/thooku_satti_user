import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {routesPath} from '../../routes/routesPath';
import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import HomePlaceHolder from '../homemodule/HomePlaceHolder';
import {ListText} from './DiningCard';

const MarketOrderList = ({isLoader}) => {
  const navigation = useNavigation();

  const {data} = useSelector(({getMarketOrderListReducers}) => {
    return {
      data: getMarketOrderListReducers.data,
    };
  });

  const handleView = id => {
    navigation.navigate(routesPath.MARKET_ORDER_VIEW_SCREEN, {orderId: id});
  };
  if (isLoader) {
    return <HomePlaceHolder />;
  }

  return (
    <Flex>
      <FlatList
        onEndReachedThreshold={0.1}
        data={data}
        keyExtractor={(item, index) =>
          item.OrderNo.toString() + index.toString()
        }
        renderItem={({item}) => (
          <View style={{paddingHorizontal: 20, paddingVertical: 8}}>
            <Card overrideStyle={{padding: 16}}>
              <Flex>
                <ListText name={'Order Type'} value={item.OrderType} />
                <ListText name={'Order ID'} value={item.OrderNo} />
                <ListText name={'Order Date'} value={item.OrderDate} />
                <Flex center>
                  <TouchableOpacity onPress={() => handleView(item.OrderNo)}>
                    <Text bold color="link">
                      View Order Details
                    </Text>
                  </TouchableOpacity>
                </Flex>
              </Flex>
            </Card>
          </View>
        )}
      />
    </Flex>
  );
};

export default MarketOrderList;
