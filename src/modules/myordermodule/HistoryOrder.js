import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import HomePlaceHolder from '../homemodule/HomePlaceHolder';
import OrderCard from './OrderCard';
import {getHistoryOrdersMiddleWare} from './store/myOrderMiddleware';

const styles = StyleSheet.create({
  flatListOverAll: {
    paddingBottom: 20,
    marginTop: 16,
    paddingHorizontal: 20,
  },
  emptyFlex: {
    flex: 1,
    marginTop: '50%',
  },
});

const HistoryOrder = ({setLoader, isLoader}) => {
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch(getHistoryOrdersMiddleWare()).then(() => {
        setLoader(false);
      });
    }, []),
  );

  const {data} = useSelector(({getHistoryOrdersReducers}) => {
    return {
      isLoading: getHistoryOrdersReducers.isLoading,
      data: getHistoryOrdersReducers.data,
    };
  });

  if (isLoader) {
    return <HomePlaceHolder />;
  }
  return (
    <Flex flex={1}>
      <FlatList
        onEndReachedThreshold={0.1}
        style={styles.flatListOverAll}
        data={data}
        keyExtractor={(item, index) =>
          item.OrderID.toString() + index.toString()
        }
        ListEmptyComponent={
          <Flex flex={1} middle center overrideStyle={styles.emptyFlex}>
            <Text color="gray" bold size={18}>
              No Order Found
            </Text>
          </Flex>
        }
        renderItem={({item}) => <OrderCard item={item} />}
      />
    </Flex>
  );
};

export default HistoryOrder;
