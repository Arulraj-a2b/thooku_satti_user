import React from 'react';
import Svg, {Path} from 'react-native-svg';

const defaultProps = {
  width: 23,
  height: 23,
  fill: '#979797',
};

const SvgLocationMarker = ({width, height, fill}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path fill={fill} d="M12 0c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm4 14.5c0 .828-1.79 1.5-4 1.5s-4-.672-4-1.5 1.79-1.5 4-1.5 4 .672 4 1.5z" />
  </Svg>
);

SvgLocationMarker.defaultProps = defaultProps;

export default SvgLocationMarker;
