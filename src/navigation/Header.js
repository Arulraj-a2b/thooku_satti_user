import React, {useEffect} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {PERMISSIONS, request} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import SvgBack from '../icons/SvgBack';
import SvgHamburger from '../icons/SvgHamburger';
import Flex from '../uikit/Flex/Flex';
import Text from '../uikit/Text/Text';
import {PRIMARY, WHITE} from '../uikit/UikitUtils/colors';
import {routesPath} from '../routes/routesPath';
import {getAddressMiddleWare} from '../modules/mapmodule/store/mapMiddleware';
import {API_KEY} from '../uikit/UikitUtils/constants';
import SvgLocationMarker from '../icons/SvgLocationMarker';

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

const Header = ({props, isBack, isMenu, isLocation}) => {
  const dispatch = useDispatch();

  const {data} = useSelector(({getAddressReducers}) => {
    return {
      data: getAddressReducers.data,
    };
  });

  useEffect(() => {
    if (!data) {
      requestLocationPermission();
    }
  }, []);

  async function requestLocationPermission() {
    var res = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (res === 'granted') {
      await Geolocation.getCurrentPosition(
        ({coords}) => {
          dispatch(
            getAddressMiddleWare({
              address: `${coords.latitude},${coords.longitude}`,
              key: API_KEY,
            }),
          );
        },
        _error => {
          // Alert.alert(error.code,error.message)
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    }
  }

  return (
    <Flex between row center overrideStyle={styles.overAll}>
      {isLocation && (
        <Flex overrideStyle={{width: '80%'}}>
          <Pressable
            style={styles.locationStyle}
            onPress={() =>
              props.navigation.navigate(routesPath.GOOGLE_PLACES_SEARCH_SCREEN)
            }>
            <SvgLocationMarker fill={WHITE} />
            <Text bold color="white" size={16} numberOfLines={1}>
              {data && data.results && data.results[0].formatted_address}
            </Text>
          </Pressable>
        </Flex>
      )}
      <Flex row center>
        {!isBack && (
          <Pressable
            style={styles.boxStyle}
            onPress={() => props.navigation.goBack()}>
            <SvgBack />
          </Pressable>
        )}
        <Text color="white" bold size={20}>
          {props.options.title}
        </Text>
      </Flex>
      {isMenu && (
        <Pressable
          style={styles.hamburgerStyle}
          onPress={() => props.navigation.openDrawer()}>
          <SvgHamburger fill={WHITE} width={14} height={8} />
        </Pressable>
      )}
    </Flex>
  );
};

export default Header;
