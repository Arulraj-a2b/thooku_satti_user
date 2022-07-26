import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import HomePlaceHolder from '../homemodule/HomePlaceHolder';
import DiningCard from './DiningCard';
import DiningUpload from './DiningUpload';
import {getDiningListMiddleWare} from './store/myOrderMiddleware';

const styles = StyleSheet.create({
  flatListOverAll: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  emptyFlex: {
    flex: 1,
    marginTop: '50%',
  },
});
const DiningListScreen = ({setLoader, isLoader}) => {
  const [isUpload, setUpload] = useState(false);
  const [isBookingId, setBookingId] = useState('');
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch(getDiningListMiddleWare()).then(() => {
        setLoader(false);
      });
    }, []),
  );

  const {data} = useSelector(({getDiningListReducers}) => {
    return {
      data: getDiningListReducers.data,
    };
  });

  if (isLoader) {
    return <HomePlaceHolder />;
  }

  return (
    <Flex flex={1}>
      <DiningUpload isBookingId={isBookingId} open={isUpload} close={() => setUpload(false)} />
      <FlatList
        onEndReachedThreshold={0.1}
        style={styles.flatListOverAll}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Flex flex={1} middle center overrideStyle={styles.emptyFlex}>
            <Text color="gray" size={18}>
              No Order Found
            </Text>
          </Flex>
        }
        renderItem={({item}) => (
          <DiningCard setBookingId={setBookingId} item={item} setUpload={setUpload} />
        )}
      />
    </Flex>
  );
};

export default DiningListScreen;
