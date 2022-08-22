import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import MapViews, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import {API_KEY} from '../../uikit/UikitUtils/constants';
import SvgHomeLocation from '../../icons/SvgHomeLocation';
import SvgOrderPickup from '../../icons/SvgOrderPickup';
import {PRIMARY, WHITE} from '../../uikit/UikitUtils/colors';
import SvgGps from '../../icons/SvgGps';
import {mapStyle} from '../mapmodule/mock';
import SvgRestaurantPinMap from '../../icons/SvgRestaurantPinMap';
import Button from '../../uikit/Button/Button';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  gpsBtn: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: WHITE,
    padding: 2,
    borderRadius: 4,
  },
});

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const destination = {latitude: 11.644855, longitude: 78.0923283};

const TrackingScreen = () => {
  const [isPending, setPending] = useState(false);
  const [isOrgin, setOrgin] = useState();
  const mapRef = useRef();
  const markerRef = useRef();

  useEffect(() => {
    Geolocation.watchPosition(
      ({coords}) => {
        setOrgin(coords);
        // animate(coords.latitude, coords.longitude);
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
  });

  const animate = (latitude, longitude) => {
    const newCoordinate = {latitude, longitude};
    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };

  const onCenter = () => {
    mapRef.current.animateToRegion({
      latitude: isOrgin.latitude,
      longitude: isOrgin.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };

  return (
    <View>
      {isOrgin && (
        <View style={{height: Dimensions.get('screen').height - 180}}>
          <MapViews
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            showsMyLocationButton={true}
            style={styles.map}
            customMapStyle={mapStyle}
            initialRegion={{
              latitude: isOrgin?.latitude,
              longitude: isOrgin?.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}>
            <Marker
              zIndex={99}
              destination
              coordinate={{
                latitude: isOrgin?.latitude,
                longitude: isOrgin?.longitude,
              }}>
              <SvgHomeLocation />
            </Marker>

            <Marker.Animated
              ref={markerRef}
              // rotation={90}
              zIndex={99}
              coordinate={destination}>
              {!isPending ? <SvgRestaurantPinMap /> : <SvgOrderPickup />}
            </Marker.Animated>

            <MapViewDirections
              optimizeWaypoints={true}
              origin={{
                latitude: isOrgin.latitude,
                longitude: isOrgin?.longitude,
              }}
              destination={destination}
              apikey={API_KEY}
              strokeWidth={4}
              strokeColor={PRIMARY}
              onReady={result => {
                console.log(`Distance: ${result.distance} km`);
                console.log(`Duration: ${result.duration} min.`);
              }}
            />
          </MapViews>
          <TouchableOpacity style={styles.gpsBtn} onPress={onCenter}>
            <SvgGps />
          </TouchableOpacity>
          <Button onClick={() => setPending(!isPending)}>Confirm</Button>
        </View>
      )}
    </View>
  );
};

export default TrackingScreen;
