import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useEffect} from 'react';
import {PERMISSIONS, request} from 'react-native-permissions';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch} from 'react-redux';
import {getCartDetailsMiddleWare} from '../modules/hotelviewmodule/store/hotelListViewMiddleware';
import {routesPath} from '../routes/routesPath';
import {calculateLocationDistanceMiddleWare} from '../modules/loginmodule/store/loginScreenMiddleware';
import {getRestaurantListMiddleWare} from '../modules/homemodule/store/homeMiddleware';

export const BASE_URL = 'https://foodapp.appsure.co.in/api/';

export const fetchUrl = url => {
  const result = `${BASE_URL}${url}`;
  return result;
};

export const useAuthCheck = setLoader => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('userData');
      let geoLocation = await AsyncStorage.getItem('geoLocationDone');
      var res = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (geoLocation) {
        if (userData) {
          userData = JSON.parse(userData);
          if (userData.loggedIn) {
            // console.log('userData', userData.SessionID);
            axios.defaults.headers.common['token'] = userData.SessionID;
            if (res === 'granted') {
              await Geolocation.getCurrentPosition(
                ({coords}) => {
                  dispatch(
                    calculateLocationDistanceMiddleWare({
                      Latitude: coords.latitude,
                      Longtitude: coords.longitude,
                    }),
                  ).then(res => {
                    if (res.payload && res.payload[0]) {
                      dispatch(
                        getRestaurantListMiddleWare({
                          LocationID: res.payload[0].LocationID,
                        }),
                      ).then(() => {
                        dispatch(getCartDetailsMiddleWare());
                        setTimeout(() => {
                          SplashScreen.hide();
                          setLoader(false);
                          navigation.navigate(routesPath.ALL_SCREEN);
                        }, 1000);
                      });
                    }
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
          } else {
            if (res === 'granted') {
              await Geolocation.getCurrentPosition(
                ({coords}) => {
                  dispatch(
                    calculateLocationDistanceMiddleWare({
                      Latitude: coords.latitude,
                      Longtitude: coords.longitude,
                    }),
                  ).then(res => {
                    if (res.payload && res.payload[0]) {
                      dispatch(
                        getRestaurantListMiddleWare({
                          LocationID: res.payload[0].LocationID,
                        }),
                      ).then(() => {
                        setLoader(false);
                        setTimeout(() => {
                          SplashScreen.hide();
                          navigation.navigate(routesPath.LOGIN_SCREEN);
                        }, 1000);
                      });
                    }
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
        } else {
          if (res === 'granted') {
            await Geolocation.getCurrentPosition(
              ({coords}) => {
                dispatch(
                  calculateLocationDistanceMiddleWare({
                    Latitude: coords.latitude,
                    Longtitude: coords.longitude,
                  }),
                ).then(res => {
                  if (res.payload && res.payload[0]) {
                    dispatch(
                      getRestaurantListMiddleWare({
                        LocationID: res.payload[0].LocationID,
                      }),
                    ).then(() => {
                      setLoader(false);
                      setTimeout(() => {
                        SplashScreen.hide();
                        navigation.navigate(routesPath.LOGIN_SCREEN);
                      }, 1000);
                    });
                  }
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
      } else {
        navigation.navigate(routesPath.GOOGLE_PLACES_SEARCH_SCREEN);
        setLoader(false);
        setTimeout(() => {
          SplashScreen.hide();
        }, 1000);
      }
    } catch (error) {
      if (res === 'granted') {
        await Geolocation.getCurrentPosition(
          ({coords}) => {
            dispatch(
              calculateLocationDistanceMiddleWare({
                Latitude: coords.latitude,
                Longtitude: coords.longitude,
              }),
            ).then(res => {
              if (res.payload && res.payload[0]) {
                dispatch(
                  getRestaurantListMiddleWare({
                    LocationID: res.payload[0].LocationID,
                  }),
                ).then(() => {
                  setLoader(false);
                  setTimeout(() => {
                    SplashScreen.hide();
                    navigation.navigate(routesPath.LOGIN_SCREEN);
                  }, 1000);
                });
              }
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
  };
  useEffect(() => {
    authUser();
  }, []);
};
