import Geolocation from 'react-native-geolocation-service';
import {PERMISSIONS, request} from 'react-native-permissions';

export async function requestLocationPermission() {
  const [isLocationDetail, setLocationDetail] = useState();
  var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  if (response === 'granted') {
    await Geolocation.getCurrentPosition(
      ({coords}) => {
        setLocationDetail(coords);
      },
      _error => {
        // Alert.alert(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  }

  return {isLocationDetail};
}
