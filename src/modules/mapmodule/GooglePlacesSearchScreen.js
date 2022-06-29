import React, {useState} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Pressable, StyleSheet, View} from 'react-native';
import {API_KEY} from '../../uikit/UikitUtils/constants';
import {BORDER_COLOR, PRIMARY} from '../../uikit/UikitUtils/colors';
import {inputTextStyles} from '../../uikit/InputText/InputTextStyles';
import {routesPath} from '../../routes/routesPath';
import {PERMISSIONS, request} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import Flex from '../../uikit/Flex/Flex';
import SvgGps from '../../icons/SvgGps';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  overAll: {
    height: '100%',
    width: '100%',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  inputStyes: {
    width: '100%',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 4,
    paddingHorizontal: 16,
    position: 'relative',
    paddingRight: 45,
  },
  svgGps: {
    position: 'absolute',
    zIndex: 99,
    right: 14,
    top: 14,
  },
});
const GooglePlacesSearchScreen = ({navigation}) => {
  const [isFocus, setFocus] = useState(false);
  const onPress = (_data, details) => {
    navigation.push(routesPath.MAP_VIEW_SCREEN, {
      location: details.geometry.location,
    });
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  async function handleLocationPermission() {
    var res = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (res === 'granted') {
      await Geolocation.getCurrentPosition(
        ({coords}) => {
          AsyncStorage.setItem('geoLocation', JSON.stringify(coords));
          navigation.push(routesPath.MAP_VIEW_SCREEN);
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

  const focussedStyle = isFocus ? inputTextStyles.selected : {};

  return (
    <View style={{position: 'relative'}}>
      <View style={styles.overAll}>
        <GooglePlacesAutocomplete
          textInputProps={{
            autoFocus: true,
            style: [styles.inputStyes, focussedStyle],
            onBlur: handleBlur,
            onFocus: handleFocus,
          }}
          styles={{borderWidth: 1}}
          placeholder="Search"
          query={{
            key: API_KEY,
            language: 'en',
          }}
          GooglePlacesDetailsQuery={{
            fields: 'geometry',
          }}
          fetchDetails={true}
          onPress={onPress}
          onFail={error => console.error(error)}
          debounce={200}
          renderRightButton={() => (
            <Pressable onPress={handleLocationPermission}>
              <Flex center middle overrideStyle={styles.svgGps}>
                <SvgGps fill={PRIMARY} />
              </Flex>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
};

export default GooglePlacesSearchScreen;
