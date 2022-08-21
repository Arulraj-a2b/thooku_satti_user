import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import MapViews, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {API_KEY} from '../../uikit/UikitUtils/constants';
import Geolocation from 'react-native-geolocation-service';
import SvgHomeLocation from '../../icons/SvgHomeLocation';
import SvgOrderPickup from '../../icons/SvgOrderPickup';
import {BLACK, PRIMARY} from '../../uikit/UikitUtils/colors';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const destination = {latitude: 11.644855, longitude: 78.0923283};

const TrackingScreen = () => {
  const [isOrgin, setOrgin] = useState();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({coords}) => {
        // console.log('coords', coords);
        setOrgin({latitude: coords.latitude, longitude: coords.longitude});
      },
      _error => {
        // Alert.alert(error.code,error.message)
      },
      {
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 0,
        distanceFilter: 1,
      },
    );
  }, []);

  return (
    <View>
      {isOrgin && (
        <MapViews
          provider={PROVIDER_GOOGLE}
          userLocationPriority="high"
          showsUserLocation={true}
          showsMyLocationButton={true}
          stopPropagation={true}
          style={styles.map}
          initialRegion={{
            latitude: isOrgin?.latitude,
            longitude: isOrgin?.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          <Marker
            coordinate={{
              latitude: isOrgin?.latitude,
              longitude: isOrgin?.longitude,
            }}>
            <SvgHomeLocation />
          </Marker>
          <Marker coordinate={destination}>
            <SvgOrderPickup fill={PRIMARY} />
          </Marker>
          <MapViewDirections
            origin={isOrgin}
            destination={destination}
            apikey={API_KEY}
            strokeWidth={4}
            strokeColor={BLACK}
            mode="DRIVING"
          />
        </MapViews>
      )}
    </View>
  );
};

export default TrackingScreen;
