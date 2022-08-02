import React from 'react';
import {FlatList, Image} from 'react-native';
import {useSelector} from 'react-redux';
import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import HomePlaceHolder from './HomePlaceHolder';

const MainHomeScreen = () => {
  const {isLoading, data} = useSelector(({getHomeDashboardReducers}) => {
    return {
      isLoading: getHomeDashboardReducers.isLoading,
      data: getHomeDashboardReducers.data,
    };
  });

  console.log('data', data);
  if (isLoading) {
    return <HomePlaceHolder />;
  }

  return (
    <Flex flex={1}>
      <FlatList
        style={{paddingVertical: 8}}
        horizontal={true}
        onEndReachedThreshold={0.1}
        data={data?.OrderAgainList}
        keyExtractor={(item, index) =>
          item.HotelID.toString() + index.toString()
        }
        renderItem={OrderAginList}
      />
      <Flex row wrap middle>
        {data?.menuResponse.map(list => {
          return (
            <Flex
              center
              key={list.MenuImage}
              overrideStyle={{marginRight: 16, marginVertical: 2}}>
              <Card overrideStyle={{borderRadius: 100}}>
                <Image
                  style={{height: 80, width: 80, borderRadius: 100}}
                  source={{uri: list.MenuImage}}
                />
              </Card>
              <Text>{list.MenuName}</Text>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default MainHomeScreen;

const OrderAginList = ({item}) => {
  return (
    <Flex overrideStyle={{marginRight: 16, marginVertical: 2}}>
      <Card>
        <Image
          style={{height: 100, width: 130, borderRadius: 8}}
          source={{uri: item.HotelImage}}
        />
      </Card>
    </Flex>
  );
};
