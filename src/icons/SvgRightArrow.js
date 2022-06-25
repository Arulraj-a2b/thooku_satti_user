import React from 'react';
import Svg, {Path} from 'react-native-svg';

const defaultProps = {
  width: 12,
  height: 14,
  fill: '#E59722',
};

const SvgRightArrow = ({width, height, fill}) => (
  <Svg width={width} height={height} viewBox="0 0 6 9" fill="none">
    <Path d="M1 1L4.34 4.33987L1 7.67978" stroke={fill} strokeWidth="2" />
  </Svg>
);

SvgRightArrow.defaultProps = defaultProps;

export default SvgRightArrow;
