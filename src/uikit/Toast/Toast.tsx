/* eslint-env browser, node */
import {ToastAndroid} from 'react-native';
import {isEmpty} from '../UikitUtils/validators';

type DurationTypes = 'SHORT' | 'LONG';
type PositionTypes = 'TOP' | 'BOTTOM' | 'CENTER';

const handleSetAppDuration = (duration: DurationTypes) => {
  let res = ToastAndroid.SHORT;
  if (duration === 'LONG') {
    res = ToastAndroid.LONG;
  }
  return res;
};

const handleAppGravity = (position: PositionTypes) => {
  switch (position) {
    case 'BOTTOM':
      return ToastAndroid.BOTTOM;
    case 'CENTER':
      return ToastAndroid.CENTER;
    default:
      return ToastAndroid.TOP;
  }
};
const Toast = (
  message: string,
  duration: DurationTypes = 'SHORT',
  position: PositionTypes = 'TOP',
) => {
  const choosenDuration = handleSetAppDuration(duration);
  const choosenPosition = handleAppGravity(position);
  if (!isEmpty(message)) {
    ToastAndroid.showWithGravity(message, choosenDuration, choosenPosition);
  }
};
export default Toast;
