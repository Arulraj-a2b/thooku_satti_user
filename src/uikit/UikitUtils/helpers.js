import moment from 'moment';
import {Alert, Linking} from 'react-native';
import VersionCheck from 'react-native-version-check';
import {isEmpty} from './validators';

export const isValidDate = date => {
  const timestamp = Date.parse(date);
  return Number.isNaN(timestamp) === false;
};

/**
 * Return the requested date format
 * @param value Date string or object
 * @param format returns the specified date format
 * @param isUnix converts to unix and returns unix formatted date
 * @param convertToLocal converts and returns to local timezone
 */
export const getDateString = (value, format, isUnix, convertToLocal) => {
  if (
    (typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'object') &&
    !Array.isArray(value) &&
    !isEmpty(format)
  ) {
    if (isUnix) {
      return moment.unix(Number(value)).format(format);
    } else {
      if (convertToLocal) return moment.parseZone(value).local().format(format);
      return moment.parseZone(value).format(format);
    }
  }
  return '';
};

export const isFinancial = x => {
  return Number.parseFloat(x).toFixed(2);
};

export const checkVersion = () => {
  VersionCheck.needUpdate().then(async res => {
    // console.log('res',res);
    if (res.isNeeded) {
      Alert.alert(
        'Update',
        'New version available in play store with new features. Please update  the app from Play Store.',
        [
          {
            text: 'Update',
            onPress: () => {
              Linking.openURL(
                'https://play.google.com/store/apps/details?id=com.thooku_satti',
              );
            },
          },
        ],
      );
    }
  });
};
