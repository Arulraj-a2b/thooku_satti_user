import React, {useEffect} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
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
import SvgLocation2 from '../icons/SvgLocation2';
import {isEmpty} from '../uikit/UikitUtils/validators';

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

const Header = ({props, isBack, isMenu, isLocation, backPath}) => {
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

  const handleOpenDrawer = () => {
    props.navigation.openDrawer();
  };

  const handleGoBack = () => {
    if (isEmpty(backPath)) {
      props.navigation.goBack();
    } else {
      props.navigation.navigate(backPath);
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
