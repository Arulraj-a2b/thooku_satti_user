import React from 'react';
import Svg, {Path, Rect, Line} from 'react-native-svg';
import Text from '../uikit/Text/Text';

const defaultProps = {
  width: 29,
  height: 29,
  fill: '#979797',
};

const SvgDecrement = ({width, height, fill}) => (
  <Svg width={width} height={height} viewBox="0 0 29 29" fill="none">
    <Rect
      x="0.5"
      y="0.499969"
      width="27.2803"
      height="27.2803"
      rx="13.6402"
      stroke="#E59722"
    />
    <Line
      x1="9.89954"
      y1="13.8437"
      x2="18.3808"
      y2="13.8437"
      stroke="#E59722"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </Svg>
);

SvgDecrement.defaultProps = defaultProps;

export default SvgDecrement;
