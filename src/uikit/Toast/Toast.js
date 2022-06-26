import {isEmpty} from '../UikitUtils/validators';
import ToastAndroid from 'react-native-root-toast';
import {BLACK, ERROR, SUCCESS, WHITE} from '../UikitUtils/colors';
import {textStyles} from '../Text/textStyle';

const Toast = (
  message,
  color = 'success',
  position = 'CENTER',
  duration = 'SHORT',
) => {
  if (!isEmpty(color)) {
    if (color === 'error') {
      color = ERROR;
    }
    if (color === 'success') {
      color = SUCCESS;
    }
    if (color === 'black') {
      color = BLACK;
    }
    if (color === 'error') {
      color = ERROR;
    }
  }

  return ToastAndroid.show(message, {
    backgroundColor: color,
    textColor: WHITE,
    textStyle: textStyles.bold,
    position: ToastAndroid.positions[position],
    duration: ToastAndroid.durations[duration],
  });
};
export default Toast;
