import React from 'react';
import Svg, {Path} from 'react-native-svg';

const defaultProps = {
  width: 20,
  height: 20,
  fill: '#979797',
};

const SvgClose = ({width, height, fill}) => (
  <Svg width={width} height={height} viewBox="0 0 14 15" fill="none">
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7 6.92997L12.719 1.20997C12.865 1.06397 13.058 0.990967 13.25 0.990967C13.654 0.990967 14 1.31497 14 1.73997C14 1.93297 13.927 2.12497 13.781 2.27197L8.061 7.99097L13.78 13.71C13.927 13.857 14 14.049 14 14.241C14 14.668 13.651 14.991 13.25 14.991C13.058 14.991 12.865 14.918 12.719 14.772L7 9.05297L1.281 14.772C1.135 14.918 0.942 14.991 0.75 14.991C0.349 14.991 0 14.668 0 14.241C0 14.049 0.0729998 13.857 0.22 13.71L5.939 7.99097L0.219 2.27197C0.0729999 2.12497 0 1.93297 0 1.73997C0 1.31497 0.346 0.990967 0.75 0.990967C0.942 0.990967 1.135 1.06397 1.281 1.20997L7 6.92997Z"
      fill={fill}
    />
  </Svg>
);

SvgClose.defaultProps = defaultProps;

export default SvgClose;
