import React from 'react';
import Svg, {Path} from 'react-native-svg';

const defaultProps = {
  width: 24,
  height: 24,
  fill: '#979797'
};

const SvgEye = ({width, height,fill}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path fill={fill} d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
  </Svg>
);

SvgEye.defaultProps = defaultProps;

export default SvgEye;
