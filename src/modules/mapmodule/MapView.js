import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MapViews from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import SvgLocationMarker from '../../icons/SvgLocationMarker';
import {routesPath} from '../../routes/routesPath';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {
  BLACK,
  BORDER_COLOR,
  TRANSPARENT,
  WHITE,
} from '../../uikit/UikitUtils/colors';
import {API_KEY} from '../../uikit/UikitUtils/constants';
import {mapStyle} from './mock';
import {getAddressMiddleWare} from './store/mapMiddleware';

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  text: {
    fontSize: 40,
    margin: 10,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  btnStyle: {
    paddingHorizontal: 40,
    width: '100%',
    marginTop: 16,
  },
  staticMarker: {
    left: '18%',
    marginTop: -29.7,
    position: 'absolute',
    top: '45%',
  },
  calloutStyle: {
    backgroundColor: BLACK,
    padding: 16,
    borderRadius: 10,
  },
  bubble: {
    backgroundColor: BLACK,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  arrowBorder: {
    backgroundColor: TRANSPARENT,
    borderColor: TRANSPARENT,
    borderTopColor: BLACK,
    alignSelf: 'center',
    marginTop: -32,
    borderWidth: 16,
    marginTop: -0.5,
  },
  btnContainer: {
    backgroundColor: WHITE,
    zIndex: 11,
    position: 'absolute',
    zIndex: 99,
    bottom: 0,
    width: '100%',
    // height: 100,
    borderTopColor: BORDER_COLOR,
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
});

const MapView = () => {
  const navigation = useNavigation();
  const [isGetLocation, setGetLocation] = useState();
  const dispatch = useDispatch();

  const {data} = useSelector(({getAddressReducers}) => {
    return {
      data: getAddressReducers.data,
    };
  });
  const handleSubmit = () => {
    AsyncStorage.setItem('geoLocationDone', 'true');
    navigation.navigate(routesPath.LOGIN_SCREEN);
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  const getCurrentPosition = async () => {
    await AsyncStorage.getItem('geoLocation').then(locationRes => {
      setGetLocation(JSON.parse(locationRes));
      const location = JSON.parse(locationRes);
      dispatch(
        getAddressMiddleWare({
          address: `${location.latitude},${location.longitude}`,
          key: API_KEY,
        }),
      );
    });
  };

  const handleMarkerMove = event => {
    setGetLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
    dispatch(
      getAddressMiddleWare({
        address: `${event.nativeEvent.coordinate.latitude},${event.nativeEvent.coordinate.longitude}`,
        key: API_KEY,
      }),
    );
  };
  const onRegionChangeComplete = event => {
    setGetLocation({
      latitude: event.latitude,
      longitude: event.longitude,
    });
    dispatch(
      getAddressMiddleWare({
        address: `${event.latitude},${event.longitude}`,
        key: API_KEY,
      }),
    );
  };

  const MoveMarker = isGetLocation && (
    <MapViews.Marker
      coordinate={{
        latitude: isGetLocation.latitude,
        longitude: isGetLocation.longitude,
      }}>
      <View style={{backgroundColor: TRANSPARENT, display: 'none'}}>
        <SvgLocationMarker fill={'green'} height={30} width={30} />
      </View>
    </MapViews.Marker>
  );

  return (
    <View style={styles.body}>
      {isGetLocation && (
        <>
          <MapViews
            userLocationPriority="high"
            showsUserLocation={true}
            showsMyLocationButton={true}
            stopPropagation={true}
            onPress={handleMarkerMove}
            customMapStyle={mapStyle}
            style={styles.map}
            initialRegion={{
              latitude: isGetLocation.latitude,
              longitude: isGetLocation.longitude,
              latitudeDelta: 0.005625094176657797,
              longitudeDelta: 0.004125572741031647,
            }}
            onRegionChangeComplete={onRegionChangeComplete}>
            {MoveMarker}
          </MapViews>

          <View style={styles.staticMarker}>
            <View style={styles.bubble}>
              <Text align={'center'} bold color="white">
                Place the pin accurately on the map
              </Text>
              <Text color="gray" size={12} align={'center'}>
                Order will be delivered here
              </Text>
            </View>
            <View style={styles.arrowBorder} />
          </View>
        </>
      )}
      <Flex between overrideStyle={styles.btnContainer}>
        <Text color="gray" size={12} bold overrideStyle={{marginBottom: 4}}>
          SELECT DELIVERY LOCATION
        </Text>
        <Text bold numberOfLines={2}>
          {data && data.results && data.results[0].formatted_address}
        </Text>
        <View style={styles.btnStyle}>
          <Button normal onClick={handleSubmit}>
            Confirm Location
          </Button>
        </View>
      </Flex>
    </View>
  );
};

export default MapView;
