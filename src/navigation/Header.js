import React, {useEffect} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SvgBack from '../icons/SvgBack';
import SvgHamburger from '../icons/SvgHamburger';
import Flex from '../uikit/Flex/Flex';
import Text from '../uikit/Text/Text';
import {PRIMARY, WHITE} from '../uikit/UikitUtils/colors';
import {routesPath} from '../routes/routesPath';
import {getAddressMiddleWare} from '../modules/mapmodule/store/mapMiddleware';
import {API_KEY} from '../uikit/UikitUtils/constants';
import SvgLocation2 from '../icons/SvgLocation2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GEO_LOCATION } from '../utils/localStoreConstants';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: PRIMARY,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  boxStyle: {
    backgroundColor: WHITE,
    marginRight: 16,
    padding: 6,
    borderRadius: 8,
  },
  hamburgerStyle: {
    padding: 12,
    backgroundColor: WHITE,
    borderRadius: 8,
  },
  locationStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const Header = ({props, isBack, isMenu, isLocation, handleBack}) => {
  const dispatch = useDispatch();

  const {data} = useSelector(({getAddressReducers}) => {
    return {
      data: getAddressReducers.data,
    };
  });

  useEffect(() => {
    if (data && !data.results && isLocation) {
      requestLocationPermission();
    }
  }, []);

  async function requestLocationPermission() {
    let geoLocation = await AsyncStorage.getItem(GEO_LOCATION);
    geoLocation = JSON.parse(geoLocation);
    try {
      if (geoLocation) {
        dispatch(
          getAddressMiddleWare({
            address: `${geoLocation.latitude},${geoLocation.longitude}`,
            key: API_KEY,
          }),
        );
      }
    } catch {}
  }

  const handleOpenDrawer = () => {
    props.navigation.openDrawer();
  };

  const handleGoBack = () => {
    if (typeof handleBack === 'function') {
      handleBack();
    } else {
      props.navigation.goBack();
    }
  };

  return (
    <Flex between row center overrideStyle={styles.overAll}>
      {isLocation && (
        <Flex overrideStyle={{width: '75%'}}>
          <Pressable
            style={styles.locationStyle}
            onPress={() =>
              props.navigation.navigate(routesPath.GOOGLE_PLACES_SEARCH_SCREEN)
            }>
            <View style={{marginRight: 8}}>
              <SvgLocation2 fill={WHITE} />
            </View>

            <Text bold color="white" size={14} numberOfLines={2}>
              {data && data.results && data.results[0].formatted_address}
            </Text>
          </Pressable>
        </Flex>
      )}
      <Flex row center>
        {!isBack && (
          <Pressable style={styles.boxStyle} onPress={handleGoBack}>
            <SvgBack />
          </Pressable>
        )}
        <Text color="white" bold size={20}>
          {props.options.title}
        </Text>
      </Flex>
      {isMenu && (
        <Pressable style={styles.hamburgerStyle} onPress={handleOpenDrawer}>
          <SvgHamburger fill={WHITE} width={14} height={8} />
        </Pressable>
      )}
    </Flex>
  );
};

export default Header;
