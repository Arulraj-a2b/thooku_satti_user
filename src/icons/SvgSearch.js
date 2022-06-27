import React from 'react';
import Svg, {Path} from 'react-native-svg';

const defaultProps = {
  width: 24,
  height: 24,
  fill: '#979797',
};

const SvgSearch = ({width, height, fill}) => (
  <Svg width={width} height={height} viewBox="0 0 21 19" fill="none">
    <Path
      d="M14.8252 14.1647L19.2359 17.8726"
      stroke="#979797"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      d="M9.65625 16.0785C13.889 16.0785 17.3203 12.8655 17.3203 8.90206C17.3203 4.9386 13.889 1.72559 9.65625 1.72559C5.42351 1.72559 1.99219 4.9386 1.99219 8.90206C1.99219 12.8655 5.42351 16.0785 9.65625 16.0785Z"
      stroke="#979797"
      strokeWidth="2"
    />
  </Svg>
);

SvgSearch.defaultProps = defaultProps;

export default SvgSearch;
