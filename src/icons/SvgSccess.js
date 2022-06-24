import React from 'react';
import Svg, {Path} from 'react-native-svg';

const defaultProps = {
  width: 24,
  height: 24,
  fill: '#27AE60',
};

const SvgSuccess = ({width, height, fill}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path fill={fill} d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 16.518l-4.5-4.319 1.396-1.435 3.078 2.937 6.105-6.218 1.421 1.409-7.5 7.626z" />
  </Svg>
);

SvgSuccess.defaultProps = defaultProps;

export default SvgSuccess;
