import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import MapViews, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {API_KEY} from '../../uikit/UikitUtils/constants';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 37.771707, longitude: -122.4053769};

const TrackingScreen = () => {
  return (
    <MapViews
      provider={PROVIDER_GOOGLE}
      userLocationPriority="high"
      showsUserLocation={true}
      showsMyLocationButton={true}
      stopPropagation={true}
      // onPress={handleMarkerMove}
      // customMapStyle={mapStyle}
      style={styles.map}
      initialRegion={{
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
      // onRegionChangeComplete={onRegionChangeComplete}
    >
      <Marker
        coordinate={{
          latitude: origin.latitude,
          longitude: origin.longitude,
        }}
      />

      <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={API_KEY}
        strokeWidth={3}
        strokeColor="hotpink"
      />
    </MapViews>
  );
};

export default TrackingScreen;
