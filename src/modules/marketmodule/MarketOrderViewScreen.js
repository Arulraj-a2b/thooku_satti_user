import {useFocusEffect, useRoute} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Flex from '../../uikit/Flex/Flex';
import LabelWrapper from '../../uikit/InputText/LabelWrapper';
import Text from '../../uikit/Text/Text';
import HomePlaceHolder from '../homemodule/HomePlaceHolder';
import {ListText} from '../myordermodule/DiningCard';
import {getMarketOrdersMiddleWare} from './store/marketOrderScreenMiddleware';

const {height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  overAll: {
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
  imageView: {
    width: '100%',
    height: height - 340,
    borderRadius: 10,
  },
});

const MarketOrderViewScreen = () => {
  const dispatch = useDispatch();
  const {params} = useRoute();
  const [isLoader, setLoader] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setLoader(true)
      dispatch(getMarketOrdersMiddleWare({Orderno: params?.orderId}))
        .then(() => {
          setLoader(false);
        })
        .catch(() => {
          setLoader(false);
        });
    }, [params]),
  );

  const {data} = useSelector(({getMarketOrderReducers}) => {
    return {
      data: getMarketOrderReducers.data,
    };
  });
  if (isLoader) {
    return <HomePlaceHolder />;
  }
  return (
    <ScrollView>
      <Flex overrideStyle={styles.overAll}>
        <ListText name="Customer Name" value={data?.Name} />
        <ListText name="Mobile Number" value={data?.Mobileno} />
        <ListText name="Whatsapp Number" value={data?.Whatsappno} />
        <ListText name="Delivery Address" value={data?.DeliveryAddress} />
        <ListText name="Order Date" value={data?.OrderedDate} />
        <ListText name="Status" value={data?.Status} />
        <LabelWrapper label={'Order List'}>
          <Image style={styles.imageView} source={{uri: data?.Imagepath}} />
          <Flex center overrideStyle={{marginTop: 20}}>
            <TouchableOpacity onPress={() => Linking.openURL(data?.Imagepath)}>
              <Text color="link" bold>
                Download list
              </Text>
            </TouchableOpacity>
          </Flex>
        </LabelWrapper>
      </Flex>
    </ScrollView>
  );
};

export default MarketOrderViewScreen;
