import { ToastAndroid } from 'react-native';
import { isEmpty } from '../UikitUtils/validators';

const handleSetAppDuration = duration => {
  let res = ToastAndroid.SHORT;
  if (duration === 'LONG') {
    res = ToastAndroid.LONG;
  }
  return res;
};

const handleAppGravity = position => {
  switch (position) {
    case 'BOTTOM':
      return ToastAndroid.BOTTOM;
    case 'CENTER':
      return ToastAndroid.CENTER;
    default:
      return ToastAndroid.TOP;
  }
};
const Toast = (message, duration = 'SHORT', position = 'CENTER') => {
  const choosenDuration = handleSetAppDuration(duration);
  const choosenPosition = handleAppGravity(position);
  if (!isEmpty(message)) {
    ToastAndroid.showWithGravity(message, choosenDuration, choosenPosition);
  }
};
export default Toast;
