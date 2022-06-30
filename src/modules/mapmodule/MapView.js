import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MapViews from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import SvgLocationMarker from '../../icons/SvgLocationMarker';
import {routesPath, stacks} from '../../routes/routesPath';
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
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {PERMISSIONS, request} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

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
    paddingTop: 16,
    marginBottom: 12,
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
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
    borderTopColor: BORDER_COLOR,
    borderTopWidth: 1,
    paddingVertical: 8,
    height: 150,
  },
});

const MapView = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [isGetLocation, setGetLocation] = useState();
  const dispatch = useDispatch();
  const myRef = useRef();
  const [isLoader, setLoader] = useState(true);

  const {data} = useSelector(({getAddressReducers}) => {
    return {
      data: getAddressReducers.data,
    };
  });

  const handleSubmit = async () => {
    AsyncStorage.setItem('geoLocationDone', 'true');
    try {
      let userData = await AsyncStorage.getItem('userData');
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          navigation.navigate(stacks.HomeStack);
        } else {
          navigation.navigate(routesPath.LOGIN_SCREEN);
        }
      } else {
        navigation.navigate(routesPath.LOGIN_SCREEN);
      }
    } catch (error) {
      navigation.navigate(routesPath.LOGIN_SCREEN);
    }
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  const getCurrentPosition = async () => {
    setLoader(true);
    if (typeof route.params === 'undefined') {
      requestLocationPermission();
    } else if (typeof route.params !== 'undefined') {
      setGetLocation({
        latitude: route.params.location.lat,
        longitude: route.params.location.lng,
      });
      dispatch(
        getAddressMiddleWare({
          address: `${route.params.location.lat},${route.params.location.lng}`,
          key: API_KEY,
        }),
      )
        .then(() => {
          setLoader(false);
        })
        .catch(() => {
          setLoader(false);
        });
    }
  };

  async function requestLocationPermission() {
    var res = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (res === 'granted') {
      await Geolocation.getCurrentPosition(
        ({coords}) => {
          setGetLocation({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });

          dispatch(
            getAddressMiddleWare({
              address: `${coords.latitude},${coords.longitude}`,
              key: API_KEY,
            }),
          )
            .then(() => {
              setLoader(false);
            })
            .catch(() => {
              setLoader(false);
            });
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

  const handleMarkerMove = event => {
    setLoader(true);
    setGetLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
    dispatch(
      getAddressMiddleWare({
        address: `${event.nativeEvent.coordinate.latitude},${event.nativeEvent.coordinate.longitude}`,
        key: API_KEY,
      }),
    )
      .then(() => {
        setLoader(false);
      })
      .catch(() => {
        setLoader(false);
      });
  };
  const onRegionChangeComplete = event => {
    setLoader(true);
    setGetLocation({
      latitude: event.latitude,
      longitude: event.longitude,
    });
    dispatch(
      getAddressMiddleWare({
        address: `${event.latitude},${event.longitude}`,
        key: API_KEY,
      }),
    )
      .then(() => {
        setLoader(false);
      })
      .catch(() => {
        setLoader(false);
      });
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

  useEffect(() => {
    myRef.current?.a;
  }, []);

  const handleChange = () => {
    navigation.navigate(routesPath.GOOGLE_PLACES_SEARCH_SCREEN);
  };
  return (
    <View style={styles.body}>
      {isGetLocation && (
        <>
          <MapViews
            userLocationPriority="high"
            showsUserLocation={true}
            showsMyLocationButton={true}
            stopPropagation={true}
            // onPress={handleMarkerMove}
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
        {isLoader && (
          <SkeletonPlaceholder>
            <View style={{paddingHorizontal: 20}}>
              <View style={{width: 170, height: 18, borderRadius: 4}} />
              <View
                style={{
                  width: '100%',
                  height: 18,
                  borderRadius: 4,
                  marginTop: 8,
                }}
              />
            </View>
          </SkeletonPlaceholder>
        )}

        {!isLoader && (
          <Flex row center overrideStyle={{paddingHorizontal: 20}}>
            <Flex flex={9.5}>
              <Text
                color="gray"
                size={12}
                bold
                overrideStyle={{marginBottom: 4}}>
                SELECT DELIVERY LOCATION
              </Text>
              <Text
                bold
                numberOfLines={2}
                overrideStyle={{marginBottom: 4, paddingRight: 16}}>
                {data && data.results && data.results[0].formatted_address}
              </Text>
            </Flex>
            <Flex flex={2.5}>
              <Button
                onClick={handleChange}
                height={'small'}
                overrideStyle={{paddingHorizontal: 4}}
                normal
                types={'secondary'}>
                Change
              </Button>
            </Flex>
          </Flex>
        )}

        <View style={styles.btnStyle}>
          <Button disabled={isLoader} normal onClick={handleSubmit}>
            Confirm Location
          </Button>
        </View>
      </Flex>
    </View>
  );
};

export default MapView;
