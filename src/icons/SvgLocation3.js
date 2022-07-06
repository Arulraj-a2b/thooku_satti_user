import React from 'react';
import Svg, {Path} from 'react-native-svg';

const defaultProps = {
  width: 24,
  height: 24,
  fill: '#979797',
};

const SvgLocation3 = ({width, height, fill}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fill={fill}
      d="M12 0c-4.198 0-8 3.403-8 7.602 0 6.243 6.377 6.903 8 16.398 1.623-9.495 8-10.155 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.342-3 3-3 3 1.343 3 3-1.343 3-3 3z"
    />
  </Svg>
);

SvgLocation3.defaultProps = defaultProps;

export default SvgLocation3;
